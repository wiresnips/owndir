const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { pathSplit } = require('../utils.js')

const fsNodeProto = require('./fsNode_server.js')
const Permission = require('./permission.js')

module.exports = async function mapDir (path, parent, root, visited) {
  const name = pathSplit(path).pop()
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
    isOwnDir: !!(name.startsWith('.owndir') || parent?.isOwnDir),
    listeners: []
  }
  Object.setPrototypeOf(node, fsNodeProto);

  // this is a good start - maybe we need to differentiate between client and server, too?
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
