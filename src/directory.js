
const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")


/*
  honestly, I'm a little skeptical of this structure
    it _kinda_ looks just flat-out unnecesary?

    the fact that there's no accepted standard lib for mapping a directory speaks to that

  one thing that I *absolutely* need is the absolute path to the directory
    the rest is fully dispensable?
*/

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

  let node = {
    parent,
    root,
    name,
    path: absPath,
    absolutePath: absPath,
    relativePath: root ? pathUtil.relative(root.path, absPath) : '',

    isFile: stat.isFile(),
    isDirectory: stat.isDirectory(),
    isSymbolicLink: stat.isSymbolicLink(),
    atime: stat.atime,
    mtime: stat.mtime,
    ctime: stat.ctime
  }

  if (!parent) {
    root = node;
    node.root = root;
  }

  if (node.isFile) {
    node.size = stat.size

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
    
    await fsp.readdir(node.path).then(relPaths => Promise.all(
      relPaths
        .filter(relPath => !relPath.startsWith('.central')) // don't recurse into .central dirs
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

function inject (directory, central) {
  if (!central) { return; }

  central['.central'].directory = directory;

  _.toPairs(directory.children || {}).forEach(
    ([name, childDir]) => inject(childDir, (central['.central'].children || {})[name])
  )
}


module.exports.map = mapDir 
module.exports.inject = inject
