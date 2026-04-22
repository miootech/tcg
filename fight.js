// ═══════════════════════════════════════════════════
//  fight.js — Battle System Logic
// ═══════════════════════════════════════════════════

let fightDeck   = { fighters: [null, null, null], buff: null };
let currentRoom = null;
let playerSide  = null;
let unsubFight  = null;
let lastState   = null;

// ── Fight Toast System ────────────────────────────────
// Types: 'error' | 'success' | 'info' | 'attack' | 'buff' | 'win' | 'lose' | 'room'
(function injectFightToastStyles() {
  if (document.getElementById('fight-toast-styles')) return;
  const s = document.createElement('style');
  s.id = 'fight-toast-styles';
  s.textContent = `
    #fight-toast-wrap {
      position: fixed; bottom: 5rem; left: 50%;
      transform: translateX(-50%);
      z-index: 1060;
      display: flex; flex-direction: column;
      gap: 0.4rem; align-items: center;
      pointer-events: none;
    }
    .fight-toast {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.55rem 1.1rem 0.55rem 0.85rem;
      border-radius: 999px;
      font-family: 'Quicksand', sans-serif;
      font-size: 0.82rem; font-weight: 700;
      border: 1px solid transparent;
      box-shadow: 0 8px 28px rgba(0,0,0,0.45);
      white-space: nowrap;
      animation: ftIn 0.34s cubic-bezier(0.34,1.56,0.64,1) both,
                 ftOut 0.26s 2.6s cubic-bezier(0.55,0,1,0.45) forwards;
    }
    @keyframes ftIn  { from { opacity:0; transform:translateY(12px) scale(0.88); } to { opacity:1; transform:none; } }
    @keyframes ftOut { from { opacity:1; } to { opacity:0; transform:translateY(-8px) scale(0.93); } }

    .fight-toast-icon { font-size: 1rem; flex-shrink: 0; }

    /* ── Varianten ── */
    .ft-error   { background:#1f0d0d; border-color:rgba(255,77,109,0.4); color:#ff6b88; box-shadow:0 8px 28px rgba(0,0,0,0.45),0 0 14px rgba(255,77,109,0.12); }
    .ft-success { background:#0c1a14; border-color:rgba(88,240,192,0.35); color:#58f0c0; box-shadow:0 8px 28px rgba(0,0,0,0.45),0 0 14px rgba(88,240,192,0.12); }
    .ft-info    { background:#13112a; border-color:rgba(180,158,255,0.3); color:#c8b8ff; box-shadow:0 8px 28px rgba(0,0,0,0.45),0 0 14px rgba(180,158,255,0.1); }
    .ft-attack  { background:#1a0f08; border-color:rgba(255,120,60,0.4); color:#ff8c4a; box-shadow:0 8px 28px rgba(0,0,0,0.45),0 0 14px rgba(255,120,60,0.14); }
    .ft-buff    { background:#0b1a18; border-color:rgba(88,240,192,0.3); color:#4dd8b0; box-shadow:0 8px 28px rgba(0,0,0,0.45),0 0 10px rgba(88,240,192,0.1); }
    .ft-win     { background:#0a1a0f; border-color:rgba(88,240,150,0.45); color:#a8ffb2;
                  box-shadow:0 8px 28px rgba(0,0,0,0.5),0 0 20px rgba(88,240,150,0.2);
                  animation: ftIn 0.34s cubic-bezier(0.34,1.56,0.64,1) both,
                             ftWinPulse 0.6s 0.3s ease-in-out 2,
                             ftOut 0.26s 3.2s cubic-bezier(0.55,0,1,0.45) forwards;
                  font-size: 0.9rem; padding: 0.65rem 1.3rem 0.65rem 1rem; }
    .ft-lose    { background:#1a080d; border-color:rgba(255,77,109,0.45); color:#ff4d6d;
                  box-shadow:0 8px 28px rgba(0,0,0,0.5),0 0 16px rgba(255,77,109,0.18);
                  font-size: 0.9rem; padding: 0.65rem 1.3rem 0.65rem 1rem; }
    .ft-room    { background:#0e1220; border-color:rgba(126,200,248,0.35); color:#7ec8f8; box-shadow:0 8px 28px rgba(0,0,0,0.45),0 0 12px rgba(126,200,248,0.1); }

    @keyframes ftWinPulse {
      0%,100% { box-shadow:0 8px 28px rgba(0,0,0,0.5),0 0 20px rgba(88,240,150,0.2); }
      50%      { box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 32px rgba(88,240,150,0.38); }
    }
  `;
  document.head.appendChild(s);

  const wrap = document.createElement('div');
  wrap.id = 'fight-toast-wrap';
  document.body.appendChild(wrap);
})();

