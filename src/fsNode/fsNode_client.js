const FsNodeProto = require('./fsNode.js')
const _ = require('lodash')

// this requires a polyfill for the node globals
const pathUtil = require("path")

function isBasic (x) {
  return _.isBoolean(x) || _.isNumber(x) || _.isString(x)
}

function queryStr (m) {
  console.log('queryStr', m)

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

  console.log('        ', m)

  return (new URLSearchParams(m)).toString()
}




const proto = {
  read: function (start, end) {
    const params = queryStr({call: 'read', start, end})
    const path = `${this.relativePath}/@?${params}`
    return fetch(path).then(res => {
      if (res.status === 200) {
        return res.body
      } else {
        return res.json().then(json => {
          throw json
        })
      }
    })
  },

  readAll: function () {
    const params = queryStr({call: 'read'})
    const path = `${this.relativePath}/@?${params}`
    return fetch(path).then(res => {
      if (res.status === 200) {
        return res.arrayBuffer()
      } else {
        return res.json().then(json => {
          throw json
        })
      }
    })
  },

  write: async function (filename, data, opts) {
    console.log("write", {filename, data, opts})


    if (this.isDirectory && this.children[filename]) {
      return this.children[filename].write(data, opts)
    }

    if (this.isFile) {
      opts = data
      data = filename
      filename = ''
    }

    const params = queryStr({call: 'write', filename, opts});
    const path = `${this.relativePath}/@?${params}`;
    const res = await fetch(path, {method: 'POST', body: data})
    const json = await res.json()

    if (res.status !== 200) {
      throw json;
    }

    return json; 
  },

  move: async function (destPath, opts) {
    if (FsNodeProto.isPrototypeOf(destPath)) {
      destPath = destPath.relativePath
    }

    const params = queryStr({call: 'move', dest: destPath, opts});
    const path = `${this.relativePath}/@?${params}`;
    const res = await fetch(path, {method: 'POST'});
    const json = await res.json();
    if (res.status !== 200) {
      throw json;
    }

    // we need to mirror the moves on the server-side
    const relDestPath = pathUtil.resolve(this.relativePath, '..', destPath);
    let destFsNode = this.root.walk(relDestPath, {bestEffort: true});
    destFsNode = destFsNode.isDirectory ? destFsNode : destFsNode.parent;
    const novelPath = pathUtil.relative(destFsNode.relativePath, relDestPath);

    const origParent = this.parent;
    destFsNode.adoptChild(this, novelPath);
    destFsNode.sync()
    origParent.sync()

    return json; 
  },



  
  sync: async function () {
    const server = await fetch(`${this.relativePath}/@`).then(res => res.json())
    const synced = DESC_ATTRS.every(attr => this[attr] === server[attr])

  }


}

Object.setPrototypeOf(proto, FsNodeProto);

module.exports = proto;