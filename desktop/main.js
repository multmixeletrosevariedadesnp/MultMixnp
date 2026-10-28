/* MultMix (computador): abre Sistema, Catálogo e/ou PDV, usa o cache para funcionar sem internet e imprime o cupom direto. */
const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const BASE = 'https://multmixeletrosevariedadesnp.github.io/MultMixnp/';
const APPS = {
  sistema: { nome: 'Sistema da loja', desc: 'Gestão completa: produtos, vendas, carnês, fiscal, relatórios (administrador).', path: 'sistema/' },
  pdv: { nome: 'PDV do vendedor', desc: 'Balcão: vender, ver estoque e comissão. Imprime o cupom direto.', path: 'pdv/' },
  catalogo: { nome: 'Catálogo', desc: 'Vitrine dos produtos para mostrar ao cliente.', path: 'catalogo/' }
};
const cfgFile = () => path.join(app.getPath('userData'), 'mm-config.json');
const readCfg = () => { try { return { base: BASE, printer: '', apps: [], setup: false, ...JSON.parse(fs.readFileSync(cfgFile(), 'utf8')) }; } catch (e) { return { base: BASE, printer: '', apps: [], setup: false }; } };
const writeCfg = c => { try { fs.writeFileSync(cfgFile(), JSON.stringify(c, null, 1)); } catch (e) {} };
const argApp = argv => { const a = (argv || []).find(x => /^--app=/.test(x)); const k = a && a.slice(6); return APPS[k] ? k : ''; };

if (!app.requestSingleInstanceLock()) app.quit();
const wins = {}; let home = null;
const preload = path.join(__dirname, 'preload.js');

function openApp(key) {
  if (!APPS[key]) return;
  if (wins[key] && !wins[key].isDestroyed()) { if (wins[key].isMinimized()) wins[key].restore(); wins[key].focus(); return; }
  const w = new BrowserWindow({ width: 1280, height: 820, minWidth: 900, minHeight: 600, backgroundColor: '#00468f', title: 'MultMix · ' + APPS[key].nome,
    webPreferences: { preload, partition: 'persist:' + key, contextIsolation: true, nodeIntegration: false, sandbox: true } });
  wins[key] = w;
  const url = () => readCfg().base + APPS[key].path;
  w.webContents.on('did-fail-load', (e, code, d, u, isMain) => { if (isMain && code !== -3) w.loadFile(path.join(__dirname, 'offline.html')); });
  w.webContents.setWindowOpenHandler(({ url: u }) => { shell.openExternal(u); return { action: 'deny' }; });
  w.webContents.on('before-input-event', (e, i) => { if (i.type === 'keyDown' && i.key === 'F5') w.loadURL(url()); });
  w.on('closed', () => { delete wins[key]; });
  w.loadURL(url()).catch(() => {});
}

function openHome(setup) {
  if (home && !home.isDestroyed()) { home.focus(); return; }
  home = new BrowserWindow({ width: 640, height: 640, title: 'MultMix', backgroundColor: '#f1f3f7', webPreferences: { preload, contextIsolation: true, sandbox: true } });
  home.setMenuBarVisibility(false);
  home.loadFile(path.join(__dirname, 'home.html'), { query: { setup: setup ? '1' : '' } });
  home.on('closed', () => { home = null; });
}

function openPrinterSettings() {
  const w = new BrowserWindow({ width: 520, height: 540, title: 'Impressora do cupom', webPreferences: { preload, contextIsolation: true, sandbox: true } });
  w.setMenuBarVisibility(false);
  w.loadFile(path.join(__dirname, 'settings.html'));
}

