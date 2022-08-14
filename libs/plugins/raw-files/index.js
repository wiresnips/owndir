const fs = require('fs')


module.exports = function (homestead) {

  homestead.H.routes.push(
    ["*", [
      // if there is some exact file, requested directly, just send it
      ["get", async function (req, res, next) {
        const fsNode = homestead.H.directory.walk(req.path)
        if (fsNode.isFile) {
          res.setHeader("content-type", fsNode.mime);
          fs.createReadStream(fsNode.absPath).pipe(res);
        } else {
          next();
        }
      }]
    ]]
  )
}
