import _ from 'lodash';
import pathUtil from 'path';


async function normalizeImport (rawImport) {
  rawImport = await rawImport;
  if (_.isFunction(rawImport)) {
    return rawImport;
  }
  return function () { return rawImport };
}


const baseOwnDir = {
  addRoute: function (method, path, ...handlers) {
    this.O.routes.push([path, [method, ...handlers]]);
  },
  addMiddleware: function (method, path, ...handlers) {
    this.O.middleware.push([path, [method, ...handlers]]);
  }
}


async function initOwnDir (directory, OwnDir, parent, plugins) {

  OwnDir.prototype = parent || baseOwnDir;

  var owndir; 
  try {
    owndir = await new OwnDir(directory);
  } catch (err) {
    if (err instanceof TypeError && err.message.endsWith('is not a constructor')) {
      owndir = await OwnDir(directory);
    }
    else {
      throw err;
    }
  }

  if (Object.getPrototypeOf(OwnDir.prototype) !== OwnDir.prototype) {
    Object.setPrototypeOf(owndir, OwnDir.prototype);
  } 
  
  // don't allow O to be inherited
  if (!owndir.hasOwnProperty("O")) {
    owndir.O = {};
  }

  owndir.O.directory = directory;
  owndir.O.children = {};
  owndir.O.plugins = plugins;

  owndir.O.middleware = owndir.O.middleware || []
  owndir.O.routes = owndir.O.routes || [] 

  directory.owndir = owndir;

  if (parent) {
    owndir.O.parent = parent;
    parent.O.children[owndir.O.directory.name] = owndir;
  }

  return owndir;
}

const uninitializedTree = {};

function walk (path) {
  let node = uninitializedTree;

  path = path.split(pathUtil.sep).filter(step => step && step.length)
  for (let step of path) {
    if (!node.children) {
      node.children = {};
    }
    if (!node.children[step]) {
      node.children[step] = {}
    }
    node = node.children[step]
  }

  return node;
}

function register (path, nodeOrFunc, plugins) {
  const uninitializedNode = walk(path);
  uninitializedNode.nodeOrFunc = nodeOrFunc;
  uninitializedNode.plugins = plugins
}


async function initializeTree (directory, uninitializedNode, parentOwnDir) {
  const owndir = await initOwnDir(
    directory, 
    await (uninitializedNode.nodeOrFunc), 
    parentOwnDir,
    await Promise.all(uninitializedNode.plugins)
  );

  await Promise.all(
    _.toPairs(uninitializedNode.children || {}).map(
      ([key, uninitializedChild]) => {
        const childDir = directory.children[key];
        return initializeTree(childDir, uninitializedChild, owndir)
      })
  );

  return owndir;
}

async function activatePlugins (owndir) {
  const plugins = owndir?.O?.plugins

  if (_.isArray(plugins)) {
    for (let plugin of plugins) {
      await plugin(owndir);
    }
  }

  const children = Object.keys(owndir?.O?.children || {})
  for (let childName of children) {
    await activatePlugins(owndir.O.children[childName]);
  }
}

export async function OwnDir (directory) {
  const owndir = await initializeTree(directory, uninitializedTree);
  await activatePlugins(owndir);
  return owndir;
}