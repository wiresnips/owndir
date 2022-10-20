const React = require('react');
const {resolve} = require('path');

// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.js
const isServerSide = (
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null
);


module.exports = function (owndir) {
  if (isServerSide) {
    owndir.addRoute('get', '*',
      function (req, res, next) {
        // hardcode this shit for now, we'll get back to it later
        res.sendFile(resolve(__dirname, 'index.html'))
      }
    );
  }
}

