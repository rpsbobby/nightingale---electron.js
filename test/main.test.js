const { Application } = require('spectron');
const assert = require('assert');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');
// const { app } = require('electron');

const sleep = (time) => new Promise((r) => setTimeout(r, time));
let app;

describe('Application launch', function () {
   this.timeout(30000);

   beforeEach(async function () {
      app = new Application({
         path: electronPath,
         args: [path.join(__dirname, '..')],
      });
      return await app.start();
   });

   afterEach(async function () {
      if (app && app.isRunning()) {
         return await app.stop();
      }
   });

   it('Shows an initial window', async () => {
      // const a = await app;
      // assert.equal(a, undefined);
      await app.client.waitUntilWindowLoaded();
      const count = await app.client.getWindowCount();
      assert.equal(count, 1);
   });

   it('Should return list of songs', async () => {
      await app.client.waitUntilWindowLoaded();
      const arrayOfSongs = app.client.webContents.on('send:music');
      assert(arrayOfSongs != null);
   });

   it('Should fetch users settings: ', async () => {
      await app.client.waitUntilWindowLoaded();
      const arrayOfFavorites = app.client.webContents.on('send:favorites');
      assert(arrayOfFavorites !== null);
   });
});
