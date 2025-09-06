
references:
  https://medium.com/@ashubhai/webrtc-applications-with-node-js-and-react-js-7f4d4313bace
  https://medium.com/av-transcode/what-is-webrtc-and-how-to-setup-stun-turn-server-for-webrtc-communication-63314728b9d0
  https://developer.mozilla.org/en-US/docs/Web/API/File_System_API
  https://github.com/lesmana/webrtc-without-signaling-server


okay, so here's the current theory for WebRTC proxy:

CLIENT opens a hardcoded html page provided via shared folder

html page uses filesystem api to request access to the handshake file
  handshake file is out SIGNALLING mechanism

  note: 
    we can't use the filesystem api to solve our WHOLE problem, because it lacks WATCH
    but, we can still see and touch the filesystem for specific, limited actions - this is definitely that

CLIENT generates an OFFER, writes it to the signalling file

SERVER is watching the signalling file, sees it update (via syncthing)



----


There's something that deserves thought here:

what's the relationship (if any) between the client/server wrtc-proxy and the client/client wrtc something-or-other ?
  - possibly some overlap in the handshake mechanisms, but almost nothing beyond that?

  - well, here's a DIFFERENCE: the client-server needs to run WITHOUT fsNode, whereas the client/client probably USES fsNode

      okay, that's actually a really good difference

      So, probably some stuff gets pulled out into a common utils file, but this is TWO machines, not one.



----


I'm running into trouble again with regards to functionality that needs to cut across my layers

so, presently:

  1- server exposes dist.js from `/@/client.js`
  2- assets/client-default/index.jsx assumes the presence of the react-csr plugin
  3- react-csr is providing the base html, which is _also_ weird, right?
  4- if I want to run my current wrtc-proxy scheme, I need to emit some static html that can be loaded as a file://
      
      and there's just no-one who'se well-positioned to do that right now

  oooh, but maybe some of this can get cleaned up ...
  suppose that we establish a first-class expectation that an owndir be able to emit some static html

  this expectation can be met by the client-bundler, or by a plugin or whatever, but it DOES need to happen

  and then, when the server builds, it can run that and save it in `/.owndir/.dist/`

  Now, THAT becomes what we serve when we visit ... anywhere, really
  and we don't have this weird pollution of who's job it is to incorporate dist.js into an html document



Okay, I really like this theory. So, if we get slightly more concrete, what does that mean, exactly?
  (wow, I've really come full circle on this one, haven't I?)


Okay, how about this:
  1- the client-bundler can include a `dist` folder, into which `dist.js` will be copied
      there's questions about the particulars that feel fiddly and unimportant 
      (ie, where exactly is it copied to? Can somewhere else be chosen? etc)
      probably we rely on convention rather than definition here, because I'm lazy ...

  2- the Server will serve this `dist` folder statically
      `index.html` gets picked up automatically (pretty sure, anyways)
      this is basically going to be what `react-csr` is doing, except that it becomes an explicit expectation

    Is this heirarchical? It feels like each module should get the chance to emit it's own index.html, right?
      this thought isn't _insane_, and it's very close to the initial vision, but it doesn't actually help me in the moment, right?

      also, whether I end up walking this path or not, I still assemble all the static html in the root .owndir, I don't leave it scattered all through the heirarchy

        it's still a BUILD ARTIFACT, after all


  okay, so let's imagine that, when the server builds, it calls `module.O.static()`

    what does this return? A map of strings?
    does it directly write the files itself?
    how can I simply _provide_ a folder of static files?

    can I bake in things like the css? 
      (this one should be yes)
    or the favicon?
      (that feels like it's asking for a lot)


  what if we build this up kinda like how we do routes?

    module.O.static = {
      "index.html":  // and then what? I guess this could either be a string or a function ...
    }

  that's not insane, but I don't think it does everything I want
    for example, suppose I want to start with a folder, but then I want to inject some files _inside_ it
      (ie, style.css)

  so, I'm thinking that I want to apply operations in an order?

    module.O.static = [
      ["./", "./static"]

    ]


  Part of the trouble here is, I've come back around to re-inventing SSR
  And I think this is why this functionality was out in the plugins in the first place

    Before I'm done here, I'm going to want to call `react-dom/server renderToString` to emit my html
    and now I'm right back where I started because I don't want to put React in the owndir core

      (it can live in client-default and server-default, because those are overrideable, which is NOT the same)

    So, how does this generalize?
      well, it sure seems like it's the MODULE's job to know about React, right?
      
        (this is kinda how I ended up with the weird relationship between client-default and the react-csr plugin,
         because it needs to be in the server AND the client 
          (client _is_ the bootstrap, server _delivers_ the bootstrap))

      I need some contract between the module and the core, where the _module_ owns constructing the deliverable
        okay, so what does the core actually need to receive?
          I mean, it's gotta be a filepath, right?
          a string containing a filepath?

          The other way I could jump is, I could give the core a _router_
            BUT - that's what I'm already doing now, and it's not working
            because it relies on HAVING A GOD DAMNED SERVER

        Okay, so what does the module need to be able to do, to put together a filepath?
          well, how do I want to go about it?
            - I can point at an internal static folder
            - I can copy the folder someplace useful (and then point at the copy)

          
