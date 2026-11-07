// TEKNOFEST Yıldırım Roket Takımı - ÖSYM Tercih Açıklama Sistemi

(function () {
  'use strict';

  function initApp() {
    if (typeof confetti !== 'undefined' && confetti.init) {
      confetti.init();
    }

    const nameInput = document.getElementById('name-input');
    const clearBtn = document.getElementById('clear-btn');
    const queryBtn = document.getElementById('query-btn');
    const loadingSection = document.getElementById('query-loading');
    const resultSection = document.getElementById('result-section');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const printDocBtn = document.getElementById('print-doc-btn');
    const repeatConfettiBtn = document.getElementById('repeat-confetti-btn');
    const newSearchBtn = document.getElementById('new-search-btn');

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        const val = nameInput.value.trim();
        if (clearBtn) {
          clearBtn.style.display = val ? 'flex' : 'none';
        }
      });

      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerQuery();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (nameInput) {
          nameInput.value = '';
          nameInput.focus();
        }
        clearBtn.style.display = 'none';
      });
    }

    if (queryBtn) {
      queryBtn.addEventListener('click', () => {
        triggerQuery();
      });
    }

    function triggerQuery() {
      if (!nameInput) return;
      const val = nameInput.value.trim();
      executeQuery(val);
    }

    // Sound toggle
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        if (typeof confetti !== 'undefined' && confetti.toggleSound) {
          const isMuted = confetti.toggleSound();
          soundToggleBtn.innerHTML = isMuted ? '🔇 Ses: Kapalı' : '🔊 Ses: Açık';
        }
      });
    }

    // Confetti repeat
    if (repeatConfettiBtn) {
      repeatConfettiBtn.addEventListener('click', () => {
        if (typeof confetti !== 'undefined' && confetti.burst) {
          confetti.burst(160);
        }
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
        if (resultSection) resultSection.style.display = 'none';
        if (nameInput) {
          nameInput.value = '';
          nameInput.focus();
        }
        if (clearBtn) clearBtn.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Bulletproof Turkish-character and Case Insensitive Normalizer
    function normalize(str) {
      if (!str) return '';
      return str
        .replace(/İ/g, 'i')
        .replace(/I/g, 'ı')
        .toLocaleLowerCase('tr-TR')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Find Member
    function findMember(query) {
      if (!query || typeof TEAM_MEMBERS === 'undefined') return null;
      const normQuery = normalize(query);

      // 1. Exact normalized match
      let match = TEAM_MEMBERS.find(m => normalize(m.name) === normQuery);
      if (match) return match;

      // 2. Search terms exact match
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

    // Execute Query
    function executeQuery(name) {
      if (!name) {
        alert("Lütfen ad ve soyad giriniz!");
        if (nameInput) nameInput.focus();
        return;
      }

      if (loadingSection) {
        loadingSection.style.display = 'block';
        loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (resultSection) {
        resultSection.style.display = 'none';
      }

      setTimeout(() => {
        if (loadingSection) loadingSection.style.display = 'none';
        const member = findMember(name);
        renderResult(member, name);
        if (resultSection) {
          resultSection.style.display = 'block';
          resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (member && typeof confetti !== 'undefined' && confetti.burst) {
          confetti.burst(180);
        }
      }, 350);
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
      if (!docContainer) return;

      const now = new Date();
      const dateStr = now.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const authCode = member 
        ? `YLD-2026-${member.id.toString().padStart(3, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        : `YLD-2026-RET-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      if (!member) {
        // Rejection Document
        docContainer.innerHTML = `
          <div class="osym-document-wrapper">
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

            <div class="placement-banner failure">
              <div class="status-badge">SONUÇ BİLDİRİMİ</div>
              <div class="banner-heading">HERHANGİ BİR PROGRAMA YERLEŞEMEDİNİZ! 🥲</div>
              <div class="banner-subtext">2026 TEKNOFEST Yıldırım Roket Takımı taban yerleştirme puanının altında kaldınız.</div>
            </div>

            <div class="jury-note-card" style="border-left-color: #dc2626; background: #fff1f2;">
              <div class="jury-note-header" style="color: #991b1b;">
                <span>☕</span>
                <span>YSYM TESELLİ NOTU</span>
              </div>
              <div class="jury-comment" style="color: #881337;">
                "Üzülmeyiniz! Atölyemize sıcak simit-çay kapıp gelmek için kontenjanımız sınırsızdır. İsminizi doğru yazdığınızdan emin olup tekrar sorgulayabilirsiniz."
              </div>
            </div>

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
      const placementRows = member.placements.map(p => `
        <tr>
          <td style="font-family: monospace; font-weight: bold; color: #475569;">${p.code || 'ROK-2026'}</td>
          <td>
            <span class="team-badge">
              ${(typeof TEAMS_INFO !== 'undefined' && TEAMS_INFO[p.team]) ? TEAMS_INFO[p.team].icon : '🚀'} ${p.team}
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
