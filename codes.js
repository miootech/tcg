// ═══════════════════════════════════════════════════════════
//  codes.js — Cozy TCG · Redeem Codes & Security
//  ───────────────────────────────────────────────────────────
//  Struktur:
//    SYSTEM_CODES         → Admin-Codes & Passwort-Hashes
//    ARCHIVE_CODES        → Ältere Event-/Aktionscodes (weiterhin gültig)
//    ACTIVE_SEASON_CODES  → Aktuell beworbene Saison-Codes
//    CASINO_CODES         → Casino-exklusiv: Chips, Packs, Titel
//
//  Merge: Alle Gruppen werden am Ende per Spread-Operator
//  in window.CODE_HASHES zusammengeführt.
//
//  ───────────────────────────────────────────────────────────
//  ABLAUF-SYSTEM (expires)
//  ───────────────────────────────────────────────────────────
//  Jeder Code besitzt ein `expires`-Feld:
//    expires: 0              → Läuft NIEMALS ab  (Standard / Default)
//    expires: 1780000000000  → Unix-Timestamp in Millisekunden (Date.now()-Format)
//
//  Beispiel für ein Datum:
//    new Date('2026-12-31T23:59:59').getTime()  →  1798761599000
//
//  Der Ablauf wird in index.html & casino.html geprüft, BEVOR
//  der Code als eingelöst markiert wird.
// ═══════════════════════════════════════════════════════════

/**
 * Code-Typen (Referenz):
 *  'hidden'        → Erste Karte mit Rarity 'Hidden'
 *  'id_reward'     → Spezifische Karte via cardId
 *  'godpack'       → Alle Legendary/SSSR Karten (nicht-shiny)
 *  'admin'         → Aktiviert den Admin-Modus
 *  'packs'         → Gibt Packs (und optional Coins)
 *  'title'         → Schaltet einen Titel frei
 *  'chips'         → Casino-Chips          (casino.html)
 *  'casino_pack'   → Casino-exklusives Pack (casino.html)
 *  'casino_title'  → Casino-Titel           (casino.html)
 *  (kein type)     → Nur coins / luck
 */


// ───────────────────────────────────────────────────────────
//  SYSTEM — Admin-Codes (streng geheim, niemals öffentlich)
// ───────────────────────────────────────────────────────────
const SYSTEM_CODES = {

  // "realadmin"
  "01761a3dc564d2a259d6f9e3bd2fb5d19739858e": {
    type:    "admin",
    expires: 0,
    msg:     "👑 Admin mode ON — no cooldowns, no costs.",
  },

};


// ───────────────────────────────────────────────────────────
//  ARCHIV — Ältere Event-/Aktionscodes
//  Weiterhin einlösbar, aber nicht mehr aktiv beworben.
//  → Abgelaufene Saison-Codes hier einsortieren.
// ───────────────────────────────────────────────────────────
const ARCHIVE_CODES = {

  // "rose" — Hidden-Card Event (März 2026)
  "7b7074fca36fc89fb3f1e3c46d74f6ffe2477a09": {
    type:    "hidden",
    expires: 0,
    msg:     "🌹 Hidden card added to collection!",
  },

  // "kingrali" — KingRali Godpack Event
  "21afa7da6832369bd557845af18d0ed2e327025e": {
    type:    "godpack",
    expires: 0,
    msg:     "👑 KingRali God Pack unlocked!",
  },

  // "21.03.2026" — Jubiläumskarte (cardId 6001)
  "58d1c366cfc9588f6fd529333dc0d0c8b419a4ce": {
    type:    "id_reward",
    cardId:  6001,
    expires: 0,
    msg:     "✨ Special Card added to collection!",
  },

  // "freeamo" — Shiny-Karte (cardId 5401)
  "e6352908707142f7aa0448ff242882d592ca817e": {
    type:    "id_reward",
    cardId:  5401,
    expires: 0,
    msg:     "✨ Shiny Card added to collection!",
  },

  // "samu" — Samu's Geschenk (750 Coins + 3 Packs)
  "7049145cbe7b51d122d95fc3b8ae2f7f7ca43ec1": {
    type:    "packs",
    coins:   750,
    packs: [
      { packKey: "starterBooster", count: 2 },
      { packKey: "onlyRare",       count: 1 },
    ],
    expires: 0,
    msg:     "🎁 Samu's Gift! +750 coins & 3 packs added!",
  },

  // "welcome2026" — Willkommens-Coin-Code
  "ca09e10726972578b98460d9b6b4e89d54486a0f": {
    coins:   500,
    expires: 0,
    msg:     "🎉 Welcome gift! +500 coins.",
  },

};


