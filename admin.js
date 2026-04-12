// ═══════════════════════════════════════════════════════════
//  admin.js — Admin Panel System for 67 TCG
//  Requires: window.fbFuncs, window.fbDb, window.fbUser,
//            CARD_DATABASE, SPECIAL_PACK_CFG, PACK_CFG
// ═══════════════════════════════════════════════════════════

/* ── 1. IDENTITY ────────────────────────────────────────── */
const ADMIN_EMAIL = 'alimalik67065@gmail.com';
let _admShowShiny = false;
/**
 * Returns true if the currently logged-in Firebase user
 * is the admin account.
 */
function isUserAdmin() {
  return !!(window.fbUser && window.fbUser.email === ADMIN_EMAIL);
}

/* ── 2. UI SYNC ─────────────────────────────────────────── */
/**
 * Shows/hides the crown button and applies admin body class.
 * Call this from onFirebaseAuthChange (see index.html instructions).
 */
function updateAdminUI() {
  const crown = document.getElementById('admin-crown-btn');
  if (!crown) return;

  if (isUserAdmin()) {
    crown.style.display = 'flex';
    document.body.classList.add('is-admin');
  } else {
    crown.style.display = 'none';
    document.body.classList.remove('is-admin');
  }
}

/* ── 3. OPEN PANEL ──────────────────────────────────────── */
function openAdminPanel() {
  if (!isUserAdmin()) {
    if (typeof toast === 'function') toast('⛔ Admin only!');
    return;
  }
  _buildAdminCardSelect();
  _buildAdminPackSelect();
  _resetAdminForm();
  openModal('admin-panel-modal');
}

/* ── 4. FORM HELPERS ────────────────────────────────────── */
function _buildAdminCardSelect() {
  const container = document.getElementById('adm-card-list');
  if (!container || typeof CARD_DATABASE === 'undefined') return;
  container.innerHTML = '';

  const RARITY_COLORS = {
    Common:'#8AACBC', Rare:'#6AB2FF', Epic:'#BA7CFF',
    Mythical:'#FF6E9E', Legendary:'#EEC060', SSSR:'#48EEB8', Hidden:'#ff96bc'
  };

  CARD_DATABASE.forEach(card => {
    if (card.isShiny !== _admShowShiny) return;
    const label = document.createElement('label');
    label.className = 'adm-card-item';
    label.innerHTML = `
      <input type="checkbox" class="adm-card-cb" value="${card.id}" />
      <span class="adm-card-dot" style="background:${RARITY_COLORS[card.rarity]||'#888'}"></span>
      <span class="adm-card-name">${card.name}</span>
      <span class="adm-card-rar" style="color:${RARITY_COLORS[card.rarity]||'#888'}">${card.rarity}</span>`;
    container.appendChild(label);
  });
}

function _buildAdminPackSelect() {
  const sel = document.getElementById('adm-pack-select');
  if (!sel) return;
  sel.innerHTML = '<option value="">— None —</option>';

  const addGroup = (label, entries) => {
    const grp = document.createElement('optgroup');
    grp.label = label;
    entries.forEach(([key, pk]) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = `${pk.icon || '📦'} ${pk.label || pk.name || key}`;
      grp.appendChild(opt);
    });
    sel.appendChild(grp);
  };

  if (typeof PACK_CFG !== 'undefined') addGroup('Standard Packs', Object.entries(PACK_CFG));
  if (typeof SPECIAL_PACK_CFG !== 'undefined') addGroup('Special Packs', Object.entries(SPECIAL_PACK_CFG));
}

function _resetAdminForm() {
  const ids = ['adm-target-input','adm-msg','adm-coins','adm-pack-qty'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = el.type === 'number' ? 0 : ''; });
  document.querySelectorAll('.adm-card-cb').forEach(cb => cb.checked = false);
  const sel = document.getElementById('adm-pack-select');
  if (sel) sel.value = '';
  _setAdminTargetMode('individual');
  document.getElementById('adm-card-search')?.dispatchEvent(new Event('input'));
}

function _setAdminTargetMode(mode) {
  const indivSection = document.getElementById('adm-indiv-section');
  const everyoneBadge = document.getElementById('adm-everyone-badge');
  const toggle = document.getElementById('adm-target-toggle');
  if (mode === 'everyone') {
    if (indivSection) indivSection.style.display = 'none';
    if (everyoneBadge) everyoneBadge.style.display = '';
    if (toggle) toggle.dataset.mode = 'everyone';
  } else {
    if (indivSection) indivSection.style.display = '';
    if (everyoneBadge) everyoneBadge.style.display = 'none';
    if (toggle) toggle.dataset.mode = 'individual';
  }
}

