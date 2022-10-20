const { OwnDir } = require('owndir');
import React from 'react';
import ReactDOM from 'react-dom';

// hardcode the FUCK out of this until we figure out how to package it less stupidly
const fsNodeProto = require('/home/ben/projects/owndir/src/fsNode/fsNode_client.js')

function applyProto (fsNode) {
  Object.setPrototypeOf(fsNode, fsNodeProto);
  if (fsNode.children) {
	  for (const child of Object.values(fsNode.children)) {
	  	applyProto(child)
	  }
	}
}

(async function () {

	// what does _this_ need to do?
	// first, I need to pull the directory
	const directory = await fetch('/.O').then(res => res.json())

	// now, I need to actually turn it _into_ a directory, which is _annoying_ to say the least
	applyProto(directory);

	// and finally, let's build out our OwnDir
	const owndir = await OwnDir(directory)
	ReactDOM.render( await owndir.body(), document.body)

	// these work
	// ReactDOM.render( EatShit2(), document.body)
	// ReactDOM.render( <EatShit />, document.body)

	// but THIS does not
	// ReactDOM.render( EatShit(), document.body)

	// therefore, what I'm bumping into is specifically a fact about HOOKS,
	// which think I've broken their rules - guess I gotta go read that code?
	// I really don't like the idea of threading this needle, but maybe I can learn something useful

	// I think, though, that React doesn't want to be used they way I'm trying to use it
	// this sure SEEMS like it ought to have been possible, after all

	// OOOOOooohhhh ... yeah, okay
	// React.createElement is expecting to be passed a CONSTRUCTOR, right?
	// it must be doing some kind of jiggering internally that I've skipped

	// because yeah - my function, WHEN I CALL IT LIKE THAT, is _returning_ a component, but it is not _itself_ a component
	// and this is riding right up to what the difference there is


})()

//*
function EatShit() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function EatShit2() {
  // Declare a new state variable, which we'll call "count"  
  // const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => alert('fuck')}>
        Click me
      </button>
    </div>
  );
}

//*/