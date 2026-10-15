// Abad X — Room: Bash Scripting (سكربتات Bash). Original Arabic content.
window.ABADX_ROOM = {
  "id": "bash-scripting",
  "ar": "سكربتات Bash",
  "en": "Bash Scripting",
  "icon": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"m8 9 3 3-3 3M13 15h4\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 55,
  "tags": [
    "Bash",
    "Linux",
    "Automation",
    "Scripting"
  ],
  "intro": "اكتب ونفّذ سكربتات Bash داخل الطرفية المحاكاة: متغيرات، شروط، حلقات، ودوال — مع ملفات جاهزة في المنزل.",
  "tasks": [
    {
      "n": 1,
      "ar": "المتغيرات",
      "en": "Variables",
      "body": [
        {
          "h": "التخزين البسيط"
        },
        {
          "p": "في Bash: NAME=AbadX ثم echo $NAME. لا تضع مسافات حول =. المتغير $? يحفظ حالة خروج آخر أمر."
        },
        {
          "code": "COURSE=security\\necho $COURSE"
        }
      ],
      "questions": [
        {
          "q": "ما الرمز المستخدم لتوسيع قيمة متغير؟",
          "ph": "$",
          "hash": "09fc96082d34c2dfc1295d92073b5ea1dc8ef8da95f14dfded011ffb96d3e54b",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "نفّذ NAME=abadx ثم echo $NAME — ما المخرجات؟",
          "ph": "answer",
          "hash": "6431385a3279de3fadf272b718011032d7b32ebce31ddbedf97c40a4703eb754",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 2,
      "ar": "الشروط if",
      "en": "if conditions",
      "body": [
        {
          "h": "اتخذ قراراً"
        },
        {
          "p": "الصيغة: if [ $x -gt 3 ]; then echo big; else echo small; fi — لاحظ المسافات داخل [ ]."
        },
        {
          "code": "x=5\\nif [ $x -gt 3 ]; then echo big; else echo small; fi"
        },
        {
          "tip": "جرّب الأمر في الطرفية الآن."
        }
      ],
      "questions": [
        {
          "q": "مع x=5 ماذا يطبع المثال؟",
          "ph": "answer",
          "hash": "2a21fe6d592a19b7de898b50eb53c429608de1a66f3e9f62da19714a770553d1",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "ما الكلمة التي تُغلق كتلة if؟",
          "ph": "keyword",
          "hash": "b4bdc848109722a383d0a972c6eb859f2abd29565b8c4cc7199e7c9eb708f1b7",
          "pts": 10,
          "hint": "عكس if."
        }
      ]
    },
    {
      "n": 3,
      "ar": "حلقات for",
      "en": "for loops",
      "body": [
        {
          "h": "التكرار"
        },
        {
          "p": "for i in 1 2 3; do echo n$i; done يطبع n1 n2 n3."
        },
        {
          "code": "for i in 1 2 3; do echo n$i; done"
        }
      ],
      "questions": [
        {
          "q": "ما الكلمة التي تبدأ جسم الحلقة بعد القائمة؟",
          "ph": "answer",
          "hash": "ac0b52a2ae6ef99999bc08fb31e19188bf0085a4614204068e677e140e1458be",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "أدخل علم إتقان الحلقات:",
          "ph": "ABADX{...}",
          "hash": "da7aa4f561fb23e2146728a1e8a16d1398a77a49b7698f6ed92ffb275716a67a",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "تشغيل سكربت",
      "en": "Running a script",
      "body": [
        {
          "h": "الملف والتنفيذ"
        },
        {
          "p": "اقرأ scripts/hello.sh ثم: chmod +x scripts/hello.sh ونفّذه بـ ./scripts/hello.sh أو bash scripts/hello.sh"
        },
        {
          "code": "cat scripts/hello.sh\\nchmod +x scripts/hello.sh\\n./scripts/hello.sh"
        }
      ],
      "questions": [
        {
          "q": "ما العلم الذي يطبعه scripts/hello.sh؟",
          "ph": "ABADX{...}",
          "hash": "d771ce6eda5e558ca6b54a71a1daa17ba9e32a99b408436f0d1b26dcc0ceaeda",
          "pts": 25,
          "hint": ""
        },
        {
          "q": "ما الأمر الذي يغيّر صلاحيات التنفيذ؟",
          "ph": "command",
          "hash": "e0fee4c9a9eddde0ab0cc34cca18bb298b47e042d3654f3abc2385ca39becbc9",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "الحلقات والملفات",
      "en": "Loop over files",
      "body": [
        {
          "h": "أتمتة بسيطة"
        },
        {
          "p": "نفّذ bash scripts/ports.sh الذي يقرأ ports.list ويطبع المنافذ المفتوحة فقط."
        },
        {
          "code": "bash scripts/ports.sh"
        }
      ],
      "questions": [
        {
          "q": "كم منفذاً مفتوحاً يطبع ports.sh؟",
          "ph": "number",
          "hash": "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
          "pts": 15,
          "hint": "22 و 80 و 443"
        },
        {
          "q": "ما أول منفذ يطبعه؟",
          "ph": "port",
          "hash": "785f3ec7eb32f30b90cd0fcf3657d388b5ff4297f2f9716ff66e9b69c05ddd09",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 6,
      "ar": "while والحساب",
      "en": "while & arithmetic",
      "body": [
        {
          "h": "أعد الاستخدام"
        },
        {
          "p": "while تكرر طالما الشرط صحيح. الحساب عبر $((i+1))."
        },
        {
          "code": "i=1\\nwhile [ $i -le 3 ]; do echo $i; i=$((i+1)); done"
        }
      ],
      "questions": [
        {
          "q": "ما مخرجات الحلقة while من 1 إلى 3 مفصولة بمسافة؟",
          "ph": "1 2 3",
          "hash": "7c8f5059290305cec8323d79521f0353c9ac308b60cb4c1976340d0ce4a121d5",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "ما بادئة توسيع الحساب في Bash؟",
          "ph": "$((",
          "hash": "1fb31ef66b3aa1c37b7b723b774f4042f62f064e30cb94100845bec58ad507bb",
          "pts": 10,
          "hint": "تبدأ بـ $ ثم (("
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "terminal",
      "title": "Bash Lab",
      "banner": "Abad X Bash lab — جرّب المتغيرات والحلقات والسكربتات في scripts/",
      "fs": {
        "user": "student",
        "host": "abadx",
        "uid": 1000,
        "gid": 1000,
        "tree": {
          "ports.list": {
            "c": "22/tcp open ssh\\n25/tcp closed smtp\\n80/tcp open http\\n110/tcp closed pop3\\n443/tcp open https"
          },
          "scripts": {
            "d": {
              "hello.sh": {
                "c": "#!/bin/bash\\necho \"Hello from Abad X\"\\necho \"ABADX{bash_script_run}\"\\n",
                "perm": "-rw-r--r--"
              },
              "ports.sh": {
                "c": "#!/bin/bash\\ngrep open ports.list | cut -d/ -f1\\n",
                "perm": "-rw-r--r--"
              }
            }
          },
          "readme.txt": {
            "c": "اكتب سكربتاتك هنا. استخدم bash script.sh للتشغيل دون chmod."
          }
        }
      }
    }
  ]
};
