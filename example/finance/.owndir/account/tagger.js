
const tagMatchers = [
  ["groceries", [
    "loblaw", "farm boy",
  ]],

  ["rent", [
    "landlord inc"
  ]],

  ["restaurant", [
    // generic
    "restaurant", "tavern", "coffee", "pizza", "souvlaki",
    "shawarma", "greco", "thai", "burger", "asian food", "pizzeria",
    /k[ae]bab/, "burrito", "diner", "pho", "vietnamese", "sushi", 
    "skipthedishes",

    // actual restaurants
    "subway", "tim horton", "dunkin", "mcdonald", "harveys", "swiss chalet",
    "starbucks", "kfc", "asian legend", "tea lounge", "mexican rest",

    // bars
    "brew pub", "irish pub", "wild wing", "industry bar", "the keg", "mill street pub"
  ]],

  ["alcohol", [
    "wine", "beer"
  ]],

  ["salary", [
    "payroll"
  ]],

  ["transfer", [
    /from - \*{5}\d{2}\*\d{4}/,
    /pc (from|to) \d{6,20}/,
    /tfr-(from|to) \d{6,20}/,
    (tx) => Math.abs(tx.amount) > 999 && tx.label.match(/e-?transfer/i)
  ]],
  
  ["household", [
    "staples", /wal.?mart/, "target"
  ]],

  ["utilities", [
    "internet", 
    "virgin mobile",
    "hydro",
    "coinamatic"
  ]],


  ["games", [
    "steam purchase", "steamgames"
  ]],

  ["travel", [
    "greyhound", "greyhnd", "petro", "amtrak", "united air", "usairways", "avis", 
    "air canada", "wyndham garden", "porter air", "on-street parking",
    "discount car & truck", "priceline", "gulf oil", "hertz"
  ]]
]


const _ = require('lodash')

function matcherPredicate (matchers) {
  const strings = matchers.filter(_.isString)
  const regexes = matchers.filter(_.isRegExp)
  const predicates = matchers.filter(_.isFunction)

  if (!_.isEmpty(strings) || !_.isEmpty(regexes)) {
    const masterRegex = new RegExp([...strings, ...regexes.map(r => r.source)].join('|'), 'i');
    predicates.unshift((tx) => masterRegex.test(tx.label))
  }

  return (tx) => predicates.some(predicate => !!predicate(tx))
}

const tagPredicates = tagMatchers.map(
  ([tag, matchers]) => [tag, matcherPredicate(matchers)]
);

function tag (tx) {
  for ([tag, predicate] of tagPredicates) {
    if (predicate(tx)) {
      return tag;
    }
  }
  return null;
}

module.exports.tag = tag;


// for the purposes of demonstration, use the autotagger to 
const tagExamples = tagMatchers.reduce((ex, [category, matchers]) => {
  ex[category] = matchers.filter(_.isString)
}, {})

module.exports.tagExamples = tagExamples;