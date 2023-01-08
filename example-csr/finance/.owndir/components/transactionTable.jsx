import _ from 'lodash'

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

import TagEditor from './tagEditor.jsx'
import TextFieldConfirm from './textFieldConfirm.jsx';
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
    style={{width: "100%"}}
  />
}

export function TransactionTable ({transactions, showAccount}) {

  const [filter, setFilter] = useState(null);

  // I don't think I care about pagination? Doesn't solve a problem that I have ...
  // const shortList = transactions.filter(txFilter(filter)).slice(0, 200);
  const shortList = filter
    ? transactions.filter(tx => filter.test(txStr(tx))).slice(0, 200)
    : transactions.slice(0, 200);

  return <>

    <RxFilter setFilter={setFilter} />

    <Table className='tx-table'>
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

      {/* drop the last week, because it's probably partial, so the summary would be lies */}
      {Acct.partitionTxsByWeek(shortList).slice(0,-1).map(weekTxs => (
        <TransactionChunk 
          transactions={weekTxs}
          showAccount={showAccount}
          key={weekTxs[0]?.date.toString() || 'lol-nothing'}
          />
        ))}

    </Table>
  </>
}


export function TransactionChunk ({transactions, showAccount}) {

  const {in$, out$} = transactions.reduce(
    (acc, {amount}) => {
      acc[amount > 0 ? "in$" : "out$"] += amount
      return acc;
    }, {in$: 0, out$: 0})


  return <TableBody>
    {transactions.map((tx, i) => { 
      const showDate = (i === 0) || tx.date < transactions[i-1].date ;

      return <TransactionRow
        key={`${tx.account?.name} ${tx.date.toString()} ${tx.amount} ${tx.total}`}
        transaction={tx}
        showDate={showDate}
        showAccount={showAccount}
      />})}


    {/* I want to get a summary/spacer row of some sort */}
    <TableRow className='summary'>
      <TableCell>total spending:</TableCell>
      <TableCell className='money'>
        {Math.abs(out$).toFixed(2)}
      </TableCell>
      <TableCell colSpan={3}>
      </TableCell>
    </TableRow>
  </TableBody>
}

export function TransactionRow ({transaction, showDate, showAccount}) {
  const [tx, setTx] = useState(transaction); // this should eventually be replaced by feedback through the fs
  const deposit = tx.amount > 0;

  function onChange (updatedTx) {
    tx.account?.updateTransactionMeta(updatedTx);
    setTx(updatedTx);
  }

  return <>
    <TableRow className={tx.error ? 'error' : ''}>
      <TableCell>
          {!showDate ? null : 
            <Typography>
              {tx.date.toFormat('MMM d')}
              <sup>{addOrdinal(tx.date.day)}</sup>
            </Typography>}
      </TableCell>


      <TableCell className={`money ${deposit ? 'deposit' : ''}`}>
        {deposit ? '+ ' : "- "}
        {Math.abs(tx.amount).toFixed(2)}
      </TableCell>

      <TableCell className='money'>
        {tx.total.toFixed(2)}
      </TableCell>

      <TableCell>
        <TagEditor tags={tx.tags} onChange={tags => onChange({...tx, tags})} />
      </TableCell>

      <TableCell>
        <TextFieldConfirm text={tx.label}  onConfirm={label => onChange({...tx, label})} />
      </TableCell>

      {!showAccount ? null :
        <TableCell>
          <Typography>
            {tx.account?.name}
          </Typography>
        </TableCell>}

    </TableRow>

    {!tx.error ? null :
      <TableRow className='error'>
        <TableCell colSpan={5}>
          <Typography>
            {x.error}
          </Typography>
        </TableCell>
      </TableRow>}
  </>
}




// https://stackoverflow.com/questions/24400647/add-ordinals-on-dates-using-javascript
export function addOrdinal (n) {
  var x = n%100;
  var ords = ['th','st','nd','rd'];
  if (x == 11 || x == 12 || x == 13) return ords[0];
  return ords[n%10] || ords[0];
}
