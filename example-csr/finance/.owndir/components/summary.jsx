import _ from 'lodash'


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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { TransactionRow, addOrdinal } from './accountTable'

/*
  okay, what do I actually want to put here?

    CASHFLOW VIEW
      - no averaging here, just slam all the data down
      - draw a line-of-best-fit through it ?

*/





export function Summary ({accounts}) {

  const transactions = _.flatMap(accounts, acct => acct.transactions)


  return <Box display='flex' flexDirection='column'>
    <AccountTotals accounts={accounts} />
    <TagDailyAverage transactions={transactions}/>
  </Box>
}


function AccountTotals ({accounts}) {
  return <Table>
    <TableBody>
      {accounts.map(account => {
        let tx = account.transactions[0];
        return !tx ? null :
          <TableRow key={account.name}>
            <TableCell>{account.name}</TableCell>
            <TableCell className='money'>{tx.total}</TableCell>
            <TableCell>
              <Typography>
                {tx.date.toFormat('MMM d')}
                <sup>{addOrdinal(tx.date.day)}</sup>
              </Typography>
            </TableCell>
          </TableRow>})}
    </TableBody>
  </Table>
}


function dropTransferPairs (transactions) {
  const transfers = transactions.filter(tx => tx.tags.includes('transfer'))
  for (let i = 0; i < transfers.length; i++) {
    const A = transfers[i]
    if (A.drop) { continue; }
    for (let j = i+1; j < transfers.length; j++) {
      const B = transfers[j];
      if (B.drop || !A.date.equals(B.date)) { continue; }
      if (A.amount + B.amount == 0) {
        A.drop = true;
        B.drop = true;
        break;
      }
    }
  }

  return transactions.filter(tx => !tx.drop)
}


function normalizeRent (transactions, days) {
  const rent = transactions?.find(tx => tx.tags.includes("rent"));

  if (!rent) {
    return [];
  }

  const dailyRent = rent.amount * 12 / 365;
  const latest = _.maxBy(transactions, tx => tx.date).date;

  const normRentTxs = []
  for (let d = 0; d < days; d++) {
    const date = latest.minus({days: d})
    normRentTxs.push({
      date,
      amount: dailyRent,
      label: "normalized rent",
      tags: ["rent"]
    })
  }

  return [
    ...(transactions.filter(tx => !tx.tags.includes('rent'))),
    ...(normRentTxs)
  ]
}

const toNearestCent = (value) => {
  return Math.round(value * 100) / 100;
};

function daysBtwn (dateA, dateB) {
  return Math.round(Math.abs(dateA.diff(dateB, 'days').days));
}

function quadInOut (k) {
    k *= 2;
    return ((k < 1)
      ? 0.5 * k * k
      : -0.5 * (--k * (k - 2) - 1)
    );
}

function weightedAvgByTagForDays (transactions, days) {
  if (_.isEmpty(transactions)) {
    return {};
  }

  const latest = _.maxBy(transactions, tx => tx.date).date;
  const cutoff = latest.minus({days: days});
  const dayWeight = day => quadInOut((days - day) / days);
  
  let totalWeight = 0;
  for (let d = 0; d < days; d++) {
    totalWeight += dayWeight(d)
  }

  const tagDailyTotals = transactions
    .filter(tx => tx.date >= cutoff)
    .reduce((tagTotals, tx) => {
      const day = daysBtwn(tx.date, latest)
      tx.tags.forEach(tag => {
        let totals = tagTotals[tag];
        if (!totals) {
          tagTotals[tag] = totals = new Array(days + 1).fill(0);
        }

        totals[day] += tx.amount * dayWeight(day);
      })
      return tagTotals;
    }, {})
  
  return _.mapValues(
    tagDailyTotals, 
    totals => totals.reduce((acc, t) => acc + t, 0) / totalWeight
  );
}



function TagDailyAverage ({transactions}) {
  if (_.isEmpty(transactions)) {
    return null;
  }

  const latest = _.maxBy(transactions, tx => tx.date).date;
  const cutoff = latest.minus({days: 168});
  transactions = transactions.filter(tx => tx.date >= cutoff);

  transactions = dropTransferPairs(transactions);
  transactions = normalizeRent(transactions, 200);

  const longAverages = weightedAvgByTagForDays(transactions, 168); // 24 weeks
  const shortAverages = weightedAvgByTagForDays(transactions, 42); // 6 weeks

  console.log({shortAverages})

  const tags = _.sortBy(
      _.toPairs(longAverages), 
      [([tag, avg]) => avg])
    .map(([tag, avg]) => tag)
    .filter(tag => longAverages[tag] < 0 || shortAverages[tag] < 0)

  const maxSpend = Math.min(
    ...(Object.values(longAverages)),
    ...(Object.values(shortAverages)),
    0
  );

  const chartMax = Math.floor(maxSpend / 20) * 20;
  const classes = [
    "tag-spending",
    "charts-css",
    "bar",
    "show-labels",
    "labels-align-end",
    "multiple",
    "data-spacing-4",
    `show-${-chartMax/5}-secondary-axes`
  ]

  return <table className={classes.join(' ')}>
    <caption>Tags / Day</caption>
    <tbody>
    {tags.map(tag => {
      const long = toNearestCent(longAverages[tag] || 0)
      const short = toNearestCent(shortAverages[tag] || 0)

      return <tr key={tag}>
        <th scope='row'>{tag}</th>
        <td style={{"--size": long / chartMax}}>
          <span className="chart-data-right money">{long * -1}</span>
        </td>
        <td style={{"--size": short / chartMax}}>
          <span className="chart-data-right money">{short * -1}</span>
        </td>
      </tr>

    })}
    </tbody>
  </table>

}



function DailySpend ({transactions}) {

}



