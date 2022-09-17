var React = require('react');
import { renderToString } from 'react-dom/server';

const defaultHtml = function (req) {
  return <html>
    <head>
      <meta charSet="utf-8"/>
      <title>{req.path}</title>
    </head>
    <body>
      <h1>Homestead, react server-side rendering plugin</h1>
      <p>You are seeing this page because no html function has been provided.</p>
    </body>
  </html>
}

module.exports = function (homestead) {

  if (!homestead.html) {
    homestead.html = defaultHtml
  }

  homestead.addRoute('get', '*', 
    async function (req, res, next) {
      const fsNode = this.H.directory.walk(req.path, true)

      console.log('react-ssr-plugin', req.originalUrl, this, fsNode)

      if (!fsNode) {
        return next();
      }

      const target = fsNode.isFile
        ? fsNode.parent.homestead
        : fsNode.homestead

      console.log('target', target)

      res.send('<!DOCTYPE html>\n' +
        renderToString(await target.html(req)));
    }
  );

}

