// ═══════════════════════════════════════════════════════════
//  titles.js — Title & Profile Showcase System for 67 TCG
//
//  Depends on: window.fbFuncs, window.fbDb, window.fbUser,
//              CARD_DATABASE, QUESTS_DATABASE (quests.js)
//
//  State variables (exposed on window):
//    window.equippedTitleId   – currently equipped title id (string|null)
//    window.equippedTitleColor – glow color key (string)
//    window.unlockedTitles    – Set of unlocked title ids
//    window.showcaseCards     – Array of up to 3 card ids (numbers)
//
//  Public API:
//    initTitleSystem()        – call once after loadData()
//    getActiveTitleBoost()    – returns { luck, coinMult, packLuck, shinyBoost }
//    checkAndUnlockTitles()   – call after relevant state changes
//    saveTitleData()          – persist to localStorage + Firebase
//    renderTitlesPanel()      – render "My Titles" section in profile
//    renderShowcaseEditor()   – render showcase picker
//    openPlayerProfileModal(username) – view another player's public profile
//
//    1. EINZELNE KARTE:
//     unlockCondition: { type: 'card_id', value: 1001 }
//
//    2. MEHRERE KARTEN (Alle erforderlich):
//     unlockCondition: { type: 'multiple_cards', value: [10, 11, 12] }
//
//    3. COIN-STAND (Aktueller Besitz):
//     unlockCondition: { type: 'coins_reached', value: 500000 }
//
//    4. QUEST ERLEDIGT:
//     unlockCondition: { type: 'quest_id', value: 'q_ali_collection' }
//
//    5. ADMIN / GEHEIM:
//     unlockCondition: { type: 'admin' }
// ═══════════════════════════════════════════════════════════

/* ── 1. DATABASE ────────────────────────────────────────── */

