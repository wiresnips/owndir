const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const anymatch = require('anymatch')

// this lib is a wrapper over libmagic, and has inherited some terrible names
const { Magic: MimeDetector, MAGIC_MIME: MIME_TYPE_ENCODING } = require('mmmagic')
const mime = new MimeDetector(MIME_TYPE_ENCODING)

function mimeType (path) {
  return new Promise((resolve, reject) => {
    mime.detectFile(path, (err, contentType) => {
      if (err) {
        return reject(err)
      }
      const [mimeType, charset] = contentType.split('; charset=')
      if (charset) {
        resolve({ mimeType, charset, contentType })
      }
      resolve({ contentType })
    })
  })
}

module.exports = async function mapDir (path, parent, root, visited) {
  const name = path.split(pathUtil.sep).filter(s => !_.isEmpty(s)).pop()
  const absPath = pathUtil.resolve(path)

  visited = visited ? { ...visited } : {} // shallow clone so sibling branches don't stomp
  if (visited[absPath]) { return null }
  visited[absPath] = true

  const node = {
    parent,
    root,
    name,
    path: absPath,
    absolutePath: absPath,
    relativePath: root ? pathUtil.relative(root.path, absPath) : '',
    visited
  }
  Object.setPrototypeOf(node, fsNodeProto);

  const exists = await node.loadStat();
  if (!exists) {
    return null;
  }

  if (!parent) {
    root = node;
    node.root = root;
  }

  if (node.isDirectory) {
    node.size = 0
    node.children = {}

    await fsp.readdir(node.path).then(relPaths => Promise.all(
      relPaths
        // .filter(relPath => !relPath.startsWith('.owndir')) // don't recurse into .owndir dirs
        .filter(relPath => !relPath.startsWith('.owndir-build')) // don't recurse into .owndir-build
        .map(relPath => pathUtil.resolve(path, relPath))
        .map(absPath => mapDir(absPath, node, root, visited))
        .filter(_.identity)
    )).then(children => {
      children.forEach(child => {
        node.size = node.size + child.size
        node.children[child.name] = child
      })
    })
  }

  return node
}





const fsNodeProto = {
  walk: function (path, bestEffort) {
    if (_.isString(path)) {
      path = path.split(pathUtil.sep).filter(step => step && step.length)
    }
    if (_.isEmpty(path)) {
      return this
    }
    const [step, ...nextSteps] = path;
    const child = this.children[step];

    const arrived = child && _.isEmpty(nextSteps);
    const canStep = !arrived && !!child?.walk 

    return (
      arrived ? child :   
      canStep ? child.walk(nextSteps) : 
      bestEffort ? (child || this) :    
      null                              
    )
  },

  loadStat: async function () {
    const stat = await fsp.stat(this.absolutePath).catch(err => null)
    if (!stat) {
      return null
    }

    this.isFile = stat.isFile();
    this.isDirectory = stat.isDirectory();
    this.isSymbolicLink = stat.isSymbolicLink();

    this.mtime = stat.mtimeMs;
    this.ctime = stat.ctimeMs;
    // this.atime = stat.atimeMs;

    // this could do with some expansion, once I figure out
    // how or even whether I want to express ownership / permissions
    this.mode = stat.mode;

    if (this.isFile) {
      this.size = stat.size
      this.mime = await mimeType(this.absolutePath).catch(() => null)
    }
    return true;
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
          console.log(`event ${event} at ${path}, but it already exists?`); 
          return;
      }
    }
    else if (isDirectParent) {
      switch (event) {
        case 'add': 
        case 'addDir':
          const child = await mapDir(absPath, this, this.root, this.visited);
          this.children[relPath] = child;
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

    if (this.isDirectory) {
      this.size = this.childrenSize();
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

  // this is a simple pass-through of chokidar
  // events are: all, add, addDir, change, unlink, unlinkDir, ready, error
  addListener: function (listener, opts) {
    if (!this.listeners) {
      this.listeners = [];
    }

    const { event, match, ignore } = opts || {};
    const matcher = match && anymatch(match)
    const ignorer = ignore && anymatch(ignore)
    const onEvent = event && event !== 'all'

    listener.bind(this);
    this.listeners.push([listener, onEvent, matcher, ignorer]);
  },




  // these only really make sense for FILES

  open: function (...args) { 
    if (this.isFile) {
      return fsp.open(this.absPath, ...args)
    }
  },

  text: async function (encoding) {
    if (this.isFile) {
      encoding = encoding || 'utf-8'
      const handle = await fsp.open(this.absolutePath)
      const content = await handle.readFile(encoding)
      handle.close()
      return content;
    }
  },


  // these only really make sense for directories

  childrenSize: function () {
    return Object.values(this.children || {}).reduce((size, child) => size + child.size, 0);
  },



}