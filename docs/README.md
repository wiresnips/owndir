Okay, what the fuck do I want to put in here?

Okay, let's start with _goals_. I want an educational document that solves a couple of different problems for different people.

They do cascade into each other, though. And I can cut out almost _all_ of the philosophizing, and just let the bloody product speak for itself. Won't that be nice?

## What is OwnDir (ie, for non-programmers)
- This is a way to have _personal_ (single-user) webapps
  - personal like how a car is personal, as opposed to a bus
  - personalization as in customization is also possible, but that's incidental

- what IS a single-user webapp?
  - no cloud, only directories
  - each directory is an app
  - accessible via web-browser
    - urls are the same as filepaths
    - just because it's in the browser, doesn't mean it's globally accessible

- if the folders are shared, the app is shared
  - (this doesn't have to mean multiple people, it can just mean your computer and your phone)
  - ie dropbox, syncthing
    - does dropbox actually work, for android? gotta check this
    - non-mobile is actually _less_ noob-friendly right now
    - link out to another document, detailing `syncthing` setup

- what's easy to set up?
  - I will GET TO THIS, in a YEAR OR SO 
    (rofl, it was not a year)

## (Non-Web Programmers)
- each folder is a package/module/object/class
  - they inherit from each other, inheritance tree mirrors directory tree
  - they are interpreted as both a server (on the server side) and a client (in the browser)
    - URLs mirror directory tree

- plaintext files are **king**
  - in a pinch, human readable and editable
  - maximum durability, portability, _safety_

- bridge the filesystem into the browser
  - webapp backed by human-readable plaintext data files
  - electron without electron
    - hilariously cross-platform

- extensibility comparable to wordpress
  - plugins are king, allow almost anything
    (is this actually true?)

- ONE user
  - data is small
  - processing is local
  - performance is secondary

## (Web Devs)
- how can they **do** things with this?
  - how does the server use the directory-package?
  - how does the CLIENT use the directory-package?
    - oh god, this part is so shitty, but I don't know how to get around it
- what things can they do?
- what things _should_ they do?


