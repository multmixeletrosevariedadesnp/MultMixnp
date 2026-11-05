const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('mmDesk', {
  desktop: true,
  print: html => ipcRenderer.invoke('mm-print', html),
  printers: () => ipcRenderer.invoke('mm-printers'),
  getPrinter: () => ipcRenderer.invoke('mm-get-printer'),
  setPrinter: n => ipcRenderer.invoke('mm-set-printer', n),
  testPrint: () => ipcRenderer.invoke('mm-test-print'),
  config: () => ipcRenderer.invoke('mm-config'),
  setApps: (l, o) => ipcRenderer.invoke('mm-set-apps', l, o),
  pickBackupDir: () => ipcRenderer.invoke('mm-pick-backup-dir'),
  open: k => ipcRenderer.invoke('mm-open', k)
});
