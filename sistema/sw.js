const VER='1.20.0',V='mm-sistema-'+VER,SHELL=['./','index.html','manifest.json','pwa.js','version.json','logo.jpg','logo-icon.png','favicon.png','icon-192.png','icon-512.png'];
const LIB=/^https:\/\/(cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){ // rede primeiro, sem usar cópia velha do navegador nas páginas e nos scripts; cache só se estiver sem internet
    const fresh=r.mode==='navigate'||/\.(html|json|js)$/.test(u.pathname)||u.pathname.endsWith('/');
    const req=fresh?new Request(r.url,{cache:'no-store',credentials:'same-origin'}):r;
    e.respondWith(fetch(req).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
  }else if(LIB.test(r.url)){ // bibliotecas e fontes: cache primeiro
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));
  } // Supabase e demais pedidos passam direto, sem cache
});
