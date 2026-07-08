const { app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    // webPreferences: Renderer settings.
    // preload: Tells Electron to run preload.js before the renderer loads.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("ping", () => {
    console.log("Ping received");
    return "pong";
  });



  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// - Mainly macOS ke liye.
// - Red (🔴) button se sirf window close hoti hai, app quit nahi hoti.
// - User Dock icon pe click karta hai → activate event fire hota hai.
// - Agar koi window open nahi hai, to createWindow() nayi window khol deta hai.

// -----------------------------------------

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// - Jab last window close ho jaye tab ye event fire hota hai.
// - Windows/Linux → app.quit() → App band.
// - macOS → app.quit() nahi chalta → App background/Dock me running rehti hai.
// - macOS me app completely band karne ke liye: ⌘+Q ya Quit.
