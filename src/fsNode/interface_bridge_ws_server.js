const _ = require('lodash');
const { WebSocket } = require('ws');
const { QueueStream } = require('../utils/queue.js')

module.exports.FsServer = FsServer

const METHODS = {
  children: 0, 
  delete:   1, 
  info:     2, 
  makeDir:  3, 
  move:     4, 
  read:     5, 
  touch:    6, 
  sub:      7,
  write:    8,
}

// methods contains it's inverse, for easy validity checking
Object.keys(METHODS).forEach(key => METHODS[METHODS[key]] = key)

// not clear to me why I would ever need more than one of these
const textEncoder = new TextEncoder();

function FsServer (appServer, fsNodeRoot) {
  console.log(new Date().getTime(), "LAUNCHING WEBSOCKETS FS-SERVER", {fsNodeRoot, "walk('')": fsNodeRoot.walk('')})
  
  const server = new WebSocket.Server({server: appServer})

  server.on("error", function (error) {
    console.error("websocket FsServer error", error)
  })
  
  server.on("connection", function (socket, request) {
    console.log(new Date().getTime(), "websocket FsServer connection")
    const sendJson = (x) => {
      // console.log(new Date().getTime(), "sendJSON", x)
      socket.send(JSON.stringify(x))
    }

    // keep-alive
    let alive = true;
    socket.on('pong', () => alive = true);
    setInterval(() => {
        if (!alive) { return socket.terminate(); }
        alive = false;
        socket.ping(() => {});
    }, 30000);


    const subscriptions = SubManager(socket);
    const writeStreams = WriteManager(socket);

    socket.on("close", function (code, reason) {
      console.log("websocket FsServer close")
      subscriptions.cleanup();
      writeStreams.cleanup();
    })

    socket.on("error", function (error) {
      console.error("websocket FsServer error", error)
    })
    
    socket.on("message", async function (data, isBinary) {

      // this feels too stupid, right?
      const [reqId, path, method, params] = JSON.parse(data.toString());
      const fsNode = _.isString(path) 
        ? fsNodeRoot.walk(path) 
        : null;

      console.log(new Date().getTime(), "websocket FsServer message", { reqId, path, fsNodeRoot, fsNode, method: METHODS[method], params });

      // expected reply format:
      // [reqId, result, error]

      function sendError (error) {
        console.error("fsNode ws client adapter error:", error);
        sendJson([reqId, null, error])
      }

      if (!METHODS.hasOwnProperty(method)) {
        return sendError(`unknown method <${method}>`)
      }

      switch (method) {
        case METHODS.children:
          return fsNode.children()
                       .then(children => children.map(child => child.name))
                       .then(childNames => sendJson([reqId, childNames]))
                       .catch(sendError)

        case METHODS.delete: 
          return fsNode.delete()
                       .then(() => sendJson([reqId]))
                       .catch(sendError)

        case METHODS.info:     
          return fsNode.info()
                       .then(info => sendJson([reqId, info]))
                       .catch(sendError)

        case METHODS.makeDir:  
          return fsNode.makeDir()
                       .then(() => sendJson([reqId]))
                       .catch(sendError)

        case METHODS.move:     
          return fsNode.move(...params) // destPath, opts
                       .then(destFsNode => sendJson([reqId, destFsNode.relativePath]))
                       .catch(sendError)

        case METHODS.sub:
          try {
            return subscriptions.sub(reqId, fsNode, params || []);
          } 
          catch (err) {
            // this doesn't seem quite right
            return sendError(err);
          }

        case METHODS.touch:    
          return fsNode.touch()
                       .then(() => sendJson([reqId]))
                       .catch(sendError)

        case METHODS.read:
          return fsNode.read(...params) // start, end
                       .then(async (stream) => {
                          // there's an optimization to be made here, for files that fit in a single chunk
                          // if I detech that, and send only ONE message, instead of two - this is an exersize for later
                          for await (const chunk of stream) {
                            sendJson([reqId, Buffer.from(chunk).toString('utf8')])
                          }
                          sendJson([reqId])
                       }) 
                       .catch(sendError)

        //////////////////////////////////////////////////////////////////// COME BACK TO THIS ONE
        case METHODS.write:    
          try {
            return writeStreams.write(reqId, fsNode, params || [])
          } 
          catch (err) {
            // this doesn't seem quite right
            return sendError(err);
          }
      }
    })

    /* // socket event handlers, for posterity
    socket.on("open", function () {})
    socket.on("ping", function (data) {})
    socket.on("redirect", function (url, request) {})
    socket.on("unexpected-response", function (request, response) {})
    socket.on("upgrade", function (response) {})
    socket.on("open", function () {})
    */
  })
  /* // server event handlers, for posterity
  server.on("wsClientError", function (error, socket, request) {})
  server.on("close", function () {})
  server.on("headers", function (headers, request) {})
  server.on("listening", function () {})
  server.on("close", function () {})
  */
}



function SubManager (socket) {
  let cache = {}; // { [reqId]: unsubFn }

  return {
    sub (reqId, fsNode, params) {
      const [events, paths, opts] = params || [];
      // if we have already seen this reqId, this is an unsub
      const unsubFn = cache[reqId]
      if (unsubFn) {
        unsubFn();
        delete cache[reqId];
        return;    
      }

      const listener = (event, fsNode) => socket.send(JSON.stringify([reqId, [event, fsNode.relativePath]]));
      cache[reqId] = fsNode.sub(events, paths, listener, opts);
    },

    cleanup () {
      for (const reqId in cache) {
        const unsub = cache[reqId];
        delete cache[reqId];
        unsub();
      }
    }
  }
}

function WriteManager (socket) {
  let cache = {}; // { [reqId]: QueueStream }

  return {
    write (reqId, fsNode, [chunk, opts]) {
      let queueStream = cache[reqId];
      
      if (!queueStream) {
        queueStream = cache[reqId] = new QueueStream();

        queueStream.queue.onPull = (chunk) => {
          // console.log("onPull CHUNK", chunk)
          if (!chunk) {
            return null;
          }
          let buffer = Buffer.from(chunk, 'base64');
          // console.log("onPull BUFFER", buffer && buffer.toString('hex').match(/.{1,2}/g).join(' '))
          return buffer;
        };

        fsNode.write(queueStream.stream, opts)
          .then(() => socket.send(JSON.stringify([reqId])))
          .then(() => delete cache[reqId])

          // this is almost certainly not correct
          .catch(error => {
            console.error(error);
            socket.send(JSON.stringify([reqId, null, error]))
          })
      }
      
      queueStream.queue.push(chunk);      
    },

    cleanup () {
      for (const reqId in cache) {
        const { stream } = cache[reqId];
        delete cache[reqId];
        stream.cancel();
      }
    }
  }
}
