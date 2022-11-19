
// this is a utility lib that I'm using to interface between csv and my human-friendly format
const _ = require('lodash')
const fs = require('fs')
const { resolve } = require('path')
const { DateTime } = require('luxon')
const papa = require('papaparse')

// alright, what's our output format?
//    date, amount, total, tags, label
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


/*
  I am twisting myself into knots over potentially unfriendly unknowns about my inputs
  so, let's assume, for the moment, that we live in the friendliest world
  and maybe add a little bit of code to warn us if that stops being true

  things I know:
    - labels are not stable
    - _very_ rarely, transaction amounts will be modified after the fact (ie corrections)
        this one, I will ignore, and correct by hand after the fact if need be

  things I will assume until proven otherwise:
    - transaction ORDER is stable (ie, the same day downloaded twice, won't change)
  
  that last is valuable, because it means that the same transaction will always have
  the same _total_, which means I can easily match a transaction to itself
    (unless I get stupid and spend, then re-deposit, then spend AGAIN the same amount)
*/

const parserConf = {
  comments: "#", 
  skipEmptyLines: "greedy",
  transform: strVal => strVal.trim()
}


const toNearestCent = (value) => {
  return Math.round(value * 100) / 100;
};

function parseRawCsv (raw) {
  return papa.parse(raw, parserConf).data.map(
    ([date, label, out$, in$, total]) => {
      date = DateTime.fromFormat(date, 'MM/dd/yyyy')
      out$ = parseFloat(out$)
      in$ = parseFloat(in$)
      total = parseFloat(total)
      label = label.replace(/\s+/g, ' ');
      const amount = out$ ? -(Math.abs(out$)) : Math.abs(in$);
      return {date, amount, total, tags: [], label};
    }
  )
}

function parseAccountCsv (csv) {
  // when I pull out _my_ transactions, I reverse them, because I store them newest-first
  return papa.parse(csv, parserConf).data.map(
    ([date, amount, total, tags, label]) => {
      date = DateTime.fromFormat(date, 'yyyy-MM-dd')
      amount = parseFloat(amount)
      total = parseFloat(total)
      tags = tags.split(/\s+/)
      return {date, amount, total, tags, label};
    }
  ).reverse();
}

function uniqueTransactions (transactions) {
  return _.uniqBy(
    transactions, 
    ({date, amount, total}) => `${date} ${amount} ${total}`
  );
}

async function doneFile (fsNode) {
  let file = fsNode.children['.done']
  if (!file) {
    await fsNode.write(".done")
    file = fsNode.children['.done']
  }
  return file;
}

async function newRawFiles (fsNode) {
  const knownFiles = (
    await doneFile(fsNode)
            .then(done => done.text())
            .then(text => text.split("\n"))
  );
  const isTarget = fsn => (
    fsn.isFile && 
    fsn.name.toLowerCase().endsWith('.csv') && 
    !knownFiles.includes(fsn.name)
  );

  return fsNode.childrenArray.filter(isTarget)
}

async function newTransactions (fsNode) {
  const files = await newRawFiles(fsNode);
  const allFileTransactions = await Promise.all(files.map(f => f.text().then(parseRawCsv)))
  const allTransactions = _.flatten(allFileTransactions);
  return uniqueTransactions(allTransactions)
}

function mergeTransactions (transactionsA, transactionsB) {
  return  _.sortBy(
    // uniqueTransactions is first-in-wins, so transactionsA will take precedence
    uniqueTransactions(transactionsA.concat(transactionsB)),
    ['date']
  );
}



function audit (txs) {
  const errors = []
  _.reduce(txs, (txA, txB, index) => {
    if (txB.total != toNearestCent(txA.total + txB.amount)) {
      errors.push({tx: txA, row: index-1, error: "total/amount fails validation"})
    }
    return txB
  })

  return errors;
}


function partitionTxByWeek (transactions) {
  const chunkedByWeek = [];
  let week = []

  transactions.forEach(tx => {
    if (_.isEmpty(week)) {
      week.push(tx);
      return;
    }

    const sunday = week[0].date.plus({days: 7 - week[0].date.weekday})
    if (tx.date <= sunday) {
      week.push(tx);
      return;
    }   
    
    // otherwise, we have moved into a new week!
    chunkedByWeek.push(week)
    week = [tx];
  })

  chunkedByWeek.push(week);
  return chunkedByWeek;
}



