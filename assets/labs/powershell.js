// Abad X — lab: simulated PowerShell (Get-ChildItem, Get-Process, Get-Service, Get-LocalUser, Select/Where basics)
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.powershell=function(el,lab,ctx){
const {esc,ce}=ctx;const FS=lab.fs||{};const USER=FS.user||'Student';const COMP=FS.host||'ABADX-WIN';
const tree=JSON.parse(JSON.stringify(FS.tree||{}));
const procs=lab.processes||[{Id:4,ProcessName:'System',CPU:0.1},{Id:812,ProcessName:'lsass',CPU:1.2},{Id:1404,ProcessName:'svchost',CPU:3.4},{Id:2208,ProcessName:'explorer',CPU:12.1},{Id:3340,ProcessName:'powershell',CPU:4.5},{Id:4512,ProcessName:'AbadXAgent',CPU:0.8}];
const svcs=lab.services||[{Name:'Spooler',Status:'Running',DisplayName:'Print Spooler'},{Name:'WinDefend',Status:'Running',DisplayName:'Microsoft Defender Antivirus Service'},{Name:'wuauserv',Status:'Stopped',DisplayName:'Windows Update'},{Name:'AbadXSvc',Status:'Running',DisplayName:'Abad X Lab Service'},{Name:'RemoteRegistry',Status:'Stopped',DisplayName:'Remote Registry'}];
const users=lab.users||[{Name:'Administrator',Enabled:true,Description:'Built-in account'},{Name:'Student',Enabled:true,Description:'Lab trainee'},{Name:'Guest',Enabled:false,Description:'Built-in guest'},{Name:'svc_backup',Enabled:true,Description:'Backup service account ABADX{powershell_user}'}];
let cwd=['C:','Users',USER];
el.innerHTML=`<div class="term-wrap scan"><div class="tbar"><i></i><i></i><i></i><span class="tbt">PS ${COMP}</span></div>
<div class="term" role="log"></div><form class="tinput"><span class="pr"></span><input autocomplete="off" spellcheck="false" aria-label="PowerShell"></form></div>`;
const term=el.querySelector('.term'),tin=el.querySelector('input'),tpr=el.querySelector('.tinput .pr'),HIST=[],hi={i:0};
const out=(t,c)=>{const d=ce('div',c||'');d.innerHTML=/ABADX\{/.test(t)?esc(t).replace(/(ABADX\{[^}]*\})/g,'<span class="fl">$1</span>'):esc(t);term.appendChild(d);term.scrollTop=term.scrollHeight};
const path=()=>cwd.join('\\');const setP=()=>{tpr.textContent='PS '+path()+'> ';el.querySelector('.tbt').textContent='PS '+path()};
function node(parts){let n={d:{'C:':{d:tree}}};for(const p of parts){if(!n.d||!(p in n.d))return null;n=n.d[p]}return n}
function resolve(p){if(!p||p==='.')return{parts:cwd.slice(),node:node(cwd)};let parts;if(/^[A-Za-z]:/.test(p))parts=p.replace(/\//g,'\\').split('\\').filter(Boolean);else parts=cwd.concat(p.replace(/\//g,'\\').split('\\').filter(Boolean));
 const res=[];for(const x of parts){if(x==='.')continue;if(x==='..'){res.pop();continue}res.push(x)}const n=node(res);return n?{parts:res,node:n}:null}
function parseCmd(line){const m=/^([\w\-]+(?:-[\w\-]+)*)\b(.*)$/.exec(line.trim());if(!m)return null;const name=m[1];const rest=m[2];const args={},pos=[];let i=0;
 while(i<rest.length){while(/\s/.test(rest[i]))i++;if(i>=rest.length)break;if(rest[i]==='-'){const j=i+1;while(i<rest.length&&!/\s/.test(rest[i]))i++;const k=rest.slice(j,i);while(/\s/.test(rest[i]))i++;if(rest[i]==='"'){const e=rest.indexOf('"',i+1);args[k.toLowerCase()]=rest.slice(i+1,e);i=e+1}else{const s=i;while(i<rest.length&&!/\s/.test(rest[i])&&rest[i]!=='|')i++;args[k.toLowerCase()]=rest.slice(s,i)||true}}
  else if(rest[i]==='|'){break}else if(rest[i]==='"'){const e=rest.indexOf('"',i+1);pos.push(rest.slice(i+1,e));i=e+1}else{const s=i;while(i<rest.length&&!/\s/.test(rest[i])&&rest[i]!=='|')i++;pos.push(rest.slice(s,i))}}
 return{name,args,pos,pipe:rest.includes('|')?rest.slice(rest.indexOf('|')+1).trim():null}}
function pipe(data,pline){if(!pline||!data)return data;const p=parseCmd(pline);if(!p)return data;const n=p.name.toLowerCase();
 if(n==='select-object'||n==='select'){const props=(p.args.property||p.pos[0]||'').toString().split(',').map(s=>s.trim());return data.map(o=>{const r={};props.forEach(pr=>{r[pr]=o[pr]});return r})}
 if(n==='where-object'||n==='where'||n==='?'){const prop=p.args.property||p.pos[0];const like=p.args.like;const eq=p.args.eq;const match=p.args.match;
  return data.filter(o=>{const v=o[prop];if(like!=null){const re=new RegExp('^'+String(like).replace(/\*/g,'.*')+'$','i');return re.test(String(v))}if(eq!=null)return String(v).toLowerCase()===String(eq).toLowerCase();if(match!=null)return new RegExp(match,'i').test(String(v));return!!v})}
 if(n==='sort-object'||n==='sort'){const pr=p.args.property||p.pos[0];return data.slice().sort((a,b)=>String(a[pr]).localeCompare(String(b[pr])))}
 if(n==='format-table'||n==='ft')return data;if(n==='measure-object'||n==='measure')return[{Count:data.length}];return data}
function show(data){if(!data)return;if(typeof data==='string'){out(data);return}if(!data.length){out('(empty)');return}
 const keys=Object.keys(data[0]);if(keys.length===1){data.forEach(o=>out(String(o[keys[0]])));return}
 const w={};keys.forEach(k=>w[k]=Math.max(k.length,...data.map(o=>String(o[k]==null?'':o[k]).length)));out(keys.map(k=>k.padEnd(w[k]+2)).join(''));out(keys.map(k=>'-'.repeat(w[k])).join('  '));data.forEach(o=>out(keys.map(k=>String(o[k]==null?'':o[k]).padEnd(w[k]+2)).join('')))}
const AL={gci:'Get-ChildItem',ls:'Get-ChildItem',dir:'Get-ChildItem',gps:'Get-Process',ps:'Get-Process',gsv:'Get-Service',cd:'Set-Location',pwd:'Get-Location',cat:'Get-Content',type:'Get-Content',echo:'Write-Output','write-host':'Write-Output',cls:'Clear-Host',clear:'Clear-Host',gc:'Get-Content',glu:'Get-LocalUser',whoami:'WhoAmI'};
function run(line){const raw=line.trim();if(!raw)return;let p=parseCmd(raw);if(!p){out("ParserError: unexpected token",'er');return}
 let name=p.name;const al=AL[name.toLowerCase()];if(al)name=al;const N=name.toLowerCase();let data=null;
 if(N==='get-childitem'){const t=p.args.path||p.pos[0]||'.';const r=resolve(t);if(!r){out("Cannot find path '"+t+"'",'er');return}if(!r.node.d){out(t);return}
  data=Object.keys(r.node.d).map(k=>{const c=r.node.d[k];return{Mode:c.d?'d-----':'-a----',LastWriteTime:'10/15/2026 09:00',Length:c.d?'':String((c.c||'').length),Name:k}})}
 else if(N==='set-location'){const t=p.args.path||p.pos[0];if(!t)return;if(t==='~'){cwd=['C:','Users',USER];return}const r=resolve(t);if(!r||!r.node.d){out("Cannot find path '"+t+"'",'er');return}cwd=r.parts}
 else if(N==='get-location')out(path());
 else if(N==='get-process'){data=procs.slice();if(p.args.name)data=data.filter(x=>x.ProcessName.toLowerCase()===String(p.args.name).toLowerCase())}
 else if(N==='get-service'){data=svcs.slice();if(p.args.name)data=data.filter(x=>x.Name.toLowerCase()===String(p.args.name).toLowerCase())}
 else if(N==='get-localuser'){data=users.map(u=>({Name:u.Name,Enabled:u.Enabled,Description:u.Description}))}
 else if(N==='get-content'){const t=p.args.path||p.pos[0];const r=resolve(t);if(!r||r.node.d){out("Cannot find path '"+t+"'",'er');return}(r.node.c||'').split('\n').forEach(l=>out(l))}
 else if(N==='write-output')out((p.pos||[]).join(' '));
 else if(N==='clear-host')term.innerHTML='';
 else if(N==='whoami')out(COMP+'\\'+USER);
 else if(N==='get-date')out(new Date().toString());
 else if(N==='hostname')out(COMP);
 else if(N==='get-help'||N==='help')out('أوامر: Get-ChildItem Get-Process Get-Service Get-LocalUser Get-Content Set-Location Get-Location Select-Object Where-Object WhoAmI Clear-Host\nAliases: ls, dir, gci, gps, gsv, cat, cd, pwd, ?','mut');
 else{out(name+" : The term '"+name+"' is not recognized. Type Get-Help.",'er');return}
 if(data&&p.pipe)data=pipe(data,p.pipe);if(data)show(data)}
el.querySelector('form').onsubmit=e=>{e.preventDefault();const v=tin.value;out('PS '+path()+'> '+v);if(v.trim()){HIST.push(v);hi.i=HIST.length;run(v)}tin.value='';setP()};
tin.onkeydown=e=>{if(e.key==='ArrowUp'){if(hi.i>0){hi.i--;tin.value=HIST[hi.i]||''}e.preventDefault()}else if(e.key==='ArrowDown'){if(hi.i<HIST.length){hi.i++;tin.value=HIST[hi.i]||''}e.preventDefault()}};
out('Windows PowerShell — بيئة محاكاة Abad X. اكتب Get-Help.','mut');setP();
return{focus:()=>tin.focus()};
};})();
