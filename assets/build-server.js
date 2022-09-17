import _ from 'lodash';
import pathUtil from 'path';


async function normalizeImport (rawImport) {
  rawImport = await rawImport;
  if (_.isFunction(rawImport)) {
    return rawImport;
  }
  return function () { return rawImport };
}


const baseHomestead = {
  addRoute: function (method, path, ...handlers) {
    this.H.routes.push([path, [method, ...handlers]]);
  },
  addMiddleware: function (method, path, ...handlers) {
    this.H.middleware.push([path, [method, ...handlers]]);
  }
}


async function initHomestead (directory, Homestead, parent, plugins) {

  if (parent) {
    Homestead.prototype = parent || baseHomestead;
  }

  var homestead; 
  try {
    homestead = await new Homestead(directory);
  } catch (err) {
    if (err instanceof TypeError && err.message.endsWith('is not a constructor')) {
      homestead = await Homestead(directory);
    }
    else {
      throw err;
    }
  }

  if (parent && Object.getPrototypeOf(homestead) !== parent) {
    Object.setPrototypeOf(homestead, parent);
  } 
  
  // don't allow H to be inherited
  if (!homestead.hasOwnProperty("H")) {
    homestead.H = {};
  }

  homestead.H.directory = directory;
  homestead.H.children = {};
  homestead.H.plugins = plugins;

  homestead.H.middleware = homestead.H.middleware || []
  homestead.H.routes = homestead.H.routes || [] 

  directory.homestead = homestead;

  if (parent) {
    homestead.H.parent = parent;
    parent.H.children[homestead.H.directory.name] = homestead;
  }

  return homestead;
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


async function initializeTree (directory, uninitializedNode, parentHomestead) {
  const homestead = await initHomestead(
    directory, 
    await (uninitializedNode.nodeOrFunc), 
    parentHomestead,
    await Promise.all(uninitializedNode.plugins)
  );

  await Promise.all(
    _.toPairs(uninitializedNode.children || {}).map(
      ([key, uninitializedChild]) => {
        const childDir = directory.children[key];
        return initializeTree(childDir, uninitializedChild, homestead)
      })
  );

  return homestead;
}

async function activatePlugins (homestead) {
  const plugins = homestead?.H?.plugins

  if (_.isArray(plugins)) {
    for (let plugin of plugins) {
      await plugin(homestead);
    }
  }

  const children = Object.keys(homestead?.H?.children || {})
  for (let childName of children) {
    await activatePlugins(homestead.H.children[childName]);
  }
}

export async function Homestead (directory) {
  const homestead = await initializeTree(directory, uninitializedTree);
  await activatePlugins(homestead);
  return homestead;
}