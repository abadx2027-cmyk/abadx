// Abad X — Room: Windows PowerShell (ويندوز و PowerShell). Original Arabic content.
window.ABADX_ROOM = {
  "id": "windows-powershell",
  "ar": "ويندوز و PowerShell",
  "en": "Windows PowerShell",
  "icon": "<path d=\"M3 5h8v6H3zM13 5h8v6h-8zM3 13h8v6H3zM13 13h8v6h-8z\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 50,
  "tags": [
    "Windows",
    "PowerShell",
    "SysAdmin"
  ],
  "intro": "تنقّل في نظام ملفات ويندوز المحاكى، واستعلم عن العمليات والخدمات والمستخدمين عبر أوامر PowerShell الأساسية مع Select-Object و Where-Object.",
  "tasks": [
    {
      "n": 1,
      "ar": "مقدمة PowerShell",
      "en": "PowerShell intro",
      "body": [
        {
          "h": "أوامر على شكل أفعال"
        },
        {
          "p": "أوامر PowerShell تُسمّى cmdlets بصيغة Verb-Noun مثل Get-Process. الاختصارات شائعة: ls لـ Get-ChildItem."
        },
        {
          "code": "Get-Help\\nWhoAmI\\nGet-Location"
        }
      ],
      "questions": [
        {
          "q": "ما صيغة تسمية أوامر PowerShell الشائعة؟",
          "ph": "Verb-Noun",
          "hash": "7a0ab3cd4f6444391bb3879361481fc1011ac4635b062affea875606233f2ec2",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما ناتج WhoAmI؟",
          "ph": "HOST\\User",
          "hash": "dc1cdd4009a5fc01ba7bb76ddd8d223074a1135be9ee0d4792e6bc7c450e850f",
          "pts": 15,
          "hint": "ABADX-WIN\\Student"
        }
      ]
    },
    {
      "n": 2,
      "ar": "نظام الملفات",
      "en": "Filesystem",
      "body": [
        {
          "h": "Get-ChildItem"
        },
        {
          "p": "انتقل إلى Documents واقرأ flag.txt عبر Get-Content."
        },
        {
          "code": "Get-ChildItem\\nSet-Location Documents\\nGet-Content flag.txt"
        }
      ],
      "questions": [
        {
          "q": "ما العلم داخل Documents\\flag.txt؟",
          "ph": "ABADX{...}",
          "hash": "3827b7aaa631e959dd24157db3fe125e831ba25686747b23264117c0d5eb06b8",
          "pts": 20,
          "hint": ""
        },
        {
          "q": "ما الاسم البديل الشائع لـ Get-ChildItem؟",
          "ph": "alias",
          "hash": "c7b68ac37f364473e922936708e7f43c293dd07b295171566c07ff5fe024fab9",
          "pts": 10,
          "hint": "ls أو dir"
        }
      ]
    },
    {
      "n": 3,
      "ar": "العمليات",
      "en": "Processes",
      "body": [
        {
          "h": "Get-Process"
        },
        {
          "p": "صفِّ بالأنبوب: Get-Process | Where-Object -Property ProcessName -EQ AbadXAgent"
        },
        {
          "code": "Get-Process\\nGet-Process | Where-Object -Property ProcessName -EQ AbadXAgent"
        }
      ],
      "questions": [
        {
          "q": "ما معرّف العملية (Id) لـ AbadXAgent؟",
          "ph": "pid",
          "hash": "033581b0970477af916f08ad931c521b975b55f8368604ae58a537b387e792e1",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "ما اسم cmdlet عرض العمليات؟",
          "ph": "cmdlet",
          "hash": "92b658e1b86d0c2365f3fb53cc51ac0bd08b720bb62507375124bd22e899567b",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 4,
      "ar": "الخدمات",
      "en": "Services",
      "body": [
        {
          "h": "Get-Service"
        },
        {
          "p": "اعرض الخدمات وابحث عن AbadXSvc."
        },
        {
          "code": "Get-Service"
        }
      ],
      "questions": [
        {
          "q": "ما حالة خدمة AbadXSvc؟",
          "ph": "status",
          "hash": "c071cf5f5ed6f884cc70155b6f05f755fd46a302d05e4261b7e92ce878bbfed8",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "ما حالة wuauserv؟",
          "ph": "status",
          "hash": "8322e87d24582952e5c996da182de0eca66dd2bf58fba5ec56a325c656f21b38",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 5,
      "ar": "المستخدمون المحليون",
      "en": "Local users",
      "body": [
        {
          "h": "Get-LocalUser"
        },
        {
          "p": "اعرض المستخدمين واقرأ وصف svc_backup حيث يوجد علم."
        },
        {
          "code": "Get-LocalUser\\nGet-LocalUser | Select-Object -Property Name,Description"
        }
      ],
      "questions": [
        {
          "q": "التقط العلم من وصف حساب svc_backup:",
          "ph": "ABADX{...}",
          "hash": "86851940266b20d317824ea61754d084fe9dd8ab7ce93d76333f1790c897ad49",
          "pts": 25,
          "hint": ""
        },
        {
          "q": "هل حساب Guest مفعّل؟ (True/False)",
          "ph": "True|False",
          "hash": "fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa",
          "pts": 10,
          "hint": ""
        }
      ]
    },
    {
      "n": 6,
      "ar": "Select و Where",
      "en": "Select & Where",
      "body": [
        {
          "h": "الأنابيب"
        },
        {
          "p": "Where-Object ترشّح، Select-Object تختار خصائص."
        }
      ],
      "questions": [
        {
          "q": "أي cmdlet يرشّح الكائنات حسب شرط؟",
          "ph": "cmdlet",
          "hash": "995e05855c5f1a830fc597e07b0f525bb7bdb79bb1bf9770b636a27c3e6db5c6",
          "pts": 15,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "powershell",
      "title": "PowerShell",
      "fs": {
        "user": "Student",
        "host": "ABADX-WIN",
        "tree": {
          "Users": {
            "d": {
              "Student": {
                "d": {
                  "Documents": {
                    "d": {
                      "flag.txt": {
                        "c": "Lab flag\\nABADX{powershell_service}"
                      },
                      "notes.txt": {
                        "c": "Use Get-Help"
                      }
                    }
                  },
                  "Desktop": {
                    "d": {
                      "readme.txt": {
                        "c": "Abad X Windows lab"
                      }
                    }
                  }
                }
              }
            }
          },
          "Windows": {
            "d": {
              "System32": {
                "d": {
                  "drivers": {
                    "d": {}
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
};