function toggleAdminTargetMode() {
  const toggle = document.getElementById('adm-target-toggle');
  const currentMode = toggle?.dataset.mode || 'individual';
  _setAdminTargetMode(currentMode === 'individual' ? 'everyone' : 'individual');
  // Update button label
  if (toggle) {
    const isEveryone = toggle.dataset.mode === 'everyone';
    toggle.textContent = isEveryone ? '🌍 Everyone — click to switch' : '👤 Individual — click to switch';
    toggle.style.background = isEveryone ? 'rgba(238,192,96,0.18)' : 'rgba(180,158,255,0.12)';
    toggle.style.color = isEveryone ? 'var(--gold)' : 'var(--accent)';
    toggle.style.borderColor = isEveryone ? 'rgba(238,192,96,0.35)' : 'rgba(180,158,255,0.25)';
  }
}

function filterAdminCards() {
  const query = (document.getElementById('adm-card-search')?.value || '').toLowerCase();
  document.querySelectorAll('.adm-card-item').forEach(item => {
    const name = item.querySelector('.adm-card-name')?.textContent.toLowerCase() || '';
    const rar  = item.querySelector('.adm-card-rar')?.textContent.toLowerCase() || '';
    item.style.display = (!query || name.includes(query) || rar.includes(query)) ? '' : 'none';
  });
}

function toggleAdminShinyView() {
  _admShowShiny = !_admShowShiny;
  const btn = document.getElementById('adm-shiny-toggle');
  if (btn) {
    btn.textContent = _admShowShiny ? '👤 Base' : '✨ Shiny';
    btn.style.background = _admShowShiny
      ? 'rgba(238,192,96,0.22)' : 'rgba(238,192,96,0.08)';
  }
  _buildAdminCardSelect();
  document.getElementById('adm-card-search')?.dispatchEvent(new Event('input'));
}

