const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const Store = require('./Store');

let mainWindow;
const songs = [];
let favorites;

// user settings
const store = new Store({
   configName: 'user-favorites',
   settings: {
      favorites: [],
   },
});

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
         webSecurity: false,
      },
      // frame: false,
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

   mainWindow.on('close', () => {
      if (mainWindow) {
         // save newest favorites before closed -> send message to renderer process to obtain favorites array
         mainWindow.webContents.send('get:favorites:onclose');
         // listen for saving favorites
         ipcMain.on('save:favorites', (e, fav) => {
            // save new favorites and update songs with existing favorites
            store.set('favorites', JSON.parse(fav));
         });
      }
   });

   mainWindow.on('closed', () => {
      mainWindow = null;
   });
}

app.on('ready', () => {
   // initialise user's favorite if not exist returns, returns empty array
   favorites = store.get('favorites');
   createMainWindow();
});

app.on('window-all-closed', () => {
   app.quit();
});

app.on('activate', () => {
   if (mainWindow === null) {
      createMainWindow();
   }
});

const getSongsFromTheFile = async (folderPath) => {
   // get songs from music folder, must be in root folder of the project
   const musicFolderPath = path.resolve(__dirname, 'music');
   if (songs.length === 0) {
      fs.readdirSync(folderPath).forEach((file, index) => {
         let songPath = path.resolve(musicFolderPath, `${file}`);
         songs.push({ songPath, id: index, favorite: false });
      });
   }
   // adding saved favorites to the song property
   updateFavorites();
};

const updateFavorites = () => {
   // fetch the newest version of favorites
   favorites = store.get('favorites');
   songs.forEach((song) => {
      // change  songs property if ids match
      if (favorites.includes(song.id)) {
         song.favorite = true;
      }
   });
};

// send songs to the client side
ipcMain.on('get:music', async () => {
   await getSongsFromTheFile(path.join(__dirname, 'music'));
   mainWindow.webContents.send('send:music', JSON.stringify(songs));
});

// listen to an event
ipcMain.on('get:favorites', () => {
   // fetch favorites from the file
   favorites = store.get('favorites');
   // send to web contents
   mainWindow.webContents.send('send:favorites', JSON.stringify(favorites));
});

// Stop error
app.allowRendererProcessReuse = true;
