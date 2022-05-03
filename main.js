const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
const songs = [];

let isDev = false;

if (
   process.env.NODE_ENV !== undefined &&
   process.env.NODE_ENV === 'development'
) {
   isDev = true;
}

function createMainWindow() {
   mainWindow = new BrowserWindow({
      width: 1100,
      height: 800,
      show: false,
      icon: `${__dirname}/assets/icon.png`,
      webPreferences: {
         nodeIntegration: true,
      },
   });

   let indexPath;

   if (isDev && process.argv.indexOf('--noDevServer') === -1) {
      indexPath = url.format({
         protocol: 'http:',
         host: 'localhost:8080',
         pathname: 'index.html',
         slashes: true,
      });
   } else {
      indexPath = url.format({
         protocol: 'file:',
         pathname: path.join(__dirname, 'dist', 'index.html'),
         slashes: true,
      });
   }

   mainWindow.loadURL(indexPath);

   // Don't show until we are ready and loaded
   mainWindow.once('ready-to-show', () => {
      mainWindow.show();
   });

   mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   if (mainWindow === null) {
      createMainWindow();
   }
});

const getSongsFromTheFile = async (folderPath) => {
   console.log('getting files....');
   const musicFolderPath = path.resolve(__dirname, 'music');
   if (songs.length === 0) {
      fs.readdirSync(folderPath).forEach((file, index) => {
         let songPath = path.resolve(musicFolderPath, `${file}`);
         songs.push({ songPath, id: index });
      });
   }
};

// send songs to the client side
ipcMain.on('get:music', async () => {
   await getSongsFromTheFile(path.join(__dirname, 'music'));
   mainWindow.webContents.send('send:music', JSON.stringify(songs));
});

// Stop error
app.allowRendererProcessReuse = true;
