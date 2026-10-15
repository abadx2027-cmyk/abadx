// Abad X — lab: in-browser Python via Pyodide (lazy CDN) with graceful fallback sandbox
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.python=function(el,lab,ctx){
const {esc,ce}=ctx;let py=null,mode='loading';
el.innerHTML=`<div class="lab"><div class="tbar" style="border-bottom:1px solid rgba(56,189,248,.16)"><i></i><i></i><i></i><span id="pst">Python · loading…</span></div>
<div class="lbody"><p class="ldesc" id="pmsg">جارٍ تحميل Pyodide من CDN… إن فشل التحميل تُفعَّل بيئة بديلة محدودة.</p>
<label class="llab">editor.py</label><textarea class="ltxt" id="code" style="min-height:200px"></textarea>
<div class="lrow"><button class="lbtn" id="run">▶ Run</button><button class="lbtn s" id="clr">Clear out</button><button class="lbtn s" id="ex">Load example</button></div>
<label class="llab">stdout</label><div class="lout" id="out" style="min-height:120px"></div></div></div>`;
const code=el.querySelector('#code'),out=el.querySelector('#out'),pst=el.querySelector('#pst');
code.value=lab.starter||'print("Hello from Abad X")\nprint(2+2)\n';
function fbRun(src){// tiny fallback: print, variables, loops, hashlib.sha256, base64, list ops
 const lines=src.replace(/\r/g,'').split('\n');const env={};const buf=[];const pr=(...a)=>buf.push(a.map(String).join(' '));
 const hash=s=>{const c=crypto.subtle;return null}; // sync fallback sha via simple
 function sha256hex(s){// sync via TextEncoder + Subtle is async — use pure JS
  // tiny non-crypto for fallback only when WebCrypto unavailable sync — use precomputed via TextEncoder+manual
  return null}
 // Use async WebCrypto through blocked wait? Can't. Implement minimal sha256:
 const K=[];
 // Prefer: encode with TextEncoder and use a pure JS sha256
 function pureSha(msg){function rotr(n,x){return(x>>>n)|(x<<(32-n))}const utf=unescape(encodeURIComponent(msg));const bytes=[];for(let i=0;i<utf.length;i++)bytes.push(utf.charCodeAt(i));
  const bitLen=bytes.length*8;bytes.push(0x80);while((bytes.length%64)!==56)bytes.push(0);for(let i=7;i>=0;i--)bytes.push((bitLen/(2**(8*i)))&0xff);
  let h0=0x6a09e667,h1=0xbb67ae85,h2=0x3c6ef372,h3=0xa54ff53a,h4=0x510e527f,h5=0x9b05688c,h6=0x1f83d9ab,h7=0x5be0cd19;
  const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  for(let i=0;i<bytes.length;i+=64){const w=new Array(64);for(let j=0;j<16;j++)w[j]=(bytes[i+j*4]<<24)|(bytes[i+j*4+1]<<16)|(bytes[i+j*4+2]<<8)|bytes[i+j*4+3];
   for(let j=16;j<64;j++){const s0=rotr(7,w[j-15])^rotr(18,w[j-15])^(w[j-15]>>>3);const s1=rotr(17,w[j-2])^rotr(19,w[j-2])^(w[j-2]>>>10);w[j]=(w[j-16]+s0+w[j-7]+s1)|0}
   let a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,h=h7;for(let j=0;j<64;j++){const S1=rotr(6,e)^rotr(11,e)^rotr(25,e);const ch=(e&f)^((~e)&g);const t1=(h+S1+ch+k[j]+w[j])|0;const S0=rotr(2,a)^rotr(13,a)^rotr(22,a);const maj=(a&b)^(a&c)^(b&c);const t2=(S0+maj)|0;h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0}
   h0=(h0+a)|0;h1=(h1+b)|0;h2=(h2+c)|0;h3=(h3+d)|0;h4=(h4+e)|0;h5=(h5+f)|0;h6=(h6+g)|0;h7=(h7+h)|0}
  return[h0,h1,h2,h3,h4,h5,h6,h7].map(x=>(x>>>0).toString(16).padStart(8,'0')).join('')}
 // Evaluate via Function with a tiny subset by transforming common patterns — too hard.
 // Instead run via Pyodide-like: use Function wrapping of Python? No — use a real tiny interpreter for exercises.
 // Best fallback: load python through Skulpt? Keep pure SHA + eval of restricted JS transpilation of print/for/if/vars.
 try{
  // Attempt: use new Function to run a JS-translated subset by calling Pyodide-like API through regex transpile
  let js=src;
  // Only support running via Pyodide; for fallback expose hashlib/base64 helpers and eval simple prints via python-like
  const helpers={print:(...a)=>pr(...a),len:a=>a.length,range:(...a)=>{let s=0,e,st=1;if(a.length===1)e=a[0];else{s=a[0];e=a[1];st=a[2]||1}const o=[];for(let i=s;st>0?i<e:i>e;i+=st)o.push(i);return o},
   list:a=>Array.from(a),str:a=>String(a),int:a=>parseInt(a),
   hashlib:{sha256:s=>({hexdigest:()=>pureSha(String(s))})},
   base64:{b64encode:s=>btoa(unescape(encodeURIComponent(String(s)))),b64decode:s=>decodeURIComponent(escape(atob(String(s))))},
   open:()=>{throw new Error('open() غير متاح في الوضع البديل — استخدم المتغيرات')}};
  // Use brython-like: convert python to JS roughly for the exercises
  // Simpler approach: if Pyodide fails, run with new Function after converting with a minimal Python→JS
  function transpile(py){const L=py.split('\n');const out=[];let ind=[];
   const closeTo=n=>{while(ind.length>n){out.push('}'.repeat(1));ind.pop()}};
   for(let raw of L){if(/^\s*#/.test(raw)||!raw.trim())continue;const sp=raw.match(/^\s*/)[0].length;const lvl=Math.floor(sp/4);closeTo(lvl);let s=raw.trim();
    let m;if((m=/^print\((.*)\)$/.exec(s))){out.push('print('+m[1].replace(/f"([^"]*)"/g,(x,b)=>'`'+b.replace(/\{([^}]+)\}/g,'${$1}')+'`')+')');continue}
    if((m=/^for\s+(\w+)\s+in\s+(.+):\s*$/.exec(s))){out.push('for(const '+m[1]+' of '+m[2]+'){');ind.push(1);continue}
    if((m=/^if\s+(.+):\s*$/.exec(s))){out.push('if('+m[1].replace(/\band\b/g,'&&').replace(/\bor\b/g,'||').replace(/\bnot\b/g,'!').replace(/==/g,'===')+'){');ind.push(1);continue}
    if((m=/^elif\s+(.+):\s*$/.exec(s))){out.push('}else if('+m[1].replace(/\band\b/g,'&&').replace(/\bor\b/g,'||')+'){');continue}
    if(/^else:\s*$/.test(s)){out.push('}else{');continue}
    if((m=/^(\w+)\s*=\s*(.+)$/.exec(s))){out.push('let '+m[1]+'='+m[2].replace(/True/g,'true').replace(/False/g,'false').replace(/None/g,'null')+';');continue}
    out.push(s+';')}
   closeTo(0);return out.join('\n')}
  const jsCode=transpile(src);
  const fn=new Function('print','len','range','list','str','int','hashlib','base64',...Object.keys(env),jsCode);
  fn(helpers.print,helpers.len,helpers.range,helpers.list,helpers.str,helpers.int,helpers.hashlib,helpers.base64);
  return buf.join('\n')||'(no output)'}catch(e){return 'FallbackError: '+e.message+'\n(جرّب بناءً أبسط أو أعد تحميل الصفحة لـ Pyodide)'}}
async function load(){try{if(!window.loadPyodide){await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
 py=await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'});mode='pyodide';pst.textContent='Python 3 · Pyodide';el.querySelector('#pmsg').textContent='Pyodide جاهز — نفّذ كود بايثون حقيقي في المتصفح.';}catch(e){mode='fallback';pst.textContent='Python · fallback';el.querySelector('#pmsg').textContent='تعذّر تحميل Pyodide — الوضع البديل يدعم print/for/if وhashlib.sha256 وbase64 فقط.';console.warn(e)}}
load();
el.querySelector('#run').onclick=async()=>{out.textContent='…';try{if(mode==='pyodide'&&py){py.setStdout({batched:s=>{out.textContent+=(out.textContent==='…'?'':'\n')+s}});py.setStderr({batched:s=>{out.textContent+=(out.textContent==='…'?'':'\n')+'[err] '+s}});out.textContent='';await py.runPythonAsync(code.value);if(!out.textContent)out.textContent='(no output)'}
 else out.textContent=fbRun(code.value)}catch(e){out.textContent=String(e)}};
el.querySelector('#clr').onclick=()=>out.textContent='';
el.querySelector('#ex').onclick=()=>{code.value=lab.example||`import hashlib, base64
print(hashlib.sha256(b"abadx").hexdigest())
print(base64.b64encode(b"flag").decode())
ports="22/tcp open ssh\\n80/tcp open http\\n443/tcp open https"
for line in ports.splitlines():
    if "open" in line:
        print(line.split("/")[0])
`};
return{focus:()=>code.focus()};
};})();
