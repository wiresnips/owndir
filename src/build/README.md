okay, what the FUCK is happening here?

I want to be able to specify things about my build, and I don't understand the specifics of that

so I'm just going to build out specifically what I need, and see how it can be generalized


what I'm thinking is, I want to allow things to import the "base", which is what I've built so far, and recompile them ...


Okay, let's think about that a little more


	currently, I cobble together `.owndir-build/index.js`
	and then I use `esbuild` to pack it into a single file, which I import directly, to feed the directory


	but, now I want a client build that does additional things,
	and I _do_ think that those additional things need to be handled at build time, because they need to be inside the bundle
		(? is this true? I don't even really know how to _validate_ this ...)

		let's take it as a given for now

	So, what's the idea, then?
	I want to basically put forwards a new package, that depends on `.owndir-build`


```
const { OwnDir } = require('owndir-build')
let owndir = null;

fetch(window.location.origin + '/.', { method: "get" }).then(
	res => res.json().then(OwnDir).then(od => owndir = od)
);
```

This is a totally reasonable starting-point, isn't it?


Okay, let's think about what that actually entails, though

	I need to be able to depend on the owndir PACKAGE
		need to package it, like I did my submodule dependencies
		and, need to REFER to it - this is trickier, isn't it?
			well, I guess I could just put it in a known location

		Upside, this ALSO lets me move away mandating esbuild



Alright, so I've got a "build" which is another whole-ass module, likely with it's own dependencies
and, I need to import that, 