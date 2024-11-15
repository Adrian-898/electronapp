import { app, BrowserWindow } from "electron";
import path from "path";

const mainWindow = new BrowserWindow({});

app
  .whenReady()
  .then(
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"))
  );
