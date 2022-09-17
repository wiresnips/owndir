const fs = require('fs')


module.exports = function (owndir) {

  owndir.O.routes.push(
    ["*",
      // if there is some exact file, requested directly, just send it
      ["get", async function (req, res, next) {
        const fsNode = this.O.directory.walk(req.path)
        if (fsNode?.isFile) {
          res.setHeader("content-type", fsNode.mime);
          fs.createReadStream(fsNode.absPath).pipe(res);
        } else {
          next();
        }
      }]
    ]
  )
}
