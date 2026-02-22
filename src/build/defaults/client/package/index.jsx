const { OwnDir } = require('owndir.package');
import fsInterface from "./fsNode/interface_bridge_ws_client.js"
// import fsInterfaceWs from "./fsNode/interface_client_fsapi/index.js"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function OwndirRouter ({ root }) {

  const location = useLocation();
  const {pathname} = location
  console.log("OwndirRouter",  { location })

  const mod = root.walk(pathname).module;
  document.querySelector('base').setAttribute('href', pathname);

  if (mod.frame) {
  // this has to be structured as a "normal" function call in order to preserve `this`
    return mod.frame();
  }
  
  return <>
      <h1>OwnDir {pathname}</h1>
      <p>You are seeing this page because no frame function has been provided.</p>
  </>
}

(async function () {
  const FsInterface = await fsInterface.init();
  OwnDir.injectFsInterface(FsInterface);

  const directory = await FsInterface('/');
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
      <OwndirRouter root={directory} />
    </BrowserRouter>,
    // document.getElementById('owndir-root')
     document.getElementsByTagName("body")[0]
  );
})()

