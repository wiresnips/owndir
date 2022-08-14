const os = require('os')
const fs = require('fs');
const fsp = require('fs/promises');
const pathUtil = require("path");

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
  return items[randInt(items.length)]
}  

function merge (...objects) {
  var res = {}
  objects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key] != null)
        res[key] = obj[key]})})
  return res
}

function takeKeys (m, ...keys) {
  var res = {}
  keys.forEach(key => {
    if (key in m)
      res[key] = m[key]})
  return res
}

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
  return expressRequest.protocol + "://" + expressRequest.get("host")
}

function epoch () {
  return Math.floor(Date.now() / 1000)
}


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

const withNonTempDir = (prefix, f) => {
    if (prefix && !f) {
      f = prefix
      prefix = ''
    }
    return fsp.mkdtemp(pathUtil.resolve(os.tmpdir(), prefix || ''))
    .then((dir) => {
      // console.log(`rm -r ${dir}`)
      tempDir = `${dir}`;
      return f(dir)
    })
}

const withTempDir = (prefix, f) => {
    if (prefix && !f) {
      f = prefix
      prefix = ''
    }

  let tempDir = null;
  return withNonTempDir(prefix, (dir) => {
    tempDir = dir;
    return f(dir);
  }).finally(() => {
    fsp.rmdir(tempDir, {recursive: true})
  })
}




module.exports = {
  isFile,
  isDirectory,
  withNonTempDir,
  withTempDir,
  slurp: (path) => fs.readFileSync(pathUtil.resolve(path), "utf8"),
  epoch,
  randInt,
  randItem,
  coinflip: () => randItem(true, false),
  shuffle,
  times,
  repeat,
  reverseStr: (s) => s.split("").reverse().join(""),
  partition,
  merge,
  takeKeys,
  home
}