window.TITLES_DATABASE = [

  // ══════════════ COMMON ═══════════════════════════════════
  {
    id: 'coin_title_0',
    name: 'Bread Eater',
    rarity: 'Common',
    icon: '🍞',
    description: 'Just enough money for some low quality bread.',
    unlockCondition: { type: 'coins_reached', value: 10000 },
    unlockHint: 'Try saving up some cash.',
    boost: { luck: 1.0, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0 },
  },
  {
    id: 'collection_title_0',
    name: 'Cardboard Sniffer',
    rarity: 'Common',
    icon: '📦',
    description: 'You just love the smell of fresh cards in the morning.',
    unlockCondition: { type: 'collection_percent', value: 5 },
    unlockHint: 'Start your journey and scratch the surface.',
    boost: { luck: 1.0, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0 }
  },
  {
    id: 'fight_title_0',
    name: 'Sandbag',
    rarity: 'Common',
    icon: '🤕',
    description: 'Your main strategy is hitting the floor with your face.',
    unlockCondition: { type: 'fights_won', value: 10 },
    unlockHint: 'Survive your first few encounters, mostly by luck.',
    boost: { luck: 1.0, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0 }
  },
  {
    id: 'card_title_0-1',
    name: 'GSHW2',
    rarity: 'Common',
    icon: '🎮',
    description: 'Source engine not found. Please install the missing textures.',
    unlockCondition: { type: 'card_id', value: 18 },
    unlockHint: 'Find the sequel that was never meant to be.',
    boost: { luck: 1.0, coinMult: 1.02, packLuck: 0, shinyBoost: 1.0 }
  },

  // ══════════════ RARE ═══════════════════════════════════
  {
    id: 'coin_title_1',
    name: 'Merchant',
    rarity: 'Rare',
    icon: '📦',
    description: 'U got some money and try to do some shady tiktok business',
    unlockCondition: { type: 'coins_reached', value: 100000, },
    unlockHint: 'Lets see if you can save up for ur business.',
    boost: { luck: 1.0, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0}
  },
  {
    id: 'collection_title_1',
    name: 'East Blue Rookie',
    rarity: 'Rare',
    icon: '⛵',
    description: 'You think you are big in the East Blue, but the Grand Line will eat you alive.',
    unlockCondition: { type: 'collection_percent', value: 15 },
    unlockHint: 'Set sail and gather your first few crew members.',
    boost: { luck: 1.02, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0 }
  },
  {
    id: 'fight_title_1',
    name: 'The Greatest',
    rarity: 'Rare',
    icon: '🦋',
    description: 'Float like a butterfly, sting like a bee. Your hands can’t hit what your eyes can’t see.',
    unlockCondition: { type: 'fights_won', value: 75 },
    unlockHint: 'Dance in the ring like a legendary heavyweight.',
    boost: { luck: 1.05, coinMult: 1.1, packLuck: 0, shinyBoost: 1.0 }
  },
  {
    id: 'multi_cards_title_1-1',
    name: 'Mini Men',
    rarity: 'Rare',
    icon: '🤏',
    description: 'He is the one who knocks.',
    unlockCondition: { type: 'multiple_cards', value: [7,9,13,202,204,208,210,211,401,402,405,601,603,605,606,901,903,904,905,907,908]},
    unlockHint: 'Unlock all the Mini Men cards.',
    boost: { luck: 1.05, coinMult: 1.15, packLuck: 0, shinyBoost: 1.05 }
  },
  {
    id: 'multi_cards_title_essbar',
    name: 'Essbar',
    rarity: 'Rare',
    icon: '🍴',
    description: 'A forbidden snack or a gourmet delight? Only the bravest souls dare to take a bite.',
    unlockCondition: { type: 'multiple_cards', value: [6, 207] },
    unlockHint: 'Legends have it he is edible... so go forth and find him.',
    boost: { luck: 1.05, coinMult: 1.1, packLuck: 0, shinyBoost: 1.0 }
  },

  // ══════════════ Epic ═══════════════════════════════════
  {
    id: 'coin_title_2',
    name: 'Tax Evader',
    rarity: 'Epic',
    icon: '🤫',
    description: 'The IRS wants to know your location.',
    unlockCondition: { type: 'coins_reached', value: 500000, },
    unlockHint: 'Hide a massive amount of wealth from the government.',
    boost: { luck: 1.0, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0}
  },
  {
    id: 'collection_title_2',
    name: 'Average Enjoyer',
    rarity: 'Epic',
    icon: '🗿',
    description: 'Weakest card collector vs. Average Enjoyer.',
    unlockCondition: { type: 'collection_percent', value: 35 },
    unlockHint: 'Become the Chad of collecting.',
    boost: { luck: 1.05, coinMult: 1.05, packLuck: 0.02, shinyBoost: 1.0 }
  },
  {
    id: 'fight_title_2',
    name: 'Hunter of Pirates',
    rarity: 'Epic',
    icon: '⚔️',
    description: 'Nothing happened. Only pure discipline and three-sword style.',
    unlockCondition: { type: 'fights_won', value: 250 },
    unlockHint: 'Walk the path of the swordsman and never lose your way.',
    boost: { luck: 1.1, coinMult: 1.15, packLuck: 0.02, shinyBoost: 1.1 }
  },
  {
    id: 'card_title_2-1',
    name: 'Apfeltaschen Pirat',
    rarity: 'Epic',
    icon: '🏴‍☠️',
    description: 'The terror of the bakery aisle. Arrr! Hands off my pastry, landlubber!',
    unlockCondition: { type: 'card_id', value: 212 },
    unlockHint: 'Try to find the pirat of Lidl.',
    boost: { luck: 1.1, coinMult: 1.2, packLuck: 0.05, shinyBoost: 1.05 }
  },

  // ══════════════ Mythical ═══════════════════════════════════
  {
    id: 'coin_title_3',
    name: 'OF Millionaire',
    rarity: 'Mythical',
    icon: '💙',
    description: 'You found a very specific way to fund your card addiction.',
    unlockCondition: { type: 'coins_reached', value: 1000000 },
    unlockHint: 'Find a "modern" and controversial way to get rich.',
    boost: { luck: 1.05, coinMult: 1.25, packLuck: 1.0, shinyBoost: 1.0 }
  },
  {
    id: 'collection_title_3',
    name: 'Library of Alexandria',
    rarity: 'Mythical',
    icon: '🏛️',
    description: 'You possess knowledge and cards that others only dream of.',
    unlockCondition: { type: 'collection_percent', value: 50 },
    unlockHint: 'Halfway to becoming the ultimate keeper of history.',
    boost: { luck: 1.1, coinMult: 1.1, packLuck: 0.05, shinyBoost: 1.05 }
  },
  {
    id: 'fight_title_3',
    name: 'Sorcerer Killer',
    rarity: 'Mythical',
    icon: '🔫',
    description: 'No cursed energy? No problem. You are the peak of physical human evolution.',
    unlockCondition: { type: 'fights_won', value: 750 },
    unlockHint: 'Defeat those with "special" gifts using nothing but pure strength.',
    boost: { luck: 1.2, coinMult: 1.2, packLuck: 0.05, shinyBoost: 1.15 }
  },

  // ══════════════ Legendary ═══════════════════════════════════
  {
    id: 'coin_title_4',
    name: 'Speedwagon Foundation',
    rarity: 'Legendary',
    icon: '🎩',
    description: 'You are now wealthy enough to fund global expeditions and bizarre adventures.',
    unlockCondition: { type: 'coins_reached', value: 10000000 },
    unlockHint: 'Become a legendary benefactor for a certain bizarre family.',
    boost: { luck: 1.15, coinMult: 1.4, packLuck: 0.1, shinyBoost: 1.1 }
  },
  {
    id: 'collection_title_4',
    name: 'Gotta Catch \'Em All',
    rarity: 'Legendary',
    icon: '🔴',
    description: 'A famous professor would be very proud of your progress.',
    unlockCondition: { type: 'collection_percent', value: 75 },
    unlockHint: 'Reach a percentage that only true masters achieve.',
    boost: { luck: 1.2, coinMult: 1.15, packLuck: 0.1, shinyBoost: 1.1 }
  },
  {
    id: 'fight_title_4',
    name: 'Conquerors Haki',
    rarity: 'Legendary',
    icon: '👁️',
    description: 'Your mere presence is enough to knock out the weak.',
    unlockCondition: { type: 'fights_won', value: 2000 },
    unlockHint: 'Assert your dominance until the world bows down.',
    boost: { luck: 1.3, coinMult: 1.4, packLuck: 0.1, shinyBoost: 1.25 }
  },
  {
    id: 'multi_cards_title_4-1',
    name: 'King of the Garden Gnomes',
    rarity: 'Legendary',
    icon: '🧨', 
    description: 'Small stature, infinite rage. She doesn’t need height when she can just take your kneecaps.',
    unlockCondition: { type: 'multiple_cards', value: [607, 608, 757] },
    unlockHint: 'The smallest person in the room is usually the one you should fear the most.',
    boost: { luck: 1.2, coinMult: 1.35, packLuck: 0.1, shinyBoost: 1.25 }
  },

  // ══════════════ SSSR ═══════════════════════════════════
  {
    id: 'coin_title_5',
    name: 'Nami 2.0',
    rarity: 'SSSR',
    icon: '🍊',
    description: 'You surpassed the legend. Now you are the one making the deals.',
    unlockCondition: { type: 'coins_reached', value: 50000000 },
    unlockHint: 'Become a better version of a legendary greedy navigator.',
    boost: { luck: 1.3, coinMult: 1.7, packLuck: 0.2, shinyBoost: 1.25 }
  },
  {
    id: 'collection_title_5',
    name: 'Final Boss of Virginity',
    rarity: 'SSSR',
    icon: '⚔️',
    description: 'Relationship? Never heard of that expansion pack. Is it rare?',
    unlockCondition: { type: 'collection_percent', value: 95 },
    unlockHint: 'Sacrifice your entire social life for a virtual album.',
    boost: { luck: 1.4, coinMult: 1.3, packLuck: 0.25, shinyBoost: 1.3 }
  },
  {
    id: 'fight_title_5',
    name: 'Heavenly Restricted',
    rarity: 'SSSR',
    icon: '⛓️',
    description: 'You traded everything for absolute power. Now you are the ultimate predator.',
    unlockCondition: { type: 'fights_won', value: 5000 },
    unlockHint: 'Break the chains of fate through thousands of victories.',
    boost: { luck: 1.5, coinMult: 1.7, packLuck: 0.25, shinyBoost: 1.5 }
  },
  {
    id: 'multi_cards_title_5-1',
    name: 'The Invisible Chill Guy',
    rarity: 'SSSR',
    icon: '🌫️',
    description: 'He is there, sitting in the corner of reality, blending in perfectly. You won’t notice him until he speaks.',
    unlockCondition: { type: 'multiple_cards', value: [1, 15, 755] },
    unlockHint: 'Find the one who is masterfully blending into the background.',
    boost: { luck: 2.2, coinMult: 1.8, packLuck: 0.3, shinyBoost: 1.7 }
  },
  {
    id: 'quest_title_5',
    name: 'The Man who owns the Monseur Mafia',
    rarity: 'SSSR',
    icon: '🍷',
    description: 'He doesn’t ask for respect. He commands it. The entire Monseur syndicate answers only to him.',
    unlockCondition: { type: 'quest_id', value: 'q_monseur_collection' },
    unlockHint: 'United the families, paid the price in blood, and took the throne of the Monseurs.',
    boost: { luck: 2.5, coinMult: 3.0, packLuck: 0.5, shinyBoost: 2.0 }
  },

  // ══════════════ HIDDEN ═══════════════════════════════════
  {
    id: 'coin_title_6',
    name: 'Mr. Monopoly',
    rarity: 'Hidden',
    icon: '🧐',
    description: 'You own the board, the hotels, and the bank. Do not pass GO, just collect your millions.',
    unlockCondition: { type: 'coins_reached', value: 250000000 },
    unlockHint: 'Buy every street and break the game until you are the only player left.',
    boost: { luck: 1.5, coinMult: 2.0, packLuck: 0.5, shinyBoost: 1.5 }
  },
  {
    id: 'collection_title_6',
    name: 'Touch Grass',
    rarity: 'Hidden',
    icon: '🌿',
    description: 'You finally did it. 100%. Now please, go outside for five minutes.',
    unlockCondition: { type: 'collection_percent', value: 100 },
    unlockHint: 'Complete the impossible and face your greatest enemy: Sunlight.',
    boost: { luck: 2.0, coinMult: 2.0, packLuck: 0.5, shinyBoost: 2.0 }
  },
  {
    id: 'fight_title_6',
    name: 'The Devil in Disguise',
    rarity: 'Hidden',
    icon: '🥀',
    description: 'A beautiful face, a silver tongue, and a heart made of Anti-Magic. You are the tragedy they never saw coming.',
    unlockCondition: { type: 'fights_won', value: 15000 },
    unlockHint: 'The loudest power often hides behind the quietest smile.',
    boost: { luck: 2.5, coinMult: 2.5, packLuck: 0.5, shinyBoost: 2.5 }
  },
  {
    id: 'card_title_6-1',
    name: 'Pure Aria',
    rarity: 'Hidden',
    icon: '👱‍♂️',
    description: 'The final boss of heritage. Blue eyes, golden hair, and 100% concentrated ragebait. An unstoppable force of nature.',
    unlockCondition: { type: 'card_id', value: 1101 },
    unlockHint: 'Find the one who embodies the ancient myth and the modern bait.',
    boost: { luck: 1.8, coinMult: 2.2, packLuck: 0.4, shinyBoost: 2.5 }
  },
  {
    id: 'admin_title',
    name: 'The Architect',
    rarity: 'Hidden',
    icon: '🏛️',
    description: 'You built this world. Every card, every pack, every rule — your design.',
    unlockCondition: { type: 'admin_only' },
    unlockHint: '???',
    boost: { luck: 2.0, coinMult: 100, packLuck: 100, shinyBoost: 99 },
  },

];

