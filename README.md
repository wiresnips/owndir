# Why

Forgive me while I wax philosophic - I'm still figuring out how to explain what OwnDir is, so I'm starting with **why** it is.

There's something perverse in how so much of our modern ecosystem is built for _scale_ (real or aspirational). Every incentive bends away from user agency. Code is managed and distributed by sites and app stores - it updates itself without your permission, or it breaks itself out from under you. Data is aggregated and hoarded at every turn. Maybe it gets monetized, or maybe it just gets stolen. Apps that should have been websites, but they want the emails and phone numbers of everyone you've ever known. Websites that retain your data, trying to lock you in, to build up a big enough network effect that people can't not use them. This is classic "if you aren't the customer you're the product". It's not _for us_. It's shitty, and it doesn't have to be. 

That isn't to say that there's nothing of value - if anything, that's half the problem. Facebook can be really useful for keeping in touch with people - the fact that it stalks you across the internet, that it's embedded you in a global social graph, all of that's beside the point, for an individual. That crap only matter for Facebook. Google Maps is another great example of this: it's hugely useful for navigating even familiar spaces. But that's incidental - google maps doesn't exist to let you find your way around, it exists to let Google follow _everyone_. Navigation is the bait. 

That's the pattern that I want to disrupt. **We can have nice things**, and that we don't have to compromise with tech giants (or tech giant wannabes) who're looking for any way to manipulate us, or sell us out. The part of facebook that's actually good, isn't that complicated. Most things that people need are even simpler. If we make it easier to retain control of data, and clearer that control is retained, we can have software that works for us, that we _know_ works for us. As software gets smaller and _closer_, this only gets easier.

# What

In as pithy terms as possible, OwnDir is a web framework for single-user apps. It exists to run wee little home-grown web-apps, backed by a local folder.

Given a directory tree, OwnDir will load code from each directory, as an inheritance heirarchy.
- On the server side, these nodes inform a router - each folder can specify http request handlers.
- On the client side, the same nodes become JSX components, specifying how to display their respective folders.
- a simple filesystem api gives both access to the contents of the folder
- a basic plugin system means (eventually) you don't have to build everything from scratch.

Think of it like Electron, if it didn't bundle chrome. Everyone has a browser anyways, so why bother including it? Bridge the filesystem directly into it, run whatever system access you want out of the server.

Think of it like Wordpress, if it backed onto arbitrary plain-text files, instead of mysql. Mix-n-match flexibility, where you cobble together your own whatever-the-fuck, hopefully out of mostly off-the-shelf parts. 

# Trust, Sharing vs Publishing

As an extension of naked files, OwnDir sees a world with a single all-powerful user. There aren't accounts or controls - you could build them, if you wanted, but at the end of the day it would all be files on your harddrive anyways. Nothing could stop you from editting them directly.

Because OwnDir interprets code _from the directory_, it's directly embedded in the same space as the files it's representing. If you shared the folder, you would also be sharing the OwnDir. Put that baby in a network drive, share it with Syncthing, store it in source control, hell put it in Dropbox. Then the folder becomes a shared space, where anyone with access can collaborate and interact.

It should be noticed that this is not _safe_. You could never run a normal message-board like this - everyone has full write access to everything, and bad actors could spam dickbutts, or delete everything, or rewrite history to make other participants have said whatever. Safety is not a _requirement_, though, unless you're trying to operate on the open internet. Trust only becomes a problem at larger scales. If you have a little dry-erase board on your fridge door, it has all the same problems/features.

(It should be stated that, OwnDir still provides mechanisms to build out a regular server, so you could theoretically run an outward-facing message board using it. A more traditional framework would almost certainly be a better choice for that purpose. OwnDir is working hard to narrow gap between the client and the filesystem, and that's really not something that you want to do, in a public-facing context).

# Docs

> This might have stabilized enough that I can actually start writing these, huh?

## Directory Module
- `.O`
  - `directory`
  - `middleware` / `routes`

## FsNode

## Plugins

## Build Process

## CSR vs SSR, React vs xxxx


# Inspirations (an incomplete list)
- https://tiddlywiki.com/
- https://obsidian.md/
- https://cristobal.space/writing/folk
- https://www.gwern.net/docs/technology/2004-03-30-shirky-situatedsoftware.html

