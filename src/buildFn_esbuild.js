const fsp = require('fs/promises')
const pathUtil = require("path")
const _ = require('lodash')
const esbuild = require('esbuild')




// I don't feel like this is unfolded correctly, but I don't know yet what's right
// and I *really* need to move in *some* direction


// consider: https://nodejs.org/api/modules.html#modules_all_together
// is there some way that I can offload this bullshit to `require.resolve` ?

function getJsBuildTarget (path) {
  path = pathUtil.resolve(path)

  const lastStep = _.last(path.split(pathUtil.sep))
  if (!lastStep.startsWith('.central'))
    path = pathUtil.resolve(path, '.central')

  const realFilePath = (_path) => fsp.stat(_path).then(stat => stat.isFile() && _path).catch(err => null)

  return Promise.all([
    // feel free to stack up entrypoints here by priority
    realFilePath(pathUtil.resolve(path, 'package.json')).then(package => {
      if (!package) { return null };
      const { main } = require(package)
      if (!_.isString(main) || !main.match(/\.jsx?$/)) { return null };
      return pathUtil.resolve(path, main);
    }),
    realFilePath(pathUtil.resolve(path, 'index.js')),
    realFilePath(pathUtil.resolve(path, 'index.jsx')),
    realFilePath(path + '.js'),
    realFilePath(path + '.jsx'),
  ]).then(candidates => candidates.find(_.identity))
}




module.exports = async function build (src, dst) {
    // console.log('esbuild starting', src)

    const buildTarget = await getJsBuildTarget(src)
    if (!buildTarget) {
        return false
    }

    // see: https://esbuild.github.io/api/#build-api

    return esbuild.build({
        platform: 'node', // 'neutral' ? see: https://esbuild.github.io/api/#platform
        entryPoints: [buildTarget],
        outfile: pathUtil.resolve(dst, 'central.js'),
        bundle: true,
        minify: false,
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