/* ── 2. STATE ───────────────────────────────────────────── */

const TITLE_LS_KEY = {
  EQUIPPED:   'cztcg5_equipped_title',
  COLOR:      'cztcg5_title_color',
  UNLOCKED:   'cztcg5_unlocked_titles',
  SHOWCASE:   'cztcg5_showcase',
};

// 6 preset glow colors (keys used as CSS class suffixes)
const TITLE_COLORS = [
  { key: 'purple', label: 'Purple',  hex: '#b49eff', glow: 'rgba(180,158,255,0.55)' },
  { key: 'gold',   label: 'Gold',    hex: '#eec060', glow: 'rgba(238,192,96,0.55)'  },
  { key: 'rose',   label: 'Rose',    hex: '#ff96bc', glow: 'rgba(255,150,188,0.55)' },
  { key: 'mint',   label: 'Mint',    hex: '#48eeb8', glow: 'rgba(72,238,184,0.55)'  },
  { key: 'sky',    label: 'Sky',     hex: '#7ec8f8', glow: 'rgba(126,200,248,0.55)' },
  { key: 'silver', label: 'Silver',  hex: '#d0cce8', glow: 'rgba(208,204,232,0.55)' },
];

const TITLE_RARITY_COLORS = {
  Common:    '#8aacbc',
  Rare:      '#6ab2ff',
  Epic:      '#ba7cff',
  Mythical:  '#ff6e9e',
  Legendary: '#eec060',
  SSSR:      '#48eeb8',
  Hidden:    '#ff96bc',
};

