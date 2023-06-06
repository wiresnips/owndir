const { default: Parcel } = require('@parcel/core');
const {resolve} = require('path');




function preset_react_inside_node_modules(api, options) {
const presetReact = require('@babel/preset-react');
  return {
    visitor: {
      Program(path, state) {
        const filename = state.filename;

        console.log('wat', state.filename, /node_modules\/*.jsx$/.test(filename));

        if (/node_modules\/*.jsx$/.test(filename)) {
          const pluginOptions = { runtime: 'automatic' };
          const { visitor } = presetReact.default(api, pluginOptions);
          visitor.Program(path, state);
        }
      }
    }
  };
};


module.exports = async function bundle(src, dst, originalPath) {
  const options = {
    
    // this feels dodgy, but it's justified because index.js is a fact about THIS BUNDLER
    // ie, it came part-and-parcel with the server-default.
    // any custom bundler would have to do the same, so this knowledge is in-bounds
    // although it's also somewhat difficult to explain
    entries: resolve(src, 'index.js'), 

    defaultConfig: require.resolve('@parcel/config-default'),
    targets: {
      default: {
        distDir: dst,
      },
    },

    babel: {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
      plugins: [preset_react_inside_node_modules],
    },

    // mode: 'production',
    logLevel: 'verbose',
    sourceMaps: true,
  };

  return new Parcel(options).run();
};




