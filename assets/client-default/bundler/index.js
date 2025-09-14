// const webpack = require('./webpack/index.js');
// const parcel = require('./parcel'); // couldn't get this to build .jsx inside node_modules
const esbuild = require('./esbuild/index.js'); // couldn't get this to run in Android - always wants to shell out to an executable

module.exports = async function bundle(src, dst, originalPath) {

  console.log("bundle client", {src, dst, originalPath});

  try {
    // await webpack(src, dst, originalPath);
    await esbuild(src, dst, originalPath);
    console.log('bundle (client) succeeded');
  } catch (err) {
    console.log('bundle (client) failed');
    console.error(err);
     if (err.diagnostics && err.diagnostics.length > 0) {
       // console.error('Error diagnostics:', err.diagnostics[0].codeFrames);
      console.error('Error diagnostics:', JSON.stringify(err.diagnostics.map(d => d.codeFrames)));
     }

    return false;
  }
}