// ───────────────────────────────────────────────────────────
//  AKTIVE SAISON-CODES — Aktuell beworbene Codes
//  Abschnitt "Saison Mai 2026" ↓
//  → Neue Codes hier eintragen, abgelaufene ins ARCHIV verschieben.
// ───────────────────────────────────────────────────────────
const ACTIVE_SEASON_CODES = {

  // ── Version 2.0.1: Mai 2026 ────────────────────────────────────

  // "freepacks" — 5 Packs Startgeschenk
  "87ae53d280b7ee1dff7a16ebe8fe8a4a86367a55": {
    type:  "packs",
    packs: [
      { packKey: "onlyRare",  count: 2 },
      { packKey: "onlyEpic",  count: 1 },
      { packKey: "bulkPack",  count: 1 },
      { packKey: "speedPack", count: 1 },
    ],
    expires: 0,
    msg:     "🎁 5 Packs added to your inventory!",
  },

  // "goatadmin" — Admin Geschenk-Code (670 Coins + 4 Packs)
  "218c5c7f4dab6ae0a9914a292add4261d0cb7b3d": {
    type:  "packs",
    coins: 670,
    packs: [
      { packKey: "starterBooster", count: 1 },
      { packKey: "onlyRare",       count: 1 },
      { packKey: "bulkPack",       count: 1 },
      { packKey: "shinyPack",      count: 1 },
    ],
    expires: 0,
    msg:     "🎁 Admin's Gift! +670 coins & 4 packs added!",
  },

  // "diggawithn" — Ultimate Admin Gift (67.000 Coins + 7 Packs)
  "0337c9770aa30e7c33e91cfa92828d6b7b718a6a": {
    type:  "packs",
    coins: 67000,
    packs: [
      { packKey: "shinyPack",      count: 3 },
      { packKey: "godpack",        count: 1 },
      { packKey: "prismaticVault", count: 3 },
    ],
    expires: 0,
    msg:     "🎁 Ultimate Admin Gift! +67,000 coins & 7 packs added!",
  },

  // "freecoins" — 1.000 Coins
  "89a382df7d1987321fb34ce448eb4a06b4ee5d68": {
    coins:   1000,
    expires: 0,
    msg:     "✨ +1,000 coins!",
  },

  // "brokevictor" — Victor's Bailout (100.000 Coins)
  "944547fca5239c5211be0308debfb2f69a466365": {
    coins:   100000,
    expires: 0,
    msg:     "💸 Broke Victor's Bailout! +100,000 coins.",
  },

  // "luckboost" — +1% Glück permanent
  "d95bbef27f761a03fbfbcfefc53a5ae4ffd7698e": {
    luck:    1,
    expires: 0,
    msg:     "🍀 +1% luck applied!",
  },

  // "richrich" — 14.000 Coins
  "5b43a3793c7aa25c75ff70f1710cfab9ede0bc18": {
    coins:   14000,
    expires: 0,
    msg:     "💰 Jackpot! +14,000 coins.",
  },

  // ── Exklusive Titel ─────────────────────────────────────

  // "chosen" → title_chosen_one
  "3fe69382869530ce0a86f97d9955b14a70552f80": {
    type:    "title",
    titleId: "title_chosen_one",
    expires: 0,
    msg:     "🌟 Du bist The Chosen One — Exklusiver Titel freigeschaltet!",
  },

  // "insider" → title_insider
  "b3272311c05de421d1cc7c4f0e531ea6a63b8df5": {
    type:    "title",
    titleId: "title_insider",
    expires: 0,
    msg:     "🔐 Insider-Titel unlocked!",
  },

  // ── Version 2.3.2 ────────────────────────────────────

  // "biggestbird"
  "9eee67932cd4412377f7b9124cd63fd01731bd29": {
    type:    "packs",
    packs:   [{ packKey: "godpack", count: 5 }],
    coins:   50000,
    expires: 0,
    msg:     "🐦 Biggest Bird! +50,000 coins + 5 God Packs!",
  },

  // "freeamo2" — Shiny-Karte (cardId 5401) Version 2.3.2
  "42de40507ea951356bc761b9092c8259d4c3b08e": {
    type:    "id_reward",
    cardId:  5903,
    coins:   10000,
    expires: 0,
    msg:     "🎁 Shiny Card unlocked +10,000 coins!",
  },

};


