
const _ = require('lodash')
const pathUtil = require("path")





function pathSplit (path) {
  return path.split(pathUtil.sep).filter(step => step && step.length)
}

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

    opts = opts || {}

    const [step, ...nextSteps] = path;
    const nextNode =
      step === '.' ? this : 
      step === '..' ? this.parent :
      this.children[step];

    const arrived = nextNode && _.isEmpty(nextSteps);
    const canStep = !arrived && !!nextNode?.walk 

    return (
      arrived ? nextNode :   
      canStep ? nextNode.walk(nextSteps) : 
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


  // this is a simple pass-through of chokidar
  // events are: all, add, addDir, change, unlink, unlinkDir, ready, error
  addListener: function (listener, opts) {
    const { event, match, ignore } = opts || {};
    const matcher = match && anymatch(match)
    const ignorer = ignore && anymatch(ignore)
    const onEvent = event && event !== 'all'

    listener.bind(this);
    this.listeners.push([listener, onEvent, matcher, ignorer]);
  },




  onChange: async function (event, path, isNearestFsNode, ...args) {
    const absPath = path
    const relPath = pathUtil.relative(this.absolutePath, path);

    const isThisNode = absPath === this.absolutePath;
    const isDirectParent = !relPath.includes(pathUtil.sep);

    if (isThisNode) {
      switch (event) {
        case 'change': 
          await this.loadStat();
          break;

        // our parent can handle this
        case 'unlink': 
        case 'unlinkDir':
          break; 

        case 'add': 
        case 'addDir':
          // if we added a node that already exists, it was probably done through the "fsNode.move" interface
          // (and if this node is receiving the event, it already exists)
          return;
      }
    }
    else if (isDirectParent) {
      switch (event) {
        case 'add': 
        case 'addDir':
          this.adoptChild(await mapDir(absPath, this, this.root));
          break;

        case 'unlink':
        case 'unlinkDir':
          delete this.children[relPath];
          break;

        case 'change': 
          console.log(`event ${event} at ${path}, but it's a folder?`); 
          return;
      }
    }

    // THIS DOES NOT EVEN A LITTLE BIT WORK HOW IT SHOULD
    // ie, if I paste in a whole-ass directory, unless the events arrive in perfect order
    // and I don't think I know that they will,
    // I won't necessarily HAVE a "direct parent"

    if (this.isDirectory) {
      this.invalidateRouter();
      this.rebuildSize();
    }

    // 2- fire off any listeners
    for (const [listener, onEvent, match, ignore] of this.listeners) {
      if ((match && !match(relPath)) ||
          (ignore && ignore(relPath)) ||
          (onEvent && event !== onEvent)) 
      {
        continue;
      }
      listener(event, relPath, ...args);
    }

    // 3 - propagate the event upwards
    if (this.parent) {
      this.parent.onChange(event, path, false, ...args);
    }
  },




  // these only really make sense for directories

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

  adoptChild: function (child, name) {

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

    this.owndir.O.adoptOwnDir(child.owndir);
  },

  rebuildPaths: function () {
    this.path = pathUtil.resolve(this.parent.path, this.name);
    this.absolutePath = this.path;
    this.relativePath = pathUtil.relative(this.root.path, this.path);

    if (this.children) {
      for (const child of this.childrenArray) {
        child.rebuildPaths();
      }
    }    
  },

  // on the server-side, force the router to be regenerated
  // this needs to be done if the folder's name, children, or routes are updated 
  invalidateRouter: function () {
    delete this._router
  }
}


module.exports = proto;

