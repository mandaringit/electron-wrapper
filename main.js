const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      devTools: true,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:4000");

  ipcMain.on("set-title", (_e, title) => {
    win.setTitle(title);
  });
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
