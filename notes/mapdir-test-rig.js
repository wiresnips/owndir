
// remember to re-enable scanning of node_modules first for a fair test

const { mapDir } = require('/home/ben/projects/owndir/src/fsNode/mapDir.js')

async function bench () {
	console.log('starting')
	const t1 = Date.now()
	const dir = await mapDir('/home/ben/projects')
	const elapsed = Date.now() - t1;
	console.log("elapsed", (elapsed / 1000).toFixed(3))
	process.memoryUsage()
	return dir;
}


process.memoryUsage()

let dir;
bench().then(d => {
	dir = d
});

/*

$ find . -type f | wc -l
163455

$  du -sh /home/ben/projects/
1.8G	/home/ben/projects/

> 
> process.memoryUsage()
{
  rss: 60755968,
  heapTotal: 21540864,
  heapUsed: 13374432,
  external: 1297363,
  arrayBuffers: 34156
}
> 
> let dir;
undefined
> bench().then(d => {
...   dir = d
... });
starting
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 74,
  [Symbol(trigger_async_id_symbol)]: 62
}
> 
> elapsed 71.878

> process.memoryUsage()
{
  rss: 538365952,
  heapTotal: 270839808,
  heapUsed: 158654680,
  external: 1254103,
  arrayBuffers: 33034
}

okay, that was more than a minute, and 150 mb to scan the directory
_really_ don't love the time that takes

//*/