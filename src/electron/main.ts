import { app, BrowserWindow } from "electron";
import isDev from "./util.js";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    // frame: false,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:8080");
    console.log("isDevelopment");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    console.log("isProduction");
  }
});
