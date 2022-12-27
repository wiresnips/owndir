
export default {
  navEntry: {
    label: "Banking WAT",
      icon: AccountBalanceIcon
  },

  title: "Banking",

  main: function () {
    return <AccountTables fsNode={this.directory} />
  }
}


/*
  Okay, what's the idea here?

  `account.js` 
  - manages raw transaction-record dumps, massages them into uniform `.acct` files,
  - two-way bridge between `.acct` and js object

  let's build out some UI around this, shake out the infrastructure
   
   1- just show the text
   2- tag transactions (ui only)
   3- SAVE the new tags back down

*/

import _ from 'lodash'
import Acct from './account.js'

import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import TagEditor from './TagEditor.jsx'



/*
  okay, I actually need to think a little bit about how I'm going to propagate update events
  part of the strategy here is, I know that whatever I make is locked into this folder, so I'm allowed to be sloppy
  and, I basically want just global state, right?

  So, the sloppiest thing I could possibly do would be to mutate the array directly
  that's a step too far, though - those changes won't update in the UI correctly, because why the hell would they

  So, how's about we just slap it all into a context, and let that manage the relationship to the filesystem?
  Oooh, this sounds really promising

  Yeah, and then this can be a playground to fuck around with the client-server bridge

*/


// this is true in practice, but does not NECESSARILY hold
function txEquals (a, b) {
  return (
    a.date == b.date && 
    a.amount === b.amount && 
    a.total === b.total
  )
}

function AccountTables ({ fsNode }) {
  const [accounts, setAccount] = useReducer((accounts, account) => {
    return {
      [account.name]: account,
      ...accounts
    }
  }, {})

  useEffect(() => {
    const isAcct = fsn => fsn.name.toLowerCase().endsWith('.acct')
    fsNode.children().then(children => 
        children.filter(isAcct)
                .forEach(file => Acct.loadAccount(file)
                                     .then(account => account.processFiles())
                                     .then(setAccount)))
  }, [])

  return <>
    {Object.values(accounts).map(account => 
      <AccountTable key={account.name} account={account} />)}
  </>
}

function AccountTable ({account}) {
  const [transactions, setTransactions] = useState(account.transactions || []);

  function updateTx (tx) {
    // linear lookup is fine because most targets will be near the front
    const index = transactions.findIndex(t => txEquals(tx, t))
    if (index === -1) {
      console.error("Unable to find transaction", 
        // I don't trust the console not to update the state of the reference, hence the clone
        _.cloneDeep({ transaction: tx, knownTransactions: transactions })
      );
    }

    else if (!_.isEqual(tx, transactions[index])) {
      account.transactions[index] = tx;
      setTransactions([...account.transactions]);
      account.save().then(res => console.log(res));
    }
  }

  
  if (!account) {
    return <CircularProgress />
  }

  return <Table className='tx-table'>
    <TableHead>
      <TableRow>
        <TableCell>{/*Date*/}</TableCell>
        <TableCell><Typography>Amount</Typography></TableCell>
        <TableCell><Typography>Total</Typography></TableCell>
        <TableCell><Typography>Tags</Typography></TableCell>
        <TableCell><Typography>Label</Typography></TableCell>
      </TableRow>
    </TableHead>

    {Acct.partitionTxsByWeek(transactions).map(weekTxs => (
      <TransactionChunk 
        transactions={weekTxs} 
        updateTx={updateTx} 
        key={weekTxs[0]?.date.toString() || 'lol-nothing'}
        />
      ))}

  </Table>
}


function TransactionChunk ({transactions, updateTx}) {

  const {in$, out$} = transactions.reduce(
    (acc, {amount}) => {
      acc[amount > 0 ? "in$" : "out$"] += amount
      return acc;
    }, {in$: 0, out$: 0})


  return <TableBody>
    {transactions.map((tx, i) => { 
      const showDate = (i === 0) || tx.date < transactions[i-1].date ;

      return <TransactionRow
        key={`${tx.date.toString()} ${tx.amount} ${tx.total}`}
        showDate={showDate}
        transaction={tx}
        onChange={updateTx}
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

function TransactionRow ({transaction, showDate, onChange}) {
  const {date, amount, total, tags, label, error} = transaction
  const deposit = amount > 0;

  return <>
    <TableRow className={error ? 'error' : ''}>
      <TableCell>
          {!showDate ? null : 
            <Typography>
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

      <TableCell>
        <TagEditor 
          tags={tags}
          onChange={tags => onChange({...transaction, tags})} 
          />
      </TableCell>

      <TableCell>
        <TextFieldConfirm 
          text={label} 
          onConfirm={label => onChange({...transaction, label})}
          />
      </TableCell>
    </TableRow>
    {!error ? null :
      <TableRow className='error'>
        <TableCell colSpan={5}>
          <Typography>
            {error}
          </Typography>
        </TableCell>
      </TableRow>}
  </>
}


function TextFieldConfirm ({text: value, onConfirm}) {
  const [text, setText] = useState(value || '')

  const [active, setActive] = useState(false);
  const inputReference = useRef(null);
  useEffect(() => {
    active && inputReference.current.focus();
  }, [active])

  function confirm () {
    onConfirm(text);
    setActive(false);
  }
  function reset () {
    setText(value || '');
    setActive(false);
  }

  return <Box display='flex' flexDirection='row'>
    {!active
      ? <Typography onClick={() => setActive(true)}>{value}</Typography>
      : <TextField 
          value={text}
          inputRef={inputReference}
          onChange={(e) => {
            const updatedText = e.target.value;
            setText(updatedText);
          }}
          onBlur={() => confirm()}
          onKeyUp={(event) => {
            event.key === 'Enter' && confirm();
            event.key === 'Escape' && reset();
          }}
        />}
  </Box>
}


// https://stackoverflow.com/questions/24400647/add-ordinals-on-dates-using-javascript
function addOrdinal (n) {
  var x = n%100;
  var ords = ['th','st','nd','rd'];
  if (x == 11 || x == 12 || x == 13) return ords[0];
  return ords[n%10] || ords[0];
}