window.equippedTitleId    = null;
window.equippedTitleColor = 'purple';
window.unlockedTitles     = new Set();
window.showcaseCards      = [];   // array of up to 3 card ids

/* ── 3. INIT & PERSISTENCE ──────────────────────────────── */

function initTitleSystem() {
  try {
    const eq  = localStorage.getItem(TITLE_LS_KEY.EQUIPPED);
    const col = localStorage.getItem(TITLE_LS_KEY.COLOR);
    const ul  = JSON.parse(localStorage.getItem(TITLE_LS_KEY.UNLOCKED) || '[]');
    const sc  = JSON.parse(localStorage.getItem(TITLE_LS_KEY.SHOWCASE) || '[]');

    window.equippedTitleId    = eq || null;
    window.equippedTitleColor = col || 'purple';
    window.unlockedTitles     = new Set(ul);
    window.showcaseCards      = sc.slice(0, 3);
  } catch(e) {
    window.equippedTitleId    = null;
    window.equippedTitleColor = 'purple';
    window.unlockedTitles     = new Set();
    window.showcaseCards      = [];
  }
  checkAndUnlockTitles();
}

function saveTitleData() {
  localStorage.setItem(TITLE_LS_KEY.EQUIPPED,  window.equippedTitleId    || '');
  localStorage.setItem(TITLE_LS_KEY.COLOR,     window.equippedTitleColor || 'purple');
  localStorage.setItem(TITLE_LS_KEY.UNLOCKED,  JSON.stringify([...window.unlockedTitles]));
  localStorage.setItem(TITLE_LS_KEY.SHOWCASE,  JSON.stringify(window.showcaseCards));
  _syncTitleToFirebase();
}

async function _syncTitleToFirebase() {
  if (!window.fbUser || !window.fbDb || !window.fbFuncs) return;
  try {
    const { doc, setDoc, serverTimestamp } = window.fbFuncs;
    const col        = (typeof collection  !== 'undefined') ? collection  : [];
    const packs      = (typeof packsOpened !== 'undefined') ? packsOpened : 0;
    const fWon       = (typeof fightsWon   !== 'undefined') ? fightsWon   : 0;
    const fPlayed    = (typeof fightsPlayed!== 'undefined') ? fightsPlayed: 0;
    const netWorth   = col.reduce((s,c) => s + (c.sellValue||0)*c.count, 0);
    const uniqueCards= col.length;
    const shinyCount = col.filter(c=>c.isShiny).reduce((s,c)=>s+c.count,0);
    const sssrCount  = col.filter(c=>c.rarity==='SSSR').reduce((s,c)=>s+c.count,0);

    const uname = (typeof username !== 'undefined' ? username : 'Traveler');
    const profileData = {
      username:           uname,
      equippedTitleId:    window.equippedTitleId,
      equippedTitleColor: window.equippedTitleColor,
      unlockedTitles:     [...window.unlockedTitles],
      showcaseCards:      window.showcaseCards,
      stats: { uniqueCards, netWorth, packsOpened: packs, fightsWon: fWon, fightsPlayed: fPlayed, shinyCount, sssrCount },
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(window.fbDb, 'profiles', uname), profileData, { merge: true });
  } catch(e) {
    console.warn('[Titles] Firebase sync failed:', e.message);
  }
}

/* Load title state from a cloud data object (called from loadFromCloud) */
function loadTitleDataFromCloud(d) {
  if (d.equippedTitleId    != null) window.equippedTitleId    = d.equippedTitleId;
  if (d.equippedTitleColor != null) window.equippedTitleColor = d.equippedTitleColor;
  if (d.unlockedTitles)            window.unlockedTitles     = new Set(d.unlockedTitles);
  if (d.showcaseCards)             window.showcaseCards       = d.showcaseCards.slice(0, 3);
  localStorage.setItem(TITLE_LS_KEY.EQUIPPED, window.equippedTitleId || '');
  localStorage.setItem(TITLE_LS_KEY.COLOR,    window.equippedTitleColor);
  localStorage.setItem(TITLE_LS_KEY.UNLOCKED, JSON.stringify([...window.unlockedTitles]));
  localStorage.setItem(TITLE_LS_KEY.SHOWCASE, JSON.stringify(window.showcaseCards));
  // Re-sync mit aktuellen Stats (setTimeout = Collection ist bereits geladen)
  setTimeout(() => _syncTitleToFirebase(), 500);
}

/* ── 4. BOOST ENGINE ────────────────────────────────────── */

/**
 * Returns the active boost from the currently equipped title.
 * Shape: { luck: Number, coinMult: Number, packLuck: Number, shinyBoost: Number }
 */
function getActiveTitleBoost() {
  const NONE = { luck: 1.0, coinMult: 1.0, packLuck: 0, shinyBoost: 1.0 };
  if (!window.equippedTitleId) return NONE;
  const title = window.TITLES_DATABASE.find(t => t.id === window.equippedTitleId);
  if (!title || !window.unlockedTitles.has(title.id)) return NONE;
  return { ...NONE, ...title.boost };
}

/* ── 5. UNLOCK CHECKER ──────────────────────────────────── */

/**
 * Scans all titles and unlocks any whose condition is now met.
 * Call this after: loadData, opening a pack, claiming a quest reward.
 */
