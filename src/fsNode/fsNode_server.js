const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { pathSplit } = require('../utils.js')
const { mimeType } = require('../../libs/utils/fs-utils/index.js')

const fsNodeProto = require('./fsNode.js')
const { addFsAccessRoutes } = require('./accessRoutes.js')
const { Router, routesStr } = require('./router.js')


function fsnErr (error) {
  return {
    success: false,
    error
  }
}


const proto = {

  // "external" functions - I consider these to be part of my interface

  read: function (start, end) {
    start = start || 0
    end = end || Infinity

    if (!this.isFile) {
      return fsnErr(`source ${this.relativePath} is not a file`)
    }
    if (!this.canRead()) {
      return fsnErr(`source ${this.relativePath} cannot be read`)
    }
    return (
      fsp.open(this.absolutePath, 'r')
        .then(file => file.createReadStream({start, end}))
    );
  },

  readAll: function () {
    return this.read().then(async (stream) => {
      const chunks = []
      for await (const chunk of stream) {
          chunks.push(Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    })
  },


  write: function () {

  },

  makeDir: function () {

  },

  delete: function () {

  },

  move: function (destPath) {
    if (!this.canWrite()) {
      return fsnErr(`source ${this.relativePath} cannot be written`)
    }

    const origPath = this.absolutePath;
    const path = pathSplit(destPath);
    const newName = path.pop();

    const destFsNode = destPath.startsWith(pathUtil.sep)
      ? this.root.walk(path)
      : this.parent.walk(path);

    if (!destFsNode) {
      const absTargetPath = pathUtil.resolve(this.absolutePath, ...path)
      return fsnErr(`destination '${absTargetPath}' not found`)
    }

    if (!destFsNode.canWrite()) {
      return fsnErr(`source ${destFsNode.relativePath} cannot be written`)
    }

    destFsNode.adoptChild(this, newName);

    return (
      fsp.rename(origPath, this.path)
      .then(res => ({ success: true }))
      .catch(fsnErr)
    );
  },




  // "internal" functions - *I* use these, but they're not intended for generalized consumption

  json: function () {
    return {
      children: !this.children ? null : _.mapValues(this.children, c => c.json()),
      // this can _absolutely be optimized down, but there's no reason to futz with that now
      ...(_.pick(this, [
        "name", "path", "absolutePath", "relativePath", 
        "isFile", "isDirectory", "isSymbolicLink", "isOwnDir",
        "mtime", "ctime", "mode", "mime"
      ]))
    }    
  },


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

      this._router = new Router();
      if (!this.parent) {
        addFsAccessRoutes(this);
      }
      this._router.use(path, ...handlers);
    }

    return this._router;
  },

}
Object.setPrototypeOf(proto, fsNodeProto);

module.exports = proto;


