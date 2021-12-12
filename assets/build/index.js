const fs = require('fs')
const path = require('path')

// the idea here is, to give the BUILD a way to combine the parent into the child in-situ
// if I do it like this, I can offload combining them into the build itself

var self;
try {
  self = require('./central.js')
  // console.log('SELF', __dirname,  self)
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', __dirname)
    console.error(error)
  }
  self = {}
}

try {
  parent = require('../index.js')
} catch (err) {
  parent = {}
}

if (!self['.central']) {
  self['.central'] = {}
}

self['.central'].children = {}
fs.readdirSync(__dirname).forEach(name => {
  try {
    const childModule = path.resolve(__dirname, name, 'index.js')
    if (fs.existsSync(childModule)) {
      self['.central'].children[name] = require(childModule)
    }
  } catch (err) {
    console.error(err)
  }
})

// maybe don't do this one, if we're the root directory
try {
  const parentPath = path.resolve(__dirname, '..', 'index.js')
  if (fs.existsSync(parentPath)) {
    const parent = require(parentPath)
    self['.central'].parent = parent
    Object.setPrototypeOf(module.exports, parent)
  }
} catch (err) {
    console.error(err)
}


Object.assign(module.exports, self);
