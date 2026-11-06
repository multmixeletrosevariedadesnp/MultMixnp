/* MultMix (computador): abre Sistema, Catálogo e/ou PDV, usa o cache para funcionar sem internet e imprime o cupom direto. */
const { app, BrowserWindow, Menu, ipcMain, dialog, shell, protocol, net } = require('electron');
const { Store } = require('./store');
const path = require('path');
const { pathToFileURL } = require('url');
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
protocol.registerSchemesAsPrivileged([{ scheme: 'mm', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } }]);

/* ===== arquivos dos programas: embutidos no instalador, atualizados em segundo plano quando há internet ===== */
const TYPES = { html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json; charset=utf-8', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', ico: 'image/x-icon', svg: 'image/svg+xml', webmanifest: 'application/manifest+json', csv: 'text/csv; charset=utf-8', txt: 'text/plain; charset=utf-8', woff2: 'font/woff2' };
const bundledDir = () => (app.isPackaged ? path.join(process.resourcesPath, 'app-files') : path.join(__dirname, 'app-files'));
const mirrorDir = () => path.join(app.getPath('userData'), 'espelho');
function prepMirror() { // espelho de uma versão antiga do instalador é descartado: os arquivos embutidos são mais novos
  const stamp = path.join(mirrorDir(), '.versao');
  try { if (fs.readFileSync(stamp, 'utf8') === app.getVersion()) return; } catch (e) {}
  try { fs.rmSync(mirrorDir(), { recursive: true, force: true }); fs.mkdirSync(mirrorDir(), { recursive: true }); fs.writeFileSync(stamp, app.getVersion()); } catch (e) {}
}
const safeRel = p => { const r = decodeURIComponent(p).replace(/^\/+/, ''); return !r || r.includes('..') || r.includes('\\') ? null : (r.endsWith('/') || !r ? r + 'index.html' : r); };
function readLocal(rel) { for (const dir of [mirrorDir(), bundledDir()]) { const f = path.join(dir, rel); try { if (fs.statSync(f).isFile()) return f; } catch (e) {} } return null; }
const refreshing = new Set();
async function refresh(rel) { // baixa a versão publicada e guarda no espelho (vale na próxima abertura)
  if (refreshing.has(rel)) return; refreshing.add(rel);
  try {
    const r = await net.fetch(readCfg().base + rel, { cache: 'no-store' });
    if (!r.ok) return;
    const buf = Buffer.from(await r.arrayBuffer());
    if (!buf.length) return;
    if (/\.html?$/.test(rel) && !/<html|<!doctype/i.test(buf.slice(0, 400).toString('utf8'))) return;
    const f = path.join(mirrorDir(), rel); fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f + '.tmp', buf); fs.renameSync(f + '.tmp', f);
  } catch (e) { /* sem internet: segue com o que tem */ } finally { refreshing.delete(rel); }
}
function handleMm(req) {
  const u = new URL(req.url), rel = safeRel(u.pathname);
  if (!rel) return new Response('Não encontrado', { status: 404 });
  const f = readLocal(rel), ext = (rel.split('.').pop() || '').toLowerCase();
  if (f) { refresh(rel); return new Response(fs.readFileSync(f), { headers: { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' } }); }
  return net.fetch(readCfg().base + rel).then(async r => { if (r.ok) refresh(rel); return r; }).catch(() => new Response('Sem internet e arquivo ainda não baixado.', { status: 504 }));
}

/* ===== banco local (arquivo, com cópia automática) ===== */
const stores = {};
const dataDir = () => path.join(app.getPath('userData'), 'banco');
const backupDir = () => { const c = readCfg(); if (c.backupDir) return c.backupDir; try { return path.join(app.getPath('documents'), 'MultMix', 'Backup'); } catch (e) { return path.join(app.getPath('userData'), 'backup'); } };
function storeOf(key) { if (!APPS[key]) return null; return stores[key] || (stores[key] = new Store(dataDir(), key, backupDir())); }
ipcMain.on('db:all', (e, k) => { const s = storeOf(k); e.returnValue = s ? { data: s.all(), status: s.status } : { data: {}, status: {} }; });
ipcMain.on('db:set', (e, key, k, v) => { const s = storeOf(key); if (s) s.set(k, v); });
ipcMain.on('db:del', (e, key, k) => { const s = storeOf(key); if (s) s.del(k); });
ipcMain.on('db:clear', (e, key) => { const s = storeOf(key); if (s) s.clear(); });
const flushAll = () => Object.values(stores).forEach(s => s.flush());
function backupAll(show) {
  const out = Object.keys(APPS).map(k => storeOf(k)).filter(s => s && Object.keys(s.all()).length).map(s => s.backupNow());
  if (show) dialog.showMessageBox({ message: out.filter(Boolean).length ? 'Backup feito.' : 'Nada para guardar ainda.', detail: backupDir() });
  return out;
}
async function restoreBackup() {
  const r = await dialog.showOpenDialog({ title: 'Escolha o arquivo de backup (.json)', defaultPath: backupDir(), filters: [{ name: 'Backup MultMix', extensions: ['json'] }], properties: ['openFile'] });
  if (r.canceled || !r.filePaths[0]) return;
  const f = r.filePaths[0], name = path.basename(f).split('_')[0], s = storeOf(name);
  if (!s) return dialog.showErrorBox('Backup', 'Este arquivo não é um backup do MultMix (nome esperado: sistema_..., pdv_... ou catalogo_...).');
  if (dialog.showMessageBoxSync({ type: 'warning', buttons: ['Restaurar', 'Cancelar'], defaultId: 1, cancelId: 1, message: 'Restaurar o backup de ' + APPS[name].nome + '?', detail: 'Os dados atuais deste computador serão substituídos. Antes disso é feita uma cópia deles.' }) !== 0) return;
  s.backupNow(); fs.copyFileSync(path.join(dataDir(), name + '.json'), path.join(dataDir(), name + '.antes-de-restaurar.json').replace('.json', '-' + Date.now() + '.json'));
  if (!s.restoreFrom(f)) return dialog.showErrorBox('Backup', 'O arquivo está danificado e não foi restaurado. Nada foi alterado.');
  if (wins[name] && !wins[name].isDestroyed()) wins[name].loadURL(appUrl(name));
  dialog.showMessageBox({ message: 'Backup restaurado.' });
}
function verifyDb() {
  const t = Object.keys(APPS).map(k => { const c = storeOf(k).check(); return APPS[k].nome + ': ' + (c.ok ? 'íntegro' : 'COM ERRO') + ' · ' + c.chaves + ' registros' + (c.aviso ? '\n   ' + c.aviso : ''); }).join('\n');
  dialog.showMessageBox({ message: 'Banco local', detail: t + '\n\nPasta: ' + dataDir() + '\nBackups: ' + backupDir() });
}
/* traz os dados guardados pela versão anterior do programa (que carregava direto do GitHub) */
async function importOld(key) {
  const w = new BrowserWindow({ show: false, webPreferences: { partition: 'persist:' + key, sandbox: true } });
  try {
    await Promise.race([w.loadURL(readCfg().base + APPS[key].path), new Promise((_, rj) => setTimeout(() => rj(new Error('tempo')), 20000))]);
    const dump = await w.webContents.executeJavaScript('JSON.stringify(Object.fromEntries(Object.entries(localStorage)))');
    const o = JSON.parse(dump), s = storeOf(key); let n = 0;
    for (const [k, v] of Object.entries(o)) if (s.get(k) === null) { s.set(k, v); n++; }
    s.flush(); return n;
  } catch (e) { return -1; } finally { try { w.destroy(); } catch (e) {} }
}
async function importAllOld(show) {
  const c = readCfg(), res = []; let fail = false;
  for (const k of (c.apps.length ? c.apps : Object.keys(APPS))) { const n = await importOld(k); if (n < 0) fail = true; else res.push(APPS[k].nome + ': ' + n + ' itens'); }
  if (!fail) { c.imported = true; writeCfg(c); }
  if (show) dialog.showMessageBox({ message: fail ? 'Não foi possível ler os dados antigos (sem internet?). Tente de novo com internet.' : 'Dados da versão anterior trazidos.', detail: res.join('\n') });
}

const wins = {}; let home = null;
const preload = path.join(__dirname, 'preload.js'), preloadApp = path.join(__dirname, 'preload-app.js');
const appUrl = k => 'mm://app/' + APPS[k].path;
const iconFile = k => { const p = app.isPackaged ? path.join(process.resourcesPath, 'icons', k + '.ico') : path.join(__dirname, 'icons', k + '.ico'); return fs.existsSync(p) ? p : undefined; };

function openApp(key) {
  if (!APPS[key]) return;
  if (wins[key] && !wins[key].isDestroyed()) { if (wins[key].isMinimized()) wins[key].restore(); wins[key].focus(); return; }
  const w = new BrowserWindow({ width: 1280, height: 820, minWidth: 900, minHeight: 600, backgroundColor: '#00468f', title: 'MultMix · ' + APPS[key].nome, icon: iconFile(key),
    webPreferences: { preload: preloadApp, partition: 'persist:mm-' + key, contextIsolation: false, nodeIntegration: false, sandbox: true } });
  wins[key] = w;
  const url = () => appUrl(key);
  w.webContents.on('did-fail-load', (e, code, d, u, isMain) => { if (isMain && code !== -3) w.loadFile(path.join(__dirname, 'offline.html')); });
  w.webContents.setWindowOpenHandler(({ url: u }) => { shell.openExternal(u); return { action: 'deny' }; });
  w.webContents.on('before-input-event', (e, i) => { if (i.type === 'keyDown' && i.key === 'F5') w.loadURL(url()); });
  w.webContents.on('did-finish-load', () => { const s = storeOf(key); if (s && s.status.aviso && !s.__avisou) { s.__avisou = true; dialog.showMessageBox(w, { type: 'warning', message: 'Banco local', detail: s.status.aviso }); } });
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
    if (sel.includes(k)) { try { shell.writeShortcutLink(file, 'create', { target: process.execPath, args: '--app=' + k, description: name, icon: iconFile(k) || process.execPath, iconIndex: 0, cwd: path.dirname(process.execPath) }); } catch (e) {} }
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
ipcMain.handle('mm-config', () => ({ apps: readCfg().apps, setup: readCfg().setup, startup: !!readCfg().startup, backupDir: backupDir(), imported: !!readCfg().imported, catalog: Object.fromEntries(Object.entries(APPS).map(([k, v]) => [k, { nome: v.nome, desc: v.desc }])) }));
ipcMain.handle('mm-set-apps', (e, list, opt) => { const sel = (list || []).filter(k => APPS[k]); const c = readCfg(); c.apps = sel; c.setup = true; if (opt) { c.startup = !!opt.startup; if (typeof opt.backupDir === 'string' && opt.backupDir) c.backupDir = opt.backupDir; } writeCfg(c); syncShortcuts(sel); try { app.setLoginItemSettings({ openAtLogin: !!c.startup, args: sel.length === 1 ? ['--app=' + sel[0]] : [] }); } catch (x) {} if (!c.imported) importAllOld(false); return sel; });
ipcMain.handle('mm-pick-backup-dir', async () => { const r = await dialog.showOpenDialog({ title: 'Pasta dos backups', properties: ['openDirectory', 'createDirectory'] }); return r.canceled ? '' : r.filePaths[0]; });
ipcMain.handle('mm-open', (e, k) => { openApp(k); return true; });

/* atualizador do próprio programa (a parte que muda raramente; os apps se atualizam sozinhos pelo espelho) */
function iniciarAtualizador() {
  if (!app.isPackaged) return;
  try {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.autoDownload = true; autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.on('update-downloaded', i => dialog.showMessageBox({ type: 'info', message: 'MultMix ' + i.version + ' baixado', detail: 'A atualização será instalada quando você fechar o MultMix.' }));
    autoUpdater.on('error', () => {});
    const chk = () => autoUpdater.checkForUpdates().catch(() => {});
    setTimeout(chk, 15000); setInterval(chk, 6 * 3600 * 1000);
  } catch (e) { /* sem atualizador: segue normalmente */ }
}
app.whenReady().then(() => {
  iniciarAtualizador();
  prepMirror(); protocol.handle('mm', handleMm);
  setTimeout(() => backupAll(false), 20000); setInterval(() => backupAll(false), 30 * 60 * 1000); setInterval(flushAll, 5000);
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'MultMix', submenu: [
      { label: 'Programas instalados…', click: () => openHome(false) },
      { label: 'Escolher o que instalar…', click: () => openHome(true) },
      { label: 'Impressora do cupom…', click: openPrinterSettings },
      { label: 'Banco local', submenu: [
        { label: 'Verificar banco', click: verifyDb },
        { label: 'Fazer backup agora', click: () => backupAll(true) },
        { label: 'Restaurar um backup…', click: restoreBackup },
        { label: 'Abrir pasta dos backups', click: () => { fs.mkdirSync(backupDir(), { recursive: true }); shell.openPath(backupDir()); } },
        { label: 'Trazer dados da versão anterior…', click: () => importAllOld(true) } ] },
      { label: 'Recarregar', accelerator: 'CmdOrCtrl+R', click: (m, w) => w && w.webContents.reloadIgnoringCache && w.webContents.reload() },
      { label: 'Tela cheia', accelerator: 'F11', click: (m, w) => w && w.setFullScreen(!w.isFullScreen()) },
      { type: 'separator' }, { role: 'quit', label: 'Sair' } ] },
    { label: 'Ajuda', submenu: [{ label: 'Procurar atualização', click: () => { try { require('electron-updater').autoUpdater.checkForUpdates().then(r => dialog.showMessageBox({ message: r && r.updateInfo && r.updateInfo.version !== app.getVersion() ? 'Nova versão ' + r.updateInfo.version + ' encontrada; baixando.' : 'Você está na versão mais nova.' })).catch(() => dialog.showMessageBox({ message: 'Não foi possível verificar agora (sem internet?).' })); } catch (e) {} } },
      { label: 'Sobre', click: () => dialog.showMessageBox({ message: 'MultMix ' + app.getVersion(), detail: 'Atualizações: ' + readCfg().base + '\nBanco local: ' + dataDir() }) }] }
  ]));
  const c = readCfg(), k = argApp(process.argv);
  if (k) openApp(k);
  else if (!c.setup) openHome(true);
  else if (c.apps.length === 1) openApp(c.apps[0]);
  else openHome(false);
});
app.on('second-instance', (e, argv) => { const k = argApp(argv); if (k) openApp(k); else openHome(false); });
app.on('before-quit', () => { flushAll(); backupAll(false); });
app.on('window-all-closed', () => { flushAll(); app.quit(); });
