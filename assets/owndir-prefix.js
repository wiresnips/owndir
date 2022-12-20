/*
  This is not a complete file. 
  The "build" process is going to start with this, and inline a 
  bunch of code that requires the `.owndir` modules of each directory

  Yes, that is literally how this works. 
  No, I am not ashamed of myself.
*/

import { resolve, relative, dirname } from 'path';

const modules = {};

function addModule (path, mod, plugins) {
  path = resolve('/', path)
  mod = mod || {}
  plugins = plugins || []

  const parent = modules[dirname(path)];
  if (parent) {
    Object.setPrototypeOf(mod, parent);
    plugins = parent.O.plugins.filter(p => p.propagate).concat(plugins);
    parent.O.children.push(mod)
    parent.O.children.sort((a, b) => a.O.path > b.O.path ? 1 : -1);
  }

  // don't allow the module to inherit O
  if (!mod.hasOwnProperty("O")) {
    mod.O = {};
  }
  mod.O.middleware = mod.O.middleware || [];
  mod.O.routes = mod.O.routes || [];
  mod.O.plugins = plugins;
  mod.O.path = path;
  mod.O.parent = parent;
  mod.O.children = [];
  mod.O.module = mod;


  for (const plugin of plugins) {
    plugin(mod);
  }

  modules[path] = mod;
}


export function OwnDir (path) {
  path = resolve('/', path)

  // const mod = modules[path]
  const mod = modules[path]; // Object.create(modules[path]) 
  if (mod) {
    return mod;
  }

  // if we didn't find the module, we need to create it
  // recurse backwards through the path, to ensure that ancestors are generated root-to-leaf
  OwnDir(dirname(path)); 
  // having ensured our ancestry is in place, add ourselves 
  addModule(path, {}, []); 

  // return modules[path]
  return modules[path]; // Object.create(modules[path])
}

// this feels stupid
OwnDir.injectFsInterface = function (FsInterface) {
  const mod = modules['/'];
  Object.setPrototypeOf(mod, {
    get directory() {
      return FsInterface(this.O.path)
    }
  });  
}