function checkAndUnlockTitles() {
  const col      = (typeof collection !== 'undefined') ? collection : [];
  const packs    = (typeof packsOpened !== 'undefined') ? packsOpened : 0;
  const claimed  = (typeof questClaimed !== 'undefined') ? questClaimed : new Set();
  const isAdmin  = (typeof isUserAdmin === 'function') ? isUserAdmin() : false;
  let   newUnlock = false;

  window.TITLES_DATABASE.forEach(title => {
    if (window.unlockedTitles.has(title.id)) return;
    const cond = title.unlockCondition;
    let met = false;

    if (cond.type === 'packs_opened') {
      met = packs >= cond.count;
    } else if (cond.type === 'collect_rarity') {
      const count = col.filter(c => c.rarity === cond.rarity && !c.isShiny).length;
      met = count >= cond.count;
    } else if (cond.type === 'collect_rarity_shiny') {
      met = col.some(c => c.isShiny);
    } else if (cond.type === 'quests_completed') {
      met = claimed.size >= cond.count;
    } else if (cond.type === 'quest' || cond.type === 'quest_id') {
      // 'quest_id' + value   ODER  'quest' + questId
      const qid = cond.questId ?? cond.value;
      if (claimed.has(qid)) {
        met = true;
      } else {
        const q = (window.QUESTS_DATABASE || []).find(x => x.id === qid);
        if (q && q.type === 'collect_cards') {
          met = (q.requiredCardIds || []).every(
            id => col.some(c => c.id === id && c.count > 0)
          );
        } else if (q && q.type === 'open_packs') {
          met = packs >= (q.requiredCount || 0);
        } else if (q && q.type === 'collect_rarity') {
          const rarCount = col.filter(c => c.rarity === q.rarity && !c.isShiny).length;
          met = rarCount >= (q.requiredCount || 0);
        }
      }
    } else if (cond.type === 'admin_only') {
      met = isAdmin;
    } else if (cond.type === 'card_owned' || cond.type === 'card_id') {
      // 'card_id' + value   ODER  'card_owned' + cardId
      const id = cond.cardId ?? cond.value;
      met = col.some(c => c.id === id);
    } else if (cond.type === 'coins') {
      const currentCoins = (typeof coins !== 'undefined') ? coins : 0;
      met = currentCoins >= cond.amount;
    } else if (cond.type === 'collect_cards' || cond.type === 'multiple_cards') {
      // 'multiple_cards' + value:[...]   ODER  'collect_cards' + cardIds:[...]
      const ids = cond.cardIds ?? cond.value ?? [];
      met = ids.every(id => col.some(c => c.id === id));
    } else if (cond.type === 'code_granted') {
      met = false;

    // ── NEU: Sammlung % ───────────────────────────────────────
    } else if (cond.type === 'collection_percent') {
      // Prozent der einzigartigen Nicht-Shiny-Karten aus CARD_DATABASE, die der User besitzt
      const totalUnique = (typeof CARD_DATABASE !== 'undefined')
        ? CARD_DATABASE.filter(c => !c.isShiny).length
        : 0;
      const ownedUnique = col.filter(c => !c.isShiny).length;
      const percent = totalUnique > 0 ? (ownedUnique / totalUnique) * 100 : 0;
      met = percent >= cond.value;

    // ── NEU: Anzahl einzigartiger Karten (ohne Dupes) ─────────
    } else if (cond.type === 'unique_cards') {
      // col.length = Anzahl einzigartiger Einträge (jede Karte nur 1× gezählt, egal count)
      const uniqueOwned = col.filter(c => !c.isShiny).length;
      met = uniqueOwned >= cond.value;

    // ── NEU: Gewonnene Kämpfe ─────────────────────────────────
    } else if (cond.type === 'fights_won') {
      const won = (typeof fightsWon !== 'undefined') ? fightsWon : 0;
      met = won >= cond.value;

    // ── FIX: coins_reached (alias für coins, DB nutzt diesen Typ) ─
    } else if (cond.type === 'coins_reached') {
      const currentCoins = (typeof coins !== 'undefined') ? coins : 0;
      met = currentCoins >= cond.value;
    }

    if (met) {
      window.unlockedTitles.add(title.id);
      newUnlock = true;
      // Popup notification
      setTimeout(() => {
        if (typeof toast === 'function')
          toast(`🏷️ New Title Unlocked: "${title.name}"!`, true);
      }, 400);
    }
  });

  if (newUnlock) saveTitleData();
}

/* ── 6. EQUIP & COLOR ───────────────────────────────────── */

function equipTitle(titleId) {
  if (!window.unlockedTitles.has(titleId)) {
    if (typeof toast === 'function') toast('🔒 Title not unlocked yet!');
    return;
  }
  window.equippedTitleId = titleId;
  saveTitleData();
  renderTitlesPanel();
  _applyEquippedTitleToUI();
  if (typeof toast === 'function') {
    const t = window.TITLES_DATABASE.find(t => t.id === titleId);
    toast(`🏷️ Equipped: ${t?.icon || ''} ${t?.name || titleId}`);
  }
}

function unequipTitle() {
  window.equippedTitleId = null;
  saveTitleData();
  renderTitlesPanel();
  _applyEquippedTitleToUI();
  if (typeof toast === 'function') toast('🏷️ Title removed.');
}

function setTitleColor(colorKey) {
  window.equippedTitleColor = colorKey;
  saveTitleData();
  _applyEquippedTitleToUI();
  // Re-render color pickers to update active state
  document.querySelectorAll('.title-color-dot').forEach(el => {
    el.classList.toggle('active', el.dataset.color === colorKey);
  });
}

function _applyEquippedTitleToUI() {
  // Update title badge in profile header
  const badge = document.getElementById('profile-title-badge');
  if (!badge) return;
  const title = window.equippedTitleId
    ? window.TITLES_DATABASE.find(t => t.id === window.equippedTitleId)
    : null;
  if (title && window.unlockedTitles.has(title.id)) {
    const col = TITLE_COLORS.find(c => c.key === window.equippedTitleColor) || TITLE_COLORS[0];
    badge.textContent  = `${title.icon} ${title.name}`;
    badge.style.color  = col.hex;
    badge.style.textShadow = `0 0 10px ${col.glow}, 0 0 20px ${col.glow}`;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
    badge.textContent   = '';
  }
  // Also update header username-area boost readout
  _updateBoostReadout();
}

