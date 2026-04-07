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
  // ROSE
  efd86c891eaa89b9112bd240919d276161405270: {
    type: "hidden",
    msg: "🌹 Hidden card added to collection!",
  },

  // KINGRALI
  bdd4802fd0f3febd5269cd8849d773c9ed4604b4: {
    type: "godpack",
    msg: "👑 KingRali God Pack unlocked!",
  },

  // 21.03.2026
  "58d1c366cfc9588f6fd529333dc0d0c8b419a4ce": {
    type: "id_reward",
    cardId: 6001,
    msg: "✨ Special Card added to collection!",
  },

  // --- Admin & System ---
  b521caa6e1db82e5a01c924a419870cb72b81635: {
    type: "admin",
    msg: "👑 Admin mode ON — no cooldowns, no costs.",
  }, // ADMIN

  // --- Währung & Stats ---
  "676cce6fa01eaa648ca2dda26255441fc4f37940": {
    coins: 500,
    msg: "🎉 Welcome gift! +500 coins.",
  }, // WELCOME2025
  d555e5f960520a978ee2aacf575af3ea3818acb7: {
    coins: 100,
    msg: "✨ +100 coins!",
  }, // COZY100
  "7c01ed33a0e31a4f9017cb80f0de5e53806c8514": {
    luck: 1,
    msg: "🍀 +1% luck applied!",
  }, // LUCKBOOST
  "9602a145db69bfc51c19ad6995755788161c9551": {
    coins: 2000,
    msg: "💰 Jackpot! +2,000 coins.",
  }, // RICHRICH
};

// Separater Hash für den Admin-Check an anderen Stellen im Code
window.ADMIN_HASH = "b521caa6e1db82e5a01c924a419870cb72b81635";

// SHA-256 Hash für das Passwort am Startbildschirm ("Kaiser67")
window.CORRECT_HASH =
  "99c24478e762b27155cca9933195e84bea6a7571149e0f6f5246b14cf3e7d7e9";
