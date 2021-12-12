

/* 
// this was not as clever as I thought it was

const scope_1 = {
	success: 'success!'
}


function doTheThing () {
	try {
		console.log('access via function:', success)
	} catch (err) {
		console.log('access via function: FAILED')
	}
}

doTheThing()

with (scope_1) {
	console.log('naked access from with:', success)
	doTheThing()
}

*/



const parent = {
	parentFn: function () {
		console.log('parentFn')
		this.childFn()
	}
}

const child = Object.create(parent)
Object.assign(child, {
	childFn: function () {
		console.log('childFn')
	}
})

console.log({
	pfn: child.parentFn,
	cfn: child.childFn
})

child.parentFn()