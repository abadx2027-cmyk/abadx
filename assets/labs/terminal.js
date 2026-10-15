// Abad X — lab: simulated Linux terminal (full tree FS, pipes, redirects, mini Bash interpreter, room-pluggable commands)
(()=>{
window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.terminal=function(el,lab,ctx){
const {esc,ce,fixNL}=ctx;const FS=lab.fs||ctx.R.fs;const USER=FS.user,HOST=FS.host;
const clone=o=>JSON.parse(JSON.stringify(o));
function norm(n){if(n.c!=null)n.c=fixNL(n.c);if(n.d)for(const k in n.d)norm(n.d[k]);return n}
function merge(a,b){for(const k in b){if(a[k]&&a[k].d&&b[k].d){merge(a[k].d,b[k].d);Object.assign(a[k],Object.assign({},b[k],{d:a[k].d}))}else a[k]=b[k]}}
const ROOT={d:{home:{d:{}},tmp:{d:{},perm:'drwxrwxrwt',o:'root'}},o:'root'};
ROOT.d.home.d[USER]={d:clone(FS.tree||{})};ROOT.d.home.o='root';
if(FS.root)merge(ROOT.d,clone(FS.root));norm(ROOT);
const HOMEP=['home',USER];let cwd=HOMEP.slice();
const ENV={HOME:'/home/'+USER,USER,SHELL:'/bin/bash',PATH:'/usr/local/bin:/usr/bin:/bin',PWD:'/home/'+USER,HOSTNAME:HOST,'?':'0'};
const FN={};const HIST=[];let hi=0;
el.innerHTML=`<div class="term-wrap scan"><div class="tbar"><i></i><i></i><i></i><span class="tbt"></span></div>
<div class="term" role="log" aria-label="مخرجات الطرفية"></div>
<form class="tinput"><span class="pr"></span><input autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="أدخل أمراً"></form></div>`;
const term=el.querySelector('.term'),tin=el.querySelector('input'),tpr=el.querySelector('.tinput .pr'),tbt=el.querySelector('.tbt');
// ---------- fs helpers ----------
function nodeAt(parts){let n=ROOT;for(const p of parts){if(!n.d||!Object.prototype.hasOwnProperty.call(n.d,p))return null;n=n.d[p]}return n}
function partsOf(path){if(path==null||path==='')return cwd.slice();let base;
 if(path==='~'||path.startsWith('~/')){base=HOMEP.slice();path=path.slice(1)}else if(path.startsWith('/'))base=[];else base=cwd.slice();
 for(const p of path.split('/')){if(!p||p==='.')continue;if(p==='..'){base.pop();continue}base.push(p)}return base}
function resolve(path){const parts=partsOf(path);const node=nodeAt(parts);return node?{parts,node}:null}
const abs=parts=>'/'+parts.join('/');
function shortPath(){const a=abs(cwd);return a.startsWith(ENV.HOME)?'~'+a.slice(ENV.HOME.length):a}
function perm(n){return n.perm||(n.d?'drwxr-xr-x':'-rw-r--r--')}
const owner=n=>n.o||USER,group=n=>n.g||n.o||USER;
const isRoot=()=>FS.uid===0;
function can(n,bit){if(isRoot())return true;const p=perm(n);const i={r:0,w:1,x:2}[bit];if(owner(n)===USER)return p[1+i]!=='-';if((FS.groups||[]).includes(group(n)))return p[4+i]!=='-';return p[7+i]!=='-'}
function readFile(path){const r=resolve(path);if(!r)return{err:'No such file or directory'};if(r.node.d)return{err:'Is a directory'};if(!can(r.node,'r'))return{err:'Permission denied'};return{text:r.node.c||''}}
function writeFile(path,text,append){const parts=partsOf(path);const name=parts.pop();const dir=nodeAt(parts);if(!dir||!dir.d)return'No such file or directory';
 const ex=dir.d[name];if(ex&&ex.d)return'Is a directory';if(ex&&!can(ex,'w'))return'Permission denied';if(!ex&&!can(dir,'w'))return'Permission denied';
 if(ex)ex.c=append?(ex.c?ex.c+'\n':'')+text:text;else dir.d[name]={c:text};return null}
// ---------- output ----------
let cap=null;
function rawOut(text,cls){const d=ce('div',cls||'');const s=esc(text);d.innerHTML=/ABADX\{[^}]*\}/.test(text)?s.replace(/(ABADX\{[^}]*\})/g,'<span class="fl">$1</span>'):s;term.appendChild(d);term.scrollTop=term.scrollHeight}
function print(text,cls){text=String(text);if(cap&&cls!=='er'){cap.push(...text.split('\n'));return}text.split('\n').forEach(l=>rawOut(l,cls))}
const err=t=>print(t,'er');
// ---------- words & expansion ----------
function arith(expr){const e=expr.replace(/\$?\{?([A-Za-z_]\w*)\}?/g,(m,v)=>String(parseInt(ENV[v])||0)).replace(/\$(\d)/g,(m,v)=>String(parseInt(ENV[v])||0));
 if(!/^[\d\s+\-*/%()<>=!&|]*$/.test(e))return 0;try{const r=Function('"use strict";return ('+(e.replace(/\//g,'/ ').trim()||'0')+')')();return typeof r==='boolean'?+r:Math.trunc(r)}catch(x){return 0}}
function findClose(s,i,open,close){let d=0;for(let j=i;j<s.length;j++){if(s[j]==="'"&&open!=="'"){const k=s.indexOf("'",j+1);if(k<0)return -1;j=k;continue}if(s.startsWith(open,j)){d++;j+=open.length-1;continue}if(s.startsWith(close,j)){d--;if(!d)return j;j+=close.length-1}}return -1}
function expandVar(s,i){// s[i]=='$' -> [value,newIndex]
 const r=s.slice(i+1);let m;
 if(r.startsWith('((')){const e=findClose(s,i+1,'((','))');if(e>0)return[String(arith(s.slice(i+3,e))),e+2]}
 if(r[0]==='('){const e=findClose(s,i+1,'(',')');if(e>0){return[subst(s.slice(i+2,e)),e+1]}}
 if((m=/^\{#(\w+)\}/.exec(r)))return[String((ENV[m[1]]||'').length),i+1+m[0].length];
 if((m=/^\{(\w+)(:-([^}]*))?\}/.exec(r)))return[ENV[m[1]]!=null&&ENV[m[1]]!==''?ENV[m[1]]:(m[3]||''),i+1+m[0].length];
 if((m=/^([A-Za-z_]\w*|\d|[#?@*$])/.exec(r))){const k=m[1];return[k==='$'?'4242':(ENV[k]!=null?String(ENV[k]):''),i+1+k.length]}
 return['$',i+1]}
function subst(cmd){const save=cap;cap=[];try{execScript(cmd)}finally{}const o=cap;cap=save;return o.join('\n').replace(/\n+$/,'')}
function glob(w){if(!/[*?]/.test(w))return[w];const parts=w.split('/');const pat=parts.pop();const dirp=parts.join('/')||(w.startsWith('/')?'/':'');const r=resolve(dirp||'.');if(!r||!r.node.d)return[w];
 const re=new RegExp('^'+pat.replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$');const m=Object.keys(r.node.d).filter(n=>re.test(n)&&(pat[0]==='.'||n[0]!=='.')).sort();return m.length?m.map(n=>(dirp?(dirp==='/'?'/':dirp+'/'):'')+n):[w]}
function braces(w){const m=/^(.*)\{(-?\d+)\.\.(-?\d+)\}(.*)$/.exec(w);if(m){const a=+m[2],b=+m[3],o=[];for(let i=a;a<=b?i<=b:i>=b;a<=b?i++:i--)o.push(m[1]+i+m[4]);return o}
 const n=/^(.*)\{([^{}]*,[^{}]*)\}(.*)$/.exec(w);if(n)return n[2].split(',').map(x=>n[1]+x+n[3]);return[w]}
function words(s){// returns array of expanded words
 const out=[];let cur='',has=false,q=null,globbable=true;const push=()=>{if(has){if(q===null&&globbable)braces(cur).forEach(b=>out.push(...glob(b)));else out.push(cur)}cur='';has=false;globbable=true};
 for(let i=0;i<s.length;i++){const c=s[i];
  if(c==="'"){const j=s.indexOf("'",i+1);cur+=s.slice(i+1,j<0?s.length:j);has=true;globbable=false;i=j<0?s.length:j;continue}
  if(c==='"'){let j=i+1,buf='';while(j<s.length&&s[j]!=='"'){if(s[j]==='\\'&&/["$\\`]/.test(s[j+1])){buf+=s[j+1];j+=2;continue}if(s[j]==='$'){const[v,n]=expandVar(s,j);buf+=v;j=n;continue}buf+=s[j];j++}cur+=buf;has=true;globbable=false;i=j;continue}
  if(c==='\\'){cur+=s[i+1]||'';has=true;i++;continue}
  if(c==='$'){const[v,n]=expandVar(s,i);i=n-1;const parts=v.split(/\s+/);if(v==='')continue;parts.forEach((p,k)=>{if(k){push()}if(p!==''){cur+=p;has=true}});if(/\s$/.test(v))push();continue}
  if(c==='`'){const j=s.indexOf('`',i+1);cur+=subst(s.slice(i+1,j));has=true;i=j;continue}
  if(/\s/.test(c)){push();continue}
  cur+=c;has=true}
 push();return out}
// split on an operator outside quotes/parens
function splitTop(s,ops){const res=[];let cur='',d=0,q=null;
 for(let i=0;i<s.length;i++){const c=s[i];
  if(q){cur+=c;if(c===q&&s[i-1]!=='\\')q=null;continue}
  if(c==="'"||c==='"'||c==='`'){q=c;cur+=c;continue}
  if(c==='\\'){cur+=c+(s[i+1]||'');i++;continue}
  if(c==='('||c==='{'&&s[i-1]==='$'){d++;cur+=c;continue}if(c===')'||c==='}'&&d>0){d=Math.max(0,d-1);cur+=c;continue}
  if(!d){const op=ops.find(o=>s.startsWith(o,i));if(op&&!(op==='|'&&s[i+1]==='|')&&!(op==='&'&&(s[i+1]==='&'||s[i-1]==='>'||s[i+1]==='>'))){res.push(cur,op);cur='';i+=op.length-1;continue}}
  cur+=c}
 res.push(cur);return res}
// ---------- script parser ----------
function pieces(src){const out=[];src.split('\n').forEach(line=>{let t=line.trim();if(!t||t[0]==='#')return;
  const parts=splitTop(t.replace(/\s#.*$/,m=>/['"]/.test(m)?m:''),[';']).filter((x,i)=>i%2===0);
  parts.forEach(p=>{p=p.trim();if(!p)return;let m;
   while((m=/^(then|do|else|\{)\s+(.*)$/.exec(p))){out.push(m[1]);p=m[2].trim()}
   if((m=/^(.*\S)\s+(\})$/.exec(p))&&!/\$\{/.test(m[1].slice(-2))&&/^\w+\s*\(\)\s*\{|^function\s/.test(p)){out.push(m[1]);out.push('}');return}
   if((m=/^(\w+)\s*\(\)\s*\{\s*(.*)$/.exec(p))){out.push(m[1]+'() {');if(m[2])out.push(m[2]);return}
   out.push(p)})});
 // c-style for: rejoin "for ((a" "b" "c))"
 const fixed=[];for(let i=0;i<out.length;i++){if(/^for\s*\(\(/.test(out[i])&&!/\)\)/.test(out[i])){let s=out[i];while(i+1<out.length&&!/\)\)/.test(s)){s+=';'+out[++i]}fixed.push(s)}else fixed.push(out[i])}
 return fixed}
function parse(list,pos,ends){const nodes=[];
 while(pos.i<list.length){const p=list[pos.i];const kw=p.split(/\s+/)[0];
  if(ends.includes(kw)||ends.includes(p))return nodes;pos.i++;let m;
  if((m=/^for\s*\(\((.*);(.*);(.*)\)\)$/.exec(p))){expect(list,pos,'do');nodes.push({t:'cfor',a:m[1],b:m[2],c:m[3],body:parse(list,pos,['done'])});expect(list,pos,'done')}
  else if((m=/^for\s+(\w+)(?:\s+in\s+(.*))?$/.exec(p))){expect(list,pos,'do');nodes.push({t:'for',v:m[1],list:m[2]==null?'"$@"':m[2],body:parse(list,pos,['done'])});expect(list,pos,'done')}
  else if((m=/^(while|until)\s+(.*)$/.exec(p))){expect(list,pos,'do');nodes.push({t:'while',until:m[1]==='until',cond:m[2],body:parse(list,pos,['done'])});expect(list,pos,'done')}
  else if((m=/^if\s+(.*)$/.exec(p))){const br=[];let cond=m[1],els=null;
   for(;;){expect(list,pos,'then');const body=parse(list,pos,['elif','else','fi']);br.push({cond,body});const nx=list[pos.i];if(nx==null)throw new Inc();
    if(/^elif\s/.test(nx)){cond=nx.slice(5);pos.i++;continue}if(nx==='else'){pos.i++;els=parse(list,pos,['fi'])}expect(list,pos,'fi');break}
   nodes.push({t:'if',br,els})}
  else if((m=/^(?:function\s+(\w+)|(\w+)\s*\(\))\s*\{?$/.exec(p))){if(list[pos.i]==='{')pos.i++;nodes.push({t:'fn',name:m[1]||m[2],body:parse(list,pos,['}'])});expect(list,pos,'}')}
  else nodes.push({t:'cmd',s:p})}
 if(ends.length)throw new Inc();return nodes}
function Inc(){}
function expect(list,pos,w){if(pos.i>=list.length)throw new Inc();if(list[pos.i].split(/\s+/)[0]!==w&&list[pos.i]!==w)throw new SyntaxError('syntax error near `'+list[pos.i]+"'");pos.i++}
function BrkErr(k){this.k=k}function RetErr(c){this.c=c}function ExitErr(c){this.c=c}
let steps=0;
function exec(nodes){let st=0;for(const n of nodes){if(++steps>20000)throw new Error('loop limit');
 if(n.t==='cmd')st=runAndOr(n.s);
 else if(n.t==='for'){for(const v of words(n.list)){ENV[n.v]=v;try{st=exec(n.body)}catch(e){if(e instanceof BrkErr){if(e.k==='break')break;continue}throw e}}}
 else if(n.t==='cfor'){assignArith(n.a);while(arith(n.b)){try{st=exec(n.body)}catch(e){if(e instanceof BrkErr){if(e.k==='break')break}else throw e}assignArith(n.c);if(++steps>20000)throw new Error('loop limit')}}
 else if(n.t==='while'){while((runAndOr(n.cond)===0)!==n.until){if(++steps>20000)throw new Error('loop limit');try{st=exec(n.body)}catch(e){if(e instanceof BrkErr){if(e.k==='break')break;continue}throw e}}}
 else if(n.t==='if'){let hit=false;for(const b of n.br){if(runAndOr(b.cond)===0){st=exec(b.body);hit=true;break}}if(!hit&&n.els)st=exec(n.els)}
 else if(n.t==='fn'){FN[n.name]=n.body}
 ENV['?']=String(st)}return st}
function assignArith(e){e=e.trim();let m;if(!e)return 0;
 if((m=/^(\w+)\s*(\+\+|--)$/.exec(e))||(m=/^(\+\+|--)(\w+)$/.exec(e))){const v=/\w/.test(m[1][0])?m[1]:m[2],op=/\w/.test(m[1][0])?m[2]:m[1];ENV[v]=String((parseInt(ENV[v])||0)+(op==='++'?1:-1));return 1}
 if((m=/^(\w+)\s*([+\-*/%]?)=\s*(.+)$/.exec(e))&&!/^=/.test(m[3])){const cur=parseInt(ENV[m[1]])||0,val=arith(m[3]);ENV[m[1]]=String(m[2]?arith(cur+m[2]+'('+val+')'):val);return parseInt(ENV[m[1]])}
 return arith(e)}
function execScript(src,args){const list=pieces(src);const nodes=parse(list,{i:0},[]);return exec(nodes)}
// ---------- simple commands ----------
function runAndOr(s){const parts=splitTop(s.trim(),['&&','||']);let st=runPipe(parts[0]);
 for(let i=1;i<parts.length;i+=2){const op=parts[i];if((op==='&&'&&st===0)||(op==='||'&&st!==0))st=runPipe(parts[i+1])}ENV['?']=String(st);return st}
function runPipe(s){s=s.trim();if(!s)return 0;let m;
 if((m=/^\(\((.*)\)\)$/.exec(s)))return assignArith(m[1])?0:1;
 if(s[0]==='!'&&/\s/.test(s[1]))return runPipe(s.slice(1))===0?1:0;
 const segs=splitTop(s,['|']).filter((x,i)=>i%2===0);let input=null,st=0;
 for(let k=0;k<segs.length;k++){let seg=segs[k];let redir=null;
  seg=seg.replace(/\s*2>&1/g,'').replace(/\s*2>\s*\/dev\/null/g,'');
  const rm=/(?:^|\s)(>>?)\s*(\S+)\s*$/.exec(seg);if(rm&&!/['"]/.test(rm[2])){redir={app:rm[1]==='>>',f:words(rm[2])[0]};seg=seg.slice(0,rm.index)}
  const last=k===segs.length-1;const save=cap;if(!last||redir)cap=[];
  try{st=runSimple(seg,input)}finally{}
  if(!last||redir){const o=cap;cap=save;input=o;if(redir){if(redir.f==='/dev/null'){}else{const e=writeFile(redir.f,o.join('\n'),redir.app);if(e){err('bash: '+redir.f+': '+e);st=1}}}}}
 return st}
function runSimple(seg,stdin){const w=words(seg.trim());if(!w.length)return 0;
 // assignments
 let i=0;const as={};while(i<w.length&&/^[A-Za-z_]\w*=/.test(w[i])){const e=w[i].indexOf('=');as[w[i].slice(0,e)]=w[i].slice(e+1);i++}
 if(i===w.length){Object.assign(ENV,as);return 0}
 const cmd=w[i],args=w.slice(i+1);const io={stdin,print,err,sys:SYS,args};
 if(FN[cmd]){const saved={};const pos=['#','@','1','2','3','4','5','6','7','8','9'];pos.forEach(k=>saved[k]=ENV[k]);setPos(args);
  let st=0;try{st=exec(FN[cmd])}catch(e){if(e instanceof RetErr)st=e.c;else throw e}finally{pos.forEach(k=>ENV[k]=saved[k])}return st}
 if(lab.nmap&&cmd==='nmap')return runNmap(args,io);
 if(lab.outputs){const line=([cmd].concat(args)).join(' ');const hit=Object.keys(lab.outputs).find(k=>line===k||line.startsWith(k+' ')||k===cmd);
  if(hit&&!(lab.cmds&&lab.cmds[cmd])){String(lab.outputs[hit]).split('\n').forEach(l=>print(l));return 0}}
 const ext=lab.cmds&&lab.cmds[cmd];const f=ext||C[cmd];
 if(!f){if(cmd.includes('/')||/\.sh$/.test(cmd))return runFile(cmd,args,true);err(cmd+': command not found — اكتب help');return 127}
 const r=f(args,io);return typeof r==='number'?r:0}
function setPos(args){ENV['#']=String(args.length);ENV['@']=args.join(' ');for(let k=1;k<10;k++)ENV[k]=args[k-1]!=null?args[k-1]:''}
function runFile(path,args,needX){const r=resolve(path);if(!r){err('bash: '+path+': No such file or directory');return 127}if(r.node.d){err('bash: '+path+': Is a directory');return 126}
 if(needX&&!can(r.node,'x')){err('bash: '+path+': Permission denied');return 126}if(!can(r.node,'r')){err('bash: '+path+': Permission denied');return 126}
 const saved={};['#','@','0','1','2','3','4','5','6','7','8','9'].forEach(k=>saved[k]=ENV[k]);setPos(args);ENV['0']=path;
 let st=0;try{st=execScript(r.node.c||'')}catch(e){if(e instanceof ExitErr)st=e.c;else if(e instanceof Inc){err(path+': syntax error: unexpected end of file');st=2}else if(e instanceof SyntaxError){err(path+': '+e.message);st=2}else if(e instanceof RetErr)st=e.c;else throw e}
 finally{Object.keys(saved).forEach(k=>ENV[k]=saved[k])}return st}
const fileArgs=a=>a.filter(x=>!/^-/.test(x)||x==='-');
function inputOf(a,io,name){const f=fileArgs(a);if(!f.length){if(io.stdin)return io.stdin;err(name+': مطلوب اسم ملف');return null}
 let L=[];for(const p of f){const r=readFile(p);if(r.err){err(name+': '+p+': '+r.err);continue}L=L.concat(r.text.split('\n'))}return L}
function numOpt(a,def){for(let i=0;i<a.length;i++){if(a[i]==='-n'&&a[i+1]!=null){const v=+a[i+1];a.splice(i,2);return v}const m=/^-n?(\d+)$/.exec(a[i]);if(m){a.splice(i,1);return+m[1]}}return def}
function lsLine(n,name){const sz=n.d?4096:(n.c||'').length;return perm(n)+' '+(n.d?2:1)+' '+owner(n).padEnd(6)+' '+group(n).padEnd(6)+' '+String(sz).padStart(5)+' '+(n.t||'Oct 15 09:41')+' '+name+(n.l?' -> '+n.l:'')}
function walk(n,path,fn){if(!n.d)return;if(!can(n,'r')&&!can(n,'x')){err('find: ‘'+path+'’: Permission denied');return}for(const k of Object.keys(n.d).sort()){const c=n.d[k];const cp=(path==='/'?'':path)+'/'+k;fn(c,cp,k);if(c.d)walk(c,cp,fn)}}
const matchName=(name,pat)=>new RegExp('^'+pat.replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$').test(name);
function modeStr(mode,n){const map=d=>['---','--x','-w-','-wx','r--','r-x','rw-','rwx'][+d];let s=mode.length===4?mode.slice(1):mode;let p=(n.d?'d':'-')+map(s[0])+map(s[1])+map(s[2]);
 if(mode.length===4){const sp=+mode[0];const a=p.split('');if(sp&4)a[3]=a[3]==='x'?'s':'S';if(sp&2)a[6]=a[6]==='x'?'s':'S';if(sp&1)a[9]=a[9]==='x'?'t':'T';p=a.join('')}return p}
function symMode(mode,n){const a=perm(n).split('');const m=/^([ugoa]*)([+\-=])([rwxst]+)$/.exec(mode);if(!m)return null;const who=m[1]||'a';const idx={u:1,g:4,o:7};
 const tg=who==='a'?['u','g','o']:who.split('');for(const w of tg){for(const b of m[3]){if(b==='s'){if(w==='o')continue;const pos=idx[w]+2;a[pos]=m[2]==='-'?(a[pos]==='s'?'x':a[pos]):(a[pos]==='x'||a[pos]==='s'?'s':'S');continue}if(b==='t'){a[9]=m[2]==='-'?'x':'t';continue}
  const pos=idx[w]+'rwx'.indexOf(b);a[pos]=m[2]==='-'?'-':b}}return a.join('')}
function test(a){if(a[a.length-1]===']'||a[a.length-1]===']]')a=a.slice(0,-1);
 const oi=a.indexOf('-o');if(oi>0)return test(a.slice(0,oi))||test(a.slice(oi+1));const ai=a.indexOf('-a');if(ai>0&&a.length>3)return test(a.slice(0,ai))&&test(a.slice(ai+1));
 const ai2=a.indexOf('&&');if(ai2>0)return test(a.slice(0,ai2))&&test(a.slice(ai2+1));const oi2=a.indexOf('||');if(oi2>0)return test(a.slice(0,oi2))||test(a.slice(oi2+1));
 if(a[0]==='!')return!test(a.slice(1));if(a.length===0)return false;if(a.length===1)return a[0]!=='';
 if(a.length===2){const r=resolve(a[1]);switch(a[0]){case'-z':return a[1]==='';case'-n':return a[1]!=='';case'-f':return!!r&&!r.node.d;case'-d':return!!r&&!!r.node.d;case'-e':return!!r;case'-r':return!!r&&can(r.node,'r');case'-w':return!!r&&can(r.node,'w');case'-x':return!!r&&can(r.node,'x');case'-s':return!!r&&!!(r.node.c||'').length}return false}
 const[x,op,y]=a;const nx=parseInt(x)||0,ny=parseInt(y)||0;
 switch(op){case'=':case'==':return y.includes('*')&&a.length===3?matchName(x,y):x===y;case'!=':return x!==y;case'-eq':return nx===ny;case'-ne':return nx!==ny;case'-lt':return nx<ny;case'-le':return nx<=ny;case'-gt':return nx>ny;case'-ge':return nx>=ny;case'<':return x<y;case'>':return x>y;case'=~':return new RegExp(y).test(x)}return false}

function runNmap(args,io){
 const net=lab.nmap||{};const hosts=net.hosts||{};
 let targets=[];let flags={};for(let i=0;i<args.length;i++){const a=args[i];if(a.startsWith('-')){flags[a]=true;if(a==='-p'&&args[i+1]){flags['-p']=args[++i];}if(a.startsWith('-p')&&a.length>2)flags['-p']=a.slice(2);if(a==='--script'&&args[i+1])flags.script=args[++i];if(a.startsWith('--script='))flags.script=a.split('=')[1]}
  else targets.push(a)}
 if(!targets.length){err('nmap: حدد هدفاً (مثال: nmap 10.10.10.0/24)');return 1}
 print('Starting Nmap 7.94 ( https://abadx.lab/nmap ) at '+new Date().toISOString().replace('T',' ').slice(0,19),'mut');
 // expand /24 lightly
 let ips=[];targets.forEach(t=>{const m=/^(\d+\.\d+\.\d+)\.(\d+)\/24$/.exec(t);if(m){const base=m[1];Object.keys(hosts).forEach(ip=>{if(ip.startsWith(base+'.'))ips.push(ip)});if(!ips.length){for(let i=1;i<5;i++)ips.push(base+'.'+i)}}
  else if(hosts[t]||/^\d+\.\d+\.\d+\.\d+$/.test(t))ips.push(t);else ips.push(t)});
 ips=[...new Set(ips)];
 if(flags['-sn']){ips.forEach(ip=>{const h=hosts[ip];if(h&&h.up!==false)print('Nmap scan report for '+(h.name?h.name+' ('+ip+')':ip)+'\\nHost is up (0.00'+((ip.charCodeAt(ip.length-1)%9)+1)+'s latency).');else if(!h){/*skip down*/}});print('Nmap done: '+ips.filter(ip=>hosts[ip]&&hosts[ip].up!==false).length+' hosts up.');return 0}
 ips.forEach(ip=>{const h=hosts[ip];if(!h||h.up===false){if(flags['-Pn']){}else{print('Note: Host '+ip+' seems down.');return}}
  print('Nmap scan report for '+(h&&h.name?h.name+' ('+ip+')':ip));print('Host is up (0.0040s latency).');
  let ports=(h&&h.ports)||[];if(flags['-p']&&flags['-p']!==true){const want=String(flags['-p']).split(',').map(x=>x.trim());ports=ports.filter(p=>want.includes(String(p.port))||want.some(w=>{const r=/^(\d+)-(\d+)$/.exec(w);return r&&p.port>=+r[1]&&p.port<=+r[2]}))}
  if(!ports.length){print('All 1000 scanned ports are closed');return}
  print('PORT      STATE    SERVICE'+(flags['-sV']||flags['-A']?'      VERSION':''));
  ports.forEach(p=>{let line=String(p.port+'/tcp').padEnd(10)+ (p.state||'open').padEnd(9)+ (p.service||'unknown');
   if(flags['-sV']||flags['-A'])line+='      '+(p.version||'');print(line)});
  if(flags['-O']||flags['-A'])print('OS details: '+(h.os||'Linux 6.x'));
  if(flags.script||flags['-sC']||flags['-A']){(h.scripts||['ssh-hostkey: [REDACTED]','http-title: AbadX Lab Portal']).forEach(s=>print('| '+s));if(h.flag)print('| ABADX-extra: '+h.flag)}
 });
 print('Nmap done: '+ips.length+' IP address (scan complete).');return 0}

const HELP='الأوامر: pwd ls cd cat echo printf whoami id hostname uname date history clear help mkdir touch rm cp mv find grep head tail wc sort uniq cut tr chmod chown file which env export seq sleep bash sh man'+(lab.nmap?' nmap':'')+(lab.cmds?' '+Object.keys(lab.cmds).filter(k=>!lab.hidden||!lab.hidden.includes(k)).join(' '):'');
const MAN=Object.assign({ls:'ls [-a] [-l] [path] — عرض محتويات المجلد',cd:'cd <dir> — تغيير المجلد',cat:'cat <file> — طباعة محتوى ملف',pwd:'pwd — طباعة المسار الحالي',grep:'grep [-i] [-v] [-c] [-n] <pattern> [file] — بحث نصّي (يقبل المدخلات عبر |)',find:'find <path> [-name n] [-type f|d] [-perm -4000] [-user u] — بحث عن ملفات',chmod:'chmod <755|u+x|+x> <file> — تغيير الصلاحيات',bash:'bash <script> [args] — تنفيذ سكربت',wc:'wc [-l] [file] — عدّ الأسطر والكلمات',sort:'sort [-n] [-r] — ترتيب الأسطر',uniq:'uniq [-c] — إزالة التكرار المتتالي',cut:'cut -d<sep> -f<n> — اقتطاع حقل',head:'head [-n N] — أول الأسطر',tail:'tail [-n N] — آخر الأسطر'},lab.man||{});
const C={
 help:()=>print(HELP,'mut'),
 pwd:()=>print(abs(cwd)),whoami:()=>print(USER),hostname:()=>print(HOST),
 id:()=>print(`uid=${FS.uid}(${USER}) gid=${FS.gid}(${USER}) groups=${FS.gid}(${USER})`+(FS.groups||[]).map(g=>','+(FS.gids&&FS.gids[g]||27)+'('+g+')').join('')),
 uname:a=>print(a[0]==='-a'?'Linux '+HOST+' 6.8.0-abadx #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux':a[0]==='-r'?'6.8.0-abadx':a[0]==='-o'?'GNU/Linux':'Linux'),
 date:a=>print(a[0]&&a[0][0]==='+'?new Date().toISOString().slice(0,10):new Date().toString()),
 clear:()=>{term.innerHTML=''},
 echo:a=>{let n=false,e=false;while(a[0]==='-n'||a[0]==='-e'){if(a[0]==='-n')n=true;else e=true;a=a.slice(1)}let s=a.join(' ');if(e)s=s.replace(/\\n/g,'\n').replace(/\\t/g,'\t');print(s)},
 printf:a=>{if(!a.length)return;let f=a[0],i=1;const s=f.replace(/%(-?\d*)([sd%])/g,(m,w,t)=>{if(t==='%')return'%';let v=a[i++];v=v==null?(t==='d'?'0':''):v;if(t==='d')v=String(parseInt(v)||0);const W=parseInt(w)||0;return w.startsWith('-')?v.padEnd(-W):v.padStart(W)}).replace(/\\n/g,'\n').replace(/\\t/g,'\t');
  const parts=s.split('\n');if(cap){parts.forEach((p,k)=>{if(k===0&&cap.length&&cap._open){cap[cap.length-1]+=p}else cap.push(p)});cap._open=!s.endsWith('\n');if(!cap._open)cap.pop()}else{const last=term.lastChild;parts.forEach((p,k)=>{if(k===0&&last&&last._open){last.textContent+=p;return}if(k===parts.length-1&&p==='')return;rawOut(p)});if(term.lastChild)term.lastChild._open=!s.endsWith('\n')}},
 history:()=>HIST.forEach((c,i)=>print(String(i+1).padStart(5)+'  '+c)),
 ls:a=>{const all=a.some(x=>/^-\w*a/.test(x)),lng=a.some(x=>/^-\w*l/.test(x)),dirOnly=a.some(x=>/^-\w*d/.test(x));const tg=fileArgs(a);const targets=tg.length?tg:['.'];let st=0;
  targets.forEach(tgt=>{const r=resolve(tgt);if(!r){err("ls: cannot access '"+tgt+"': No such file or directory");st=2;return}
   if(dirOnly||!r.node.d){print(lng?lsLine(r.node,tgt):tgt+(r.node.d?'/':''));return}if(!can(r.node,'r')){err("ls: cannot open directory '"+tgt+"': Permission denied");st=2;return}
   if(targets.length>1)print(tgt+':');let names=Object.keys(r.node.d).sort();if(!all)names=names.filter(x=>x[0]!=='.');
   if(lng){print('total '+names.length*4);if(all){print(lsLine({d:{}},'.'));print(lsLine({d:{}},'..'))}names.forEach(n=>print(lsLine(r.node.d[n],n)))}
   else print((all?['.','..']:[]).concat(names.map(n=>r.node.d[n].d?n+'/':n)).join('   '))});return st},
 cd:a=>{const t=a[0];if(t==null||t==='~'){cwd=HOMEP.slice();ENV.PWD=abs(cwd);return}if(t==='-'){return}const r=resolve(t);if(!r){err('cd: '+t+': No such file or directory');return 1}if(!r.node.d){err('cd: '+t+': Not a directory');return 1}if(!can(r.node,'x')){err('cd: '+t+': Permission denied');return 1}cwd=r.parts;ENV.PWD=abs(cwd)},
 cat:(a,io)=>{const L=inputOf(a,io,'cat');if(!L)return 1;L.forEach(l=>print(l));return fileArgs(a).some(f=>readFile(f).err)?1:0},
 head:(a,io)=>{a=a.slice();const n=numOpt(a,10);const L=inputOf(a,io,'head');if(!L)return 1;L.slice(0,n).forEach(l=>print(l))},
 tail:(a,io)=>{a=a.slice();const n=numOpt(a,10);const L=inputOf(a,io,'tail');if(!L)return 1;L.slice(-n).forEach(l=>print(l))},
 wc:(a,io)=>{const L=inputOf(a,io,'wc');if(!L)return 1;const t=L.join('\n');const lines=L.length-(L[L.length-1]===''?1:0);const f=fileArgs(a)[0]||'';
  if(a.includes('-l'))print(lines+(f?' '+f:''));else if(a.includes('-w'))print((t.trim()?t.trim().split(/\s+/).length:0)+(f?' '+f:''));else if(a.includes('-c'))print(t.length+(f?' '+f:''));else print('  '+lines+'  '+(t.trim()?t.trim().split(/\s+/).length:0)+'  '+t.length+(f?' '+f:''))},
 grep:(a,io)=>{const opts=a.filter(x=>/^-[a-zA-Z]+$/.test(x)).join('');const rest=a.filter(x=>!/^-[a-zA-Z]+$/.test(x));if(!rest.length){err('grep: الصيغة: grep [-i] <نص> [ملف]');return 2}
  const pat=rest[0];const files=rest.slice(1);const ic=opts.includes('i'),inv=opts.includes('v'),cnt=opts.includes('c'),num=opts.includes('n'),E=opts.includes('E');
  let re;try{re=new RegExp(E?pat:pat.replace(/[.+?^${}()|[\]\\]/g,m=>m==='.'||m==='^'||m==='$'||m==='['||m===']'||m==='\\'?m:'\\'+m),ic?'i':'')}catch(e){re=new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),ic?'i':'')}
  let hits=0;const run=(L,pre)=>L.forEach((l,k)=>{if(re.test(l)!==inv){hits++;if(!cnt)print((pre?pre+':':'')+(num?(k+1)+':':'')+l)}});
  if(files.length){if(opts.includes('r')){files.forEach(f=>{const r=resolve(f);if(!r)return;if(!r.node.d){run((r.node.c||'').split('\n'),f);return}walk(r.node,f,(c,p)=>{if(!c.d&&can(c,'r'))run((c.c||'').split('\n'),p)})})}
   else files.forEach(f=>{const r=readFile(f);if(r.err){err('grep: '+f+': '+r.err);return}run(r.text.split('\n'),files.length>1?f:'')})}
  else if(io.stdin)run(io.stdin,'');else{err('grep: مطلوب ملف');return 2}
  if(cnt)print(String(hits));return hits?0:1},
 sort:(a,io)=>{const L=inputOf(a,io,'sort');if(!L)return 1;let o=L.filter(l=>l!=='');const n=a.some(x=>/^-\w*n/.test(x)),r=a.some(x=>/^-\w*r/.test(x));const k=a.indexOf('-k');
  o.sort((x,y)=>{if(n){const fx=parseFloat(x.trim().split(/\s+/)[0])||0,fy=parseFloat(y.trim().split(/\s+/)[0])||0;return fx-fy}return x<y?-1:x>y?1:0});if(r)o.reverse();if(a.some(x=>/^-\w*u/.test(x)))o=[...new Set(o)];o.forEach(l=>print(l))},
 uniq:(a,io)=>{const L=inputOf(a,io,'uniq');if(!L)return 1;const c=a.includes('-c');const out=[];L.filter(l=>l!=='').forEach(l=>{if(out.length&&out[out.length-1][0]===l)out[out.length-1][1]++;else out.push([l,1])});out.forEach(([l,k])=>print(c?String(k).padStart(7)+' '+l:l))},
 cut:(a,io)=>{let d='\t',f=null;const rest=[];for(let i=0;i<a.length;i++){if(a[i]==='-d')d=a[++i];else if(a[i].startsWith('-d'))d=a[i].slice(2);else if(a[i]==='-f')f=a[++i];else if(a[i].startsWith('-f'))f=a[i].slice(2);else rest.push(a[i])}
  const L=inputOf(rest,io,'cut');if(!L)return 1;const idx=(f||'1').split(',').map(x=>+x-1);L.forEach(l=>{if(l==='')return;const p=l.split(d);print(idx.map(i=>p[i]==null?'':p[i]).join(d))})},
 tr:(a,io)=>{const L=io.stdin||[];if(a[0]==='-d'){const set=a[1]||'';L.forEach(l=>print([...l].filter(c=>!set.includes(c)).join('')));return}const ex=s=>s.replace(/(\w)-(\w)/g,(m,x,y)=>{let o='';for(let c=x.charCodeAt(0);c<=y.charCodeAt(0);c++)o+=String.fromCharCode(c);return o});const A=ex(a[0]||''),B=ex(a[1]||'');L.forEach(l=>print([...l].map(c=>{const i=A.indexOf(c);return i<0?c:(B[i]!=null?B[i]:B[B.length-1])}).join('')))},
 mkdir:a=>{const f=fileArgs(a);if(!f.length){err('mkdir: missing operand');return 1}for(const p of f){const parts=partsOf(p);const nm=parts.pop();const dir=nodeAt(parts);if(!dir||!dir.d){err("mkdir: cannot create directory '"+p+"': No such file or directory");return 1}if(dir.d[nm]){err("mkdir: cannot create directory '"+p+"': File exists");return 1}if(!can(dir,'w')){err("mkdir: cannot create directory '"+p+"': Permission denied");return 1}dir.d[nm]={d:{}}}},
 touch:a=>{for(const p of fileArgs(a)){if(!resolve(p)){const e=writeFile(p,'');if(e){err('touch: '+p+': '+e);return 1}}}},
 rm:a=>{const rec=a.some(x=>/^-\w*r/i.test(x));for(const p of fileArgs(a)){const r=resolve(p);if(!r){err("rm: cannot remove '"+p+"': No such file or directory");return 1}if(r.node.d&&!rec){err("rm: cannot remove '"+p+"': Is a directory");return 1}const par=nodeAt(r.parts.slice(0,-1));if(!can(par,'w')){err("rm: cannot remove '"+p+"': Permission denied");return 1}delete par.d[r.parts[r.parts.length-1]]}},
 cp:a=>{const f=fileArgs(a);if(f.length<2){err('cp: missing destination');return 1}const s=resolve(f[0]);if(!s||s.node.d){err("cp: cannot stat '"+f[0]+"'");return 1}if(!can(s.node,'r')){err("cp: cannot open '"+f[0]+"' for reading: Permission denied");return 1}
  let d=resolve(f[1]);const copy=clone(s.node);delete copy.o;delete copy.perm;if(d&&d.node.d){if(!can(d.node,'w')){err('cp: Permission denied');return 1}d.node.d[s.parts[s.parts.length-1]]=copy}else{const e=writeFile(f[1],copy.c);if(e){err('cp: '+e);return 1}}},
 mv:a=>{const f=fileArgs(a);if(f.length<2){err('mv: missing destination');return 1}const s=resolve(f[0]);if(!s){err("mv: cannot stat '"+f[0]+"'");return 1}const par=nodeAt(s.parts.slice(0,-1)),nm=s.parts[s.parts.length-1];
  const d=resolve(f[1]);if(d&&d.node.d){d.node.d[nm]=s.node}else{const pp=partsOf(f[1]);const n2=pp.pop();const dd=nodeAt(pp);if(!dd||!dd.d){err('mv: target invalid');return 1}dd.d[n2]=s.node}delete par.d[nm]},
 find:a=>{let start='.';if(a[0]&&!a[0].startsWith('-'))start=a[0];const opt=k=>{const i=a.indexOf(k);return i>=0?a[i+1]:null};const nm=opt('-name')||opt('-iname'),ty=opt('-type'),pm=opt('-perm'),us=opt('-user');
  const r=resolve(start);if(!r){err("find: '"+start+"': No such file or directory");return 1}const base=start;
  const ok=(n,k)=>(!nm||matchName(a.includes('-iname')?k.toLowerCase():k,a.includes('-iname')?nm.toLowerCase():nm))&&(!ty||(ty==='d'?!!n.d:!n.d))&&(!us||owner(n)===us)&&(!pm||((/4000|u=s/.test(pm)&&/^...[sS]/.test(perm(n)))||(/2000|g=s/.test(pm)&&/^......[sS]/.test(perm(n)))||(/1000/.test(pm)&&/[tT]$/.test(perm(n)))||(/^-?0?777$/.test(pm)&&/rwxrwxrwx/.test(perm(n)))||(/o\+w|-o=w|-0002/.test(pm)&&perm(n)[8]==='w')));
  if(ok(r.node,r.parts[r.parts.length-1]||'/')&&!nm&&!pm&&!us)print(base);walk(r.node,base==='/'?'/':base.replace(/\/$/,''),(c,p,k)=>{if(ok(c,k))print(p)})},
 chmod:a=>{const f=fileArgs(a);const mode=f[0],name=f[1];if(!mode||!name){err('chmod: الصيغة: chmod <mode> <file>');return 1}const r=resolve(name);if(!r){err("chmod: cannot access '"+name+"': No such file or directory");return 1}
  if(owner(r.node)!==USER&&!isRoot()){err("chmod: changing permissions of '"+name+"': Operation not permitted");return 1}
  if(/^[0-7]{3,4}$/.test(mode))r.node.perm=modeStr(mode,r.node);else{const p=symMode(mode,r.node);if(!p){err('chmod: invalid mode');return 1}r.node.perm=p}},
 chown:a=>{if(!isRoot()){err("chown: changing ownership of '"+(fileArgs(a)[1]||'')+"': Operation not permitted");return 1}const[u,f]=fileArgs(a);const r=resolve(f);if(r){const[o,g]=u.split(':');r.node.o=o;if(g)r.node.g=g}},
 file:a=>fileArgs(a).forEach(f=>{const r=resolve(f);if(!r)return print(f+': cannot open');print(f+': '+(r.node.d?'directory':(/^#!.*bash|^#!.*sh/.test(r.node.c||'')?'Bourne-Again shell script, ASCII text executable':(r.node.ftype||'ASCII text'))))}),
 which:a=>a.forEach(c=>print(C[c]||(lab.cmds&&lab.cmds[c])?'/usr/bin/'+c:c+' not found')),
 env:()=>Object.keys(ENV).filter(k=>/^[A-Z_]+$/.test(k)).forEach(k=>print(k+'='+ENV[k])),
 export:a=>a.forEach(x=>{const i=x.indexOf('=');if(i>0)ENV[x.slice(0,i)]=x.slice(i+1)}),
 unset:a=>a.forEach(k=>delete ENV[k]),
 seq:a=>{let s=1,e=0,st=1;if(a.length===1)e=+a[0];else if(a.length===2){s=+a[0];e=+a[1]}else{s=+a[0];st=+a[1];e=+a[2]}for(let i=s;st>0?i<=e:i>=e;i+=st)print(String(i))},
 sleep:()=>0,true:()=>0,false:()=>1,':':()=>0,
 test:a=>test(a)?0:1,'[':a=>test(a)?0:1,'[[':a=>test(a)?0:1,
 expr:a=>{print(String(arith(a.join(' ').replace(/\\\*/g,'*'))))},
 let:a=>assignArith(a.join(' '))?0:1,
 read:(a,io)=>{const names=a.filter(x=>!x.startsWith('-'));const line=io.stdin&&io.stdin.length?io.stdin.shift():null;if(line==null)return 1;const p=line.split(/\s+/);names.forEach((n,i)=>ENV[n]=i===names.length-1?p.slice(i).join(' '):(p[i]||''));return 0},
 break:()=>{throw new BrkErr('break')},continue:()=>{throw new BrkErr('continue')},
 return:a=>{throw new RetErr(+a[0]||0)},exit:a=>{throw new ExitErr(+a[0]||0)},
 basename:a=>print((a[0]||'').split('/').filter(Boolean).pop()||''),
 bash:a=>{if(a[0]==='-c')return execScript(a[1]||'');if(!a[0]){print('bash: الصدفة التفاعلية تعمل هنا مباشرة — نفّذ bash script.sh','mut');return}return runFile(a[0],a.slice(1),false)},
 sh:a=>C.bash(a),source:a=>{const r=readFile(a[0]||'');if(r.err){err('source: '+r.err);return 1}return execScript(r.text)},
 man:a=>print(a[0]&&MAN[a[0]]?MAN[a[0]]:(a[0]?'لا دليل مختصر لـ '+a[0]:'What manual page do you want?'),'mut'),
 sudo:a=>{err('[sudo] كلمة مرور '+USER+' غير متاحة في هذا المختبر.');return 1}
};
C['.']=C.source;
const SYS={print,err,resolve,readFile,writeFile,abs,partsOf,nodeAt,perm,owner,can,ENV,C,run:s=>runAndOr(s),runScript:execScript,get cwd(){return abs(cwd)},user:USER,host:HOST,root:ROOT,clear:()=>{term.innerHTML=''}};
// ---------- prompt / input ----------
let pending='';
function promptStr(){return pending?'>':USER+'@'+HOST+':'+shortPath()+(isRoot()?'#':'$')}
function setPrompt(){tpr.textContent=promptStr();tbt.textContent=USER+'@'+HOST+':'+shortPath()}
function runLine(line){const src=pending?pending+'\n'+line:line;steps=0;
 try{const list=pieces(src);const nodes=parse(list,{i:0},[]);pending='';exec(nodes)}
 catch(e){if(e instanceof Inc){pending=src;return}pending='';
  if(e instanceof BrkErr||e instanceof RetErr)return;if(e instanceof ExitErr){print('exit','mut');return}
  if(e instanceof SyntaxError)err('bash: '+e.message);else if(e&&e.message==='loop limit')err('bash: تم إيقاف حلقة طويلة جداً (حدّ الأمان)');else{console.error(e);err('bash: خطأ داخلي')}}}
el.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const v=tin.value;rawOut(promptStr()+' '+v,'');term.lastChild.firstChild&&0;
 const pl=term.lastChild;pl.innerHTML='<span class="pr">'+esc(promptStr())+'</span> '+esc(v);
 if(v.trim()){HIST.push(v);hi=HIST.length}if(v.trim()||pending)runLine(v);tin.value='';setPrompt();term.scrollTop=term.scrollHeight});
tin.addEventListener('keydown',e=>{if(e.key==='ArrowUp'){if(hi>0){hi--;tin.value=HIST[hi]||''}e.preventDefault()}
 else if(e.key==='ArrowDown'){if(hi<HIST.length){hi++;tin.value=HIST[hi]||''}e.preventDefault()}
 else if(e.key==='Tab'){e.preventDefault();const v=tin.value;const m=/(\S*)$/.exec(v);const w=m[1];const first=!/\s/.test(v.trim())&&!v.endsWith(' ');let cands;
  if(first)cands=Object.keys(C).concat(Object.keys(lab.cmds||{})).filter(c=>c.startsWith(w));else{const i=w.lastIndexOf('/');const dir=i>=0?w.slice(0,i+1):'';const r=resolve(dir||'.');cands=r&&r.node.d?Object.keys(r.node.d).filter(n=>n.startsWith(w.slice(i+1))).map(n=>dir+n+(r.node.d[n].d?'/':'')):[]}
  if(cands.length===1)tin.value=v.slice(0,v.length-w.length)+cands[0]+(cands[0].endsWith('/')?'':' ');else if(cands.length>1){rawOut(cands.join('   '),'mut')}}
 else if(e.key==='l'&&e.ctrlKey){e.preventDefault();term.innerHTML=''}});
el.addEventListener('click',e=>{if(!getSelection().toString())tin.focus({preventScroll:true})});
rawOut(lab.banner||'Abad X terminal — بيئة لينكس محاكاة. اكتب help للأوامر.','mut');if(lab.motd)print(lab.motd,'mut');setPrompt();
return{focus:()=>tin.focus(),show:()=>{},sys:SYS,run:v=>{tin.value=v;el.querySelector('form').requestSubmit()}};
};
})();
