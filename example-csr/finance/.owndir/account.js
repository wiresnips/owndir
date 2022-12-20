
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

//    a week of transactions
//    blank line

// yeah, that seems nice


// AND, when I interpret the "raw" file, I can rename it using the latest date it contains
// I can also keep a list of the files that have already been processed on hand, so I don't redo everything
// and then, deleting the file will force everything to be re-processed

// okay, this feels like a good plan.


/*
  I'm twisting myself into knots over potentially unfriendly unknowns about my inputs
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

const txSig = ({date, amount, total}) => `${date.toFormat('yyyy-MM-dd')} ${amount} ${total}`;

function parseRawCsv (raw) {
  // when I pull out raw transactions, I reverse them, because the default format stores them old->new
  // if I introduce raw-dir transformers, I can probably do away with this entirely
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
  ).reverse();
}

function parseAccountCsv (csv) {
  return papa.parse(csv, parserConf).data.map(
    ([date, amount, total, tags, label]) => {
      date = DateTime.fromFormat(date, 'yyyy-MM-dd')
      amount = parseFloat(amount)
      total = parseFloat(total)
      tags = tags.split(/\s+/).filter(tag => !_.isEmpty(tag))
      return {date, amount, total, tags, label};
    }
  )
}

async function newRawFiles (rawFolder) {
  const knownFiles = (
    await rawFolder.walk('.done').touch()
      .then(done => done.text())
      .then(text => text.split("\n"))
  );
  const isTarget = fsn => (
    fsn.name.toLowerCase().endsWith('.csv') && 
    !knownFiles.includes(fsn.name)
  );

  return rawFolder.files().then(files => files.filter(isTarget))
}

async function newRawTransactionLists (rawFolder) {
  const files = await newRawFiles(rawFolder);
  return (Promise.all(files.map(f => f.text().then(parseRawCsv)))
    // if we're going to work through more than one, we should do them "in order"
    .then(txLists => _.sortBy(txLists, txs => _.last(txs)?.date))
  );
}



/*
okay, what does merging mean, now that we're rolling the total into the transaction?
gotta find the last transaction that they both have, and then take everything AFTER that from the new transactions,
and keep everything AFTER that

there are two things that I can look for:
  - legitimately new transactions
  - discrepancies between known and new transactions

when I find discrepancies, what should I DO with them?
  well, I could just include them directly, right?
  then, the audit can flag them for investigation and manual sync

with all of that, what's the plan?
  - identify the last transaction that's in BOTH
*/

function mergeTransactions (knownTransactions, newTransactions) {

  // I'm going to do this _very_ naively, because I kinda don't give a shit, 
  // but it's very reasonable to expect that transactionsA is _very_ long, and most of it is obviously irrelevant
  // so let's restrict ourselves to the slice that at least _temporally_ overlaps
  const lastDate = _.last(newTransactions).date
  const knownRelevant = _.takeWhile(knownTransactions, txA => txA.date >= lastDate)

  const newSyncIndex = newTransactions.findIndex(txB => {
    const sigB = txSig(txB);
    return knownRelevant.find(txA => sigB === txSig(txA))
  });

  // everything before the sync point is _actually_ new
  const actuallyNewTransactions = newTransactions.slice(0, newSyncIndex);

  // slam the new shit on the front, then stable-sort by reverse-date
  // this way, 'new' transactions will always come before 'old' transactions that they've probably displaced
  return _.sortBy(
    actuallyNewTransactions.concat(knownTransactions),
    []
  )
}


// identify transactions with errors, and tag them
function audit (txs) {
  const errors = []
  _.reduce(txs, (txA, txB, index) => {
    const expectedTotal = toNearestCent(txB.total + txA.amount)
    if (txA.total != expectedTotal) {
      const op = (txA.amount > 0) ? "+" : "-"
      txB.error = `total was ${txA.total}; expected ${expectedTotal} = ${txB.total} ${op} ${Math.abs(txA.amount)}`
    }
    return txB
  })
}


function partitionTxsByWeek (transactions) {
  const chunkedByWeek = [];
  let week = []

  transactions.forEach(tx => {
    if (_.isEmpty(week)) {
      week.push(tx);
      return;
    }

    const sunday = week[0].date.minus({days: 7 - week[0].date.weekday})
    if (tx.date >= sunday) {
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
  const { isFile } = await fsNode.info();
  if (!isFile) {
    throw 'loadAccount must be called on a file, not a directory'
  } 

  const [,name] = fsNode.name.match(/^(.*)\.[^.]+$/)
  if (!name) {
    throw 'loadAccount files must have an extension (usually .acct)'
  }

  const transactions = await fsNode.text().then(parseAccountCsv);

  const account = Object.create(AccountProto);
  Object.assign(account, { name, fsNode, transactions })

  return account;
}



const AccountProto = {

  get total () {
    return _.last(this.transactions)?.total
  },

  get errors () {
    return this.transactions.filter(tx => tx.error);
  },

  toString: function () {
    return partitionTxsByWeek(this.transactions)
      .map(transactionsTableStr)
      .join('\n\n')
  },

  save: async function () {
    const currentText = this.toString();
    const existingText = await this.fsNode.text();

    return this.currentText !== existingText 
      ? this.fsNode.write(currentText)
      : null;

    /*
    // this version cuts a backup, which I don't think is my job;
    if (this.currentText !== existingText) {
      const filename = this.fsNode.name;
      const mvRes = await this.fsNode.move(filename + '.bk', {overwrite: true});
      console.log("backup res", mvRes)

      this.fsNode.parent.write(filename, currentText);
      this.fsNode = this.fsNode.parent.children[filename];
    }
    */
  },

  processFiles: async function () {
    await this.loadNewTransactions();
    await this.markAllRawAsDone();
    await this.save();
    return this;
  },


  loadNewTransactions: async function () {
    const rawDir = this.fsNode.walk(`../${this.name}`);
    const newTransactionLists = await newRawTransactionLists(rawDir);
    this.transactions = newTransactionLists.reduce(
      (knownTxs, newTxs) => mergeTransactions(knownTxs, newTxs),
      this.transactions
    );

    audit(this.transactions);
    return this;
  },

  markAllRawAsDone: async function () {
    const rawDir = this.fsNode.walk(`../${this.name}`);
    const rawFiles = await newRawFiles(rawDir);

    const newNames = await Promise.all(rawFiles.map(async (file) => {
      const transactions = await file.text().then(text => parseRawCsv(text));

      console.log('markAllRawAsDone', file.name, transactions)

      if (_.isEmpty(transactions)) {
        return null;
      }

      const name = (
        _.first(transactions).date.toFormat('yyyy-MM-dd') + '_' +
        _.last(transactions).date.toFormat('yyyy-MM-dd')
      );

      const takenNames = await rawDir.children().then(children => children.map(child => child.name))

      // if we haven't already, rename the file with the date to which it is current
      if (!file.name.startsWith(name)) {
        let filename = `${name}.csv`

        // is our name already taken? let's append a suffix
        let n = 1;
        while (takenNames.includes(filename)) {
          filename = `${name}-${n++}.csv`
        }

        if (filename !== file.name) {
          file = file.move(filename)
        }
      }

      return file.name;
    }))



    const done = rawDir.walk('.done');
    const updatedList = _.uniq(
      (await done.text()).split("\n").concat(newNames)
    ).filter(f => !_.isEmpty(f)).join("\n");

    return done.write(updatedList);
  }

}






module.exports = {
  loadAccount,
  partitionTxsByWeek,
}