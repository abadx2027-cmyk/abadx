/* Abad X — Arabic ⇄ English language switcher.
 * - Language stored in localStorage "abadx-lang" ("ar" | "en"), default "ar".
 * - Static strings: data-i18n / data-i18n-placeholder / data-i18n-aria / data-i18n-title / data-i18n-alt.
 * - Combined "عربي · English" strings and "عربي <span class=en>English</span>" are split automatically,
 *   including content injected later by page scripts (MutationObserver).
 * - Pure-Arabic text nodes that exactly match a dictionary entry are translated automatically.
 * - Fires `abadx:langchange` on document (detail: {lang, dir}) after every switch.
 * Public API: window.AbadI18n = {lang(), set(lang), toggle(), t(key, fallback), apply(root)}
 */
(function () {
  'use strict';
  var KEY = 'abadx-lang';
  var D = {
    /* common chrome */
    'common.skip': ['تخطَّ إلى المحتوى', 'Skip to content'],
    'common.breadcrumb': ['مسار التنقل', 'Breadcrumb'],
    'common.portal': ['البوابة', 'Portal'],
    'common.academy': ['الأكاديمية', 'Academy'],
    'common.ctf': ['تحديات CTF', 'CTF Challenges'],
    'common.labs': ['المختبر', 'Labs'],
    'common.library': ['المكتبة', 'Library'],
    'common.self': ['تعلّم ذاتي', 'Self-Learning'],
    'common.certs': ['الشهادات', 'Certifications'],
    'common.notfound': ['غير موجود', 'Not found'],
    'common.soon': ['قريباً', 'Coming soon'],
    'common.beginner': ['مبتدئ', 'Beginner'],
    'common.intermediate': ['متوسط', 'Intermediate'],
    'common.advanced': ['متقدم', 'Advanced'],
    'common.progress': ['التقدّم', 'Progress'],
    'lang.toggle.toEn': ['Switch to English', 'Switch to English'],
    'lang.toggle.toAr': ['التبديل إلى العربية', 'التبديل إلى العربية'],
    /* titles */
    'title.login': ['دخول آمن', 'Secure login'],
    'title.rooms': ['غرفة تعلّم', 'Learning room'],
    'title.specialty': ['التخصص', 'Specialty'],
    'title.vendor': ['الجهة', 'Vendor'],
    'title.onboarding': ['ابدأ رحلتك', 'Onboarding'],
    /* login */
    'login.logo': ['شعار Abad X', 'Abad X logo'],
    'login.heading': ['تسجيل الدخول إلى Abad X', 'Sign in to Abad X'],
    'login.restricted': ['🔒 منطقة مقيّدة — سجّل الدخول للوصول إلى المعامل التطبيقية.', '🔒 Restricted area — sign in to access the hands-on labs.'],
    'login.user': ['المستخدم / البريد', 'Username / email'],
    'login.pass': ['كلمة المرور', 'Password'],
    'login.remember': ['تذكّرني', 'Remember me'],
    'login.forgot': ['نسيت كلمة المرور؟', 'Forgot password?'],
    'login.note': ['نسخة تجريبية — الدخول للعرض فقط دون تحقق فعلي من الحساب', 'Demo build — sign-in is for display only, no real account verification'],
    'login.forgotMsg': ['استعادة كلمة المرور غير متاحة في النسخة التجريبية — تواصل مع فريق Abad X.', 'Password recovery is not available in the demo — contact the Abad X team.'],
    'login.errUser': ['الرجاء إدخال اسم المستخدم أو البريد الإلكتروني.', 'Please enter your username or email.'],
    'login.errEmail': ['صيغة البريد الإلكتروني غير صحيحة.', 'Invalid email format.'],
    'login.errPass': ['الرجاء إدخال كلمة المرور.', 'Please enter your password.'],
    'login.denied': ['تم رفض الوصول: يرجى تصحيح الحقول المحددة.', 'Access denied: please fix the highlighted fields.'],
    'login.granted': ['تم منح الوصول… جارٍ التحويل', 'Access granted… redirecting'],
    /* portal */
    'portal.nav': ['البوابات', 'Portals'],
    'portal.academy.d': ['التخصصات والشهادات الاحترافية', 'Specialties & professional certifications'],
    'portal.ctf.d': ['تحديات دفاعية والتقاط العلم', 'Defensive challenges & capture the flag'],
    'portal.labs.d': ['بيئات عملية افتراضية', 'Virtual hands-on environments'],
    'portal.library.d': ['مراجع وأدلة ومصادر', 'References, guides & resources'],
    'portal.self.d': ['غرف تدريب تفاعلية عملية', 'Interactive hands-on training rooms'],
    /* academy / specialty / vendor */
    'academy.intro': ['اختر التخصص لاستعراض الجهات المانحة للشهادات ومساراتها.', 'Choose a specialty to browse certification vendors and their paths.'],
    'academy.list': ['التخصصات', 'Specialties'],
    'spec.vendors': ['الجهات المانحة للشهادات', 'Certification vendors'],
    'spec.nf': ['التخصص غير موجود', 'Specialty not found'],
    'spec.nfMsg': ['لم يتم العثور على هذا التخصص.', 'This specialty could not be found.'],
    'spec.back': ['العودة إلى التخصصات', 'Back to specialties'],
    'vendor.nf': ['الجهة غير موجودة', 'Vendor not found'],
    'vendor.nfMsg': ['لم يتم العثور على هذه الجهة.', 'This vendor could not be found.'],
    'vendor.back': ['العودة إلى الأكاديمية', 'Back to the academy'],
    'vendor.roadmap': ['مسار الشهادات', 'Certification Roadmap'],
    'vendor.goalSuffix': ['— الهدف النهائي', '— final goal'],
    /* onboarding */
    'ob.progress': ['التقدم', 'Progress'],
    'ob.q1': ['مين أنت حالياً؟', 'Who are you right now?'],
    'ob.student': ['طالب', 'Student'],
    'ob.itEmp': ['موظف IT', 'IT employee'],
    'ob.dev': ['مطوّر', 'Developer'],
    'ob.sec': ['أعمل في الأمن السيبراني', 'I work in cybersecurity'],
    'ob.switch': ['أغيّر مساري', 'Switching careers'],
    'ob.trainer': ['مدرّب', 'Trainer'],
    'ob.q2': ['وش هدفك؟', "What's your goal?"],
    'ob.explore': ['استكشاف المجال', 'Explore the field'],
    'ob.job': ['الحصول على وظيفة', 'Get a job'],
    'ob.skills': ['تطوير مهاراتي', 'Develop my skills'],
    'ob.intl': ['شهادة دولية', 'International certification'],
    'ob.q3': ['أي مجال يشدّك؟', 'Which field interests you?'],
    'ob.q4': ['وش مستواك الحالي؟', "What's your current level?"],
    'ob.analyzing': ['جاري تحليل إجاباتك…', 'Analyzing your answers…'],
    'ob.ready': ['مسارك جاهز!', 'Your path is ready!'],
    /* self-learning */
    'sl.intro': ['غرف تدريب عملية تفاعلية مصنّفة حسب التخصص — مختبرات داخل المتصفح، مهام، وأعلام ABADX{...}. اختر تخصصاً أو تصفّح الكل.', 'Interactive hands-on training rooms grouped by specialty — in-browser labs, tasks, and ABADX{...} flags. Pick a specialty or browse them all.'],
    'sl.filter': ['تصفية حسب التخصص', 'Filter by specialty'],
    'sl.net': ['الشبكات', 'Networking'],
    'sl.sec': ['الأمن السيبراني', 'Cybersecurity'],
    'sl.sys': ['الأنظمة', 'Systems'],
    'sl.prog': ['البرمجة', 'Programming'],
    'sl.done': ['مكتملة ✓', 'Completed ✓'],
    'sl.r1': ['أساسيات الشبكات', 'Networking Basics'],
    'sl.r1d': ['OSI/TCP-IP، العناوين وSubnetting مع حاسبة تفاعلية، DNS، HTTP والمنافذ.', 'OSI/TCP-IP, addressing and subnetting with an interactive calculator, DNS, HTTP and ports.'],
    'sl.r2': ['تحليل الحزم بـ Wireshark', 'Packet Analysis with Wireshark'],
    'sl.r2d': ['عارض حزم وهمي مع فلاتر ip.addr و http و dns وتحليل طلبات مشبوهة.', 'Simulated packet viewer with ip.addr, http and dns filters and analysis of suspicious requests.'],
    'sl.r3': ['استكشاف الشبكات بـ Nmap', 'Network Discovery with Nmap'],
    'sl.r3d': ['محاكاة Nmap: اكتشاف مضيفين، مسح منافذ، -sV و -O وسكربتات على شبكة وهمية.', 'Nmap simulation: host discovery, port scanning, -sV, -O and scripts on a mock network.'],
    'sl.r4': ['أساسيات الويب والبروكسي', 'Web Basics & Proxies'],
    'sl.r4d': ['HTTP والكوكيز واعتراض/تكرار الطلبات على تطبيق متجر محاكى.', 'HTTP, cookies and intercepting/repeating requests against a simulated shop app.'],
    'sl.r5': ['مدخل إلى OWASP Top 10', 'Intro to OWASP Top 10'],
    'sl.r5d': ['ودجات محاكاة آمنة: SQLi و XSS و IDOR ومصادقة ضعيفة.', 'Safe simulation widgets: SQLi, XSS, IDOR and weak authentication.'],
    'sl.r6': ['التشفير والتجزئة والترميز', 'Cryptography, Hashing & Encoding'],
    'sl.r6d': ['Base64 وقيصر وSHA-256 وكسر هاش مقابل قائمة كلمات محلية.', 'Base64, Caesar, SHA-256 and cracking a hash against a local wordlist.'],
    'sl.r7': ['مدخل محلل العمليات الأمنية', 'SOC Analyst Intro'],
    'sl.r7d': ['عارض سجلات auth/web/fw — اكتشف brute force وعناوين مشبوهة.', 'auth/web/fw log viewer — detect brute force and suspicious addresses.'],
    'sl.r8': ['أساسيات لينكس', 'Linux Fundamentals'],
    'sl.r8d': ['تنقّل في نظام الملفات، اقرأ وأدِر الملفات، ابحث داخلها، وافهم الصلاحيات.', 'Navigate the filesystem, read and manage files, search inside them, and understand permissions.'],
    'sl.r9': ['لينكس متقدم: عمليات وصلاحيات وCron', 'Linux Advanced: Processes, Permissions & Cron'],
    'sl.r9d': ['العمليات، SUID/sticky، وجدولة cron في طرفية محاكاة.', 'Processes, SUID/sticky and cron scheduling in a simulated terminal.'],
    'sl.r10': ['سكربتات Bash', 'Bash Scripting'],
    'sl.r10d': ['متغيرات وشروط وحلقات وتشغيل سكربتات حقيقية داخل الطرفية.', 'Variables, conditions, loops and running real scripts inside the terminal.'],
    'sl.r11': ['ويندوز و PowerShell', 'Windows & PowerShell'],
    'sl.r11d': ['Get-ChildItem و Get-Process و Get-Service و Get-LocalUser مع Where/Select.', 'Get-ChildItem, Get-Process, Get-Service and Get-LocalUser with Where/Select.'],
    'sl.r12': ['بايثون للأمن السيبراني', 'Python for Cybersecurity'],
    'sl.r12d': ['محرر بايثون في المتصفح (Pyodide): منافذ، hashing، base64، وتخمين محلي.', 'In-browser Python editor (Pyodide): ports, hashing, base64 and local guessing.'],
    /* room */
    'room.loading': ['جارٍ تحميل الغرفة…', 'Loading room…'],
    'room.lab': ['المختبر التفاعلي', 'Interactive lab'],
    'room.complete': ['الغرفة مكتملة! 🎉', 'Room complete! 🎉'],
    'room.finished': ['أتممت', 'You completed'],
    'room.back': ['← العودة للغرف', '← Back to rooms'],
    'room.badId': ['معرّف غرفة غير صالح.', 'Invalid room ID.'],
    'room.loadFail': ['تعذّر تحميل الغرفة.', 'Could not load the room.'],
    'room.hint': ['💡 تلميح', '💡 Hint'],
    'room.hint5': ['💡 تلميح (−5 نقاط)', '💡 Hint (−5 points)'],
    'room.warn': ['⚠ تنبيه', '⚠ Warning'],
    'room.correct': ['✓ إجابة صحيحة', '✓ Correct answer'],
    'room.done': ['تم ✓', 'Done ✓'],
    'room.copied': ['تم النسخ ✓', 'Copied ✓'],
    'room.empty': ['أدخل إجابة أولاً.', 'Enter an answer first.'],
    'room.taskDone': ['اكتملت المهمة', 'Task completed'],
    'room.wrongTry': ['إجابة غير صحيحة — حاول مجدداً.', 'Incorrect answer — try again.'],
    'room.tryHint': ['جرّب التلميح.', 'Try the hint.'],
    'room.wrong': ['إجابة غير صحيحة', 'Incorrect answer'],
    'room.total': ['مجموع نقاطك:', 'Your total score:'],
    'room.termOut': ['مخرجات الطرفية', 'Terminal output'],
    'room.cmd': ['أدخل أمراً', 'Enter a command'],
    'room.labFail': ['تعذّر تشغيل المختبر.', 'Could not start the lab.']
  };

  /* runtime-generated strings with numbers */
  var PATTERNS = [
    [/^⏱ (\d+) دقيقة$/, '⏱ $1 min'],
    [/^(\d+(?:\/\d+)?) مهام$/, '$1 tasks'],
    [/^(\d+) جهات مانحة$/, '$1 vendors'],
    [/^عرض (\d+) شهادة$/, 'Showing $1 certifications'],
    [/^صحيح! \+(\d+) نقطة$/, 'Correct! +$1 points'],
    [/^إجابة صحيحة، \+(\d+) نقطة$/, 'Correct answer, +$1 points'],
    [/^اكتملت المهمة (\d+)$/, 'Task $1 completed'],
    [/^إجابة غير صحيحة — حاول مجدداً\.$/, 'Incorrect answer — try again.'],
    [/^إجابة غير صحيحة — حاول مجدداً\. جرّب التلميح\.$/, 'Incorrect answer — try again. Try the hint.'],
    [/^مجموع نقاطك: (\d+) \/ (\d+)$/, 'Your total score: $1 / $2']
  ];
  function pat(s) { for (var i = 0; i < PATTERNS.length; i++) if (PATTERNS[i][0].test(s)) return s.replace(PATTERNS[i][0], PATTERNS[i][1]); return null; }
  var AR = /[\u0600-\u06FF]/, LAT = /[A-Za-z]/;
  var BY_AR = {};
  Object.keys(D).forEach(function (k) { BY_AR[D[k][0]] = D[k][1]; });

  function get() { try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'ar'; } catch (e) { return 'ar'; } }
  var lang = get();
  var html = document.documentElement;
  function setRoot() { html.lang = lang; html.dir = lang === 'en' ? 'ltr' : 'rtl'; html.setAttribute('data-lang', lang); }
  setRoot();

  function t(key, fb) { var e = D[key]; return e ? e[lang === 'en' ? 1 : 0] : (fb == null ? key : fb); }

  /* split "عربي · English" (separators " · ", " / ", " — "), also multi-part strings.
     Returns [ar, en] or null. Neutral segments (numbers/symbols) are kept in both. */
  var SEP_RE = /( · | \/ | — )/;
  function splitBi(s) {
    var parts = s.split(SEP_RE); if (parts.length < 3) return null;
    var segs = [], seps = [];
    for (var i = 0; i < parts.length; i++) (i % 2 ? seps : segs).push(parts[i]);
    var hasA = false, hasE = false;
    segs.forEach(function (x) { if (AR.test(x)) hasA = true; else if (LAT.test(x)) hasE = true; });
    if (!hasA || !hasE) return null;
    function join(keep) {
      var out = '', sep = null;
      segs.forEach(function (x, j) {
        if (!keep(x)) { if (j > 0 && sep == null) sep = seps[j - 1]; return; }
        if (out) out += (sep != null ? sep : seps[j - 1]); out += x; sep = null;
      });
      return out;
    }
    /* "12 شهادات · certifications" -> "12 certifications" */
    for (var j = 0; j + 1 < segs.length; j++) {
      var m = AR.test(segs[j]) && segs[j].match(/^\s*(\d+)\s/);
      if (m && !AR.test(segs[j + 1]) && LAT.test(segs[j + 1]) && !/^\s*\d/.test(segs[j + 1])) segs[j + 1] = m[1] + ' ' + segs[j + 1];
    }
    return [join(function (x) { return AR.test(x) || !LAT.test(x); }), join(function (x) { return !AR.test(x); })];
  }
  function pair(ar, en) {
    var f = document.createDocumentFragment(), x = document.createElement('span'), y = document.createElement('span');
    x.className = 'i18n-ar i18n-g'; y.className = 'i18n-en i18n-g'; y.lang = 'en'; y.dir = 'ltr';
    x.textContent = ar; y.textContent = en; f.appendChild(x); f.appendChild(y); return f;
  }
  var SKIP = { SCRIPT: 1, STYLE: 1, PRE: 1, CODE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1, NOSCRIPT: 1 };
  function skipEl(el) {
    for (; el && el !== document.body; el = el.parentNode) {
      if (el.nodeType !== 1) continue;
      if (SKIP[el.tagName] || el.namespaceURI === 'http://www.w3.org/2000/svg') return true;
      var c = el.classList;
      if (c && (c.contains('i18n-g') || c.contains('i18n-skip') || c.contains('abx-lang'))) return true;
      if (el.hasAttribute && el.hasAttribute('data-i18n')) return true;
    }
    return false;
  }

  function processText(n) {
    var s = n.nodeValue; if (!s || !AR.test(s) || skipEl(n.parentNode)) return;
    var lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], core = s.trim();
    var sib = n.parentNode;
    var out = null;
    var m = core.match(/^([→←⌨]\s*)?([\s\S]*?)(\s*[←→])?$/), pre = m[1] || '', body = m[2], post = m[3] || '';
    var hasEn = false, c;
    if (!(sib.classList && sib.classList.contains('en')))
      for (c = sib.firstChild; c; c = c.nextSibling) if (c.nodeType === 1 && c.classList.contains('en')) { hasEn = true; break; }
    var bi = hasEn ? null : splitBi(body);
    if (hasEn) {
      var x = document.createElement('span'); x.className = 'i18n-ar i18n-g'; x.textContent = s;
      sib.replaceChild(x, n);
      for (c = sib.firstChild; c; c = c.nextSibling) if (c.nodeType === 1 && c.classList.contains('en')) { c.classList.add('i18n-en'); c.lang = 'en'; }
      return;
    } else if (bi) {
      out = document.createDocumentFragment();
      out.appendChild(document.createTextNode(lead));
      if (pre) out.appendChild(pre.indexOf('→') >= 0 ? pair(pre, pre.replace('→', '←')) : document.createTextNode(pre));
      out.appendChild(pair(bi[0], bi[1]));
      if (post) out.appendChild(pair(post, post.replace('←', '→')));
      out.appendChild(document.createTextNode(trail));
    } else if (BY_AR[core] || pat(core)) {
      out = document.createDocumentFragment();
      out.appendChild(document.createTextNode(lead)); out.appendChild(pair(core, BY_AR[core] || pat(core))); out.appendChild(document.createTextNode(trail));
    } else if (Object.prototype.hasOwnProperty.call(BY_AR, body.trim()) && pre) {
      out = document.createDocumentFragment();
      out.appendChild(document.createTextNode(lead));
      out.appendChild(pre.indexOf('→') >= 0 ? pair(pre, pre.replace('→', '←')) : document.createTextNode(pre));
      out.appendChild(pair(body.trim(), BY_AR[body.trim()]));
      out.appendChild(document.createTextNode(trail));
    } else return;
    sib.replaceChild(out, n);
  }

  var ATTRS = ['aria-label', 'title', 'alt', 'placeholder'];
  function attrVal(el, a) {
    var o = el.getAttribute('data-i18n-o-' + a);
    if (o == null) { o = el.getAttribute(a); if (o == null || !AR.test(o)) return; el.setAttribute('data-i18n-o-' + a, o); }
    var bi = splitBi(o), v = lang === 'en' ? (bi ? bi[1] : (BY_AR[o] || o)) : (bi ? bi[0] : o);
    if (el.getAttribute(a) !== v) el.setAttribute(a, v);
  }

  function apply(root) {
    root = root || document.body; if (!root) return;
    var els = root.querySelectorAll ? root.querySelectorAll('[data-i18n],[data-i18n-placeholder],[data-i18n-aria],[data-i18n-title],[data-i18n-alt]') : [];
    var all = Array.prototype.slice.call(els); if (root.nodeType === 1 && root.matches('[data-i18n]')) all.push(root);
    all.forEach(function (el) {
      /* only swap while the element still shows a dictionary value (page scripts may have replaced it) */
      var k = el.getAttribute('data-i18n'), cur = el.textContent.trim();
      if (k && D[k] && (cur === D[k][0] || cur === D[k][1]) && cur !== t(k)) el.textContent = t(k);
      [['data-i18n-placeholder', 'placeholder'], ['data-i18n-aria', 'aria-label'], ['data-i18n-title', 'title'], ['data-i18n-alt', 'alt']].forEach(function (p) {
        var key = el.getAttribute(p[0]); if (key && D[key] && el.getAttribute(p[1]) !== t(key)) el.setAttribute(p[1], t(key));
      });
    });
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(processText);
    var ae = root.querySelectorAll ? root.querySelectorAll('[aria-label],[title],[alt],[placeholder]') : [];
    Array.prototype.forEach.call(ae, function (el) {
      ATTRS.forEach(function (a) { if (!el.hasAttribute('data-i18n-' + (a === 'aria-label' ? 'aria' : a)) && el.hasAttribute(a)) attrVal(el, a); });
    });
  }

  /* document title: "Abad X | عربي" */
  var origTitle = null;
  function applyTitle() {
    if (origTitle == null) origTitle = document.title;
    var m = origTitle.match(/^(Abad X\s*[|—-]\s*)(.*)$/), v = origTitle;
    if (m) {
      var bi = splitBi(m[2]);
      v = m[1] + (lang === 'en' ? (bi ? bi[1] : (BY_AR[m[2]] || m[2])) : (bi ? bi[0] : m[2]));
    }
    if (document.title !== v) document.title = v;
  }

  var btn;
  function paintBtn() {
    if (!btn) return;
    btn.textContent = lang === 'en' ? 'عربي' : 'EN';
    btn.lang = lang === 'en' ? 'ar' : 'en';
    btn.setAttribute('aria-label', lang === 'en' ? D['lang.toggle.toAr'][0] : D['lang.toggle.toEn'][1]);
    btn.title = btn.getAttribute('aria-label');
  }
  function mountBtn() {
    if (btn || !document.body) return;
    btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'abx-lang'; btn.id = 'abx-lang';
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn); paintBtn();
  }

  function set(l) {
    l = l === 'en' ? 'en' : 'ar';
    try { localStorage.setItem(KEY, l); } catch (e) {}
    if (l === lang) return;
    lang = l; setRoot(); applyTitle(); apply(); paintBtn();
    document.dispatchEvent(new CustomEvent('abadx:langchange', { detail: { lang: lang, dir: html.dir } }));
  }
  function toggle() { set(lang === 'en' ? 'ar' : 'en'); }

  window.AbadI18n = { lang: function () { return lang; }, set: set, toggle: toggle, t: t, apply: apply, dict: D };

  function start() {
    mountBtn(); applyTitle(); apply();
    var pending = false;
    new MutationObserver(function (ms) {
      if (pending) return; pending = true;
      (window.requestAnimationFrame || setTimeout)(function () { pending = false; apply(); });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  /* keep other tabs in sync */
  window.addEventListener('storage', function (e) { if (e.key === KEY) set(e.newValue); });
})();
