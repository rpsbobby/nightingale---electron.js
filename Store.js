const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
   constructor(options) {
      const userDataPath = (electron.app || electron.remote.app).getPath(
         'userData'
      );
      console.log(userDataPath);
      this.path = path.join(userDataPath, options.configName + '.json');
      this.data = parseDataFile(this.path, options.settings);
   }

   get(key) {
      return this.data[key];
   }
   set(key, val) {
      this.data[key] = val;
      fs.writeFileSync(this.path, JSON.stringify(this.data));
   }
}

function parseDataFile(filePath, settings) {
   try {
      return JSON.parse(fs.readFileSync(filePath));
   } catch (err) {
      return settings;
   }
}

module.exports = Store;
