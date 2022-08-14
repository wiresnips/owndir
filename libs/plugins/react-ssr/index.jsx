const _ = require('lodash')
var React = require('react');
var ReactDOMServer = require('react-dom/server');


module.exports = function (homestead) {

  if (!homestead.hml) {
    homestead.html = function () { return defaultHtml }
  }

  homestead.H.middleware.push(
    ["*", [
      // if there is some DIRECTORY, requested directly, force a reply with html
      ["get", async function (req, res, next) {
        const fsNode = homestead.H.directory.walk(req.path)
        const html = fsnode?.homestead?.html
        if (_.isFunction(html)) {
          const res = await html(target, req)
          if (React.isValidElement(res)) {
            res.send(ReactDOMServer.render(res))
          }
          else {
            res.send(ReactDOMServer.render(errorHtml))
          }
        } else {
          next();
        }
      }]
    ]]
  )
}


const defaultHtml = (
  <html>
    <head>
    </head>
    <body>
      <h1>Homestead, react server-side rendering plugin</h1>
      <p>You are seeing this page, because no html function has been specified.</p>
    </body>
  </html>
)

const errorHtml = (
  <html>
    <head>
    </head>
    <body>
      <h1>Error</h1>
      <p>I exected `html` to return a react element, but it did not.</p>
      <br>
      <p>(this error page needs a LOT of work)</p>
    </body>
  </html>
)