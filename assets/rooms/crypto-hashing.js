// Abad X — Room: Crypto, Hashing & Encoding (التشفير والتجزئة والترميز). Original Arabic content.
window.ABADX_ROOM = {
  "id": "crypto-hashing",
  "ar": "التشفير والتجزئة والترميز",
  "en": "Crypto, Hashing & Encoding",
  "icon": "<path d=\"M10 4v16M14 4v16M5 9h14M5 15h14\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 50,
  "tags": [
    "Crypto",
    "Hashing",
    "Base64",
    "SHA-256"
  ],
  "intro": "فرّق بين الترميز والتجزئة والتشفير، وجرّب أدوات تفاعلية (Base64، Caesar، SHA-256 عبر WebCrypto) واكسر هاشاً مقابل قائمة كلمات محلية.",
  "wide": true,
  "tasks": [
    {
      "n": 1,
      "ar": "ثلاث كلمات مختلفة",
      "en": "Three different ideas",
      "body": [
        {
          "h": "Encoding vs Hashing vs Encryption"
        },
        {
          "p": "الترميز (encoding) مثل Base64 قابل للعكس بدون سر. التجزئة (hashing) اتجاه واحد لبصمة ثابتة. التشفير (encryption) قابل للعكس بمفتاح سري."
        }
      ],
      "questions": [
        {
          "q": "أيها اتجاه واحد عادةً: encoding أم hashing أم encryption؟",
          "ph": "hashing",
          "hash": "e365cd9c617713a54c6455f9d8998ba16e81e5078585f33a2ddca8f03a3e8593",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "هل Base64 يتطلب مفتاحاً سرياً؟ (yes/no)",
          "ph": "answer",
          "hash": "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 2,
      "ar": "Base64 عملياً",
      "en": "Base64 practice",
      "body": [
        {
          "h": "استخدم الأداة"
        },
        {
          "p": "في المختبر Encode للنص AbadX ثم Decode للتأكد. القيمة المتوقعة لـ AbadX هي QWJhZFg="
        },
        {
          "code": "AbadX → QWJhZFg="
        }
      ],
      "questions": [
        {
          "q": "ما Base64 لكلمة AbadX؟",
          "ph": "base64",
          "hash": "135292805c16907d8f78ead91f1f40aa7a5e7fa08155e565bd449bd133efbdaf",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "فك الترميز QWJhZFg= يعيد؟",
          "ph": "answer",
          "hash": "6431385a3279de3fadf272b718011032d7b32ebce31ddbedf97c40a4703eb754",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "قيصر Caesar",
      "en": "Caesar cipher",
      "body": [
        {
          "h": "إزاحة الحروف"
        },
        {
          "p": "شيفرة قيصر تزاح كل حرف بعدد ثابت. استخدم الأداة: Decrypt للنص DEBGZ مع إزاحة 3."
        },
        {
          "tip": "الإزاحة 3 على DEBGZ → ABADX"
        }
      ],
      "questions": [
        {
          "q": "بعد فك قيصر (shift 3) لـ DEBGZ ما الناتج؟",
          "ph": "ABADX{...}",
          "hash": "6431385a3279de3fadf272b718011032d7b32ebce31ddbedf97c40a4703eb754",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم قيصر:",
          "ph": "ABADX{...}",
          "hash": "4cd4f73615a2461211154081835f20db10672a45ab6944ee00f67db9403fdc8a",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "SHA-256",
      "en": "SHA-256",
      "body": [
        {
          "h": "بصمة رقمية"
        },
        {
          "p": "احسب SHA-256 لكلمة abadx عبر الأداة. أي تغيير بسيط يغيّر الهاش بالكامل."
        }
      ],
      "questions": [
        {
          "q": "أدخل الهاش الكامل لكلمة abadx:",
          "ph": "64 hex",
          "hash": "ee903005abe5bf8d0991e374b699baab4a0124025ea7c72923a2dc2d8c4ff147",
          "pts": 25,
          "hint": "استخدم أداة SHA-256"
        },
        {
          "q": "علم مرتبط بالتجزئة:",
          "ph": "ABADX{...}",
          "hash": "1c3514813e7a999e2c16b24503979314586138ec7e3b8cfd14f6225a68d1dd74",
          "pts": 15,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "كسر هاش محلي",
      "en": "Crack a hash",
      "body": [
        {
          "h": "قائمة كلمات"
        },
        {
          "p": "الصق هذا الهاش في أداة Hash cracker: a9c43be948c5cabd56ef2bacffb77cdaa5eec49dd5eb0cc4129cf3eda5f0e74c (كلمة من القائمة المحلية)."
        },
        {
          "tip": "القائمة تشمل: password, admin, 123456, abadx, letmein, qwerty, secret, welcome, dragon, monkey"
        }
      ],
      "questions": [
        {
          "q": "ما الكلمة المكتشفة؟",
          "ph": "word",
          "hash": "a9c43be948c5cabd56ef2bacffb77cdaa5eec49dd5eb0cc4129cf3eda5f0e74c",
          "pts": 20,
          "hint": ""
        },
        {
          "q": "علم الكسر:",
          "ph": "ABADX{...}",
          "hash": "6a2c7ec489717663db64828ad05b0ca7da53a1dbd295d0fb251ba4e6bd1a78d4",
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
          "p": "لا تستخدم التجزئة وحدها لتخزين كلمات المرور دون salt وخوارزمية بطيئة مناسبة (مثل bcrypt/argon2 في الأنظمة الحقيقية)."
        }
      ],
      "questions": [
        {
          "q": "هل التجزئة وحدها كافية بدون ملح (salt) لتخزين كلمات المرور الحديثة؟ (yes/no)",
          "ph": "answer",
          "hash": "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59",
          "pts": 10,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "tools",
      "title": "Crypto Tools",
      "tools": [
        "base64",
        "caesar",
        "sha256",
        "crack"
      ],
      "wordlist": [
        "password",
        "admin",
        "123456",
        "abadx",
        "letmein",
        "qwerty",
        "secret",
        "welcome",
        "dragon",
        "monkey"
      ]
    }
  ]
};
