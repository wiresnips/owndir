const fsNodeProto = require('./fsNode.js')

function queryStr (m) {
  // this feels like a _lot_
  // drop empty strings & arrays, drop null && undefined
  m = Object.fromEntries(
      Object.entries(m)
      .filter(([k, v]) => !(v?.length === 0) && 
                          !(v === null) &&
                          !(v === undefined)
      )
    );

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


}

Object.setPrototypeOf(proto, fsNodeProto);

module.exports = proto;