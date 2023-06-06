const fsp = require('fs/promises');
const { resolve, basename, dirname, relative } = require('path');

const webpack = require('webpack');
const ConstDependency = webpack.dependencies.ConstDependency;
const NullFactory = require('webpack/lib/NullFactory');


// I have only the loosest idea what this shit is, because I got it from ChatGPT.
// I have no interest in learning the ins and outs of writing webpack plugins at two in the goddamned morning.
class __GlobalsPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('__GlobalsPlugin', (compilation, { normalModuleFactory }) => {
      compilation.dependencyFactories.set(ConstDependency, new NullFactory());
      compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());

      normalModuleFactory.hooks.parser
        .for('javascript/auto')
        .tap('__GlobalsPlugin', (parser) => {

          parser.hooks.expression.for('__filename').tap('__GlobalsPlugin', (expr) => {
            const injectedCode = new ConstDependency(JSON.stringify(parser.state.current.resource), expr.range);
            injectedCode.loc = expr.loc;
            parser.state.current.addDependency(injectedCode);
            return true;
          });

          parser.hooks.expression.for('__dirname').tap('__GlobalsPlugin', (expr) => {
            const injectedCode = new ConstDependency(JSON.stringify(dirname(parser.state.current.resource)), expr.range);
            injectedCode.loc = expr.loc;
            parser.state.current.addDependency(injectedCode);
            return true;
          });

        });
    });
  }
}






module.exports = async function bundle(src, dst, originalPath) {

  // Create the Webpack configuration
  const config = {
    mode: 'development',
    target: 'node',
    context: src,
    entry: resolve(src, 'index.js'),
    output: {
      path: dirname(dst),
      filename: basename(dst),
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          // exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cwd: __dirname
            },
          },
        },
      ],
    },

    plugins: [
      new __GlobalsPlugin(),
    ],

    // look for babel-loader in server/bundler, not server/module
    resolveLoader: {
      modules: [
        resolve(__dirname, "node_modules")
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    //*/
    // externals: [externalizeBinaries],
    stats: {
      errorDetails: true,
    },
  };

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log('build (server) failed', {err, stats});
        console.log(stats.hasErrors())
        console.error(stats.toString('errors-only'));
        console.error(err);
        reject(false);
      } else {
        console.log('build (server) succeeded', stats.toString());
        stats.compilation.errors.forEach((error) => console.error(error));
        stats.compilation.warnings.forEach((warning) => console.warn(warning));
        resolve(true);
      }
    });
  });
};

async function isFile(path) {
  return path && fsp.stat(path).then((dstat) => dstat.isFile()).catch((err) => false);
}

// decide whether or not a binary addon is being loaded - if so, externalize it with an absolute path
const externalizeBinaries = function (context, request, callback) {
  if (/\.node$/.test(request)) {
    return callback(null, 'commonjs ' + request);
  }
  callback();
};
