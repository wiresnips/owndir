const fsp = require('fs/promises')
const { dirname } = require('path')

function mkdir (path) {
  return (fsp.stat(path)
    .then(dstat => dstat.isDirectory() || fsp.mkdir(path, {recursive: true}))
    .catch((err) => {
      // console.log('wtf', err)
      return fsp.mkdir(path, {recursive: true})
    })
  )
}

// this plugin is incredibly dumb and opinionated
// do not expect it to play nicely outside the very narrow context that I wrote it for
// I don't know what I'm doing, and if you copy this code, it's not on me

function injectStyleTagCode (styleStr) {
  return `
const esbuild_style_dom = document.createElement("style");        
esbuild_style_dom.textContent = ${JSON.stringify(styleStr)};
document.head.append(esbuild_style_dom);`
}


module.exports.styleLoaderPlugin = {
  name: "style-loader",
  setup(build) {
    const targetPath = build.initialOptions.outfile;
    build.initialOptions.write = false;

    build.onEnd(async (result) => {
      if (!result.outputFiles) {
        console.error("plugin-style-loader: no output files found. (hint: requires `write: false`)");
        return;
      }

      console.log({build, result, outputFile: result.outputFiles });

      const cssFiles = result.outputFiles?.filter(f => f.path.endsWith(".css")) || [];
      const cssStr = cssFiles.map(f => f.text).join("\n\n\n")


      for (const outFile of result.outputFiles || []) {
        await mkdir(dirname(outFile.path));
        await fsp.writeFile(outFile.path, outFile.contents);

        if (outFile.path == targetPath) {
          await fsp.appendFile(targetPath, injectStyleTagCode(cssStr));
        }
      }

    })
  }
}

