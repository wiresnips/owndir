
import _ from 'lodash'


import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { Summary } from './components/summary.jsx';
import { TransactionTable } from './components/transactionTable.jsx';
import Acct from './account/account.js'


export default {
  navEntry: {
    label: "Banking",
      icon: AccountBalanceIcon
  },

  title: "Banking",

  main: function () {
    return <AccountsView fsNode={this.directory} />
  }
}





const accountNamesOrder = [
  'td-household',
  'scotia-main',
  'scotia-credit',
  'scotia-savings'
]
function accountOrder (account) {
  const i = accountNamesOrder.indexOf(account.name);
  return i < 0 ? 999 : i;
}





function AccountsView ({ fsNode }) {

  const [accounts, addAccount] = useReducer((accounts, account) => {
    return _.sortBy( [...accounts, account], accountOrder)
  }, [])

  useEffect(() => {
    const isAcct = fsn => fsn.name.toLowerCase().endsWith('.acct')
    fsNode.children().then(children => 
        children.filter(isAcct)
                .forEach(file => Acct.loadAccount(file)
                                     .then(account => account.processFiles())
                                     .then(addAccount)
                                     .catch(e => {
                                        console.error('lol fuck', e, file)
                                     })
                ))
  }, []);

  const [currentTab, setTab] = useState('0');

  return <Box sx={{ width: '100%' }}>
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={(e,v) => setTab(v)}>

          <Tab value='0' label="summary"/>

          <Tab value='1' label="All"/>

          {accounts.map((account,i) => (
            <Tab label={account.name}
              key={account.name}
              value={''+i+2} />))}
        </TabList>
      </Box>

      <TabPanel value="0">
        <Summary accounts={accounts} />
      </TabPanel>

      <TabPanel value="1">
          <TransactionTable 
            showAccount={true}
            transactions={
              _.sortBy(
                _.flatMap(accounts, account => account.transactions),
                tx => -tx.date.toMillis()
              )
            } />
      </TabPanel>

      {accounts.map((account, i) => (
        <TabPanel key={account.name} value={''+i+2}>
          <TransactionTable transactions={ account.transactions } />
        </TabPanel>
      ))}

    </TabContext>
  </Box>


  return <Tabs defaultValue={0}>

    <div value={0}>
      Overview
    </div>

    <Tabs>
      <Tab>summary</Tab>
      {accounts.map(account => (
        <Tab key={account.name}>
          {account.name}
        </Tab>))}
    </Tabs>

  </Tabs>
}