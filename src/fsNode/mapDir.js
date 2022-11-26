const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { pathSplit } = require('../utils.js')

const Permission = require('./permission.js')
const FsNodeProto = require('./fsNode_server.js')

async function mapDir (path, parent, root, visited) {
  const name = pathSplit(path).pop()
  const absPath = pathUtil.resolve(path)

  visited = visited ? { ...visited } : {} // shallow clone so sibling branches don't stomp
  if (visited[absPath]) { 
    return null 
  }
  visited[absPath] = true

  const node = {
    parent,
    root,
    name,
    path: absPath,
    absolutePath: absPath,
    relativePath: '/' + (root ? pathUtil.relative(root.path, absPath) : ''),
    isOwnDir: !!(name.startsWith('.owndir') || parent?.isOwnDir),
    listeners: []
  }
  Object.setPrototypeOf(node, FsNodeProto);

  node.permRead = new Permission('permRead', node);
  node.permWrite = new Permission('permWrite', node);

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

    await fsp.readdir(node.path).then(relPaths => {
      return Promise.all(
      relPaths
        .filter(relPath => !node.isOwnDir || !(relPath === 'build')) // don't recurse into .owndir/build
        .filter(relPath => relPath !== 'node_modules') // don't recurse into node_modules
        .map(relPath => pathUtil.resolve(path, relPath))
        .map(absPath => mapDir(absPath, node, root, visited))
    )})
    .then(children => children.filter(_.identity))
    .then(children => {
      try {
        children.forEach(child => {
          node.size = node.size + child.size
          node.children[child.name] = child
        })
      } catch (err) {
        console.log({err, node, children})
        throw err
      }
    })
  }

  return node
}


module.exports.mapDir = mapDir;