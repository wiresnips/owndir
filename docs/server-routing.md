
# Request Handlers

## OwnDir Routing
Each folder in an OwnDir (with one [caveat]( _backfill: module generation does not traverse into .owndir folders_ ) has an associated `module` that can respond to web requests. There are two kinds of configurable handler: **middleware** and **routes**. You can think of these as the "pre" and "post" handlers - A folder's middleware will be invoked before any child folder's handlers, and it's routes will be invoked afterwards. When a request comes in, the server will take the url as a filepath. The request will pass down the filepath, and then back. On the way down, each module's middleware will be applied. On the way back, routes will be applied. The request will go as far as it can before "turning around".

Consider the following directory structure:
```
A/
├─ B/
|  └─ C/      
|     └─ whoo.txt      
└─ D/                 
```

And consider the following url: `http://localhost:4321/A/B/C/whoo.txt` (assuming the server is listening at `localhost:4321`).

In this case, the request will be processed as follows:
```
A : middleware
  B : middleware
   C : middleware
    whoo.txt : This is not a folder, so it doesn't have an OwnDir module (and therefore no middleware or routes).
   C : routes
  B : routes
A : routes
```

## Defining Handlers

Handlers have to be added to `O.middleware` and `O.routes`, respectively. Here's an example:

```javascript
module.exports = {
  O: {
    routes: [ 
      ["all",
        "*", 
        function (request, response, next) { 
          response.sendFile(resolve(__dirname, 'index.html'))
        }]
    ]
  },
}
```

This is a thin layer over an [Express](http://expressjs.com/en/guide/routing.html) 

> I should eventually provide a utility lib to generate this more "normally", ie `router(owndir).get("*", (req, res, next) => {})`. The main barrier to that is actually _where_ to put that - it would need to be a library, that gets imported _by the module_. It could live in `owndir`, but that's hardly ideal. It would inject a completely superfluous copy of owndir into both the client and the server versions of the module, which is then loaded and run by owndir anyways ... It's a mess. (the default client-loader actually does this, for access to `interface_client.js`, but that should also be cleaned up).


## FsNode built-in handlers

In addition to 

## client.js

It's stupid, but there's one other built-in route: `/@/client.js`, which exposes the client.js