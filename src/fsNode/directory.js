
const { resolve, relative, basename } = require('path')
const { status, fsnErr } = require('./errors.js')


const decoder = (function () {
  const decoders = {}

  return function (encoding) {
    encoding = encoding || 'utf-8'

    let decoder = decoders[encoding]
    if (!decoder) {
      decoder = new TextDecoder(encoding)
      decoders[encoding] = decoder
    }

    return decoder;
  }
})()


const InterfaceMethods = [
  "children", "delete", "info", "makeDir", "move", "read", "readAll", "touch", "write",
]

function wrapErrors (intface) {
  return InterfaceMethods.reduce((intface, method) => {
    const origFn = intface[method]
    intface[method] = function (...args) {
      return origFn.apply(intface, args).catch(err => { throw(fsnErr(err)) })
    };
    return intface
  }, intface)
}



function Directory (root, OwnDir, Interface) {

  const DirProto = {
    walk: function (path) {
      // console.log('WALK 1', this, path)

      if (path.startsWith('/')) {
        path = root + path
      }
      const absPath = resolve(root, this.relativePath, path);
      // console.log('WALK 2', {fsNode: this, path, absPath})

      return absPath.startsWith(root) 
        ? Node(absPath, Interface) 
        : Node(absPath, OutOfBounds())
    },

    get parent() {
      return this.walk('..')
    },

    get root() {
      return this.walk('/')
    },

    get module() {
      return OwnDir(this.relativePath);
    },
  
    text: async function (encoding) {
      return this.readAll().then(buffer => decoder(encoding).decode(buffer))
    },


    // this "works" in the client, but it ends up being _very_ chatty
    // consider moving to the layer below, even though it doesn't really belong there
    files: async function () {
      return this.children()
        .then(children => 
          children.map(async (child) => {
            const { isFile } = await child.info();
            return [isFile, child]
          }))
        .then(children => Promise.all(children))
        .then(children => 
          children.filter(([isFile, child]) => isFile)
                  .map(([isFile, child]) => child))
    },

    // same as files, consider optimizing this for the client
    folders: async function () {
      return this.children()
        .then(children => 
          children.map(async (child) => {
            const { isDirectory } = await child.info();
            return [isDirectory, child]
          }))
        .then(children => Promise.all(children))
        .then(children => 
          children.filter(([isDirectory, child]) => isDirectory)
                  .map(([isDirectory, child]) => child))
    },
    
    // ignore permissions for now
    // need to rethink how this will be specified
    // also, these should definitely be async
    canRead: function () { return true; },
    canWrite: function () { return true; },
    canReadAll: function () { return true; },
    canWriteAll: function () { return true; },
  }
  Object.setPrototypeOf(Interface, DirProto);

  // not sure whether this is the right place for this ... 
  function ErrorInterface (error) {
    const f = (...args) => { throw error }
    const WrappedInterface = InterfaceMethods.reduce((intface, method) => {
      intface[method] = f;
      return intface
    }, Object.create(DirProto))
    
    return WrappedInterface;
  }

  const OutOfBounds = () => ErrorInterface(fsnErr("Out of Bounds", status.forbidden).catch(e => e))
  

  function Node (path, proto) {
    const absolutePath = resolve(root, path);
    const relativePath = relative(root, absolutePath);
    const name = basename(absolutePath);
    
    // okay, javascript, what SHOULD the syntax have been here?
    const node = Object.create(proto);
    Object.assign(node, {
      name,
      absolutePath,
      relativePath,
      path: relativePath
    })

    return node;
  }

  // this feels stupid
  return Node('/', Interface).walk;
}


module.exports.Directory = Directory



