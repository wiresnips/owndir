var fs = require('fs');
var pathUtil = require("path");
var time = require("time");

function randInt (from, to) {
  if (to == undefined) {
    to = from;
    from = 0;
  }
  return Math.floor((Math.random() * (to - from)) + from)}

function partition (arr, n) {
  var len = arr.length;
  var partitioned = []
  for (var i = 0; i < len; i += n)
    partitioned.push(arr.slice(i, i + n))

  return partitioned}

function shuffle (a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;}
  return a}

function randItem (...items) {
  if (items.length == 1 && items[0] instanceof Array)
    items = items[0]
  return items[randInt(items.length)]}  

function merge (...objects) {
  var res = {}
  objects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key] != null)
        res[key] = obj[key]})})
  return res}

function takeKeys (m, ...keys) {
  var res = {}
  keys.forEach(key => {
    if (key in m)
      res[key] = m[key]})
  return res}

function times (n, f, ...args) {
  let arr = []
  for (let i = 0; i < n; i++)
    arr.push(f(...args))
  return arr
}

function repeat (n, x) {
  let arr = []
  for (let i = 0; i < n; i++)
    arr.push(x)
  return arr
}

function home (expressRequest) {
  return expressRequest.protocol + "://" + expressRequest.get("host")}

function epoch () {
  return Math.floor(Date.now() / 1000)}


function isFile (path) {
  var path = pathUtil.resolve(dir)
  if (!fs.existsSync(path))
    return false;
  
  return fs.statSync(path).isFile()
}

function isDirectory (path) {
  var path = pathUtil.resolve(dir)
  if (!fs.existsSync(path))
    return false;
  
  return fs.statSync(path).isDirectory()
}









function easter (year) {
  var f = Math.floor,
      // Golden Number - 1
      G = year % 19,
      C = f(year / 100),
      // related to Epact
      H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
      // number of days from 21 March to the Paschal full moon
      I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
      // weekday for the Paschal full moon
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
      // number of days from 21 March to the Sunday on or before the Paschal full moon
      L = I - J,
      month = 3 + f((L + 40)/44),
      day = L + 28 - 31 * f(month / 4);

  // subtract one to bring the month to zero
  // return new Date(year, month -1, day)
  return [month - 1, day];
}

const [sun, mon, tues, wed, thurs, fri, sat] =
        [0, 1, 2, 3, 4, 5, 6]

const [jan, feb, mar, apr, may, june, july, aug, sept, oct, nov, dec] =
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const provinces = ["ON", "QC", "NS", "NB", "MB", "BC", "PE", "SK", "AB", "NL"]
const [ON, QC, NS, NB, MB, BC, PE, SK, AB, NL] = provinces


// note that n is one-based: asking for the zeroeth monday will bring you back in time
function nthWeekDay (n, targetWeekDay, month, year) {

  if (!year || !month) {
    let now = new Date()
    year = year || now.getFullYear()
    month = month || now.getMonth()}

  // first question: what weekday is the first?
  var firstWeekDay = new Date(year, month, 1).getDay()

  var dayStep = targetWeekDay - firstWeekDay;
  if (dayStep < 0) dayStep += 7

  var weekStep = ((n - 1) * 7)
  return [month, 1 + dayStep + weekStep]}

function weekDayBefore (targetWeekDay, day, month, year) {
  if (!year || !month) {
    let now = new Date()
    year = year || now.getFullYear()
    month = month || now.getMonth()}

  var date = new Date(year, month, day)
  var dateDay = date.getDay();

  // step should always be backwards
  var step = targetWeekDay - dateDay;
  if (step >= 0) step -= 7

  date.setDate(day + step);
  return [date.getMonth(), date.getDate()]}


const holidays = {}

function loadHolidays (year, province) {
  if (!holidays[year])
    holidays[year] = {}

  if (holidays[year][province]) return

  let [easterMonth, easterDay] = easter(year)

  var national = [
    [jan, 1], // new year's
    weekDayBefore(fri, easterDay, easterMonth, year), // good friday
    [july, 1], // canada day
    nthWeekDay(1, mon, sept, year), // labour day
    nthWeekDay(2, mon, oct, year) // thanksgiving
  ]

  var provincial = []

  // for now, let's just handle ontario
  if (province == ON) {
    provincial = [
      nthWeekDay(3, mon, feb, year), // family day
      weekDayBefore(mon, 25, may, year), // victoria day
      nthWeekDay(1, mon, aug, year), // civic holiday
      [dec, 26] // boxing day
    ]}

  let holidayToString = ([m, d]) => "" + year + "-" + (m+1) + "-" + d
  holidays[year][province] = national.concat(provincial).map(holidayToString)
  // console.log("holidays", holidays)
}

function isHoliday (date, province) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  loadHolidays(year, province)
  return holidays[year][province].includes("" + year + "-" + month + "-" + day)}

function isBusinessDay (date, province, timezone) {
  if (typeof date == "number")
    date = new Date(date * 1000)

  if (timezone)
    date.setTimezone(timezone)

  let day = date.getDay();
  if (day == sat || day == sun) return false;
  if (!province) return true;
  return !isHoliday(date, province)
}

// okay, what's the plan here?
// return epoch time of midnight on the nth business day
// ie, nthBusinessDay(1, <epoch of friday>) => <epoch 12:00 monday night>
//     nthBusinessDay(0, <epoch friday>) => <epoch 12:00 friday night>
//     nthBusinessDay(0, <epoch sunday>) => <epoch 12:00 monday night>
function nthBusinessDay (n, from, province, timezone) {
  from = from || epoch()
  province = province || "ON"
  timezone = timezone || "Canada/Eastern"

  let date = new time.Date(from * 1000);
  date.setTimezone(timezone)

  let step = n >= 0 ? +1 : -1;
  if (n < 0) n = Math.abs(n);

  let startIsBiz = isBusinessDay(date, province)
  if (n == 0 && !startIsBiz) n = 1;

  while (n > 0) {
    date.setDate(date.getDate() + step)
    if (isBusinessDay(date, province))
      n = n - 1;
  }

  // am I going to accidentally fall over from one day into the next?
  // we're going to settle on 11:59 to be safe, and then not worry about it
  // we can worry about timezones and DST later

  // now, skip forwards to 11:59, and return epoch
  date.setHours(23)
  date.setMinutes(59)

  return Math.floor(date.getTime() / 1000)
}









module.exports = {
  isFile: isFile,
  isDirectory: isDirectory,
  slurp: (path) => fs.readFileSync(pathUtil.resolve(path), "utf8"),
  epoch: epoch,
  randInt: randInt,
  randItem: randItem,
  coinflip: () => randItem(true, false),
  shuffle: shuffle,
  times: times,
  repeat: repeat,
  reverseStr: (s) => s.split("").reverse().join(""),
  partition: partition,
  merge: merge,
  takeKeys: takeKeys,
  home: home,
  isBusinessDay: isBusinessDay,
  nthBusinessDay: nthBusinessDay
}
