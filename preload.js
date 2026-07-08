const { contextBridge, ipcRenderer } = require('electron')


// contextBridge: Securely exposes selected APIs from preload.js to the renderer.

// exposeInMainWorld("versions", {...}):
// Creates window.versions in the renderer with only the functions/data you expose.

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})


// By default, the renderer cannot use Node.js/Electron APIs.
// preload.js runs before the renderer and acts as a secure bridge.
// It exposes only the APIs we choose (via contextBridge),
// allowing the renderer to safely communicate with main.js.

