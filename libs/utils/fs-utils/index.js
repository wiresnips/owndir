const fs = require('fs')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { resolve, basename, extname } = require("path")


async function exists (path) {
  return fsp.access(path, fs.constants.R_OK).then(() => path).catch(() => null)
}

async function isFile (path) {
	return path && fsp.stat(path).then(dstat => dstat.isFile()).catch(err => false);
}

async function isDir (path) {
  return path && fsp.stat(path).then(dstat => dstat.isDirectory()).catch(err => false);
}

function mkdir (path) {
  return (fsp.stat(path)
    .then(dstat => dstat.isDirectory() || fsp.mkdir(path, {recursive: true}))
    .catch(() => fsp.mkdir(path, {recursive: true}))
  )
}

function dirChildren (path) {
	return (fsp.readdir(path)
		.then(relPaths => relPaths.map(relPath => resolve(path, relPath)))
		.catch(error => {
			// if the error was that the path was not a directory, or that it did not exist, return an empty array
			if (error.code === "ENOTDIR" || error.code === "ENOENT") {
				return [];
			}
			throw error;
		})
	);
}

async function getText (path, encoding) {
	if (!(await isFile(path))) {
		return null;
	}
	const handle = await fsp.open(path)
	const content = await handle.readFile(encoding || 'utf-8')
	handle.close()
	return content;
}


// this lib is a wrapper over libmagic, and has inherited some terrible names
const { Magic: MimeDetector, MAGIC_MIME: MIME_TYPE_ENCODING } = require('mmmagic')
const mime = new MimeDetector(MIME_TYPE_ENCODING)

function mimeType (path) {
  return new Promise((resolve, reject) => {
    mime.detectFile(path, (err, contentType) => {
      if (err) {
        return reject(err)
      }
      const [mimeType, charset] = contentType.split('; charset=')
      if (charset) {
        resolve({ mimeType, charset, contentType })
      } else {
				resolve({ contentType })
      }
    })
  })
}


module.exports = {
	exists,
	isFile,
	isDir,
	mkdir,
	dirChildren,
	getText,
	mimeType,
}