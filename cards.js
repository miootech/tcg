// ═══════════════════════════════════════════════════════════
//  cards.js — Cozy TCG Card Database
//  Fields: id, name, rarity, class, description,
//          pullWeight, imageUrl, sellValue, isShiny
// ═══════════════════════════════════════════════════════════
//  Rarities: Common, Rare, Epic, Mythical, Legendary, SSSR, Hidden
//  Classes: Nature, Combat, Arcane, Void, Celestial
//  pullWeight determines the relative likelihood of drawing a card.
//  sellValue is the in-game currency value.
//  Hidden cards cannot be pulled from packs — special codes only.
//  Shiny cards are separate entries with isShiny: true and their own ids.
//  Shiny pullWeight is modular — adjust SHINY_WEIGHT_MULTIPLIER below.
//  Rosa Abdullah (Hidden) is the ONLY Hidden card that cannot be pulled.
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
    name: "Mossy Stone",
    rarity: "Common",
    class: "Nature",
    description:
      "A warm stone blanketed in soft emerald moss. Hums with quiet earth magic on rainy days.",
    pullWeight: 120,
    imageUrl: "assets/cards/common/1.png",
    sellValue: 5,
  },
  {
    id: 2,
    name: "Dewdrop Sprite",
    rarity: "Common",
    class: "Nature",
    description:
      "Born from morning dew on a spider's web. Dances between flower petals at sunrise.",
    pullWeight: 110,
    imageUrl: "assets/cards/common/2.png",
    sellValue: 5,
  },
  {
    id: 3,
    name: "Cobbleback Turtle",
    rarity: "Common",
    class: "Nature",
    description:
      "Carries a mossy cobblestone shell it found in an old fountain. Moves slowly, lives for centuries.",
    pullWeight: 100,
    imageUrl: "assets/cards/common/3.png",
    sellValue: 5,
  },
  {
    id: 4,
    name: "Ember Moth",
    rarity: "Common",
    class: "Combat",
    description:
      "Wings glow like cooling embers. Harmless near open flame, but its wing-dust causes sneezes.",
    pullWeight: 115,
    imageUrl: "assets/cards/common/4.png",
    sellValue: 5,
  },
  {
    id: 5,
    name: "Pebble Fish",
    rarity: "Common",
    class: "Arcane",
    description:
      "Camouflages as river pebbles by day. Nibbles on loose mana crystals that drift downstream.",
    pullWeight: 105,
    imageUrl: "assets/cards/common/5.png",
    sellValue: 5,
  },
  {
    id: 6,
    name: "Twig Golem",
    rarity: "Common",
    class: "Nature",
    description:
      "Assembled itself from fallen branches after a storm. Surprisingly loyal and protective.",
    pullWeight: 100,
    imageUrl: "assets/cards/common/6.png",
    sellValue: 5,
  },
  {
    id: 7,
    name: "Fog Rabbit",
    rarity: "Common",
    class: "Void",
    description:
      "Materialises in early morning mist. Vanishes without a trace before noon arrives.",
    pullWeight: 95,
    imageUrl: "assets/cards/common/7.png",
    sellValue: 5,
  },
  {
    id: 8,
    name: "Lantern Crab",
    rarity: "Common",
    class: "Celestial",
    description:
      "A tiny crustacean with a bioluminescent shell. Guides lost sailors through shallow reefs.",
    pullWeight: 90,
    imageUrl: "assets/cards/common/8.png",
    sellValue: 5,
  },
  {
    id: 9,
    name: "Acorn Imp",
    rarity: "Common",
    class: "Nature",
    description:
      "Steals single socks and hoards them underground. Nobody knows why. Nobody has asked.",
    pullWeight: 85,
    imageUrl: "assets/cards/common/9.png",
    sellValue: 5,
  },
  {
    id: 10,
    name: "Slate Heron",
    rarity: "Common",
    class: "Combat",
    description:
      "Feathers sharp as razors, temperament soft as cloud. Still water reflects its stone-grey wings.",
    pullWeight: 80,
    imageUrl: "assets/cards/common/10.png",
    sellValue: 5,
  },

  // ──────────── RARE ───────────────────────────────────────
  // id 201-400
  {
    id: 11,
    name: "Starbloom Archer",
    rarity: "Rare",
    class: "Nature",
    description:
      "Her arrows are tipped with compressed starlight. She has never missed a still target at dusk.",
    pullWeight: 60,
    imageUrl: "assets/cards/rare/11.png",
    sellValue: 30,
  },
  {
    id: 12,
    name: "Crystal Hound",
    rarity: "Rare",
    class: "Arcane",
    description:
      "A wolfhound grown from a geode fissure. Its howl resonates at healing crystalline frequencies.",
    pullWeight: 55,
    imageUrl: "assets/cards/rare/12.png",
    sellValue: 30,
  },
  {
    id: 13,
    name: "Stormcall Owl",
    rarity: "Rare",
    class: "Combat",
    description:
      "Summons small personal thunderstorms when startled. Prefers cloudy evenings for nesting.",
    pullWeight: 50,
    imageUrl: "assets/cards/rare/13.png",
    sellValue: 30,
  },
  {
    id: 14,
    name: "Thornback Bear",
    rarity: "Rare",
    class: "Combat",
    description:
      "Rosebush thorns grow naturally along its spine. Territorial but surprisingly gentle at heart.",
    pullWeight: 48,
    imageUrl: "assets/cards/rare/14.png",
    sellValue: 30,
  },
  {
    id: 15,
    name: "Lunar Rabbit",
    rarity: "Rare",
    class: "Celestial",
    description:
      "Appears exclusively under full moonlight. Its fur glows a soft silver when the stars align.",
    pullWeight: 45,
    imageUrl: "assets/cards/rare/15.png",
    sellValue: 30,
  },
  {
    id: 16,
    name: "Vein Serpent",
    rarity: "Rare",
    class: "Void",
    description:
      "The circuitry-like patterns on its scales seem to process information from another realm.",
    pullWeight: 42,
    imageUrl: "assets/cards/rare/16.png",
    sellValue: 30,
  },
  {
    id: 17,
    name: "Glacier Fox",
    rarity: "Rare",
    class: "Arcane",
    description:
      "Its breath freezes time locally for 0.4 seconds. Uses this only to nap undisturbed.",
    pullWeight: 40,
    imageUrl: "assets/cards/rare/17.png",
    sellValue: 30,
  },

  // ──────────── EPIC ───────────────────────────────────────
  // id 401-600
  {
    id: 18,
    name: "Jade Serpent",
    rarity: "Epic",
    class: "Nature",
    description:
      "Ancient guardian of forgotten jungle temples. Its scales are literally carved from living jade.",
    pullWeight: 20,
    imageUrl: "assets/cards/epic/18.png",
    sellValue: 120,
  },
  {
    id: 19,
    name: "Voidpetal Witch",
    rarity: "Epic",
    class: "Void",
    description:
      "Cultivates flowers that bloom in the void between stars. Serene, methodical, and terrifying.",
    pullWeight: 18,
    imageUrl: "assets/cards/epic/1.jpg",
    sellValue: 120,
  },
  {
    id: 20,
    name: "Ironwood Titan",
    rarity: "Epic",
    class: "Combat",
    description:
      "Forged from the ancient heartwood of a ten-thousand-year-old oak. Completely immovable.",
    pullWeight: 17,
    imageUrl: "assets/cards/epic/1.jpg",
    sellValue: 120,
  },
  {
    id: 21,
    name: "Aurora Drake",
    rarity: "Epic",
    class: "Arcane",
    description:
      "Breathes living prismatic auroras rather than fire. Its territory lights the northern night sky.",
    pullWeight: 15,
    imageUrl: "assets/cards/epic/21.png",
    sellValue: 120,
  },
  {
    id: 22,
    name: "Deep Bloom Nymph",
    rarity: "Epic",
    class: "Nature",
    description:
      "A forest spirit that awakens once per century. Wherever she sleeps, rare flowers grow overnight.",
    pullWeight: 13,
    imageUrl: "assets/cards/epic/22.png",
    sellValue: 120,
  },

  // ──────────── MYTHICAL ───────────────────────────────────
  // id 601-750
  {
    id: 23,
    name: "Celestine Seer",
    rarity: "Mythical",
    class: "Celestial",
    description:
      "Reads futures written in the arrangement of constellations. Refuses to share what she sees.",
    pullWeight: 8,
    imageUrl: "assets/cards/mythical/23.png",
    sellValue: 450,
  },
  {
    id: 24,
    name: "Shadowmaw Wolf",
    rarity: "Mythical",
    class: "Void",
    description:
      "Stalks prey through parallel dimensions simultaneously. Only its ember-glow eyes are visible.",
    pullWeight: 7,
    imageUrl: "assets/cards/mythical/24.png",
    sellValue: 450,
  },
  {
    id: 25,
    name: "Prism Kirin",
    rarity: "Mythical",
    class: "Arcane",
    description:
      "A deer-dragon hybrid that refracts pure sunlight into healing rainbow cascades.",
    pullWeight: 5,
    imageUrl: "assets/cards/mythical/25.png",
    sellValue: 450,
  },

  // ──────────── LEGENDARY ──────────────────────────────────
  // id 751-900
  {
    id: 26,
    name: "Solaris Phoenix",
    rarity: "Legendary",
    class: "Celestial",
    description:
      "Burns with the collapsing core of a dying star. Every rebirth brightens the sky for a fleeting moment.",
    pullWeight: 3,
    imageUrl: "assets/cards/legendary/26.png",
    sellValue: 1500,
  },
  {
    id: 27,
    name: "Abyssal Leviathan",
    rarity: "Legendary",
    class: "Void",
    description:
      "Older than the ocean itself. Sleeps in trenches too dark and deep for any map to reach.",
    pullWeight: 2,
    imageUrl: "assets/cards/legendary/27.png",
    sellValue: 1500,
  },

  // ──────────── SSSR ───────────────────────────────────────
  // id 901-1000
  {
    id: 28,
    name: "Omnishard Entity",
    rarity: "SSSR",
    class: "Arcane",
    description:
      "A being of pure crystallised possibility. It simultaneously contains every future that has ever been imagined.",
    pullWeight: 1,
    imageUrl: "assets/cards/sssr/28.png",
    sellValue: 6000,
  },

  // ──────────── HIDDEN (code-only) ─────────────────────────
  // id 1001-1050
  {
    id: 29,
    name: "Rosa Abdullah",
    rarity: "Hidden",
    class: "Celestial",
    description:
      "You'll never know.",
    pullWeight: 0,
    imageUrl: null,
    sellValue: 50000,
  },

  // ──────────── SHINY VARIANTS ─────────────────────────────
  // Each shiny card mirrors a base card but is rarer and has a sparkle overlay.
  // pullWeight = base pullWeight × SHINY_WEIGHT_MULTIPLIER (set above).
  // isShiny: true triggers the RGB shimmer overlay in the renderer.

  // ──────────── SHINY COMMON ─────────────────────────
  // id 5001-5200
  {
    id: 1001,
    name: "Mossy Stone ✦",
    rarity: "Common",
    class: "Nature",
    description:
      "A warm stone blanketed in soft emerald moss. Hums with quiet earth magic on rainy days. [Shiny]",
    pullWeight: 120 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/1.png",
    sellValue: 50,
    isShiny: true,
    baseId: 1,
  },
  {
    id: 1002,
    name: "Dewdrop Sprite ✦",
    rarity: "Common",
    class: "Nature",
    description:
      "Born from morning dew on a spider's web. Dances between flower petals at sunrise. [Shiny]",
    pullWeight: 110 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/2.png",
    sellValue: 50,
    isShiny: true,
    baseId: 2,
  },
  {
    id: 1003,
    name: "Cobbleback Turtle ✦",
    rarity: "Common",
    class: "Nature",
    description:
      "Carries a mossy cobblestone shell it found in an old fountain. Moves slowly, lives for centuries. [Shiny]",
    pullWeight: 100 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/3.png",
    sellValue: 50,
    isShiny: true,
    baseId: 3,
  },
  {
    id: 1004,
    name: "Ember Moth ✦",
    rarity: "Common",
    class: "Combat",
    description:
      "Wings glow like cooling embers. Harmless near open flame, but its wing-dust causes sneezes. [Shiny]",
    pullWeight: 115 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/4.png",
    sellValue: 50,
    isShiny: true,
    baseId: 4,
  },
  {
    id: 1005,
    name: "Pebble Fish ✦",
    rarity: "Common",
    class: "Arcane",
    description:
      "Camouflages as river pebbles by day. Nibbles on loose mana crystals that drift downstream. [Shiny]",
    pullWeight: 105 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/5.png",
    sellValue: 50,
    isShiny: true,
    baseId: 5,
  },
  {
    id: 1006,
    name: "Twig Golem ✦",
    rarity: "Common",
    class: "Nature",
    description:
      "Assembled itself from fallen branches after a storm. Surprisingly loyal and protective. [Shiny]",
    pullWeight: 100 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/6.png",
    sellValue: 50,
    isShiny: true,
    baseId: 6,
  },
  {
    id: 1007,
    name: "Fog Rabbit ✦",
    rarity: "Common",
    class: "Void",
    description:
      "Materialises in early morning mist. Vanishes without a trace before noon arrives. [Shiny]",
    pullWeight: 95 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/7.png",
    sellValue: 50,
    isShiny: true,
    baseId: 7,
  },
  {
    id: 1008,
    name: "Lantern Crab ✦",
    rarity: "Common",
    class: "Celestial",
    description:
      "A tiny crustacean with a bioluminescent shell. Guides lost sailors through shallow reefs. [Shiny]",
    pullWeight: 90 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/8.png",
    sellValue: 50,
    isShiny: true,
    baseId: 8,
  },
  {
    id: 1009,
    name: "Acorn Imp ✦",
    rarity: "Common",
    class: "Nature",
    description:
      "Steals single socks and hoards them underground. Nobody knows why. Nobody has asked. [Shiny]",
    pullWeight: 85 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/9.png",
    sellValue: 50,
    isShiny: true,
    baseId: 9,
  },
  {
    id: 1010,
    name: "Slate Heron ✦",
    rarity: "Common",
    class: "Combat",
    description:
      "Feathers sharp as razors, temperament soft as cloud. Still water reflects its stone-grey wings. [Shiny]",
    pullWeight: 80 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/common/10.png",
    sellValue: 50,
    isShiny: true,
    baseId: 10,
  },

  // ──────────── Shiny Rare ─────────────────────────
  // id 5201-5400
  {
    id: 1011,
    name: "Starbloom Archer ✦",
    rarity: "Rare",
    class: "Nature",
    description:
      "Her arrows are tipped with compressed starlight. She has never missed a still target at dusk. [Shiny]",
    pullWeight: 60 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/11.png",
    sellValue: 200,
    isShiny: true,
    baseId: 11,
  },
  {
    id: 1012,
    name: "Crystal Hound ✦",
    rarity: "Rare",
    class: "Arcane",
    description:
      "A wolfhound grown from a geode fissure. Its howl resonates at healing crystalline frequencies. [Shiny]",
    pullWeight: 55 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/12.png",
    sellValue: 200,
    isShiny: true,
    baseId: 12,
  },
  {
    id: 1013,
    name: "Stormcall Owl ✦",
    rarity: "Rare",
    class: "Combat",
    description:
      "Summons small personal thunderstorms when startled. Prefers cloudy evenings for nesting. [Shiny]",
    pullWeight: 50 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/13.png",
    sellValue: 200,
    isShiny: true,
    baseId: 13,
  },
  {
    id: 1014,
    name: "Thornback Bear ✦",
    rarity: "Rare",
    class: "Combat",
    description:
      "Rosebush thorns grow naturally along its spine. Territorial but surprisingly gentle at heart. [Shiny]",
    pullWeight: 48 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/14.png",
    sellValue: 200,
    isShiny: true,
    baseId: 14,
  },
  {
    id: 1015,
    name: "Lunar Rabbit ✦",
    rarity: "Rare",
    class: "Celestial",
    description:
      "Appears exclusively under full moonlight. Its fur glows a soft silver when the stars align. [Shiny]",
    pullWeight: 45 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/15.png",
    sellValue: 200,
    isShiny: true,
    baseId: 15,
  },
  {
    id: 1016,
    name: "Vein Serpent ✦",
    rarity: "Rare",
    class: "Void",
    description:
      "The circuitry-like patterns on its scales seem to process information from another realm. [Shiny]",
    pullWeight: 42 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/16.png",
    sellValue: 200,
    isShiny: true,
    baseId: 16,
  },
  {
    id: 1017,
    name: "Glacier Fox ✦",
    rarity: "Rare",
    class: "Arcane",
    description:
      "Its breath freezes time locally for 0.4 seconds. Uses this only to nap undisturbed. [Shiny]",
    pullWeight: 40 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/rare/17.png",
    sellValue: 200,
    isShiny: true,
    baseId: 17,
  },

  // ──────────── Shiny Epic ─────────────────────────
  // id 5401-5600
  {
    id: 1018,
    name: "Jade Serpent ✦",
    rarity: "Epic",
    class: "Nature",
    description:
      "Ancient guardian of forgotten jungle temples. Its scales are literally carved from living jade. [Shiny]",
    pullWeight: 20 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/epic/18.png",
    sellValue: 800,
    isShiny: true,
    baseId: 18,
  },
  {
    id: 1019,
    name: "Voidpetal Witch ✦",
    rarity: "Epic",
    class: "Void",
    description:
      "Cultivates flowers that bloom in the void between stars. Serene, methodical, and terrifying. [Shiny]",
    pullWeight: 18 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/epic/19.png",
    sellValue: 800,
    isShiny: true,
    baseId: 19,
  },
  {
    id: 1020,
    name: "Ironwood Titan ✦",
    rarity: "Epic",
    class: "Combat",
    description:
      "Forged from the ancient heartwood of a ten-thousand-year-old oak. Completely immovable. [Shiny]",
    pullWeight: 17 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/epic/20.png",
    sellValue: 800,
    isShiny: true,
    baseId: 20,
  },
  {
    id: 1021,
    name: "Aurora Drake ✦",
    rarity: "Epic",
    class: "Arcane",
    description:
      "Breathes living prismatic auroras rather than fire. Its territory lights the northern night sky. [Shiny]",
    pullWeight: 15 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/epic/21.png",
    sellValue: 800,
    isShiny: true,
    baseId: 21,
  },
  {
    id: 1022,
    name: "Deep Bloom Nymph ✦",
    rarity: "Epic",
    class: "Nature",
    description:
      "A forest spirit that awakens once per century. Wherever she sleeps, rare flowers grow overnight. [Shiny]",
    pullWeight: 13 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/epic/22.png",
    sellValue: 800,
    isShiny: true,
    baseId: 22,
  },

  // ──────────── Shiny Mythical ─────────────────────────
  // id 5601-5750
  {
    id: 1023,
    name: "Celestine Seer ✦",
    rarity: "Mythical",
    class: "Celestial",
    description:
      "Reads futures written in the arrangement of constellations. Refuses to share what she sees. [Shiny]",
    pullWeight: 8 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/mythical/23.png",
    sellValue: 3000,
    isShiny: true,
    baseId: 23,
  },
  {
    id: 1024,
    name: "Shadowmaw Wolf ✦",
    rarity: "Mythical",
    class: "Void",
    description:
      "Stalks prey through parallel dimensions simultaneously. Only its ember-glow eyes are visible. [Shiny]",
    pullWeight: 7 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/mythical/24.png",
    sellValue: 3000,
    isShiny: true,
    baseId: 24,
  },
  {
    id: 1025,
    name: "Prism Kirin ✦",
    rarity: "Mythical",
    class: "Arcane",
    description:
      "A deer-dragon hybrid that refracts pure sunlight into healing rainbow cascades. [Shiny]",
    pullWeight: 5 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/mythical/25.png",
    sellValue: 3000,
    isShiny: true,
    baseId: 25,
  },

  // ──────────── Shiny Legendary ─────────────────────────
  // id 5751-5900
  {
    id: 1026,
    name: "Solaris Phoenix ✦",
    rarity: "Legendary",
    class: "Celestial",
    description:
      "Burns with the collapsing core of a dying star. Every rebirth brightens the sky for a fleeting moment. [Shiny]",
    pullWeight: 3 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/legendary/26.png",
    sellValue: 10000,
    isShiny: true,
    baseId: 26,
  },
  {
    id: 1027,
    name: "Abyssal Leviathan ✦",
    rarity: "Legendary",
    class: "Void",
    description:
      "Older than the ocean itself. Sleeps in trenches too dark and deep for any map to reach. [Shiny]",
    pullWeight: 2 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/legendary/27.png",
    sellValue: 10000,
    isShiny: true,
    baseId: 27,
  },

  // ──────────── Shiny SSSR ─────────────────────────
  // id 5901-6000
  {
    id: 5901,
    name: "Omnishard Entity ✦",
    rarity: "SSSR",
    class: "Arcane",
    description:
      "A being of pure crystallised possibility. It simultaneously contains every future that has ever been imagined. [Shiny]",
    pullWeight: 1 * SHINY_WEIGHT_MULTIPLIER,
    imageUrl: "assets/cards/sssr/28.png",
    sellValue: 40000,
    isShiny: true,
    baseId: 28,
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
    imageUrl: "assets/cards/sssr/28.png",
    sellValue: 500000,
    isShiny: true,
    baseId: 29,
  },
];
