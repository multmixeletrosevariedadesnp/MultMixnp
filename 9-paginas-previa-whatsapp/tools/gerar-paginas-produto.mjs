// Gera uma página por produto com a "prévia" do WhatsApp (foto, nome e preço) em catalogo/p/<id>.html
// Roda sozinho no GitHub (Actions) a cada 30 min. Só usa dados públicos do catálogo (a mesma chave pública do catalogo/index.html).
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const URL_SB = process.env.SUPABASE_URL || 'https://meswiziqgcjwxslbgmeu.supabase.co';
const KEY = process.env.SUPABASE_ANON_KEY || (await import('node:fs')).readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'catalogo', 'index.html'), 'utf8').match(/KEY:'([^']+)'/)[1];
const SITE = (process.env.SITE_URL || 'https://multmixeletrosevariedadesnp.github.io/MultMixnp/catalogo/').replace(/\/?$/, '/');
const OUT = process.env.OUT_DIR || join(dirname(fileURLToPath(import.meta.url)), '..', 'catalogo', 'p');

const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const get = async (path) => { const r = await fetch(URL_SB + '/rest/v1/' + path, { headers: H }); if (!r.ok) throw new Error(path + ' -> HTTP ' + r.status); return r.json(); };

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const R = (n) => Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const hoje = () => new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10); // data no Brasil (UTC-3)
function promo(p) {
  const x = +p.promo_pct; if (!(x > 0 && x < 100)) return 0;
  const h = hoje();
  if (p.promo_from && h < String(p.promo_from).slice(0, 10)) return 0;
  if (p.promo_to && h > String(p.promo_to).slice(0, 10)) return 0;
  return x;
}
const at = (v, p) => { const x = promo(p); return x ? +(v * (1 - x / 100)).toFixed(2) : +v; };
function precos(p) {
  const m = p.max_inst || 10, l = [];
  if (+p.price_cash > 0) l.push('À vista ' + R(at(p.price_cash, p)));
  if (+p.price_card > 0) l.push('Cartão ' + R(at(p.price_card, p)));
  if (+p.price_credit > 0) l.push('Carnê ' + m + 'x de ' + R(at(p.price_credit, p) / m));
  return l;
}
const foto = (u) => 'https://wsrv.nl/?url=' + encodeURIComponent(u) + '&w=1200&h=630&fit=contain&bg=white&output=jpg&q=82';

const company = (await get('company?select=trade_name,legal_name&id=eq.1').catch(() => []))[0] || {};
const loja = company.trade_name || company.legal_name || 'MultMix';
const prods = await get('products?select=id,name,category,description,price_cash,price_card,price_credit,max_inst,stock,promo_pct,promo_from,promo_to,photos,updated_at&active=eq.true&stock=gt.0&limit=5000');

mkdirSync(OUT, { recursive: true });
const manifest = {}, keep = new Set();
for (const p of prods) {
  if (!/^[\w-]+$/.test(String(p.id))) continue;
  const pr = precos(p), f = (p.photos || [])[0];
  const titulo = p.name + (pr[0] ? ' · ' + pr[0] : '');
  const desc = [pr.join(' · '), (p.description || '').trim().slice(0, 160)].filter(Boolean).join(' — ');
  const alvo = SITE + '#p=' + p.id, self = SITE + 'p/' + p.id + '.html';
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.name)} · ${esc(loja)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="product"><meta property="og:site_name" content="${esc(loja)}">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(self)}">${f ? `\n<meta property="og:image" content="${esc(foto(f))}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">\n<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(foto(f))}">` : ''}
<script>location.replace(${JSON.stringify('../#p=' + p.id)})</script>
</head><body style="font-family:system-ui,sans-serif;text-align:center;padding:24px">
<noscript><p><a href="../#p=${esc(p.id)}">Abrir ${esc(p.name)} no catálogo</a></p></noscript>
<p>Abrindo <a href="../#p=${esc(p.id)}">${esc(p.name)}</a>…</p></body></html>
`;
  writeFileSync(join(OUT, p.id + '.html'), html);
  manifest[p.id] = p.updated_at || '';
  keep.add(p.id + '.html');
}
for (const f of readdirSync(OUT)) if (/\.html$/.test(f) && !keep.has(f)) unlinkSync(join(OUT, f)); // produto sem estoque/inativo: some
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify({ itens: manifest }));
console.log('páginas geradas:', keep.size);