function _updateBoostReadout() {
  const readout = document.getElementById('title-boost-readout');
  if (!readout) return;
  const boost = getActiveTitleBoost();
  const parts = [];
  if (boost.luck    > 1.0)  parts.push(`🍀 ×${boost.luck.toFixed(2)} Luck`);
  if (boost.coinMult > 1.0) parts.push(`🪙 ×${boost.coinMult.toFixed(2)} Coins`);
  if (boost.packLuck > 0)   parts.push(`📦 +${boost.packLuck.toFixed(1)}% Pack Luck`);
  if (boost.shinyBoost > 1.0) parts.push(`✨ ×${boost.shinyBoost.toFixed(2)} Shiny`);
  readout.textContent = parts.length ? parts.join('  ·  ') : 'No active boost';
  readout.style.display = parts.length ? '' : 'none';
}

/* ── 7. SHOWCASE ────────────────────────────────────────── */

function toggleShowcaseCard(cardId) {
  const numId = Number(cardId);
  const idx   = window.showcaseCards.indexOf(numId);
  if (idx >= 0) {
    window.showcaseCards.splice(idx, 1);
  } else {
    if (window.showcaseCards.length >= 3) {
      if (typeof toast === 'function') toast('⚠️ Max 3 showcase cards!');
      return;
    }
    window.showcaseCards.push(numId);
  }
  saveTitleData();
  renderShowcaseEditor();
  // Also refresh the visual indicator in collection if open
  document.querySelectorAll('.sc-marker').forEach(el => {
    const cid = Number(el.dataset.cardId);
    el.classList.toggle('active', window.showcaseCards.includes(cid));
  });
}

/* ── 8. RENDER: TITLES PANEL ────────────────────────────── */

