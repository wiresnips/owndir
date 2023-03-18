
const _ = require('lodash')
const { DateTime } = require('luxon')
const papa = require('papaparse')

const parseCSV = function (text) {
  return papa.parse(text, {
    comments: "#", 
    skipEmptyLines: "greedy",
    transform: cleanStr
  }).data
}

function cleanStr (str) {
  return str.trim().toLowerCase()
}

const toNearestCent = (value) => {
  return Math.round(value * 100) / 100;
};


module.exports = {
  "debit-1": parseDebitBank1,
  "credit-1": parseCreditBank1,
  "debit-2": parseDebitBank2
}






function parseDebitBank1 (account, rawText) {

  const transactions = parseCSV(rawText).map(
    ([date, amount, chequeNo, type, label]) => {
      date = DateTime.fromFormat(date, 'M/d/yyyy')
      amount = parseFloat(amount)
      type = parseTxTypeBank1(type)?.replace(/\s+/g, ' ')
      label = label.replace(/\s+/g, ' ')
      label = (
        _.isEmpty(label) ? type :
        _.isEmpty(type) ? label :
        `${type}: ${label}` 
      ) || "";

      return { date, amount, label, account };
    }
  )

  transactions.sort((txA, txB) => (
    txA.date > txB.date ? -1 : // <0 [A, B] : if A is newer, it goes first
    txA.date < txB.date ? 1 : // >0 [B, A] : if B is newer, it goes first
    Math.abs(txB.amount) - Math.abs(txA.amount) // if B is bigger, it goes first
  ))

  return populateTotalsBank1(account, transactions)
}


function parseCreditBank1 (account, rawText) {

  const transactions = parseCSV(rawText).map(
    ([date, label, amount]) => {
      date = DateTime.fromFormat(date, 'M/d/yyyy')
      amount = parseFloat(amount)
      return { date, amount, label, account };
    }
  ).reverse()

  transactions.sort((txA, txB) => (
    txA.date > txB.date ? -1 : // <0 [A, B] : if A is newer, it goes first
    txA.date < txB.date ? 1 : // >0 [B, A] : if B is newer, it goes first
    Math.abs(txB.amount) - Math.abs(txA.amount) // if B is bigger, it goes first
  ))

  return populateTotalsBank1(account, transactions)
}




function populateTotalsBank1 (account, transactions) {

  // bank-1 transactions don't include "total" - we have to crib from the account
  // 1- assume that the oldest "new" transaction is already known
  // 2- open account.transactions and go find the TOTAL before that transaction
  // 3- calculate forwards, saving into 

  const oldestNew = _.last(transactions);
  const {date, amount, label} = oldestNew;

  const knownRelevant = _.takeWhile(account.transactions, txA => txA.date >= date)
  const knownIndex = knownRelevant.findIndex(txA => (
    txA.label === label && 
    txA.amount === amount && 
    txA.date.equals(date)
  ))

  transactions.reverse();
  let total = account.transactions[knownIndex + 1]?.total || 0;

  for (const tx of transactions) {
    total = toNearestCent(total + tx.amount)
    tx.total = total;
  }

  return transactions.reverse();
}


function parseTxTypeBank1 (type) {
  // straight-up eliminate the most common labels - they're just noise
  switch (type) {
    case "pos purchase": return "";
    case "bill payment": return "";
    default: return type
  }
}


function parseDebitBank2  (account, rawText) {
  return parseCSV(rawText).map(
    ([date, label, out$, in$, total]) => {
      date = DateTime.fromFormat(date, 'MM/dd/yyyy')
      out$ = parseFloat(out$)
      in$ = parseFloat(in$)
      total = parseFloat(total)
      label = label.replace(/\s+/g, ' ')

      const amount = out$ ? -(Math.abs(out$)) : Math.abs(in$);
      return { date, amount, total, label, account };
    }
  ).reverse(); // bank-2 records transactions oldest->newest, which is backwards
}