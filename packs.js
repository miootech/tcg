// ═══════════════════════════════════════════════════════════
//  packs.js — Cozy TCG Special Pack Database  (v2)
//
//  rotation: 'always' = shown every time (6 packs)
//            0        = shown during hours  0–11  (3 packs)
//            1        = shown during hours 12–23  (3 packs)
//
//  type:
//    'onlyRarity'      → draws cardCount cards from fixedRarity pool
//    'classPack'       → picks a random class, draws cardCount from it
//    'twistPack'       → generates pairCount pairs; player picks one per pair
//    'standard'        → normal weighted draw, cardCount cards
//    'starterBooster'  → 1 guaranteed Rare + rest standard
//    'epicPlus'        → all cards are Epic or higher
//    'mythicalPlus'    → all cards are Mythical or higher
//    'speedPack'       → 2 cards, uses weightMod (Legendary ×5)
//    'mysteryBox'      → randomly selects and opens another owned pack
//    'collectorsChoice'→ 1 card, SSSR odds ×12 via weightMod
//
//  Required fields per pack:
//    id, name, label, icon, description, displayOdds, cardCount,
//    timedCooldown (sec), coinCost, price, sellValue, luckBonus,
//    rotation, type, bg
// ═══════════════════════════════════════════════════════════

const SPECIAL_PACK_CFG = {
  // ── ALWAYS VISIBLE ──────────────────────────────────────

  onlyRare: {
    id: "onlyRare",
    name: "Only Rare Pack",
    label: "Only Rare Pack",
    icon: "💙",
    description:
      "3 guaranteed Rare cards. Sometimes blue is exactly the colour you need.",
    displayOdds: "100% Rare · 3 cards",
    cardCount: 3,
    timedCooldown: 15 * 60,
    coinCost: 500,
    price: 500,
    sellValue: 180,
    luckBonus: 0,
    rotation: "always",
    type: "onlyRarity",
    fixedRarity: "Rare",
    bg: "linear-gradient(145deg,#091c30,#0e2848)",
  },

  onlyEpic: {
    id: "onlyEpic",
    name: "Only Epic Pack",
    label: "Only Epic Pack",
    icon: "💜",
    description: "3 guaranteed Epic cards. Power, patience, purple vibes.",
    displayOdds: "100% Epic · 3 cards",
    cardCount: 3,
    timedCooldown: 15 * 60,
    coinCost: 2500,
    price: 2500,
    sellValue: 850,
    luckBonus: 0,
    rotation: "always",
    type: "onlyRarity",
    fixedRarity: "Epic",
    bg: "linear-gradient(145deg,#18082e,#22103e)",
  },

  classPack: {
    id: "classPack",
    name: "Class Pack",
    label: "Class Pack",
    icon: "🎭",
    description:
      "3 cards of a randomly chosen class. Roll the cosmic dice — embrace whatever comes.",
    displayOdds: "Varied odds · Random class · 3 cards",
    cardCount: 3,
    timedCooldown: 25 * 60,
    coinCost: 5000,
    price: 5000,
    sellValue: 1400,
    luckBonus: 0,
    rotation: "always",
    type: "classPack",
    bg: "linear-gradient(145deg,#0a2016,#142c1e)",
  },

  twistPack: {
    id: "twistPack",
    name: "Twist Pack",
    label: "Twist Pack",
    icon: "🌀",
    description:
      "5 card duels — you pick the winner of each pair. Strategy meets chance.",
    displayOdds: "Any rarity · 5 duels · you choose",
    cardCount: 5,
    timedCooldown: 25 * 60,
    coinCost: 25000,
    price: 25000,
    sellValue: 5500,
    luckBonus: 0,
    rotation: "always",
    type: "twistPack",
    bg: "linear-gradient(145deg,#1c1228,#1a1024)",
  },

  bulkPack: {
    id: "bulkPack",
    name: "Bulk Pack",
    label: "Bulk Pack",
    icon: "📦",
    description:
      "10 cards in one go at standard odds. Quantity is its own kind of quality.",
    displayOdds: "Standard odds · 10 cards",
    cardCount: 10,
    timedCooldown: 30 * 60,
    coinCost: 1500,
    price: 1500,
    sellValue: 380,
    luckBonus: 0,
    rotation: "always",
    type: "standard",
    bg: "linear-gradient(145deg,#141224,#1c1830)",
  },

  starterBooster: {
    id: "starterBooster",
    name: "Starter Booster",
    label: "Starter Booster",
    icon: "🌱",
    description:
      "1 guaranteed Rare + 2 standard cards. A cosy little push forward.",
    displayOdds: "1× Rare guaranteed · 2× standard",
    cardCount: 3,
    timedCooldown: 20 * 60,
    coinCost: 800,
    price: 800,
    sellValue: 260,
    luckBonus: 0,
    rotation: "always",
    type: "starterBooster",
    bg: "linear-gradient(145deg,#102018,#1a2c1a)",
  },

  // ── ROTATING — SLOT 0  (00:00 – 12:00) ─────────────────

  highRoller: {
    id: "highRoller",
    name: "High Roller",
    label: "High Roller",
    icon: "🎰",
    description:
      "3 cards · All Epic or better. Fortune is a friend of the brave.",
    displayOdds: "100% Epic+ · 3 cards · +2% luck",
    cardCount: 3,
    timedCooldown: 30 * 60,
    coinCost: 8000,
    price: 8000,
    sellValue: 2400,
    luckBonus: 2,
    rotation: 0,
    type: "epicPlus",
    bg: "linear-gradient(145deg,#1c0c2a,#260e38)",
  },

  speedPack: {
    id: "speedPack",
    name: "Speed Pack",
    label: "Speed Pack",
    icon: "⚡",
    description:
      "2 cards only — but Legendary drop rate is supercharged ×5. Blink and it's gone.",
    displayOdds: "2 cards · Legendary ×5 · Legendary+ boosted",
    cardCount: 2,
    timedCooldown: 20 * 60,
    coinCost: 12000,
    price: 12000,
    sellValue: 3200,
    luckBonus: 3,
    rotation: 0,
    type: "speedPack",
    weightMod: {
      Common: 0.45,
      Rare: 0.75,
      Epic: 1.1,
      Mythical: 1.8,
      Legendary: 5,
      SSSR: 2.2,
    },
    bg: "linear-gradient(145deg,#101428,#181630)",
  },

  mysteryBox: {
    id: "mysteryBox",
    name: "Mystery Box",
    label: "Mystery Box",
    icon: "🎁",
    description:
      "Opens a completely random pack from your unlocked collection. Chaos, giftwrapped.",
    displayOdds: "? cards · Random pack · Anything goes",
    cardCount: 1,
    timedCooldown: 40 * 60,
    coinCost: 3000,
    price: 3000,
    sellValue: 700,
    luckBonus: 0,
    rotation: 0,
    type: "mysteryBox",
    bg: "linear-gradient(145deg,#181030,#221840)",
  },

  // ── ROTATING — SLOT 1  (12:00 – 24:00) ─────────────────

  tripleThreat: {
    id: "tripleThreat",
    name: "Triple Threat",
    label: "Triple Threat",
    icon: "🔱",
    description:
      "3 cards · All Epic or higher. Triple the aura, triple the atmosphere.",
    displayOdds: "100% Epic+ · 3 cards · +1% luck",
    cardCount: 3,
    timedCooldown: 25 * 60,
    coinCost: 6000,
    price: 6000,
    sellValue: 1900,
    luckBonus: 1,
    rotation: 1,
    type: "epicPlus",
    bg: "linear-gradient(145deg,#0c1a30,#0e2040)",
  },

  heavyHitter: {
    id: "heavyHitter",
    name: "Heavy Hitter",
    label: "Heavy Hitter",
    icon: "💥",
    description:
      "2 cards · Both Mythical or higher guaranteed. Hits like a comet.",
    displayOdds: "2 cards · 100% Mythical+ · +4% luck",
    cardCount: 2,
    timedCooldown: 45 * 60,
    coinCost: 15000,
    price: 15000,
    sellValue: 5200,
    luckBonus: 4,
    rotation: 1,
    type: "mythicalPlus",
    bg: "linear-gradient(145deg,#1e0c18,#2c1022)",
  },

  collectorsChoice: {
    id: "collectorsChoice",
    name: "Collector's Choice",
    label: "Collector's Choice",
    icon: "💎",
    description:
      "1 card · SSSR odds amplified ×12. For the obsessively patient collector.",
    displayOdds: "1 card · SSSR ×12 · Legendary ×3 · +5% luck",
    cardCount: 1,
    timedCooldown: 60 * 60,
    coinCost: 25000,
    price: 25000,
    sellValue: 5000,
    luckBonus: 5,
    rotation: 1,
    type: "collectorsChoice",
    weightMod: {
      Common: 0.28,
      Rare: 0.48,
      Epic: 0.75,
      Mythical: 1.4,
      Legendary: 3,
      SSSR: 12,
    },
    bg: "linear-gradient(145deg,#0e1828,#0e1e38)",
  },
};
