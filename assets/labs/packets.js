// Abad X — lab: fake Wireshark-like packet list + details + simple display filter
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.packets=function(el,lab,ctx){
const {esc,ce}=ctx;const pkts=lab.packets||[];
el.innerHTML=`<div class="lab"><div class="tbar" style="border-bottom:1px solid rgba(56,189,248,.16)"><i></i><i></i><i></i><span>AbadX Capture · ${pkts.length} packets</span></div>
<div class="lbody"><label class="llab">Display filter</label>
<div class="lrow"><input class="lin" id="pf" placeholder="ip.addr==10.0.0.5 && tcp.port==80  |  http  |  dns  |  tcp"><button class="lbtn" id="pgo">Apply</button><button class="lbtn s" id="pclr">Clear</button></div>
<div style="max-height:220px;overflow:auto;border:1px solid rgba(56,189,248,.2);border-radius:8px"><table class="ltable"><thead><tr><th>No.</th><th>Time</th><th>Source</th><th>Destination</th><th>Proto</th><th>Info</th></tr></thead><tbody id="ptb"></tbody></table></div>
<label class="llab">Packet details</label><div class="lout" id="pd" style="min-height:120px">اختر حزمة…</div>
<label class="llab">Hex dump (partial)</label><div class="lout" id="ph" style="min-height:60px;color:#8aa0c2"></div></div></div>`;
const tb=el.querySelector('#ptb'),pd=el.querySelector('#pd'),ph=el.querySelector('#ph'),pf=el.querySelector('#pf');let sel=null,view=pkts.slice();
function match(p,f){if(!f)return true;f=f.trim();const parts=f.split(/\s*&&\s*/);return parts.every(part=>{part=part.trim();let m;
 if(part==='http')return p.proto==='HTTP'||/HTTP\//.test(p.info);if(part==='dns')return p.proto==='DNS';if(part==='tcp')return p.proto==='TCP'||p.proto==='HTTP'||p.sport&&p.dport;
 if(part==='udp')return p.proto==='UDP'||p.proto==='DNS';if(part==='icmp')return p.proto==='ICMP';
 if((m=/^ip\.addr\s*==\s*([\d.]+)$/i.exec(part)))return p.src===m[1]||p.dst===m[1];
 if((m=/^ip\.src\s*==\s*([\d.]+)$/i.exec(part)))return p.src===m[1];if((m=/^ip\.dst\s*==\s*([\d.]+)$/i.exec(part)))return p.dst===m[1];
 if((m=/^tcp\.port\s*==\s*(\d+)$/i.exec(part)))return String(p.sport)===m[1]||String(p.dport)===m[1];
 if((m=/^udp\.port\s*==\s*(\d+)$/i.exec(part)))return String(p.sport)===m[1]||String(p.dport)===m[1];
 if((m=/^frame\.number\s*==\s*(\d+)$/i.exec(part)))return String(p.n)===m[1];
 return (p.info||'').toLowerCase().includes(part.toLowerCase())||(p.proto||'').toLowerCase()===part.toLowerCase()})}
function render(){tb.innerHTML='';view.forEach(p=>{const tr=ce('tr');tr.innerHTML=`<td>${p.n}</td><td>${p.t}</td><td>${esc(p.src)}</td><td>${esc(p.dst)}</td><td>${esc(p.proto)}</td><td>${esc(p.info)}</td>`;
 tr.onclick=()=>{[...tb.children].forEach(x=>x.classList.remove('sel'));tr.classList.add('sel');sel=p;show(p)};tb.appendChild(tr)});if(!view.length)tb.innerHTML='<tr><td colspan="6" class="mut">لا نتائج</td></tr>'}
function show(p){pd.innerHTML=esc((p.details||[]).join('\n'));ph.textContent=p.hex||'—'}
function apply(){view=pkts.filter(p=>match(p,pf.value));render()}
el.querySelector('#pgo').onclick=apply;el.querySelector('#pclr').onclick=()=>{pf.value='';apply()};pf.onkeydown=e=>{if(e.key==='Enter')apply()};
render();return{focus:()=>pf.focus()};
};})();
