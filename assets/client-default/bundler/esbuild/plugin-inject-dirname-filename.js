const fsp = require('fs/promises')
const { dirname } = require('path')

module.exports.injectDirnameFilenamePlugin = {
  name: "inject-dirname-filename",
  setup(build) {
    build.onLoad(
      { filter: /.\.(js|jsx)$/, namespace: "file" },
      async (args) => {
        const prefix = `
var __filename = ${JSON.stringify(args.path)};          
var __dirname = ${JSON.stringify(dirname(args.path))};          
`;

        const source = await fsp.readFile(args.path, "utf8");

        return {
          contents: prefix + source,
          loader: args.path.split(".").pop()
        }
      }
    )
  }
}
