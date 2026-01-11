const _ = require('lodash')
const { QueueStream } = require('../utils/queue.js')

// this requires a polyfill for the node globals
const stream = require('stream')

const { Directory } = require('./directory.js')
module.exports.init = async () => Directory("/", await Interface());


function openSocket (url) {
  const socket = new WebSocket(url); 
  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      // console.log("SOCKET OPEN", {event})
      resolve(socket)
    }
  })
}

// queue this up as fast as possible
const socketPromise = openSocket(`ws://${window.location.host}`); 


const METHODS = {
  children: 0, 
  delete:   1, 
  info:     2, 
  makeDir:  3, 
  move:     4, 
  read:     5, 
  touch:    6, 
  sub:      7,
  write:    8
}

// methods contains it's inverse, for easy validity checking
Object.keys(METHODS).forEach(key => METHODS[METHODS[key]] = key)

// not clear to me why I would ever need more than one of these
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function canBeWriteData (maybeData) {
  return (
    _.isString(maybeData) || 
    _.isArrayBuffer(maybeData) || 
    maybeData instanceof Blob ||
    maybeData instanceof stream.Readable 
  )
}



async function Interface () {
  // console.log("INTERFACE CREATION")

  let nextReqId = 1;
  const requests = {};
  const socket = await socketPromise;

  socket.onclose = (event) => console.log("SOCKET CLOSE", {event});
  socket.onerror = (event) => console.error("SOCKET ERROR", {event});

  function send (fsNode, method, args, callback) {
    const reqId = nextReqId++;
    requests[reqId] = callback;
    // console.log("fsNode ws send", {reqId, fsNode, method: METHODS[method], args, callback, socket})

    // sending a lot of 'null' when args doesn't exist here, but that'll get cleaned up in the eventual 
    // switch to a binary format - at this stage, code clarity for future-me is more important than efficiency
    socket.send(JSON.stringify([reqId, fsNode.path, method, args]));
    return reqId;
  }

  function cleanup (reqId) {
    // console.log("cleanup", reqId)
    if (reqId) {
      delete requests[reqId];
    }
  }

  socket.onmessage = ({ data }) => {
    // the websocket itself is error-last, not error first, so that in normal operation it can be omitted entirely
    const [reqId, result, error] = JSON.parse(data);

    // console.log("fsNode ws receive", {reqId, result, error, requests})

    const callback = requests[reqId];
    if (callback) {
      callback(error, result)
    }
  }


  return {
    children: async function () {
      return new Promise((resolve, reject) => {
        const callback = (error, childNames) => {
          childNames 
            ? resolve(childNames.map(name => this.walk(name))) 
            : reject(error);
          cleanup(reqId);
        };
        const reqId = send(this, METHODS.children, null, callback);
      })
    },


    delete: async function (path) {
      if (path) {
        return this.walk(path).delete();
      }
      return new Promise((resolve, reject) => {
        const callback = (error) => { !error ? resolve(this) : reject(error); cleanup(reqId); };
        const reqId = send(this, METHODS.delete, null, callback);
      })
    },

    info: async function (path) {
      if (path) {
        return this.walk(path).info();
      }
      return new Promise((resolve, reject) => {
        const callback = (error, fsNodeInfo) => { fsNodeInfo ? resolve(fsNodeInfo) : reject(error); cleanup(reqId); };
        const reqId = send(this, METHODS.info, null, callback);
      })
    },

    makeDir: async function (path) {
      if (path) {
        return this.walk(path).makeDir();
      }
      return new Promise((resolve, reject) => {
        const callback = (error) => { !error ? resolve(this) : reject(error); cleanup(reqId); };
        const reqId = send(this, METHODS.makeDir, null, callback);
      })
    },

    move: async function (path, opts) {
      return new Promise((resolve, reject) => {
        const callback = (error, newPath) => { newPath ? resolve(this.root.walk(newPath)) : reject(error); cleanup(reqId); };
        const reqId = send(this, METHODS.move, [path, opts], callback);
      })
    },

    touch: async function (path) {
      if (path) {
        return this.walk(path).touch();
      }
      return new Promise((resolve, reject) => {
        const callback = (error) => { !error ? resolve(this) : reject(error); cleanup(reqId); };
        const reqId = send(this, METHODS.touch, null, callback);
      })
    },

    sub: function (events, paths, listener, opts) {

      // paths and events are optional, grant them defaults and shuffle the args down
      if (_.isFunction(events)) {
        opts = paths;
        listener = events;
        paths = ["."];
        events = ["all"];
      } else if (_.isFunction(paths)) {
        opts = listener;
        listener = paths;
        paths = events;
        events = ["all"];
      }

      // massage args into expected shapes
      if (!_.isArray(events)) {
        events = [events];
      }
      if (!_.isArray(paths)) {
        paths = [paths];
      }

      // console.log("sub", {paths, events, opts})

      const callback = (error, [event, fsNodePath]) => listener(event, this.root.walk(fsNodePath));
      const reqId = send(this, METHODS.sub, [events, paths, opts], callback);

      return () => {
        cleanup(reqId);
        socket.send(JSON.stringify([reqId]))
      };
    },

    read: async function (path, start, end) {
      if (_.isString(path)) {
        return this.walk(path).read(start, end)
      }

      end = start
      start = path
      path = null;

      return new Promise((resolve, reject) => {
        let ongoing = true;
        let resolved = false;
        const { queue, stream } = QueueStream();

        queue.onPull = ([error, chunk]) => {
          // check for errors
          if (error) {
            ongoing = false;
            stream.cancel();
            if (!resolved) {
              resolved = true;
              reject(error);
            }
          }

          // no passthrough if we've stopped
          if (!ongoing) {
            return undefined;
          }

          if (!resolved) {
            resolved = true;
            resolve(stream);
          }

          // if this is the end of the stream, we can do our own cleanup now
          if (!chunk) {
            cleanup(reqId);
            return null;
          }

          // text -> binary
          return textEncoder.encode(chunk)
        }

        const callback = (error, chunk) => {
          queue.push([error, chunk])
        };
        const reqId = send(this, METHODS.read, [start, end], callback);
      })
    },

    readAll: async function (path) {
      const stream = await this.read(path);
      const response = new Response(stream);
      return response.arrayBuffer();
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

      if (!canBeWriteData(data)) {
        throw new Error(
          `typeof data was ${typeof data}\n` + 
          "Must be one of [String, ArrayBuffer, Blob, ReadableStream]."
        );
      }

      return new Promise(async (resolve, reject) => {
        let reqId = null;
        const callback = (error) => {
          error ? reject(error) : resolve(this); 
          cleanup(reqId);     
        };

        // don't know if I trust this yet, but it also hasn't really come up
        if (data instanceof stream.Readable) {
          for await (const chunk of data) {
              if (!reqId) {
                // console.log("SEND", [null, null, METHODS.write, [await toa(chunk)]])
                reqId = send(this, METHODS.write, [await toa(chunk), opts])
              } else {
                // console.log("SEND", [reqId, null, METHODS.write, [await toa(chunk)]])
                socket.send(JSON.stringify([reqId, null, METHODS.write, [await toa(chunk)]]));
              }
          }  
        }
        else {
          reqId = send(this, METHODS.write, [await toa(data), opts], callback);
        }

        // one tap with no data indicates "done"
        socket.send(JSON.stringify([reqId, null, METHODS.write]));
      })
    },
  }
}

async function toa (data) {
  if (_.isString(data)) {
    return window.btoa(data)
  }
  if (_.isArrayBuffer(data)) {
    return new Uint8Array(data).toBase64()
  }
  if (data instanceof Blob) {
    return data.bytes().then(bytes => bytes.toBase64())
  }
  else {
    console.error("don't know how to convert this:", data);
    return null;
  }
}




