
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

  "td-household": (account, rawText) => {
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
    ).reverse(); // td records transactions oldest->newest, which is backwards
  },

  "scotia-main": scotiaParseDebit,
  "scotia-savings": scotiaParseDebit,
  "scotia-credit": scotiaParseCredit
}




function scotiaParseDebit (account, rawText) {

  const transactions = parseCSV(rawText).map(
    ([date, amount, chequeNo, type, label]) => {
      date = DateTime.fromFormat(date, 'M/d/yyyy')
      amount = parseFloat(amount)
      type = scotiaDebitType(type)?.replace(/\s+/g, ' ')
      label = scotiaDebitLabel(label)?.replace(/\s+/g, ' ')
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

  return scotiaPopulateTotals(account, transactions)
}


function scotiaParseCredit (account, rawText) {

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

  return scotiaPopulateTotals(account, transactions)
}




function scotiaPopulateTotals (account, transactions) {

  // scotia transactions don't include "total" - we have to crib from the account
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


function scotiaDebitType (type) {
  // straight-up eliminate the most common labels - they're just noise
  switch (type) {
    case "pos purchase": return "";
    case "bill payment": return "";
    default: return type
  }
}

function scotiaDebitLabel (label) {
  // if the label is exactly thirty chars, the last five are the city
  // which I am going to discard, becaue fuck that
  if (label.length === 30) {
    return label.slice(0,-5).trim()
  }
  return label
}

function scotiaCreditLabel (label) {
  // eh, dunno if I really care about this ...
  // if (label.match(/amt\s*(\d+\.\d\d)\s*(united states dollar)?\s*$/)) {}
  return label;
}