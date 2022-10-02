const { resolve } = require("path")
const _ = require('lodash')
const anymatch = require('anymatch')

function Permission (name, fsNode) {
  this.name = name;
  this.fsNode = fsNode;
  this.permissions = [];
}

function pathsPredicate (perm, paths) {
   const absPath = perm.fsNode.absolutePath;
   const match = anymatch(paths.map(path => resolve(absPath, path)))
   return (testFsNode) => match(testFsNode.absolutePath)
  
}

Permission.prototype = {

  setAllowed: function (allowed, ...pathsOrPredicate) {
    const gavePredicate = (
      (pathsOrPredicate.length === 1) && 
      _.isFunction(pathsOrPredicate[0])
    );

    const predicate = gavePredicate
      ? pathsOrPredicate[0]
      : pathsPredicate(this, pathsOrPredicate)
    
    this.permissions.unshift({ allowed, predicate })
  },

  isAllowed: function (target) {
    target = target || this.fsNode
    for (const {allowed, predicate} of this.permissions) {
      if (predicate(target)) {
        return allowed;
      }
    }

    return !!this.fsNode.parent?.[this.name].isAllowed()
  },

  allow: function (...args) {
    this.setAllowed(true, ...args)
  },

  disAllow: function (...args) {
    this.setAllowed(false, ...args)
  },
}


module.exports = Permission;