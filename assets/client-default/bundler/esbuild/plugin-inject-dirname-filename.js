const fsp = require('fs/promises')
const { dirname } = require('path')

const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const core = require("@babel/core")

module.exports.injectDirnameFilenamePlugin = {
  name: "inject-dirname-filename",
  setup(build) {
    build.onLoad(
      { filter: /.\.(js|jsx)$/, namespace: "file" },
      async (args) => {
        const sourcePath = args.path;
        const source = await fsp.readFile(args.path, "utf8");

        // if there's nothing to do here, we should just leave
        if (!source.includes("__dirname") && !source.includes("__filename")) {
          return undefined;
        }

        const ast = parser.parse(source, {
          sourceType: 'module',
          plugins: ['jsx']
        });

        traverse(ast, {
          Identifier(path) {
            const name = path.node.name;
            if (!(name == "__filename" || name == '__dirname')) { return; }

            // really don't love how I'm playing pokemon here
            // if I've missed a condition (very possible), that bug will be nearly unfindable
            const isBound = path.scope.hasBinding(name);
            if (isBound) { return; }

            const isMember = path.parent.type == "MemberExpression";
            if (isMember) { return; }

            if (name == "__filename") {
              path.replaceWith(core.types.stringLiteral(sourcePath))
            }
            else if (name == '__dirname') {
              path.replaceWith(core.types.stringLiteral(dirname(sourcePath)))
            }
          }


        });

        const { code } = core.transformFromAst(ast)
        return {
          contents: code,
          loader: args.path.split(".").pop()
        }

      }
    )
  }
}
