
const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")

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
        return { mimeType, charset, contentType }
      }
      return { contentType }
    })
  })
}

async function mapDir (path, parent, root, visited) {
  const name = path.split(pathUtil.sep).filter(s => !_.isEmpty(s)).pop()
  const absPath = pathUtil.resolve(path)

  visited = visited ? { ...visited } : {} // shallow clone so sibling branches don't stomp
  if (visited[absPath]) { return null }
  visited[absPath] = true

  const stat = await fsp.stat(absPath).catch(err => null)
  if (!stat) {
    return null
  }

  const node = {
    parent,
    root,
    name: parent ? name : "/",
    path: absPath,
    absolutePath: absPath,
    relativePath: root ? pathUtil.relative(root.path, absPath) : '',

    isFile: stat.isFile(),
    isDirectory: stat.isDirectory(),
    isSymbolicLink: stat.isSymbolicLink(),

    mtime: stat.mtimeMs,
    ctime: stat.ctimeMs,
    // atime: stat.atimeMs,

    // this could do with some expansion, once I figure out how I want to
    mode: stat.mode
  }

  if (!parent) {
    root = node;
    node.root = root;
  }

  if (node.isFile) {
    node.size = stat.size
    node.mime = await mimeType(node.path)

    // I dunno, maybe just slap on some utilities?
    node.open = (...args) => fsp.open(absPath, ...args)

    node.text = async (encoding) => {
      encoding = encoding || 'utf-8'
      const handle = await fsp.open(absPath)
      const content = await handle.readFile(encoding)
      handle.close()
      return content;
    }  
  }

  else if (node.isDirectory) {
    node.size = 0
    node.children = {}
    node.walk = (path) => {
      if (_.isEmpty(path)) {
        return node
      }
      if (_.isString(path)) {
        path = path.split(pathUtil.sep).filter(step => ste && step.length)
      }
      const [step, ...nextSteps] = path
      const child = node.children[step]
      return child && child.walk && child.walk(nextSteps)
    }

    await fsp.readdir(node.path).then(relPaths => Promise.all(
      relPaths
        // .filter(relPath => !relPath.startsWith('.homestead')) // don't recurse into .homestead dirs
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

async function initHomestead (homestead, parent, directory) {
  if (!homestead) {
    homestead = {};
  }

  if (_.isFunction(homestead)) {
    if (parent) {
      homestead.prototype = parent
    }
    homestead = await homestead(directory)
  }

  if (parent && !isChildOf(homestead, parent)) {
    Object.setPrototypeOf(homestead, parent)
  }  
  
  // don't allow H to be inherited
  if (!homestead.hasOwnProperty("H")) {
    homestead.H = {}
  }

  if (!homestead.H.hasOwnProperty("directory")) {
    homestead.H.directory = directory
  }
  directory.homestead = homestead

  if (!homestead.H.hasOwnProperty("plugins")) {
    homestead.H.plugins = []
  }

  homestead.H.children = {}
  if (parent) {
    homestead.H.parent = parent
    parent.H.children[homestead.H.directory.name] = homestead;
  }

  return homestead
}

async function activatePlugins (homestead) {
  const plugins = homestead?.H?.plugins
  if (_.isArray(plugins)) {
    for (let plugin of plugins) {
      plugin(homestead)
    }
  }

  const children = Object.keys(homestead?.H?.children || {})
  for (let childName of children) {
    activatePlugins(homestead.H.children[childName])
  }
}