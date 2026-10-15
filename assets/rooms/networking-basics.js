// Abad X — Room: Networking Basics
window.ABADX_ROOM = {
  "id": "networking-basics",
  "ar": "أساسيات الشبكات",
  "en": "Networking Basics",
  "icon": "<circle cx=\"12\" cy=\"5\" r=\"2.2\"/><circle cx=\"5\" cy=\"18\" r=\"2.2\"/><circle cx=\"19\" cy=\"18\" r=\"2.2\"/><circle cx=\"12\" cy=\"13\" r=\"1.6\"/><path d=\"M12 7.2v4.2M10.7 14 6.6 16.6M13.3 14l4.1 2.6\"/>",
  "difficulty": [
    "مبتدئ",
    "Beginner"
  ],
  "minutes": 55,
  "tags": [
    "Networking",
    "OSI",
    "DNS",
    "HTTP",
    "Subnetting"
  ],
  "intro": "افهم كيف تنتقل البيانات عبر الشبكات: نماذج OSI و TCP/IP، العناوين والتقسيم (subnetting)، أسماء النطاقات DNS، وبروتوكول HTTP والمنافذ — مع حاسبة شبكة تفاعلية وأسئلة بأعلام ABADX{...}.",
  "tasks": [
    {
      "n": 1,
      "ar": "نموذج OSI",
      "en": "OSI Model",
      "body": [
        {
          "h": "سبع طبقات"
        },
        {
          "p": "نموذج OSI يقسم الاتصال الشبكي إلى سبع طبقات من الأعلى للأسفل: Application، Presentation، Session، Transport، Network، Data Link، Physical. كل طبقة تقدّم خدمة للتي فوقها."
        },
        {
          "p": "طبقات سهلة التذكّر: Application (7) حيث تعمل المتصفحات، Transport (4) حيث يعمل TCP/UDP، Network (3) حيث يعمل IP، و Physical (1) للكابلات والإشارات."
        },
        {
          "tip": "فكّر: المتصفح في الطبقة 7، والمنفذ (port) مرتبط بالطبقة 4، وعنوان IP بالطبقة 3."
        },
        {
          "code": "Application 7\\nPresentation 6\\nSession 5\\nTransport 4\\nNetwork 3\\nData Link 2\\nPhysical 1"
        }
      ],
      "questions": [
        {
          "q": "ما رقم طبقة Transport في نموذج OSI؟",
          "ph": "number",
          "hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
          "pts": 10,
          "hint": "فوق Network مباشرة.",
          "ans": "4"
        },
        {
          "q": "ما اسم طبقة OSI التي يعمل فيها بروتوكول IP؟ (بالإنجليزية)",
          "ph": "layer name",
          "hash": "3009be769fb8f956e8413ee9f3e0836e34968bc40457d0a10c549d2edcf00cc1",
          "pts": 10,
          "hint": "الطبقة 3.",
          "ans": "network"
        },
        {
          "q": "ما اسم أعلى طبقة في OSI حيث تعمل تطبيقات مثل المتصفح؟",
          "ph": "answer",
          "hash": "1fe289205936c3fdb61158223892c7a8bee6ff4dfa085ea1c094ce0294e32114",
          "pts": 10,
          "hint": "الطبقة 7.",
          "ans": "application"
        }
      ]
    },
    {
      "n": 2,
      "ar": "نموذج TCP/IP",
      "en": "TCP/IP Model",
      "body": [
        {
          "h": "أربع طبقات عملية"
        },
        {
          "p": "نموذج TCP/IP (الأكثر استخداماً اليوم) يضم عادةً: Application، Transport، Internet، Network Access. يقابل OSI لكن بعدد طبقات أقل."
        },
        {
          "p": "TCP موثوق وموصّل (connection-oriented) ويضمن الترتيب وإعادة الإرسال. UDP خفيف بلا ضمان تسليم — مناسب للفيديو وDNS أحياناً."
        },
        {
          "code": "TCP — Transmission Control Protocol\\nUDP — User Datagram Protocol"
        }
      ],
      "questions": [
        {
          "q": "أي بروتوكول نقل يضمن التسليم والترتيب: tcp أم udp؟",
          "ph": "tcp|udp",
          "hash": "00645195b93272275b50a6c935a23fb62e3e793e8476e83414fed0fcdfee8b41",
          "pts": 10,
          "hint": "يبدأ بحرف t ويعني Transmission Control.",
          "ans": "tcp"
        },
        {
          "q": "ما البروتوكول الأنسب لبث فيديو حي حيث التأخير أهم من إعادة الإرسال؟",
          "ph": "answer",
          "hash": "571e437548ffbac2cccfa26d7026aa7bd84186d79ca5ab7a5924d9026359b9e0",
          "pts": 10,
          "hint": "خفيف وسريع.",
          "ans": "udp"
        }
      ]
    },
    {
      "n": 3,
      "ar": "IP والتقسيم Subnetting",
      "en": "IP & Subnetting",
      "body": [
        {
          "h": "العناوين والأقنعة"
        },
        {
          "p": "عنوان IPv4 من 32 بت يُكتب بأربع خانات (مثل 192.168.1.10). قناع الشبكة (netmask) أو بادئة CIDR (مثل /24) يحدّدان جزء الشبكة وجزء المضيف."
        },
        {
          "p": "/24 تعني قناعاً 255.255.255.0 و 256 عنواناً theoretically، منها عنوان الشبكة وعنوان البث (broadcast)، فيتبقى 254 مضيفاً قابلاً للاستخدام."
        },
        {
          "tip": "استخدم حاسبة الشبكة في المختبر: أدخل IP والبادئة واقرأ Network و Broadcast و Netmask."
        },
        {
          "code": "192.168.1.10/24\\nNetwork  = 192.168.1.0\\nNetmask  = 255.255.255.0\\nBroadcast= 192.168.1.255"
        }
      ],
      "questions": [
        {
          "q": "ما قناع الشبكة الموافق لـ /24؟",
          "ph": "x.x.x.x",
          "hash": "f9e2c70401f315feebfc5b2a2b7493c10578e8e5cc3d7c7354fcf5f34fec0db5",
          "pts": 15,
          "hint": "آخر خانة صفر والباقي 255.",
          "ans": "255.255.255.0"
        },
        {
          "q": "لعنوان 192.168.1.10/24 ما عنوان الشبكة (network) بصيغة CIDR؟",
          "ph": "x.x.x.x/24",
          "hash": "d01a825c13311b46a70c53405baab8c9aab1ceda5076cf56ef86d1d8c8673f5a",
          "pts": 15,
          "hint": "احسبها بالحاسبة ثم أضف /24.",
          "ans": "192.168.1.0/24"
        },
        {
          "q": "التقط العلم بعد حساب شبكة 10.20.30.45/28 — اكتب العلم الظاهر تحت النتيجة عند استخدام المثال في الدرس. (أدخل العلم مباشرة)",
          "ph": "ABADX{...",
          "hash": "06b82dcc8dbb619714d1be9d6791444065d568b7132b17a0d4e960e37473ab60",
          "pts": 20,
          "hint": "العلم: ABADX{subnet_calc_master}",
          "ans": "ABADX{subnet_calc_master}"
        }
      ]
    },
    {
      "n": 4,
      "ar": "DNS",
      "en": "DNS",
      "body": [
        {
          "h": "من الأسماء إلى الأرقام"
        },
        {
          "p": "DNS (Domain Name System) يترجم أسماء النطاقات مثل www.abadx.lab إلى عناوين IP. بدون DNS ستحفظ الأرقام بدل الأسماء."
        },
        {
          "p": "أنواع سجلات شائعة: A (IPv4)، AAAA (IPv6)، CNAME (اسم مستعار)، MX (بريد)، NS (خوادم أسماء)."
        },
        {
          "code": "www.abadx.lab.  IN  A  10.8.0.20"
        }
      ],
      "questions": [
        {
          "q": "ما السجل الذي يربط اسماً بعنوان IPv4؟",
          "ph": "letter",
          "hash": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
          "pts": 10,
          "hint": "حرف واحد.",
          "ans": "a"
        },
        {
          "q": "أدخل العلم المرتبط بفهمك لدور DNS.",
          "ph": "ABADX{...",
          "hash": "4d13451b617bc210250df07a6a861a9428c1e994905c102330ebc1252c19f57e",
          "pts": 15,
          "hint": "dns_resolves_names",
          "ans": "ABADX{dns_resolves_names}"
        }
      ]
    },
    {
      "n": 5,
      "ar": "HTTP والمنافذ",
      "en": "HTTP & Ports",
      "body": [
        {
          "h": "الويب والمنافذ"
        },
        {
          "p": "HTTP ينقل صفحات الويب عبر طلبات مثل GET و POST. المنفذ الافتراضي لـ HTTP هو 80 ولـ HTTPS (المشفر بـ TLS) هو 443. SSH غالباً على 22."
        },
        {
          "p": "المنفذ (port) رقم على الجهاز يحدّد أي خدمة تستقبل البيانات. نفس الـ IP قد يشغّل خدمات متعددة على منافذ مختلفة."
        },
        {
          "code": "GET /index.html HTTP/1.1\\nHost: www.abadx.lab\\n\\n"
        }
      ],
      "questions": [
        {
          "q": "ما رقم منفذ HTTP الافتراضي؟",
          "ph": "number",
          "hash": "48449a14a4ff7d79bb7a1b6f3d488eba397c36ef25634c111b49baf362511afc",
          "pts": 10,
          "hint": "",
          "ans": "80"
        },
        {
          "q": "ما رقم منفذ HTTPS الافتراضي؟",
          "ph": "number",
          "hash": "6d05621ab7cb7b4fb796ca2ffbe1a141e0d4319d3deb6a05322b9de85d69b923",
          "pts": 10,
          "hint": "",
          "ans": "443"
        },
        {
          "q": "ما العلم؟",
          "ph": "ABADX{...",
          "hash": "52af2cf4e77e5a8f324e93b84bada61062a35fc1824c32a622d648d1f7a70275",
          "pts": 15,
          "hint": "http_gets_pages",
          "ans": "ABADX{http_gets_pages}"
        }
      ]
    },
    {
      "n": 6,
      "ar": "مراجعة سريعة",
      "en": "Quick review",
      "body": [
        {
          "h": "اربط المفاهيم"
        },
        {
          "p": "OSI للتنظيم النظري، TCP/IP للتنفيذ، IP للعنونة، DNS للأسماء، HTTP للتطبيق، والمنافذ لتمييز الخدمات."
        }
      ],
      "questions": [
        {
          "q": "ما منفذ SSH الشائع؟",
          "ph": "number",
          "hash": "785f3ec7eb32f30b90cd0fcf3657d388b5ff4297f2f9716ff66e9b69c05ddd09",
          "pts": 10,
          "hint": "",
          "ans": "22"
        },
        {
          "q": "طبقة OSI المسؤولة عن التجزئة وإعادة التجميع الموثوق غالباً؟",
          "ph": "answer",
          "hash": "6694ea8075001f6628da20f1afdafc74a763e2098bafc633b057534792db6aad",
          "pts": 10,
          "hint": "الطبقة 4.",
          "ans": "transport"
        }
      ]
    }
  ],
  "labs": [
    {
      "type": "tools",
      "title": "حاسبة الشبكة · Subnet",
      "tools": [
        "subnet"
      ],
      "ip": "192.168.1.10",
      "prefix": 24
    },
    {
      "type": "tools",
      "title": "أدوات سريعة",
      "tools": [
        "base64",
        "sha256"
      ]
    }
  ],
  "wide": false
};
