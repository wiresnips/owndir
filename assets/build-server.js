import _ from 'lodash';
import { Router } from 'express';
import pathUtil from 'path';


async function normalizeImport (rawImport) {
  rawImport = await rawImport;
  if (_.isFunction(rawImport)) {
    return rawImport;
  }
  return function () { return rawImport };
}


const baseOwnDir = {
  addMiddleware: function (method, path, ...handlers) {
    this.O.middleware.push([path, [method, ...handlers]]);
  },
  addRoute: function (method, path, ...handlers) {
    this.O.routes.push([path, [method, ...handlers]]);
  },
}

const baseSystemObj = {

  get childrenArray() {
    return Object.values(this.children || {}).sort((a, b) => a.name < b.name ? -1 : 1)
  },

  adoptOwnDir: function (child) {
    const owndir = this.owndir;
    const name = child.O.directory.name;
    const existingParent = child.O.parent;
    if (existingParent) {
      delete existingParent.O.children[name]
    }

    child.O.parent = owndir;
    this.children[name] = child;

    if (Object.getPrototypeOf(child) !== owndir) {
      Object.setPrototypeOf(child, owndir);
    } 

    // oh right, and also this
    console.log('HAAHHAHA and don\'t forget that PLUGINS will absolutely not be re-evaluated correctly');
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

  // don't allow O to be inherited
  if (!owndir.hasOwnProperty("O")) {
    owndir.O = {};
  }
  Object.setPrototypeOf(owndir.O, baseSystemObj);

  owndir.O.owndir = owndir;
  owndir.O.directory = directory;
  owndir.O.children = {};
  owndir.O.plugins = plugins || [];
  owndir.O.middleware = owndir.O.middleware || []
  owndir.O.routes = owndir.O.routes || [] 

  directory.owndir = owndir;

  if (parent) {
    parent.O.adoptOwnDir(owndir)
  } else {
    // special-case for the root, because bleah
    if (Object.getPrototypeOf(owndir) !== OwnDir.prototype) {
      Object.setPrototypeOf(owndir, OwnDir.prototype);
    } 
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
  const plugins = owndir.O.plugins
  const children = owndir.O.childrenArray

  for (let plugin of plugins) {
    await plugin(owndir);

    if (plugin.propagate) {
      for (const child of children) {
        child.O.plugins.push(plugin);
      }        
    }
  }

  for (const child of children) {
    await activatePlugins(child);
  }
}

export async function OwnDir (directory) {
  const owndir = await initializeTree(directory, uninitializedTree);
  await activatePlugins(owndir);
  return owndir;
}