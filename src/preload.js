const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('mathingHead', {
  platform: process.platform
});
