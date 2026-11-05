/* Banco local do MultMix (computador): chave/valor em arquivo, gravação atômica, cópia de segurança e recuperação automática.
   Cada programa (sistema, pdv, catalogo) tem o seu. Não depende de Electron (testável com Node puro). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const sum = s => crypto.createHash('sha256').update(s).digest('hex');
function readGood(file) { // devolve {data} só se o arquivo existe, é JSON válido e confere com o checksum
  try {
    const t = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!t || typeof t.body !== 'string' || t.sum !== sum(t.body)) return null;
    const data = JSON.parse(t.body);
    return data && typeof data === 'object' && !Array.isArray(data) ? { data, at: t.at || '' } : null;
  } catch (e) { return null; }
}
function writeSyncDurable(file, text) { // grava num arquivo temporário, força ao disco e só então troca
  const tmp = file + '.tmp', fd = fs.openSync(tmp, 'w');
  try { fs.writeSync(fd, text); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  fs.renameSync(tmp, file);
}

class Store {
  constructor(dir, name, backupDir) {
    this.dir = dir; this.name = name; this.backupDir = backupDir || '';
    this.file = path.join(dir, name + '.json'); this.bak = path.join(dir, name + '.bak.json');
    this.data = {}; this.dirty = false; this.timer = null; this.status = { origem: 'novo', aviso: '' };
    fs.mkdirSync(dir, { recursive: true });
    this.load();
  }
  load() {
    let r = readGood(this.file);
    if (r) { this.data = r.data; this.status = { origem: 'principal', aviso: '' }; return; }
    const had = fs.existsSync(this.file) || fs.existsSync(this.bak);
    r = readGood(this.bak);
    if (r) { this.data = r.data; this.status = { origem: 'copia', aviso: 'O arquivo principal estava com erro; foi recuperada a cópia anterior.' }; this.dirty = true; this.flush(); return; }
    const f = this.backups()[0];
    r = f && readGood(f);
    if (r) { this.data = r.data; this.status = { origem: 'backup', aviso: 'Banco recuperado do backup de ' + (r.at || path.basename(f)) + '.' }; this.dirty = true; this.flush(); return; }
    if (had) { try { fs.renameSync(this.file, this.file + '.corrompido-' + Date.now()); } catch (e) {} this.status = { origem: 'vazio', aviso: 'Não foi possível recuperar o banco local; os dados serão baixados de novo do servidor.' }; }
  }
  get(k) { return Object.prototype.hasOwnProperty.call(this.data, k) ? this.data[k] : null; }
  all() { return this.data; }
  set(k, v) { this.data[String(k)] = String(v); this.touch(); }
  del(k) { delete this.data[String(k)]; this.touch(); }
  clear() { this.data = {}; this.touch(); }
  replaceAll(obj) { this.data = {}; for (const [k, v] of Object.entries(obj || {})) this.data[String(k)] = String(v); this.touch(); this.flush(); }
  touch() { this.dirty = true; if (!this.timer) this.timer = setTimeout(() => { this.timer = null; this.flush(); }, 400); }
  flush() {
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
    if (!this.dirty) return true;
    try {
      const body = JSON.stringify(this.data), at = new Date().toISOString();
      const text = JSON.stringify({ v: 1, at, sum: sum(body), body });
      if (readGood(this.file)) { try { fs.copyFileSync(this.file, this.bak); } catch (e) {} } // só copia se o atual está íntegro
      writeSyncDurable(this.file, text);
      this.dirty = false; return true;
    } catch (e) { this.status.aviso = 'Falha ao gravar no disco: ' + e.message; return false; }
  }
  backups() { // do mais novo para o mais antigo
    if (!this.backupDir) return [];
    try { return fs.readdirSync(this.backupDir).filter(f => f.startsWith(this.name + '_') && f.endsWith('.json')).sort().reverse().map(f => path.join(this.backupDir, f)); } catch (e) { return []; }
  }
  backupNow(keepDays = 30) { // um arquivo por dia (o mais recente do dia substitui o anterior)
    if (!this.backupDir) return '';
    this.flush();
    try {
      fs.mkdirSync(this.backupDir, { recursive: true });
      const d = new Date(), p = n => String(n).padStart(2, '0'), day = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
      const out = path.join(this.backupDir, this.name + '_' + day + '.json');
      const body = JSON.stringify(this.data);
      writeSyncDurable(out, JSON.stringify({ v: 1, at: d.toISOString(), sum: sum(body), body }));
      const old = this.backups().slice(keepDays);
      old.forEach(f => { try { fs.rmSync(f); } catch (e) {} });
      return out;
    } catch (e) { this.status.aviso = 'Falha no backup: ' + e.message; return ''; }
  }
  restoreFrom(file) { const r = readGood(file); if (!r) return false; this.replaceAll(r.data); return true; }
  check() { const r = readGood(this.file); return { ok: !!r || !fs.existsSync(this.file), chaves: Object.keys(this.data).length, ...this.status }; }
}
module.exports = { Store, readGood };
