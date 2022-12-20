
const { mapDir } = require('../../../src/fsNode/mapDir.js');
const FsNode = require('../../../src/fsNode/fsNode.js')
const Acct = require('./account.js');

(async function () {
	const dir = await mapDir('/home/ben/projects/owndir/example-csr/finance');
	dir.permRead.allow("**")
	dir.permRead.disAllow('.owndir/**')
	
	await dir.touch('td.acct');

	const account = await Acct.loadAccount(dir.children['td.acct'])
	await account.loadNewTransactions()

	console.log(account.fsNode)

	// await account.save()
	await account.markAllRawAsDone()
})()

