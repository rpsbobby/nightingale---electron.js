const { Application } = require('spectron');
const assert = require('assert');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');
const { app } = require('electron');

const sleep = (time) => new Promise((r) => setTimeout(r, time));
// let app;

describe('Application launch', function () {
   this.timeout(30000);

   beforeEach(async function () {
      this.app = new Application({
         path: electronPath,
         args: [path.join(__dirname, '..')],
      });
      return await this.app.start();
   });

   afterEach(async function () {
      if (this.app && this.app.isRunning()) {
         return await this.app.stop();
      }
   });

   it('Shows an initial window', async () => {
      // const a = await this.app;
      // assert.equal(a, undefined);
      await this.app.client.waitUntilWindowLoaded();
      const count = await this.app.client.getWindowCount();
      assert.equal(count, 1);
   });

   it('Should return list of songs', async () => {
      await app.client.waitUntilWindowLoaded();
      const arrayOfSongs = app.client.webContents.on('send:music');
      assert(arrayOfSongs != null);
   });
});
