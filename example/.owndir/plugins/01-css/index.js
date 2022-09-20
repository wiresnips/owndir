function CssPlugin (owndir) {
	owndir.propagatePlugin(CssPlugin);

	Object.defineProperty(owndir, 'css', {
		get() {
			const hsChilden = this.O.directory.children['.owndir']?.children || {}
			const css_p = (
				Object.keys(hsChilden).sort()
					.map(cname => hsChilden[cname])
					.filter(child => child.isFile && child.name.endsWith('.css'))
					.map(cssText)
			);

			const parentCss = this.O.parent?.css || '';
			return Promise.all(css_p).then(fileContents => [parentCss, ...fileContents].join('\n\n'));
		}
	})

	owndir.addRoute('get', '/style.css',
		async function (req, res, next) {
			const css = await this.css;
			res.setHeader("content-type", "text/css");
			res.send(css);
		}
	);
}

module.exports = CssPlugin;

async function cssText (file) {
	return `/* ${file.path} */\n${ await file.text() }`
}