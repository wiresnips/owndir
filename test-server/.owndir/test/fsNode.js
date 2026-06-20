
const _ = require('lodash')
const { resolve } = require('path');
const { DateTime } = require('luxon');

const status = {
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  timeout: 408,
  conflict: 409,
  serverError: 500
}

export function Tests (fsNodeRoot) {
  const fxt = fsNodeRoot.walk("fixtures")

  // walk is so fundamental that it's basically impossible to test properly orthogonally
  // but, it's still good to validate the assumptions of the behaviour with code
  test("fsNode path navigation", async () => {
    isEq({name: "",
          absolutePath: "/",
          relativePath: "",
          path: ""},
         fsNodeRoot,
         "fsNodeRoot (in the client) is absolutely '/' and relatively '', with no name")

    isEq(fsNodeRoot, fsNodeRoot.root, 
         "fsNodeRoot's root is itself")

    isEq(fsNodeRoot, fsNodeRoot.parent, 
         "fsNodeRoot's parent is itself")

    isEq(fsNodeRoot, fsNodeRoot.walk(".."), 
         "stepping backwards from the root leaves you at the root")

    const nestedDir = fsNodeRoot.walk("a/b/c");
    isEq({name: "c",
          absolutePath: "/a/b/c",
          relativePath: "a/b/c", // the difference between absolute and relative paths doesn't mean much, in the client
          path: "a/b/c"          // path is an alias of relativePath
         },
         nestedDir,
         "fsNode.walk traverses a filepath, even if that path does not actually exist")

    isEq(fsNodeRoot, nestedDir.root,
         "fsNode.root brings you back to the root")

    isEq("/a/b", nestedDir.parent.absolutePath,
         "fsNode.parent works like you expect")

    isEq(nestedDir.parent, nestedDir.walk(".."),
         "you can also reach the parent by stepping backwards")

    isEq("/a/b/c/d", nestedDir.walk("d").absolutePath,
         "stepping forwards relatively works")

    isEq("/d", nestedDir.walk("/d").absolutePath,
         "if you walk an absolute path from anywhere, you start at the root")

    isEq("/.owndir", fsNodeRoot.walk(".owndir").absolutePath,
         "you can walk into a .owndir")

  })




  test("fsNode.children", async () => {
    const dir = fxt.walk("fsNode.children")
    isEq([], await dir.children(),
         "/fsNode.children is initially empty");

    const newDir = await dir.makeDir("new-folder");
    isEq({name: "new-folder",
          path: "fixtures/fsNode.children/new-folder",
          relativePath: "fixtures/fsNode.children/new-folder",
          absolutePath: "/fixtures/fsNode.children/new-folder"}, 
         newDir,
         "makeDir returns the new folder's fsNode")

    isEq([newDir], await dir.children(),
         "/fsNode.children is no longer empty");

    const newFile = await dir.touch("foo");
    isEq({name: "foo",
          path: "fixtures/fsNode.children/foo",
          relativePath: "fixtures/fsNode.children/foo",
          absolutePath: "/fixtures/fsNode.children/foo"}, 
         newFile,
         "touch returns the new file's fsNode")    

    isEq([newFile, newDir], await dir.children(),
         "/fsNode.children shows the new file's fsNode");

    try {
      const newFileChildren = await newFile.children();
      is(false, "calling `children` on an fsNode of a file throws an exception")
    } catch (exception) {
      isEq(
        {error: "fixtures/fsNode.children/foo is not a directory",
         status: status.notFound,
         success: false}, 
        exception,
        "calling `children` on an fsNode of a file throws an exception")
    }

    const nonexistent = dir.walk("nonexistent");
    isEq(
      {name: "nonexistent",
       path: "fixtures/fsNode.children/nonexistent",
       relativePath: "fixtures/fsNode.children/nonexistent",
       absolutePath: "/fixtures/fsNode.children/nonexistent"}, 
      nonexistent,
     "we can still walk to nonexistent fsNodes")

    try {
      const nonexistentChildren = await nonexistent.children();
      is(false, "calling `children` on an fsNode that doesn't exist throws an exception")
    } catch (exception) {
      isEq(
        {error: "fixtures/fsNode.children/nonexistent is not a directory",
         status: status.notFound,
         success: false}, 
        exception,
        "calling `children` on an fsNode that doesn't exist throws an exception")
    }

    const codeDir = fsNodeRoot.walk(".owndir");
    is(await codeDir.children().then(() => true).catch(() => false),
       "you can look into write-protected directories")
  })




  test("fsNode.info", async () => {
    const dir = fxt.walk("fsNode.info")
    const dirInfo = await dir.info();

    isEq(
      {isDirectory: true,
       isFile: false,
       mime: null,
       size: 0}, 
      _.pick(dirInfo, ["isDirectory", "isFile", "mime", "size"]),
      "fsNode.info works on a directory"
    )


    const fileOne = dir.walk("1.txt")
    const fileOneInfo = await fileOne.info();
    isEq(
      {isDirectory: false,
       isFile: true,
       mime: "text/plain",
       size: 3}, 
      _.pick(fileOneInfo, ["isDirectory", "isFile", "mime", "size"]),
      "fsNode.info works on a file"
    )

    isEq(
      null, 
      await dir.walk("nonexistent").info(),
      "fsNode.info returns null on nonexistent paths"
    )
  })




  test("fsNode.makeDir", async () => {
    const dir = fxt.walk("fsNode.makeDir")

    isEq([], await dir.children(),
         "sanity check: /fsNode.makeDir is initially empty");

    const dir1 = await dir.walk("dir1").makeDir();
    isEq({name: "dir1",
          path: "fixtures/fsNode.makeDir/dir1",
          relativePath: "fixtures/fsNode.makeDir/dir1",
          absolutePath: "/fixtures/fsNode.makeDir/dir1",}, 
         dir1,
         "you can walk to a non-existent fsNode and then call makeDir on it to generate it.")

    isEq([dir1], await dir.children(),
         "dir1 was added.");

    const dir2 = await dir.makeDir("dir2");
    isEq({name: "dir2",
          path: "fixtures/fsNode.makeDir/dir2",
          relativePath: "fixtures/fsNode.makeDir/dir2",
          absolutePath: "/fixtures/fsNode.makeDir/dir2",}, 
         dir2,
         "you can also pass the path as an arg to makeDir, that works too")

    isEq([dir1, dir2], await dir.children(),
         "dir2 was added.");

    const dirC = await dir.makeDir("A/B/C");
    isEq({name: "C",
          path: "fixtures/fsNode.makeDir/A/B/C",
          relativePath: "fixtures/fsNode.makeDir/A/B/C",
          absolutePath: "/fixtures/fsNode.makeDir/A/B/C",}, 
         dirC,
         "you can take multiple steps at once, and intervening layers will also be created as directories")

    const dirA = dir.walk("A");
    isEq([dirA, dir1, dir2], await dir.children(),
         "dirA shows up in children.");


    const dirA2 = await dirA.makeDir();
    isEq(dirA, dirA2, 
         "if you re-make a directory that already exists, that's fine");

    const file1 = await dir.touch("file1");
    const file1Info = await file1.info();
    is(file1Info.isFile, "sanity check: we made a file, and it IS a file")

    try {
      const file1MkDir = await file1.makeDir('A/B/C');
      is(false, "cannot makeDir if one of the steps along the way is a file")
    } catch (exception) {
      isEq(
        {success: false,
         status: status.serverError,
         error: "unable to mkDir fixtures/fsNode.makeDir/file1/A/B/C"},
        exception,
        "cannot makeDir if one of the steps along the way is a file")
    }

    try {
      const illegalDir = await dir.makeDir(".owndir");
      is(false, "cannot makeDir if the target is .owndir")
    } catch (exception) {
      isEq(
        {success: false,
         status: status.forbidden,
         error: "fixtures/fsNode.makeDir/.owndir cannot be written"},
        exception,
        "cannot makeDir if the target is .owndir")
    }
  })




  test("fsNode.touch", async () => {
    const dir = fxt.walk("fsNode.touch")
    const file = dir.walk("1.txt")
    const folder = dir.walk("folder")

    // reminder: 
    // atime = access time (not actually passed through)
    // mtime = modified time (data, ie contents)
    // ctime = change time (data, but ALSO metadata, ie permissions)
    // see: https://www.geeksforgeeks.org/linux-unix/file-timestamps-mtime-ctime-and-atime-in-linux/

    // what happens when we touch a file?
    let info1 = await file.info();
    is(info1.ctime, "baseline: test file has a ctime")
    isEq(info1.ctime, info1.mtime, "baseline: test file's ctime and mtime are the same");

    isEq(file, await file.touch(), "touching a file returns the fsNode object again");
    let info2 = await file.info();

    is(info2.ctime > info1.ctime, "the file's ctime has advanced")
    is(info2.mtime > info1.mtime, "the file's mtime has advanced")

    // what happens when we touch a folder?
    info1 = await folder.info();
    is(info1.ctime, "baseline: test file has a ctime")
    isEq(info1.ctime, info1.mtime, "baseline: test file's ctime and mtime are the same");

    isEq(folder, await folder.touch(), "touching a folder returns the fsNode object again");
    info2 = await folder.info();

    is(info2.ctime > info1.ctime, "the folder's ctime has advanced")
    is(info2.mtime > info1.mtime, "the folder's mtime has advanced")
    
    // what happens when we touch a path that does exist?
    isEq([], await folder.children(), 
         "baseline: folder is empty")

    const newFile = await folder.touch("new-file");
    isEq({name: "new-file",
          path: "fixtures/fsNode.touch/folder/new-file",
          relativePath: "fixtures/fsNode.touch/folder/new-file",
          absolutePath: "/fixtures/fsNode.touch/folder/new-file"}, 
         newFile,
         "a new fsNode object appears");

    isEq([newFile], await folder.children(),
         "folder now contains the new file");

    const newFileInfo = await newFile.info();
    isEq(
      {isDirectory: false,
       isFile: true,
       mime: null,
       size: 0}, 
      _.pick(newFileInfo, ["isDirectory", "isFile", "mime", "size"]),
      "the new file is in fact a FILE, and is empty"
    )

    // what happens when we touch a path whose parent does not exist?
    try {
      const deepFile = await folder.touch("A/B/C/new-file");
      is(false, "cannot call `touch` on an fsNode cannot be created (ie because some parent does not exist)")
    } catch (exception) {
      isEq(
        {success: false,
         status: status.serverError,
         error: "unable to touch fixtures/fsNode.touch/folder/A/B/C/new-file"},
        exception,
        "cannot call `touch` on an fsNode cannot be created (ie because some parent does not exist)")
    }
    
    // what happens when we touch a path that CANNOT exist?
    try {
      const impossibleFile = await file.touch("impossible-file");
      is(false, "cannot call `touch` on an fsNode cannot be created (ie because some parent is not a directory)")
    } catch (exception) {
      isEq(
        {success: false,
         status: status.serverError,
         error: "unable to touch fixtures/fsNode.touch/1.txt/impossible-file"},
        exception,
        "cannot call `touch` on an fsNode cannot be created (ie because some parent is not a directory)")
    }

    // what happens when we touch a path that's disallowed?
    try {
      const unwritableFile = await dir.root.touch(".owndir/");
      is(false, "cannot call `touch` on an fsNode cannot be created (ie because it's in a write-protected directory)")
    } catch (exception) {
      isEq(
        {success: false,
         status: status.forbidden,
         error: ".owndir cannot be written"},
        exception,
        "cannot call `touch` on an fsNode cannot be created (ie because it's in a write-protected directory)")
    }
  })




  test("fsNode.delete", async () => {
    const dir = fxt.walk("fsNode.delete");

    const file1 = dir.walk("file-1");
    is(await file1.info(), 
       "baseline: file1 exists")
    isEq(file1, await file1.delete(),
         "deleting the file returns the fsNode")
    isEq(null, await file1.info(), 
         "after delete: file1 doesn't exist")

    const fileThatDoesntExist = dir.walk("file-that-doesn't-exist");
    isEq(null, await fileThatDoesntExist.info(), 
         "baseline: file2 does NOT exist")
    isEq(fileThatDoesntExist, await fileThatDoesntExist.delete(),
         "deleting the 'file' still returns the fsNode")
    isEq(null, await fileThatDoesntExist.info(), 
         "after delete: the file that didn't exist before still doesn't exist")

    const folder1 = dir.walk("folder-1");
    const file2 = folder1.walk("file-2");
    is(await folder1.info(), 
       "baseline: folder1 exists");
    is(await file2.info(), 
       "baseline: file2 exists");

    await folder1.delete();
    isEq(null, await folder1.info(), 
         "after delete: folder doesn't exist");
    isEq(null, await file2.info(), 
         "after delete: file2 doesn't exist");

    // delete a path that is not allowed
    // because folder-2 contains a .owndir folder, it should NOT be allowed to be deleted
    // HOWEVER, we have not yet sorted out any kind of sane model for permissioning, so this will stay off for now
    /*
    const folder2 = dir.walk("folder-2")
    is(await folder2.info(), 
       "baseline: folder-2 exists");
    try {
      await folder2.delete();
      is(false, "cannot call `delete` on a folder that contains write-protected files/folders")
    } catch (exception) {
      isEq(
        {success: false,
         status: status.forbidden,
         error: "something at fsNode.delete/folder-2 cannot be deleted (write disallowed)"},
        exception,
        "cannot call `delete` on a folder that contains write-protected files/folders")
    }
    //*/
  })




  test("fsNode.move", async () => {
    // move a file
    // move a folder
    // move a non-existent path
  })




  test("fsNode.read + readAll", async () => {
    // read a path that does not exist
    // read a folder
    // read a whole text file
    // read the first x bytes of a text file
    // read the second x bytes of a text file
    // read beyond the end of a text file
    
    // encodings:
    // run the above tests against differently encoded files, with the RIGHT encoding
    // run the above tests against, but specify the WRONG encoding - what happens?
  })


  test("fsNode.write", async () => {

  })

  test("fsNode.sub", async () => {

    // ooof, not looking forwards to this one

  })


}