const FIGHT_TOAST_ICONS = {
  error:   '✕',
  success: '✓',
  info:    '●',
  attack:  '⚔️',
  buff:    '🛡️',
  win:     '🏆',
  lose:    '💀',
  room:    '🔗',
};

function fightToast(msg, type = 'info') {
  const wrap = document.getElementById('fight-toast-wrap');
  if (!wrap) { console.warn(msg); return; }

  const el = document.createElement('div');
  el.className = `fight-toast ft-${type}`;

  const icon = document.createElement('span');
  icon.className = 'fight-toast-icon';
  icon.textContent = FIGHT_TOAST_ICONS[type] || '●';

  const text = document.createElement('span');
  text.textContent = msg;

  el.appendChild(icon);
  el.appendChild(text);
  wrap.appendChild(el);

  const duration = (type === 'win' || type === 'lose') ? 3550 : 3000;
  setTimeout(() => el.remove(), duration);
}

// ── Helpers ───────────────────────────────────────────
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function getCard(id) {
  const db = typeof CARD_DATABASE !== 'undefined' ? CARD_DATABASE : (window.CARD_DATABASE || []);
  return db.find(c => c.id == id) || null;
}

function getFullCard(id) {
  const db = typeof CARD_DATABASE !== 'undefined' ? CARD_DATABASE : (window.CARD_DATABASE || []);
  const card = db.find(c => c.id == id);
  if (!card) return null;
  if (!card.type && card.baseId && card.baseId !== card.id) {
    const base = db.find(c => c.id == card.baseId);
    if (base) return { ...base, ...card,
      type: card.type || base.type, hp: card.hp ?? base.hp,
      attackDamage: card.attackDamage ?? base.attackDamage,
      effect: card.effect ?? base.effect };
  }
  return card;
}