// ───────────────────────────────────────────────────────────
//  CASINO-CODES — Werden ausschließlich in casino.html
//  verarbeitet (Chips, Casino-Packs, Casino-Titel).
//
//  Hinweis: casino.html liest window.CODE_HASHES und
//  wertet 'chips', 'casino_pack', 'casino_title' eigenständig
//  aus. Nicht-Casino-Codes werden dort abgelehnt.
// ───────────────────────────────────────────────────────────
const CASINO_CODES = {
  // ── Version 2.0.1: Mai 2026 ────────────────────────────────────
  // ── Chips ────────────────────────────────────────────────

  // "chipstart" — 500 Startchips für neue Casino-Spieler
  "87bd512d82b61a4f6cd7f1f6dc349170ad592dfa": {
    type:    "chips",
    chips:   500,
    expires: 0,
    msg:     "🎰 Welcome to the Casino! +500 chips.",
  },

  // "luckyhand" — 1.500 Chips
  "2ae6bb906557be91cee820a9a8210bd395130243": {
    type:    "chips",
    chips:   1500,
    expires: 0,
    msg:     "🃏 Lucky Hand! +1,500 chips.",
  },

  // "allin2026" — 3.000 Chips
  "dea27a0d2a5d275b4d9c92c506e26629c7368e48": {
    type:    "chips",
    chips:   3000,
    expires: 0,
    msg:     "💸 All In! +3,000 chips — don't blow it.",
  },

  // "casinoroyale" — 5.000 Chips + Casino Royale Pack
  "800a4e5b3ad929c70e8c24544cf72244295e1420": {
    type:       "chips",
    chips:      5000,
    casinoPack: "casinoRoyale",
    expires:    0,
    msg:        "🎴 Casino Royale! +5,000 chips & a Casino Royale Pack!",
  },

  // "jackpot777" — 10.000 Chips (der große Gewinn)
  "dac539ebdc959c55b91c70ac525c022614a18fc9": {
    type:    "chips",
    chips:   10000,
    expires: 0,
    msg:     "🏆 JACKPOT! +10,000 chips. The house weeps.",
  },

  // "housewins" — 2.000 Chips + Casino Starter Pack
  "ee878d46d14ead89403a4a7cacc41f7655577df5": {
    type:       "chips",
    chips:      2000,
    casinoPack: "casinoStarter",
    expires:    0,
    msg:        "🃏 The House always wins... but today you do too! +2,000 chips & a Casino Starter Pack!",
  },

  // ── Casino-Titel ─────────────────────────────────────────

  // "feltlife" → title_casino_felt_life
  "ca9e53a91f86e4f511d4207ca8bf2cd98b9454ee": {
    type:    "casino_title",
    titleId: "title_casino_felt_life",
    expires: 0,
    msg:     "🎰 Titel unlocked: Felt Life",
  },

  // "hakari" → title_casino_hakari
  "ce1f29813dc02a9d7b5d468d129b522edff378a9": {
      type:    "casino_title",
      titleId: "title_casino_hakari",
      expires: 0,
      msg:     "🎰 Ultimate Gambler title unlocked: Hakari!",
  },

  // ── Version 2.3.2 ────────────────────────────────────
  
  // "twopairs" — 2.000 Chips
  "1e024bbb077e929daafa98f242d4dba38936c9e7": {
    type:    "chips",
    chips:   2000,
    expires: 0,
    msg:     "✌️ TWO PAIRS! +2,000 chips. A solid start.",
  },

  // "triplethreat" — 4.000 Chips + 1x Starter
  "1dbf8a3fb5bc418b0087f68f21f53861e8f61901": {
    type:  "chips",
    chips: 4000,
    packs: [
      { packKey: "casinoStarter", count: 1 }
    ],
    expires: 0,
    msg:     "🎯 TRIPLE THREAT! +4,000 chips & 1x Casino Starter Pack!",
  },

  // "straightwin" — 7.000 Chips
  "97112ce044aa61c5e37b33d1ba2082c75d5c2d00": {
    type:    "chips",
    chips:   7000,
    expires: 0,
    msg:     "📏 STRAIGHT! +7,000 chips. Everything in line.",
  },

  // "flushpower" — 10.000 Chips + 1x Royale
  "a4e91e06e6a7ecc37dcaff35a942485a8b8beb6b": {
    type:  "chips",
    chips: 10000,
    packs: [
      { packKey: "casinoRoyale", count: 1 }
    ],
    expires: 0,
    msg:     "🌊 FLUSH POWER! +10,000 chips & 1x Casino Royale Pack!",
  },

  // "fullhouse" — 14.000 Chips + 1x Starter
  "023f1653afe3d7145a2efa03005104818ab85d88": {
    type:  "chips",
    chips: 14000,
    packs: [
      { packKey: "casinoStarter", count: 1 }
    ],
    expires: 0,
    msg:     "🏠 FULL HOUSE! +14,000 chips & 1x Casino Starter Pack!",
  },

  // "fourofakind" — 18.000 Chips + 1x Jackpot Vault
  "a521043f2ad082f30bfcf3eb3b3429ab5c0c2055": {
    type:  "chips",
    chips: 18000,
    packs: [
      { packKey: "jackpotVault", count: 1 }
    ],
    expires: 0,
    msg:     "🍀 FOUR OF A KIND! +18,000 chips & 1x Jackpot Vault!",
  },

  // "royalflush" — 25.000 Chips + 1x Royale
  "a0baaf7208e5b663d2a525268d342bf8b45e33b9": {
    type:  "chips",
    chips: 25000,
    packs: [
      { packKey: "casinoRoyale", count: 1 }
    ],
    expires: 0,
    msg:     "👑 ROYAL FLUSH! +25,000 chips & 1x Casino Royale Pack!",
  },
};

