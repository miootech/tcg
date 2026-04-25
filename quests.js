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
    icon: '🧐', // Ein Monokel für die Suche nach der Identität
    description: 'Collect all the Cards with "Ali" in it to unlock a Hidden Secret Card.',
    rewardText: '1× Hidden Card',
    type: 'collect_cards',
    requiredCardIds: [2, 11, 12, 15, 17, 205, 209, 213, 402, 403, 406, 407, 603, 604, 606, 607, 751, 762, 756, 758, 759, 905, 906, 907, 908],
    rewardType: 'card',
    rewardCardId: 1003,
  },
  {
    id: 'q_monseur_collection',
    name: "The Man who controls the Monseur-Mafia...",
    icon: '🕴️', // Der Mann im Anzug für den Mafia-Boss Vibe
    description: 'Collect all the "Monseur-Mafia" Cards to unlock a Hidden Secret Card.',
    rewardText: '1× Hidden Card',
    type: 'collect_cards',
    requiredCardIds: [10, 11, 12, 205, 207, 208, 213, 406, 603, 752, 906],
    rewardType: 'card',
    rewardCardId: 1002,
  },
  {
    id: 'q_unlock_doubbleA',
    name: "DOUBBLE A???",
    icon: '👀', // Das rote A passend zum Namen der Quest
    description: 'Collect the Alex and Ali SSSR Cards to unlock a Hidden Secret Card.',
    rewardText: '1× Hidden Card',
    type: 'collect_cards',
    requiredCardIds: [902, 906],
    rewardType: 'card',
    rewardCardId: 1004,
  },
  {
    id: 'q_unlock_Ammarius',
    name: "Ammarius???",
    icon: '🅰️', // Das rote A passend zum Namen der Quest
    description: 'Collect all the Ammar cards to unlock a Hidden Secret Card.',
    rewardText: '1× Hidden Card',
    type: 'collect_cards',
    requiredCardIds: [5, 402, 603, 751, 903, 908, 909],
    rewardType: 'card',
    rewardCardId: 1006,
  },
];