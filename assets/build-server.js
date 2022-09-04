import _ from 'lodash';
import pathUtil from 'path';

async function initHomestead (directory, homestead, parent, plugins) {

  if (_.isFunction(homestead)) {
    if (parent) {
      homestead.prototype = parent;
    }
    homestead = await homestead(directory);
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