function fightState(stateId) {
  ['fight-deck-builder', 'fight-waiting', 'fight-battle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const activeEl = document.getElementById(stateId);
  if (activeEl) activeEl.style.display = stateId === 'fight-battle' ? 'block' : '';
}

// ── UI Renderer ───────────────────────────────────────
function renderFighterSlots() {
  fightDeck.fighters.forEach((id, idx) => {
    const el = document.querySelector(`.fight-slot[data-slot="${idx}"]`);
    if (!el) return;
    if (id) {
      const card = getFullCard(id);
      el.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;width:100%">
          <div style="font-size:1.2rem">✅</div>
          <div style="text-align:left">
            <div style="font-weight:700;color:var(--accent);font-size:0.88rem">${card.name}</div>
            <div style="font-size:0.68rem;opacity:0.7;font-family:'DM Mono',monospace">HP ${card.hp || 100} · ATK ${card.attackDamage || 10}</div>
          </div>
        </div>`;
      el.classList.add('filled');
    } else {
      el.innerHTML = `➕ Fighter ${idx + 1}`;
      el.classList.remove('filled');
    }
  });

  const buffEl = document.getElementById('buff-slot');
  if (buffEl) {
    if (fightDeck.buff) {
      const card = getFullCard(fightDeck.buff);
      buffEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;width:100%">
          <div style="font-size:1.2rem">🛡️</div>
          <div style="text-align:left">
            <div style="font-weight:700;color:var(--mint);font-size:0.88rem">${card.name}</div>
            <div style="font-size:0.68rem;opacity:0.7">Buff aktiv</div>
          </div>
        </div>`;
      buffEl.classList.add('filled');
    } else {
      buffEl.innerHTML = `🛡️ Buff Card`;
      buffEl.classList.remove('filled');
    }
  }
}

// ── Deck Builder Logic ────────────────────────────────
function openFighterPicker(slot) {
  let myCards = [];
  if (typeof collection !== 'undefined') myCards = collection;
  else if (window.collection) myCards = window.collection;
  else if (window.playerCollection) myCards = window.playerCollection;

  const ownedFighters = myCards
    .map(entry => { const c = getFullCard(entry.id); return c ? { ...c, isShiny: entry.isShiny ?? c.isShiny } : null; })
    .filter(c => c && c.type === 'fighter');

  if (ownedFighters.length === 0) {
    fightToast("No Fighter cards in your collection!", 'error'); return;
  }

  showFightPickerModal('fighter', ownedFighters, (card) => {
    fightDeck.fighters[slot] = card.id;
    if (typeof SFX !== 'undefined') SFX.play('click');
    renderFighterSlots();
    fightToast(`${card.name} selected as Fighter ${slot + 1}`, 'success');
  });
}

function openBuffPicker() {
  let myCards = [];
  if (typeof collection !== 'undefined') myCards = collection;
  else if (window.collection) myCards = window.collection;

  const ownedBuffs = myCards
    .map(entry => { const c = getFullCard(entry.id); return c ? { ...c, isShiny: entry.isShiny ?? c.isShiny } : null; })
    .filter(c => c && c.type === 'buff');

  if (ownedBuffs.length === 0) {
    fightToast("No Buff cards in your collection!", 'error'); return;
  }

  showFightPickerModal('buff', ownedBuffs, (card) => {
    fightDeck.buff = card.id;
    if (typeof SFX !== 'undefined') SFX.play('click');
    renderFighterSlots();
    fightToast(`${card.name} equipped as Buff`, 'buff');
  });
}

// ── Picker Modal ──────────────────────────────────────
function showFightPickerModal(type, cards, onSelect) {
  if (!document.getElementById('fight-picker-styles')) {
    const style = document.createElement('style');
    style.id = 'fight-picker-styles';
    style.textContent = `
      #fight-picker-modal {
        position:fixed; inset:0; z-index:9999;
        background:rgba(7,6,15,0.88);
        backdrop-filter:blur(18px) saturate(140%);
        -webkit-backdrop-filter:blur(18px) saturate(140%);
        display:flex; align-items:flex-end; justify-content:center;
        opacity:0; transition:opacity 0.28s cubic-bezier(0.16,1,0.3,1);
      }
      #fight-picker-modal.fp-open { opacity:1; }
      #fight-picker-sheet {
        background:var(--surface); border:1px solid var(--glass-edge);
        border-bottom:none; border-radius:24px 24px 0 0;
        width:100%; max-width:640px; max-height:82vh;
        display:flex; flex-direction:column;
        transform:translateY(40px);
        transition:transform 0.32s cubic-bezier(0.16,1,0.3,1);
        box-shadow:0 -24px 80px rgba(0,0,0,0.6);
        overflow:hidden;
      }
      #fight-picker-modal.fp-open #fight-picker-sheet { transform:translateY(0); }
      #fight-picker-handle { width:36px; height:4px; background:var(--glass-hi); border-radius:99px; margin:12px auto 0; flex-shrink:0; }
      #fight-picker-header { display:flex; align-items:center; justify-content:space-between; padding:14px 20px 10px; flex-shrink:0; border-bottom:1px solid var(--glass-edge); }
      #fight-picker-title { font-family:'Comfortaa',cursive; font-size:1rem; font-weight:700; color:var(--accent); display:flex; align-items:center; gap:8px; }
      #fight-picker-count { font-size:0.7rem; font-weight:700; background:var(--accent-dim); color:var(--accent); border:1px solid rgba(180,158,255,0.22); border-radius:99px; padding:2px 9px; font-family:'DM Mono',monospace; }
      #fight-picker-close { width:30px; height:30px; border-radius:50%; background:var(--surface-3); border:1px solid var(--glass-hi); color:var(--subtext); font-size:0.85rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.18s,color 0.18s; }
      #fight-picker-close:hover { background:var(--surface-4); color:var(--text); }
      #fight-picker-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(110px,1fr)); gap:10px; overflow-y:auto; padding:16px 20px 32px; flex:1; }
      #fight-picker-grid::-webkit-scrollbar { width:4px; }
      #fight-picker-grid::-webkit-scrollbar-thumb { background:var(--surface-4); border-radius:99px; }
      .fp-card { background:var(--surface-2); border:1.5px solid var(--glass-edge); border-radius:14px; padding:10px 8px; display:flex; flex-direction:column; align-items:center; cursor:pointer; position:relative; overflow:hidden; transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1),border-color 0.18s,box-shadow 0.18s; animation:fpCardIn 0.3s cubic-bezier(0.16,1,0.3,1) both; }
      @keyframes fpCardIn { from{opacity:0;transform:translateY(12px) scale(0.93);} to{opacity:1;transform:none;} }
      .fp-card:hover { transform:translateY(-4px) scale(1.03); border-color:var(--accent); box-shadow:0 8px 24px rgba(180,158,255,0.18); }
      .fp-card:active { transform:scale(0.97); }
      .fp-card.fp-buff:hover { border-color:var(--mint); box-shadow:0 8px 24px rgba(88,240,192,0.15); }
      .fp-card-art { width:100%; aspect-ratio:1/1; border-radius:9px; overflow:hidden; background:rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; margin-bottom:8px; }
      .fp-card-art img { width:100%; height:100%; object-fit:cover; display:block; }
      .fp-card-name { font-size:0.68rem; font-weight:700; text-align:center; line-height:1.2; color:var(--text); margin-bottom:4px; }
      .fp-card-stats { display:flex; gap:5px; justify-content:center; font-family:'DM Mono',monospace; font-size:0.62rem; font-weight:700; }
      .fp-hp { color:#ff6e9e; } .fp-atk { color:#7ec8f8; }
      .fp-buff-label { font-size:0.6rem; font-weight:700; color:var(--mint); background:rgba(88,240,192,0.1); border:1px solid rgba(88,240,192,0.22); border-radius:99px; padding:1px 7px; }
      .fp-shiny-badge { position:absolute; top:6px; left:6px; font-size:0.55rem; font-weight:700; background:linear-gradient(90deg,#eec060,#ffe090,#eec060); background-size:200%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:fpShineBadge 1.8s linear infinite; letter-spacing:0.04em; text-transform:uppercase; }
      @keyframes fpShineBadge { 0%{background-position:0%} 100%{background-position:200%} }
      .fp-card.fp-shiny { box-shadow:0 0 10px rgba(255,220,100,0.18); }
      .fp-card.fp-shiny::before { content:''; position:absolute; inset:0; z-index:2; pointer-events:none; background:linear-gradient(135deg,transparent 40%,rgba(255,220,100,0.14) 50%,transparent 60%); background-size:200% 200%; animation:fpShinySlide 2.4s ease-in-out infinite; border-radius:inherit; }
      @keyframes fpShinySlide { 0%{background-position:-100% -100%;} 100%{background-position:200% 200%;} }
    `;
    document.head.appendChild(style);
  }

  let modal = document.getElementById('fight-picker-modal');
  if (!modal) { modal = document.createElement('div'); modal.id = 'fight-picker-modal'; document.body.appendChild(modal); }

  const isBuff = type === 'buff';
  modal.innerHTML = `
    <div id="fight-picker-sheet">
      <div id="fight-picker-handle"></div>
      <div id="fight-picker-header">
        <div id="fight-picker-title">
          <span>${isBuff ? '🛡️ Select Buff Card' : '⚔️ Select Fighter'}</span>
          <span id="fight-picker-count">${cards.length}</span>
        </div>
        <button id="fight-picker-close">✕</button>
      </div>
      <div id="fight-picker-grid"></div>
    </div>`;

  const grid = modal.querySelector('#fight-picker-grid');
  cards.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = `fp-card${isBuff ? ' fp-buff' : ''}${card.isShiny ? ' fp-shiny' : ''}`;
    el.style.animationDelay = `${i * 0.03}s`;
    const artHtml = window.makeArtEl ? window.makeArtEl(card).outerHTML : (card.imageUrl ? `<img src="${card.imageUrl}" alt="">` : card.name[0]);
    const statsHtml = isBuff
      ? `<span class="fp-buff-label">Buff</span>`
      : `<div class="fp-card-stats"><span class="fp-hp">HP ${card.hp||100}</span><span class="fp-atk">ATK ${card.attackDamage||10}</span></div>`;
    el.innerHTML = `${card.isShiny ? '<span class="fp-shiny-badge">✦ Shiny</span>' : ''}<div class="fp-card-art">${artHtml}</div><div class="fp-card-name">${card.name}</div>${statsHtml}`;
    el.onclick = () => { closeFightPicker(); onSelect(card); };
    grid.appendChild(el);
  });

  modal.querySelector('#fight-picker-close').onclick = closeFightPicker;
  modal.onclick = (e) => { if (e.target === modal) closeFightPicker(); };
  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('fp-open'));
}