/* atalhos na área de trabalho, um para cada programa escolhido */
function syncShortcuts(sel) {
  if (process.platform !== 'win32') return;
  const desk = app.getPath('desktop');
  for (const k of Object.keys(APPS)) {
    const name = k === 'pdv' ? 'MultMix PDV' : k === 'sistema' ? 'MultMix Sistema' : 'MultMix Catálogo';
    const file = path.join(desk, name + '.lnk');
    try { fs.rmSync(file, { force: true }); } catch (e) {}
    if (sel.includes(k)) { try { shell.writeShortcutLink(file, 'create', { target: process.execPath, args: '--app=' + k, description: name, icon: process.execPath, iconIndex: 0, cwd: path.dirname(process.execPath) }); } catch (e) {} }
  }
}

/* imprime HTML sem abrir a janela de impressão */
function printHtml(html, silent = true) {
  return new Promise(resolve => {
    const w = new BrowserWindow({ show: false, webPreferences: { sandbox: true } });
    w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
    w.webContents.once('did-finish-load', () => {
      const cfg = readCfg(), opts = { silent, printBackground: true, margins: { marginType: 'none' } };
      if (cfg.printer) opts.deviceName = cfg.printer;
      w.webContents.print(opts, (ok, why) => { try { w.close(); } catch (e) {} resolve({ ok, error: ok ? '' : why || 'falhou' }); });
    });
    w.webContents.once('did-fail-load', () => { try { w.close(); } catch (e) {} resolve({ ok: false, error: 'não carregou' }); });
  });
}

ipcMain.handle('mm-print', (e, html) => printHtml(String(html || ''), true));
ipcMain.handle('mm-printers', async e => (await e.sender.getPrintersAsync()).map(p => ({ name: p.name, display: p.displayName || p.name, isDefault: !!p.isDefault })));
ipcMain.handle('mm-get-printer', () => readCfg().printer);
ipcMain.handle('mm-set-printer', (e, n) => { const c = readCfg(); c.printer = String(n || ''); writeCfg(c); return true; });
ipcMain.handle('mm-test-print', () => printHtml('<!doctype html><meta charset="utf-8"><style>@page{margin:3mm}body{font:12px monospace;width:72mm}</style><h3 style="text-align:center">MULTMIX</h3><p style="text-align:center">Teste de impressão<br>' + new Date().toLocaleString('pt-BR') + '</p><p style="text-align:center">Se você leu isto, está tudo certo.</p>', true));
ipcMain.handle('mm-config', () => ({ apps: readCfg().apps, setup: readCfg().setup, catalog: Object.fromEntries(Object.entries(APPS).map(([k, v]) => [k, { nome: v.nome, desc: v.desc }])) }));
ipcMain.handle('mm-set-apps', (e, list) => { const sel = (list || []).filter(k => APPS[k]); const c = readCfg(); c.apps = sel; c.setup = true; writeCfg(c); syncShortcuts(sel); return sel; });
ipcMain.handle('mm-open', (e, k) => { openApp(k); return true; });

app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'MultMix', submenu: [
      { label: 'Programas instalados…', click: () => openHome(false) },
      { label: 'Escolher o que instalar…', click: () => openHome(true) },
      { label: 'Impressora do cupom…', click: openPrinterSettings },
      { label: 'Recarregar', accelerator: 'CmdOrCtrl+R', click: (m, w) => w && w.webContents.reloadIgnoringCache && w.webContents.reload() },
      { label: 'Tela cheia', accelerator: 'F11', click: (m, w) => w && w.setFullScreen(!w.isFullScreen()) },
      { type: 'separator' }, { role: 'quit', label: 'Sair' } ] },
    { label: 'Ajuda', submenu: [{ label: 'Sobre', click: () => dialog.showMessageBox({ message: 'MultMix ' + app.getVersion(), detail: 'Endereço: ' + readCfg().base }) }] }
  ]));
  const c = readCfg(), k = argApp(process.argv);
  if (k) openApp(k);
  else if (!c.setup) openHome(true);
  else if (c.apps.length === 1) openApp(c.apps[0]);
  else openHome(false);
});
app.on('second-instance', (e, argv) => { const k = argApp(argv); if (k) openApp(k); else openHome(false); });
app.on('window-all-closed', () => app.quit());