/* ── 5. SEND MASS GIFT ──────────────────────────────────── */
async function adminSendGift() {
  if (!isUserAdmin()) return;
  if (!window.fbDb || !window.fbFuncs) { toast('❌ Firebase not ready'); return; }

  const { collection: col, addDoc, getDocs, query, where, serverTimestamp } = window.fbFuncs;

  const toggle     = document.getElementById('adm-target-toggle');
  const targetMode = toggle?.dataset.mode || 'individual';
  const coinsAmt   = parseInt(document.getElementById('adm-coins')?.value) || 0;
  const packKey    = document.getElementById('adm-pack-select')?.value || '';
  const packQty    = Math.max(1, parseInt(document.getElementById('adm-pack-qty')?.value) || 1);
  const message    = document.getElementById('adm-msg')?.value.trim() || '';
  const selectedIds = [...document.querySelectorAll('.adm-card-cb:checked')].map(cb => cb.value);

  // Karten-Objekte aus CARD_DATABASE holen
  const cardObjects = (typeof CARD_DATABASE !== 'undefined')
    ? selectedIds.map(id => {
        const card = CARD_DATABASE.find(c => String(c.id) === String(id));
        if (!card) return null;
        return { id: card.id, name: card.name, rarity: card.rarity, class: card.class,
                 isShiny: !!card.isShiny, sellValue: card.sellValue || 0,
                 imageUrl: card.imageUrl || null, description: card.description || '',
                 hp: card.hp || 100, attackDamage: card.attackDamage || 10, pullWeight: card.pullWeight || 1 };
      }).filter(Boolean)
    : [];

  // Pack-Attachment
  const packCfg = packKey ? (SPECIAL_PACK_CFG?.[packKey] || PACK_CFG?.[packKey]) : null;
  const packAtt = packCfg ? {
    packKey,
    name: packCfg.label || packCfg.name || packKey,
    icon: packCfg.icon || '📦',
    bg:   packCfg.bg   || '',
    qty:  packQty,
    sellValue: packCfg.sellValue || 0,
  } : null;

  if (coinsAmt === 0 && !packAtt && cardObjects.length === 0 && !message) {
    toast('⚠️ Füge etwas zum Geschenk hinzu!'); return;
  }

  // attachments-Objekt — kompatibel mit bestehendem collectMail
  const attachments = {};
  if (coinsAmt > 0)        attachments.coins = coinsAmt;
  if (cardObjects.length)  attachments.cards = cardObjects;   // ← Array (Admin-Gift)
  if (packAtt)             attachments.pack  = packAtt;

  const sendBtn = document.getElementById('adm-send-btn');
  if (sendBtn) { sendBtn.disabled = true; sendBtn.textContent = '⏳ Sending…'; }

  try {
    if (targetMode === 'everyone') {
      // Alle User aus 'usernames'-Collection holen (dein System nutzt diese)
      const snap = await getDocs(col(window.fbDb, 'usernames'));
      let count = 0;
      for (const userDoc of snap.docs) {
        const receiverUsername = userDoc.id; // in deinem System ist der Doc-Key der Username
        try {
          await addDoc(col(window.fbDb, 'mailbox'), {
            sender:      '👑 Admin',
            receiver:    receiverUsername,
            message:     message || '🎁 Ein Geschenk vom Admin!',
            attachments,
            timestamp:   serverTimestamp(),
            collected:   false,
            isAdminGift: true,
          });
          count++;
        } catch (err) { console.warn('Skip', receiverUsername, err); }
      }
      toast(`👑 An ${count} User verschickt!`, true);

    } else {
      // Individuell — komma-getrennte Emails / Usernames
      const rawInput = document.getElementById('adm-target-input')?.value.trim() || '';
      if (!rawInput) { toast('⚠️ Kein Empfänger eingegeben!'); return; }

      const targets = rawInput.split(',').map(s => s.trim()).filter(Boolean);
      let sent = 0;

      for (const target of targets) {
        try {
          // Ermittle Username aus Email ODER nimm direkt als Username
          let receiverUsername = target;
          if (target.includes('@')) {
            // Email → Username nachschlagen in 'users' Collection
            const snap = await getDocs(query(col(window.fbDb, 'users'), where('email', '==', target)));
            if (snap.empty) { toast(`⚠️ Nicht gefunden: ${target}`); continue; }
            receiverUsername = snap.docs[0].data().username || snap.docs[0].id;
          }

          await addDoc(col(window.fbDb, 'mailbox'), {
            sender:      '👑 Admin',
            receiver:    receiverUsername,
            message:     message || '🎁 Ein Geschenk vom Admin!',
            attachments,
            timestamp:   serverTimestamp(),
            collected:   false,
            isAdminGift: true,
          });
          sent++;
        } catch (err) { console.error(`Fehler für ${target}:`, err); }
      }
      toast(`👑 An ${sent}/${targets.length} gesendet!`, true);
    }

    closeModal('admin-panel-modal');
  } catch (err) {
    console.error('Admin gift error:', err);
    toast('❌ Fehler: ' + err.message);
  } finally {
    if (sendBtn) { sendBtn.disabled = false; sendBtn.textContent = '👑 Send Gift'; }
  }
}
/* ── 6. INFINITE COLLECTION VIEW (admin only) ───────────── */
// MutationObserver: whenever the card grid re-renders, replace
// count badges with ∞ for the admin so the UI looks "godlike".
(function initAdminInfiniteView() {
  let observer = null;

  function patchCounts() {
    if (!isUserAdmin()) return;
    document.querySelectorAll('.ccard-count').forEach(el => {
      if (el.textContent !== '∞') el.textContent = '∞';
    });
    // Also patch pack inventory count badges if any
    document.querySelectorAll('.inv-pack-count').forEach(el => {
      if (el.textContent !== '∞') el.textContent = '∞';
    });
  }

  function startObserver() {
    if (observer) return;
    const target = document.getElementById('panel-collection') || document.body;
    observer = new MutationObserver(patchCounts);
    observer.observe(target, { childList: true, subtree: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Re-check on auth change events
    document.addEventListener('adminModeChanged', () => {
      if (isUserAdmin()) {
        startObserver();
        patchCounts();
      } else if (observer) {
        observer.disconnect();
        observer = null;
      }
    });
  });
})();

/* ── 7. QUICK ADMIN ACTIONS ─────────────────────────────── */
function adminAddCoins(amount) {
  if (!isUserAdmin()) return;
  if (typeof coins !== 'undefined') {
    // The main script's `coins` variable
    // We call it via a helper to avoid direct reference
    window._adminCoinsAdd(amount);
    if (typeof toast === 'function') toast(`👑 +${amount.toLocaleString()} coins added!`);
  }
}

function adminUnlockAllPacks() {
  if (!isUserAdmin()) return;
  if (typeof SPECIAL_PACK_CFG !== 'undefined' && typeof ownedSpecialPacks !== 'undefined') {
    Object.keys(SPECIAL_PACK_CFG).forEach(k => ownedSpecialPacks.add(k));
    if (typeof saveData === 'function') saveData();
    if (typeof renderShopSpecialPacks === 'function') renderShopSpecialPacks();
    if (typeof renderSpecialPacksPanel === 'function') renderSpecialPacksPanel();
    if (typeof toast === 'function') toast('👑 All special packs unlocked!');
  }
}