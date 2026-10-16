// Abad X — room engine: loads assets/rooms/<id>.js, renders tasks/questions, hosts pluggable lab panels (assets/labs/<type>.js)
(()=>{
const V='2';
const still=/[?&]still\b/.test(location.search)||matchMedia('(prefers-reduced-motion: reduce)').matches;
if(still)document.documentElement.classList.add('still');
const $=s=>document.querySelector(s),ce=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
window.ABADX_LABS=window.ABADX_LABS||{};
const loadScript=src=>new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>no(new Error('load '+src));document.head.appendChild(s)});
const id=new URLSearchParams(location.search).get('r')||'linux-fundamentals';
const fail=m=>{$('#intro').innerHTML=m+' <a href="self-learning.html">← العودة للغرف</a>';};
if(!/^[a-z0-9-]{1,40}$/.test(id))return fail('معرّف غرفة غير صالح.');
loadScript('assets/rooms/'+id+'.js?v='+V).then(()=>{const R=window.ABADX_ROOM;if(!R||R.id!==id)throw 0;return start(R)}).catch(e=>{console.warn(e);fail('تعذّر تحميل الغرفة.')});

async function start(R){
const isEn=()=>document.documentElement.getAttribute('data-lang')==='en';
const setTitle=()=>{document.title='Abad X | '+(isEn()&&R.en?R.en:R.ar)};setTitle();document.addEventListener('abadx:langchange',setTitle);
if(R.wide)document.body.classList.add('wide');
const TOTAL=R.tasks.reduce((a,t)=>a+t.questions.reduce((b,q)=>b+q.pts,0),0);
const KEY='abadx_room_'+R.id;
let st={};try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
st.solved=st.solved||{};st.hints=st.hints||{};st.pts=st.pts|0;st.maxpts=TOTAL;st.tasks=R.tasks.length;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};save();
const norm=s=>s.toLowerCase().trim().replace(/\s+/g,' ');
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(norm(s)));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function taskDone(t){return t.questions.every((q,i)=>st.solved[t.n+'.'+i])}
function doneCount(){return R.tasks.filter(taskDone).length}
function renderHero(){const prog=TOTAL?Math.min(100,Math.round(st.pts/TOTAL*100)):0;const C=2*Math.PI*40;st.done=doneCount();save();
$('#hero').innerHTML=`<div class="hex"><svg viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${R.icon}</svg></div>
<div class="hhead"><h1>${R.ar} <span class="en">${R.en}</span></h1>
<div class="meta"><span class="pill dif">● ${R.difficulty[0]} · ${R.difficulty[1]}</span><span class="pill">⏱ ${R.minutes} ${isEn()?'min':'دقيقة'}</span><span class="pill pts">${st.pts} / ${TOTAL} pts</span>${R.tags.map(t=>'<span class="pill">#'+t+'</span>').join('')}</div></div>
<div class="ring"><svg width="92" height="92"><circle class="bg2" cx="46" cy="46" r="40" fill="none" stroke-width="7"/><circle class="fg" cx="46" cy="46" r="40" fill="none" stroke-width="7" stroke-dasharray="${C}" stroke-dashoffset="${C-C*prog/100}"/></svg><b>${prog}%</b><small>${doneCount()}/${R.tasks.length} ${isEn()?'tasks':'مهام'}</small></div>`;}
$('#intro').textContent=R.intro;$('#intro').setAttribute('lang','ar');$('#intro').setAttribute('dir','rtl');
const TASKS=$('#tasks');
const fixNL=s=>String(s).replace(/\\n/g,'\n');
function bodyHTML(b){return b.map(x=>{
 if(x.h)return`<h3 lang="ar" dir="rtl">${x.h}</h3>`;if(x.p)return`<p lang="ar" dir="rtl">${x.p}</p>`;
 if(x.code)return`<div class="code"><button class="cpy" type="button">نسخ · Copy</button>${esc(fixNL(x.code))}</div>`;
 if(x.tip)return`<div class="call tip"><b>💡 تلميح</b><span lang="ar" dir="rtl">${x.tip}</span></div>`;
 if(x.warn)return`<div class="call warn"><b>⚠ تنبيه</b><span lang="ar" dir="rtl">${x.warn}</span></div>`;
 if(x.html)return x.html;return''}).join('')}
