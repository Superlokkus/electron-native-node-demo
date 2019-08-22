const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

let storedUpdateResult;
let downloadPromise;
let updateDownloaded = false;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 800,
        minWidth: 160,
        minHeight: 90,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.webContents.session.clearStorageData();

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../src/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}

app.on('ready', () => {
    createMainWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) createMainWindow()
});
