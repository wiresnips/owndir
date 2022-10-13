

const butts = "lol, butts"

// note: this is NOT exporting an object, even though it _really_ looks like it
// instead, it's the syntax for exporting a "list" of names, which means that I can NOT do this: export { foo: "foo" }
// why this was expressed with curly braces instead of [] is beyond me.
export { butts };