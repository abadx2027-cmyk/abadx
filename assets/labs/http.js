// Abad X — lab: HTTP intercept / repeater against a fake in-browser app
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.http=function(el,lab,ctx){
const {esc,ce}=ctx;const app=lab.app||{};
el.innerHTML=`<div class="lab"><div class="tbar" style="border-bottom:1px solid rgba(56,189,248,.16)"><i></i><i></i><i></i><span>AbadX Proxy · Intercept / Repeater</span></div>
<div class="lbody"><p class="ldesc">عدّل الطلب ثم أرسله إلى التطبيق المحاكى. لا يوجد خادم حقيقي — كل الاستجابات تُولَّد محلياً.</p>
<label class="llab">Request</label><textarea class="ltxt" id="req"></textarea>
<div class="lrow"><button class="lbtn" id="send">Send →</button><button class="lbtn s" id="reset">Reset</button><span class="tag" id="st">Ready</span></div>
<label class="llab">Response</label><div class="lout" id="res" style="min-height:160px">—</div>
<label class="llab">Cookies jar</label><div class="lout" id="ck" style="min-height:40px"></div></div></div>`;
const req=el.querySelector('#req'),res=el.querySelector('#res'),ck=el.querySelector('#ck'),st=el.querySelector('#st');
let cookies={};(lab.cookies||[]).forEach(c=>cookies[c.name]=c.value);
const def=lab.request||'GET / HTTP/1.1\nHost: shop.abadx.lab\nUser-Agent: AbadX-Browser/1.0\nAccept: */*\n\n';
req.value=def;function showCk(){ck.textContent=Object.keys(cookies).map(k=>k+'='+cookies[k]).join('; ')||'(empty)'}
function parseReq(t){const lines=t.replace(/\r/g,'').split('\n');const[method,path,ver]=(lines[0]||'').split(/\s+/);const headers={};let i=1;for(;i<lines.length;i++){if(lines[i]===''){i++;break}const c=lines[i].indexOf(':');if(c>0)headers[lines[i].slice(0,c).toLowerCase()]=lines[i].slice(c+1).trim()}
 return{method,path,ver,headers,body:lines.slice(i).join('\n')}}
function handle(r){if(typeof app.handle==='function')return app.handle(r,cookies);const path=(r.path||'/').split('?')[0];const q=Object.fromEntries(new URLSearchParams((r.path||'').split('?')[1]||''));
 // declarative routes: [{method,path,status,body,headers,setCookies,when:{query,header,bodyIncludes,cookie}}]
 if(Array.isArray(app.routes)){for(const rt of app.routes){if(rt.method&&rt.method!==r.method)continue;if(rt.path&&rt.path!==path&&rt.path!=='*')continue;
   const w=rt.when||{};if(w.query){let ok=true;for(const[k,v] of Object.entries(w.query)){if(String(q[k])!==String(v))ok=false}if(!ok)continue}
   if(w.header){let ok=true;for(const[k,v] of Object.entries(w.header)){if((r.headers[k.toLowerCase()]||'')!==v)ok=false}if(!ok)continue}
   if(w.bodyIncludes&&!(r.body||'').includes(w.bodyIncludes))continue;
   if(w.cookie){let ok=true;for(const[k,v] of Object.entries(w.cookie)){if(cookies[k]!==v)ok=false}if(!ok)continue}
   let body=rt.body||'';if(rt.flag)body+=(body&&!body.endsWith('\n')?'\n':'')+'FLAG: '+rt.flag;
   // simple template
   body=body.replace(/\{\{id\}\}/g,q.id||'');
   return{status:rt.status||200,reason:rt.reason,headers:Object.assign({'Content-Type':'text/html'},rt.headers||{}),body,setCookies:rt.setCookies||[]}}
  return{status:404,headers:{'Content-Type':'text/plain'},body:'Not Found'}}
 const routes=app.routes||{};const key=typeof routes==='object'&&!Array.isArray(routes)?Object.keys(routes).find(k=>{const[m,p]=k.split(' ');return(!m||m===r.method)&&(p===path||p==='*')}):null;
 if(key&&typeof routes[key]==='function')return routes[key](r,cookies,q);return{status:404,headers:{'Content-Type':'text/plain'},body:'Not Found'}}
el.querySelector('#send').onclick=()=>{st.textContent='Sending…';const r=parseReq(req.value);if(r.headers.cookie)r.headers.cookie.split(';').forEach(p=>{const[k,...v]=p.trim().split('=');cookies[k]=v.join('=')});
  try{const o=handle(r)||{status:500,body:'error'};(o.setCookies||[]).forEach(c=>cookies[c.name]=c.value);showCk();
   res.textContent='HTTP/1.1 '+(o.status||200)+' '+(o.reason||({200:'OK',302:'Found',401:'Unauthorized',403:'Forbidden',404:'Not Found',500:'Error'}[o.status]||''))+'\n'+Object.entries(o.headers||{}).map(([k,v])=>k+': '+v).join('\n')+'\n\n'+(o.body||'');st.textContent='HTTP '+(o.status||200)}catch(e){res.textContent=String(e);st.textContent='Error'}};
el.querySelector('#reset').onclick=()=>{req.value=def;res.textContent='—';st.textContent='Ready'};showCk();
return{focus:()=>req.focus()};
};})();
