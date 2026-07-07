const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mathingHead', {
  platform: process.platform,

  getQuestions:    (level)      => ipcRenderer.invoke('mathingHead:getQuestions', level),
  getQuestionCount: ()          => ipcRenderer.invoke('mathingHead:getQuestionCount'),

  saveMatch:        (payload)   => ipcRenderer.invoke('mathingHead:saveMatch', payload),
  getHallOfFame:    (opts)      => ipcRenderer.invoke('mathingHead:getHallOfFame', opts),
  getMatchHistory:  (limit)     => ipcRenderer.invoke('mathingHead:getMatchHistory', limit),
  getMatchResults:  (matchId)   => ipcRenderer.invoke('mathingHead:getMatchResults', matchId),

  getAllPlayers:     ()         => ipcRenderer.invoke('mathingHead:getAllPlayers'),
  getPlayerProfile:  (name)     => ipcRenderer.invoke('mathingHead:getPlayerProfile', name)
});