// given a list of transactions (ie, a week) 
// return a naive CSV table, with normalized column widths
function transactionsTableStr (transactions) {
  const rows = transactions.map(({ date, amount, total, tags, label }) => ([
    date.toFormat('yyyy-MM-dd'),
    `${amount > 0 ? ' ' : '-'}${Math.abs(amount).toFixed(2)}`,
    `${total > 0 ? ' ' : '-'}${Math.abs(total).toFixed(2)}`,
    tags.join(' '),
    label
  ]))

  // wish I could do this, but if a cell starts with a space, this will quote it, which I don't want
  //return papa.unparse(padTransactionRows(rows))

  // so instead, let's get primitive
  return padTransactionRows(rows).map(row => row.join(', ')).join('\n')
}

// given a list of transactions, pad every entry so
// that within a "column", everything is the same length
// values will be left-aligned except 'amount', which is right-aligned

function padTransactionRows (rows) {
  const amountCol = 1;
  const totalCol = 2;

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
    return (i === amountCol || i === totalCol)
        ? str.padStart(lengths[i], " ")
        : str.padEnd(lengths[i], " ")
  }

  return rows.map(cols => cols.map(pad))
}








async function loadAccount (fsNode) {
  if (!fsNode.isFile) {
    throw 'loadAccount must be called on a file, not a directory'
  } 

  const [,name] = fsNode.name.match(/^(.*)\.[^.]+$/)
  if (!name) {
    throw 'loadAccount files must have an extension (usually .acct)'
  }

  const account = Object.create(AccountProto);
  account.name = name
  account.fsNode = fsNode
  account.transactions = parseAccountCsv(await fsNode.text())

  return account;
}



const AccountProto = {

  get total () {
    return _.last(this.transactions)?.total
  },

  get errors () {
    return audit(this.transactions);
  },

  rawDir: async function () {
    let dir = this.fsNode.parent.children[this.name];
    if (!dir) {
      await this.fsNode.parent.makeDir(this.name);
      dir = this.fsNode.parent.children[this.name];
    }

    if (!dir?.isDirectory) {
      const absPath = resolve(this.fsNode.parent.absolutePath, this.name)
      throw `error: unable to find or make 'raw' directory at ${absPath}`
    }

    return dir;
  },

  loadNewTransactions: async function () {
    const transactions = await this.rawDir().then(newTransactions)
    this.transactions = mergeTransactions(this.transactions, transactions)
    return this;
  },

  toString: function () {
    const blocks = (
      partitionTxByWeek(this.transactions)
        .map(week => transactionsTableStr(week.reverse()))
    ).reverse();

    return blocks.join('\n\n');
  },

  save: async function () {
    const currentText = this.toString() + Math.random();
    const existingText = await this.fsNode.text();

    if (this.currentText !== existingText) {
      const filename = this.fsNode.name;

      console.log('content before move', await this.fsNode.text())

      const mvRes = await this.fsNode.move(filename + '.bk', {overwrite: true});
      console.log("backup res", mvRes)
      console.log(this.fsNode)


      this.fsNode.parent.write(filename, currentText);
      // this.fsNode = this.fsNode.parent.children[filename];
    }
  },

  markAllRawAsDone: async function () {
    const dir = await this.rawDir();
    const rawFiles = await newRawFiles(dir);

    const newNames = await Promise.all(rawFiles.map(async (file) => {
      const transactions = await file.text().then(text => parseRawCsv(text));

      if (_.isEmpty(transactions)) {
        return null;
      }

      const name = (
        _.last(transactions).date.toFormat('yyyy-MM-dd') + '_' +
        _.first(transactions).date.toFormat('yyyy-MM-dd')
      );

      // if we haven't already, rename the file with the date to which it is current
      if (!file.name.startsWith(name)) {
        let filename = `${name}.csv`

        // is our name already taken? let's append a suffix
        if (dir.children[filename]) {
          let n = 1;
          while (dir.children[`${name}-${n}.csv`]) { n++ }
          filename = `${name}-${n}.csv`
        }

        console.log(file.name, filename)

        if (filename !== file.name) {
          console.log('move', await file.move(filename));
        }
      }

      return file.name;
    }))

    const done = await doneFile(dir);
    const updatedList = _.uniq(
      (await done.text()).split("\n").concat(newNames)
    ).join("\n");

    return done.write(updatedList);
  }

}







module.exports = {
  loadAccount
}