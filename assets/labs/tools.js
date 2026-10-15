// Abad X — lab: interactive crypto / subnet / misc tools panel
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.tools=function(el,lab,ctx){
const {esc,ce}=ctx;const tools=lab.tools||['base64','caesar','sha256','subnet'];
el.innerHTML=`<div class="lab"><div class="tbar" style="border-bottom:1px solid rgba(56,189,248,.16)"><i></i><i></i><i></i><span>AbadX Tools</span></div><div class="lbody" id="tb"></div></div>`;
const box=el.querySelector('#tb');
function card(title,html){const d=ce('div','lcard');d.innerHTML=`<h4>${title}</h4>${html}`;box.appendChild(d);return d}
async function sha256(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
if(tools.includes('base64')){const c=card('Base64 Encode / Decode',`<div class="lrow"><input class="lin" data-i placeholder="نص…"><button class="lbtn" data-e>Encode</button><button class="lbtn s" data-d>Decode</button></div><div class="lout" data-o>—</div>`);
 c.querySelector('[data-e]').onclick=()=>{try{c.querySelector('[data-o]').textContent=btoa(unescape(encodeURIComponent(c.querySelector('[data-i]').value)))}catch(e){c.querySelector('[data-o]').textContent=String(e)}};
 c.querySelector('[data-d]').onclick=()=>{try{c.querySelector('[data-o]').textContent=decodeURIComponent(escape(atob(c.querySelector('[data-i]').value)))}catch(e){c.querySelector('[data-o]').textContent='Invalid Base64'}}}
if(tools.includes('caesar')){const c=card('Caesar Cipher',`<div class="lrow"><input class="lin" data-i placeholder="نص…"><input class="lin" data-k type="number" value="3" style="max-width:80px" title="shift"><button class="lbtn" data-e>Encrypt</button><button class="lbtn s" data-d>Decrypt</button></div><div class="lout" data-o>—</div>`);
 const shift=(s,k)=>s.replace(/[A-Za-z]/g,ch=>{const b=ch<=90?65:97;return String.fromCharCode(((ch.charCodeAt(0)-b+k)%26+26)%26+b)});
 c.querySelector('[data-e]').onclick=()=>c.querySelector('[data-o]').textContent=shift(c.querySelector('[data-i]').value,+c.querySelector('[data-k]').value);
 c.querySelector('[data-d]').onclick=()=>c.querySelector('[data-o]').textContent=shift(c.querySelector('[data-i]').value,-c.querySelector('[data-k]').value)}
if(tools.includes('sha256')){const c=card('SHA-256 (WebCrypto)',`<div class="lrow"><input class="lin" data-i placeholder="نص…"><button class="lbtn" data-e>Hash</button></div><div class="lout" data-o>—</div>`);
 c.querySelector('[data-e]').onclick=async()=>c.querySelector('[data-o]').textContent=await sha256(c.querySelector('[data-i]').value)}
if(tools.includes('crack')){const wl=lab.wordlist||['password','admin','123456','abadx','letmein','qwerty','secret','welcome','dragon','monkey'];
 const c=card('Hash cracker (wordlist)',`<p class="ldesc">جرّب كلمات من القائمة المحلية ضد SHA-256.</p><div class="lrow"><input class="lin" data-i placeholder="sha256 hex"><button class="lbtn" data-e>Crack</button></div><div class="lout" data-o>—</div>`);
 c.querySelector('[data-e]').onclick=async()=>{const t=c.querySelector('[data-i]').value.trim().toLowerCase();for(const w of wl){if(await sha256(w)===t){c.querySelector('[data-o]').textContent='FOUND: '+w;return}}c.querySelector('[data-o]').textContent='Not found in wordlist'}}
if(tools.includes('subnet')){const c=card('Subnet calculator',`<div class="lrow"><input class="lin" data-ip placeholder="IP e.g. 192.168.1.10" value="${lab.ip||'192.168.1.10'}"><input class="lin" data-p type="number" min="1" max="32" value="${lab.prefix||24}" style="max-width:90px" title="CIDR"><button class="lbtn" data-e>Calculate</button></div><div class="lout" data-o>—</div>`);
 const ip2n=ip=>ip.split('.').reduce((a,o)=>(a<<8)+(+o>>>0),0)>>>0;const n2ip=n=>[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
 c.querySelector('[data-e]').onclick=()=>{const ip=c.querySelector('[data-ip]').value.trim(),p=+c.querySelector('[data-p]').value;if(!/^\d+\.\d+\.\d+\.\d+$/.test(ip)||p<1||p>32){c.querySelector('[data-o]').textContent='مدخلات غير صالحة';return}
  const mask=p===0?0:(0xFFFFFFFF<<(32-p))>>>0;const n=ip2n(ip);const net=n&mask;const bcast=net|((~mask)>>>0);const hosts=p>=31?0:(2**(32-p))-2;
  c.querySelector('[data-o]').textContent=['Network: '+n2ip(net)+'/'+p,'Broadcast: '+n2ip(bcast),'Netmask: '+n2ip(mask),'Wildcard: '+n2ip((~mask)>>>0),'Host range: '+(hosts?n2ip(net+1)+' - '+n2ip(bcast-1):'n/a'),'Usable hosts: '+hosts].join('\n')}}
return{focus:()=>box.querySelector('input')?.focus()};
};})();
