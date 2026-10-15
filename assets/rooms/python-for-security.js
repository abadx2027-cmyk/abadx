// Abad X — Room: Python for Security (بايثون للأمن السيبراني). Original Arabic content.
window.ABADX_ROOM = {
  "id": "python-for-security",
  "ar": "بايثون للأمن السيبراني",
  "en": "Python for Security",
  "icon": "<path d=\"M12 3c-3 0-4 1.5-4 4v2h8V7c0-2.5-1-4-4-4zM8 13v2c0 2.5 1 4 4 4s4-1.5 4-4v-2H8z\"/><circle cx=\"10\" cy=\"5.5\" r=\".7\"/><circle cx=\"14\" cy=\"16.5\" r=\".7\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 60,
  "tags": [
    "Python",
    "Hashing",
    "Base64",
    "Automation"
  ],
  "intro": "نفّذ تمارين بايثون حقيقية داخل المتصفح عبر Pyodide (مع وضع بديل عند فشل CDN): تحليل قائمة منافذ، التجزئة، Base64، وتخمين كلمة مرور من قائمة محلية.",
  "wide": true,
  "tasks": [
    {
      "n": 1,
      "ar": "بايثون سريعاً",
      "en": "Python quickstart",
      "body": [
        {
          "h": "الطباعة والأنواع"
        },
        {
          "p": "print يعرض الناتج. شغّل في المحرر: print(2+2)"
        },
        {
          "code": "print(\"Abad X\")\\nprint(2+2)"
        }
      ],
      "questions": [
        {
          "q": "ما ناتج print(2+2)؟",
          "ph": "number",
          "hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما الدالة التي تعرض نصاً على الشاشة؟",
          "ph": "function",
          "hash": "ce953a0eb08246617b7f849486c4b26a7af37e9d2e8f0e13b3ae1bf0da8a70a2",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 2,
      "ar": "تحليل قائمة منافذ",
      "en": "Parse port list",
      "body": [
        {
          "h": "استخرج المفتوح"
        },
        {
          "p": "استخدم Load example أو اكتب حلقة تفصل السطر عند / وتطبع رقم المنفذ إذا احتوى السطر على open."
        },
        {
          "code": "ports=\"22/tcp open ssh\\n80/tcp open http\\n25/tcp closed smtp\"\\nfor line in ports.splitlines():\\n    if \"open\" in line:\\n        print(line.split(\"/\")[0])"
        }
      ],
      "questions": [
        {
          "q": "كم منفذاً مفتوحاً في مثال المنافذ الثلاثي أعلاه؟",
          "ph": "number",
          "hash": "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
          "pts": 15,
          "hint": "22 و 80"
        },
        {
          "q": "علم تمرين التحليل:",
          "ph": "ABADX{...}",
          "hash": "45978198327aaf24a749f9597de59160c1c7c3676bf3ec56a53dfb22c9b1986a",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "التجزئة Hashing",
      "en": "Hashing",
      "body": [
        {
          "h": "SHA-256"
        },
        {
          "p": "import hashlib ثم hashlib.sha256(b\"text\").hexdigest() يعيد بصمة ثابتة الطول."
        },
        {
          "code": "import hashlib\\nprint(hashlib.sha256(b\"abadx\").hexdigest())"
        }
      ],
      "questions": [
        {
          "q": "ما طول مخرجات SHA-256 بالأحرف الستة عشرية؟",
          "ph": "number",
          "hash": "a68b412c4282555f15546cf6e1fc42893b7e07f271557ceb021821098dd66c1b",
          "pts": 10,
          "hint": "32 بايت = 64 hex"
        },
        {
          "q": "احسب sha256 لـ abadx وأدخل أول 8 أحرف من الـ hex:",
          "ph": "8 hex",
          "hash": "90c04c4098db32c40b94ba3bd70dd79dcb0db47b53fce52ce56298c9f88ef742",
          "pts": 20,
          "hint": "نفّذ الكود وانسخ أول 8 أحرف."
        }
      ]
    },
    {
      "n": 4,
      "ar": "Base64",
      "en": "Base64",
      "body": [
        {
          "h": "ترميز لا تشفير"
        },
        {
          "p": "Base64 يحوّل بايتات إلى نص ASCII — ليس حماية سرية."
        },
        {
          "code": "import base64\\nprint(base64.b64encode(b\"flag\").decode())"
        }
      ],
      "questions": [
        {
          "q": "ما ناتج Base64 لكلمة flag؟",
          "ph": "base64",
          "hash": "39af6703b0ab38f5250934f743b5c4f33500c7c78434a81ef922d8f9c2524049",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "هل Base64 يُعد تشفيراً سرياً؟ (yes/no)",
          "ph": "answer",
          "hash": "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "تخمين من قائمة",
      "en": "Wordlist guess",
      "body": [
        {
          "h": "قارن الهاشات"
        },
        {
          "p": "اكتب حلقة على قائمة كلمات واحسب sha256 حتى تطابق الهدف (هاش كلمة secret في المثال)."
        },
        {
          "code": "import hashlib\\nwords=[\"password\",\"admin\",\"secret\",\"abadx\"]\\ntarget=\"2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b\"\\nfor w in words:\\n    if hashlib.sha256(w.encode()).hexdigest()==target:\\n        print(\"FOUND\", w)"
        },
        {
          "tip": "الهدف في المثال هو هاش sha256 لكلمة secret."
        }
      ],
      "questions": [
        {
          "q": "ما الكلمة التي يطابق هاشها الهدف في المثال؟",
          "ph": "word",
          "hash": "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b",
          "pts": 20,
          "hint": ""
        },
        {
          "q": "علم كسر الهاش المحلي:",
          "ph": "ABADX{...}",
          "hash": "c88d2f71386b1838b22541d0712b52a75ebcef879454036190f642b57265b6fb",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 6,
      "ar": "مراجعة",
      "en": "Review",
      "body": [
        {
          "p": "بايثون يسرّع التحليل والأتمتة. لا تستخدم التخمين إلا بإذن، وفضّل مكتبات التجزئة القياسية."
        }
      ],
      "questions": [
        {
          "q": "ما المكتبة القياسية للتجزئة في بايثون؟",
          "ph": "module",
          "hash": "2dfc7fde14154f53fa303391a439b00ec6284c2831b9a465b83f7372cb962cc9",
          "pts": 10,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "python",
      "title": "Python IDE",
      "starter": "print(\"Hello from Abad X\")\nprint(2+2)\n"
    }
  ]
};
