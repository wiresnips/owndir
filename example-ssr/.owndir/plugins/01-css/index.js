function CssPlugin (owndir) {
	Object.defineProperty(owndir, 'css', {
		get() {

			throw "lol fuck, none of THIS works anymore - directory.children is completely revamped"

			const hsChilden = this.directory.children['.owndir']?.children || {}
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

	owndir.O.routes.push(['/style.css', ['get',
		async function (req, res, next) {
			const css = await this.css;
			res.type("text/css");
			res.send(css);
		}
	]]);
}
CssPlugin.propagate = true;

module.exports = CssPlugin;

async function cssText (file) {
	return `/* ${file.path} */\n${ (await file.readAll()).toString() }`
}