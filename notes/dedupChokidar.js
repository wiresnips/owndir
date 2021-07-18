function dedupCkd (minWait, maxWait, handler) {

	// okay, a new event comes in

	// we're going to wait at LEAST minWait ms, and at MOST maxWait ms
	// and aggregate paths, until we find the

	function timeouts (path, ...args) {
		function trigger () {
			timeouts.clear()
			handler(path, ...args)
		}

		let timeouts = {
			min: setTimeout(trigger, minWait),

			max: setTimeout(trigger, maxWait),
			
			touch: () => {
				clearTimeout(timeouts.min)
				timeouts.min = setTimeout
			}
			clear: () => {
				clearTimeout(timeouts.min)
				clearTimeout(timeouts.max)
			},

		}
		return timeouts
	}

	const handlers = {}

	return (path, ...args) => {

		if (!handlers[path]) {
			let handler = {
				minTimeout: setTimeout(() => {}, minWait)
				maxTimeout: setTimeout(() => {}, maxWait)
			}
			handlers[path] = handler
		}

		const overlap = Object.keys(handlers).filter(hPath => hPath.startsWith(path) || path.startsWith(hPath))
		const rootPath = _.minBy(overlap, p => p.length)

		// now, anything that ISN'T the root, I want to kill the timeout
		overlap.filter(hPath => hPath !== rootPath).forEach(hPath => {
			handlers[hPath].clear()
			delete handlers[hPath]
		})

	}
}