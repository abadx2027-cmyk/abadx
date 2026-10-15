// Abad X — Room: Linux Fundamentals II. Original Arabic content.
window.ABADX_ROOM = {
  "id": "linux-fundamentals-2",
  "ar": "لينكس متقدم: عمليات وصلاحيات وCron",
  "en": "Linux Fundamentals II",
  "icon": "<path d=\"M9 3h6l1 4a7 7 0 0 1 2 5v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4a7 7 0 0 1 2-5z\"/><circle cx=\"10\" cy=\"11\" r=\"1.1\"/><circle cx=\"14\" cy=\"11\" r=\"1.1\"/><path d=\"M10.5 15h3\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 55,
  "tags": [
    "Linux",
    "Processes",
    "Permissions",
    "Cron",
    "SUID"
  ],
  "intro": "تعمّق في العمليات، والصلاحيات المتقدمة (SUID/sticky)، وجدولة cron — داخل نفس بيئة الطرفية المحاكاة.",
  "tasks": [
    {
      "n": 1,
      "ar": "العمليات",
      "en": "Processes",
      "body": [
        {
          "h": "ما الذي يعمل الآن؟"
        },
        {
          "p": "نفّذ cat /proc/services.txt أو ps وابحث عن PID لـ abadx-watchdog."
        },
        {
          "code": "cat /proc/services.txt\\nps"
        }
      ],
      "questions": [
        {
          "q": "ما PID لعملية abadx-watchdog؟",
          "ph": "pid",
          "hash": "0315b4020af3eccab7706679580ac87a710d82970733b8719e70af9b57e7b9e6",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم العمليات (من notes.txt):",
          "ph": "ABADX{...}",
          "hash": "ebd0d1481a483515566cab9d2503bc00d90c26166e2686d13edea6627f50bb53",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 2,
      "ar": "الصلاحيات المتقدمة",
      "en": "Advanced permissions",
      "body": [
        {
          "h": "SUID"
        },
        {
          "p": "ابحث: find / -perm -4000 ثم افحص /usr/local/bin/backuptool"
        },
        {
          "code": "find / -perm -4000\\nls -l /usr/local/bin/backuptool"
        }
      ],
      "questions": [
        {
          "q": "ما اسم الأداة ذات SUID تحت /usr/local/bin؟",
          "ph": "name",
          "hash": "39aac2977da421485cf390bae87330b93575f2d46c7f49c06fd8e67656104f89",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم SUID:",
          "ph": "ABADX{...}",
          "hash": "58c8ba3b3a978d4222278b9f7821b224907968ce45c787776050865244ff5560",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "قراءة ملف SUID",
      "en": "Read the SUID file",
      "body": [
        {
          "h": "التقط العلم"
        },
        {
          "p": "نفّذ cat /usr/local/bin/backuptool أو cat suid_note.txt"
        }
      ],
      "questions": [
        {
          "q": "أدخل علم SUID من الملف:",
          "ph": "ABADX{...}",
          "hash": "58c8ba3b3a978d4222278b9f7821b224907968ce45c787776050865244ff5560",
          "pts": 15,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "Cron",
      "en": "Cron jobs",
      "body": [
        {
          "h": "الجدولة"
        },
        {
          "p": "اقرأ /etc/crontab و /var/spool/cron/student"
        },
        {
          "code": "cat /etc/crontab\\ncat /var/spool/cron/student"
        }
      ],
      "questions": [
        {
          "q": "في crontab الطالب، ما الدقيقة المحددة لتشغيل backup.sh؟",
          "ph": "minute",
          "hash": "e629fa6598d732768f7c726b4b621285f9c3b85303900aa912017db7617d8bdb",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "علم cron:",
          "ph": "ABADX{...}",
          "hash": "93a64467230cb7f6c0564c40e5e745382773c505d21ccee182e57f41182a5ceb",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "Sticky bit",
      "en": "Sticky bit",
      "body": [
        {
          "h": "/tmp"
        },
        {
          "p": "المجلد /tmp غالباً بصلاحية sticky (حرف t في نهاية نمط ls). نفّذ: ls -ld /tmp"
        },
        {
          "code": "ls -ld /tmp"
        }
      ],
      "questions": [
        {
          "q": "ما الرمز الذي يظهر في نهاية صلاحيات /tmp عند وجود sticky bit؟",
          "ph": "letter",
          "hash": "e3b98a4da31a127d4bde6e43033f66ba274cab0eb7eb1c70ec41402bf6273dd8",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما الأمر الذي يعرض التفاصيل والصلاحيات؟",
          "ph": "command",
          "hash": "f0f40cf78dab06e0d336e5ced925157780fdb4a376f454d6cc80f3d21bf10769",
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
          "p": "راقب العمليات وملفات SUID وسكربتات cron."
        }
      ],
      "questions": [
        {
          "q": "هل يُنصح بمراجعة ملفات SUID دورياً؟ (yes/no)",
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
      "type": "terminal",
      "title": "Linux Terminal",
      "banner": "Abad X — Linux Fundamentals II",
      "outputs": {
        "ps": "  PID CMD\n    1 systemd\n 4242 abadx-watchdog\n  880 sshd\n  901 nginx"
      },
      "fs": {
        "user": "student",
        "host": "abadx",
        "uid": 1000,
        "gid": 1000,
        "tree": {
          "suid_note.txt": {
            "c": "ابحث عن backuptool\\nABADX{suid_binary}"
          },
          "backup.sh": {
            "c": "#!/bin/bash\\necho backup\\n# ABADX{cron_job_found}\\n",
            "perm": "-rwxr-xr-x"
          },
          "notes.txt": {
            "c": "PID watchdog = 4242\\nABADX{process_killer}"
          }
        },
        "root": {
          "proc": {
            "d": {
              "services.txt": {
                "c": "PID CMD\\n1 systemd\\n4242 abadx-watchdog\\n880 sshd\\n901 nginx\\n",
                "o": "root"
              }
            },
            "o": "root"
          },
          "etc": {
            "d": {
              "crontab": {
                "c": "# crontab\\n0 * * * * root /usr/bin/updatedb\\n",
                "o": "root"
              }
            },
            "o": "root"
          },
          "var": {
            "d": {
              "spool": {
                "d": {
                  "cron": {
                    "d": {
                      "student": {
                        "c": "15 * * * * /home/student/backup.sh\\n",
                        "o": "student"
                      }
                    },
                    "o": "root"
                  }
                },
                "o": "root"
              }
            },
            "o": "root"
          },
          "usr": {
            "d": {
              "local": {
                "d": {
                  "bin": {
                    "d": {
                      "backuptool": {
                        "c": "#!/bin/sh\\necho ABADX{suid_binary}\\n",
                        "perm": "-rwsr-xr-x",
                        "o": "root"
                      }
                    },
                    "o": "root"
                  }
                },
                "o": "root"
              }
            },
            "o": "root"
          },
          "tmp": {
            "d": {
              "readme": {
                "c": "tmp"
              }
            },
            "perm": "drwxrwxrwt",
            "o": "root"
          }
        }
      }
    }
  ]
};
