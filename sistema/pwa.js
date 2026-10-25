/* MultMix: instalação como aplicativo (PWA) */
(()=>{
  if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{}));
  const cat=/catalogo/.test(location.pathname),KEY='mm_inst_x';
  const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone;
  const dismissed=()=>Date.now()-(+localStorage[KEY]||0)<7*864e5;
  let dip=null,el=null;
  function bar(ios){
    if(el||standalone()||dismissed())return;
    const s=document.createElement('style');
    s.textContent=`#instbar{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:60;display:flex;align-items:center;gap:12px;background:#fff;color:#101828;border-radius:16px;padding:12px 14px;box-shadow:0 10px 40px rgba(0,0,0,.35);max-width:520px;margin:0 auto;font:14px/1.35 system-ui,sans-serif}
#instbar img{width:44px;height:44px;border-radius:10px;flex:none}#instbar div{flex:1}#instbar b{display:block}#instbar span{color:#667085;font-size:13px}
#instbar .ib{background:#00539f;color:#fff;border:0;border-radius:10px;padding:9px 16px;font:inherit;font-weight:600;cursor:pointer}
#instbar .ix{background:none;border:0;color:#667085;font-size:18px;cursor:pointer;padding:4px 6px}
@media(prefers-color-scheme:dark){#instbar{background:#161d30;color:#eef1f8}#instbar span,#instbar .ix{color:#98a2b8}}`;
    document.head.appendChild(s);
    el=document.createElement('div');el.id='instbar';el.setAttribute('role','dialog');el.setAttribute('aria-label','Instalar aplicativo');
    el.innerHTML=`<img src="${new URL('icon-192.png',location.href).href}" alt=""><div><b>Instalar ${cat?'o catálogo':'o sistema'} MultMix</b><span>${ios?'Toque em Compartilhar e depois em “Adicionar à Tela de Início”.':'Abra direto da tela inicial, como um aplicativo.'}</span></div>${ios?'':'<button class="ib">Instalar</button>'}<button class="ix" aria-label="Agora não">✕</button>`;
    document.body.appendChild(el);
    el.querySelector('.ix').onclick=()=>{localStorage[KEY]=Date.now();hide()};
    const b=el.querySelector('.ib');
    if(b)b.onclick=async()=>{if(!dip)return;dip.prompt();await dip.userChoice.catch(()=>{});dip=null;hide()};
  }
  const hide=()=>{if(el){el.remove();el=null}};
  const btns=()=>document.querySelectorAll('[data-install]');
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  function wire(){if(standalone())return;btns().forEach(b=>{if(!dip&&!ios)return;b.hidden=false;b.onclick=async()=>{
    if(dip){dip.prompt();await dip.userChoice.catch(()=>{});dip=null;btns().forEach(x=>x.hidden=true);hide()}
    else alert('No iPhone: toque em Compartilhar e depois em “Adicionar à Tela de Início”.')}})}
  addEventListener('DOMContentLoaded',wire);
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e;bar(false);wire()});
  addEventListener('appinstalled',()=>{hide();btns().forEach(x=>x.hidden=true)});
  if(ios)setTimeout(()=>bar(true),2500);
})();

/* ========= Controle de versão e atualização automática ========= */
(()=>{
  const V=String(window.APP_VERSION||'0'),K='mm_upd_try_';
  let applying=false,busyTimer=null,hadCtl=false,barEl=null;
  try{const u=new URL(location.href);if(u.searchParams.has('v')){u.searchParams.delete('v');history.replaceState(history.state,'',u.pathname+u.search+u.hash)}}catch(e){}
  const css=document.createElement('style');
  css.textContent=`#updbar{position:fixed;top:0;left:0;right:0;z-index:100;background:#00468f;color:#fff;padding:calc(10px + env(safe-area-inset-top,0px)) 14px 10px;text-align:center;font:600 14px/1.4 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.35)}
#updbar button{margin-left:10px;background:#ffc21a;color:#101828;border:0;border-radius:99px;padding:6px 14px;font:inherit;font-weight:800;cursor:pointer}
#updtoast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:100;background:#101828;color:#fff;padding:10px 16px;border-radius:99px;font:600 13px system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.4);max-width:90vw;text-align:center}`;
  document.head.appendChild(css);
  function show(msg,btn){
    if(!barEl){barEl=document.createElement('div');barEl.id='updbar';barEl.setAttribute('role','status');document.body.appendChild(barEl)}
    barEl.textContent=msg;
    if(btn){const b=document.createElement('button');b.textContent=btn.label;b.onclick=btn.fn;barEl.appendChild(b)}
  }
  function toast(m){const old=document.getElementById('updtoast');if(old)old.remove();const t=document.createElement('div');t.id='updtoast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),3500)}
  async function hard(v){
    try{const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)))}catch(e){}
    try{const rs=await navigator.serviceWorker.getRegistrations();await Promise.all(rs.map(r=>r.unregister()))}catch(e){}
    const u=new URL(location.href);u.searchParams.set('v',v||Date.now());location.replace(u.toString());
  }
  async function remote(){
    const r=await fetch('version.json?t='+Date.now(),{cache:'no-store'});
    if(!r.ok)throw new Error('http');return r.json();
  }
  function apply(info,manual){
    if(applying)return;
    const nv=String(info.version),k=K+nv,n=+sessionStorage.getItem(k)||0,busy=window.appBusy&&window.appBusy();
    if(n>=2&&!manual){show('Há uma versão nova ('+nv+') que não carregou. Feche e abra o aplicativo.');return}
    const go=()=>{applying=true;sessionStorage.setItem(k,n+1);show('Atualizando para a versão '+nv+'...');setTimeout(()=>hard(nv),900)};
    if(busy){
      if(manual){if(confirm('Há uma operação em andamento (venda ou janela aberta). Atualizar agora vai interrompê-la. Continuar?'))go();return}
      show('Nova versão '+nv+' disponível. Termine o que está fazendo e atualize.',{label:'Atualizar agora',fn:go});
      clearTimeout(busyTimer);busyTimer=setTimeout(()=>apply(info,false),15000);return;
    }
    go();
  }
  async function check(manual){
    if(applying)return;
    try{
      if(manual)toast('Verificando atualização...');
      if('serviceWorker' in navigator){const reg=await navigator.serviceWorker.getRegistration();if(reg)reg.update().catch(()=>{})}
      const info=await remote();
      if(info&&info.version&&String(info.version)!==V){apply(info,manual);return}
      if(manual)toast('Você está na versão mais recente ('+V+').');
    }catch(e){if(manual)toast('Não foi possível verificar agora. Confira a internet.')}
  }
  window.appCheck=()=>check(true);
  function label(){document.querySelectorAll('[data-appver]').forEach(b=>{b.textContent='Versão '+V;b.title='Toque para verificar atualização';b.onclick=()=>check(true)})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',label);else label();
  if('serviceWorker' in navigator){
    hadCtl=!!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadCtl)check(false)});
  }
  setTimeout(()=>check(false),1500);
  setInterval(()=>check(false),5*60*1000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check(false)});
  addEventListener('online',()=>check(false));
})();
