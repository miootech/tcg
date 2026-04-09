// ═══════════════════════════════════════════════════════════
//  cards.js — Cozy TCG Card Database
//  Fields: id, name, rarity, class, description,
//          pullWeight, imageUrl, sellValue, isShiny
// ═══════════════════════════════════════════════════════════
//  Rarities: Common, Rare, Epic, Mythical, Legendary, SSSR, Hidden
//  Classes: Skibidi, Gigachad, BabyOil, NPC, Rizzlord, Yapper, Aura, Delulu, Crashout, LetHimCook, Sus, NegativeAura
//  pullWeight determines the relative likelihood of drawing a card.
//  sellValue is the in-game currency value.
//  Hidden cards cannot be pulled from packs — special codes only.
//  Shiny cards are separate entries with isShiny: true and their own ids.
//  Shiny pullWeight is modular — adjust SHINY_WEIGHT_MULTIPLIER below.
//  Rosa Abdullah (Hidden) is the ONLY Hidden card that cannot be pulled.
// ═══════════════════════════════════════════════════════════
// Common Pull Weight Range: 400-800 Sell Value: 2-10 coins
// Rare Pull Weight Range: 120-250 Sell Value: 20-50 coins
// Epic Pull Weight Range: 30-70 Sell Value: 100-250 coins
// Mythical Pull Weight Range: 6-15 Sell Value: 500-1200 coins
// Legendary Pull Weight Range: 1-4 Sell Value: 2500-5000 coins
// SSSR Pull Weight Range: 0.05-0.8 Sell Value: 7500-25000 coins
// ═══════════════════════════════════════════════════════════
// ── SHINY CONFIG ─────────────────────────────────────────
// Global multiplier applied to a card's pullWeight to get its shiny variant's weight.
// e.g. 0.005 = shiny is ~200× rarer than the normal version.
const SHINY_WEIGHT_MULTIPLIER = 0.0025;

