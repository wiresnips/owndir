const esbuild = require('./esbuild/index.js');

module.exports = async function bundle(src, dst) {
  console.log("bundle client", {src, dst});

  try {
    await esbuild(src, dst);
    console.log('bundle (client) succeeded');
  } catch (err) {
    console.log('bundle (client) failed');
    console.error(err);
     if (err.diagnostics && err.diagnostics.length > 0) {
      console.error('Error diagnostics:', JSON.stringify(err.diagnostics.map(d => d.codeFrames)));
     }

    return false;
  }
}