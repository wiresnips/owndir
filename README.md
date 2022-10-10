
I don't really know how to talk about what this is for.

I want an easy way to create simple programs - day-to-day living programs like financial trackers, shopping lists, notes or contacts - that foregrounds your control over your data. 

OwnDir is a framework that lets you give a directory a webserver. You can use it to serve a webpage that represents the contents of the directory. In a way, it's comparable to Electron - you can use webby-type tech to build a local UI. But, instead of bundling the browser, it just serves the page directly - you can use your existing browser to access it. 

(In theory, you could publish the page, but I'm imagining it running on 127.0.0.1, for strictly local consumption).

Because everything exists in the folder, if you SHARE the folder (ie, via dropbox) then you're effectively sharing the app. Whoever else has access needs to run the server themselves, but they can. And, if something is updated, the sync service will propagate the changes - the files themselves become the comms channel.

inspirations:
- https://www.gwern.net/docs/technology/2004-03-30-shirky-situatedsoftware.html
- https://cristobal.space/writing/folk
- https://tiddlywiki.com/
- https://obsidian.md/


remember that these exist:
- https://github.com/LiquidPlayer/LiquidCore
- https://syncthing.net/
