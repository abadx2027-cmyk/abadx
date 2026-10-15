// Abad X Academy — specialties & vendors (single source of truth)
const ICONS={
net:'<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><circle cx="12" cy="13" r="1.6"/><path d="M12 7.2v4.2M10.7 14 6.6 16.6M13.3 14l4.1 2.6M7.2 18h9.6"/>',
sec:'<path d="M12 3 19 6v5.2c0 4.4-2.9 7.9-7 9.8-4.1-1.9-7-5.4-7-9.8V6z"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10.2 11V9.6a1.8 1.8 0 0 1 3.6 0V11"/>',
cloud:'<path d="M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.1 9.1 4.7 4.7 0 0 0 7 18.5z"/><path d="M10 14.5h4M12 12.5v4"/>',
sys:'<rect x="4" y="3" width="16" height="5" rx="1.5"/><rect x="4" y="10" width="16" height="5" rx="1.5"/><path d="M7.5 5.5h.01M7.5 12.5h.01M11 5.5h5.5M11 12.5h5.5M12 15v3M7 21v-3h10v3"/>',
pm:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m8.5 10 1.5 1.5L13 8.5"/><path d="M14.5 10.5h1.5"/><path d="m8.5 15.5 1.5 1.5 3-3"/><path d="M14.5 16h1.5"/>',
data:'<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v5c0 1.4 3.1 2.5 7 2.5M19 5.5v4"/><path d="M5 10.5v5c0 1.4 3.1 2.5 6 2.5"/><path d="m15 14-2.5 2.5L15 19M18 14l2.5 2.5L18 19"/>'};
const V=(name,logo,ar,certs)=>({name,logo,ar,certs});
const SPECIALTIES=[
{id:'networking',icon:'net',ar:'الشبكات',en:'Networking',dar:'التوجيه والتبديل وأمن الشبكات',den:'Routing, switching & network security',vendors:[
V('Cisco','cisco','رائدة معدات الشبكات وشهادات التوجيه والتبديل',['CCNA','CCNP','CCIE']),
V('Juniper Networks','junipernetworks','حلول توجيه وتبديل عالية الأداء لمزودي الخدمة',['JNCIA','JNCIS','JNCIP']),
V('Fortinet','fortinet','جدران حماية FortiGate وحلول الشبكات الآمنة',['FCA','FCP','FCSS']),
V('Palo Alto Networks','paloaltonetworks','جدران الحماية من الجيل التالي وأمن الشبكات',['PCCET','PCNSA','PCNSE']),
V('HPE Aruba','hpe','شبكات لاسلكية وسلكية للمؤسسات',['ACA','ACP']),
V('Huawei','huawei','معدات اتصالات وشبكات ومسارات HCIA حتى HCIE',['HCIA','HCIP','HCIE']),
V('Check Point','','حلول جدران الحماية وإدارة السياسات الأمنية',['CCSA','CCSE'])]},
{id:'cybersecurity',icon:'sec',ar:'الأمن السيبراني',en:'Cybersecurity',dar:'الدفاع والتحليل والاختبار والحوكمة',den:'Defense, analysis, testing & governance',vendors:[
V('CompTIA','comptia','شهادات محايدة للأمن من المستوى الأساسي إلى المتقدم',['Security+','CySA+','PenTest+','CASP+']),
V('ISC2','isc2','شهادات إدارة أمن المعلومات المعترف بها عالمياً',['CISSP','CCSP','SSCP']),
V('ISACA','','التدقيق والحوكمة وإدارة المخاطر',['CISA','CISM','CRISC']),
V('EC-Council','','الاختراق الأخلاقي والتحقيق الجنائي الرقمي',['CEH','CHFI']),
V('OffSec','','اختبارات اختراق عملية مكثفة',['OSCP','OSEP','OSWE']),
V('GIAC','','شهادات تقنية متخصصة مرتبطة بتدريب SANS',['GSEC','GCIH']),
V('INE','','مسارات عملية لاختبار الاختراق للمبتدئين والمتوسطين',['eJPT','eCPPT']),
V('Altered Security','','أمن بيئات Active Directory وفرق Red Team',['CRTP','CRTE']),
V('Hack The Box','hackthebox','منصة تدريب عملي وشهادات اختبار اختراق',['CPTS','CBBH']),
V('TCM Security','','شهادات عملية لاختبار اختراق الشبكات',['PNPT'])]},
{id:'cloud',icon:'cloud',ar:'السحابة',en:'Cloud',dar:'المنصات السحابية والحاويات',den:'Cloud platforms & containers',vendors:[
V('AWS','aws','أكبر منصة حوسبة سحابية عامة',['Cloud Practitioner','Solutions Architect']),
V('Microsoft Azure','azure','منصة مايكروسوفت السحابية للمؤسسات',['AZ-900','AZ-104','AZ-305']),
V('Google Cloud','googlecloud','خدمات جوجل السحابية والبيانات',['ACE','PCA']),
V('Oracle Cloud','oracle','البنية التحتية السحابية من أوراكل',['OCI Foundations']),
V('Alibaba Cloud','alibabacloud','منصة علي بابا السحابية',['ACA','ACP']),
V('CNCF','cncf','مؤسسة الحوسبة السحابية الأصلية و Kubernetes',['CKA','CKAD','CKS'])]},
{id:'systems',icon:'sys',ar:'الأنظمة والسيرفرات',en:'Systems & Servers',dar:'لينكس وويندوز والافتراضية',den:'Linux, Windows & virtualization',vendors:[
V('Red Hat','redhat','إدارة أنظمة Red Hat Enterprise Linux',['RHCSA','RHCE']),
V('Linux Foundation','linuxfoundation','شهادات إدارة لينكس العملية',['LFCS']),
V('LPI','','معهد لينكس المهني وشهادات محايدة للتوزيعات',['LPIC-1','LPIC-2']),
V('VMware','vmware','الافتراضية ومراكز البيانات',['VCP']),
V('Microsoft','microsoft','إدارة خوادم ويندوز والبيئات الهجينة',['Windows Server Hybrid Admin']),
V('CompTIA','comptia','أساسيات الدعم الفني والخوادم ولينكس',['A+','Linux+','Server+'])]},
{id:'it-management',icon:'pm',ar:'إدارة المشاريع وحوكمة تقنية المعلومات',en:'Project & IT Management',dar:'إدارة المشاريع وخدمات تقنية المعلومات',den:'Project, service & IT governance',vendors:[
V('PMI','','معهد إدارة المشاريع وشهادة PMP',['PMP','CAPM','PMI-ACP']),
V('PeopleCert / Axelos','','أطر إدارة الخدمات والمشاريع',['ITIL 4','PRINCE2']),
V('ISACA','','إطار حوكمة تقنية المعلومات COBIT',['COBIT 2019']),
V('Scrum.org','','شهادات Scrum للمديرين وأصحاب المنتجات',['PSM I','PSPO I']),
V('Scrum Alliance','scrumalliance','شهادات Scrum Master المعتمدة',['CSM'])]},
{id:'data-dev',icon:'data',ar:'البيانات والبرمجة',en:'Data & Development',dar:'تحليل البيانات وقواعدها والتطوير',den:'Analytics, databases & development',vendors:[
V('CompTIA','comptia','أساسيات تحليل البيانات',['Data+']),
V('Oracle','oracle','لغة Java وقواعد بيانات أوراكل',['Java SE','Oracle Database']),
V('Databricks','databricks','هندسة البيانات على منصة Lakehouse',['Data Engineer Associate']),
V('Snowflake','snowflake','مستودعات البيانات السحابية',['SnowPro Core']),
V('Salesforce','salesforce','إدارة منصة Salesforce CRM',['Administrator'])]}];
const emblem=k=>`<svg class="emb" viewBox="0 0 64 64" aria-hidden="true"><path class="fr" d="M32 3.5 56.7 17.75v28.5L32 60.5 7.3 46.25v-28.5z"/><path class="fr2" d="M32 9 52 20.5v23L32 55 12 43.5v-23z"/><g class="gl" transform="translate(14 14) scale(1.5)">${ICONS[k]}</g></svg>`;
const initials=n=>n.replace(/[^A-Za-z0-9 ]/g,' ').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
