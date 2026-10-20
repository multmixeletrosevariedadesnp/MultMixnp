/* MultMix: instalação como aplicativo (PWA) */
(()=>{
  if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
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
    el.innerHTML=`<img src="${new URL('../icon-192.png',location.href).href}" alt=""><div><b>Instalar ${cat?'o catálogo':'o sistema'} MultMix</b><span>${ios?'Toque em Compartilhar e depois em “Adicionar à Tela de Início”.':'Abra direto da tela inicial, como um aplicativo.'}</span></div>${ios?'':'<button class="ib">Instalar</button>'}<button class="ix" aria-label="Agora não">✕</button>`;
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
