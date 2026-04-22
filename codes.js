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
};

// Separater Hash für den Admin-Check an anderen Stellen im Code
window.ADMIN_HASH = "b521caa6e1db82e5a01c924a419870cb72b81635";

// SHA-256 Hash für das Passwort am Startbildschirm ("Kaiser67")
window.CORRECT_HASH =
  "99c24478e762b27155cca9933195e84bea6a7571149e0f6f5246b14cf3e7d7e9";
