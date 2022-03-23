var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// dir1/f1.js
var require_f1 = __commonJS({
  "dir1/f1.js"(exports2, module2) {
    var __fileloc2 = {
      filename: "/home/ben/projects/central/scratch/dir1/f1.js",
      dirname: "/home/ben/projects/central/scratch/dir1",
      relativefilename: "dir1/f1.js",
      relativedirname: "dir1"
    };
    module2.exports = function() {
      return __fileloc2.dirname;
    };
  }
});

// test.js
var __fileloc = {
  filename: "/home/ben/projects/central/scratch/test.js",
  dirname: "/home/ben/projects/central/scratch",
  relativefilename: "test.js",
  relativedirname: ""
};
var f = require_f1();
console.log({
  dir: __fileloc.dirname,
  fdir: f()
});
