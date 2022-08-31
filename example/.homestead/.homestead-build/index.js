
const _ = require('lodash')
const pathUtil = require('path')

async function initHomestead (directory, homestead, parent) {
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

  directory.homestead = homestead;

  if (parent) {
    homestead.H.parent = parent;
    parent.H.children[homestead.H.directory.name] = homestead;
  }

  console.log('==================')
  console.log(homestead)
  console.log("")

  return homestead;
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
  const node = walk(path);
  node.nodeOrFunc = nodeOrFunc;
  node.plugins = plugins
}


async function initializeTree (directory, uninitializedNode, parentHomestead) {
  const homestead = await initHomestead(directory, uninitializedNode.nodeOrFunc, parentHomestead);

  await Promise.all(
    _.toPairs(uninitializedNode.children || {}).map(
      ([key, uninitializedChild]) => {
        const childDir = directory.children[key];
        return initializeTree(childDir, uninitializedChild, homestead)
      })
  );

  return homestead;
}

module.exports = async function (directory) {
  return initializeTree(directory, uninitializedTree);
}


var sym_0 = {};
try {
  sym_0 = require("sym_0");
} catch (error) {
  console.log('Error loading', "");
  console.error(error);
}


register(
  "", 
  sym_0, 
  []
)

var sym_2 = {};


register(
  "calendar", 
  sym_2, 
  []
)

var sym_3 = {};


register(
  "contacts", 
  sym_3, 
  []
)


var sym_4 = {};
try {
  sym_4 = require("/home/ben/projects/homestead/example/finance/.homestead/index.js");
} catch (error) {
  console.log('Error loading', "finance");
  console.error(error);
}


register(
  "finance", 
  sym_4, 
  []
)

var sym_7 = {};


register(
  "calendar/2021", 
  sym_7, 
  []
)


var sym_5 = {};
try {
  sym_5 = require("sym_5");
} catch (error) {
  console.log('Error loading', "markdown");
  console.error(error);
}


register(
  "markdown", 
  sym_5, 
  []
)