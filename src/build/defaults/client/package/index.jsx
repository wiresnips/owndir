const { OwnDir } = require('owndir.package');

import fsInterfaceWs from "./fsNode/interface_bridge_ws_client.js"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';

function OwndirRouter ({ root }) {
	const { pathname } = useLocation();

	const mod = root.walk(pathname).module;
	if (mod.frame) {
	// this has to be structured as a "normal" function call in order to preserve `this`
		return mod.frame();
	}
	
	return <>
      <h1>OwnDir {pathname}</h1>
      <p>You are seeing this page because no frame function has been provided.</p>
  </>
}

async function renderOwndir (fsInterface) {
  const FsInterface = await fsInterface.init(OwnDir);
  OwnDir.injectFsInterface(FsInterface);

	const directory = await FsInterface('/');
	window.directory = directory;

	ReactDOM.render(
		<BrowserRouter>
			<OwndirRouter root={directory} />
		</BrowserRouter>,
		document.getElementById('csr-plugin-root-element')
	);
}

renderOwndir(fsInterfaceWs);