const CARD_DATABASE = [
  // ──────────── COMMON ─────────────────────────────────────
  // id 1-200
  {
    id: 1,
    name: "Christoph",
    rarity: "Common",
    class: "Skibidi",
    description:
      "A normal day in math class...",
    pullWeight: 800,
    imageUrl: "assets/cards/common/1.png",
    sellValue: 2,
    isShiny: false,
    baseId: 1,
  },
  {
    id: 2,
    name: "Batman Ali",
    rarity: "Common",
    class: "Skibidi",
    description:
      "A DARK hero from a different dimension. Fights crime with his trusty belt.",
    pullWeight: 750,
    imageUrl: "assets/cards/common/2.png",
    sellValue: 3,
    isShiny: false,
    baseId: 2,
  },
  {
    id: 3,
    name: "Enes mit P",
    rarity: "Common",
    class: "NPC",
    description:
      "Mert Enes zeig mir deinen Pe...",
    pullWeight: 700,
    imageUrl: "assets/cards/common/3.png",
    sellValue: 4,
    isShiny: false,
    baseId: 3,
  },
  {
    id: 4,
    name: "Alexander",
    rarity: "Common",
    class: "BabyOil",
    description:
      "Owner of an untamable garden gnome.",
    pullWeight: 650,
    imageUrl: "assets/cards/common/4.png",
    sellValue: 5,
    isShiny: false,
    baseId: 4,
  },
  {
    id: 5,
    name: "Ammarius",
    rarity: "Common",
    class: "Skibidi",
    description:
        "A mysterious figure with a hidden past.",
    pullWeight: 600,
    imageUrl: "assets/cards/common/5.png",
    sellValue: 6,
    isShiny: false,
    baseId: 5,
  },
  {
    id: 6,
    name: "Johannissimus",
    rarity: "Common",
    class: "LetHimCook",
    description:
        "He is just here... doesn't do much, but he's here.",
    pullWeight: 550,
    imageUrl: "assets/cards/common/6.png",
    sellValue: 7,
    isShiny: false,
    baseId: 6,
  },
  {
    id: 7,
    name: "Toilette Amo",
    rarity: "Common",
    class: "Sus",
    description:
        "Ohhh you dont wanna know what he does in the bathroom...",
    pullWeight: 500,
    imageUrl: "assets/cards/common/7.png",
    sellValue: 8,
    isShiny: false,
    baseId: 7,
  },
  {
    id: 8,
    name: "Pablo",
    rarity: "Common",
    class: "Legend",
    description:
        "Just Pablo. Ali's Uncle.",
    pullWeight: 450,
    imageUrl: "assets/cards/common/8.png",
    sellValue: 9,
    isShiny: false,
    baseId: 8,
  },

  // ──────────── RARE ───────────────────────────────────────
  // id 201-400
  {
    id: 201,
    name: "Kitty Alex",
    rarity: "Rare",
    class: "Rizzlord",
    description:
      "If cute was a person.",
    pullWeight: 250,
    imageUrl: "assets/cards/rare/1.png",
    sellValue: 20,
    isShiny: false,
    baseId: 201,
  },

  // ──────────── EPIC ───────────────────────────────────────
  // id 401-600
  {
    id: 401,
    name: "CJ on 1 HP",
    rarity: "Epic",
    class: "Rizzlord",
    description:
      "Even his own shadow fears him.",
    pullWeight: 70,
    imageUrl: "assets/cards/epic/1.png",
    sellValue: 100,
    isShiny: false,
    baseId: 401,
  },

  // ──────────── MYTHICAL ───────────────────────────────────
  // id 601-750
  {
    id: 601,
    name: "Boxing Amo",
    rarity: "Mythical",
    class: "Aura",
    description:
      "Be carefull, he may knock you down.. or himself.",
    pullWeight: 15,
    imageUrl: "assets/cards/mythical/1.png",
    sellValue: 500,
    isShiny: false,
    baseId: 601,
  },

  // ──────────── LEGENDARY ──────────────────────────────────
  // id 751-900
  {
    id: 751,
    name: "Heracles & Hercules",
    rarity: "Legendary",
    class: "Gigachad",
    description:
      "One man.",
    pullWeight: 4,
    imageUrl: "assets/cards/legendary/1.png",
    sellValue: 2500,
    isShiny: false,
    baseId: 751,
  },

  // ──────────── SSSR ───────────────────────────────────────
  // id 901-1000
  {
    id: 901,
    name: "mini men black edition",
    rarity: "SSSR",
    class: "BabyOil",
    description:
      "Be carefull with food around him, he might spawn behind you.",
    pullWeight: 0.8,
    imageUrl: "assets/cards/sssr/1.png",
    sellValue: 7500,
    isShiny: false,
    baseId: 901,
  },

  // ──────────── HIDDEN (code-only) ─────────────────────────
  // id 1001-1050
  {
    id: 1001,
    name: "Rosa Abdullah",
    rarity: "Hidden",
    class: "Celestial",
    description:
      "You'll never know.",
    pullWeight: 0,
    imageUrl: "assets/cards/hidden/1.png",
    sellValue: 65000,
    isShiny: false,
    baseId: 1001,
  },
  {
    id: 1002,
    name: "Herr Billinger",
    rarity: "Hidden",
    class: "Gigachad",
    description:
      "He may be your greatest supporter or enemy.",
    pullWeight: 0,
    imageUrl: "assets/cards/hidden/2.png",
    sellValue: 50000,
    isShiny: false,
    baseId: 1002,
  },
  {
    id: 1003,
    name: "Ali's son",
    rarity: "Hidden",
    class: "Rizzlord",
    description:
      "Noone knows his name.",
    pullWeight: 0,
    imageUrl: "assets/cards/hidden/3.png",
    sellValue: 55000,
    isShiny: false,
    baseId: 1003,
  },

  // ──────────── SHINY VARIANTS ─────────────────────────────
  // Each shiny card mirrors a base card but is rarer and has a sparkle overlay.
  // pullWeight = base pullWeight × SHINY_WEIGHT_MULTIPLIER (set above).
  // isShiny: true triggers the RGB shimmer overlay in the renderer.
  // Classes: Skibidi, Gigachad, BabyOil, NPC, Rizzlord, Yapper, Aura, Delulu, Crashout, LetHimCook, Sus, NegativeAura
  // shiny rate = ~400× rarer than normal (0.0025 multiplier) by default, but can be adjusted per card.
  // sellValue = x50

  // ──────────── SHINY COMMON ─────────────────────────
  // id 5001-5200
  {
    id: 5001,
    name: "Christoph ✦",
    rarity: "Common",
    class: "Skibidi",
    description:
      "A normal day in math class... [Shiny]",
    pullWeight: 800 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/1.png",
    sellValue: 2 * 50,
    isShiny: true,
    baseId: 5001,
  },
  {
    id: 5002,
    name: "Batman Ali ✦",
    rarity: "Common",
    class: "Skibidi",
    description:
      "A DARK hero from a diffrent dimension. Fights crime with his trusty belt. [Shiny]",
    pullWeight: 750 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/2.png",
    sellValue: 3 * 50,
    isShiny: true,
    baseId: 5002,
  },
  {
    id: 5003,
    name: "Enes mit P ✦",
    rarity: "Common",
    class: "NPC",
    description:
      "Mert Enes zeig mir deinen Pe... [Shiny]",
    pullWeight: 700 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/3.png",
    sellValue: 4 * 50,
    isShiny: true,
    baseId: 5003,
  },
  {
    id: 5004,
    name: "Alexander ✦",
    rarity: "Common",
    class: "BabyOil",
    description:
      "Owner of an untameable garden gnome. [Shiny]",
    pullWeight: 650 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/4.png",
    sellValue: 5 * 50,
    isShiny: true,
    baseId: 5004,
  },
  {
    id: 5005,
    name: "Ammarius",
    rarity: "Common",
    class: "Skibidi",
    description:
        "A mysterious figure with a hidden past. [Shiny]",
    pullWeight: 600 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/5.png",
    sellValue: 6 * 50,
    isShiny: true,
    baseId: 5,
  },
  {
    id: 5006,
    name: "Johannissimus",
    rarity: "Common",
    class: "LetHimCook",
    description:
        "He is just here... doesn't do much, but he's here. [Shiny]",
    pullWeight: 550 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/6.png",
    sellValue: 7 * 50,
    isShiny: true,
    baseId: 6,
  },
  {
    id: 5007,
    name: "Toilette Amo",
    rarity: "Common",
    class: "Sus",
    description:
        "Ohhh you dont wanna know what he does in the bathroom... [Shiny]",
    pullWeight: 500 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/7.png",
    sellValue: 8 * 50,
    isShiny: true,
    baseId: 7,
  },
  {
    id: 5008,
    name: "Pablo",
    rarity: "Common",
    class: "Legend",
    description:
        "Just Pablo. Ali's Uncle. [Shiny]",
    pullWeight: 450 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/8.png",
    sellValue: 9 * 50,
    isShiny: true,
    baseId: 8,
  },

  // ──────────── Shiny Rare ─────────────────────────
  // id 5201-5400
  {
    id: 5201,
    name: "Kitty Alex",
    rarity: "Rare",
    class: "Rizzlord",
    description:
      "If cute was a person. [Shiny]",
    pullWeight: 250 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/1.png",
    sellValue: 20 * 50,
    isShiny: true,
    baseId: 201,
  },

  // ──────────── Shiny Epic ─────────────────────────
  // id 5401-5600
  {
    id: 5401,
    name: "CJ on 1 HP ✦",
    rarity: "Epic",
    class: "Rizzlord",
    description:
      "Even his own shadow fears him. [Shiny]",
    pullWeight: 70 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/epic/1.png",
    sellValue: 100 * 50,
    isShiny: true,
    baseId: 401,
  },

  // ──────────── Shiny Mythical ─────────────────────────
  // id 5601-5750
  {
    id: 5601,
    name: "Boxing Amo",
    rarity: "Mythical",
    class: "Aura",
    description:
      "Be carefull, he may knock you down.. or himself. [Shiny]",
    pullWeight: 15 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/mythical/1.png",
    sellValue: 500 * 50,
    isShiny: true,
    baseId: 601,
  },
  

  // ──────────── Shiny Legendary ─────────────────────────
  // id 5751-5900
  {
    id: 5751,
    name: "Heracles & Hercules ✦",
    rarity: "Legendary",
    class: "Gigachad",
    description:
      "One Man. [Shiny]",
    pullWeight: 4 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/legendary/1.png",
    sellValue: 2500 * 50,
    isShiny: true,
    baseId: 751,
  },

  // ──────────── Shiny SSSR ─────────────────────────
  // id 5901-6000
  {
    id: 5901,
    name: "mini men black edition ✦",
    rarity: "SSSR",
    class: "BabyOil",
    description:
      "Be carefulll with food around him, he might spawn behind you. [Shiny]",
    pullWeight: 0.8 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/sssr/1.png",
    sellValue: 7500 * 50,
    isShiny: true,
    baseId: 901,
  },

  // ──────────── Shiny Hidden (code-only) ─────────────────────────
  // id 6001-6050
  {
    id: 6001,
    name: "Rosa Abdullah ✦",
    rarity: "Hidden",
    class: "Celestial",
    description:
      "You'll never see her coming. [Shiny]",
    pullWeight: 1 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/sssr/1.png",
    sellValue: 65000 * 50,
    isShiny: true,
    baseId: 1001,
  },
  {
    id: 6002,
    name: "Herr Billinger",
    rarity: "Hidden",
    class: "Gigachad",
    description:
      "He may be your greatest supporter or enemy. [Shiny]",
    pullWeight: 0,
    imageUrl: "assets/cards/hidden/2.png",
    sellValue: 50000 * 50,
    isShiny: true,
    baseId: 1002,
  },
  {
    id: 6003,
    name: "Ali's son",
    rarity: "Hidden",
    class: "Rizzlord",
    description:
      "Noone knows his name. [Shiny]",
    pullWeight: 0,
    imageUrl: "assets/cards/hidden/3.png",
    sellValue: 55000 * 50,
    isShiny: true,
    baseId: 1003,
  }
];
