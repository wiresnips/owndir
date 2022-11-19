
const { mapDir } = require('../../../src/fsNode/mapDir.js');
const FsNode = require('../../../src/fsNode/fsNode.js')
const acct = require('./account.js');

(async function () {
	const dir = await mapDir('/home/ben/projects/owndir/example-csr/finance');
	dir.permRead.allow("**")
	dir.permWrite.allow(fsNode => !fsNode.isOwnDir)
	
	await dir.touch('td.acct');

	const account = await acct.loadAccount(dir.children['td.acct'])
	await account.loadNewTransactions()

	console.log(account.fsNode)


	// console.log(account.toString())

	// console.log(JSON.stringify(account.errors, null, 2))

	await account.save()

	// console.log(account)

	// await account.markAllRawAsDone()
})()

