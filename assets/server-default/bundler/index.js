
const webpack = require('./webpack');
// const parcel = require('./parcel'); // couldn't get this to build .jsx inside node_modules
// const esbuild = require('./esbuild'); // couldn't get this to run in Android - always wants to shell out to an executable

module.exports = async function bundle(src, dst, originalPath) {

  console.log("bundle server", {src, dst, originalPath});

  try {
    await webpack(src, dst, originalPath);
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