const THEMED_CODES = {
  // "monkeydluffy" → op_will_of_d
  "1d9816ab6bfba5baf93666c7553c36f460510f1d": {
    type:    "title",
    titleId: "op_will_of_d",
    expires: 0,
    msg:     "⭕ The Will of D. has been inherited!",
  },
};



// ═══════════════════════════════════════════════════════════
//  MERGE — Alle Gruppen in window.CODE_HASHES zusammenführen.
//  Die Reihenfolge bestimmt bei Hash-Kollisionen den Gewinner
//  (rechts gewinnt). In der Praxis sollte das nie vorkommen.
// ═══════════════════════════════════════════════════════════
window.CODE_HASHES = {
  ...SYSTEM_CODES,
  ...ARCHIVE_CODES,
  ...ACTIVE_SEASON_CODES,
  ...CASINO_CODES,
  ...THEMED_CODES,
};


// ───────────────────────────────────────────────────────────
//  HILFSFUNKTION — Ablauf-Prüfung
//  Wird von index.html und casino.html aufgerufen, bevor
//  ein Code verarbeitet wird.
//
//  Rückgabe: true  → Code ist gültig / läuft nicht ab
//            false → Code ist abgelaufen
// ───────────────────────────────────────────────────────────
window.isCodeExpired = function (reward) {
  if (!reward || !reward.expires || reward.expires === 0) return false;
  return Date.now() > reward.expires;
};


// ───────────────────────────────────────────────────────────
//  SYSTEM — Separater Admin-Hash (für andere Stellen im Code)
// ───────────────────────────────────────────────────────────
window.ADMIN_HASH = "b521caa6e1db82e5a01c924a419870cb72b81635";

// SHA-256 Hash für das Passwort am Startbildschirm ("Kaiser67")
window.CORRECT_HASH =
  "99c24478e762b27155cca9933195e84bea6a7571149e0f6f5246b14cf3e7d7e9";


// ───────────────────────────────────────────────────────────
//  CASINO-CODE-HANDLER (wird von casino.html aufgerufen)
//  Exportiert window.handleCasinoCode(reward, uid, db).
//  HINWEIS: casino.html nutzt Firebase v9 Modular direkt —
//  dieser Handler ist für den älteren v8-Compat-Stil gedacht.
// ───────────────────────────────────────────────────────────
window.handleCasinoCode = async function (reward, uid, db) {
  if (!reward || !uid || !db) return { success: false, msg: "Missing parameters." };

  try {
    if (reward.type === "chips") {
      const playerRef = db.collection("casino_players").doc(uid);
      await db.runTransaction(async (tx) => {
        const snap    = await tx.get(playerRef);
        const current = snap.exists ? (snap.data().chips || 0) : 0;
        tx.set(playerRef, { chips: current + (reward.chips || 0) }, { merge: true });
      });

      // Optionales Casino-Pack → users/{uid}
      if (reward.casinoPack) {
        const userRef = db.collection("users").doc(uid);
        await db.runTransaction(async (tx) => {
          const snap  = await tx.get(userRef);
          const data  = snap.exists ? snap.data() : {};
          const packs = data.packs || {};
          packs[reward.casinoPack] = (packs[reward.casinoPack] || 0) + 1;
          tx.set(userRef, { packs }, { merge: true });
        });
      }

      return { success: true, msg: reward.msg };
    }

    if (reward.type === "casino_title") {
      const playerRef = db.collection("casino_players").doc(uid);
      await db.runTransaction(async (tx) => {
        const snap   = await tx.get(playerRef);
        const data   = snap.exists ? snap.data() : {};
        const titles = data.unlockedTitles || [];
        if (!titles.includes(reward.titleId)) titles.push(reward.titleId);
        tx.set(playerRef, { unlockedTitles: titles }, { merge: true });
      });
      return { success: true, msg: reward.msg };
    }

    if (reward.type === "casino_pack") {
      const userRef = db.collection("users").doc(uid);
      await db.runTransaction(async (tx) => {
        const snap  = await tx.get(userRef);
        const data  = snap.exists ? snap.data() : {};
        const packs = data.packs || {};
        packs[reward.packKey] = (packs[reward.packKey] || 0) + 1;
        tx.set(userRef, { packs }, { merge: true });
      });
      return { success: true, msg: reward.msg };
    }

    return { success: false, msg: "Unknown casino code type." };
  } catch (e) {
    console.error("Casino code error:", e);
    return { success: false, msg: "Error applying code: " + e.message };
  }
};