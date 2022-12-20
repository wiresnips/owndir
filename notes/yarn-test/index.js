
// alright, the goal here is to programmatically install 

const fsp = require('fs/promises')

const packLib = require('libnpmpack');
const yarn = require('@yarnpkg/core');
const { default: filePlugin } = require('@yarnpkg/plugin-file');
const { default: linkPlugin } = require('@yarnpkg/plugin-link');
const { default: nmPlugin } = require('@yarnpkg/plugin-nm');


(async function () {
  const libPath = "/home/ben/projects/owndir/notes/yarn-test/package-1";
  const tarPath = "/home/ben/projects/owndir/notes/yarn-test/package-1.tgz";

  await packLib(libPath).then(tarball => fsp.writeFile(tarPath, tarball));

  const pkgPath = "/home/ben/projects/owndir/notes/yarn-test/package-2";

  const config = await yarn.Configuration.create(pkgPath, pkgPath, [
     ["@yarnpkg/plugin-file", filePlugin],
     [`@yarnpkg/plugin-link`, linkPlugin],
     [`@yarnpkg/plugin-nm`, nmPlugin],
  ]); 

  config.values.set("nodeLinker", "node-modules");
  config.values.set("pnpMode", null);

  const project = await yarn.Project.find(config, pkgPath);
  const cache = await yarn.Cache.find(config);

  await project.project.install({cache, report: new yarn.ThrowReport()})
})()

