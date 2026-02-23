
/*
interestingly, if this code is inline, static imports run first (even if they are placed below it)
which _kinda_ makes sense, but threw me for a loop

note: static vs dynamic imports caught me by surprise:
```
import "./foo.js"  // static import
import("./foo.js") // dynamic import
```

which has some surprising results:

// this will fail, because the static import will execute before the file that imports it
globalThis.foo = "foo";
import "./relies-on-global-foo.js"; 

// this will succeed, because the dynamic import respects execution flow
globalThis.foo = "foo";
import("./relies-on-global-foo.js"); 


HOWEVER, static imports still respect _each other's_ order, so you can avoid the syntactic boobytrap like this:

import "./define-global-foo.js"
import "./relies-on-global-foo.js"
*/

const _ = require('lodash')

export const tests = [];

export async function runTests (updateTestResults) {
  const updateFn = () => updateTestResults([...tests]);
  updateFn();

  for (const test of tests) {
    test.updateFn = updateFn;
    await runTest(test)
  }
}


// a touchstone so assertions know which test they are is
// this is VERY stupid, but it should be robust, 
// and I didn't expect to parallelize my tests anyways
var ACTIVE_TEST; 

async function runTest (test) {
  test.phase = "running";
  ACTIVE_TEST = test;
  try {
    await test.testFn()
              .catch(e => {
                console.error("uncaught exception", e);
                test.results.push({exception});
              });
  }
  catch (exception) {
    console.error("uncaught exception", e);
    test.results.push({exception});
  }
  finally {
    test.phase = "done"
    test.updateFn();
  }
}


globalThis.test = function (label, testFn) {

  const test = {
    label,
    testFn,
    phase: "waiting", // one of waiting, running, done
    results: [],
    get errors () {
      return this.results.filter(r => !r.pass);
    },
    addResult: function (...newResults) {
      this.results.push(...newResults);
      if (this.updateFn) {
        this.updateFn();
      }
    }
  }

  tests.push(test);
}

globalThis.is = (value, message) => {
  ACTIVE_TEST.addResult({
    pass: !!value,
    message,
    test: "is",
    values: [value]
  })
}

globalThis.isEq = (value1, value2, message) => {
  ACTIVE_TEST.addResult({
    pass: value1 == value2,
    message,
    test: "isEq",
    values: [value1, value2]
  })
}








// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.js
globalThis.inServer = (
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null
);

globalThis.inBrowser = !inServer;

