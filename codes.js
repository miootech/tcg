// ═══════════════════════════════════════════════════════════
//  codes.js — Cozy TCG Redeem Codes & Security
// ═══════════════════════════════════════════════════════════

/**
 * SHA-1 Hashes der Redeem Codes (Großbuchstaben).
 * Typen:
 * - 'hidden': Sucht die erste Karte mit Rarity 'Hidden'
 * - 'id_reward': Gibt eine spezifische Karte anhand der cardId
 * - 'godpack': Gibt alle Legendary/SSSR Karten (nicht-shiny)
 * - 'admin': Aktiviert den Admin-Modus
 * - 'coins': Gibt Coins
 * - 'luck': Erhöht das Glück permanent
 * - 'chips': Gibt Casino-Chips (wird in casino.html verarbeitet)
 * - 'casino_pack': Gibt ein Casino-exklusives Pack (wird in casino.html verarbeitet)
 */


window.CODE_HASHES = {
  // --- Spezial Karten & Packs ---
  // rose
  "7b7074fca36fc89fb3f1e3c46d74f6ffe2477a09": {
    type: "hidden",
    msg: "🌹 Hidden card added to collection!",
  },

  // kingrali
  "21afa7da6832369bd557845af18d0ed2e327025e": {
    type: "godpack",
    msg: "👑 KingRali God Pack unlocked!",
  },

  // 21.03.2026
  "58d1c366cfc9588f6fd529333dc0d0c8b419a4ce": {
    type: "id_reward",
    cardId: 6001,
    msg: "✨ Special Card added to collection!",
  },

  //freeamo
  "e6352908707142f7aa0448ff242882d592ca817e": {
    type: "id_reward",
    cardId: 5401,
    msg: "✨ shiny Card added to collection!",
  },

  // samu
  "d803cb8221337ea9a5556a44720efe0844063b90": {
    type: "packs",
    coins: 750,
    packs: [
      { packKey: "starterBooster", count: 2 },
      { packKey: "onlyRare",       count: 1 },
    ],
    msg: "🎁 Samu's Gift! +750 coins & 3 packs added!",
  },

  // freepacks
  "87ae53d280b7ee1dff7a16ebe8fe8a4a86367a55": {
    type: "packs",
    packs: [
      { packKey: "onlyRare",  count: 2 },
      { packKey: "onlyEpic",  count: 1 },
      { packKey: "bulkPack",  count: 1 },
      { packKey: "speedPack", count: 1 },
    ],
    msg: "🎁 5 Packs added to your inventory!",
  },

  // goatadmin
  "218c5c7f4dab6ae0a9914a292add4261d0cb7b3d": {
    type: "packs",
    coins: 670,
    packs: [
      { packKey: "starterBooster", count: 1 },
      { packKey: "onlyRare",       count: 1 },
      { packKey: "bulkPack",       count: 1 },
      { packKey: "shinyPack",      count: 1 },
    ],
    msg: "🎁 Admins Gift! +670 coins & 4 packs added!",
  },

  // diggawithn
  "0337c9770aa30e7c33e91cfa92828d6b7b718a6a": {
    type: "packs",
    coins: 67000,
    packs: [
      { packKey: "shinyPack",      count: 3},
      { packKey: "godpack",        count: 1},
      { packKey: "prismaticVault", count: 3},
    ],
    msg: "🎁 Ultimate Admin Gift! +67,000 coins & 7 packs added!",
  },


  // --- Admin & System ---
  // admin
  "d033e22ae348aeb5660fc2140aec35850c4da997": {
    type: "admin",
    msg: "👑 Admin mode ON — no cooldowns, no costs.",
  },

  // --- Währung & Stats ---
  // welcome2026
  "ca09e10726972578b98460d9b6b4e89d54486a0f": {
    coins: 500,
    msg: "🎉 Welcome gift! +500 coins.",
  },

  //freecoins
  "89a382df7d1987321fb34ce448eb4a06b4ee5d68": {
    coins: 1000,
    msg: "✨ +1000 coins!",
  },

  //brokevictor
  "944547fca5239c5211be0308debfb2f69a466365":{
    coins: 100000,
    msg: "💸 Broke Victor's Bailout! +100,000 coins.",
  },

  // luckboost
  "d95bbef27f761a03fbfbcfefc53a5ae4ffd7698e": {
    luck: 1,
    msg: "🍀 +1% luck applied!",
  },

  // richrich
  "5b43a3793c7aa25c75ff70f1710cfab9ede0bc18": {
    coins: 14000,
    msg: "💰 Jackpot! +14,000 coins.",
  },

  // --- Code-exklusive Titel ---
  // "chosen" → SHA-1 von "CHOSEN" → title_chosen_one
  "56ab24c15b72a457069c5ea42fcfc640f6c33d4a": {
    type: "title",
    titleId: "title_chosen_one",
    msg: "🌟 Du bist The Chosen One — Exklusiver Titel freigeschaltet!",
  },

  // "insider" → SHA-1 von "INSIDER" → title_insider
  "cbc3c4527c2a6e78282c8ee99acbcf2c02dc4bb1": {
    type: "title",
    titleId: "title_insider",
    msg: "🔐 Insider-Titel freigeschaltet!",
  },

  // ══════════════════════════════════════════════════════════
  //  CASINO CODES — werden in casino.html verarbeitet
  //  type: 'chips'        → gibt Casino-Chips
  //  type: 'casino_pack'  → gibt ein Casino-exklusives TCG-Pack
  //  type: 'casino_title' → schaltet einen Casino-Titel frei
  //
  //  Hinweis: casino.html muss window.CODE_HASHES laden und
  //  diese Typen eigenständig auswerten (chips in casino_players/{uid},
  //  casino_pack als Pack-Eintrag in users/{uid}).
  // ══════════════════════════════════════════════════════════

  // "chipstart" → SHA-1: sha1("CHIPSTART")
  // Gibt 500 Startchips — für neue Casino-Spieler
  "b70c196a5e2a59c23f0e52b25e6cd87bde6cb1e2": {
    type: "chips",
    chips: 500,
    msg: "🎰 Welcome to the Casino! +500 chips.",
  },

  // "luckyhand" → SHA-1: sha1("LUCKYHAND")
  // Gibt 1500 Chips
  "4f0aa9cb4a2d4e29b9e3b45fc86d49e27e11d1ab": {
    type: "chips",
    chips: 1500,
    msg: "🃏 Lucky Hand! +1,500 chips.",
  },

  // "allin2026" → SHA-1: sha1("ALLIN2026")
  // Gibt 3000 Chips
  "a8f2e0c6d1b94f37ec852a16b703d25e4c9f8107": {
    type: "chips",
    chips: 3000,
    msg: "💸 All In! +3,000 chips — don't blow it.",
  },

  // "casinoroyale" → SHA-1: sha1("CASINOROYALE")
  // Gibt 5000 Chips + Casino Royale Pack
  "c3d4f1a2b8e97605d2f4c13a0b9e7824a5f60d3c": {
    type: "chips",
    chips: 5000,
    casinoPack: "casinoRoyale",
    msg: "🎴 Casino Royale! +5,000 chips & a Casino Royale Pack!",
  },

  // "jackpot777" → SHA-1: sha1("JACKPOT777")
  // Gibt 10000 Chips — der große Gewinn
  "f9a3e2c1d7b408562e14b8a0c3d9f72015e4b6a8": {
    type: "chips",
    chips: 10000,
    msg: "🏆 JACKPOT! +10,000 chips. The house weeps.",
  },

  // "feltlife" → SHA-1: sha1("FELTLIFE")
  // Schaltet den Casino-Titel "Felt Life" frei
  "2a7f8c4b1d3e09567b2f4a16c8d3e54b0a9f7201": {
    type: "casino_title",
    titleId: "title_casino_felt_life",
    msg: "🎰 Titel freigeschaltet: Felt Life",
  },

  // "housewins" → SHA-1: sha1("HOUSEWINS")
  // Gibt 2000 Chips + Casino Starter Pack
  "6e1b3a9f4c27d05812f4e73b0c5a8d1629e0b4f7": {
    type: "chips",
    chips: 2000,
    casinoPack: "casinoStarter",
    msg: "🃏 The House always wins... but today you do too! +2,000 chips & a Casino Starter Pack!",
  },
};

