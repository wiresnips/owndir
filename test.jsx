
module.exports = {
	
	html: () => {
		return (
			<html>
				<head title='test-fuck'/>
				<body />
			</html>
		)
	},

	head: (title) => <head><title>{title}</title></head>,

	body: (message) => {
		return (
			<body>
				<em>{message}</em>
			</body>
		)
	}	
}