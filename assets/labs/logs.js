// Abad X — lab: searchable log viewer for SOC intro
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.logs=function(el,lab,ctx){
const {esc,ce}=ctx;const logs=lab.logs||[];
el.innerHTML=`<div class="lab"><div class="tbar" style="border-bottom:1px solid rgba(56,189,248,.16)"><i></i><i></i><i></i><span>SOC Log Viewer · ${logs.length} events</span></div>
<div class="lbody"><div class="lrow"><input class="lin" id="q" placeholder="بحث: IP, user, status, FAIL…"><select class="lsel" id="src" style="max-width:140px"><option value="">كل المصادر</option>${[...new Set(logs.map(l=>l.src))].map(s=>'<option>'+esc(s)+'</option>').join('')}</select>
<button class="lbtn" id="go">Filter</button><button class="lbtn s" id="clr">Reset</button></div>
<p class="ldesc" id="cnt"></p>
<div style="max-height:420px;overflow:auto;border:1px solid rgba(56,189,248,.2);border-radius:8px"><table class="ltable"><thead><tr><th>Time</th><th>Src</th><th>Host/IP</th><th>User</th><th>Action</th><th>Status</th><th>Detail</th></tr></thead><tbody id="tb"></tbody></table></div></div></div>`;
const tb=el.querySelector('#tb'),q=el.querySelector('#q'),src=el.querySelector('#src'),cnt=el.querySelector('#cnt');
function render(list){tb.innerHTML='';list.forEach(l=>{const tr=ce('tr');const bad=/FAIL|DENIED|BLOCK|404|attack|bruteforce|sqlmap|nikto/i.test((l.status||'')+' '+(l.detail||'')+' '+(l.action||''));
 tr.innerHTML=`<td>${esc(l.t)}</td><td>${esc(l.src)}</td><td>${esc(l.ip||'')}</td><td>${esc(l.user||'-')}</td><td>${esc(l.action||'')}</td><td style="color:${bad?'var(--no)':'var(--ok)'}">${esc(l.status||'')}</td><td>${esc(l.detail||'')}</td>`;tb.appendChild(tr)});cnt.textContent=list.length+' / '+logs.length+' حدث'}
function apply(){const t=q.value.trim().toLowerCase();const s=src.value;render(logs.filter(l=>(!s||l.src===s)&&(!t||[l.ip,l.user,l.action,l.status,l.detail,l.t].join(' ').toLowerCase().includes(t))))}
el.querySelector('#go').onclick=apply;el.querySelector('#clr').onclick=()=>{q.value='';src.value='';apply()};q.onkeydown=e=>{if(e.key==='Enter')apply()};apply();
return{focus:()=>q.focus()};
};})();
