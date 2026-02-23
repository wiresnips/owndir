

const { execSync } = require("child_process");
const { resolve } = require('path');
const { DateTime } = require('luxon');


test("basic file access", () => {

  is(true, "test framework proof-of-life")
})

/*
if (inServer) {
  // step 1: establish a test directory for this run

  // okay, so this maps into the build directory, which makes perfect sense
  console.log( execSync("pwd", { cwd: __dirname }).toString() );

  // so, how am I going to get my hands on _my_ path, without going through the fsNode?
  // this is getting called in the middle of owndir-prefix, which is kinda neat ... but things where were once easy, now are hard

  // BUT, and this is the issue overall, modules are inert
  // so if I want to run code directly, this is where I need to be

  // I think my "simplification" plan is spiked, then - okay, let's try and do something a _little_ complicated, but not _too_ complicated

  // I guess that means, 

console.log({this: this, args: process.argv })

}



function initFsNodeTestDir (path) {
  const initialStatePath = resolve(path, "initial-state");
  const timestamp = DateTime.now().toFormat('yyyy-MM-dd.HHmm');
  const testDir = resolve(path, `test-${timestamp}`);
  
  console.log("initializing test dir", testDir);
  const res = execSync(`cp ${initialStatePath} ${testDir}`);
  console.log(res.toString());

  return testDir;
}

*/