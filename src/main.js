const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const db = require('./main/db');
const questionsRepo = require('./main/db/questions');
const matchesRepo = require('./main/db/matches');
const playersRepo = require('./main/db/players');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'renderer', 'assets', 'images', 'icon.png'),
    title: 'Mathing Head',
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function registerIpcHandlers() {
  ipcMain.handle('mathingHead:getQuestions', (_event, level) => {
    return questionsRepo.getQuestionsByLevel(level);
  });

  ipcMain.handle('mathingHead:getQuestionCount', () => {
    return questionsRepo.getQuestionCount();
  });

  ipcMain.handle('mathingHead:saveMatch', (_event, payload) => {
    return matchesRepo.saveMatch(payload);
  });

  ipcMain.handle('mathingHead:getHallOfFame', (_event, opts) => {
    return matchesRepo.getHallOfFame(opts || {});
  });

  ipcMain.handle('mathingHead:getMatchHistory', (_event, limit) => {
    return matchesRepo.getMatchHistory(limit || 50);
  });

  ipcMain.handle('mathingHead:getMatchResults', (_event, matchId) => {
    return matchesRepo.getMatchResults(matchId);
  });

  ipcMain.handle('mathingHead:getAllPlayers', () => {
    return playersRepo.getAllPlayers();
  });

  ipcMain.handle('mathingHead:getPlayerProfile', (_event, name) => {
    return playersRepo.getPlayerProfile(name);
  });
}

app.whenReady().then(() => {
  db.init();
  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  db.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
