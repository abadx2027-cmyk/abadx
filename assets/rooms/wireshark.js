// Abad X — Room: Packet Analysis with Wireshark (تحليل الحزم بـ Wireshark). Original Arabic content.
window.ABADX_ROOM = {
  "id": "wireshark",
  "ar": "تحليل الحزم بـ Wireshark",
  "en": "Packet Analysis with Wireshark",
  "icon": "<path d=\"M3 12c4-6 10-8 18-6-2 2-3 4-3 6s1 4 3 6c-8 2-14 0-18-6z\"/><circle cx=\"8\" cy=\"12\" r=\"1\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 50,
  "tags": [
    "Wireshark",
    "PCAP",
    "HTTP",
    "DNS"
  ],
  "intro": "حلّل ملف التقاط وهمياً داخل عارض حزم يشبه Wireshark: قائمة الحزم، التفاصيل، وفلاتر بسيطة مثل ip.addr== و http و dns.",
  "wide": true,
  "tasks": [
    {
      "n": 1,
      "ar": "واجهة التحليل",
      "en": "The UI",
      "body": [
        {
          "h": "ثلاث مناطق"
        },
        {
          "p": "في Wireshark عادةً: قائمة الحزم، تفاصيل الحزمة المحددة، وعرض البايتات (hex). المختبر يحاكي الأوليَين مع فلتر عرض."
        },
        {
          "tip": "جرّب الفلتر: dns ثم http ثم ip.addr==10.0.0.5"
        }
      ],
      "questions": [
        {
          "q": "ما رقم أول حزمة DNS في الالتقاط؟",
          "ph": "number",
          "hash": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما عنوان IP الذي يرسل استعلام DNS الأول؟",
          "ph": "x.x.x.x",
          "hash": "0546412d61ba57f140cbc562c81ed83fb1b8aae26b57bb1ac00d5eddc798ac0f",
          "pts": 10,
          "hint": "المصدر في الحزمة 1."
        }
      ]
    },
    {
      "n": 2,
      "ar": "فلاتر العرض",
      "en": "Display filters",
      "body": [
        {
          "h": "صيغة بسيطة"
        },
        {
          "p": "فلاتر مدعومة هنا: ip.addr==x.x.x.x و tcp.port==N و http و dns. يمكن ربط شرطين بـ &&."
        },
        {
          "code": "ip.addr==10.0.0.50 && http\\ndns\\ntcp.port==443"
        }
      ],
      "questions": [
        {
          "q": "بعد فلتر dns كم حزمة تظهر؟",
          "ph": "number",
          "hash": "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
          "pts": 15,
          "hint": "حزم DNS في الالتقاط."
        },
        {
          "q": "علم مرتبط باستعلام DNS:",
          "ph": "ABADX{...}",
          "hash": "f9fc81b7dca239fabbfc19cca3246eb774e61f42091d0594ffcb1d6230045f93",
          "pts": 20,
          "hint": ""
        }
      ]
    },
    {
      "n": 3,
      "ar": "تتبع HTTP",
      "en": "Follow HTTP",
      "body": [
        {
          "h": "أسرار في الاستجابات"
        },
        {
          "p": "افتح الحزمة ذات الاستجابة HTTP 200 وافحص التفاصيل. ابحث عن ترويسة X-Flag."
        }
      ],
      "questions": [
        {
          "q": "ما قيمة ترويسة X-Flag في استجابة HTTP؟",
          "ph": "ABADX{...}",
          "hash": "0025184ce817e09feda4ff5e819fb3141985b8a1604a5bc4262bcab1f905c9d0",
          "pts": 25,
          "hint": ""
        },
        {
          "q": "ما مسار طلب POST لتسجيل الدخول؟",
          "ph": "/path",
          "hash": "7e93fba0bc7adda858a2500090e639e4f563a3965c7cf4c719fb56eb6b12c666",
          "pts": 10,
          "hint": "POST /login"
        }
      ]
    },
    {
      "n": 4,
      "ar": "نشاط مشبوه",
      "en": "Suspicious traffic",
      "body": [
        {
          "h": "من يطرق الباب؟"
        },
        {
          "p": "ابحث عن محاولات نحو منفذ 22 وعن User-Agent غريب مثل sqlmap."
        }
      ],
      "questions": [
        {
          "q": "ما عنوان IP الذي حاول الاتصال بمنفذ SSH؟",
          "ph": "x.x.x.x",
          "hash": "232337896e547ba449a0d201980f97f82be5d3f47ca80aad5f45e68599141270",
          "pts": 15,
          "hint": ""
        },
        {
          "q": "ما الـ User-Agent المشبوه في طلب /admin؟",
          "ph": "agent",
          "hash": "afe41b856b12f436ba0892e0823ade950dbe9087b1aeca587d4996715cb6e1d5",
          "pts": 15,
          "hint": "sqlmap/1.7"
        }
      ]
    },
    {
      "n": 5,
      "ar": "ملخص",
      "en": "Summary",
      "body": [
        {
          "h": "ماذا تعلّمت؟"
        },
        {
          "p": "الفلاتر تختصر الضوضاء، وتفاصيل الحزمة تكشف الترويسات والأجسام، والسلوك المشبوه يظهر بأنماط غير معتادة."
        }
      ],
      "questions": [
        {
          "q": "ما بروتوكول الحزمة رقم 6؟",
          "ph": "answer",
          "hash": "e0603c499aae47eb89343ad0ef3178e044c62e70ae2309b35591d1d49a3211ec",
          "pts": 10,
          "hint": ""
        },
        {
          "q": "ما المنفذ الهدف لطلبات HTTP في هذا الالتقاط؟",
          "ph": "port",
          "hash": "48449a14a4ff7d79bb7a1b6f3d488eba397c36ef25634c111b49baf362511afc",
          "pts": 10,
          "hint": ""
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "packets",
      "title": "Packet Viewer",
      "packets": [
        {
          "n": 1,
          "t": "0.000000",
          "src": "10.0.0.5",
          "dst": "10.0.0.1",
          "proto": "DNS",
          "info": "Standard query 0x1a2b A login.abadx.lab",
          "sport": 53100,
          "dport": 53,
          "details": [
            "Domain Name System (query)",
            "    Transaction ID: 0x1a2b",
            "    Queries",
            "        login.abadx.lab: type A, class IN"
          ],
          "hex": "00 1a 2b ..."
        },
        {
          "n": 2,
          "t": "0.001200",
          "src": "10.0.0.1",
          "dst": "10.0.0.5",
          "proto": "DNS",
          "info": "Standard query response A 10.0.0.50",
          "sport": 53,
          "dport": 53100,
          "details": [
            "Domain Name System (response)",
            "    login.abadx.lab A 10.0.0.50",
            "    FLAG hint: ABADX{dns_query_found}"
          ],
          "hex": ""
        },
        {
          "n": 3,
          "t": "0.002000",
          "src": "10.0.0.5",
          "dst": "10.0.0.50",
          "proto": "TCP",
          "info": "51514 → 443 [SYN] Seq=0",
          "sport": 51514,
          "dport": 443,
          "details": [
            "Transmission Control Protocol",
            "    Src Port: 51514",
            "    Dst Port: 443"
          ],
          "hex": ""
        },
        {
          "n": 4,
          "t": "0.002100",
          "src": "10.0.0.50",
          "dst": "10.0.0.5",
          "proto": "TCP",
          "info": "443 → 51514 [SYN,ACK]",
          "sport": 443,
          "dport": 51514,
          "details": [
            "TCP SYN-ACK"
          ],
          "hex": ""
        },
        {
          "n": 5,
          "t": "0.002200",
          "src": "10.0.0.5",
          "dst": "10.0.0.50",
          "proto": "TCP",
          "info": "[ACK]",
          "sport": 51514,
          "dport": 443,
          "details": [
            "TCP ACK"
          ],
          "hex": ""
        },
        {
          "n": 6,
          "t": "0.010000",
          "src": "10.0.0.5",
          "dst": "10.0.0.50",
          "proto": "HTTP",
          "info": "GET /login HTTP/1.1",
          "sport": 51514,
          "dport": 80,
          "details": [
            "Hypertext Transfer Protocol",
            "    GET /login HTTP/1.1",
            "    Host: login.abadx.lab",
            "    User-Agent: AbadX-Browser/1.0",
            "    Cookie: session=guest"
          ],
          "hex": "47 45 54 20 2f 6c 6f 67 69 6e"
        },
        {
          "n": 7,
          "t": "0.012000",
          "src": "10.0.0.50",
          "dst": "10.0.0.5",
          "proto": "HTTP",
          "info": "HTTP/1.1 200 OK (text/html)",
          "sport": 80,
          "dport": 51514,
          "details": [
            "HTTP/1.1 200 OK",
            "    Set-Cookie: session=a1b2c3d4",
            "    X-Flag: ABADX{wireshark_http_secret}",
            "    Content-Type: text/html"
          ],
          "hex": ""
        },
        {
          "n": 8,
          "t": "0.020000",
          "src": "10.0.0.5",
          "dst": "10.0.0.50",
          "proto": "HTTP",
          "info": "POST /login HTTP/1.1",
          "sport": 51514,
          "dport": 80,
          "details": [
            "POST /login HTTP/1.1",
            "    Content-Type: application/x-www-form-urlencoded",
            "    Body: user=alice&pass=wonderland"
          ],
          "hex": ""
        },
        {
          "n": 9,
          "t": "0.050000",
          "src": "10.0.0.9",
          "dst": "10.0.0.50",
          "proto": "TCP",
          "info": "40022 → 22 [SYN]",
          "sport": 40022,
          "dport": 22,
          "details": [
            "SSH port probe from 10.0.0.9"
          ],
          "hex": ""
        },
        {
          "n": 10,
          "t": "0.051000",
          "src": "10.0.0.50",
          "dst": "10.0.0.9",
          "proto": "TCP",
          "info": "22 → 40022 [RST,ACK]",
          "sport": 22,
          "dport": 40022,
          "details": [
            "Connection rejected"
          ],
          "hex": ""
        },
        {
          "n": 11,
          "t": "0.100000",
          "src": "10.0.0.5",
          "dst": "8.8.8.8",
          "proto": "DNS",
          "info": "Standard query A updates.abadx.lab",
          "sport": 53101,
          "dport": 53,
          "details": [
            "DNS query updates.abadx.lab"
          ],
          "hex": ""
        },
        {
          "n": 12,
          "t": "0.200000",
          "src": "10.0.0.40",
          "dst": "10.0.0.50",
          "proto": "HTTP",
          "info": "GET /admin HTTP/1.1",
          "sport": 60001,
          "dport": 80,
          "details": [
            "GET /admin",
            "    Authorization: Basic YWRtaW46YWRtaW4=",
            "    User-Agent: sqlmap/1.7"
          ],
          "hex": ""
        }
      ]
    }
  ]
};
