const _ = require('lodash')
const fsp = require('fs/promises')
const stream = require('stream');
const { ReadableStream } = require('node:stream/web');
const pathUtil = require("path")

const { pathSplit } = require('../utils.js')
const { mimeType, mkdir } = require('../../libs/utils/fs-utils/index.js')

const fsNodeProto = require('./fsNode.js')
const { addFsAccessRoutes } = require('./accessRoutes.js')
const { Router, routesStr } = require('./router.js')
const mapDir = require('./mapDir.js')

const status = {
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500
}

function fsnErr (error, statusCode) {
  return {
    success: false,
    status: statusCode || status.serverError
    error
  }
}


const proto = {

  // "external" functions - I consider these to be part of my interface

  read: function (start, end) {
    start = start || 0
    end = end || Infinity

    if (!this.isFile) {
      return fsnErr(`source ${this.relativePath} is not a file`, status.notFound)
    }
    if (!this.canRead()) {
      return fsnErr(`source ${this.relativePath} cannot be read`, status.forbidden)
    }
    return (
      fsp.open(this.absolutePath, 'r')
        .then(file => file.createReadStream({start, end}))
        .then(ReadableStream.toWeb)
        .catch(fsnErr)
    );
  },

  readAll: function () {
    return this.read().then(async (streamOrErr) => {
      if (streamOrErr.error) {
        return streamOrErr
      }

      const chunks = []
      for await (const chunk of streamOrErr) {
          chunks.push(Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    })
    .catch(fsnErr)
  },

  write: function (path, data, opts) {

    // because path is optional and data is not, we have to check whether arg2 can be data
    const dataArgAligned = (
      _.isString(data) || 
      _.isBuffer(data) || 
      data instanceof stream.Readable
    );

    // if data is not aligned, shunt the args over by one
    // because path was implicit, so it's actually data
    if (!dataArgAligned) {
      opts = data;
      data = path;
      path = '';
    }

    // okay, we've found our args - now normalize them
    path = path || ''
    opts = Object.assign({flags: 'w', start: 0}, opts)

    // by rights, this should be us, but there's no reason I can think of to _insist_
    const nearestFsNode = this.walk(path, {bestEffort: true});
    if (!nearestFsNode.canWrite()) {
      return fsnErr(`${nearestFsNode.relativePath} cannot be written`, status.forbidden)
    }

    const absPath = pathUtil.resolve(nearestFsNode.absolutePath, path);
    if (!absPath.startsWith(this.root.absolutePath)) {
      return fsnErr(`${path} cannot be written`, status.forbidden)
    }

    const src = stream.Readable.from(data)
    const dest = fsp.open(absPath, opts.flags).createWriteStream({start: opts.start})

    return new Promise((resolve, reject) => {
      src.on('error', error => {
        reject(fsnErr(`error in read stream: ${error}`));
      })
      dest.on('error', error => {
        reject(fsnErr(`error in write stream: ${error}`));
      })

      dest.on('finish', () => resolve({ success: true }))
    })
  },

  makeDir: async function (path) {

    const absPath = pathUtil.resolve(this.absolutePath, destPath);
    if (!absPath.startsWith(this.root.absolutePath)) {
      return fsnErr(`${path} cannot be written`, status.forbidden)
    }

    // by rights, this should be us, but there's no reason I can think of to _insist_
    const nearestFsNode = this.walk(path, {bestEffort: true});
    if (!nearestFsNode.canWrite()) {
      return fsnErr(`source ${nearestFsNode.relativePath} cannot be written`, status.forbidden)
    }

    const mkdErr = mkdir(absPath).catch(_.identity)
    if (mkdErr) {
      // should return a string in the case of _partial_ success?
      // https://nodejs.org/api/fs.html#fspromisesmkdirpath-options
      return _.isString(mkdErr) 
        ? fsnErr(`unable to complete creation of ${path}.`)
        : fsnErr(mkdErr); 
    }

    newFsNode = await mapDir(absPath, nearestFsNode, this.root);
    nearestFsNode.adoptChild(newFsNode)

    return this.walk(path);
  },

  move: function (destPath) {
    /*
      if destPath points exactly at a directory
        - no name-change occurs
        - make destPath our parent

      if destPath doesn't exist, but the PARENT does,
        - rename ourselves to the last segment of destpath
        - make destPath's parent our parent

      otherwise, error out
    */

    if (!this.canWrite()) {
      return fsnErr(`source ${this.relativePath} cannot be written`, status.forbidden)
    }

    const absDestPath = pathUtil.resolve(this.absolutePath, destPath);
    if (!absDestPath.startsWith(this.root.absolutePath)) {
      return fsnErr(`destination ${destFsNode.relativePath} cannot be written`, status.forbidden)
    }

    const destFsNode = this.walk(destPath, {bestEffort: true});
    if (destFsNode.isFile) {
      return fsnErr(`existing file found at ${destPath}`, status.conflict)
    }
    if (!destFsNode.canWrite()) {
      return fsnErr(`destination ${destFsNode.relativePath} cannot be written`, status.forbidden)
    }

    const normDestPath = pathUtil.resolve(this.relativePath, destPath);

    // the portion of the resolved destination path that does not already exist
    const novelPath = pathUtil.relative(destFsNode.relativePath, normDestPath);    

    // if we would have to create new directories to complete this move, error out
    if (novelPath.includes(pathUtil.sep)) {
      return fsnErr(`destination '${pathUtil.dirname(normDestPath)}' not found`, status.notFound)
    }

    // we're moving into destFsNode without renaming
    if (_.isEmpty(novelPath)) {
      destFsNode.adoptChild(this)  
    }
    // moving into destFsNode, renaming on the way
    else {
      // I don't currently have a mechanism to validate that the node WOULD be writeable, if it existed
      // that seems pretty weird. Gonna hafta sleep on that for a bit.
      destFsNode.adoptChild(this, novelPath);   
    }

    return (
      fsp.rename(origPath, this.path)
      .then(res => ({ success: true }))
      .catch(fsnErr)
    );
  },


  delete: function () {
    /*
      do I just hack away at the filesystem willy-nilly?
      how's that going to interact with my event-listeners?
      
      let's agree that the event-listeners are generally fucked, 
      and ignore that they exist at all for the moment
      
      cool! - in that case, I'll just do everything from here
    */

    if (!this.canWriteAll()) {
      return fsnErr(`something at ${this.relativePath} cannot be deleted (write disallowed). `, status.forbidden);
    }

    fsp.rm(this.absolutePath, { recursive: true, maxRetries: 10 })
      .then(() => {
        // remove the owndir
        const owndirFamily = this.owndir?.O.parent?.children
        if (owndirFamily) {
          delete this.owndir.O.parent.children[this.name]  
        }
        
        if (this.parent) {
          delete this.parent.children[this.name]
          this.parent.invalidateRouter()
        }
        return { success: true }
      })
      .catch(fsnErr)
  },


  // "internal" functions - *I* use these, but they're not intended for generalized consumption

  desc: function () {
    return {
      children: !this.children ? null : _.mapValues(this.children, c => c.desc()),
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


