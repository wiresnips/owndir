
# FsNode
## Overview

An object representing a filepath. All paths are relative to the root OwnDir.

### Highlights:
- navigation: [path](#path-string), [name](#name-string), [walk](#walk-path--fsnode), [parent](#parent-fsnode), [root](#root-fsnode)
- filesystem operations: [info](#info-async-path--fsnodeinfo), [read](#read-async-path-start-end--readablestream), [write](#write-async-path-data-opts--fsnode), [move](#move-async-destpath-opts--fsnode), [delete](#delete-async-path--fsnode), [touch](#touch-async-path--fsnode), [makeDir](#makedir-async-path--fsnode) 
- file contents: [readAll](#readall-async-path-start-ebd--buffer), [text](#text-async-encoding--string)
- folder contents: [children](#children-async---fsnode), [files](#files-async---fsnode), [folders](#folders-async---fsnode)
- watching for changes: [sub](#sub-paths-events-listener-opts--unsubfn)

## Properties
### `absolutePath: string`
The absolute path of the FsNode. Note that (currently) this works differently in the client than the server, because the client doesn't know where the root OwnDir is in the filesystem. Therefore, in the server, this includes the path _to_ the root, but in the client that's foreshortened to `"/"`.
> This difference is stupid, so it may change. The trouble is in getting the information _to_ the client, in a way that's legible to custom clients (ie, user-provided versions of what's in `assets/client-default/module/index.jsx`, strictly theoretically). 
> Probably the way to do this is to include it in the build (server doesn't need it, but that's fine), as a property of the `OwnDir` constructor exported by `assets/owndir-prefix.js`.

### `module: OwnDir`
The OwnDir module. See [OwnDir modules](#owndir-module) to learn more.
  
### `name: string`tas
The last segment of `path`, ie if our FsNode is `/foo/bar/baz`, our `name` is `"baz"`. 

### `parent: FsNode`
This node's parent folder, as an FsNode.
Alias of `fsNode.walk('..')`

### `path: string`
The path to the FsNode relative to the root OwnDir. For the root, this is the empty string, `""`.
Alias of `relativePath`

### `relativePath: string`
The path to the FsNode relative to the root OwnDir. For the root, this is the empty string, `""`.
Alias of `path`

### `root: FsNode`
Shortcut to the top of the OwnDir directory structure.
Alias of `fsNode.walk('/')`

### `router: Router`
  Note: this is a server-only property.
  http://expressjs.com/en/4x/api.html#router


## Methods

### `children: async () => FsNode[]`
returns (async): 
- array of FsNodes, of the children (files and folders) of this folder. (errors for non-folders).

### `delete: async (path) => FsNode`
arguments: 
- `path` (optional): if given, behaves as `this.walk(path).delete();`

returns (async): 
- the FsNode that was deleted. (This is not as silly as it sounds, because an FsNode is a file _path_, not a file).

### `files: async () => FsNode[]`
returns (async): 
- array of FsNodes, of the files in this folder.

### `folders: async () => FsNode[]`
returns (async): 
- array of FsNodes, of the files in this folder.

### `info: async (path) => FsNodeInfo`
arguments: 
- `path` (optional): if given, behaves as `this.walk(path).info();`

returns (async): 
- ```typescript
  {
    isFile: boolean,
    isDirectory: boolean,
    isSymLink: boolean,
    size: number,  // for folders, zero
    mtime: number, // content modified time (epoch ms)
    ctime: number, // metedata modified time (epoch ms)
    mode: number,  // bitfield describing the read/write/execute permissions per the OS
    mime: string,  // if known, the relevant mime-type
  }
  ```
This is mostly derived from [fs stat](https://nodejs.org/api/fs.html#class-fsstats). 

### `makeDir: async (path) => FsNode`
arguments: 
- `path` (optional): if given, behaves as `this.walk(path).makeDir();`

returns (async):
- FsNode representing the newly created directory.

Automatically creates any missing directories, as the `mkdir --parents` command.

### `move: async (destPath, opts) => FsNode`
arguments: 
- `destPath`: Where to move to? As walk, accepts a relative or absolute path

returns (async):
- FsNode representing _this_ file or folder, but in it's new location

Tries to be contextually aware in combining "move" and "rename". If `destPath` already exists, and is a folder, the target is moved TO the folder without being renamed (ie, `this.name` is implicitly added as the last segment of destPath). This mimics the behaviour of the `mv` command.

Automatically creates any missing directories along destPath.


### `read: async (path, start, end) => ReadableStream`
arguments:
- `path` (optional): if given, behaves as `this.walk(path).read(start, end);`
- `start` (optional): Default `0`. Byte offset to start reading from, inclusive.
- `end` (optional): Default `Infinity`. Byte offset to read until, inclusive. 

returns (async):
- [ReadableStream](https://nodejs.org/api/webstreams.html#class-readablestream) of the file (within the specified range).

### `readAll: async (path) => Buffer`  
arguments:
- `path` (optional): if given, behaves as `this.walk(path).readAll();`

returns (async):
- [Buffer](https://nodejs.org/api/buffer.html) of the entire contents of the file.

### `sub: (paths, events, listener, opts) => unsubFn`
arguments:
- `paths` (optional): Defaults to `["."]`. List of paths (relative to this FsNode) to watch. Folders are watched recursively. 
- `events` (optional): Defaults to `["all"]`. Possible values include: `all`, `add`, `addDir`, `change`, `unlink`, `unlinkDir`, `ready`, `raw`, `error`. See [here](https://github.com/paulmillr/chokidar#methods--events) for details.
- `listener`: Listener function that's called with `listener(event, fsNode)` when something changes. 
- `opts` (optional): See [here](https://github.com/paulmillr/chokidar#persistence) for details on what can be configured.

returns:
- an unsub function that kills the listener.

This is a relatively thin wrapper over [chokidar](https://github.com/paulmillr/chokidar).

notes:
- client subs are _sort of_ self-cleaning - in the client, there's a poll loop (500ms interval), and in the server 10s without contact will trigger cleanup. (This allows a tab to be closed without permanently leaking a watcher).
- the `cwd` option is forced, and cannot be configured. This is part of the machinery by which the listener is called with an FsNode, instead of a path.

### `text: async (encoding) => string`
arguments:
- encoding (optional): Defaults to `"utf-8"`.

returns (async):
- the complete content of the file, as a string.

### `touch: async (path) => FsNode`
arguments:
- `path` (optional): if given, behaves as `this.walk(path).touch();`

returns (async):
- FsNode of the touched file.

As the `touch` command. If the file exists, updates `mtime` and `atime`. If not, creates the file.

### `walk: (path) => FsNode`
arguments:
- `path`: A relative or absolute path to traverse from here.

returns:
- FsNode representing the new path (relative to the starting point, if the given path was relative).

It is only possible to traverse to children of the root OwnDir folder. Attempting to leave will throw an "Out of Bounds" error.

### `write: async (path, data, opts) => FsNode`
arguments:
- `path` (optional): if given, behaves as `this.walk(path).write(data, opts);`
- `data`: Can be a string, a [Buffer](https://nodejs.org/api/buffer.html), or a [ReadableStream](https://nodejs.org/api/stream.html#class-streamreadable). Can also be `null` - in this case, the file is opened and then immediately closed.
- `opts` (optional): Defaults to `{flags: "w+", start: 0, encoding: "utf8"}`.

returns (async):
- this FsNode

## Methods (Dummied Out)
The "permissions" methods, `canRead`, `canReadAll`, `canWrite`, `canWriteAll` are wired in to the fs operations. However, the manner in which permissions are _specfied_ (and by implication, how they're _discovered_) needed to be reconsidered. 

Included for completeness, but out of order because they don't matter (yet).

> these are not async, but they definitely _should_ be

### `canRead: () => boolean`
returns: `true`
### `canReadAll: () => boolean`
returns: `true`
### `canWrite: () => boolean`
returns: `true`
### `canWriteAll: () => boolean`
returns: `true`
