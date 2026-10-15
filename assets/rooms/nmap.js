// Abad X — Room: Network Discovery with Nmap (استكشاف الشبكات بـ Nmap). Original Arabic content.
window.ABADX_ROOM = {
  "id": "nmap",
  "ar": "استكشاف الشبكات بـ Nmap",
  "en": "Network Discovery with Nmap",
  "icon": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 50,
  "tags": [
    "Nmap",
    "Recon",
    "Ports",
    "Scanning"
  ],
  "intro": "تعلّم استكشاف المضيفين والمنافذ باستخدام Nmap داخل طرفية محاكاة تستهدف شبكة تدريب وهمية 10.10.10.0/24 — بدون أي اتصال حقيقي بالخارج.",
  "tasks": [
    {
      "n": 1,
      "ar": "ما هو Nmap؟",
      "en": "What is Nmap?",
      "body": [
        {
          "h": "أداة الاستكشاف الأشهر"
        },
        {
          "p": "Nmap (Network Mapper) أداة مفتوحة المصدر لاكتشاف المضيفين المفتوحين على الشبكة، والمنافذ (ports) والخدمات التي تعمل عليها. تُستخدم في الاختبارات المصرّح بها وجرد الأصول."
        },
        {
          "warn": "لا تفحص شبكات لا تملك إذناً صريحاً بفحصها. في هذا المختبر الهدف وهمي بالكامل."
        },
        {
          "code": "nmap -sn 10.10.10.0/24"
        }
      ],
      "questions": [
        {
          "q": "ما الأمر الأساسي المستخدم في المختبر لبدء Nmap؟",
          "ph": "command",
          "hash": "5286b91aa11e48184da2c742f7f08492b8be0e02c01188b55b47d4be0e23fb18",
          "pts": 10,
          "hint": "يبدأ بحرف n."
        },
        {
          "q": "ما خيار اكتشاف المضيفين دون مسح المنافذ؟",
          "ph": "flag",
          "hash": "a3ba30081655ce871a84c9f5cba682e750f404a41b4e91008030dd5e5378105f",
          "pts": 10,
          "hint": "s ثم n."
        }
      ]
    },
    {
      "n": 2,
      "ar": "اكتشاف المضيفين",
      "en": "Host discovery",
      "body": [
        {
          "h": "مسح الشبكة"
        },
        {
          "p": "الخيار -sn (ping scan) يحدّد الأجهزة التي ترد دون فتح قائمة منافذ كاملة. نفّذ في الطرفية: nmap -sn 10.10.10.0/24"
        },
        {
          "tip": "ستظهر المضيفات النشطة فقط من الشبكة الوهمية."
        }
      ],
      "questions": [
        {
          "q": "كم مضيفاً (hosts up) يظهر بعد nmap -sn 10.10.10.0/24؟",
          "ph": "number",
          "hash": "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
          "pts": 15,
          "hint": "ثلاثة أجهزة."
        },
        {
          "q": "ما عنوان IP لخادم الويب (web01)؟",
          "ph": "x.x.x.x",
          "hash": "30b225078a02e6c76505f9ab4dd22de5c30d413ae838a32c1f79bbf7be3562e4",
          "pts": 15,
          "hint": "ينتهي بـ .20"
        }
      ]
    },
    {
      "n": 3,
      "ar": "مسح المنافذ",
      "en": "Port scanning",
      "body": [
        {
          "h": "اكتشاف الخدمات"
        },
        {
          "p": "بدون -sn يقوم Nmap بمسح المنافذ الشائعة. جرّب: nmap 10.10.10.10 ثم nmap -p 22,80,443 10.10.10.20"
        },
        {
          "code": "nmap -p 1-100 10.10.10.10"
        }
      ],
      "questions": [
        {
          "q": "على 10.10.10.10 ما المنفذ المفتوح لخدمة SSH؟",
          "ph": "port",
          "hash": "785f3ec7eb32f30b90cd0fcf3657d388b5ff4297f2f9716ff66e9b69c05ddd09",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "التقط العلم المرتبط باكتشاف SSH.",
          "ph": "ABADX{...",
          "hash": "9641aff631312272f7dccf2c2fef79be629d1b9e1bbcd6d4d5cc3ead252465fc",
          "pts": 20,
          "hint": "ABADX{nmap_found_ssh}"
        }
      ]
    },
    {
      "n": 4,
      "ar": "كشف الإصدارات -sV",
      "en": "Version detection",
      "body": [
        {
          "h": "ما الذي يعمل خلف المنفذ؟"
        },
        {
          "p": "الخيار -sV يحاول التعرف على إصدار الخدمة. نفّذ: nmap -sV -p 80 10.10.10.20"
        },
        {
          "code": "nmap -sV 10.10.10.20"
        }
      ],
      "questions": [
        {
          "q": "ما اسم الخدمة على المنفذ 80 لـ 10.10.10.20؟",
          "ph": "service",
          "hash": "e0603c499aae47eb89343ad0ef3178e044c62e70ae2309b35591d1d49a3211ec",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "أدخل علم كشف الإصدار.",
          "ph": "ABADX{...}",
          "hash": "fd106b7e0de2572b5f911dabd807a8473b641d6cf7c3097b6cee154d25489e75",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "بصمة نظام التشغيل -O",
      "en": "OS detection",
      "body": [
        {
          "h": "تخمين نظام التشغيل"
        },
        {
          "p": "الخيار -O يقدّم تخميناً لنظام التشغيل بناءً على سلوك الشبكة. نفّذ: nmap -O 10.10.10.10"
        }
      ],
      "questions": [
        {
          "q": "وفقاً للمخرجات، ما عائلة نظام التشغيل على 10.10.10.10؟ (كلمة واحدة)",
          "ph": "Linux",
          "hash": "caf90169eefa5f807d577486b9f795ab86ae2983c5c20806cff959117e90af18",
          "pts": 15,
          "hint": "يبدأ بـ L."
        },
        {
          "q": "علم بصمة النظام:",
          "ph": "ABADX{...}",
          "hash": "c790292718b4494f4ace54157fbd40666133569fec4794b9593c553e32b4bbc3",
          "pts": 15,
          "hint": ""
        }
      ]
    },
    {
      "n": 6,
      "ar": "السكربتات",
      "en": "NSE scripts",
      "body": [
        {
          "h": "Nmap Scripting Engine"
        },
        {
          "p": "الخيار -sC يشغّل السكربتات الافتراضية. جرّب: nmap -sC -p 22,80 10.10.10.20"
        },
        {
          "tip": "السكربتات قد تكشف عناوين صفحات أو مفاتيح مضيفة."
        }
      ],
      "questions": [
        {
          "q": "ما عنوان الصفحة (http-title) الظاهر لـ 10.10.10.20؟",
          "ph": "title",
          "hash": "5c68b4324db3a14de30a1b19eae6886d4986cc8eb184816b58d86c08c5cb3fa9",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم إتمام مسح السكربتات:",
          "ph": "ABADX{...}",
          "hash": "c735921e07d9fe54397d06cf16b4f81ec7a125b474cbe90af26d8002aa3582ee",
          "pts": 20,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "terminal",
      "title": "Nmap Lab",
      "banner": "Abad X — Nmap simulation lab. جرّب: nmap -sn 10.10.10.0/24",
      "fs": {
        "user": "scanner",
        "host": "abadx",
        "uid": 1000,
        "gid": 1000,
        "tree": {
          "notes.txt": {
            "c": "أهداف التدريب:\\n10.10.10.0/24\\nلا تفحص شبكات حقيقية."
          },
          "targets.txt": {
            "c": "10.10.10.10\\n10.10.10.20\\n10.10.10.30"
          }
        }
      },
      "nmap": {
        "hosts": {
          "10.10.10.10": {
            "name": "sshgate.abadx.lab",
            "up": true,
            "os": "Linux 6.x",
            "ports": [
              {
                "port": 22,
                "state": "open",
                "service": "ssh",
                "version": "OpenSSH 9.6p1"
              }
            ],
            "scripts": [
              "ssh-hostkey: 256 SHA256:abadxlabkey111"
            ],
            "flag": "ABADX{nmap_found_ssh}"
          },
          "10.10.10.20": {
            "name": "web01.abadx.lab",
            "up": true,
            "os": "Linux 6.x",
            "ports": [
              {
                "port": 80,
                "state": "open",
                "service": "http",
                "version": "nginx 1.24.0"
              },
              {
                "port": 443,
                "state": "open",
                "service": "https",
                "version": "nginx 1.24.0"
              },
              {
                "port": 22,
                "state": "filtered",
                "service": "ssh"
              }
            ],
            "scripts": [
              "http-title: AbadX Lab Portal",
              "http-server-header: nginx/1.24.0"
            ],
            "flag": "ABADX{version_detected}"
          },
          "10.10.10.30": {
            "name": "db01.abadx.lab",
            "up": true,
            "os": "Linux 5.x",
            "ports": [
              {
                "port": 3306,
                "state": "open",
                "service": "mysql",
                "version": "MySQL 8.0.36"
              },
              {
                "port": 22,
                "state": "open",
                "service": "ssh",
                "version": "OpenSSH 8.9"
              }
            ],
            "scripts": [
              "mysql-info: Protocol 10"
            ],
            "flag": "ABADX{script_scan_done}"
          }
        }
      },
      "man": {
        "nmap": "nmap [opts] target — محاكاة مسح الشبكة (-sn -sV -O -sC -p)"
      }
    }
  ]
};
