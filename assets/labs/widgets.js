// Abad X — lab: safe simulated vulnerable widgets (SQLi, XSS sandboxed, IDOR, broken auth)
(()=>{window.ABADX_LABS=window.ABADX_LABS||{};
window.ABADX_LABS.widgets=function(el,lab,ctx){
const {esc,ce}=ctx;
el.innerHTML=`<div class="lab"><div class="tbar" style="border-bottom:1px solid rgba(56,189,248,.16)"><i></i><i></i><i></i><span>Vulnerable App Lab (simulated · safe)</span></div>
<div class="lbody" id="w"></div></div>`;
const box=el.querySelector('#w');
function card(t,h){const d=ce('div','lcard');d.innerHTML=`<h4>${t}</h4>${h}`;box.appendChild(d);return d}
// SQLi login
{const c=card('① SQL Injection Login (محاكى)','<p class="ldesc">استعلام محاكى: <code>SELECT * FROM users WHERE user=\'$u\' AND pass=\'$p\'</code> — لا توجد قاعدة بيانات حقيقية.</p><div class="lrow"><input class="lin" data-u placeholder="username"><input class="lin" data-p placeholder="password" type="text"><button class="lbtn" data-go>Login</button></div><div class="lout" data-o>—</div>');
 c.querySelector('[data-go]').onclick=()=>{const u=c.querySelector('[data-u]').value,p=c.querySelector('[data-p]').value;
  const q="SELECT * FROM users WHERE user='"+u+"' AND pass='"+p+"'";c.querySelector('[data-o]').textContent='Query: '+q+'\n';
  if(/'\s*or\s*'1'\s*=\s*'1/i.test(u+p)||/'\s*or\s*1\s*=\s*1/i.test(u)||/admin'--/i.test(u)){c.querySelector('[data-o]').textContent+='→ Logged in as admin\nFLAG: ABADX{sqli_bypassed}'}
  else if(u==='alice'&&p==='wonder')c.querySelector('[data-o]').textContent+='→ Welcome alice';
  else c.querySelector('[data-o]').textContent+='→ Login failed'}}
// XSS sandboxed
{const c=card('② Reflected XSS (sandbox)','<p class="ldesc">المخرجات داخل Shadow DOM معرّاة من السكربت — للتعلّم فقط، لا تنفيذ حقيقي لأكواد خبيثة.</p><div class="lrow"><input class="lin" data-i placeholder="search q="><button class="lbtn" data-go>Search</button></div><div data-host></div><div class="lout" data-o style="margin-top:8px">—</div>');
 const host=c.querySelector('[data-host]');const sh=host.attachShadow({mode:'open'});
 c.querySelector('[data-go]').onclick=()=>{const v=c.querySelector('[data-i]').value;const safe=v.replace(/</g,'&lt;');
  sh.innerHTML='<style>div{font:12px monospace;color:#cfe8ff;padding:8px;background:#010509;border-radius:6px}</style><div>Results for: '+v.replace(/<script[\s\S]*?<\/script>/gi,'[script-stripped]')+'</div>';
  if(/<script/i.test(v)||/onerror\s*=/i.test(v)||/<img/i.test(v)){c.querySelector('[data-o]').textContent='Reflection detected (sanitized in sandbox).\nFLAG: ABADX{xss_reflected}'}
  else c.querySelector('[data-o]').textContent='No XSS pattern detected. Try injecting a tag.'}}
// IDOR
{const db={1:{name:'Alice',role:'user',note:'Hello'},2:{name:'Bob',role:'user',note:'Hi'},9:{name:'Admin',role:'admin',note:'ABADX{idor_admin_data}'}};
 const c=card('③ IDOR — Insecure Direct Object Reference','<p class="ldesc">أنت مسجّل كـ user id=1. غيّر المعرّف في الطلب.</p><div class="lrow"><input class="lin" data-i type="number" value="1" style="max-width:100px"><button class="lbtn" data-go>GET /api/profile?id=</button></div><div class="lout" data-o>—</div>');
 c.querySelector('[data-go]').onclick=()=>{const id=c.querySelector('[data-i]').value;const u=db[id];c.querySelector('[data-o]').textContent=u?JSON.stringify(u,null,2):'404 not found'}}
// Broken auth
{const c=card('④ Broken Authentication','<p class="ldesc">تخمين كلمة مرور ضعيفة لحساب admin. القائمة المحلية صغيرة.</p><div class="lrow"><input class="lin" data-u value="admin"><input class="lin" data-p placeholder="password"><button class="lbtn" data-go>Try</button><button class="lbtn s" data-bf>Spray top5</button></div><div class="lout" data-o>—</div>');
 const weak=['123456','password','admin','admin123','abadx2026'];
 c.querySelector('[data-go]').onclick=()=>{const u=c.querySelector('[data-u]').value,p=c.querySelector('[data-p]').value;
  if(u==='admin'&&p==='admin123')c.querySelector('[data-o]').textContent='SUCCESS — session=deadbeef\nFLAG: ABADX{broken_auth_weak}';
  else c.querySelector('[data-o]').textContent='Invalid credentials'};
 c.querySelector('[data-bf]').onclick=()=>{for(const p of weak){if(p==='admin123'){c.querySelector('[data-p]').value=p;c.querySelector('[data-o]').textContent='Spray hit: admin / admin123\nFLAG: ABADX{broken_auth_weak}';return}}c.querySelector('[data-o]').textContent='No hit'}}
return{};
};})();
