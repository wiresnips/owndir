const _ = require('lodash')

// this requires a polyfill for the node globals
const pathUtil = require("path")
const stream = require('stream')


const { Directory } = require('./directory.js')
module.exports.init = (OwnDir) => Directory("/", OwnDir, Interface);



function isBasic (x) {
  return _.isBoolean(x) || _.isNumber(x) || _.isString(x)
}

function queryStr (m) {
  // this feels like a _lot_
  // drop empty strings & arrays, drop null && undefined, stringify things that aren't basic types
  m = Object.fromEntries(
      Object.entries(m)
      .filter(([k, v]) => !_.isEmpty(v))
      .map(([k, v]) => (
        isBasic(v) ? [k, v] :
        [k, JSON.stringify(v)]
      ))
    );
  return (new URLSearchParams(m)).toString()
}

function canBeWriteData (maybeData) {
  return (
    _.isString(maybeData) || 
    _.isBuffer(maybeData) || 
    maybeData instanceof stream.Readable 
  )
}



const Interface = {

  children: async function () {
    const params = queryStr({call: 'children'})
    const url = `${this.relativePath}/@?${params}`
    const res = await fetch(url)
    if (res.status !== 200) {
      throw await res.json();         
    }

    const names = await res.json();
    return names.map(name => this.walk(name))
  },

  delete: async function (path) {
    if (path) {
      return this.walk(path).delete();
    }

    const params = queryStr({call: 'delete'});
    const url = `${this.relativePath}/@?${params}`;
    const res = await fetch(url, {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);    
  },

  info: async function (path) {
    if (path) {
      return this.walk(path).info();
    }

    const params = queryStr({call: 'info'})
    const url = `${this.relativePath}/@?${params}`
    const res = await fetch(url)
    if (res.status !== 200) {
      throw await res.json();     
    }

    return res.json();
  },

  makeDir: async function (path) {
    if (path) {
      return this.walk(path).makeDir();
    }

    const params = queryStr({call: 'makeDir'});
    const url = `${this.relativePath}/@?${params}`;
    const res = await fetch(url, {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);    
  },

  move: async function (path, opts) {
    const params = queryStr({call: 'move', path, opts});
    const url = `${this.relativePath}/@?${params}`;
    const res = await fetch(url, {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);
  },

  read: async function (start, end) {
    const params = queryStr({call: 'read', start, end})
    const url = `${this.relativePath}/@?${params}`
    const res = await fetch(url)
    if (res.status !== 200) {
      throw await res.json(); 
    }

    return res.body;
  },

  readAll: async function () {
    const params = queryStr({call: 'read'})
    const url = `${this.relativePath}/@?${params}`
    const res = await fetch(url)
    if (res.status !== 200) {
      throw await res.json(); 
    }

    return res.arrayBuffer();
  },

  touch: async function (path) {
    if (path) {
      return this.walk(path).touch();
    }

    const params = queryStr({call: 'touch'});
    const url = `${this.relativePath}/@?${params}`;
    const res = await fetch(url, {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);        
  },

  write: async function (path, data, opts) {
    console.log("write", this.relativePath, {path, data, opts})

    // because path is optional and data is not, we have to check whether arg2 can be data
    // if a path WAS given, we walk it FIRST, so after this point, we can normalize our args
    if (canBeWriteData(data)) {
      return this.walk(path).write(data, opts);
    }

    // realign args
    opts = data;
    data = path;
    path = null;

    const params = queryStr({call: 'write', opts});
    const url = `${this.relativePath}/@?${params}`;
    const res = await fetch(url, {method: 'POST', body: data})
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);    
  },

}