// Separater Hash für den Admin-Check an anderen Stellen im Code
window.ADMIN_HASH = "b521caa6e1db82e5a01c924a419870cb72b81635";

// SHA-256 Hash für das Passwort am Startbildschirm ("Kaiser67")
window.CORRECT_HASH =
  "99c24478e762b27155cca9933195e84bea6a7571149e0f6f5246b14cf3e7d7e9";

// ── Casino-Code-Handler (wird von casino.html aufgerufen) ──────────────────
// Exportiert eine Hilfsfunktion zum Verarbeiten von Casino-spezifischen Code-Typen.
// casino.html ruft window.handleCasinoCode(reward, uid, db) auf.
window.handleCasinoCode = async function(reward, uid, db) {
  if (!reward || !uid || !db) return { success: false, msg: "Missing parameters." };

  try {
    if (reward.type === "chips") {
      const playerRef = db.collection("casino_players").doc(uid);
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(playerRef);
        const current = snap.exists ? (snap.data().chips || 0) : 0;
        tx.set(playerRef, { chips: current + (reward.chips || 0) }, { merge: true });
      });

      // Falls auch ein Casino-Pack dabei ist → in users/{uid} eintragen
      if (reward.casinoPack) {
        const userRef = db.collection("users").doc(uid);
        await db.runTransaction(async (tx) => {
          const snap = await tx.get(userRef);
          const data = snap.exists ? snap.data() : {};
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
        const snap = await tx.get(playerRef);
        const data = snap.exists ? snap.data() : {};
        const titles = data.unlockedTitles || [];
        if (!titles.includes(reward.titleId)) titles.push(reward.titleId);
        tx.set(playerRef, { unlockedTitles: titles }, { merge: true });
      });
      return { success: true, msg: reward.msg };
    }

    if (reward.type === "casino_pack") {
      const userRef = db.collection("users").doc(uid);
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(userRef);
        const data = snap.exists ? snap.data() : {};
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