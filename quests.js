// ═══════════════════════════════════════════════════════════
//  quests.js — Quest-Datenbank
//
//  Quest-Typen:
//    'collect_cards'  → Besitze alle Karten aus requiredCardIds
//    'open_packs'     → Öffne X Packs (requiredCount)
//    'collect_rarity' → Besitze X Karten einer bestimmten Rarität (rarity + requiredCount)
//
//  Belohnungs-Typen (rewardType):
//    'card'  → gibt Karte mit rewardCardId
//    'coins' → gibt rewardCoins Münzen
// ═══════════════════════════════════════════════════════════

window.QUESTS_DATABASE = [
  {
    id: 'q_ali_collection',
    name: "Wait a minute, who's that?",
    icon: '😏',
    description: 'Collect all the "Ali" Cards to unlock a Hidden Secret Card.',
    rewardText: '1× Hidden Card',
    type: 'collect_cards',
    requiredCardIds: [101, 102, 103],
    rewardType: 'card',
    rewardCardId: 1002,
  },
  
  // Weitere Quests einfach hier ergänzen, z.B.:
  // {
  //   id: 'q_pack_veteran',
  //   name: 'Pack Veteran',
  //   icon: '📦',
  //   description: 'Open 50 packs total.',
  //   rewardText: '🪙 2,000 Coins',
  //   type: 'open_packs',
  //   requiredCount: 50,
  //   rewardType: 'coins',
  //   rewardCoins: 2000,
  // },
];