R.tasks.forEach(t=>{
 const el=ce('div','task'+(taskDone(t)?' done':''));el.id='task'+t.n;
 el.innerHTML=`<button class="thead" aria-expanded="false"><span class="tnum">${t.n}</span>
  <h2>${t.ar} <span class="en">Task ${t.n} · ${t.en}</span></h2>
  <svg class="chk" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" stroke="#4ade80" stroke-width="1.6"/><path d="M8 12.5 11 15.5 16 9"/></svg>
  <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>
  <div class="tbody">${bodyHTML(t.body)}${t.questions.map((q,i)=>{const sv=st.solved[t.n+'.'+i];
   return`<div class="q${sv?' ok':''}" id="q${t.n}_${i}"><p class="qt" lang="ar" dir="rtl">${q.q} <span style="color:var(--b);font-family:var(--mono)">(+${q.pts})</span></p>
    <div class="qrow"><input aria-label="${esc(q.q.replace(/<[^>]+>/g,''))}" placeholder="${q.ph||''}" ${sv?'disabled value="✓ إجابة صحيحة"':''}><button class="sub" ${sv?'disabled':''}>${sv?'تم ✓':'تحقّق · Submit'}</button></div>
    <p class="fb" aria-live="polite"></p>
    ${q.hint?`<button class="hintbtn" type="button">💡 تلميح (−5 نقاط)</button><p lang="ar" dir="rtl" class="hinttext${st.hints[t.n+'.'+i]?' show':''}">${q.hint}</p>`:''}</div>`}).join('')}</div>`;
 TASKS.appendChild(el);
});
TASKS.addEventListener('click',e=>{const h=e.target.closest('.thead');if(h){const t=h.parentNode;const open=t.classList.toggle('open');h.setAttribute('aria-expanded',open);return}
 const c=e.target.closest('.cpy');if(c){const code=c.parentNode.textContent.replace('نسخ · Copy','');navigator.clipboard?.writeText(code.trim()).catch(()=>{});c.textContent='تم النسخ ✓';setTimeout(()=>c.textContent='نسخ · Copy',1200);return}
 const hb=e.target.closest('.hintbtn');if(hb){const q=hb.closest('.q');const[,tn,qi]=q.id.match(/q(\d+)_(\d+)/);const k=tn+'.'+qi;
   q.querySelector('.hinttext').classList.add('show');if(!st.hints[k]){st.hints[k]=1;if(!st.solved[k]){st.pts=Math.max(0,st.pts-5);save();renderHero()}}return}
});
TASKS.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('.qrow input')){e.preventDefault();e.target.closest('.qrow').querySelector('.sub').click()}});
TASKS.addEventListener('click',async e=>{const b=e.target.closest('.sub');if(!b||b.disabled)return;
 const q=b.closest('.q'),[,tn,qi]=q.id.match(/q(\d+)_(\d+)/),input=q.querySelector('input'),fb=q.querySelector('.fb');
 const t=R.tasks.find(x=>x.n==+tn),qd=t.questions[+qi],val=input.value;
 if(!val.trim()){fb.className='fb r';fb.textContent='أدخل إجابة أولاً.';return}
 const ok=(await sha(val))===qd.hash;
 if(ok){st.solved[tn+'.'+qi]=1;st.pts+=qd.pts;save();q.classList.add('ok');input.disabled=true;input.value='✓ إجابة صحيحة';b.disabled=true;b.textContent='تم ✓';
  fb.className='fb g';fb.textContent='صحيح! +'+qd.pts+' نقطة';$('#live').textContent='إجابة صحيحة، +'+qd.pts+' نقطة';renderHero();
  const tEl=$('#task'+tn);if(taskDone(t)&&!tEl.classList.contains('done')){tEl.classList.add('done');$('#live').textContent='اكتملت المهمة '+tn;}
  checkComplete();
 }else{q.classList.remove('shake');void q.offsetWidth;if(!still)q.classList.add('shake');fb.className='fb r';fb.textContent='إجابة غير صحيحة — حاول مجدداً.'+(qd.hint?' جرّب التلميح.':'');$('#live').textContent='إجابة غير صحيحة'}
});
function checkComplete(){if(doneCount()===R.tasks.length){st.complete=1;save();showCel()}}
function showCel(){$('#celn').textContent=R.ar+' · '+R.en;$('#celp').textContent='مجموع نقاطك: '+st.pts+' / '+TOTAL;$('#cel').classList.add('show')}
$('#celclose').onclick=e=>{e.preventDefault();$('#cel').classList.remove('show')};
renderHero();document.addEventListener('abadx:langchange',renderHero);
{const t=R.tasks.find(t=>!taskDone(t))||R.tasks[0];const el=$('#task'+t.n);el.classList.add('open');el.querySelector('.thead').setAttribute('aria-expanded','true')}
if(st.complete)setTimeout(showCel,400);

// ===== lab host =====
const labs=R.labs||(R.fs?[{type:'terminal',fs:R.fs}]:[]);
const tabs=$('#labtabs'),panes=$('#panes'),tp=$('#tp'),tgl=$('#tgl');
if(!labs.length){tp.remove();tgl.remove();return}
if(labs[0].title)tgl.textContent='⌨ '+labs[0].title.split(' · ')[0]+' · Lab';
const types=[...new Set(labs.map(l=>l.type))];
await Promise.all(types.map(ty=>window.ABADX_LABS[ty]?0:loadScript('assets/labs/'+ty+'.js?v='+V)));
const inst=[];
labs.forEach((lab,i)=>{
 const pane=ce('div','pane');pane.id='pane'+i;pane.setAttribute('role','tabpanel');if(i)pane.hidden=true;panes.appendChild(pane);
 if(labs.length>1){const b=ce('button','',esc(lab.title||lab.type));b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',i?'false':'true');b.setAttribute('aria-controls',pane.id);
  b.onclick=()=>{[...tabs.children].forEach((x,j)=>x.setAttribute('aria-selected',j===i));[...panes.children].forEach((p,j)=>p.hidden=j!==i);inst[i]&&inst[i].show&&inst[i].show()};tabs.appendChild(b)}
 try{inst[i]=window.ABADX_LABS[lab.type](pane,lab,{R,esc,ce,still,fixNL})||{}}catch(err){console.error(err);pane.innerHTML='<div class="lab"><div class="lbody er">تعذّر تشغيل المختبر.</div></div>'}
});
if(labs.length<2)tabs.remove();
if(innerWidth<=980)tp.classList.add('drawer');
addEventListener('resize',()=>{if(innerWidth<=980)tp.classList.add('drawer');else tp.classList.remove('drawer','open')});
tgl.onclick=()=>{const o=tp.classList.toggle('open');tgl.setAttribute('aria-expanded',o);if(o){const i=[...panes.children].findIndex(p=>!p.hidden);inst[i]&&inst[i].focus&&inst[i].focus()}};
window.ABADX_ENGINE={R,labs:inst};
}
})();
