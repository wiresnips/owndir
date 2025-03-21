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

    // console.log("sub", {paths, events, opts})

    let subId = null;
    let running = true;
    const self = this;

    function poll () {
      // console.log("sub poll", self.path, {paths, events, opts, subId} )

      let subUrl = subId
        ? callUrl(self, 'sub', {subId}) 
        : callUrl(self, 'sub', {paths, events, opts});
      if (running) {
        fetch(subUrl).then(handleResponse)
      }
    }

    function stop () {
      // console.log("sub stop", self.path, {paths, events, opts} )

      if (running) {
        fetch(callUrl(self, 'sub', {subId, unsub: true }));
        running = false;
      }
    }

    async function handleResponse (res) {
      // console.log("sub handleResponse", self.path, res );

      if (res.status == 200) {
        const json = await res.json();
        subId = json.subId;
        
        poll(); // restart the wait before handling the listeners

        for (const [event, path] of json.events) {
          listener(event, self.root.walk(path))
        }
        return;
      }

      // if we notice the server timing us out, just re-run the poll to keep the sub alive
      // the server has a 5-second grace period, so the status: 408 is more of a warning shot
      else if (res.status == 408) {
        poll();
        return;
      } 

      // any other status, something has gone WRONG
      stop();
      if (events.includes("error") || events.includes("all")) {
        listener("error", self, res.body); // man, I dunno what this wants
      } else {
        console.error(`Error in sub for ${self.absolutePath} - returned status ${res.status}`);
        throw res;
      }
    }

    // launch the long-poll loop and return the stop button
    poll(); 
    return stop;
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

    // because path is optional and data is not, we have to check whether arg2 can be data
    // if a path WAS given, we walk it FIRST, so after this point, we can normalize our args
    if (canBeWriteData(data)) {
      return this.walk(path).write(data, opts);
    }

    // realign args
    opts = data;
    data = path;
    path = null;

    // console.log("write", this.absolutePath, {path, data, opts})

    // note: this flatly does not work in firefox
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#browser_compatibility
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1387483
    // also note that chrome requires http/2 and https
    // see also: https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests

    const res = await fetch(callUrl(this, 'write', opts), {method: 'POST', body: data});
    if (res.status !== 200) {
      throw await res.json(); 
    }
    
    const { path: newPath } = await res.json();
    return this.root.walk(newPath);    
  },

}
