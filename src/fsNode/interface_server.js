const _ = require('lodash')
const fsp = require('fs/promises')
const anymatch = require('anymatch')
const stream = require('stream');
const { ReadableStream } = require('node:stream/web');
const pathUtil = require("path")

const { mimeType, mkdir } = require('../../libs/utils/fs-utils/index.js')
const { status, fsnErr } = require('./errors.js')

const { Directory } = require('./directory.js')
module.exports.init = (root, OwnDir) => Directory(root, OwnDir, Interface);


function canBeWriteData (maybeData) {
  return (
    _.isString(maybeData) || 
    _.isBuffer(maybeData) || 
    maybeData instanceof stream.Readable 
  )
}

const Interface = {

  children: async function () {
    const self = this;

    const info = await this.info();
    if (!info?.isDirectory) {
      throw fsnErr(`${this.relativePath} is not a directory`, status.notFound)
    }

    const childNames = await fsp.readdir(this.absolutePath)
    return Promise.all(
      childNames
        .sort()
        .map(name => self.walk(name))
        .filter(child => child.canRead())
    );
  },

  delete: async function (path) {
    if (path) {
      return this.walk(path).delete();
    }

    if (!this.canWriteAll()) {
      throw fsnErr(`something at ${this.relativePath} cannot be deleted (write disallowed). `, status.forbidden);
    }

    await fsp.rm(this.absolutePath, { recursive: true, maxRetries: 10 });
    return this;
  },

  info: async function (path) {
    if (path) {
      return this.walk(path).info();
    }

    if (!this.canRead()) {
      throw fsnErr(`${this.relativePath} cannot be read`, status.forbidden)
    }

    const stat = await fsp.stat(this.absolutePath).catch(err => null)
    if (!stat) {
      return null;
    }

    const isFile = stat.isFile();

    return {
      isFile,
      isDirectory: stat.isDirectory(),
      isSymLink: stat.isSymbolicLink(),
      size: isFile ? stat.size : 0,
      mtime: stat.mtimeMs,
      ctime: stat.ctimeMs,
      mode: stat.mode,
      mime: !isFile ? null : await mimeType(this.absolutePath).catch(() => null)
    }
  },

  makeDir: async function (path) {
    if (path) {
      return this.walk(path).makeDir();
    }

    if (!this.canWrite()) {
      throw fsnErr(`${this.relativePath} cannot be written`, status.forbidden)
    }

    await mkdir(this.absolutePath)
    return this;
  },

  move: async function (path, opts) {
    if (!this.canWrite()) {
      throw fsnErr(`source ${this.relativePath} cannot be written`, status.forbidden)
    }

    opts = Object.assign({overwrite: false}, opts)

    let dest = this.parent.walk(path);
    let destInfo = await dest.info();

    if (destInfo?.isDirectory) {
      dest = dest.walk(this.name);
      destInfo = await dest.info();      
    }

    if (!dest.canWrite()) {
      throw fsnErr(`destination ${dest.relativePath} cannot be written`, status.forbidden) 
    }

    if (!opts.overwrite && destInfo?.isFile) {
      throw fsnErr(`existing file found at ${dest.relativePath}`, status.conflict)
    }

    await mkdir(dest.parent.absolutePath);
    await fsp.rename(this.absolutePath, dest.absolutePath);

    return dest;
  },

  read: async function (path, start, end) {
    if (_.isString(path)) {
      return this.walk(path).read(start, end)
    }

    end = start
    start = path
    path = null;

    start = start || 0
    end = end || Infinity

    if (!this.canRead()) {
      throw fsnErr(`${this.relativePath} cannot be read`, status.forbidden)
    }

    const info = await this.info();
    if (!info?.isFile) {
      throw fsnErr(`${this.relativePath} is not a file`, status.notFound)
    }

    return (
      fsp.open(this.absolutePath, 'r')
        .then(file => file.createReadStream({start, end}))
        .then(ReadableStream.toWeb)
    );
  },

  readAll: async function (path) {
    return this.read(path).then(async (stream) => {
      const chunks = []
      for await (const chunk of stream) {
          chunks.push(Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    })
  },

  touch: async function (path) {
    if (path) {
      return this.walk(path).touch();
    }

    if (!this.canWrite()) {
      throw fsnErr(`${this.relativePath} cannot be written`, status.forbidden)
    }

    const exists = await this.info()
    if (exists) {
      const t = new Date();
      fsp.utimes(this.absolutePath, t, t)
    } else {
      this.write(null, { flags: 'a' })
    }

    return this;
  },

  write: async function (path, data, opts) {
    console.log("write", {path, data, opts})

    // because path is optional and data is not, we have to check whether arg2 can be data
    // if a path WAS given, we walk it FIRST, so after this point, we can normalize our args
    if (canBeWriteData(data)) {
      return this.walk(path).write(data, opts);
    }

    // realign args
    opts = data;
    data = path;
    path = null;
  
    opts = Object.assign({flags: 'w'}, opts)

    if (!this.canWrite()) {
      throw fsnErr(`${this.relativePath} cannot be written`, status.forbidden)
    }

    const file = await fsp.open(this.absolutePath, opts.flags)
    const dest = file.createWriteStream({start: opts.start})
    const src = data && stream.Readable.from(data)

    return new Promise((resolve, reject) => {
      dest.on('error', error => reject(fsnErr(`error in write stream: ${error}`)));
      dest.on('finish', async () => resolve(this));

      if (src) {
        src.on('error', error => reject(fsnErr(`error in read stream: ${error}`)));
        src.pipe(dest);
      } else {
        dest.close();
      }
    })
  },






  requestHandler: function (req, res, next) {
    const router = this.router
    return router ? router(req, res, next) : next();
  },

  get router () {
    const mod = this.module;
    if (!mod) {
      return null;
    }

    // if we don't HAVE _router, we DEFINITELY rebuild
    let rebuildRouter = !this._router;

    const preRoutes = mod.O.middleware || [];
    if (this._pre_router?.signature !== routesStr(preRoutes)) {
      this._pre_router = new Router(preRoutes, mod)
      rebuildRouter = true;
    }



    const postRoutes = mod.O.routes || [];
    if (this._post_router?.signature !== routesStr(postRoutes)) {
      this._post_router = new Router(postRoutes, mod)
      rebuildRouter = true;
    }

  
    if (rebuildRouter) {
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
