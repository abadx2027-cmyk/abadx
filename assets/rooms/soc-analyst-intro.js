// Abad X — Room: SOC Analyst Intro (مدخل محلل العمليات الأمنية). Original Arabic content.
window.ABADX_ROOM = {
  "id": "soc-analyst-intro",
  "ar": "مدخل محلل العمليات الأمنية",
  "en": "SOC Analyst Intro",
  "icon": "<path d=\"M4 6h16v12H4z\"/><path d=\"M8 10h8M8 14h5\"/><circle cx=\"17\" cy=\"14\" r=\"1\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 55,
  "tags": [
    "SOC",
    "Logs",
    "BlueTeam",
    "SIEM"
  ],
  "intro": "اقرأ سجلات مصادقة وويب وجدار حماية وهمية، وابحث عن هجوم تخمين كلمات مرور، وعنوان IP مشبوه، وأنشئ خطّاً زمنياً بسيطاً للحادث.",
  "wide": true,
  "tasks": [
    {
      "n": 1,
      "ar": "دور محلل SOC",
      "en": "SOC role",
      "body": [
        {
          "h": "المراقبة والاستجابة"
        },
        {
          "p": "محلل مركز العمليات الأمنية (SOC) يراقب التنبيهات والسجلات، يميّز الضوضاء عن الحوادث، ويصعّد عند الحاجة."
        }
      ],
      "questions": [
        {
          "q": "ما اختصار مركز العمليات الأمنية؟",
          "ph": "acronym",
          "hash": "7114d75b28f21587e37f4a299da0a9428684a8b72773b3087e8d6e63cfb4f312",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "هل تحليل السجلات جزء من عمل SOC؟ (yes/no)",
          "ph": "answer",
          "hash": "8a798890fe93817163b10b5f7bd2ca4d25d84c52739a645a889c173eee7d9d3d",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 2,
      "ar": "عارض السجلات",
      "en": "Log viewer",
      "body": [
        {
          "h": "صفِّ الضوضاء"
        },
        {
          "p": "استخدم البحث والتصفية حسب المصدر (auth/web/fw). ابدأ بـ FAIL في سجلات المصادقة."
        }
      ],
      "questions": [
        {
          "q": "كم محاولة SSH فاشلة من 203.0.113.66 تقريباً؟",
          "ph": "number",
          "hash": "6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918",
          "pts": 15,
          "hint": "12"
        },
        {
          "q": "ما المستخدم المستهدف في هجوم التخمين؟",
          "ph": "user",
          "hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "اكتشاف Brute Force",
      "en": "Spot brute force",
      "body": [
        {
          "h": "نمط واضح"
        },
        {
          "p": "تكرار فشل تسجيل الدخول ثم نجاح مفاجئ من نفس الـ IP مؤشر كلاسيكي."
        }
      ],
      "questions": [
        {
          "q": "ما عنوان IP الذي نفّذ تخمين كلمات المرور؟",
          "ph": "x.x.x.x",
          "hash": "a6353bfbe92ae34a8544b367820743d0175595f96dcad8b904c39583f24c3eec",
          "pts": 20,
          "hint": ""
        },
        {
          "q": "علم مرتبط بعنوان المهاجم:",
          "ph": "ABADX{...}",
          "hash": "9abf8d8f886a429d5336bda2a0e9d3490549d03adef01d9b81924856bae9bcce",
          "pts": 25,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "نشاط ويب مشبوه",
      "en": "Suspicious web",
      "body": [
        {
          "h": "أدوات هجومية"
        },
        {
          "p": "ابحث عن sqlmap في سجلات الويب."
        }
      ],
      "questions": [
        {
          "q": "ما الـ User-Agent المشبوه؟",
          "ph": "agent",
          "hash": "afe41b856b12f436ba0892e0823ade950dbe9087b1aeca587d4996715cb6e1d5",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم وكيل المستخدم المشبوه:",
          "ph": "ABADX{...}",
          "hash": "96d32b71b20ea39d28a7c1072b3ec7f66cd677cf4d39878da8a31e0b4ad5923d",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "جدار الحماية",
      "en": "Firewall",
      "body": [
        {
          "h": "ماذا حُجب؟"
        },
        {
          "p": "راجع مصدر fw وابحث عن BLOCK/DENIED."
        }
      ],
      "questions": [
        {
          "q": "ما IP الذي حُجب اتصاله نحو 10.0.0.5:22؟",
          "ph": "x.x.x.x",
          "hash": "140cc81db30fc9c9e2c65d79fe98abcab9bd5e3b86e6fb77244705c51c51ff86",
          "pts": 15,
          "hint": ""
        }
      ]
    },
    {
      "n": 6,
      "ar": "الخط الزمني",
      "en": "Timeline",
      "body": [
        {
          "h": "رتّب الأحداث"
        },
        {
          "p": "هجوم التخمين بدأ قبل نجاح الدخول. سجّل الوقت التقريبي لنجاح admin من السجلات."
        }
      ],
      "questions": [
        {
          "q": "في أي ثانية تقريباً (SS من الختم الزمني 22:00:SS) نجح دخول admin؟",
          "ph": "number",
          "hash": "624b60c58c9d8bfb6ff1886c2fd605d2adeb6ea4da576068201b6c6958ce93f4",
          "pts": 15,
          "hint": "22:00:30 → 30"
        },
        {
          "q": "هل نجاح الدخول بعد سلسلة فشل يرفع أولوية التحقيق؟ (yes/no)",
          "ph": "answer",
          "hash": "8a798890fe93817163b10b5f7bd2ca4d25d84c52739a645a889c173eee7d9d3d",
          "pts": 10,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "logs",
      "title": "Log Viewer",
      "logs": [
        {
          "t": "2026-10-15 22:00:00",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:02",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:04",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:06",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:08",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:10",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:12",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:14",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:16",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:18",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:20",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:22",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "FAIL",
          "detail": "Invalid password"
        },
        {
          "t": "2026-10-15 22:00:30",
          "src": "auth",
          "ip": "203.0.113.66",
          "user": "admin",
          "action": "ssh_login",
          "status": "OK",
          "detail": "Accepted password"
        },
        {
          "t": "2026-10-15 22:00:40",
          "src": "auth",
          "ip": "10.0.0.15",
          "user": "alice",
          "action": "ssh_login",
          "status": "OK",
          "detail": "Accepted publickey"
        },
        {
          "t": "2026-10-15 22:00:50",
          "src": "auth",
          "ip": "10.0.0.15",
          "user": "alice",
          "action": "ssh_logout",
          "status": "OK",
          "detail": "Disconnected"
        },
        {
          "t": "2026-10-15 22:01:00",
          "src": "web",
          "ip": "203.0.113.66",
          "user": "-",
          "action": "GET /",
          "status": "200",
          "detail": "Mozilla/5.0"
        },
        {
          "t": "2026-10-15 22:01:10",
          "src": "web",
          "ip": "198.51.100.20",
          "user": "-",
          "action": "GET /wp-login.php",
          "status": "404",
          "detail": "sqlmap/1.7"
        },
        {
          "t": "2026-10-15 22:01:12",
          "src": "web",
          "ip": "198.51.100.20",
          "user": "-",
          "action": "GET /admin",
          "status": "403",
          "detail": "sqlmap/1.7"
        },
        {
          "t": "2026-10-15 22:01:20",
          "src": "web",
          "ip": "10.0.0.8",
          "user": "bob",
          "action": "POST /api/login",
          "status": "200",
          "detail": "AbadX-Browser/1.0"
        },
        {
          "t": "2026-10-15 22:01:25",
          "src": "web",
          "ip": "10.0.0.8",
          "user": "bob",
          "action": "GET /dashboard",
          "status": "200",
          "detail": "AbadX-Browser/1.0"
        },
        {
          "t": "2026-10-15 22:01:30",
          "src": "fw",
          "ip": "198.51.100.20",
          "user": "-",
          "action": "BLOCK",
          "status": "DENIED",
          "detail": "Outbound to 10.0.0.5:22 blocked"
        },
        {
          "t": "2026-10-15 22:01:35",
          "src": "fw",
          "ip": "203.0.113.66",
          "user": "-",
          "action": "ALLOW",
          "status": "OK",
          "detail": "Inbound 22 from 203.0.113.66"
        },
        {
          "t": "2026-10-15 22:01:36",
          "src": "fw",
          "ip": "203.0.113.66",
          "user": "-",
          "action": "ALLOW",
          "status": "OK",
          "detail": "Inbound 22 (bruteforce pattern)"
        },
        {
          "t": "2026-10-15 22:01:40",
          "src": "web",
          "ip": "203.0.113.66",
          "user": "-",
          "action": "GET /flag.txt",
          "status": "200",
          "detail": "curl/8.0 FLAG_HINT=ABADX{brute_force_ip}"
        }
      ]
    }
  ]
};
