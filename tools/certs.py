# code, official name, official level, tier(B/I/A), arabic, url
D={}
def v(id,src,*c): D[id]={'source':src,'certs':[list(x) for x in c]}
CI='https://www.cisco.com/site/us/en/learn/training-certifications/certifications/'
v('cisco',CI,
('CCST Networking','Cisco Certified Support Technician Networking','Entry','B','أساسيات الشبكات للدعم الفني',CI+'support-technician/networking/index.html'),
('CCST Cybersecurity','Cisco Certified Support Technician Cybersecurity','Entry','B','أساسيات الأمن السيبراني',CI+'support-technician/cybersecurity/index.html'),
('CCNA','Cisco Certified Network Associate','Associate','I','أساسيات الشبكات والتوجيه والتبديل والأمن',CI+'enterprise/ccna/index.html'),
('CyberOps Associate','Cisco Certified CyberOps Associate','Associate','I','عمليات مراكز الأمن SOC',CI+'security/cyberops-associate/index.html'),
('CCNP Enterprise','CCNP Enterprise','Professional','A','شبكات المؤسسات المتقدمة',CI+'enterprise/ccnp-enterprise/index.html'),
('CCNP Security','CCNP Security','Professional','A','حلول أمن الشبكات من سيسكو',CI+'security/ccnp-security/index.html'),
('CCNP Data Center','CCNP Data Center','Professional','A','شبكات مراكز البيانات',CI+'data-center/ccnp-data-center/index.html'),
('CCNP Service Provider','CCNP Service Provider','Professional','A','شبكات مزودي الخدمة',CI+'service-provider/ccnp-service-provider/index.html'),
('CCNP Collaboration','CCNP Collaboration','Professional','A','حلول الاتصال والتعاون',CI+'collaboration/ccnp-collaboration/index.html'),
('CCIE Enterprise Infrastructure','CCIE Enterprise Infrastructure','Expert','A','مستوى الخبير مع اختبار عملي',CI+'enterprise/ccie-enterprise-infrastructure/index.html'),
('CCIE Security','CCIE Security','Expert','A','خبير أمن الشبكات مع اختبار عملي',CI+'security/ccie-security/index.html'),
('CCDE','Cisco Certified Design Expert','Expert','A','تصميم الشبكات على مستوى الخبير',CI+'enterprise/ccde/index.html'))
JU='https://www.juniper.net/us/en/training/certification/'
v('juniper-networks',JU,
('JNCIA-Junos','Juniper Networks Certified Associate, Junos','Associate','B','أساسيات نظام Junos',JU+'tracks/junos/jncia-junos.html'),
('JNCIS-ENT','Juniper Networks Certified Specialist, Enterprise Routing and Switching','Specialist','I','التوجيه والتبديل في المؤسسات',JU+'tracks/enterprise-routing-switching/jncis-ent.html'),
('JNCIS-SEC','Juniper Networks Certified Specialist, Security','Specialist','I','أمن شبكات Juniper',JU+'tracks/security/jncis-sec.html'),
('JNCIP-ENT','Juniper Networks Certified Professional, Enterprise Routing and Switching','Professional','A','تصميم وتشغيل شبكات المؤسسات',JU+'tracks/enterprise-routing-switching/jncip-ent.html'),
('JNCIE-ENT','Juniper Networks Certified Expert, Enterprise Routing and Switching','Expert','A','مستوى الخبير مع اختبار عملي',JU+'tracks/enterprise-routing-switching/jncie-ent.html'))
FO='https://www.fortinet.com/training/cybersecurity-professionals'
v('fortinet',FO,
('FCF','Fortinet Certified Fundamentals in Cybersecurity','Fundamentals','B','مفاهيم الأمن السيبراني الأساسية',FO),
('FCA','Fortinet Certified Associate in Cybersecurity','Associate','B','أساسيات تشغيل FortiGate',FO),
('FCP NS','Fortinet Certified Professional – Network Security','Professional','I','إدارة وتهيئة حلول أمن الشبكات',FO),
('FCP SecOps','Fortinet Certified Professional – Security Operations','Professional','I','عمليات الأمن والمراقبة',FO),
('FCSS NS','Fortinet Certified Solution Specialist – Network Security','Solution Specialist','A','تصميم حلول أمن الشبكات المتقدمة',FO),
('FCX','Fortinet Certified Expert in Cybersecurity','Expert','A','أعلى مستوى في برنامج Fortinet',FO))
PA='https://www.paloaltonetworks.com/services/education/certification'
v('palo-alto-networks',PA,
('PCCET','Palo Alto Networks Certified Cybersecurity Entry-level Technician','Entry','B','أساسيات الأمن السيبراني',PA),
('PCNSA','Palo Alto Networks Certified Network Security Administrator','Administrator','I','إدارة جدران الحماية من الجيل التالي',PA),
('PCCSE','Palo Alto Networks Certified Cloud Security Engineer','Engineer','A','أمن السحابة باستخدام Prisma Cloud',PA),
('PCNSE','Palo Alto Networks Certified Network Security Engineer','Engineer','A','هندسة ونشر حلول Palo Alto',PA))
AR='https://www.arubanetworks.com/support-services/training-services/'
v('hpe-aruba',AR,
('ACA Campus Access','HPE Aruba Networking Certified Associate – Campus Access','Associate','B','أساسيات الشبكات السلكية واللاسلكية',AR),
('ACP Campus Access','HPE Aruba Networking Certified Professional – Campus Access','Professional','I','إدارة شبكات Aruba في المؤسسات',AR),
('ACMP','HPE Aruba Networking Certified Mobility Professional','Professional','I','الشبكات اللاسلكية للمؤسسات',AR),
('ACX','HPE Aruba Networking Certified Expert','Expert','A','مستوى الخبير في حلول Aruba',AR))
HU='https://e.huawei.com/en/talent/cert/'
v('huawei',HU,
('HCIA-Datacom','Huawei Certified ICT Associate – Datacom','Associate','B','أساسيات شبكات البيانات',HU),
('HCIA-Security','Huawei Certified ICT Associate – Security','Associate','B','أساسيات أمن الشبكات',HU),
('HCIP-Datacom','Huawei Certified ICT Professional – Datacom','Professional','I','شبكات البيانات المتقدمة',HU),
('HCIP-Security','Huawei Certified ICT Professional – Security','Professional','I','حلول الأمن المتقدمة',HU),
('HCIE-Datacom','Huawei Certified ICT Expert – Datacom','Expert','A','مستوى الخبير مع اختبار عملي',HU))
CP='https://www.checkpoint.com/services/training/'
v('check-point',CP,
('CCSA','Check Point Certified Security Administrator','Administrator','I','إدارة البوابات والسياسات',CP),
('CCSE','Check Point Certified Security Expert','Expert','A','التهيئة المتقدمة واستكشاف الأخطاء',CP),
('CCSM','Check Point Certified Security Master','Master','A','أعلى مستويات خبرة Check Point',CP))
CT='https://www.comptia.org/en-us/certifications/'
comp={
'Security+':('CompTIA Security+','Core','I','أساسيات الأمن السيبراني والضوابط الدفاعية','security'),
'CySA+':('CompTIA Cybersecurity Analyst (CySA+)','Cybersecurity','I','تحليل التهديدات والاستجابة للحوادث','cybersecurity-analyst'),
'PenTest+':('CompTIA PenTest+','Cybersecurity','I','اختبارات الاختراق المصرح بها','pentest'),
'SecurityX':('CompTIA SecurityX (formerly CASP+)','Cybersecurity – Expert','A','هندسة الأمن المتقدمة للمؤسسات','securityx'),
'A+':('CompTIA A+','Core','B','الدعم الفني للأجهزة وأنظمة التشغيل','a'),
'Network+':('CompTIA Network+','Core','B','أساسيات الشبكات','network'),
'Linux+':('CompTIA Linux+','Infrastructure','I','إدارة أنظمة لينكس','linux'),
'Server+':('CompTIA Server+','Infrastructure','I','تركيب وإدارة الخوادم','server'),
'Cloud+':('CompTIA Cloud+','Infrastructure','I','تشغيل البنية السحابية','cloud'),
'Tech+':('CompTIA Tech+','Core','B','مدخل لمفاهيم تقنية المعلومات','tech'),
'Data+':('CompTIA Data+','Data and Analytics','I','تحليل البيانات وإعداد التقارير','data'),
'DataSys+':('CompTIA DataSys+','Data and Analytics','I','إدارة قواعد البيانات','datasys'),
'DataX':('CompTIA DataX','Data and Analytics – Expert','A','علوم البيانات المتقدمة','datax')}
def cc(*ks): return [(k,comp[k][0],comp[k][1],comp[k][2],comp[k][3],CT+comp[k][4]+'/') for k in ks]
v('comptia@cybersecurity',CT,*cc('Security+','CySA+','PenTest+','SecurityX'))
v('comptia@systems',CT,*cc('Tech+','A+','Network+','Linux+','Server+','Cloud+'))
v('comptia@data-dev',CT,*cc('Data+','DataSys+','DataX'))
IS='https://www.isc2.org/certifications/'
v('isc2',IS,
('CC','Certified in Cybersecurity','Entry','B','مدخل لمهنة الأمن السيبراني',IS+'cc'),
('SSCP','Systems Security Certified Practitioner','Practitioner','I','تشغيل ضوابط أمن الأنظمة',IS+'sscp'),
('CCSP','Certified Cloud Security Professional','Advanced','A','أمن البيئات السحابية',IS+'ccsp'),
('CISSP','Certified Information Systems Security Professional','Advanced','A','إدارة وهندسة أمن المعلومات',IS+'cissp'),
('CGRC','Certified in Governance, Risk and Compliance','Advanced','A','الحوكمة والمخاطر والامتثال',IS+'cgrc'),
('CSSLP','Certified Secure Software Lifecycle Professional','Advanced','A','أمن دورة حياة البرمجيات',IS+'csslp'))
IA='https://www.isaca.org/credentialing'
v('isaca@cybersecurity',IA,
('CISA','Certified Information Systems Auditor','Professional','A','تدقيق نظم المعلومات',IA+'/cisa'),
('CISM','Certified Information Security Manager','Professional','A','إدارة برامج أمن المعلومات',IA+'/cism'),
('CRISC','Certified in Risk and Information Systems Control','Professional','A','إدارة مخاطر تقنية المعلومات',IA+'/crisc'),
('CDPSE','Certified Data Privacy Solutions Engineer','Professional','A','هندسة حلول خصوصية البيانات',IA+'/cdpse'),
('CCOA','Certified Cybersecurity Operations Analyst','Professional','I','تحليل عمليات الأمن السيبراني',IA+'/ccoa'))
v('isaca@it-management',IA,
('COBIT 2019 Foundation','COBIT 2019 Foundation','Foundation','B','إطار حوكمة وإدارة تقنية المعلومات','https://www.isaca.org/resources/cobit'),
('CGEIT','Certified in the Governance of Enterprise IT','Professional','A','حوكمة تقنية المعلومات في المؤسسات',IA+'/cgeit'))
EC='https://www.eccouncil.org/train-certify/'
v('ec-council',EC,
('EHE','Ethical Hacking Essentials','Essentials','B','مدخل للاختراق الأخلاقي',EC+'ethical-hacking-essentials-ehe/'),
('CEH','Certified Ethical Hacker','Core','I','منهجيات الاختراق الأخلاقي',EC+'certified-ethical-hacker-ceh/'),
('CND','Certified Network Defender','Core','I','الدفاع عن الشبكات',EC+'certified-network-defender-cnd/'),
('CSA','Certified SOC Analyst','Core','I','تحليل عمليات مركز الأمن',EC+'certified-soc-analyst-csa/'),
('CHFI','Computer Hacking Forensic Investigator','Advanced','A','التحقيق الجنائي الرقمي',EC+'computer-hacking-forensic-investigator-chfi/'),
('CPENT','Certified Penetration Testing Professional','Advanced','A','اختبار اختراق عملي متقدم',EC+'certified-penetration-testing-professional-cpent/'),
('CCISO','Certified Chief Information Security Officer','Executive','A','قيادة أمن المعلومات',EC+'certified-chief-information-security-officer-cciso/'))
OF='https://www.offsec.com/courses-and-certifications/'
v('offsec',OF,
('OSCP','OffSec Certified Professional (PEN-200)','300-level','I','اختبار اختراق عملي شامل','https://www.offsec.com/courses/pen-200/'),
('OSWA','OffSec Web Assessor (WEB-200)','200-level','I','تقييم أمن تطبيقات الويب','https://www.offsec.com/courses/web-200/'),
('OSDA','OffSec Defense Analyst (SOC-200)','200-level','I','تحليل الدفاع ومراكز الأمن','https://www.offsec.com/courses/soc-200/'),
('OSEP','OffSec Experienced Penetration Tester (PEN-300)','300-level','A','اختراق متقدم وتجاوز الدفاعات','https://www.offsec.com/courses/pen-300/'),
('OSWE','OffSec Web Expert (WEB-300)','300-level','A','مراجعة شيفرات الويب وأمنها','https://www.offsec.com/courses/web-300/'),
('OSED','OffSec Exploit Developer (EXP-301)','300-level','A','تطوير الثغرات على ويندوز','https://www.offsec.com/courses/exp-301/'))
GI='https://www.giac.org/certifications/'
v('giac',GI,
('GSEC','GIAC Security Essentials','Practitioner','I','أساسيات الأمن العملية',GI+'security-essentials-gsec/'),
('GCIH','GIAC Certified Incident Handler','Practitioner','I','التعامل مع الحوادث الأمنية',GI+'certified-incident-handler-gcih/'),
('GCIA','GIAC Certified Intrusion Analyst','Practitioner','I','تحليل الاختراقات وحركة الشبكة',GI+'certified-intrusion-analyst-gcia/'),
('GPEN','GIAC Penetration Tester','Practitioner','I','منهجيات اختبار الاختراق',GI+'penetration-tester-gpen/'),
('GCFA','GIAC Certified Forensic Analyst','Advanced','A','التحليل الجنائي المتقدم',GI+'certified-forensic-analyst-gcfa/'),
('GSE','GIAC Security Expert','Expert','A','أعلى شهادات GIAC',GI))
IN='https://ine.com/certifications'
v('ine',IN,
('eJPT','eLearnSecurity Junior Penetration Tester','Entry','B','مدخل عملي لاختبار الاختراق','https://security.ine.com/certifications/ejpt-certification/'),
('eCPPT','eLearnSecurity Certified Professional Penetration Tester','Professional','I','اختبار اختراق عملي متوسط','https://security.ine.com/certifications/ecppt-certification/'),
('eWPT','eLearnSecurity Web Application Penetration Tester','Professional','I','اختبار اختراق تطبيقات الويب','https://security.ine.com/certifications/ewpt-certification/'),
('eCIR','eLearnSecurity Certified Incident Responder','Professional','A','الاستجابة للحوادث','https://security.ine.com/certifications/ecir-certification/'))
AS='https://www.alteredsecurity.com/'
v('altered-security',AS,
('CRTP','Certified Red Team Professional','Beginner','I','أمن Active Directory من منظور الفريق الأحمر','https://www.alteredsecurity.com/adlab'),
('CRTE','Certified Red Team Expert','Advanced','A','بيئات Active Directory متعددة الغابات','https://www.alteredsecurity.com/redteamlab'),
('CARTP','Certified Az Red Team Professional','Beginner','I','أمن Azure و Entra ID','https://www.alteredsecurity.com/azureadlab'))
HT='https://academy.hackthebox.com/'
v('hack-the-box','https://academy.hackthebox.com/',
('HTB CJCA','HTB Certified Junior Cybersecurity Associate','Entry','B','مدخل عملي للأمن السيبراني','https://academy.hackthebox.com/preview/certifications/htb-certified-junior-cybersecurity-associate'),
('HTB CPTS','HTB Certified Penetration Testing Specialist','Specialist','I','اختبار اختراق عملي مع تقرير احترافي','https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist'),
('HTB CBBH','HTB Certified Bug Bounty Hunter','Specialist','I','اختبار أمن تطبيقات الويب','https://academy.hackthebox.com/preview/certifications/htb-certified-bug-bounty-hunter'),
('HTB CDSA','HTB Certified Defensive Security Analyst','Specialist','I','التحليل الدفاعي وعمليات SOC','https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst'),
('HTB CWEE','HTB Certified Web Exploitation Expert','Expert','A','أمن الويب المتقدم','https://academy.hackthebox.com/preview/certifications/htb-certified-web-exploitation-expert'))
TC='https://certifications.tcm-sec.com/'
v('tcm-security',TC,
('PJPT','Practical Junior Penetration Tester','Junior','B','مدخل عملي لاختبار اختراق الشبكات',TC+'pjpt/'),
('PNPT','Practical Network Penetration Tester','Professional','I','اختبار اختراق شبكات عملي مع تقرير',TC+'pnpt/'),
('PJWT','Practical Junior Web Tester','Junior','B','مدخل لاختبار تطبيقات الويب',TC+'pjwt/'),
('PSAA','Practical SOC Analyst Associate','Associate','B','أساسيات عمليات مركز الأمن',TC+'psaa/'))
AW='https://aws.amazon.com/certification/'
v('aws',AW,
('CLF-C02','AWS Certified Cloud Practitioner','Foundational','B','أساسيات خدمات AWS',AW+'certified-cloud-practitioner/'),
('AIF-C01','AWS Certified AI Practitioner','Foundational','B','أساسيات الذكاء الاصطناعي على AWS',AW+'certified-ai-practitioner/'),
('SAA-C03','AWS Certified Solutions Architect – Associate','Associate','I','تصميم حلول موثوقة على AWS',AW+'certified-solutions-architect-associate/'),
('DVA-C02','AWS Certified Developer – Associate','Associate','I','تطوير التطبيقات على AWS',AW+'certified-developer-associate/'),
('SOA-C02','AWS Certified SysOps Administrator – Associate','Associate','I','تشغيل وإدارة بيئات AWS',AW+'certified-sysops-admin-associate/'),
('SAP-C02','AWS Certified Solutions Architect – Professional','Professional','A','تصميم حلول معقدة متعددة الحسابات',AW+'certified-solutions-architect-professional/'),
('DOP-C02','AWS Certified DevOps Engineer – Professional','Professional','A','DevOps والأتمتة على AWS',AW+'certified-devops-engineer-professional/'),
('SCS-C02','AWS Certified Security – Specialty','Specialty','A','أمن بيئات AWS',AW+'certified-security-specialty/'))
MS='https://learn.microsoft.com/en-us/credentials/certifications/'
v('microsoft-azure','https://learn.microsoft.com/en-us/credentials/browse/?products=azure',
('AZ-900','Microsoft Certified: Azure Fundamentals','Fundamentals','B','أساسيات خدمات Azure',MS+'azure-fundamentals/'),
('AZ-104','Microsoft Certified: Azure Administrator Associate','Associate','I','إدارة موارد Azure',MS+'azure-administrator/'),
('AZ-204','Microsoft Certified: Azure Developer Associate','Associate','I','تطوير الحلول على Azure',MS+'azure-developer/'),
('AZ-500','Microsoft Certified: Azure Security Engineer Associate','Associate','I','أمن بيئات Azure',MS+'azure-security-engineer/'),
('AZ-305','Microsoft Certified: Azure Solutions Architect Expert','Expert','A','تصميم حلول البنية على Azure',MS+'azure-solutions-architect/'),
('AZ-400','Microsoft Certified: DevOps Engineer Expert','Expert','A','DevOps على Azure',MS+'devops-engineer/'))
GC='https://cloud.google.com/learn/certification/'
v('google-cloud',GC,
('CDL','Cloud Digital Leader','Foundational','B','مفاهيم السحابة للأعمال',GC+'cloud-digital-leader'),
('ACE','Associate Cloud Engineer','Associate','I','نشر وتشغيل خدمات Google Cloud',GC+'cloud-engineer'),
('PCA','Professional Cloud Architect','Professional','A','تصميم حلول سحابية',GC+'cloud-architect'),
('PCSE','Professional Cloud Security Engineer','Professional','A','أمن Google Cloud',GC+'cloud-security-engineer'),
('PCNE','Professional Cloud Network Engineer','Professional','A','شبكات Google Cloud',GC+'cloud-network-engineer'),
('PDE','Professional Data Engineer','Professional','A','هندسة البيانات على Google Cloud',GC+'data-engineer'))
OU='https://education.oracle.com/oracle-certification-path/pFamily_647'
v('oracle-cloud',OU,
('1Z0-1085','Oracle Cloud Infrastructure Foundations Associate','Associate','B','أساسيات البنية السحابية من أوراكل',OU),
('1Z0-1072','Oracle Cloud Infrastructure Architect Associate','Associate','I','تصميم البنية على OCI',OU),
('1Z0-997','Oracle Cloud Infrastructure Architect Professional','Professional','A','تصميم حلول OCI المتقدمة',OU))
AL='https://edu.alibabacloud.com/certification'
v('alibaba-cloud',AL,
('ACA Cloud Computing','Alibaba Cloud Certified Associate – Cloud Computing','Associate','B','أساسيات خدمات علي بابا السحابية',AL),
('ACP Cloud Computing','Alibaba Cloud Certified Professional – Cloud Computing','Professional','I','تشغيل الحلول السحابية',AL),
('ACE Cloud Computing','Alibaba Cloud Certified Expert – Cloud Computing','Expert','A','مستوى الخبير في الحوسبة السحابية',AL))
LF='https://training.linuxfoundation.org/certification/'
v('cncf','https://www.cncf.io/training/certification/',
('KCNA','Kubernetes and Cloud Native Associate','Associate','B','مفاهيم السحابة الأصلية و Kubernetes',LF+'kubernetes-cloud-native-associate/'),
('CKAD','Certified Kubernetes Application Developer','Professional','I','تطوير ونشر التطبيقات على Kubernetes',LF+'certified-kubernetes-application-developer-ckad/'),
('CKA','Certified Kubernetes Administrator','Professional','I','إدارة عناقيد Kubernetes',LF+'certified-kubernetes-administrator-cka/'),
('CKS','Certified Kubernetes Security Specialist','Specialist','A','تأمين بيئات Kubernetes',LF+'certified-kubernetes-security-specialist/'))
RH='https://www.redhat.com/en/services/certification/'
v('red-hat','https://www.redhat.com/en/services/training-and-certification',
('RHCSA','Red Hat Certified System Administrator','Administrator','I','إدارة أنظمة RHEL',RH+'rhcsa'),
('RHCE','Red Hat Certified Engineer','Engineer','A','الأتمتة باستخدام Ansible',RH+'rhce'),
('RHCA','Red Hat Certified Architect','Architect','A','أعلى مستويات Red Hat',RH+'rhca'))
v('linux-foundation',LF,
('LFCA','Linux Foundation Certified IT Associate','Associate','B','أساسيات تقنية المعلومات ولينكس',LF+'certified-it-associate/'),
('LFCS','Linux Foundation Certified System Administrator','Professional','I','إدارة أنظمة لينكس عملياً',LF+'linux-foundation-certified-sysadmin-lfcs/'))
LP='https://www.lpi.org/our-certifications/'
v('lpi',LP+'summary-of-lpi-certifications/',
('Linux Essentials','LPI Linux Essentials','Essentials','B','مدخل إلى لينكس',LP+'linux-essentials-overview/'),
('LPIC-1','LPIC-1 Linux Administrator','Professional','I','إدارة لينكس الأساسية',LP+'lpic-1-overview/'),
('LPIC-2','LPIC-2 Linux Engineer','Professional','A','إدارة شبكات وخدمات لينكس المتقدمة',LP+'lpic-2-overview/'),
('LPIC-3','LPIC-3 Enterprise Professional','Professional','A','تخصصات لينكس على مستوى المؤسسات',LP+'lpic-3-overview/'))
VM='https://www.broadcom.com/support/education/vmware/certification'
v('vmware',VM,
('VCP-VCF Admin','VMware Certified Professional – VMware Cloud Foundation Administrator','Professional','I','إدارة VMware Cloud Foundation',VM),
('VCP-VVF Admin','VMware Certified Professional – VMware vSphere Foundation Administrator','Professional','I','إدارة منصة vSphere',VM),
('VCAP-VCF','VMware Certified Advanced Professional – VCF','Advanced Professional','A','تصميم ونشر VCF المتقدم',VM))
v('microsoft','https://learn.microsoft.com/en-us/credentials/browse/',
('AZ-800/801','Microsoft Certified: Windows Server Hybrid Administrator Associate','Associate','I','إدارة خوادم ويندوز المحلية والهجينة',MS+'windows-server-hybrid-administrator/'),
('MD-102','Microsoft 365 Certified: Endpoint Administrator Associate','Associate','I','إدارة الأجهزة والنقاط الطرفية',MS+'modern-desktop/'),
('MS-102','Microsoft 365 Certified: Administrator Expert','Expert','A','إدارة بيئات Microsoft 365',MS+'m365-administrator-expert/'))
PM='https://www.pmi.org/certifications/'
v('pmi',PM,
('CAPM','Certified Associate in Project Management','Entry','B','أساسيات إدارة المشاريع',PM+'certified-associate-capm'),
('PMP','Project Management Professional','Professional','I','إدارة المشاريع الاحترافية',PM+'project-management-pmp'),
('PMI-ACP','PMI Agile Certified Practitioner','Professional','I','الممارسات الرشيقة',PM+'agile-acp'),
('PMI-RMP','PMI Risk Management Professional','Specialty','A','إدارة مخاطر المشاريع',PM+'risk-management-rmp'),
('PgMP','Program Management Professional','Advanced','A','إدارة البرامج',PM+'program-management-pgmp'))
PC='https://www.peoplecert.org/browse-certifications/'
v('peoplecert-axelos',PC,
('ITIL 4 Foundation','ITIL 4 Foundation','Foundation','B','أساسيات إدارة خدمات تقنية المعلومات',PC+'it-governance-and-service-management/ITIL-1/itil-4-foundation-2565'),
('ITIL 4 Managing Professional','ITIL 4 Managing Professional','Managing Professional','I','إدارة الخدمات الرقمية',PC+'it-governance-and-service-management/ITIL-1'),
('ITIL 4 Master','ITIL Master','Master','A','أعلى مستوى في ITIL',PC+'it-governance-and-service-management/ITIL-1'),
('PRINCE2 Foundation','PRINCE2 7 Foundation','Foundation','B','منهجية PRINCE2 لإدارة المشاريع',PC),
('PRINCE2 Practitioner','PRINCE2 7 Practitioner','Practitioner','I','تطبيق PRINCE2 عملياً',PC))
SO='https://www.scrum.org/assessments/'
v('scrum-org','https://www.scrum.org/professional-scrum-certifications',
('PSM I','Professional Scrum Master I','Fundamental','B','دور Scrum Master وإطار Scrum',SO+'professional-scrum-master-i-certification'),
('PSM II','Professional Scrum Master II','Advanced','I','تطبيق Scrum في مواقف معقدة',SO+'professional-scrum-master-ii-certification'),
('PSM III','Professional Scrum Master III','Distinguished','A','إتقان Scrum على أعلى مستوى',SO+'professional-scrum-master-iii-certification'),
('PSPO I','Professional Scrum Product Owner I','Fundamental','B','دور مالك المنتج',SO+'professional-scrum-product-owner-i-certification'),
('PSPO II','Professional Scrum Product Owner II','Advanced','I','إدارة قيمة المنتج',SO+'professional-scrum-product-owner-ii-certification'))
SA='https://www.scrumalliance.org/get-certified'
v('scrum-alliance',SA,
('CSM','Certified ScrumMaster','Foundational','B','أساسيات Scrum ودور Scrum Master','https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster'),
('CSPO','Certified Scrum Product Owner','Foundational','B','أساسيات دور مالك المنتج','https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner'),
('A-CSM','Advanced Certified ScrumMaster','Advanced','I','تطوير ممارسات Scrum Master','https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster'),
('CSP-SM','Certified Scrum Professional – ScrumMaster','Professional','A','احتراف دور Scrum Master','https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrum-professional-scrummaster'))
OE='https://education.oracle.com/'
v('oracle',OE+'oracle-certification-path/pFamily_48',
('1Z0-830','Oracle Certified Professional: Java SE 21 Developer','Professional','I','البرمجة الاحترافية بلغة Java',OE+'oracle-certified-professional-java-se-21-developer/trackp_OCPJSE21'),
('1Z0-071','Oracle Database SQL Certified Associate','Associate','B','استعلامات SQL على قواعد أوراكل',OE+'oracle-database-sql-certified-associate/trackp_457'),
('1Z0-082/083','Oracle Database Administration Certified Professional','Professional','A','إدارة قواعد بيانات أوراكل',OE+'oracle-certification-path/pFamily_32'))
DB='https://www.databricks.com/learn/certification/'
v('databricks',DB,
('Fundamentals','Databricks Fundamentals Accreditation','Fundamentals','B','أساسيات منصة Databricks',DB),
('Data Engineer Associate','Databricks Certified Data Engineer Associate','Associate','I','هندسة البيانات على Databricks',DB+'data-engineer-associate'),
('Data Analyst Associate','Databricks Certified Data Analyst Associate','Associate','I','تحليل البيانات باستخدام Databricks SQL',DB+'data-analyst-associate'),
('Data Engineer Professional','Databricks Certified Data Engineer Professional','Professional','A','هندسة بيانات متقدمة',DB+'data-engineer-professional'))
SN='https://learn.snowflake.com/en/certifications/'
v('snowflake',SN,
('SnowPro Associate','SnowPro Associate: Platform Certification','Associate','B','مدخل إلى منصة Snowflake',SN),
('SnowPro Core','SnowPro Core Certification','Core','I','أساسيات منصة Snowflake',SN),
('SnowPro Advanced: Architect','SnowPro Advanced: Architect','Advanced','A','تصميم حلول Snowflake',SN),
('SnowPro Advanced: Data Engineer','SnowPro Advanced: Data Engineer','Advanced','A','هندسة البيانات على Snowflake',SN))
SF='https://trailheadacademy.salesforce.com/certificate/'
v('salesforce','https://trailhead.salesforce.com/credentials/administratoroverview',
('Associate','Salesforce Certified Associate','Associate','B','مدخل إلى منصة Salesforce','https://trailhead.salesforce.com/credentials/associate'),
('Administrator','Salesforce Certified Platform Administrator','Administrator','I','إدارة وتهيئة منصة Salesforce','https://trailhead.salesforce.com/credentials/administrator'),
('Platform Developer I','Salesforce Certified Platform Developer I','Developer','I','تطوير التطبيقات على المنصة','https://trailhead.salesforce.com/credentials/platformdeveloperi'),
('Application Architect','Salesforce Certified Application Architect','Architect','A','تصميم حلول Salesforce','https://trailhead.salesforce.com/credentials/applicationarchitect'))
import json
open('/workspace/abad-labs/tools/certs.json','w').write(json.dumps(D,ensure_ascii=False))
print(len(D),sum(len(x['certs']) for x in D.values()))
