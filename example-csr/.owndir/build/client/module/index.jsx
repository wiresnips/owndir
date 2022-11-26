const { OwnDir } = require('owndir.bundle');
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';

// hardcode the FUCK out of this until we figure out how to package it less stupidly
const FsNodeProto = require('/home/ben/projects/owndir/src/fsNode/fsNode_client.js')
const Permission = require('/home/ben/projects/owndir/src/fsNode/permission.js')

function fsNodeFromDesc (fsNode, parent) {
  fsNode.root = parent?.root || fsNode
  fsNode.parent = parent
  fsNode.listeners = []
  fsNode.permRead = new Permission('permRead', fsNode);
  fsNode.permWrite = new Permission('permWrite', fsNode);
  
  Object.setPrototypeOf(fsNode, FsNodeProto);

  if (fsNode.children) {
	  for (const child of Object.values(fsNode.children)) {
	  	fsNodeFromDesc(child, fsNode)
	  }
	}
}


(async function () {

	// what does _this_ need to do?
	// first, I need to pull the directory
	const directory = await fetch('/@').then(res => res.json())

	// now, I need to actually turn it _into_ a directory, which is _annoying_ to say the least
	fsNodeFromDesc(directory);

	// and finally, let's build out our OwnDir
	const owndir = await OwnDir(directory)
	window.owndir = owndir

	ReactDOM.render( 
		<BrowserRouter>
			<OwndirRouter owndir={owndir} />
		</BrowserRouter>,
		document.getElementById('csr-plugin-root-element')
	);
})()


function OwndirRouter ({ owndir }) {
	const { pathname } = useLocation();
	const params = useParams();

	console.log({pathname});

	// yeah okay, this is a long incantation
	const fsNode = owndir.O.directory.walk(pathname, {bestEffort: true});
	const target = fsNode.isDirectory ? fsNode.owndir : fsNode.parent.owndir;

	return target.frame();
}