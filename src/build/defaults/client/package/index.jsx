const { OwnDir } = require('owndir.package');
import fsInterface from "./fsNode/interface_bridge_ws_client.js"
// import fsInterfaceWs from "./fsNode/interface_client_fsapi/index.js"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

(async function () {
  const directory = await fsInterface.init();
  OwnDir.injectFsRoot(directory);
  initClient(directory)
})()



function ClientRouter ({ root }) {
  const location = useLocation();
  const {pathname} = location
  document.querySelector('base').setAttribute('href', pathname);

  // inject module classes onto the body
  const fsNode = root.walk(pathname)
  pathToModuleClasses(fsNode.absolutePath)
    .then(classes => document.documentElement.className = classes.join(" "));

  // console.log("ClientRouter", { location, pathname, root, fsNode, })

  const mod = fsNode.module;
  if (mod.frame) {
  // this has to be structured as a "normal" function call in order to preserve `this`
    return mod.frame();
  }
  
  return <>
      <h1>OwnDir {pathname}</h1>
      <p>You are seeing this page because no frame function has been provided.</p>
  </>
}


function initClient (directory) {
  window.directory = directory;

  // inconsistencies arise with the server-side routing when you load a nested directory 
  // (index.html in the root-level /static), and I haven't found a clean solution
  // thus, this is the second half of the dirty solution: papering over the redirect!
  const url = new URL(window.location.href);
  if (url.searchParams.has("___redirectedToRootFrom")) {
    url.pathname = url.searchParams.get("___redirectedToRootFrom");
    url.searchParams.delete("___redirectedToRootFrom");
    window.history.replaceState(null, "", url.toString());
  }

  ReactDOM.render(
    <BrowserRouter>
      <ClientRouter root={directory} />
    </BrowserRouter>,
    document.body
  );
}




async function moduleClass (modulePath) {
  // note it's important that modulePath match what's emitted into "owndirModulePath" by assemble.js
  // and that the output be identical to what is produced by client/bundler/esbuild scopeCssByModule
  const encoder = new TextEncoder();
  const data = encoder.encode(modulePath);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return "o" + hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('').slice(0,7);
}

async function pathToModuleClasses (path) {
  // the root doesn't get a discriminator, because it's always applied
  if (path == "/") {
    return []
  }
  
  path = path.slice(1); // remove the leading slash, otherwise split('/') gets squirrelly
  const steps = path.split("/");
  const subPaths = steps.map((step, index) => "/" + steps.slice(0,index+1).join("/"))
  return Promise.all(subPaths.map(moduleClass))
}
