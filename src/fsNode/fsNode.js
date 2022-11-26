
const _ = require('lodash')
const pathUtil = require("path")
const anymatch = require('anymatch')

const { status, fsnErr } = require('./errors.js')

function pathSplit (path) {
  return path.split(pathUtil.sep).filter(step => step && step.length)
}

const DESC_ATTRS = [
    "name", "path", "absolutePath", "relativePath", 
    "isFile", "isDirectory", "isSymbolicLink", "isOwnDir",
    "mtime", "ctime", "mode", "mime"
]

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


const proto = {

  get childrenArray() {
    return Object.values(this.children || {}).sort((a, b) => a.name < b.name ? -1 : 1)
  },

  walk: function (path, opts) {
    opts = Object.assign({ bestEffort: false }, opts)

    // if it's an absolute path, walk from the root
    if (_.first(path) === '/' && this.parent) {
      return this.root.walk(path, opts)
    }

    if (_.isString(path)) {
      path = pathSplit(path)
    }
    if (_.isEmpty(path)) {
      return this
    }

    const [step, ...nextSteps] = path;
    const nextNode =
      step === '.' ? this : 
      step === '..' ? this.parent :
      this.children?.[step];

    const arrived = nextNode && _.isEmpty(nextSteps);
    const canStep = !arrived && !!nextNode?.walk 

    return (
      arrived ? nextNode :   
      canStep ? nextNode.walk(nextSteps, opts) : 
      opts.bestEffort ? (nextNode || this) :    
      null                              
    )
  },

  // can't really remember why I thought _this_ deserved to be here
  getWalkTo: function (fsNode) {
    const path = pathSplit(this.relativePath)
    const targetPath = pathSplit(fsNode.relativePath)
    const commonAncestorPath = []
    for (let i = 0; i < path.length; i++) {
      const step = path[i]
      if (step !== targetPath[i]) {
        break
      }
      commonAncestorPath.push(step)
    }

    const stepsBack = path.length - commonAncestorPath.length;
    const walk = Array(stepsBack).fill('..')
    walk.push(...targetPath.slice(commonAncestorPath.length))

    return walk.join(pathUtil.sep)
  },

  canRead: function () {
    return this.permRead.isAllowed()
  },

  canWrite: function () {
    return this.permRead.isAllowed() && this.permWrite.isAllowed();
  },

  // AoE permissions are an algorithmic trainwreck
  canReadAll: function () {
    return this.permRead.isAllowed() && this.childrenArray.every(child => child.canReadAll())
  },
  canWriteAll: function () {
    return this.canWrite() && this.childrenArray.every(child => child.canWriteAll())
  },

  dir: function () {
    return this.isDirectory ? this : this.parent;
  },

  text: function (encoding) {
    return this.readAll().then(buffer => decoder(encoding).decode(buffer))
  },

  desc: function () {
    return {
      children: !this.children ? null : _.mapValues(this.children, c => c.desc()),
      // this can _absolutely be optimized down, but there's no reason to futz with that now
      ...(_.pick(this, DESC_ATTRS))
    }    
  },


  // these only really make sense for directories

  adoptChild: function (child, name) {

    console.log('adoptChild', child.relativePath, name)

    if (child.parent) {
      delete child.parent.children[child.name];
      child.parent.invalidateRouter();
      child.parent.rebuildSize();
    }

    // this feels like a trap waiting to be sprung
    // but I prefer it to allowing a child to be named ''
    if (!_.isEmpty(name)) {
      child.name = name;
      child.invalidateRouter();
    }

    child.parent = this;
    child.root = this.root;
    this.children[child.name] = child;
    this.invalidateRouter();
    this.rebuildSize();

    child.rebuildPaths();

    if (this.owndir && child.owndir) {
      this.owndir.O.adoptOwnDir(child.owndir);
    }
  },

  rebuildPaths: function () {
    this.path = pathUtil.resolve(this.parent.path, this.name);
    this.absolutePath = this.path;
    this.relativePath = pathUtil.relative(this.root.path, this.path);
    this.childrenArray.forEach(child => child.rebuildPaths());
  },

  rebuildSize: function () {
    if (!this.isDirectory) {
      return;
    }
    
    const newSize = Object.values(this.children || {}).reduce((size, child) => size + child.size, 0);
    if (newSize === this.size) {
      return;
    }

    this.size = newSize;
    this.parent?.rebuildSize();
  },

  // on the server-side, force the router to be regenerated
  // this needs to be done if the folder's name, children, or routes are updated 
  invalidateRouter: function () {
    delete this._router
  }
}


module.exports = proto;
