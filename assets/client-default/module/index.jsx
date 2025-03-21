const { OwnDir } = require('owndir.bundle');

import fsInterfaceWs from "./fsNode/interface_ws.js"
import fsInterfaceHttp from "./fsNode/interface_http.js"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';

(async function () {
  const FsInterface = await fsInterfaceWs.init(OwnDir);
  OwnDir.injectFsInterface(FsInterface);

	const directory = await FsInterface('/');
	window.directory = directory

	ReactDOM.render( 
		<BrowserRouter>
			<OwndirRouter root={directory} />
		</BrowserRouter>,
		document.getElementById('csr-plugin-root-element')
	);

})()


function OwndirRouter ({ root }) {
	const { pathname } = useLocation();
	// this has to be structured as a "normal" function call in order to preserve `this`
	return root.walk(pathname).module.frame();	
}