const { OwnDir } = require('owndir.bundle');
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';

// hardcode the FUCK out of this until we figure out how to package it less stupidly
import fsInterface from '/home/ben/projects/owndir/server/src/fsNode/interface_client.js';

// I expect this will end up being something like:
// import fsInterface from '@owndir/server/fsNode/interface_client.js'

// or maybe it'll even get pulled out into it's own package:
// import fsInterface from '@owndir/browserFsInterface'

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
	return root.walk(pathname).module.frame();	
}