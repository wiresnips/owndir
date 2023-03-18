
import _ from 'lodash'


import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { Summary } from './components/summary.jsx';
import { TransactionTable } from './components/transactionTable.jsx';
import Acct from './account/account.js'

import TabView from 'mui-tabview'

export default {
  navEntry: {
    label: "Banking",
    icon: AccountBalanceIcon,
    position: 1
  },

  title: "Banking",

  main: function () {
    return <AccountsView fsNode={this.directory} />
  }
}




const targetAccounts = [
  'td-household.acct',
  'scotia-main.acct',
  'scotia-credit.acct',
  'scotia-savings.acct'
]

function accountOrder (account) {
  const i = targetAccounts.indexOf(account.fsNode.name);
  return i < 0 ? 999 : i;
}



function AccountsView ({ fsNode }) {
  const now = (new Date()).getTime()
  const [initTime] = useState(now);
  const msSinceInit = now - initTime;

  console.log({ready: false, msSinceInit})  

  // haha, one weird trick React HATES - this only works because my list of accounts is fixed
  let accounts = targetAccounts.map(filename => {
    const [account, setAccount] = useState(null);

    // sub returns unsub, and useEffect calls whatever you return on cleanup
    useEffect(() => fsNode.walk(filename).sub((event, fsNode) => {
      Acct.loadAccount(fsNode).then(account => {
        setAccount(account);
        account.processFiles() // this usually does nothing, just run it _after_ the initial load
      })
    }), [])

    return account;
  })

  accounts = accounts.filter(x => x)

  // instead of reloading per-account, wait until we have all of them
  if (accounts.length < 4 && msSinceInit < 500) {
    return <Box width='100%' height='100%' display='flex'>
      <CircularProgress style={{margin: 'auto'}} />
    </Box>
  }

  console.log({ready: true, msSinceInit})


  return <TabView tabs={[
    {label: "Summary", 
     content: <Summary accounts={accounts} /> },

    {label: "All", 
     content: <TransactionTable 
        showAccount={true}
        transactions={
          _.sortBy(
            _.flatMap(accounts, account => account.transactions),
            tx => -tx.date.toMillis()
          )
        } />},

    ...(accounts.map(account => ({
        label: account.name,
        content: <TransactionTable transactions={ account.transactions } />
      })))
  ]}
  />

}