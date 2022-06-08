const fsp = require('fs/promises')
const pathUtil = require("path")
const _ = require('lodash')
const esbuild = require('esbuild')
const { filelocPlugin } = require('esbuild-plugin-fileloc')

// I still feel like this doesn't *quite* belong, but it's a definite improvement

async function getPackageMain (path) {
    const packagePath = pathUtil.resolve(path, 'package.json');
    try {
        const { main } = require(packagePath)

        if (!_.isString(main) || 
            !main.match(/\.jsx?$/)) 
        { 
            return null 
        };

        return pathUtil.resolve(path, main)

    } catch (err) {
        return null
    }
}


async function getEntryPoint (path) {
    return (
        await getPackageMain(path) ||
        await pathIfFileExists(pathUtil.resolve(path, 'index.js')) ||
        await pathIfFileExists(pathUtil.resolve(path, 'index.jsx')) ||
        ((/.*\.jsx?/).test(path) ? path : null)
    )
}

function pathIfFileExists (path) {
  return (fsp.stat(path)
    .then(fstat => fstat.isFile() ? path : false)
    .catch(() => false)
  )
}




async function build (src, dst) {
    // console.log('esbuild starting', src)

    const entryPoint = await getEntryPoint(src)
    if (!entryPoint) {
        return null;
    }

    // if we're building a directory, that's our root dir
    // if we're building a file (ie, .central.js), use the folder itself, I guess
    const rootDir = (await pathIfFileExists(src)) ? src : pathUtil.dirname(src)


    // see: https://esbuild.github.io/api/#build-api

    return esbuild.build({
        platform: 'node', // 'neutral' ? see: https://esbuild.github.io/api/#platform
        entryPoints: [entryPoint],
        outfile: dst,
        bundle: true,
        minify: false,
        plugins: [filelocPlugin({ rootDir })],

        // write: false, // oh hey, I actually could have done away with the filesystem after all

        // logLevel: 'info',

    }).then(result => {
        // console.log(result);
        return true;
    }).catch(err => {
        console.error(err);
        return false;
    })
}


module.exports = {
    build, 
    packages
}



