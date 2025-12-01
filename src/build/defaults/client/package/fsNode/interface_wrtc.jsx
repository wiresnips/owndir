import React, { useEffect, useState } from 'react';


// step one: I need to bootstrap my way to reading and writing the signalling files
//   these live in `/.owndir/.wrtc-proxy/`

// a FileSystemApi handle to the directory will be stored in IndexedDB
// this way, I can read and write (and trust the server to eventually see it)

// note: this does not work in every browser, which makes sense because it's a dirty workaround

async function getIndexedDb () {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('owndir-wrtc-proxy', 1);

      req.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore('system-fs-handles', { keyPath: 'name' });
      };
      req.onsuccess = (event) => resolve(event.target.result);
      req.onerror = (event) => reject(event.target.error);
  });
}


function useWrtcSignalFiles () {
  const [db, setDb] = useState(null);

  useEffect(() => {
    getIndexedDb().then(setDb);
  }, []);



}
