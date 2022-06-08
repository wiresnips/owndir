console.log("");

var c_0;
try {
  c_0 = require("central_0")
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', "central_0")
    console.error(error)
  }
  c_0 = {}
}

if (!c_0['.central']) {
  c_0['.central'] = {children: {}}
}
else if (!c_0['.central'].children) {
  c_0['.central'].children = {}
}

c_0['.central'].root = c_0;

console.log("calendar");

const c_1 = {'.central': {children: {}}};

c_1['.central'].parent = c_0;
c_0['.central'].children["calendar"] = c_1;
Object.setPrototypeOf(c_1, c_0); 
c_1['.central'].parent = c_0;

c_1['.central'].root = c_0;

console.log("calendar/2021");

var c_2;
try {
  c_2 = require("/home/ben/projects/central/example/calendar/2021/.central.js")
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', "/home/ben/projects/central/example/calendar/2021/.central.js")
    console.error(error)
  }
  c_2 = {}
}

if (!c_2['.central']) {
  c_2['.central'] = {children: {}}
}
else if (!c_2['.central'].children) {
  c_2['.central'].children = {}
}

c_2['.central'].parent = c_1;
c_1['.central'].children["2021"] = c_2;
Object.setPrototypeOf(c_2, c_1); 
c_2['.central'].parent = c_1;

c_2['.central'].root = c_0;

console.log("contacts");

const c_3 = {'.central': {children: {}}};

c_3['.central'].parent = c_0;
c_0['.central'].children["contacts"] = c_3;
Object.setPrototypeOf(c_3, c_0); 
c_3['.central'].parent = c_0;

c_3['.central'].root = c_0;

console.log("finance");

var c_4;
try {
  c_4 = require("/home/ben/projects/central/example/finance/.central/index.js")
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', "/home/ben/projects/central/example/finance/.central/index.js")
    console.error(error)
  }
  c_4 = {}
}

if (!c_4['.central']) {
  c_4['.central'] = {children: {}}
}
else if (!c_4['.central'].children) {
  c_4['.central'].children = {}
}

c_4['.central'].parent = c_0;
c_0['.central'].children["finance"] = c_4;
Object.setPrototypeOf(c_4, c_0); 
c_4['.central'].parent = c_0;

c_4['.central'].root = c_0;

console.log("markdown");

var c_5;
try {
  c_5 = require("markdown_central_1")
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', "markdown_central_1")
    console.error(error)
  }
  c_5 = {}
}

if (!c_5['.central']) {
  c_5['.central'] = {children: {}}
}
else if (!c_5['.central'].children) {
  c_5['.central'].children = {}
}

c_5['.central'].parent = c_0;
c_0['.central'].children["markdown"] = c_5;
Object.setPrototypeOf(c_5, c_0); 
c_5['.central'].parent = c_0;

c_5['.central'].root = c_0;

module.exports = c_0;