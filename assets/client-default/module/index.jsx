const { OwnDir } = require('owndir.bundle');

import fsInterface from "owndir/src/fsNode/interface_client.js"
//import fsInterface from "/home/ben/projects/owndir/server/src/fsNode/interface_client.js"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';

(async function () {
  const FsInterface = fsInterface.init(OwnDir);
  OwnDir.injectFsInterface(FsInterface);

	const directory = FsInterface('/')
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