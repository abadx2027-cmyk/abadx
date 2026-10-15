// Abad X — Room: Web Basics & Proxy (أساسيات الويب والبروكسي). Original Arabic content.
window.ABADX_ROOM = {
  "id": "web-basics-burp",
  "ar": "أساسيات الويب والبروكسي",
  "en": "Web Basics & Proxy",
  "icon": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 55,
  "tags": [
    "HTTP",
    "Cookies",
    "Burp",
    "Proxy"
  ],
  "intro": "افهم طلبات واستجابات HTTP، والكوكيز، وكيف يعمل اعتراض الطلب (Intercept) وتكراره (Repeater) عبر بروكسي محاكى يتحدث مع تطبيق متجر وهمي.",
  "wide": true,
  "tasks": [
    {
      "n": 1,
      "ar": "تركيب رسالة HTTP",
      "en": "HTTP message anatomy",
      "body": [
        {
          "h": "الطلب والاستجابة"
        },
        {
          "p": "طلب HTTP يبدأ بسطر مثل GET /path HTTP/1.1 ثم ترويسات (Headers) ثم سطر فارغ ثم جسم اختياري. الاستجابة تبدأ بحالة مثل 200 OK."
        },
        {
          "code": "GET / HTTP/1.1\\nHost: shop.abadx.lab\\n\\n"
        }
      ],
      "questions": [
        {
          "q": "ما أول كلمة في سطر طلب يجلب صفحة؟",
          "ph": "method",
          "hash": "2998b3232d29e8dc5a78d97a32ce83f556f3ed31b057077503df05641dd79158",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما الترويسة التي تحدّد اسم المضيف الافتراضي؟",
          "ph": "Header",
          "hash": "4740ae6347b0172c01254ff55bae5aff5199f4446e7f6d643d40185b3f475145",
          "pts": 10,
          "hint": "Host"
        }
      ]
    },
    {
      "n": 2,
      "ar": "أكواد الحالة",
      "en": "Status codes",
      "body": [
        {
          "h": "أرقام لها معنى"
        },
        {
          "p": "200 نجاح، 302 إعادة توجيه، 401 غير مصرّح، 403 ممنوع، 404 غير موجود، 500 خطأ خادم. راقب حقل الحالة في لوحة الاستجابة."
        }
      ],
      "questions": [
        {
          "q": "ما رمز الحالة لصفحة غير موجودة؟",
          "ph": "code",
          "hash": "6b3c238ebcf1f3c07cf0e556faa82c6b8fe96840ff4b6b7e9962a2d855843a0b",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما رمز الحالة للنجاح؟",
          "ph": "code",
          "hash": "27badc983df1780b60c2b3fa9d3a19a00e46aac798451f0febdca52920faaddf",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "الكوكيز والجلسات",
      "en": "Cookies & sessions",
      "body": [
        {
          "h": "كيف يتذكّرك الموقع؟"
        },
        {
          "p": "الخادم يرسل Set-Cookie، والمتصفح يعيد إرسال Cookie في الطلبات التالية. في المختبر: أرسل GET / ثم انظر Set-Cookie، ثم أعد الطلب مع الترويسة."
        },
        {
          "tip": "بعد زيارة / يظهر session في jar الكوكيز."
        }
      ],
      "questions": [
        {
          "q": "ما اسم كوكي الجلسة الذي يضبطه المتجر؟",
          "ph": "name",
          "hash": "3f3af1ecebbd1410ab417ec0d27bbfcb5d340e177ae159b59fc8626c2dfd9175",
          "pts": 15,
          "hint": "session"
        },
        {
          "q": "أدخل علم فهم الكوكيز:",
          "ph": "ABADX{...}",
          "hash": "1dda5c0ecdddfd5dca8a324fedbe99d6347c7ae166ffd5fe99c27f593ffd6131",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "Repeater وتعديل الطلب",
      "en": "Repeater edits",
      "body": [
        {
          "h": "غيّر المعرّف"
        },
        {
          "p": "أرسل GET /api/item?id=1 ثم غيّر id إلى 9 وأعد الإرسال. التطبيق المحاكى يعيد بيانات عنصر مختلف — هذا تمرين على التحكم بالطلب."
        },
        {
          "code": "GET /api/item?id=9 HTTP/1.1\\nHost: shop.abadx.lab\\nCookie: session=guest\\n\\n"
        }
      ],
      "questions": [
        {
          "q": "ما اسم العنصر عندما id=9؟",
          "ph": "name",
          "hash": "22881ce9dbf6763641a9f462bc58e5f6972992da2e67720dff6dd6a67e999ec4",
          "pts": 15,
          "hint": "Admin Keycard"
        },
        {
          "q": "التقط العلم من استجابة id=9:",
          "ph": "ABADX{...}",
          "hash": "3452842da7831282119e53412b13a9b591f71588835be25279226cf88713d300",
          "pts": 25,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "POST وتسجيل الدخول",
      "en": "POST login",
      "body": [
        {
          "h": "إرسال بيانات"
        },
        {
          "p": "جرّب POST /login مع جسم user=demo&pass=demo ثم راقب الاستجابة والكوكي الجديد."
        },
        {
          "code": "POST /login HTTP/1.1\\nHost: shop.abadx.lab\\nContent-Type: application/x-www-form-urlencoded\\nContent-Length: 20\\n\\nuser=demo&pass=demo"
        }
      ],
      "questions": [
        {
          "q": "بعد تسجيل دخول demo بنجاح، ما قيمة كوكي session؟",
          "ph": "value",
          "hash": "dc88db9df0d21f7511d16c2605cec7f666dd22aa9dfe9a28b8285bda79d5dfd5",
          "pts": 15,
          "hint": "demo-ok"
        },
        {
          "q": "ما طريقة HTTP المستخدمة لإرسال النموذج عادة؟",
          "ph": "method",
          "hash": "72231043bc1807e6f740b235eb7511ecb33255a6a375435631196de8a9750d4b",
          "pts": 10,
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
          "h": "ملخص",
          "p": "البروكسي يكشف كل ترويسة وجسم. عدّل بحذر وافهم التأثير قبل الإرسال في بيئة حقيقية مصرّح بها."
        }
      ],
      "questions": [
        {
          "q": "هل يمكن أن تُرسل الكوكيز تلقائياً مع كل طلب لنفس الموقع؟ (yes/no)",
          "ph": "yes|no",
          "hash": "8a798890fe93817163b10b5f7bd2ca4d25d84c52739a645a889c173eee7d9d3d",
          "pts": 10,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "http",
      "title": "Proxy / Repeater",
      "request": "GET / HTTP/1.1\nHost: shop.abadx.lab\nUser-Agent: AbadX-Browser/1.0\nAccept: */*\n\n",
      "cookies": [],
      "app": {
        "routes": [
          {
            "method": "GET",
            "path": "/",
            "status": 200,
            "body": "<h1>AbadX Shop</h1><p>Welcome guest</p>\n<!-- set cookie -->",
            "setCookies": [
              {
                "name": "session",
                "value": "guest"
              }
            ],
            "flag": "ABADX{cookie_session_hijack}"
          },
          {
            "method": "GET",
            "path": "/api/item",
            "status": 200,
            "when": {
              "query": {
                "id": "1"
              }
            },
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{\"id\":1,\"name\":\"Starter Pack\",\"price\":9}"
          },
          {
            "method": "GET",
            "path": "/api/item",
            "status": 200,
            "when": {
              "query": {
                "id": "9"
              }
            },
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{\"id\":9,\"name\":\"Admin Keycard\",\"price\":0}",
            "flag": "ABADX{burp_modified_id}"
          },
          {
            "method": "GET",
            "path": "/api/item",
            "status": 404,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{\"error\":\"not found\"}"
          },
          {
            "method": "POST",
            "path": "/login",
            "status": 200,
            "when": {
              "bodyIncludes": "user=demo&pass=demo"
            },
            "body": "Login OK as demo",
            "setCookies": [
              {
                "name": "session",
                "value": "demo-ok"
              }
            ]
          },
          {
            "method": "POST",
            "path": "/login",
            "status": 401,
            "body": "Invalid credentials"
          },
          {
            "method": "GET",
            "path": "/admin",
            "status": 403,
            "when": {
              "cookie": {
                "session": "guest"
              }
            },
            "body": "Forbidden"
          },
          {
            "method": "GET",
            "path": "/admin",
            "status": 200,
            "when": {
              "cookie": {
                "session": "demo-ok"
              }
            },
            "body": "Admin panel (demo)"
          },
          {
            "method": "GET",
            "path": "/missing",
            "status": 404,
            "body": "Not Found"
          }
        ]
      }
    }
  ]
};
