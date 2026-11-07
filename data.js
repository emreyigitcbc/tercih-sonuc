// 2026 TEKNOFEST Yıldırım Roket Takımı Üye ve Yerleştirme Veritabanı
const TEAMS_INFO = {
  "ROKET - ORTA İRTİFA": {
    name: "ROKET - ORTA İRTİFA",
    icon: "🚀",
    color: "#ff4d4d",
    badge: "3000M İrtifa Avcısı",
    description: "Gökleri fetheden, 3000 metre hedefine kilitlenmiş asıl roket filosu."
  },
  "MODEL UYDU": {
    name: "MODEL UYDU",
    icon: "🛰️",
    color: "#00d2ff",
    badge: "Yörünge & Telemetri Timi",
    description: "Atmosferden inişte telemetri akıtan, sensörlerin ve ayrılma mekanizmasının efendileri."
  },
  "SU ALTI ROKETİ": {
    name: "SU ALTI ROKETİ",
    icon: "🌊",
    color: "#00f2fe",
    badge: "Derin Deniz Balistiği",
    description: "Mavi Vatan'ın derinliklerinde hidrostatik basınca meydan okuyan torpido/roket birliği."
  },
  "SPONSORLUK & SOSYAL MEDYA": {
    name: "SPONSORLUK & SOSYAL MEDYA",
    icon: "📢",
    color: "#ffd200",
    badge: "Bütçe & Etkileşim Patronları",
    description: "Takıma kaynak, Instagram'a rekor beğeni, Teknofest alanına Yıldırım fırtınası getiren ekip."
  }
};

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Emre Cebeci",
    searchTerms: ["emre", "cebeci", "emre cebeci", "kaptan", "ceo"],
    tc: "1923******01",
    score: "598.750",
    rank: 1,
    title: "Masaların Efendisi & 4X All-Star Kaptan",
    badge: "👑 4X ALL-STAR KAPTAN & GENEL KOORDİNATÖR",
    avatar: "👑",
    workload: 99,
    joke: "Holding CEO'su musun be kaptan? Roket uçar, uydu döner, su altı dalar, sosyal medyada story atar... 7/24 mesai, 0 saat uyku! Her masada bir sandalyesi var, Teknofest'in görünmeyen tapusu üstüne kayıtlı.",
    advice: "Günde en az 8 kupa espresso tüketmesi ve atölyede uyumak için portatif çadır edinmesi tavsiye olunur.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Takım Kaptanı", department: "Yönetim & Aviyonik", status: "1. Tercihine Asil Yerleşti", code: "ROK-01-KPT" },
      { team: "MODEL UYDU", role: "Takım Kaptanı", department: "Yönetim", status: "1. Tercihine Asil Yerleşti", code: "UYD-01-KPT" },
      { team: "SU ALTI ROKETİ", role: "Yazılım", department: "Yazılım Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-04-SFT" },
      { team: "SPONSORLUK & SOSYAL MEDYA", role: "Ekip Üyesi", department: "İletişim & Medya", status: "1. Tercihine Asil Yerleşti", code: "MED-03-MED" }
    ]
  },
  {
    id: 2,
    name: "Alpdoğan Kurt",
    searchTerms: ["alpdogan", "alpdoğan", "kurt", "alpdoğan kurt", "alpdogan kurt"],
    tc: "1923******02",
    score: "596.420",
    rank: 2,
    title: "Amfibi Uzay Komutanı",
    badge: "🔱 ÇOK YÖNLÜ DERİNLİK & İRTİFA KOMUTANI",
    avatar: "🔱",
    workload: 98,
    joke: "Karada yürür, gökte uçar, denizde dalar, uydudan sinyal basar! GPS bile Alpdoğan'ı ararken 'Konum bulunamadı, bu adam her yerde' uyarısı veriyor. Masaların yarısı ona tahsis edildi!",
    advice: "Dalgıç kıyafetiyle roket montajına girip oradan uydu telemetrisi dinlemesi olağandır.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Takım Kaptanı", department: "Yönetim", status: "1. Tercihine Asil Yerleşti", code: "SUA-01-KPT" },
      { team: "MODEL UYDU", role: "Aviyonik Sorumlusu", department: "Aviyonik Birimi", status: "1. Tercihine Asil Yerleşti", code: "UYD-02-AVS" },
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Üyesi (Donanım)", department: "Donanım Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-06-AVD" },
      { team: "SPONSORLUK & SOSYAL MEDYA", role: "Ekip Üyesi", department: "İletişim & Medya", status: "1. Tercihine Asil Yerleşti", code: "MED-04-MED" }
    ]
  },
  {
    id: 3,
    name: "Nurcan Baloğlu",
    searchTerms: ["nurcan", "baloglu", "baloğlu", "nurcan baloglu", "nurcan baloğlu"],
    tc: "1923******03",
    score: "595.900",
    rank: 3,
    title: "Cıvataların Efendisi & Çift Mekanik Baronu",
    badge: "🔩 MEKANİK KRALİÇESİ & SPONSOR AVCISI",
    avatar: "🔩",
    workload: 97,
    joke: "Roketin gövdesi, su altının sızdırmazlığı, uydunun iskeleti ve bütçenin sponsoru... Bütün somunlar ve Instagram postları Nurcan'dan sorulur. Tork anahtarıyla şaka olmaz!",
    advice: "Çantasında daima 10 numara anahtar, lokma takımı ve sponsorluk sözleşmesi taşır.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Sorumlusu", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-09-MKS" },
      { team: "SU ALTI ROKETİ", role: "Mekanik Sorumlusu", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-06-MKS" },
      { team: "MODEL UYDU", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "UYD-05-MKU" },
      { team: "SPONSORLUK & SOSYAL MEDYA", role: "Ekip Üyesi", department: "İletişim & Medya", status: "1. Tercihine Asil Yerleşti", code: "MED-01-MED" }
    ]
  },
  {
    id: 4,
    name: "Batuhan Koç",
    searchTerms: ["batuhan", "koc", "koç", "batuhan koc", "batuhan koç"],
    tc: "1923******04",
    score: "594.150",
    rank: 4,
    title: "Aviyonik & Lehim Şampiyonu",
    badge: "⚡ 3X AVİYONİK VE DONANIM CANAVARI",
    avatar: "⚡",
    workload: 92,
    joke: "Damarlarında kan yerine flux ve lehim dumanı akıyor! Göğe aviyonik, uzaya telemetri, suya donanım... Bütün mikroçipler Batuhan'ın önünde saygıyla eğiliyor.",
    advice: "Yatağının başucunda osiloskopla uyur. Rampada 'Kabloyu ters mi taktık?' şakalarına tahammülü yoktur.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Sorumlusu", department: "Aviyonik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-02-AVS" },
      { team: "MODEL UYDU", role: "Aviyonik Üyesi", department: "Aviyonik Birimi", status: "1. Tercihine Asil Yerleşti", code: "UYD-03-AVU" },
      { team: "SU ALTI ROKETİ", role: "Donanım", department: "Donanım Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-05-DON" }
    ]
  },
  {
    id: 5,
    name: "Salih Toker",
    searchTerms: ["salih", "toker", "salih toker"],
    tc: "1923******05",
    score: "589.600",
    rank: 5,
    title: "Su Altı Matrix Mimarı",
    badge: "🌊 SU ALTI YAZILIM SORUMLUSU",
    avatar: "🌊",
    workload: 85,
    joke: "Balıklarla binary konuşan, sonar sinyallerini milisaniyede parse eden su altı kod mimarı! 0 bug, sonsuz derinlik.",
    advice: "Su geçirmez klavye kullanması şiddetle önerilir.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Yazılım Sorumlusu", department: "Yazılım Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-02-YZS" }
    ]
  },
  {
    id: 6,
    name: "Cahit Onur Enoğlu",
    searchTerms: ["cahit", "onur", "enoglu", "enoğlu", "cahit onur", "cahit onur enoğlu", "cahit onur enoglu"],
    tc: "1923******06",
    score: "583.750",
    rank: 6,
    title: "Torpido Kod Ustası",
    badge: "🐬 AUTOPILOT VE DERİNLİK HESAPLAYICI",
    avatar: "🐬",
    workload: 80,
    joke: "Su altı roketine otopilot yazdıran adam! 20 knot hızla giderken bile heap allocation hatası vermez.",
    advice: "Derin sularda roket kaybolursa sonar loglarını Cahit'e teslim ediniz.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Yazılım", department: "Yazılım Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-03-YZL" }
    ]
  },
  {
    id: 7,
    name: "Şebnem Kurt",
    searchTerms: ["sebnem", "şebnem", "kurt", "şebnem kurt", "sebnem kurt"],
    tc: "1923******07",
    score: "585.100",
    rank: 7,
    title: "Uzay Mekaniği Şefi",
    badge: "🛰️ YÖRÜNGE KAPSÜL MİMARI",
    avatar: "🛰️",
    workload: 82,
    joke: "Atmosferden dönüşte paraşüt açılmazsa kapısını çalacağımız kişi! Uydunun gövdesi ve ayrılma mekanizması ona emanet.",
    advice: "Mikro yerçekimi simülasyonları için atölyede zıplaması serbesttir.",
    placements: [
      { team: "MODEL UYDU", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "UYD-04-MKU" }
    ]
  },
  {
    id: 8,
    name: "Damla Güven",
    searchTerms: ["damla", "guven", "güven", "damla guven", "damla güven"],
    tc: "1923******08",
    score: "582.300",
    rank: 8,
    title: "Roketin Gökteki Beyni",
    badge: "💻 STRATOSFER KOD MİMARI",
    avatar: "💻",
    workload: 84,
    joke: "Bug'sız kod, 3000 metre irtifada bile çökmeyen algoritma! 'Güven' kelimesi tesadüf değil; telemetri Damla'ya emanet.",
    advice: "Fırlatma anında telemetry stream kesilirse herkes Damla'nın yüz ifadesine bakar.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Üyesi", department: "Yazılım Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-03-AVZ" }
    ]
  },
  {
    id: 9,
    name: "Elvin Keyifli",
    searchTerms: ["elvin", "keyifli", "elvin keyifli"],
    tc: "1923******09",
    score: "580.650",
    rank: 9,
    title: "Keyifli Kodlar Ustası",
    badge: "✨ TELEMETRİ & YAZILIM DEHASI",
    avatar: "✨",
    workload: 81,
    joke: "Adı gibi keyifli uçuşlar için kod yazıyor! 'Bizim roket Exception fırlatmaz, direkt göklere uçar' felsefesinin mimarı.",
    advice: "Yazılım derlenirken kahvesini yudumlamayı asla ihmal etmez.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Üyesi", department: "Yazılım Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-04-AVZ" }
    ]
  },
  {
    id: 10,
    name: "Kerem İlbilgi",
    searchTerms: ["kerem", "ilbilgi", "kerem ilbilgi"],
    tc: "1923******10",
    score: "581.100",
    rank: 10,
    title: "İrtifa & Bilgi Canavarı",
    badge: "🧠 VERİ AKIŞI PROTOKOL ŞEFİ",
    avatar: "🧠",
    workload: 82,
    joke: "Bilgisi irtifayı aştı! Telemetri paketlerini gözü kapalı parse eden, sensörlerin nabzını tutan yazılımcı.",
    advice: "Baud rate ayarlarını rüyasında bile doğru girer.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Üyesi", department: "Yazılım Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-05-AVZ" }
    ]
  },
  {
    id: 11,
    name: "Alime Erva",
    searchTerms: ["alime", "erva", "alime erva"],
    tc: "1923******11",
    score: "579.400",
    rank: 11,
    title: "Kablo & Sensör Büyücüsü",
    badge: "🔌 DONANIM VE DEVRE USTASI",
    avatar: "🔌",
    workload: 83,
    joke: "Multimetre elinde, osiloskop kalbinde! Devre kartları Alime'nin elinde adeta sanat eserine dönüşüyor.",
    advice: "Kısa devre ihtimalini kokusundan 50 metre öteden sezer.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Üyesi", department: "Donanım Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-07-AVD" }
    ]
  },
  {
    id: 12,
    name: "Enes Köstekli",
    searchTerms: ["enes", "kostekli", "köstekli", "enes köstekli", "enes kostekli"],
    tc: "1923******12",
    score: "578.850",
    rank: 12,
    title: "Rampanın Voltaj Muhafızı",
    badge: "🔋 KÖSTEK DEĞİL TAM DESTEK",
    avatar: "🔋",
    workload: 80,
    joke: "Soyadına inat roketin önünde hiçbir köstek bırakmaz! Voltaj düşüşü sıfır, ateşleme anında tam güç!",
    advice: "LiPo pillerin şarj durumu Enes'e sorulmadan fırlatma yapılamaz.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Aviyonik Üyesi", department: "Donanım Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-08-AVD" }
    ]
  },
  {
    id: 13,
    name: "Muhammed Baki Emlak",
    searchTerms: ["muhammed", "baki", "emlak", "muhammed baki emlak", "muhammed baki"],
    tc: "1923******13",
    score: "577.200",
    rank: 13,
    title: "Göklerin Müteahhidi",
    badge: "🏗️ ROKET ŞASİ MİMARI",
    avatar: "🏗️",
    workload: 85,
    joke: "Göklerde arsa baktı, mekanik gövdeyi inşa etti! Karbonfiber tüpleri milimetrik hassasiyetle yerleştiren usta.",
    advice: "Roket fırlatıldıktan sonra tepe noktası mülkiyeti Muhammed Baki'ye aittir.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-10-MKU" }
    ]
  },
  {
    id: 14,
    name: "Sena Ceren Gökbeşe",
    searchTerms: ["sena", "ceren", "gokbese", "gökbeşe", "sena ceren", "sena ceren gökbeşe", "sena ceren gokbese"],
    tc: "1923******14",
    score: "576.900",
    rank: 14,
    title: "Aerodinamik Lordu",
    badge: "🚀 GÖKLERİN FATİHİ",
    avatar: "🚀",
    workload: 84,
    joke: "Gökbeşe göklere fırlatacak! Burun konisi ve kanatçıklar Sena Ceren'in milimetrik zımparasına emanet.",
    advice: "Sürtünme katsayısı (Cd) değerini rüzgar tünelinden daha iyi gözlemler.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-11-MKU" }
    ]
  },
  {
    id: 15,
    name: "Eda Ersezer",
    searchTerms: ["eda", "ersezer", "eda ersezer"],
    tc: "1923******15",
    score: "575.500",
    rank: 15,
    title: "Tork & Basınç Uzmanı",
    badge: "🛠️ KANATÇIK KORUYUCUSU",
    avatar: "🛠️",
    workload: 83,
    joke: "Rüzgar direncine meydan okuyan, montajda sıfır hata toleransıyla çalışan mekanik kahramanı!",
    advice: "Civatayı sıkarken 'bu tutar mı' diyen olursa tork anahtarıyla bakar.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-12-MKU" }
    ]
  },
  {
    id: 16,
    name: "Eylül Doğu",
    searchTerms: ["eylul", "eylül", "dogu", "doğu", "eylül doğu", "eylul dogu"],
    tc: "1923******16",
    score: "574.800",
    rank: 16,
    title: "Gökyüzünün Pusulası",
    badge: "🧭 MEKANİK MONTAJ ŞEFİ",
    avatar: "🧭",
    workload: 82,
    joke: "Eylül geldi fırlatma vakti! Mekanik gövde montajında hız ve zarafetin tek adresi.",
    advice: "Rampa hizalamasını tek bakışta teraziye alır.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-13-MKU" }
    ]
  },
  {
    id: 17,
    name: "Emirhan Yazıcı",
    searchTerms: ["emirhan", "yazici", "yazıcı", "emirhan yazıcı", "emirhan yazici"],
    tc: "1923******17",
    score: "573.950",
    rank: 17,
    title: "Lazer Kesim Hassasiyeti",
    badge: "📐 KADRO VE GÖVDE USTASI",
    avatar: "📐",
    workload: 81,
    joke: "Soyadı Yazıcı ama CNC ve lazer kesim gibi çalışıyor! Mekanik parçaların kusursuz montajcısı.",
    advice: "Kumpassız bir adım bile atmaz.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-14-MKU" }
    ]
  },
  {
    id: 18,
    name: "Elif Ceren Turan",
    searchTerms: ["elif", "ceren", "turan", "elif ceren", "elif ceren turan"],
    tc: "1923******18",
    score: "572.400",
    rank: 18,
    title: "Atölyenin Gizli Kahramanı",
    badge: "🎯 RAMPANIN GÖZ BEBEĞİ",
    avatar: "🎯",
    workload: 83,
    joke: "Son cıvata sıkılana, roket rampaya dikilene kadar atölyeden çıkmayan gerçek fedakar roketçi!",
    advice: "Epoksi kokusu onun için parfümden daha değerlidir.",
    placements: [
      { team: "ROKET - ORTA İRTİFA", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "ROK-15-MKU" }
    ]
  },
  {
    id: 19,
    name: "Hava Nur Delikanlı",
    searchTerms: ["hava", "nur", "delikanli", "delikanlı", "hava nur", "hava nur delikanlı", "hava nur delikanli"],
    tc: "1923******19",
    score: "571.300",
    rank: 19,
    title: "Basınca Kafa Tutan Delikanlı",
    badge: "⚓ 10 BAR BASINÇ SAVAŞÇISI",
    avatar: "⚓",
    workload: 82,
    joke: "10 bar basınca kafa tutan, contaları tek nefeste test eden mert mühendis! Denizler ondan korksun.",
    advice: "Mekanik atölyesinde Delikanlı tavırlarıyla tüm zorlukları ezer geçer.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-07-MKU" }
    ]
  },
  {
    id: 20,
    name: "Ilgın Çelik",
    searchTerms: ["ilgin", "ılgın", "celik", "çelik", "ılgın çelik", "ilgin celik"],
    tc: "1923******20",
    score: "570.800",
    rank: 20,
    title: "Çelik Zırhlı Gövde Ustası",
    badge: "🛡️ DERİNLİK KORUYUCUSU",
    avatar: "🛡️",
    workload: 81,
    joke: "Soyadı Çelik, yaptığı gövde taş gibi! Su altı roketinin sızdırmaz zırhı Ilgın'dan sorulur.",
    advice: "Metalle çalışırken bükülmeyen tek şey azmidir.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-08-MKU" }
    ]
  },
  {
    id: 21,
    name: "Ayşenaz Zenger",
    searchTerms: ["aysenaz", "ayşenaz", "zenger", "ayşenaz zenger", "aysenaz zenger"],
    tc: "1923******21",
    score: "569.900",
    rank: 21,
    title: "Derinliklerin Kraliçesi",
    badge: "🌊 SU ALTI BALİSTİK UZMANI",
    avatar: "🌊",
    workload: 80,
    joke: "Su altı mekaniğinin estetik ve mukavemet harikası! Roketi batırır da, hedefe zımba gibi çakar da!",
    advice: "Su sızdırmazlık testinde damla kaçıran parçayı atölyeden sürgün eder.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-09-MKU" }
    ]
  },
  {
    id: 22,
    name: "Semih Karatay",
    searchTerms: ["semih", "karatay", "semih karatay"],
    tc: "1923******22",
    score: "568.450",
    rank: 22,
    title: "Sızdırmazlık & O-Ring Baronu",
    badge: "🧰 HİDRODİNAMİK MONTAJ ŞEFİ",
    avatar: "🧰",
    workload: 82,
    joke: "O-Ring'lerin efendisi! İçeri tek damla su sızarsa 'o su değil ter damlamıştır' diyecek kadar iddialı mekanikçi.",
    advice: "Silikon gres tüpüyle derin bağlar kurmuştur.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-10-MKU" }
    ]
  },
  {
    id: 23,
    name: "Meryem Gülnihal",
    searchTerms: ["meryem", "gulnihal", "gülnihal", "meryem gülnihal", "meryem gulnihal"],
    tc: "1923******23",
    score: "567.800",
    rank: 23,
    title: "Derin Suların Torpido Mimarı",
    badge: "🔧 HASSAS MEKANİK ŞAMPİYONU",
    avatar: "🔧",
    workload: 81,
    joke: "Tork anahtarı elinde, roket derinde! Mekanik dayanıklılığın su altındaki sarsılmaz teminatı.",
    advice: "Su dinamiklerini çözerken çayından bir yudum alıp tebessüm eder.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-11-MKU" }
    ]
  },
  {
    id: 24,
    name: "Tunahan Yerlikaya",
    searchTerms: ["tunahan", "yerlikaya", "tunahan yerlikaya"],
    tc: "1923******24",
    score: "566.900",
    rank: 24,
    title: "Kaya Gibi Sağlam Mekanik",
    badge: "🪨 MEKANİK TAHKİMAT UZMANI",
    avatar: "🪨",
    workload: 80,
    joke: "Soyadı gibi Kaya, montajı çelik! Basınç odasında yapılan testlerden tek bir çizik almadan çıkan yiğit.",
    advice: "Mekanik parçalar Tunahan'ın elinde kaya gibi sağlamlaşır.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-12-MKU" }
    ]
  },
  {
    id: 25,
    name: "A. Mert Yeğen",
    searchTerms: ["mert", "yegen", "yeğen", "mert yeğen", "mert yegen", "a mert yegen", "a. mert yeğen", "ahmet mert"],
    tc: "1923******25",
    score: "565.350",
    rank: 25,
    title: "Su Altı Balistik Ustası",
    badge: "🏊 AMFİBİ ROKET KORUYUCUSU",
    avatar: "🏊",
    workload: 80,
    joke: "'Yeğenim bu su altında uçar mı?' diyen amcalara inat roketi suyun altında fişek gibi uçuran adam!",
    advice: "Her montaj sonrası 'Yeğenim bu roket tek atar' diyerek gövdeyi okşar.",
    placements: [
      { team: "SU ALTI ROKETİ", role: "Mekanik Üyesi", department: "Mekanik Birimi", status: "1. Tercihine Asil Yerleşti", code: "SUA-13-MKU" }
    ]
  },
  {
    id: 26,
    name: "Seher Yentür",
    searchTerms: ["seher", "yentur", "yentür", "seher yentür", "seher yentur"],
    tc: "1923******26",
    score: "591.200",
    rank: 26,
    title: "Sponsor Avcısı & Medya Kraliçesi",
    badge: "📢 TEKNOFEST PR & ETKİLEŞİM PATRONU",
    avatar: "📢",
    workload: 86,
    joke: "Takıma bütçe, Instagram'a rekor like, Yıldırım'a sponsor yağdıran halkla ilişkiler sihirbazı! Hikaye atmadan fırlatma yapılamaz.",
    advice: "Kamerayı gördüğü anda roketin en havalı açısını yakalar ve viral yapar.",
    placements: [
      { team: "SPONSORLUK & SOSYAL MEDYA", role: "Ekip Üyesi", department: "İletişim & Sosyal Medya", status: "1. Tercihine Asil Yerleşti", code: "MED-02-MED" }
    ]
  }
];
