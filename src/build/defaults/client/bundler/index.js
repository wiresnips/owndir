const fsp = require('fs/promises')
const { resolve } = require('path')
const esbuild = require('./esbuild/index.js');

module.exports = async function bundle(src, dst) {
  console.log("bundle client", {src, dst});

  try {
    await esbuild(src, dst);

    const staticDist = resolve(src, "..", "static", "dist.js");
    await fsp.cp(dst, staticDist);
    
    console.log('bundle (client) succeeded');
    return true;
  } catch (err) {
    console.log('bundle (client) failed');
    console.error(err);
     if (err.diagnostics && err.diagnostics.length > 0) {
      console.error('Error diagnostics:', JSON.stringify(err.diagnostics.map(d => d.codeFrames)));
     }
    return true;
  }
}