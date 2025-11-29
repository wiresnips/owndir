
# Running from the commandline

`node src/index.js [OPTIONS]... <path to root dir>`

## Options

### `-p`, `--port` 
Specify a port to run the server on. If not specified, a random available port will be chosen.

Eg: `node src/index.js --port 4321 ~/my-owndir`


### `-h`, `--host`
Specify the host to run the server on. Defaults to `127.0.0.1`. 

This seems like a silly argument - the server runs _here_, that isn't a decision that it gets to make. But, it isn't wholly incoherent. Requests include their target host. If that does not match the host given, it will be ignored. If you specify a host that you cannot be reached at, then there are no requests you can receive that you would ever respond to. By defaulting to `127.0.0.1`, we are effectively ignoring external requests, because outside machines requesting that address will not be directed to us - they'll be directed to themselves. (Another scenario where this is less silly is, if we're running on a machine that has multiple addresses).

see: http://expressjs.com/en/4x/api.html#app.listen

### `-r`, `--run`
Set this flag to enable/disable running the server. Defaults to `true`. 

Usually used in conjuction with `--build`.

### `-b`, `--build`
Set this flag to force a build. Defaults to `false`.

By default, the server prefers not to run "unnecessary" builds. If the built code is absent, it will build. Otherwise, it will blindly load it. If you update the `.owndir` code, this flag will need to be set for the changes to be "taken up".

force build and run: `node src/index.js --build ~/my-owndir`

build only: `node src/index.js --build --run false ~/my-owndir`

see also: [build](./build.md)

