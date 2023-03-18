import _ from 'lodash'
const { DateTime } = require('luxon')

import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SearchIcon from '@mui/icons-material/Search';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import TagEditor from './tagEditor.jsx'
import Acct from '../account/account.js'


function txStr (tx) {
  return [
    tx.tags.join(' '),
    tx.label,
    tx.date.toFormat('yyyy-MM-dd'),
    tx.account?.name
  ].join(' ').toLowerCase();
}

function RxFilter ({setFilter}) {
  const [raw, setRaw] = useState('');
  const [words, setWords] = useState([]);

  useEffect(() => {
    const rawWords = raw.trim().toLowerCase().split(/\s+/).filter(w => w.length > 1);
    if (!_.isEqual(words, rawWords)) {
      setWords(rawWords);
      setFilter(!_.isEmpty(rawWords) 
        ? new RegExp(rawWords.join('|'))
        : null);
    }
  }, [raw]);

  return <TextField
    value={raw}
    onChange={(e) => setRaw(e.target.value)}
    InputProps={{ endAdornment: <SearchIcon /> }}
    className="search-bar"
  />
}

export function TransactionTable ({transactions, showAccount}) {
  const [filter, setFilter] = useState(null);

  if (_.isEmpty(transactions)) {
    return null;
  }

  // I don't think I care about pagination? Doesn't solve a problem that I have ...
  // const shortList = transactions.filter(txFilter(filter)).slice(0, 200);
  transactions = filter
    ? transactions.filter(tx => filter.test(txStr(tx)))
    : transactions;

  return <Box display='flex' flexDirection='column' height="100%" className='tx-table-container'>

    <RxFilter setFilter={setFilter} />

    <Box className="table-scroller">
      <Transactions {...{transactions, showAccount}}/>
    </Box>
  </Box>
}




function txRowGenerator (transactions, showAccount) {
  const transactionWeeks = Acct.partitionTxsByWeek(transactions);
  const flatRows = [];

  for (let i = 0; i < transactionWeeks.length; i++) {
    let $out = 0;
    let lastDate = null;
    const week = transactionWeeks[i];
    for (let j = 0; j < week.length; j++) {
      const tx = week[j];
      tx.txRow = true;
      tx.weekIndex = i;
      if (!lastDate || !lastDate.equals(tx.date)) {
        tx.isFirstOfDate = true;
        lastDate = tx.date;
      }

      flatRows.push(tx);

      if (tx.error) {
        flatRows.push({ errorRow: true, transaction: tx })
      }

      $out += tx.amount;
    }

    flatRows.push({ summaryRow: true, $out })
  }

  return [
    flatRows, 
    ({index, style}) => {
      const row = flatRows[index];

      if (row.txRow) {
        return <TransactionRow 
          {...{transaction: row, showAccount, showDate: row.isFirstOfDate}} />
      }
      if (row.summaryRow) {
        return <TxWeekSummaryRow 
          {...{spending: row.$out}} />
      }
      if (row.errorRow) {
        return <TxErrorRow 
          {...{transaction: row}} />
      }
    }
  ];
}






export function TransactionRow ({transaction, showDate, showAccount}) {
  const {amount, total, date, tags, label, account, error, weekIndex} = transaction
  const deposit = amount > 0;
  const oddWeek = !!(weekIndex % 2);

  return (
    <TableRow className={
      (error ? 'error ' : '') +
      (oddWeek ? 'odd-week ' : '') 
    }>
      <TableCell>
          {!showDate ? null : 
            <Typography title={date.toFormat('yyyy-MM-dd')}>
              {date.toFormat('MMM d')}
              <sup>{addOrdinal(date.day)}</sup>
            </Typography>}
      </TableCell>


      <TableCell className={`money ${deposit ? 'deposit' : ''}`}>
        {deposit ? '+ ' : "- "}
        {Math.abs(amount).toFixed(2)}
      </TableCell>

      <TableCell className='money'>
        {total.toFixed(2)}
      </TableCell>

      <TableCell className='tags'>
        <TagEditor tags={tags} onChange={tags => account.updateTransactionMeta({...transaction, tags})} /> 
      </TableCell>

      <TableCell className='label'>
        <Typography title={label.replace(/\s+/, ' ')}>
          {label}
        </Typography>
      </TableCell>

      {!showAccount ? null :
        <TableCell>
          <Typography>
            {account?.name}
          </Typography>
        </TableCell>}

    </TableRow>
  );
}

// https://stackoverflow.com/questions/24400647/add-ordinals-on-dates-using-javascript
export function addOrdinal (n) {
  var x = n%100;
  var ords = ['th','st','nd','rd'];
  if (x == 11 || x == 12 || x == 13) return ords[0];
  return ords[n%10] || ords[0];
}


export function TxWeekSummaryRow ({spending}) {
  return <TableRow className='summary'>
    <TableCell>total spending:</TableCell>
    <TableCell className='money'>
      {Math.abs(spending).toFixed(2)}
    </TableCell>
    <TableCell colSpan={3}>
    </TableCell>
  </TableRow>  
}

export function TxErrorRow ({transaction}) {
  return <TableRow className='error'>
    <TableCell colSpan={5}>
      <Typography>
        {transaction.error}
      </Typography>
    </TableCell>
  </TableRow>
}


const ROW_HEIGHT = 70;

// https://codesandbox.io/s/react-window-with-table-elements-d861o?file=/src/index.tsx
/** Context for cross component communication */
const VirtualTableContext = React.createContext({
  top: 0,
  showAccount: false
})

function Transactions ({transactions, showAccount}) {
  const listRef = useRef()
  const [top, setTop] = useState(0)
  const [rows, RowElementFn] = txRowGenerator(transactions, showAccount)

  return (
    <AutoSizer disableWidth={true}>
      {({ height, width }) => {
        return <VirtualTableContext.Provider value={{ top, showAccount }}>
              <List
                height={height}
                width={"100%"}
                itemSize={ROW_HEIGHT}
                itemCount={rows.length}
                innerElementType={Inner}
                overscanCount={10}
                onItemsRendered={props => {
                  const style = listRef.current?._getItemStyle(props.overscanStartIndex);
                  setTop(style?.top || 0)
                }}
                ref={el => (listRef.current = el)}
              >
                {RowElementFn}
              </List>
        </VirtualTableContext.Provider>
      }}
    </AutoSizer>
  );

}


// https://codesandbox.io/s/react-window-with-table-elements-d861o?file=/src/index.tsx

const Inner = React.forwardRef(
  function Inner({ children }, ref) {
    const { top, showAccount } = useContext(VirtualTableContext)
    return (
      <div ref={ref}>
        <Table style={{ top, position: 'absolute', width: '100%' }}  className='tx-table'>
          <TableHead>
            <TableRow>
              <TableCell>{/*Date*/}</TableCell>
              <TableCell><Typography>Amount</Typography></TableCell>
              <TableCell><Typography>Total</Typography></TableCell>
              <TableCell><Typography>Tags</Typography></TableCell>
              <TableCell><Typography>Label</Typography></TableCell>
              {!showAccount ? null :
                <TableCell><Typography>Account</Typography></TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>{children}</TableBody>
        </Table>
      </div>
    )
  }
)