const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { pathSplit } = require('../utils.js')

const fsNodeProto = require('./fsNode.js')
const { Router, routesStr } = require('../router.js')

// this lib is a wrapper over libmagic, and has inherited some terrible names
const { Magic: MimeDetector, MAGIC_MIME: MIME_TYPE_ENCODING } = require('mmmagic')
const mime = new MimeDetector(MIME_TYPE_ENCODING)

function mimeType (path) {
  return new Promise((resolve, reject) => {
    mime.detectFile(path, (err, contentType) => {
      if (err) {canWri
        return reject(err)
      }
      const [mimeType, charset] = contentType.split('; charset=')
      if (charset) {
        resolve({ mimeType, charset, contentType })
      }
      resolve({ contentType })
    })
  })
}



const proto = {

  // legacy shit - obviate with the below functions

  open: function (...args) {
    if (this.isFile) {
      return fsp.open(this.absPath, ...args)
    }
  },

  text: async function (encoding) {
    if (this.isFile) {
      encoding = encoding || 'utf-8'
      const handle = await fsp.open(this.absolutePath)
      const content = await handle.readFile(encoding)
      handle.close()
      return content;
    }
  },





  // "external" functions - I consider these to be part of my interface

  read: function () {

  },

  write: function () {

  },

  makeDir: function () {

  },

  delete: function () {

  },

  move: function (destPath) {
    if (!this.canWrite()) {
      return {
        success: false,
        error: `source ${this.relativePath} cannot be written`
      }
    }

    const origPath = this.absolutePath;
    const path = pathSplit(destPath);
    const newName = path.pop();

    const destFsNode = destPath.startsWith(pathUtil.sep)
      ? this.root.walk(path)
      : this.parent.walk(path);

    if (!destFsNode) {
      const absTargetPath = pathUtil.resolve(this.absolutePath, ...path)
      return {
        success: false,
        error: `destination '${absTargetPath}' not found`
      };
    }

    if (!destFsNode.canWrite()) {
      return {
        success: false,
        error: `source ${destFsNode.relativePath} cannot be written`
      }
    }

    destFsNode.adoptChild(this, newName);

    return (
      fsp.rename(origPath, this.path)
      .then(res => ({ success: true }))
      .catch((error) => ({ success: false, error }))
    );
  },




  // "internal" functions - *I* use these, but they're not intended for generalized consumption



  loadStat: async function () {
    const stat = await fsp.stat(this.absolutePath).catch(err => null)
    if (!stat) {
      return null
    }

    this.isFile = stat.isFile();
    this.isDirectory = stat.isDirectory();
    this.isSymbolicLink = stat.isSymbolicLink();

    this.mtime = stat.mtimeMs;
    this.ctime = stat.ctimeMs;
    // this.atime = stat.atimeMs;

    // this could do with some expansion, once I figure out
    // how or even whether I want to express ownership / permissions
    this.mode = stat.mode;

    if (this.isFile) {
      this.size = stat.size
      this.mime = await mimeType(this.absolutePath).catch(() => null)
    }
    return true;
  },


  // at some point, I should just admit that I'm not _using_ express, I'm just *riffing* on express

  requestHandler: function (req, res, next) {
    const router = this.router
    return router ? router(req, res, next) : next();
  },

  get router () {
    let routerInvalid = !!this._router;

    if (this.owndir) {
      const preRoutes = this.owndir.O.middleware || [];
      if (this._pre_router?.signature !== routesStr(preRoutes)) {
        this._pre_router = new Router(preRoutes, this.owndir)
        routerInvalid = true;
      }

      const postRoutes = this.owndir.O.routes || [];
      if (this._post_router?.signature !== routesStr(postRoutes)) {
        this._post_router = new Router(postRoutes, this.owndir)
        routerInvalid = true;
      }
    }

    if (routerInvalid) {
      const path = this.parent ? `/${this.name}` : '';

      const handlers = [
        this._pre_router,
        ...(this.childrenArray.filter(child => child.isDirectory).map(child => child.requestHandler.bind(child))),
        this._post_router
      ].filter(x => x)

      this._router = new Router().use(path, ...handlers);
    }

    return this._router;
  },

}
Object.setPrototypeOf(proto, fsNodeProto);

module.exports = proto;


