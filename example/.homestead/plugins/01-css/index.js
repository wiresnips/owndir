module.exports = function (homestead) {

	Object.defineProperty(homestead, 'css', {
		get() {
			const hsChilden = this.H.directory.children['.homestead']?.children || {}
			const css_p = (
				Object.keys(hsChilden).sort()
					.map(cname => hsChilden[cname])
					.filter(child => child.isFile && child.name.endsWith('.css'))
					.map(cssText)
			);

			const parentCss = this.H.parent?.css || '';
			return Promise.all(css_p).then(fileContents => [parentCss, ...fileContents].join('\n\n'));
		}
	})

	homestead.addRoute('get', '/style.css',
		async function (req, res, next) {
			const css = await this.css;
			res.setHeader("content-type", "text/css");
			res.send(css);
		}
	);
}

async function cssText (file) {
	return `/* ${file.path} */\n${ await file.text() }`
}