
// this is a utility lib that I'm using to interface between csv and my human-friendly format
const _ = require('lodash')
const fs = require('fs')
const { DateTime } = require('luxon')



// alright, what's our output format?
//    date, amount, total, tags, description
//    all as a regular ol' CSV
//    new->old

// and, what's our input format?
//    date, label, withdrawal, deposit, total
//    old->new

// I do still want to break up the lines into weeks, but that shouldn't be a problem
// I also want to pad the values so that the columns line up in plaintext, within a week

//    headers
//    a week of transactions
//    blank line

// yeah, that seems nice


// AND, when I interpret the "raw" file, I can rename it using the latest date it contains
// I can also keep a list of the files that have already been processed on hand, so I don't redo everything
// and then, deleting the file will force everything to be re-processed


// okay, this feels like a good plan.


function parseDir (fsNode) {

  let doneList = fsNode.children['.done']
  if (!doneList) {
    fsNode.write()
  }


}













async function parseAccount (fsNode) {
  const lines = (await fsNode.text()).split('\n').filter(line => _.isEmpty(line));

  // first line is "account: whatever"
  // second line is balance: $XXXX
  const [,name] = lines.shift().match(/account:\s*(\w+)/)
  const [,balanceStr] = lines.shift().match(/balance:\s*$?\s*(\-?\d+\.?\d*)/)

  // have we failed to parse the file?
  if (_.isEmpty(name) || _.isEmpty(balanceStr)) {
    return null
  }

  const balance = parseFloat(balanceStr)

  // transactions are recorded as naive-ish CSVs 
  // (naive: no commas allowed in values - I don't wanna deal with that)
  // anything that doesn't match the expected format is ignored outright
  const txregex = /^(\d\d\d\d-\d\d-\d\d),\s*([^,]+),\s*([^,]+),\s*([^,]*)$/
  //                 date                    type       amount     label
  
  const transactions = [];
  lines.forEach(line => {
    const [date, type, amountStr, label] = txline.toString().match(txregex) || []
    if (amountStr) {
      transactions.push({ 
        date: DateTime.fromFormat(date.trim(), "yyyy-MM-dd"),
        type: type.trim(),
        label: label.trim(),
        amount: parseFloat(amountStr.trim()) 
      })      
    }
  })

  return {
    name: name,
    balance: balance,

    get transactions() {
      return sortTransactions([...transactions]);
    },

    mergeTransactions: function (newTransactions) {
      transactions = mergeTransactions(transactions, newTransactions);
    },

    toString: function () {
      return accountStr(this); 
    },

    save: function () {
      if (!path) {
        console.log(`No path specified. Cannot save account ${account.name}.`)
        return null;
      }

      const existing = fs.statSync(path, { throwIfNoEntry: false })
      if (existing) {
        if (!existing.isFile()) {
          console.log(`${path} is not a file. Cannot save account ${account.name}.`)
          return null;
        }

        fs.copyFileSync(path, path + ".bk")
      }

      fs.writeFileSync(path, this.toString());
      return true;
    }
  }
}




function partitionTxByWeek (transactions) {
  const chunkedByWeek = [];
  let week = []

  transactions.forEach(tx => {
    if (_.isEmpty(chunk)) {
      chunk.push(tx);
      return;
    }

    // if our day-of-the-week is smaller than or equal to the LAST day of the week
    // then we are still moving back in time through that week
    if (tx.date.weekday <= _.last(week).date.weekday) {
      chunk.push(tx);
      return;
    }   
    
    // otherwise, we have moved into a new week!
    chunkedByWeek.push(week)
    week = [tx];
  })

  return chunkedByWeek;
}


// given a list of transactions (ie, a week) 
// return a naive CSV table, with normalized column widths
function transactionsTableStr (transactions) {
  const rows = transactions.map(({date, type, label, amount}) => ([
    date.format('yyyy-MM-dd'),
    type,
    `${amount > 0 ? ' ' : '-'}${Math.abs(amount).toFixed(2)}`,
    label
  ]))

  return padTransactions(rows).map(row => row.join(', ')).join('\n')
}

// given a list of transactions, pad every entry so
// that within a "column", everything is the same length
// values will be left-aligned except 'amount', which is right-aligned

function padTransactions (transactions) {
  const amountColumn = 2;

  const lengths = []
  rows.forEach(row => {
    row.forEach((col, i) => {
      const len = col.length
      if (len > (lengths[i] || 0)) {
        lengths[i] = len;
      }
    })
  })

  function pad (str, i) {
    return (i === amountCol)
        ? str.padStart(lengths[i], " ")
        : str.padEnd(lengths[i], " ")
  }

  return rows.map(cols => cols.map(pad))
}

function incorporateTransactions (txKnown, txNew) {

}