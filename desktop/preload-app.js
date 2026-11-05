/* Janela dos programas (Sistema, PDV, Catálogo): troca o localStorage por um banco em arquivo (sem limite de 5 MB, com cópia de
   segurança) e expõe a impressão direta. Roda antes dos scripts da página. */
const { ipcRenderer } = require('electron');
const KEY = (location.pathname.split('/')[1] || '');
const boot = ipcRenderer.sendSync('db:all', KEY);
const mem = new Map(Object.entries(boot && boot.data || {}));
const api = {
  getItem: k => (mem.has(String(k)) ? mem.get(String(k)) : null),
  setItem: (k, v) => { k = String(k); v = String(v); mem.set(k, v); ipcRenderer.send('db:set', KEY, k, v); },
  removeItem: k => { k = String(k); mem.delete(k); ipcRenderer.send('db:del', KEY, k); },
  clear: () => { mem.clear(); ipcRenderer.send('db:clear', KEY); },
  key: i => { const a = [...mem.keys()]; return i >= 0 && i < a.length ? a[i] : null; }
};
const ls = new Proxy(api, {
  get: (t, p) => (p === 'length' ? mem.size : p in t ? t[p] : (typeof p === 'string' && mem.has(p) ? mem.get(p) : undefined)),
  set: (t, p, v) => { if (typeof p === 'string') api.setItem(p, v); return true; },
  deleteProperty: (t, p) => { if (typeof p === 'string') api.removeItem(p); return true; },
  has: (t, p) => p in t || (typeof p === 'string' && mem.has(p)),
  ownKeys: () => [...mem.keys()],
  getOwnPropertyDescriptor: (t, p) => (typeof p === 'string' && mem.has(p) ? { value: mem.get(p), writable: true, enumerable: true, configurable: true } : undefined)
});
try { Object.defineProperty(window, 'localStorage', { configurable: true, get: () => ls }); } catch (e) { /* mantém o do navegador */ }
window.mmDesk = {
  desktop: true,
  dbStatus: boot && boot.status,
  print: html => ipcRenderer.invoke('mm-print', html),
  printers: () => ipcRenderer.invoke('mm-printers'),
  getPrinter: () => ipcRenderer.invoke('mm-get-printer'),
  setPrinter: n => ipcRenderer.invoke('mm-set-printer', n),
  testPrint: () => ipcRenderer.invoke('mm-test-print')
};
