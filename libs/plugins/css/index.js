module.exports = function (owndir) {

	Object.defineProperty(owndir, 'css', {
		get() {
			const childen = this.O.directory.children['.owndir']?.children || {}
			const css_p = (
				Object.keys(childen).sort()
					.map(cname => childen[cname])
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

async function cssText (file) {
	return `/* ${file.path} */\n${ await file.text() }`
}