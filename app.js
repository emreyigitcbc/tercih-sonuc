// TEKNOFEST Yıldırım Roket Takımı - ÖSYM Tercih Açıklama Sistemi Uygulama Mantığı

document.addEventListener('DOMContentLoaded', () => {
  confetti.init();

  const nameInput = document.getElementById('name-input');
  const clearBtn = document.getElementById('clear-btn');
  const queryBtn = document.getElementById('query-btn');
  const autocompleteList = document.getElementById('autocomplete-list');
  const loadingSection = document.getElementById('query-loading');
  const resultSection = document.getElementById('result-section');
  const rosterModal = document.getElementById('roster-modal');
  const openRosterBtn = document.getElementById('open-roster-btn');
  const closeRosterBtn = document.getElementById('close-roster-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const printDocBtn = document.getElementById('print-doc-btn');
  const repeatConfettiBtn = document.getElementById('repeat-confetti-btn');
  const newSearchBtn = document.getElementById('new-search-btn');

  // Input events
  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    clearBtn.style.display = val ? 'flex' : 'none';
    showAutocomplete(val);
  });

  clearBtn.addEventListener('click', () => {
    nameInput.value = '';
    clearBtn.style.display = 'none';
    autocompleteList.style.display = 'none';
    nameInput.focus();
  });

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      autocompleteList.style.display = 'none';
      executeQuery(nameInput.value.trim());
    }
  });

  queryBtn.addEventListener('click', () => {
    autocompleteList.style.display = 'none';
    executeQuery(nameInput.value.trim());
  });

  // Sound toggle
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isMuted = confetti.toggleSound();
      soundToggleBtn.innerHTML = isMuted ? '🔇 Ses: Kapalı' : '🔊 Ses: Açık';
    });
  }

  // Confetti repeat
  if (repeatConfettiBtn) {
    repeatConfettiBtn.addEventListener('click', () => {
      confetti.burst(160);
    });
  }

  // Print
  if (printDocBtn) {
    printDocBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // New Search
  if (newSearchBtn) {
    newSearchBtn.addEventListener('click', () => {
      resultSection.style.display = 'none';
      nameInput.value = '';
      clearBtn.style.display = 'none';
      nameInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Modal events
  if (openRosterBtn) {
    openRosterBtn.addEventListener('click', () => {
      openModal();
    });
  }

  if (closeRosterBtn) {
    closeRosterBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  rosterModal.addEventListener('click', (e) => {
    if (e.target === rosterModal) closeModal();
  });

  // Quick Chips
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const queryName = btn.getAttribute('data-name');
      if (queryName) {
        nameInput.value = queryName;
        clearBtn.style.display = 'flex';
        executeQuery(queryName);
      }
    });
  });

  // Setup Modal Tabs
  setupModalTabs();

  // Search Normalization Helper
  function normalize(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .trim();
  }

  // Find Member
  function findMember(query) {
    if (!query) return null;
    const normQuery = normalize(query);

    // 1. Exact match
    let match = TEAM_MEMBERS.find(m => normalize(m.name) === normQuery);
    if (match) return match;

    // 2. Search terms match
    match = TEAM_MEMBERS.find(m => {
      if (m.searchTerms && m.searchTerms.some(term => normalize(term) === normQuery)) return true;
      return false;
    });
    if (match) return match;

    // 3. Substring match
    match = TEAM_MEMBERS.find(m => {
      if (normalize(m.name).includes(normQuery)) return true;
      if (m.searchTerms && m.searchTerms.some(term => normalize(term).includes(normQuery))) return true;
      return false;
    });
    return match || null;
  }

  // Autocomplete
  function showAutocomplete(val) {
    if (!val || val.length < 2) {
      autocompleteList.style.display = 'none';
      return;
    }

    const norm = normalize(val);
    const matches = TEAM_MEMBERS.filter(m => {
      if (normalize(m.name).includes(norm)) return true;
      if (m.searchTerms && m.searchTerms.some(t => normalize(t).includes(norm))) return true;
      return false;
    }).slice(0, 6);

    if (matches.length === 0) {
      autocompleteList.style.display = 'none';
      return;
    }

    autocompleteList.innerHTML = '';
    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      const rolePreview = m.placements.map(p => p.role).join(', ');
      item.innerHTML = `
        <div class="name-wrap">
          <span>${m.avatar}</span>
          <span>${m.name}</span>
        </div>
        <span class="team-tag">${m.placements.length > 1 ? m.placements.length + ' Takımda' : m.placements[0].team}</span>
      `;
      item.addEventListener('click', () => {
        nameInput.value = m.name;
        clearBtn.style.display = 'flex';
        autocompleteList.style.display = 'none';
        executeQuery(m.name);
      });
      autocompleteList.appendChild(item);
    });
    autocompleteList.style.display = 'block';
  }

  // Execute Query
  function executeQuery(name) {
    if (!name) {
      alert("Lütfen ad ve soyad giriniz!");
      nameInput.focus();
      return;
    }

    // Show loading for dramatic comedic suspense
    loadingSection.style.display = 'block';
    resultSection.style.display = 'none';
    loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      loadingSection.style.display = 'none';
      const member = findMember(name);
      renderResult(member, name);
      resultSection.style.display = 'block';
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (member) {
        confetti.burst(180);
      }
    }, 450);
  }

  // Barcode generator SVG
  function generateBarcodeSVG(code) {
    const bars = [];
    const len = 38;
    for (let i = 0; i < len; i++) {
      const width = ((i * 7 + code.length) % 3) + 1;
      const isBlack = (i % 2 === 0) || (i % 5 === 0);
      if (isBlack) {
        bars.push(`<rect x="${i * 4.2}" y="0" width="${width}" height="32" fill="#111827" />`);
      }
    }
    return `
      <svg class="barcode-svg" viewBox="0 0 165 34">
        ${bars.join('')}
      </svg>
    `;
  }

  // Render Result Document
  function renderResult(member, searchedName) {
    const docContainer = document.getElementById('osym-document-content');
    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const authCode = member 
      ? `YLD-2026-${member.id.toString().padStart(3, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      : `YLD-2026-RET-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    if (!member) {
      // Not found rejection document
      docContainer.innerHTML = `
        <div class="osym-document-wrapper">
          <!-- Document Header -->
          <div class="doc-header">
            <div class="doc-header-left">
              <div class="turkish-emblem">🇹🇷</div>
            </div>
            <div class="doc-header-center">
              <div class="tc-title">T.C.</div>
              <div class="inst-title">ÖLÇME, SEÇME VE YERLEŞTİRME MERKEZİ BAŞKANLIĞI</div>
              <div class="sub-inst-title">(YILDIRIM SEÇME VE YERLEŞTİRME SİSTEMİ - YSYM)</div>
              <div class="exam-title">2026-TEKNOFEST YILDIRIM TAKIMLARI YERLEŞTİRME SONUÇ BELGESİ</div>
            </div>
            <div class="doc-header-right">
              <img src="logo.png" alt="Yıldırım Roket Takımı Logo" class="doc-logo" />
            </div>
          </div>

          <!-- Candidate Details -->
          <div class="doc-candidate-grid">
            <div class="candidate-photo-box">
              <div class="photo-avatar">🥲</div>
              <div class="photo-label">FOTOĞRAF</div>
              <div class="photo-stamp" style="background:#dc2626;">YERLEŞEMEDİ</div>
            </div>
            <table class="osym-table">
              <tr>
                <th>T.C. KİMLİK NUMARASI</th>
                <td>1907******00</td>
              </tr>
              <tr>
                <th>ADI VE SOYADI</th>
                <td style="color:#dc2626; font-size:1.05rem;">${escapeHTML(searchedName)}</td>
              </tr>
              <tr>
                <th>BABA ADI</th>
                <td>TEKNOFEST</td>
              </tr>
              <tr>
                <th>UZAYA GİRİŞ PUANI (UGP)</th>
                <td>412.350 (Taban Puanın Altında)</td>
              </tr>
              <tr>
                <th>YILDIRIM BAŞARI SIRASI</th>
                <td>Yedek Liste Dışı</td>
              </tr>
            </table>
          </div>

          <!-- Placement Notification Banner -->
          <div class="placement-banner failure">
            <div class="status-badge">SONUÇ BİLDİRİMİ</div>
            <div class="banner-heading">HERHANGİ BİR PROGRAMA YERLEŞEMEDİNİZ! 🥲</div>
            <div class="banner-subtext">2026 TEKNOFEST Yıldırım Roket Takımı taban yerleştirme puanının (560.000) altında kaldınız.</div>
          </div>

          <!-- Witty Committee Note -->
          <div class="jury-note-card" style="border-left-color: #dc2626; background: #fff1f2;">
            <div class="jury-note-header" style="color: #991b1b;">
              <span>☕</span>
              <span>YSYM TESELLİ VE MORAL KOMİTESİ NOTU</span>
            </div>
            <div class="jury-comment" style="color: #881337;">
              "Üzülmeyiniz! Roketimiz göğe fırlatılırken tribünden alkışlamak ve atölyemize sıcak simit-çay kapıp gelmek için kontenjanımız sınırsızdır! İsminizi yanlış yazmış olma ihtimalinize karşı aşağıdaki listeden takım üyelerimizi kontrol edebilirsiniz."
            </div>
          </div>

          <!-- Security Footer -->
          <div class="doc-security-footer">
            <div class="barcode-wrap">
              ${generateBarcodeSVG(authCode)}
              <div class="barcode-code">${authCode}</div>
            </div>
            <div class="security-center">
              <div>Belge Oluşturulma Tarihi: <strong>${dateStr} ${timeStr}</strong></div>
              <div>Bu belgenin doğruluğu TEKNOFEST Yıldırım Atölyesinden teyit edilebilir.</div>
            </div>
            <div class="official-red-stamp" style="border-color:#dc2626; color:#dc2626;">
              <span>YILDIRIM</span>
              <span>ROKET</span>
              <span>RED</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Found Candidate
    const isMulti = member.placements.length > 1;
    const placementRows = member.placements.map((p, idx) => `
      <tr>
        <td style="font-family: monospace; font-weight: bold; color: #475569;">${p.code || 'ROK-2026'}</td>
        <td>
          <span class="team-badge">
            ${TEAMS_INFO[p.team] ? TEAMS_INFO[p.team].icon : '🚀'} ${p.team}
          </span>
        </td>
        <td><span class="role-tag">${p.role}</span></td>
        <td>${p.department}</td>
        <td><span class="status-ok">✔ ${p.status}</span></td>
      </tr>
    `).join('');

    const workloadHTML = isMulti ? `
      <div class="workload-card">
        <div class="workload-header">
          <span>⚡ ÇOKLU GÖREV & İŞ YÜKÜ SEVİYESİ</span>
          <span>%${member.workload} (Kritik Hiperaktivite Seviyesi)</span>
        </div>
        <div class="workload-bar-wrap">
          <div class="workload-bar-fill" style="width: ${member.workload}%;"></div>
        </div>
        <div class="workload-desc">
          ⚠️ Uyarı: ${member.placements.length} farklı birimde görevli olduğunuzdan uyku saatleriniz dondurulmuş, kahve kontenjanınız sınırsıza yükseltilmiştir!
        </div>
      </div>
    ` : '';

    docContainer.innerHTML = `
      <div class="osym-document-wrapper">
        <!-- Document Header -->
        <div class="doc-header">
          <div class="doc-header-left">
            <div class="turkish-emblem">🇹🇷</div>
          </div>
          <div class="doc-header-center">
            <div class="tc-title">T.C.</div>
            <div class="inst-title">ÖLÇME, SEÇME VE YERLEŞTİRME MERKEZİ BAŞKANLIĞI</div>
            <div class="sub-inst-title">(YILDIRIM SEÇME VE YERLEŞTİRME SİSTEMİ - YSYM)</div>
            <div class="exam-title">2026-TEKNOFEST YILDIRIM TAKIMLARI YERLEŞTİRME SONUÇ BELGESİ</div>
          </div>
          <div class="doc-header-right">
            <img src="logo.png" alt="Yıldırım Roket Takımı Logo" class="doc-logo" />
          </div>
        </div>

        <!-- Candidate Profile Grid -->
        <div class="doc-candidate-grid">
          <div class="candidate-photo-box">
            <div class="photo-avatar">${member.avatar || '🚀'}</div>
            <div class="photo-label">ADAY FOTOĞRAFI</div>
            <div class="photo-stamp">ASİL YERLEŞTİ</div>
          </div>
          <table class="osym-table">
            <tr>
              <th>T.C. KİMLİK NUMARASI</th>
              <td>${member.tc}</td>
            </tr>
            <tr>
              <th>ADI VE SOYADI</th>
              <td style="font-size: 1.15rem; color: #0b3b60; font-weight: 800;">${member.name}</td>
            </tr>
            <tr>
              <th>ÖZEL UNVAN & ROZET</th>
              <td style="color: #b45309; font-weight: 700;">${member.badge}</td>
            </tr>
            <tr>
              <th>UZAYA GİRİŞ PUANI (UGP)</th>
              <td style="font-weight: 800; color: #047857;">${member.score}</td>
            </tr>
            <tr>
              <th>YILDIRIM BAŞARI SIRALAMASI</th>
              <td><strong>${member.rank}. / 26 Aday</strong></td>
            </tr>
            <tr>
              <th>KONTENJAN TÜRÜ</th>
              <td>${isMulti ? '⭐ Süper Roketçi / Çoklu Kadro' : 'Teknofest Roketçi Asil Kontenjanı'}</td>
            </tr>
          </table>
        </div>

        <!-- Placement Notification Banner -->
        <div class="placement-banner ${isMulti ? 'multi' : 'success'}">
          <div class="status-badge">${isMulti ? '🚨 ÇOKLU YERLEŞTİRME TESPİT EDİLDİ' : 'TEBRİKLER'}</div>
          <div class="banner-heading">
            ${isMulti 
              ? `BİRDEN FAZLA TAKIMA ASİL OLARAK YERLEŞTİNİZ! (${member.placements.length} AYRI GÖREV)` 
              : 'BİR TEKNOFEST YILDIRIM TAKIMINA YERLEŞTİNİZ! 🎉'}
          </div>
          <div class="banner-subtext">
            ${isMulti 
              ? 'Tebrikler! Üstün yetenek ve hiperaktiviteniz dolayısıyla birden çok masada yetkilendirildiniz.' 
              : '2026 Teknofest maratonunda Yıldırım Roket Takımı kadrosuna dahil oldunuz.'}
          </div>
        </div>

        ${workloadHTML}

        <!-- Detailed Placements Table -->
        <div class="placements-table-container">
          <div class="section-title-bar">
            <span>📋 YERLEŞTİĞİ TAKIM VE GÖREV DETAYLARI</span>
            <span>TOPLAM: ${member.placements.length} KADRO</span>
          </div>
          <div class="table-responsive">
            <table class="placements-data-table">
              <thead>
                <tr>
                  <th>PROGRAM KODU</th>
                  <th>TAKIM ADI</th>
                  <th>GÖREV / UNVAN</th>
                  <th>BİRİM</th>
                  <th>YERLEŞME DURUMU</th>
                </tr>
              </thead>
              <tbody>
                ${placementRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Witty Jury Card -->
        <div class="jury-note-card">
          <div class="jury-note-header">
            <span>🎯</span>
            <span>YILDIRIM YÖNETİM KURULU ESPRİLİ DEĞERLENDİRMESİ</span>
          </div>
          <div class="jury-comment">
            "${member.joke}"
          </div>
          <div class="jury-advice">
            💡 Taktiksel Tavsiye: ${member.advice}
          </div>
        </div>

        <!-- Official Legalistic-Satirical Guidelines -->
        <div class="doc-rules-box">
          <div class="rules-title">ADAYIN DİKKATİNE & İNTİBAK KURALLARI:</div>
          <ol>
            <li>Kayıt için adayların yanlarında en az 2 koli enerji içeceği, 1 adet lehim havyası ve sınırsız sabır getirmeleri gerekmektedir.</li>
            <li>Rampa fırlatması esnasında geri sayımda 'Hocam bu uçar mı ya' demek kesinlikle yasaktır; soran olursa atölye zımparalama cezası verilir.</li>
            <li>Takımdan ayrılmak isteyen adayların tazminat olarak takıma 1 adet katı yakıtlı roket motoru teslim etmesi zorunludur.</li>
            <li>Sabahlama nöbetlerinde uyuyakalanların yüzüne termal macunla roket çizilecektir.</li>
            <li>Bu sonuç belgesi TEKNOFEST atölyesinde, roket rampasında ve Instagram etiketlerinde geçerlidir.</li>
          </ol>
        </div>

        <!-- Document Security Footer -->
        <div class="doc-security-footer">
          <div class="barcode-wrap">
            ${generateBarcodeSVG(authCode)}
            <div class="barcode-code">${authCode}</div>
          </div>
          <div class="security-center">
            <div>Belge Doğrulama Kodu: <strong>${authCode}</strong></div>
            <div>Belge Oluşturulma Zamanı: <strong>${dateStr} ${timeStr}</strong></div>
            <div>T.C. TEKNOFEST YILDIRIM ROKET TAKIMI RESMİ SONUÇ BELGESİDİR</div>
          </div>
          <div class="official-red-stamp">
            <span>YILDIRIM</span>
            <span>ROKET</span>
            <span>ASLIDIR</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    `;
  }

  // Setup Modal Tabs
  function setupModalTabs() {
    const tabsContainer = document.getElementById('modal-tabs');
    const rosterGrid = document.getElementById('roster-grid');

    const tabs = [
      { id: 'all', name: 'Tümü (26 Kişi)' },
      { id: 'ROKET - ORTA İRTİFA', name: '🚀 Roket - Orta İrtifa (15)' },
      { id: 'MODEL UYDU', name: '🛰️ Model Uydu (5)' },
      { id: 'SU ALTI ROKETİ', name: '🌊 Su Altı Roketi (13)' },
      { id: 'SPONSORLUK & SOSYAL MEDYA', name: '📢 Medya & Sponsorluk (4)' }
    ];

    tabsContainer.innerHTML = '';
    tabs.forEach((tab, index) => {
      const btn = document.createElement('button');
      btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
      btn.textContent = tab.name;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterRoster(tab.id);
      });
      tabsContainer.appendChild(btn);
    });

    renderRosterGrid(TEAM_MEMBERS);

    function filterRoster(filterId) {
      if (filterId === 'all') {
        renderRosterGrid(TEAM_MEMBERS);
      } else {
        const filtered = TEAM_MEMBERS.filter(m => m.placements.some(p => p.team === filterId));
        renderRosterGrid(filtered, filterId);
      }
    }

    function renderRosterGrid(members, activeTeam = null) {
      rosterGrid.innerHTML = '';
      members.forEach(m => {
        const card = document.createElement('div');
        card.className = 'roster-card';
        let dutyText = '';
        if (activeTeam) {
          const matchedDuty = m.placements.find(p => p.team === activeTeam);
          dutyText = matchedDuty ? `${matchedDuty.role} (${matchedDuty.department})` : '';
        } else {
          dutyText = m.placements.map(p => p.role).join(', ');
        }

        card.innerHTML = `
          <div class="avatar">${m.avatar}</div>
          <div class="info">
            <div class="name">${m.name}</div>
            <div class="duty">${dutyText}</div>
          </div>
          ${m.placements.length > 1 ? `<span class="count-pill">${m.placements.length} Takım</span>` : ''}
        `;

        card.addEventListener('click', () => {
          closeModal();
          nameInput.value = m.name;
          clearBtn.style.display = 'flex';
          executeQuery(m.name);
        });

        rosterGrid.appendChild(card);
      });
    }
  }

  function openModal() {
    rosterModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    rosterModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
