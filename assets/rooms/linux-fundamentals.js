// Abad X — Room: Linux Fundamentals (أساسيات لينكس). Original content.
// Answers stored as SHA-256 of normalized value (lowercase, trimmed, single-spaced).
window.ABADX_ROOM = {
  id:'linux-fundamentals',
  ar:'أساسيات لينكس', en:'Linux Fundamentals',
  icon:'<path d="M9 3h6l1 4a7 7 0 0 1 2 5v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4a7 7 0 0 1 2-5z"/><circle cx="10" cy="11" r="1.1"/><circle cx="14" cy="11" r="1.1"/><path d="M10.5 15h3"/>',
  difficulty:['مبتدئ','Beginner'],
  minutes:45, points:0, // points computed from tasks
  tags:['Linux','CLI','Terminal','Bash'],
  intro:'رحلة عملية في سطر أوامر لينكس: ستتنقّل في نظام الملفات، تقرأ وتدير الملفات، تبحث داخلها، وتفهم الصلاحيات — وتلتقط عدداً من الأعلام (flags) بصيغة ABADX{...} مباشرة من الطرفية المدمجة على اليمين.',
  tasks:[
    { n:1, ar:'مقدمة إلى لينكس والتوزيعات', en:'Intro to Linux & distributions',
      body:[
        {h:'ما هو لينكس؟'},
        {p:'لينكس (Linux) نظام تشغيل حر ومفتوح المصدر يقوم على نواة (kernel) طوّرها Linus Torvalds عام 1991. النواة هي القلب الذي يتحدث مع العتاد ويدير العمليات والذاكرة والملفات.'},
        {p:'لا يُستخدم لينكس وحده عادةً، بل ضمن «توزيعة» (distribution) تجمع النواة مع أدوات وبرامج. من أشهرها Ubuntu و Debian و Fedora و Kali Linux و Arch.'},
        {tip:'في الأمن السيبراني، إتقان سطر الأوامر (command line) أهم من الواجهة الرسومية؛ فهو أسرع وأقوى وقابل للأتمتة.'},
        {h:'الصدفة (Shell)'},
        {p:'الصدفة هي البرنامج الذي يفسّر أوامرك، وأشهرها Bash. تكتب أمراً، تضغط Enter، فتنفّذه الصدفة وتعرض النتيجة.'},
        {code:'whoami\\nuname -o'}
      ],
      questions:[
        {q:'ما اسم المكوّن الأساسي (القلب) في نظام لينكس الذي يدير العتاد؟ (بالإنجليزية)', ph:'one word', hash:'6923dd1bc0460082c5d55a831908c24a282860b7f1cd6c2b79cf1bc8857c639c', pts:10, hint:'يبدأ بحرف k ويعني «النواة».'},
        {q:'ما الأمر الذي يطبع اسم المستخدم الحالي؟', ph:'command', hash:'f25297859cf0a70af5c053a5464a5fa647a35ceee1d91397331903846d79ffc1', pts:10, hint:'who am i … بدون مسافات.'}
      ]},
    { n:2, ar:'التنقل في نظام الملفات', en:'Navigating the filesystem',
      body:[
        {h:'الشجرة والمسارات'},
        {p:'نظام ملفات لينكس شجرة تبدأ من الجذر /. لكل مستخدم مجلد منزل (home) تحت ‎/home‎. المسار المطلق يبدأ من الجذر، والنسبي من موقعك الحالي.'},
        {p:'أهم ثلاثة أوامر للتنقّل: pwd لمعرفة موقعك، ls لعرض المحتويات، cd للانتقال.'},
        {code:'pwd\\nls\\ncd documents\\ncd ..'},
        {tip:'جرّب الأوامر في الطرفية على اليمين — هي بيئة حقيقية محاكاة ترد على أوامرك.'}
      ],
      questions:[
        {q:'ما الأمر الذي يطبع مسار المجلد الحالي؟', ph:'command', hash:'a1159e9df3670d549d04524532629f5477ceb7deec9b45e47e8c009506ecb2c8', pts:10, hint:'print working directory.'},
        {q:'نفّذ pwd في الطرفية: ما المسار الكامل لمجلد المنزل الخاص بالمستخدم student؟', ph:'/home/...', hash:'47ab460ab0a411d004c40b2cf1e62e79fb34eb922867ad3ca29fa79c7e5d319b', pts:10, hint:'ابدأ من الجذر: ‎/home/‎ ثم اسم المستخدم.'},
        {q:'نفّذ ls: ما اسم المجلد المخصّص للمستندات داخل المنزل؟', ph:'folder name', hash:'9b16b44d0e0a5cac4f968befb0b5b5eba913f9ef3dfa1501ed728b6ead72a357', pts:10, hint:'كلمة إنجليزية جمع تعني «المستندات».'}
      ]},
    { n:3, ar:'قراءة محتوى الملفات', en:'Reading files',
      body:[
        {h:'عرض الملفات'},
        {p:'لعرض محتوى ملف كاملاً استخدم cat. وللأجزاء: head يُظهر أول الأسطر و tail آخرها. للملفات الطويلة يُفضَّل less للتصفّح.'},
        {code:'cat welcome.txt\\nhead -n 2 notes.txt\\ntail -n 1 notes.txt'},
        {h:'الملفات المخفية'},
        {p:'أي ملف يبدأ اسمه بنقطة (.) يُعدّ مخفياً ولا يظهر مع ls العادي، بل مع ls -a.'},
        {warn:'الملفات المخفية ليست سرّية بالضرورة؛ إخفاؤها تنظيمي فقط ويمكن لأي مستخدم قراءتها إن ملك الصلاحية.'}
      ],
      questions:[
        {q:'نفّذ cat welcome.txt واقرأ العلم (flag) المذكور بداخله.', ph:'ABADX{...}', hash:'8991e72fd99aeda17027585fdf1e17232036e59dac93a2d2a699568013b2ae76', pts:15, hint:'العلم في آخر سطر من الملف.'},
        {q:'أظهر الملفات المخفية بـ ls -a ثم اقرأ الملف المخفي (.secret). ما العلم؟', ph:'ABADX{...}', hash:'6542ab49a6f92f46f4bfcb46182ef270e34d7cd9d817ea5eea29eeea6bdc1285', pts:15, hint:'cat .secret'}
      ]},
    { n:4, ar:'إدارة الملفات والمجلدات', en:'Managing files',
      body:[
        {h:'الإنشاء والنسخ والنقل والحذف'},
        {p:'mkdir ينشئ مجلداً، و touch ينشئ ملفاً فارغاً (أو يحدّث وقته). cp ينسخ، mv ينقل أو يعيد التسمية، rm يحذف.'},
        {code:'mkdir lab\\ntouch lab/test.txt\\ncp notes.txt lab/\\nmv lab/test.txt lab/done.txt\\nrm lab/done.txt'},
        {warn:'الأمر rm لا يرسل للمهملات — الحذف نهائي. تعامل معه بحذر، خصوصاً مع rm -r.'}
      ],
      questions:[
        {q:'ما الأمر الذي يُنشئ مجلداً جديداً؟', ph:'command', hash:'95c5007a9af81a5e61624caacc506bb513a476dd6c31d653468154137078246c', pts:10, hint:'make directory.'},
        {q:'ما الأمر الذي يحذف ملفاً؟', ph:'command', hash:'58466ebdd352f801198118e294e38715f864985fd87977f348bfcd7db62e7c76', pts:10, hint:'remove.'},
        {q:'ما الأمر الذي يعيد تسمية ملف أو ينقله؟', ph:'command', hash:'d1829078fe03f2ec5f692c7a217859409b6822240625c10282bb022888657148', pts:10, hint:'move.'}
      ]},
    { n:5, ar:'البحث داخل النظام', en:'Searching: find & grep',
      body:[
        {h:'find — البحث عن الملفات'},
        {p:'find يبحث عن الملفات والمجلدات ضمن شجرة المسارات. أكثر استخداماته شيوعاً البحث بالاسم عبر ‎-name‎.'},
        {code:'find / -name flag.txt\\nfind . -name "*.log"'},
        {h:'grep — البحث داخل المحتوى'},
        {p:'grep يبحث عن نص داخل الملفات ويعرض الأسطر المطابقة. مفيد جداً في تحليل السجلات (logs).'},
        {code:'grep FLAG logs/access.log'}
      ],
      questions:[
        {q:'نفّذ grep FLAG logs/access.log — ما قيمة العلم في السطر المطابق؟', ph:'ABADX{...}', hash:'f70a16b6730dd36c15295c1f7e371f74b7739710aeb289aa36680d72f3ce7487', pts:20, hint:'العلم بعد علامة = في السطر الذي يحوي FLAG.'},
        {q:'نفّذ find / -name flag.txt — ما المسار الكامل للملف؟', ph:'/home/...', hash:'6764bdf0f3e11551f64fe4948e8cb9b61653b86406a7c59f80b43c37211c8088', pts:20, hint:'الملف في مجلد archive داخل documents.'}
      ]},
    { n:6, ar:'الصلاحيات والمستخدمون', en:'Permissions & users',
      body:[
        {h:'قراءة الصلاحيات'},
        {p:'الأمر ls -l يعرض تفاصيل كل ملف: الصلاحيات، المالك، الحجم، التاريخ. تظهر الصلاحيات كعشرة رموز مثل ‎-rwxr-xr--‎: المالك، المجموعة، الآخرون.'},
        {code:'ls -l\\nid\\nwhoami'},
        {h:'chmod والنظام الرقمي'},
        {p:'chmod يغيّر الصلاحيات. بالنظام الرقمي: r=4، w=2، x=1. فمثلاً 7 = rwx، و 5 = r-x. والرقم من ثلاث خانات: المالك فالمجموعة فالآخرون.'},
        {tip:'نفّذ id لرؤية معرّف المستخدم (uid) والمجموعة (gid).'}
      ],
      questions:[
        {q:'ما الأمر (مع الخيار) الذي يعرض الملفات بتفاصيلها وصلاحياتها؟', ph:'command + flag', hash:'f0f40cf78dab06e0d336e5ced925157780fdb4a376f454d6cc80f3d21bf10769', pts:10, hint:'ls مع الخيار l (long).'},
        {q:'نفّذ id: ما قيمة uid للمستخدم student؟', ph:'number', hash:'40510175845988f13f6162ed8526f0b09f73384467fa855e1e79b44a56562a58', pts:10, hint:'رقم من أربع خانات يبدأ بـ 1.'},
        {q:'ما الرمز الرقمي الذي يمنح المالك فقط قراءة وكتابة وتنفيذ (rwx) دون غيره؟', ph:'3 digits', hash:'99ee50221221864d50c60baea6f14d8ac2e235cc6e78be6088cd40cc97fca394', pts:15, hint:'7 للمالك، و0 لكل من المجموعة والآخرين.'}
      ]},
    { n:7, ar:'التحدي الأخير — التقاط العلم', en:'Final challenge — capture the flag',
      body:[
        {h:'اجمع ما تعلّمته'},
        {p:'حان وقت الاختبار الحقيقي. العلم النهائي مخبّأ في ملف مخفي داخل مجلد الإعدادات ‎.config‎. استخدم ما تعلّمته من ls -a و cd و cat لاستخراجه.'},
        {code:'cd .config\\nls -a\\ncat .final'},
        {tip:'تذكّر: الملفات المخفية تبدأ بنقطة ولا تظهر إلا مع ls -a.'}
      ],
      questions:[
        {q:'استخرج العلم النهائي من الملف المخفي ‎.final‎ داخل مجلد ‎.config‎.', ph:'ABADX{...}', hash:'978116d890ee9b2578d32efb9536a6c77ff31d673c3663c66e6ac6962b349d90', pts:30, hint:'cd .config ثم cat .final'}
      ]}
  ],
  // Simulated filesystem for the built-in terminal
  fs:{
    user:'student', host:'abadx', uid:1000, gid:1000,
    tree:{
      'welcome.txt':{c:"أهلاً بك في مختبر Abad X لأساسيات لينكس!\\nهذا ملف نصّي عادي قرأته بالأمر cat.\\nأتقن سطر الأوامر، وستفتح لك أبواب الأمن السيبراني.\\nالعلم: ABADX{read_the_fine_manual}"},
      'notes.txt':{c:"سطر 1: الصدفة الافتراضية هي Bash.\\nسطر 2: الجذر هو /\\nسطر 3: ~ اختصار لمجلد المنزل.\\nسطر 4: man يعرض دليل الأوامر."},
      'readme.md':{c:"# Abad X Lab\\nاستخدم help لعرض الأوامر المتاحة.\\nاستخدم ls -a لإظهار المخفي."},
      '.secret':{c:"ملف مخفي يبدأ اسمه بنقطة.\\nABADX{hidden_files_start_with_dot}"},
      'documents':{d:{
        'report.txt':{c:"تقرير تدريبي — لا يحتوي أعلاماً.\\nتابع البحث في المجلدات الفرعية."},
        'archive':{d:{
          'flag.txt':{c:"أحسنت استخدام find!\\nABADX{find_deep_and_wide}"},
          'old_notes.txt':{c:"ملاحظات قديمة مؤرشفة."}
        }}
      }},
      'logs':{d:{
        'access.log':{c:"[ok] 10.0.0.2 login user=guest\\n[ok] 10.0.0.9 GET /index\\n[warn] 10.0.0.5 failed auth\\n[info] FLAG=ABADX{grep_is_your_friend}\\n[ok] 10.0.0.2 logout"}
      }},
      '.config':{d:{
        'settings.conf':{c:"theme=abadx-blue\\nlang=ar"},
        '.final':{c:"العلم النهائي — لقد أتممت الأساسيات!\\nABADX{linux_fundamentals_complete}"}
      }}
    }
  }
};
