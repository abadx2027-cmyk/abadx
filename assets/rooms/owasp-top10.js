// Abad X — Room: OWASP Top 10 Intro (مدخل إلى OWASP Top 10). Original Arabic content.
window.ABADX_ROOM = {
  "id": "owasp-top10",
  "ar": "مدخل إلى OWASP Top 10",
  "en": "OWASP Top 10 Intro",
  "icon": "<path d=\"M12 3 4 7v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7z\"/><path d=\"M9 12h6M12 9v6\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 60,
  "tags": [
    "OWASP",
    "SQLi",
    "XSS",
    "IDOR",
    "Auth"
  ],
  "intro": "تعرّف عملياً على أربع فئات شائعة من مخاطر تطبيقات الويب عبر ودجات محاكاة آمنة بالكامل في المتصفح: حقن SQL، XSS منعكس داخل sandbox، IDOR، ومصادقة ضعيفة.",
  "wide": true,
  "tasks": [
    {
      "n": 1,
      "ar": "ما هو OWASP؟",
      "en": "What is OWASP?",
      "body": [
        {
          "h": "مرجع للمخاطر"
        },
        {
          "p": "OWASP مجتمع يوثّق مخاطر أمن التطبيقات. قائمة Top 10 تلخّص أكثر المخاطر شيوعاً مثل Broken Access Control و Injection و Security Misconfiguration."
        }
      ],
      "questions": [
        {
          "q": "ما الاختصار الذي يشير إلى مجتمع أمن تطبيقات الويب الأشهر؟",
          "ph": "acronym",
          "hash": "1ec32ca39b427db9f1eb69a2c43f6aadb055d665340177848b00c24554251b09",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "هلInjection من فئات المخاطر الشائعة؟ (yes/no)",
          "ph": "answer",
          "hash": "8a798890fe93817163b10b5f7bd2ca4d25d84c52739a645a889c173eee7d9d3d",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 2,
      "ar": "حقن SQL محاكى",
      "en": "Simulated SQLi",
      "body": [
        {
          "h": "تجاوز تسجيل الدخول"
        },
        {
          "p": "في ودجة SQL Injection أدخل في حقل المستخدم حمولة كلاسيكية للتعلّم مثل: admin'-- أو ' OR '1'='1 ثم راقب الاستعلام المحاكى والعلم."
        },
        {
          "warn": "هذا التمرين محاكى محلياً فقط — لا تستخدم هذه التقنيات على أنظمة حقيقية دون إذن."
        }
      ],
      "questions": [
        {
          "q": "أدخل العلم بعد نجاح تجاوز SQLi:",
          "ph": "ABADX{...}",
          "hash": "d38d5a2a1c337ae141d62a50f61b0707dc8c9636c4a9b0c61b3cf7e9d4077f2c",
          "pts": 25,
          "hint": ""
        },
        {
          "q": "ما الرمز الذي يُستخدم غالباً لتعليق بقية الاستعلام في SQL؟",
          "ph": "--",
          "hash": "d8156bae0c4243d3742fc4e9774d8aceabe0410249d720c855f98afc88ff846c",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "XSS منعكس (sandbox)",
      "en": "Reflected XSS (sandbox)",
      "body": [
        {
          "h": "انعكاس المدخلات"
        },
        {
          "p": "أدخل وسمة أو سكربت في صندوق البحث. التنفيذ الحقيقي معطّل داخل Shadow DOM، لكن الاكتشاف يمنحك العلم عند رصد نمط XSS."
        },
        {
          "code": "<img src=x onerror=alert(1)>"
        }
      ],
      "questions": [
        {
          "q": "أدخل علم XSS:",
          "ph": "ABADX{...}",
          "hash": "07c12c93cf9b10e89e37d45f31ed48ca468bd770083818a7af4aa5fead9d27d2",
          "pts": 25,
          "hint": ""
        },
        {
          "q": "هل يكفي ترميز المخرجات (output encoding) لتقليل XSS؟ (yes/no)",
          "ph": "answer",
          "hash": "8a798890fe93817163b10b5f7bd2ca4d25d84c52739a645a889c173eee7d9d3d",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "IDOR",
      "en": "IDOR",
      "body": [
        {
          "h": "مرجع كائن غير آمن"
        },
        {
          "p": "غيّر id من 1 إلى 9 في طلب الملف الشخصي المحاكى واقرأ بيانات المدير."
        }
      ],
      "questions": [
        {
          "q": "ما دور المستخدم ذو id=9؟",
          "ph": "role",
          "hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم IDOR:",
          "ph": "ABADX{...}",
          "hash": "99eca93e4a399b1dca803afd0145d85126e2dd38468a20898b7f0bf84b2b5518",
          "pts": 25,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "مصادقة مكسورة",
      "en": "Broken authentication",
      "body": [
        {
          "h": "كلمات مرور ضعيفة"
        },
        {
          "p": "جرّب Spray top5 أو خمّن كلمة مرور admin الضعيفة في الودجة الرابعة."
        }
      ],
      "questions": [
        {
          "q": "ما كلمة مرور admin الضعيفة المكتشفة؟",
          "ph": "password",
          "hash": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
          "pts": 15,
          "hint": "admin123"
        },
        {
          "q": "علم المصادقة الضعيفة:",
          "ph": "ABADX{...}",
          "hash": "ef922601f1e3565d82123c0e66d78d11a02bf40aa13f373fe10b83b1f7ca2d0e",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 6,
      "ar": "الدفاع بإيجاز",
      "en": "Defense notes",
      "body": [
        {
          "h": "مبادئ"
        },
        {
          "p": "استخدم استعلامات مُعلَّمة ضد الحقن، ورمّز المخرجات ضد XSS، وافحص الصلاحيات في الخادم ضد IDOR، وفرض كلمات مرور قوية وMFA ضد كسر المصادقة."
        }
      ],
      "questions": [
        {
          "q": "أين يجب التحقق من صلاحية الوصول إلى كائن؟ (client/server)",
          "ph": "client|server",
          "hash": "b3eacd33433b31b5252351032c9b3e7a2e7aa7738d5decdf0dd6c62680853c06",
          "pts": 10,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "widgets",
      "title": "Vuln Widgets"
    }
  ]
};
