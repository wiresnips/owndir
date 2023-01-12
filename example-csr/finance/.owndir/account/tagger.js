
const tagMatchers = [
  ["groceries", [
    "massine", "loblaw", /herb.*spice/, "farm boy",
  ]],

  ["rent", [
    "paramountpro"
  ]],

  ["restaurant", [
    // generic
    "restaurant", "ristorant", "tavern", "coffee", "pizza", "souvlaki",
    "shawarma", "greco", "thai", "burger", "asian food", "pizzeria",
    "burrito", "diner", "dining car", "pho", "vietnamese", "sushi",
    "skipthedishes",

    // actual restaurants
    "subway", "tim horton", "dunkin", "mcdonald", "harveys", "swiss chalet",
    /bread.*sons/, /k[ae]bab/, "east cafe", "starbucks", /bodo.*bagel/,
    "cafe europa", "boylan", "mexican grill", "mellow mushroom",
    "the villa", "german town deli", "cafemantic", "classic cafe",
    "kirin express", "antrim truck center", /wawa \d\d/, "harmony veg", 
    "the works", "hamachi kita", "johnny farina", "east india company", 
    "lemon grass", "ichido ramen", "ceylonta", "panera bread", "blackbird pizz", 
    "prinzo", /calin.s bistro/, "kfc", "stone face dolly", "fado philadelphia", 
    "kasbah village morocca", "green door", "asian legend", "tea lounge", 
    "mexican rest", "clover ottaw", "euro-mex", "villa capri", "pure kitchen",
    "occo kitchen", 

    // bars
    "atomic rooster", "royal oak", "brew pub", /bar.*grill/, "long shots", 
    "pub italia", "rish pub", "hooley", "celtic cross", "whetstone station", 
    "james street pub", "brass monkey", /heart.*crown/, /big rig.*brewer/, 
    /grace.*malley/, "local heroes", "copabanana", "manny brown", 
    "baja bean co", /bear.*den/, "inferno entertainment", "millers", 
    "wild wing", /mike.*place/, "summerhays", "monkey joe", "flanagans", 
    "new deck", "yakitori boy", "barley mow", "whiskey jar", /metro. brasserie/, 
    "jaripeo", "fellini", /clock.*tower/, "sir john a", "union ottawa", 
    "jose pistolas", "industry bar", "corner foodery", "the victoria f", 
    "ranstead room", "woody's pub", "deacon brodies", "vol de nuit", "good dog", 
    "fergie's pub", "pattys pub", "maximum bevera", "city steam brewery", 
    "house of targ", "barcade", "brothers beer bistro", "the keg", 
    "aulde dubliner", "level one", "pour boy pub", "mill street pub",
    /lieutenant.s pu/, "lookout bar", "swizzle"
  ]],

  ["alcohol", [
    "lcbo", "wine", "beer store"
  ]],

  ["salary", [
    "payroll"
  ]],

  ["transfer", [
    /from - \*{5}\d{2}\*\d{4}/,
    /pc (from|to) \d{8,20}/,
    /tfr-(from|to) \d{8,20}/,
    (tx) => Math.abs(tx.amount) > 999 && tx.label.match(/e-?transfer/i)
  ]],
  
  ["household", [
    "staples", "dollar it", /wal.?mart/, "target", "kmart", 
    "canadian tire", "cdn tire",
  ]],

  ["utilities", [
    /cra.*tax owing/, 
    /t.?s.?i.? internet/, 
    "virgin mobile", "koodo", "chatr",
    "hydro", "wyse meter",
    "coinamatic"
  ]],

  ["subs", [
    "patreon"
  ]],

  ["games", [
    "steam purchase", "steamgames"
  ]],

  ["tech-subs", [
    "amazon web services",
    "name-cheap",
    'cloudti'
  ]],

  ["travel", [
    "greyhound", "greyhnd", "macewen", "petro", "amtrak", "united air",
    "usairways", "avis", "stena line", "air canada", "ottawa airport",
    "wyndham garden", "philadelphia taxi", "porter air", "on-street parking",
    "heron on the run", "sunoco", "hartford parking auth", "express salaberry",
    "discount car & truck", "priceline", "gulf oil", "hertz", "ottawa parking",
    /blue line \d+ taxi/, "station centrale", "bicycle transit"
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