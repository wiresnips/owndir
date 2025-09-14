const { OwnDir } = require('owndir.bundle');

import fsInterfaceWs from "./fsNode/interface_ws.js"
import fsInterfaceHttp from "./fsNode/interface_http.js"
// import fsInterfaceWrtc from "./fsNode/interface_wrtc.js"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';

function OwndirRouter ({ root }) {
	const { pathname } = useLocation();
	// this has to be structured as a "normal" function call in order to preserve `this`
	return root.walk(pathname).module.frame();	
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


