
// const webpack = require('./webpack');
const esbuild = require('./esbuild'); 

module.exports = async function bundle(src, dst, originalPath) {

  console.log("bundle server", {src, dst, originalPath});

  try {
    // await webpack(src, dst, originalPath);
    await esbuild(src, dst, originalPath);
    console.log('bundle (server) succeeded');
  } catch (err) {
    console.log('bundle (server) failed');
    console.error(err);
     if (err.diagnostics && err.diagnostics.length > 0) {
       // console.error('Error diagnostics:', err.diagnostics[0].codeFrames);
      console.error('Error diagnostics:', JSON.stringify(err.diagnostics.map(d => d.codeFrames)));
     }

    return false;
  }
}