function renderTitlesPanel() {
  const container = document.getElementById('titles-panel-body');
  if (!container) return;

  const equipped = window.equippedTitleId
    ? window.TITLES_DATABASE.find(t => t.id === window.equippedTitleId)
    : null;

  // Color picker row
  const colorPicker = TITLE_COLORS.map(c => `
    <button class="title-color-dot ${c.key === window.equippedTitleColor ? 'active' : ''}"
            data-color="${c.key}"
            onclick="setTitleColor('${c.key}')"
            title="${c.label}"
            style="background:${c.hex};box-shadow:0 0 0 0 ${c.glow}"></button>
  `).join('');

  // Equipped preview
  const eqSection = equipped ? (() => {
    const col = TITLE_COLORS.find(c => c.key === window.equippedTitleColor) || TITLE_COLORS[0];
    return `
      <div class="title-eq-preview">
        <span class="title-eq-icon">${equipped.icon}</span>
        <div class="title-eq-info">
          <div class="title-eq-name"
               style="color:${col.hex};text-shadow:0 0 10px ${col.glow}">
            ${equipped.name}
          </div>
          <div class="title-eq-rarity" style="color:${TITLE_RARITY_COLORS[equipped.rarity]||'#888'}">
            ${equipped.rarity}
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="unequipTitle()">✕ Remove</button>
      </div>
      <div class="title-boost-readout" id="title-boost-readout-inner"></div>
    `;
  })() : `<div class="title-eq-empty">No title equipped — pick one below</div>`;

  // Title list
  const ALL_RARITIES = ['Common','Rare','Epic','Mythical','Legendary','SSSR','Hidden'];
  const listHTML = ALL_RARITIES.map(rar => {
    const titles = window.TITLES_DATABASE.filter(t => t.rarity === rar);
    if (!titles.length) return '';
    return `
      <div class="titles-rarity-group">
        <div class="titles-rarity-hd" style="color:${TITLE_RARITY_COLORS[rar]}">
          ${rar}
        </div>
        ${titles.map(t => {
          const unlocked = window.unlockedTitles.has(t.id);
          const isEq     = window.equippedTitleId === t.id;
          const boostLine = Object.entries(t.boost)
            .filter(([k,v]) => v > 1 || (k === 'packLuck' && v > 0))
            .map(([k,v]) => {
              if (k === 'luck')       return `🍀 ×${v.toFixed(2)}`;
              if (k === 'coinMult')   return `🪙 ×${v.toFixed(2)}`;
              if (k === 'packLuck')   return `📦 +${v.toFixed(1)}%`;
              if (k === 'shinyBoost') return `✨ ×${v.toFixed(2)}`;
              return '';
            }).filter(Boolean).join(' · ');
          return `
            <div class="title-card ${unlocked?'unlocked':''} ${isEq?'equipped':''}">
              <div class="title-card-icon">${t.icon}</div>
              <div class="title-card-body">
                <div class="title-card-name" style="color:${unlocked ? TITLE_RARITY_COLORS[t.rarity] : 'var(--subtext)'}">
                  ${unlocked ? t.name : '???'}
                </div>
                <div class="title-card-hint">
                  ${unlocked ? (boostLine || 'No stat boost') : t.unlockHint}
                </div>
              </div>
              <div class="title-card-action">
                ${unlocked
                  ? (isEq
                      ? `<span class="title-badge-eq">Equipped</span>`
                      : `<button class="btn btn-ghost btn-sm" onclick="equipTitle('${t.id}')">Equip</button>`)
                  : `<span class="title-badge-lock">🔒</span>`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Equipped preview -->
    <div class="titles-section-label">🏷️ Equipped Title</div>
    ${eqSection}

    <!-- Glow color picker -->
    <div class="titles-section-label" style="margin-top:1rem">🎨 Glow Color</div>
    <div class="title-color-row">${colorPicker}</div>

    <!-- All titles -->
    <div class="titles-section-label" style="margin-top:1.2rem">
      📚 All Titles
      <span class="titles-count">${window.unlockedTitles.size} / ${window.TITLES_DATABASE.length}</span>
    </div>
    <div class="titles-list">${listHTML}</div>
  `;

  // update boost readout inside panel
  const inner = document.getElementById('title-boost-readout-inner');
  if (inner) {
    const boost = getActiveTitleBoost();
    const parts = [];
    if (boost.luck > 1.0)      parts.push(`🍀 ×${boost.luck.toFixed(2)} Luck`);
    if (boost.coinMult > 1.0)  parts.push(`🪙 ×${boost.coinMult.toFixed(2)} Coins`);
    if (boost.packLuck > 0)    parts.push(`📦 +${boost.packLuck.toFixed(1)}% Pack Luck`);
    if (boost.shinyBoost > 1.0) parts.push(`✨ ×${boost.shinyBoost.toFixed(2)} Shiny`);
    inner.textContent = parts.length ? '⚡ Active: ' + parts.join('  ·  ') : '';
    inner.style.display = parts.length ? '' : 'none';
  }
}

/* ── 9. RENDER: SHOWCASE EDITOR ─────────────────────────── */

function renderShowcaseEditor() {
  const container = document.getElementById('showcase-editor-body');
  if (!container) return;

  const col = (typeof collection !== 'undefined') ? collection : [];

  // Current showcase slots
  const slots = [0, 1, 2].map(i => {
    const cardId = window.showcaseCards[i];
    const card   = cardId != null ? col.find(c => c.id === cardId) : null;
    if (card) {
      const c = TITLE_RARITY_COLORS[card.rarity] || '#888';
      return `
        <div class="showcase-slot filled" style="border-color:${c}40">
          <div class="showcase-slot-img" style="background:${c}12">
            ${card.imageUrl
              ? `<img src="${card.imageUrl}" alt="${card.name}" loading="lazy">`
              : `<span style="font-size:1.4rem">${card.isShiny ? '✨' : '🎴'}</span>`}
          </div>
          <div class="showcase-slot-name" style="color:${c}">${card.name}</div>
          <button class="showcase-slot-remove" onclick="toggleShowcaseCard(${card.id})">✕</button>
        </div>`;
    }
    return `<div class="showcase-slot empty"><span>＋</span><div class="showcase-slot-label">Pick a card</div></div>`;
  }).join('');

  // Pickable cards (from collection, sorted rarity desc)
  const RARITY_SCORE = { Hidden:6, SSSR:5, Legendary:4, Mythical:3, Epic:2, Rare:1, Common:0 };
  const sorted = [...col].sort((a,b) => (RARITY_SCORE[b.rarity]||0) - (RARITY_SCORE[a.rarity]||0));
  const pickList = sorted.map(card => {
    const c       = TITLE_RARITY_COLORS[card.rarity] || '#888';
    const inShow  = window.showcaseCards.includes(card.id);
    return `
      <button class="showcase-pick-item ${inShow ? 'selected' : ''}"
              onclick="toggleShowcaseCard(${card.id})"
              style="border-color:${inShow ? c : 'transparent'}">
        <div class="showcase-pick-img" style="background:${c}12">
          ${card.imageUrl
            ? `<img src="${card.imageUrl}" alt="${card.name}" loading="lazy">`
            : `<span>${card.isShiny ? '✨' : '🎴'}</span>`}
        </div>
        <div class="showcase-pick-name">${card.name}</div>
        <div class="showcase-pick-rar" style="color:${c}">${card.rarity}</div>
        ${inShow ? `<div class="showcase-pick-check">✓</div>` : ''}
      </button>`;
  }).join('');

  container.innerHTML = `
    <div class="titles-section-label">🖼️ Your Showcase (3 slots)</div>
    <div class="showcase-slots-row">${slots}</div>
    <div class="titles-section-label" style="margin-top:1rem">Pick from Collection</div>
    <div class="showcase-pick-grid">${pickList || '<p style="color:var(--subtext);font-size:0.8rem;padding:0.5rem 0">No cards in collection yet.</p>'}</div>
  `;
}

/* ── 10. PLAYER SEARCH & PUBLIC PROFILE MODAL ───────────── */

async function searchPlayerProfile() {
  const input = document.getElementById('player-search-input');
  if (!input) return;
  const query = input.value.trim();
  if (!query) { if (typeof toast === 'function') toast('⚠️ Enter a username'); return; }
  if (!window.fbDb || !window.fbFuncs) { if (typeof toast === 'function') toast('❌ Not logged in'); return; }

  const btn = document.getElementById('player-search-btn');
  if (btn) btn.disabled = true;

  try {
    const { doc, getDoc } = window.fbFuncs;
    // Try profiles collection first (stores public data by username)
    const snap = await getDoc(doc(window.fbDb, 'profiles', query));
    if (!snap.exists()) {
      if (typeof toast === 'function') toast(`⚠️ Player "${query}" not found.`);
      return;
    }
    openPlayerProfileModal(snap.data());
  } catch(e) {
    console.error(e);
    if (typeof toast === 'function') toast('❌ Search failed: ' + e.message);
  } finally {
    if (btn) btn.disabled = false;
  }
}

function openPlayerProfileModal(profileData) {
  const modal = document.getElementById('player-profile-modal');
  if (!modal) return;

  const title    = profileData.equippedTitleId
    ? window.TITLES_DATABASE.find(t => t.id === profileData.equippedTitleId)
    : null;
  const colorKey = profileData.equippedTitleColor || 'purple';
  const col      = TITLE_COLORS.find(c => c.key === colorKey) || TITLE_COLORS[0];

  const titleHTML = title ? `
    <div class="pp-title" style="color:${col.hex};text-shadow:0 0 12px ${col.glow},0 0 24px ${col.glow}">
      ${title.icon} ${title.name}
    </div>` : '';

  // Showcase cards — mit Shiny-Effekt
  const showcaseIds = profileData.showcaseCards || [];
  const showcaseHTML = showcaseIds.length
    ? showcaseIds.map(id => {
        const card = (typeof CARD_DATABASE !== 'undefined') ? CARD_DATABASE.find(c => c.id === id) : null;
        if (!card) return `<div class="pp-showcase-card empty">?</div>`;
        const rc = TITLE_RARITY_COLORS[card.rarity] || '#888';
        const shinyClass = card.isShiny ? 'pp-sc-shiny' : '';
        return `
          <div class="pp-showcase-card ${shinyClass}" style="border-color:${rc}60">
            <div class="pp-showcase-img" style="background:${rc}12;position:relative;overflow:hidden;">
              ${card.isShiny ? `<div class="pp-shiny-shimmer"></div>` : ''}
              ${card.imageUrl
                ? `<img src="${card.imageUrl}" alt="${card.name}" loading="lazy" style="position:relative;z-index:1">`
                : `<span style="font-size:1.6rem;position:relative;z-index:1">${card.isShiny ? '✨' : '🎴'}</span>`}
            </div>
            <div class="pp-showcase-name" style="color:${rc}">${card.name}</div>
            <div class="pp-showcase-rar">${card.rarity}${card.isShiny ? ' ✦' : ''}</div>
          </div>`;
      }).join('')
    : `<div style="color:var(--subtext);font-size:0.8rem;text-align:center;width:100%;padding:0.5rem">No showcase set</div>`;

  // Stats
  const s = profileData.stats || {};
  const fmt = n => (n||0).toLocaleString();
  const statsHTML = `
    <div class="pp-stats-grid">
      <div class="pp-stat"><div class="pp-stat-val">${fmt(s.uniqueCards)}</div><div class="pp-stat-lbl">🎴 Cards</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:var(--gold)">🪙 ${fmt(s.netWorth)}</div><div class="pp-stat-lbl">Net Worth</div></div>
      <div class="pp-stat"><div class="pp-stat-val">${fmt(s.packsOpened)}</div><div class="pp-stat-lbl">📦 Packs</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:var(--mint)">${fmt(s.sssrCount)}</div><div class="pp-stat-lbl">🌟 SSSR</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:var(--rose)">${fmt(s.fightsWon)}<span style="font-size:0.6rem;color:var(--subtext)">/${fmt(s.fightsPlayed)}</span></div><div class="pp-stat-lbl">⚔️ Fights Won</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:var(--gold)">${fmt(s.shinyCount)}</div><div class="pp-stat-lbl">✨ Shinys</div></div>
    </div>`;

  const unlockedCount = (profileData.unlockedTitles || []).length;

  document.getElementById('pp-username').textContent    = profileData.username || 'Unknown';
  document.getElementById('pp-title-row').innerHTML     = titleHTML;
  document.getElementById('pp-title-count').textContent = `${unlockedCount} title${unlockedCount !== 1 ? 's' : ''} unlocked`;
  document.getElementById('pp-showcase-row').innerHTML  = showcaseHTML;
  document.getElementById('pp-stats-section').innerHTML = statsHTML;

  if (typeof openModal === 'function') openModal('player-profile-modal');
}

/* ── 11. ADMIN HELPERS ──────────────────────────────────── */

function adminUnlockAllTitles() {
  if (typeof isUserAdmin !== 'function' || !isUserAdmin()) return;
  window.TITLES_DATABASE.forEach(t => window.unlockedTitles.add(t.id));
  saveTitleData();
  renderTitlesPanel();
  if (typeof toast === 'function') toast(`👑 All ${window.TITLES_DATABASE.length} titles unlocked!`);
}

/**
 * Assign a specific title to another user via their public profile.
 * This writes to profiles/{username} only — the user sees it on next login.
 */
async function adminGrantTitle(targetUsername, titleId) {
  if (typeof isUserAdmin !== 'function' || !isUserAdmin()) return;
  if (!window.fbDb || !window.fbFuncs) { if (typeof toast === 'function') toast('❌ Firebase not ready'); return; }
  try {
    const { doc, getDoc, setDoc, arrayUnion } = window.fbFuncs;
    const ref  = doc(window.fbDb, 'profiles', targetUsername);
    const snap = await getDoc(ref);
    if (!snap.exists()) { if (typeof toast === 'function') toast(`⚠️ Profile "${targetUsername}" not found`); return; }
    await setDoc(ref, { unlockedTitles: arrayUnion(titleId) }, { merge: true });
    if (typeof toast === 'function') toast(`👑 Title "${titleId}" granted to ${targetUsername}!`, true);
  } catch(e) {
    if (typeof toast === 'function') toast('❌ ' + e.message);
  }
}

// Make admin functions globally available
window.adminUnlockAllTitles = adminUnlockAllTitles;
window.adminGrantTitle       = adminGrantTitle;
window.initTitleSystem       = initTitleSystem;
window.getActiveTitleBoost   = getActiveTitleBoost;
window.checkAndUnlockTitles  = checkAndUnlockTitles;
window.saveTitleData         = saveTitleData;
window.loadTitleDataFromCloud = loadTitleDataFromCloud;
window.renderTitlesPanel     = renderTitlesPanel;
window.renderShowcaseEditor  = renderShowcaseEditor;
window.searchPlayerProfile   = searchPlayerProfile;
window.openPlayerProfileModal = openPlayerProfileModal;
window.equipTitle            = equipTitle;
window.unequipTitle          = unequipTitle;
window.setTitleColor         = setTitleColor;
window.toggleShowcaseCard    = toggleShowcaseCard;
