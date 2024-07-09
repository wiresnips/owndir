const _ = require('lodash')

// this requires a polyfill for the node globals
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
        .map(([k, v]) => (
          isBasic(v) ? [k, v] :
          _.isEmpty(v) ? null :
          [k, JSON.stringify(v)]
        ))
        .filter(kv => kv)
    );

  return (new URLSearchParams(m)).toString()
}

function callUrl (fsNode, call, params) {

  // stupid carveout for the root, avoids double leading slashes
  const path = fsNode.relativePath != '' 
    ? `/${fsNode.relativePath}`
    : '';

  params = params || {};
  params.call = call;

  return `${path}/@?${queryStr(params)}`
}

function canBeWriteData (maybeData) {
  return (
    _.isString(maybeData) || 
    _.isBuffer(maybeData) || 
    maybeData instanceof stream.Readable 
  )
}


const subPollInterval = 500;

const Interface = {

  children: async function () {
    const res = await fetch(callUrl(this, 'children'));
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

    const res = await fetch(callUrl(this, 'delete'), {method: 'POST'});
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

    const res = await fetch(callUrl(this, 'info'))
    if (res.status !== 200) {
      throw await res.json();     
    }

    return res.json();
  },

  makeDir: async function (path) {
    if (path) {
      return this.walk(path).makeDir();
    }

    const res = await fetch(callUrl(this, 'makeDir'), {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);    
  },

  move: async function (path, opts) {
    const res = await fetch(callUrl(this, 'move', {path, opts}), {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);
  },

  read: async function (start, end) {
    const res = await fetch(callUrl(this, 'read', {start, end}))
    if (res.status !== 200) {
      throw await res.json(); 
    }

    return res.body;
  },

  readAll: async function () {
    const res = await fetch(callUrl(this, 'read'))
    if (res.status !== 200) {
      throw await res.json(); 
    }

    return res.arrayBuffer();
  },

  sub: function (paths, events, listener, opts) {

    // paths and events are optional, grant them defaults and shuffle the args down
    if (_.isFunction(paths)) {
      opts = events;
      listener = paths;
      events = ["all"];
      paths = ["."];
    } else if (_.isFunction(events)) {
      opts = listener;
      listener = events;
      events = paths;
      paths = ["."];
    }

    // massage args into expected shapes
    if (!_.isArray(paths)) {
      paths = [paths];
    }

    if (!_.isArray(events)) {
      events = [events];
    } else if (events.includes('all')) {
      events = ['all'];
    }


    // console.log("SUB", {paths, events, opts})

    let subId, pollInterval;

    fetch(callUrl(this, 'sub', {paths, events, opts})).then(async res => {
      if (res.status !== 200) {
        listener("error", this, json);
        return;
      }
      
      const json = await res.json();
      subId = json.subId;
      const self = this;

      async function poll () {
        const res = await fetch(callUrl(self, 'sub', {subId}))
        if (res.status !== 200) {
          console.error(`sub poller for ${self.absolutePath} returned non-200?`)
          throw res;
        }
        const events = await res.json();
        if (_.isEmpty(events)) {
          return false;
        }
        else {
          // console.log({events})
          events.forEach(([event, path]) => listener(event, self.root.walk(path)));
          return true;
        }
      }

      // if we expect an initial event, wait for it _impatiently_
      var expectInitial = !opts?.ignoreInitial;
      var running = true;

      while (expectInitial && running) {
        if (await poll()) {
          expectInitial = false;
        }
      }

      if (running) {
        pollInterval = setInterval(poll, subPollInterval);
      }
    });

    return () => {
      expectInitial = false;
      running = false;
      clearInterval(pollInterval);
      fetch(callUrl(this, 'sub', {subId, unsub: true }));
    }
  },

  touch: async function (path) {
    if (path) {
      return this.walk(path).touch();
    }

    const res = await fetch(callUrl(this, 'touch'), {method: 'POST'});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json()
    return this.root.walk(newPath);        
  },

  write: async function (path, data, opts) {
    //console.log("write", this.absolutePath, {path, data, opts})

    // because path is optional and data is not, we have to check whether arg2 can be data
    // if a path WAS given, we walk it FIRST, so after this point, we can normalize our args
    if (canBeWriteData(data)) {
      return this.walk(path).write(data, opts);
    }

    // realign args
    opts = data;
    data = path;
    path = null;

    const res = await fetch(callUrl(this, 'write', opts), {method: 'POST', body: data});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json();
    return this.root.walk(newPath);    
  },

}
