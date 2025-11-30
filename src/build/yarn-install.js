
const fsp = require('fs/promises')
const { resolve } = require('path')

const yarn = require('@yarnpkg/core');
const { getPluginConfiguration } = require('@yarnpkg/cli');
const { npath } = require('@yarnpkg/fslib');
const { dedupeUtils } = require("@yarnpkg/plugin-essentials")


module.exports = async function (target, globalFolder) {
  console.log('yarn-install', target)
  const t1 = (new Date()).getTime()

  await fsp.open(resolve(target, 'yarn.lock'), 'a').then(h => h.close());

  const config = await yarn.Configuration.find(
    npath.toPortablePath(target), 
    getPluginConfiguration()
  ); 

  config.values.set("nodeLinker", "node-modules");
  config.values.set("globalFolder", globalFolder || resolve(target, ".yarn"));
  // config.values.set("enableScripts", false); // this doe snot appear to be respected by the node-modules linker
  // config.values.set("pnpMode", null);

  const { project } = await yarn.Project.find(config, target);
  const cache = await yarn.Cache.find(config);
  const report = new yarn.ThrowReport();

  // mode: 'skip-build' prevents hooks like postinstall from running, which is kinda important these days
  // TODO: expose this as a toggle somehow
  const mode = 'skip-build';

  await project.install({cache, report, mode});

  // await dedupeUtils.dedupe(project, {strategy: "highest", patterns: [], cache, report})

  const t2 = (new Date()).getTime();
  console.log(`    install took ${t2-t1} ms`);
}