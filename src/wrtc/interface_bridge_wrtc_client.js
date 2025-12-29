


async function Interface () {

  // okay, so the gameplan is for this to be a riff on the websocket interface, except we replace the websocket with a WRTC connection

  return {
    children: async function () {},
    delete: async function (path) {},
    info: async function (path) {},
    makeDir: async function (path) {},
    move: async function (path, opts) {},
    touch: async function (path) {},
    sub: function (events, paths, listener, opts) {},
    read: async function (path, start, end) {},
    readAll: async function (path) {},
    write: async function (path, data, opts) {},
  }
}




function foo () {

  try {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.stunprotocol.org" }
      ],
      
      // only firefox supports this
      // and, I only expect to use this functionality from chrome
      // peerIdentity: "",

    });

    peerConnection.onicecandidate = function (event) {
      if (event.candidate != null) {
        console.log('new ice candidate');
      } else {
        console.log('all ice candidates');
        console.log(peerConnection.localDescription)
      }
    }

    peerConnection.createDataChannel('chat');
    peerConnection.createOffer();

    return peerConnection;

  } catch(err) {
    console.error(err)
  }

}

const peerConnection = foo();






/*
  flow: 
    1- client creates a peerConnection, with a dataChannel, and publishes an offer
        peerConnection = new RTCPeerConnection({...})
        peerConnection.createDataChannel("fsNode")
        offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

    2- server sees the offer (this is the signalling, handwave that for now), creates a peerconnection to meet it
        peerConnection = new RTCPeerConnection({...})
        answer = await peerConnection.setRemoteDescription(offer)
        peerConnection.setLocalDescription(answer)

    3- client sees the answer (this is the signalling, handwave for now), finalizes the connection
        await peerConnection.setRemoteDescription(answer)

*/




async function createPeerConnection (remoteOffer) {
  try {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.stunprotocol.org" }
      ]
    });

    peerConnection.onicecandidate = (event) => {
      event.candidate 
        ? console.log("ice candidate", event) 
        : console.log("ice candidates done", {offer: peerConnection.localDescription});
    }
    peerConnection.onconnectionstatechange = (event) => console.log("peerConnection.onconnectionstatechange", {event});
    peerConnection.oniceconnectionstatechange = (event) => console.log("peerConnection.oniceconnectionstatechange", {event});


    if (!remoteOffer) {
      const dataChannel = peerConnection.createDataChannel('fsNode');
      dataChannel.onopen = () => console.log("dataChannel.onopen");
      dataChannel.onmessage = (message) => console.log("dataChannel.onmessage", {message});

      const localOffer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(localOffer);
    }

    else {
      await peerConnection.setRemoteDescription(remoteOffer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
    }

    return peerConnection;
  } catch (err) {
    console.error(err)
  }
}

var peerConnection;
createPeerConnection().then(pc => peerConnection = pc)




















