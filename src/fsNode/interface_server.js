const _ = require('lodash')
const fsp = require('fs/promises')
const anymatch = require('anymatch')
const stream = require('stream');
const { ReadableStream } = require('node:stream/web');
const pathUtil = require("path")
const chokidar = require('chokidar');

const { mkdir } = require('../../libs/utils/fs-utils/index.js')
const mime = require('mime');
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

    // the call to info serves as a canRead check
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

    if (!await this.info()) {
      return this;
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
      mime: !isFile ? null : mime.getType(this.absolutePath)
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

  move: async function (destPath, opts) {
    if (!this.canWrite()) {
      throw fsnErr(`source ${this.relativePath} cannot be written`, status.forbidden)
    }

    opts = Object.assign({overwrite: false}, opts)

    let dest = this.parent.walk(destPath);
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

  // https://github.com/paulmillr/chokidar
  // events and options come straight from chokidar
  //  options.depth defaults to 1
  //  options.cwd is forced to FsNode.absolutePath
  // events: add, addDir, change, unlink, unlinkDir, ready, raw, error, all
  sub: function (paths, events, listener, opts) {
    
    // paths and events are optional, grant them defaults and shuffle the args down
    if (_.isFunction(paths)) {
      opts = events;
      listener = path;
      events = ["all"];
      paths = ["."];
    } else if (_.isFunction(events)) {
      opts = listener;
      listener = events;
      events = paths;
      paths = ["."];
    }

    paths = paths || ['.']
    events = events || ['all']

    // massage args into expected shapes
    if (!_.isArray(paths)) {
      paths = [paths];
    }

    if (!_.isArray(events)) {
      events = [events];
    } else if (events.includes('all')) {
      events = ['all'];
    }

    opts = Object.assign({ depth: 0 }, opts);
    opts.cwd = this.absolutePath;

    //*
    console.log('SUB', {
      self: this,
      paths,
      pathsRes: paths.map(path => pathUtil.resolve(this.absolutePath, path)), 
      events, listener, opts,
    })
    //*/

    let watcher = chokidar.watch(
      paths.map(path => pathUtil.resolve(this.absolutePath, path)), 
      opts
    )

    const self = this;
    events.forEach(event => {
      if (event === 'all') {
        watcher.on(event, (event, path) => {
          console.log({event, path})
          listener(event, self.walk(path))
        })
      } else {
        watcher.on(event, (path) => {
          console.log({event, path})
          listener(event, self.walk(path))
        })
      }
    })

    return () => {
      // console.log('UNSUB (server)')
      if (watcher) {
        watcher.close()
        watcher = null;
      }
    }
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
    // console.log("write", this.relativePath, {path, data, opts})


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