function closeFightPicker() {
  const modal = document.getElementById('fight-picker-modal');
  if (!modal) return;
  modal.classList.remove('fp-open');
  setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// ── Matchmaking & Firebase ────────────────────────────
async function createFightRoom() {
  if (!window.fbUser) { fightToast("You must be logged in!", 'error'); return; }
  if (fightDeck.fighters.includes(null)) { fightToast("Select all 3 Fighters first!", 'error'); return; }

  fightToast("Creating room…", 'info');
  currentRoom = generateRoomCode();
  playerSide  = 'A';
  const { doc, setDoc } = window.fbFuncs;

  const deckAData = { fighters: fightDeck.fighters, buff: fightDeck.buff || null };
  const fighterHp = fightDeck.fighters.map(id => getFullCard(id)?.hp || 100);

  await setDoc(doc(window.fbDb, 'games', currentRoom), {
    status: 'waiting', createdAt: Date.now(),
    playerA: window.fbUser.uid, deckA: deckAData,
    hpA: fighterHp, activeIndexA: 0, turn: 'A'
  });

  document.getElementById('room-code-display').textContent = currentRoom;
  fightToast(`Room ${currentRoom} created — waiting for opponent`, 'room');
  fightState('fight-waiting');
  listenFightRoom(currentRoom);
}

async function joinFightRoom() {
  if (!window.fbUser) { fightToast("You must be logged in!", 'error'); return; }
  if (fightDeck.fighters.includes(null)) { fightToast("Select all 3 Fighters first!", 'error'); return; }

  const code = document.getElementById('join-code-input').value.toUpperCase();
  if (code.length !== 6) { fightToast("Invalid room code!", 'error'); return; }

  fightToast("Joining room…", 'info');
  const { doc, getDoc, updateDoc } = window.fbFuncs;
  const ref  = doc(window.fbDb, 'games', code);
  const snap = await getDoc(ref);

  if (!snap.exists())                   { fightToast("Room not found!", 'error'); return; }
  if (snap.data().status !== 'waiting') { fightToast("Room is full or already active!", 'error'); return; }

  currentRoom = code;
  playerSide  = 'B';

  const deckBData = { fighters: fightDeck.fighters, buff: fightDeck.buff || null };
  const fighterHp = fightDeck.fighters.map(id => getFullCard(id)?.hp || 100);

  await updateDoc(ref, {
    status: 'active', playerB: window.fbUser.uid,
    deckB: deckBData, hpB: fighterHp, activeIndexB: 0
  });

  fightToast("Joined! Battle starting…", 'success');
  listenFightRoom(currentRoom);
}

function cancelFightRoom() {
  if (unsubFight) { unsubFight(); unsubFight = null; }
  currentRoom = null;
  window._fightResultCounted = false; // Reset für nächsten Kampf
  fightToast("Left the room", 'info');
  fightState('fight-deck-builder');
}

function listenFightRoom(roomId) {
  if (unsubFight) unsubFight();
  const { doc, onSnapshot } = window.fbFuncs;
  let battleStarted = false;

  unsubFight = onSnapshot(doc(window.fbDb, 'games', roomId), (docSnap) => {
    if (!docSnap.exists()) { fightToast("Room was closed!", 'error'); cancelFightRoom(); return; }
    const state = docSnap.data();
    lastState = state;

    if (state.status === 'active' || state.status === 'finished') {
      if (!battleStarted && state.status === 'active') {
        battleStarted = true;
        fightToast("Battle started — Fight!", 'attack');
      }
      fightState('fight-battle');
      renderBattleUI(state);
    }
  });
}

// ── Battle UI ─────────────────────────────────────────
function renderBattleUI(state) {
  const isA    = playerSide === 'A';
  const myDeck = isA ? state.deckA : state.deckB;
  const oppDeck= isA ? state.deckB : state.deckA;
  const myHp   = isA ? state.hpA  : state.hpB;
  const oppHp  = isA ? state.hpB  : state.hpA;
  const myIdx  = isA ? state.activeIndexA : state.activeIndexB;
  const oppIdx = isA ? state.activeIndexB : state.activeIndexA;
  const isMyTurn = state.turn === playerSide;

  if (state.status === 'finished') {
    const iWon = state.winner === window.fbUser.uid;
    document.getElementById('fight-status').innerHTML = iWon
      ? '<span style="color:#a8ffb2">Battle Over! You Won! 🏆</span>'
      : '<span style="color:#ff4d6d">Battle Over! You Lost. 💀</span>';
    document.getElementById('fight-action-btn').style.display = 'none';
    fightToast(iWon ? "Victory! Well played! 🏆" : "Defeat. Better luck next time.", iWon ? 'win' : 'lose');
    // ── Fight Stats tracking ──────────────────────────────
    if (!window._fightResultCounted) {
      window._fightResultCounted = true; // verhindert mehrfaches Zählen (rerenders)
      if (typeof fightsPlayed !== 'undefined') { fightsPlayed++; }
      if (iWon && typeof fightsWon !== 'undefined') { fightsWon++; }
      if (typeof saveData === 'function') saveData();
    } else {
    document.getElementById('fight-status').innerHTML = isMyTurn
      ? '<span style="color:var(--accent)">Your Turn!</span>'
      : '<span style="color:var(--subtext)">Enemy\'s Turn...</span>';
    const actionBtn = document.getElementById('fight-action-btn');
    if (actionBtn) { actionBtn.style.display = isMyTurn ? 'block' : 'none'; actionBtn.disabled = false; }
    if (isMyTurn && lastState?.lastAction) {
      fightToast("Your turn — Attack!", 'info');
    }
  }

  const slotHtml = (id, hp, i, active, isPlayer) => {
    const card = getFullCard(id); const dead = hp <= 0;
    const color = isPlayer ? 'var(--accent)' : '#ff4d6d';
    const hpCol = isPlayer ? '#a8ffb2' : '#ff4d6d';
    return `<div style="flex:1;border:1px solid ${active ? color : 'var(--glass-edge)'};padding:0.5rem;text-align:center;opacity:${dead ? 0.3 : 1};background:var(--surface-2);border-radius:10px;transition:border-color 0.3s,opacity 0.3s;">
      <div style="font-size:0.65rem;color:var(--subtext);margin-bottom:3px">${isPlayer ? 'You' : 'Enemy'} ${i+1}</div>
      <div style="font-weight:700;font-size:0.82rem">${card ? card.name : '?'}</div>
      <div style="color:${hpCol};font-family:'DM Mono',monospace;font-weight:700;margin-top:3px;font-size:0.85rem">${hp} HP</div>
    </div>`;
  };

  const oppSlots = document.getElementById('opp-slots');
  if (oppSlots) oppSlots.innerHTML = oppDeck.fighters.map((id, i) => slotHtml(id, oppHp[i], i, i === oppIdx && oppHp[i] > 0, false)).join('');
  const mySlots = document.getElementById('my-slots');
  if (mySlots)  mySlots.innerHTML  = myDeck.fighters.map((id, i)  => slotHtml(id, myHp[i],  i, i === myIdx  && myHp[i]  > 0, true)).join('');
}

async function handleAttack() {
  if (!lastState || lastState.turn !== playerSide) return;
  const btn = document.getElementById('fight-action-btn');
  if (btn) btn.disabled = true;

  const state   = lastState;
  const isA     = playerSide === 'A';
  const atkSide = playerSide;
  const defSide = isA ? 'B' : 'A';

  const atkDeck = isA ? state.deckA : state.deckB;
  const defDeck = isA ? state.deckB : state.deckA;
  const atkIdx  = isA ? state.activeIndexA : state.activeIndexB;
  const defIdx  = isA ? state.activeIndexB : state.activeIndexA;

  const atkCard = getFullCard(atkDeck.fighters[atkIdx]);
  const defCard = getFullCard(defDeck.fighters[defIdx]);
  const atkBuff = getFullCard(atkDeck.buff);
  const defBuff = getFullCard(defDeck.buff);

  // --- SCHADENSBERECHNUNG ---
  let dmg = atkCard.attackDamage || 10;

  // 1. Attack Boost (bestehend) (attackBoost)
  // Erwartet einen Wert wie 3.0 für 30% mehr Schaden
  if (atkBuff?.effect?.attackBoost) {
    dmg = Math.round(dmg * atkBuff.effect.attackBoost);
  }

  // 2. Kritischer Treffer (NEU: increasedCritic)
  // Erwartet einen Wert wie 0.2 für 20% Chance
  let isCrit = false;
  if (atkBuff?.effect?.increasedCritic && Math.random() < atkBuff.effect.increasedCritic) {
    dmg = Math.round(dmg * 2);
    isCrit = true;
  }

  // 3. Defense / Damage Reduction (bestehend) (damageReduction)
  // Erwartet einen Wert wie 0.25 für 25% weniger Schaden
  if (defBuff?.effect?.damageReduction) {
    dmg = Math.round(dmg * (1 - defBuff.effect.damageReduction));
  }

  // --- SCHADEN ANWENDEN ---
  const hpKeyDef  = `hp${defSide}`;
  const idxKeyDef = `activeIndex${defSide}`;
  const newHpDef  = [...(state[hpKeyDef] || [])];
  
  newHpDef[defIdx] = Math.max(0, newHpDef[defIdx] - dmg);
  const enemyDefeated = newHpDef[defIdx] === 0;
  let newIdxDef = defIdx;
  if (enemyDefeated) newIdxDef = defIdx + 1;

  // --- ZUSATZEFFEKTE ---
  const updates = {
    [hpKeyDef]: newHpDef,
    [idxKeyDef]: newIdxDef,
    turn: defSide,
    lastAction: { attacker: atkSide, damage: dmg, timestamp: Date.now(), crit: isCrit }
  };

  // 4. Lifesteal (Heilung für den Angreifer) (lifeSteal)
  // Erwartet einen Wert wie 0.25 für 25% Heilung vom verursachten Schaden
  if (atkBuff?.effect?.lifeSteal) {
    const heal = Math.round(dmg * atkBuff.effect.lifeSteal);
    const hpKeyAtk = `hp${atkSide}`;
    const newHpAtk = [...(state[hpKeyAtk] || [])];
    const maxHp = atkCard.hp || 100;
    newHpAtk[atkIdx] = Math.min(maxHp, newHpAtk[atkIdx] + heal);
    updates[hpKeyAtk] = newHpAtk;
    fightToast(`Vampirismus: +${heal} HP geheilt!`, 'buff');
  }

  // 5. Thorns / Vergeltung (Schaden zurückwerfen) (thorns)
  // Erwartet einen Wert wie 0.15 für 15% Schaden zurück an den Angreifer
  if (defBuff?.effect?.thorns) {
    const reflectDmg = Math.round(dmg * defBuff.effect.thorns);
    const hpKeyAtk = `hp${atkSide}`;
    const newHpAtk = updates[hpKeyAtk] || [...(state[hpKeyAtk] || [])];
    newHpAtk[atkIdx] = Math.max(0, newHpAtk[atkIdx] - reflectDmg);
    updates[hpKeyAtk] = newHpAtk;
    fightToast(`Dornen: ${reflectDmg} Rückstoß-Schaden!`, 'error');
  }

  // Feedback Toasts
  if (isCrit) fightToast("KRITISCHER TREFFER! 💥", 'attack');
  
  if (enemyDefeated) {
    fightToast(`${atkCard.name} hat ${defCard?.name || 'Gegner'} besiegt!`, 'attack');
  } else {
    fightToast(`${atkCard.name} verursacht ${dmg} Schaden!`, 'attack');
  }

  // Siegprüfung
  const allDead = newHpDef.every(h => h === 0);
  if (allDead) {
    updates.status = 'finished';
    updates.winner = window.fbUser.uid;
  } else {
    updates.status = 'active';
  }

  const { doc, updateDoc } = window.fbFuncs;
  await updateDoc(doc(window.fbDb, 'games', currentRoom), updates);

  if (window.SFX) SFX.play('click');
}