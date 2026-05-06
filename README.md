<div align="center">

<img src="https://img.shields.io/badge/version-2.2.1-gold?style=for-the-badge&labelColor=1a1830" alt="Version">
<img src="https://img.shields.io/badge/stack-Vanilla%20JS-f7df1e?style=for-the-badge&labelColor=1a1830&logo=javascript&logoColor=f7df1e" alt="JS">
<img src="https://img.shields.io/badge/backend-Firebase-ff6d00?style=for-the-badge&labelColor=1a1830&logo=firebase&logoColor=ff6d00" alt="Firebase">
<img src="https://img.shields.io/badge/audio-Web%20Audio%20API-8b5cf6?style=for-the-badge&labelColor=1a1830" alt="Web Audio">
<img src="https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge&labelColor=1a1830" alt="License">

<br/><br/>

```
   ██████╗ ██████╗ ███████╗██╗   ██╗    ████████╗ ██████╗ ██████╗
  ██╔════╝██╔═══██╗╚══███╔╝╚██╗ ██╔╝    ╚══██╔══╝██╔════╝██╔════╝
  ██║     ██║   ██║  ███╔╝  ╚████╔╝        ██║   ██║     ██║  ███╗
  ██║     ██║   ██║ ███╔╝    ╚██╔╝         ██║   ██║     ██║   ██║
  ╚██████╗╚██████╔╝███████╗   ██║          ██║   ╚██████╗╚██████╔╝
   ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝          ╚═╝    ╚═════╝ ╚═════╝
```

**A browser-based Trading Card Game with a full Casino, cloud sync, and zero external assets.**

<br/>

🌐 **Language / Sprache:**
&nbsp;[🇬🇧 English](#-english) &nbsp;·&nbsp; [🇩🇪 Deutsch](#-deutsch)

</div>

---

<br/>

# 🇬🇧 English

## ✦ What is Cozy TCG?

Cozy TCG is a fully browser-based Trading Card Game built with plain HTML, CSS, and JavaScript — no framework, no build step, no external audio assets. It features a complete card collection system, a separate Casino with Blackjack, cloud sync via Firebase, a title/achievement system, and every sound effect is generated live using the Web Audio API.

<br/>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Card System](#-card-system)
- [Casino](#-casino)
- [Redeem Codes](#-redeem-codes)
- [Title System](#-title-system)
- [Firebase Setup](#-firebase-setup)
- [Firestore Rules](#-firestore-rules)
- [SFX System](#-sfx-system)
- [Configuration](#-configuration)

<br/>

## ✨ Features

### 🃏 Trading Card Game
| Feature | Details |
|---|---|
| **Rarities** | Common · Rare · Epic · Mythical · Legendary · SSSR · Hidden · Prismatic |
| **Card Classes** | Skibidi · Gigachad · BabyOil · NPC · Rizzlord · Yapper · Aura · Delulu · Crashout · LetHimCook · Sus · NegativeAura · Legend |
| **Shiny Cards** | ~1-in-222 chance per card (adjustable via `SHINY_CHANCE`) |
| **Pack Types** | Standard · Advanced · Premium · Prismatic (timed cooldowns) + Special Inventory Packs |
| **Luck System** | Upgradeable luck stat that boosts rarity weights |
| **Quests** | Progress-tracked quest system with coin/pack rewards |
| **Battle System** | PvP fight tracking with win/loss stats |
| **Gifting** | Send coins and packs to other players via mailbox |
| **Showcase** | Pin up to N favourite cards on your public profile |
| **Cloud Sync** | Full save/load to Firebase with profile picture support |
| **Redeem Codes** | SHA-1 hashed codes with expiry dates and category grouping |

### 🎰 Casino
| Feature | Details |
|---|---|
| **Blackjack** | Full 6-deck Blackjack with Hit · Stand · Double · Split · Insurance |
| **Underground Mode** | High-stakes mode (1.5× win multiplier, 3× Blackjack) — requires tickets |
| **Private Tables** | Create or join rooms with a 4-digit code + live in-room chat |
| **Leaderboard** | Public chip leaderboard synced to Firestore |
| **Casino Titles** | Stat-unlocked titles (rounds, wins, blackjacks, chips, underground) |
| **Prismatic Buffs** | Equipped TCG cards grant passive casino bonuses (coinMult, cashback, push saver …) |
| **Theme Shop** | Purchasable table themes |
| **Bundle Shop** | Buy casino chips with TCG coins |
| **VIP System** | Title-based VIP access with unlimited chip purchases |

<br/>

## 🛠 Tech Stack

```
Frontend    → Vanilla HTML5 / CSS3 / JavaScript (ES2020+)
Backend     → Firebase v9 (Firestore, Authentication)
Audio       → Web Audio API — 100% synthetic, zero file downloads
Hashing     → SubtleCrypto (SHA-256 entry screen) · Custom SHA-1 (redeem codes)
Storage     → localStorage (local) + Firestore (cloud)
```

> **Zero dependencies.** No npm, no bundler, no CDN for audio or UI libraries.

<br/>

## 📁 Project Structure

```
/
├── index.html        ← Main TCG app (collection, packs, shop, profile, quests)
├── casino.html       ← Casino app (Blackjack, leaderboard, themes, chat)
├── codes.js          ← Redeem code hashes, expiry system, casino code handler
├── titles.js         ← Full title database + unlock logic + profile modal
└── packs.js          ← Special pack configurations and card pool definitions
```

<br/>

## 🎴 Card System

### Rarities & Weights
```js
Common    700  │  sell:     5  │  color: #8AACBC
Rare      200  │  sell:    30  │  color: #6AB2FF
Epic       70  │  sell:   120  │  color: #BA7CFF
Mythical   20  │  sell:   450  │  color: #FF6E9E
Legendary   8  │  sell: 1,500  │  color: #EEC060
SSSR        2  │  sell: 6,000  │  color: #48EEB8
Hidden      —  │  sell: 9,999  │  color: #ff96bc  (code/quest only)
Prismatic   —  │  sell: 50,000 │  color: #d966ff  (special packs only)
```

### Shiny Cards
Every drawn card has a `SHINY_CHANCE` (default `0.0045` ≈ 1-in-222) of being shiny. Set to `0` in `index.html` to disable entirely.

<br/>

## 🎰 Casino

### Blackjack Rules
- 6-deck shoe, reshuffled when < 15% remain
- Dealer stands on soft 17
- Double down, Split (matching values), Insurance (on dealer Ace/face)
- **Underground mode** applies 1.5× win multiplier and 3× Blackjack payout

### Chip Economy
```
Chips are separate from TCG coins.
Bundles:  10 / 25 / 50 / 100 / 250 / 500 chips  (1 chip = 1,000 TCG coins)
VIP:      Unlimited chip purchase (requires VIP title)
Daily limit applies to non-VIP players.
```

<br/>

## 🔑 Redeem Codes

Codes are stored in `codes.js` as **SHA-1 hashes** (always uppercased before hashing). Each code has an expiry field:

```js
// expires: 0          → never expires (default)
// expires: 1798761599000  → Unix timestamp in ms (Date.now() format)

const ACTIVE_SEASON_CODES = {
  "89a382df7d1987321fb34ce448eb4a06b4ee5d68": {   // "freecoins"
    coins:   1000,
    expires: 0,
    msg:     "✨ +1,000 coins!",
  },
  // …
};
```

**Code groups:**

| Constant | Purpose |
|---|---|
| `SYSTEM_CODES` | Admin-only codes |
| `ARCHIVE_CODES` | Old event codes (still valid, no longer advertised) |
| `ACTIVE_SEASON_CODES` | Currently promoted codes |
| `CASINO_CODES` | Casino-exclusive: chips, casino packs, casino titles |

All groups are merged into `window.CODE_HASHES` via spread operator at the bottom of `codes.js`. The helper `window.isCodeExpired(reward)` is used by both `index.html` and `casino.html` before applying any reward.

**Supported reward types:** `hidden` · `id_reward` · `godpack` · `admin` · `packs` · `title` · `chips` · `casino_pack` · `casino_title`

<br/>

## 🏅 Title System

Titles live entirely in `titles.js` under `window.TITLES_DATABASE`. Each title has:

```js
{
  id:               'ct_highroller',
  name:             'High Roller',
  rarity:           'Epic',
  icon:             '💰',
  category:         'casino',          // tcg | casino | code | special
  unlockCondition:  { type: 'casino_stat', stat: 'chips', value: 10000 },
  reqText:          'Own 10,000 chips',
  boost: { luck: 1.05, coinMult: 1.08, packLuck: 0.02, shinyBoost: 1.02 },
}
```

**Categories:**

| Category | Unlock method |
|---|---|
| `tcg` | TCG stats (collection size, packs opened, etc.) |
| `casino` | Casino stats (rounds, wins, blackjacks, chips, underground wins) |
| `code` | Redeem codes only (`type: 'code_granted'`) |
| `special` | Admin-only / manual grant (`type: 'admin_only'`) |

Title boosts are applied globally to pack luck, shiny chance, coin multipliers, and casino payouts.

<br/>

## 🔥 Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Replace the Firebase config in `index.html` and `casino.html`:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

<br/>

## 🛡 Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /usernames/{username} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }
    match /mailbox/{msgId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null;
    }
    match /profiles/{username} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /casino_players/{userId} {
      allow read:  if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /casino_leaderboard/{userId} {
      allow read:  if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    // … (games, casino_tables — see full rules in repo)
  }
}
```

> **Note:** `profiles/{username}` is publicly readable so other players can view your stats, avatar, and showcase. Sensitive data (collection, coins) lives only in `users/{uid}` which is private.

<br/>

## 🔊 SFX System

All sound effects are **synthesised at runtime** using the Web Audio API — no audio files, no network requests.

### index.html sounds
| Name | Character | Trigger |
|---|---|---|
| `click` | Sine tap 640→280 Hz | Buttons |
| `flip` | Noise bandpass whoosh | Card flip |
| `pull` | Low thump + rising shimmer | Pack open |
| `rare` | 4-note ascending arpeggio | Rare reveal |
| `sssr` | 7-tone power chord + sparkle | SSSR reveal |
| `collect` | C-E-G chime cascade | Collect cards |
| `error` | Square buzz descending | Error states |
| `coin` | High sine double clink | Coin reward |
| `redeem` | 5-note success jingle | Code redeemed |
| `sell` | Sine sweep 880→440 Hz | Sell cards |

### casino.html sounds
| Name | Character | Trigger |
|---|---|---|
| `deal` | 4× card swoosh (rhythmic) | Deal hand |
| `card` | Crisp single swish | Hit / dealer draw |
| `bet` | Triangle chip tap | Bet buttons |
| `double` | Sawtooth power punch × 3 | Double down |
| `split` | Two-note scissors | Split |
| `insurance` | Shield hum (440→528 Hz) | Take insurance |
| `bj` | 5+3 note chord + sparkle | Blackjack (21) |
| `win` | Triumphant 4-note arpeggio | Win round |
| `push` | Neutral double ping | Push / tie |
| `lose` | Sad descend (2 tones) | Lose round |
| `bust` | Sawtooth crash 300→60 Hz | Bust (> 21) |
| `chip` | Coin cascade (4 tones) | Buy chips |
| `unlock` | Ascending twinkle | Buy theme / ticket |
| `underground` | Low rumble + eerie glide | Enter underground |
| `tab` | Minimal blip | Switch tab |
| `redeem` | 5-note jingle | Code redeemed |
| `collect` | 4-note chime cascade | Collect gifts |
| `error` | Square buzz × 2 | All error states |

<br/>

## ⚙️ Configuration

Key constants at the top of `index.html`:

```js
const SHINY_CHANCE = 0.0045;   // Shiny pull probability (0 = disabled)
const MAX_LUCK     = 25.0;     // Maximum luck stat
const LUCK_BASE    = 80;       // Base cost of first luck upgrade
const LUCK_MULT    = 1.55;     // Cost multiplier per luck level
```

Key constants at the top of `casino.html`:

```js
const CHIPS_START    = 1500;   // Starting chips for new players
const DAILY_LIMIT    = 1000;   // Max chips non-VIP can buy per day
const COINS_PER_CHIP = 1000;   // TCG coin cost per 1 chip
```

---

<br/><br/>

# 🇩🇪 Deutsch

## ✦ Was ist Cozy TCG?

Cozy TCG ist ein vollständig browserbasiertes Trading Card Game — gebaut mit reinem HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt, keine externen Audio-Assets. Es beinhaltet ein komplettes Karten-Sammelsystem, ein separates Casino mit Blackjack, Cloud-Sync via Firebase, ein Titel- und Achievement-System, und alle Soundeffekte werden live über die Web Audio API generiert.

<br/>

## 📋 Inhaltsverzeichnis

- [Features](#-features-1)
- [Tech-Stack](#-tech-stack-1)
- [Projektstruktur](#-projektstruktur)
- [Kartensystem](#-kartensystem)
- [Casino](#-casino-1)
- [Redeem Codes](#-redeem-codes-1)
- [Titel-System](#-titel-system)
- [Firebase-Setup](#-firebase-setup-1)
- [Firestore-Regeln](#-firestore-regeln)
- [SFX-System](#-sfx-system-1)
- [Konfiguration](#-konfiguration)

<br/>

## ✨ Features

### 🃏 Trading Card Game
| Feature | Details |
|---|---|
| **Seltenheiten** | Common · Rare · Epic · Mythical · Legendary · SSSR · Hidden · Prismatic |
| **Karten-Klassen** | Skibidi · Gigachad · BabyOil · NPC · Rizzlord · Yapper · Aura · Delulu · Crashout · LetHimCook · Sus · NegativeAura · Legend |
| **Shiny-Karten** | ~1-zu-222 Chance pro Karte (einstellbar via `SHINY_CHANCE`) |
| **Pack-Typen** | Standard · Advanced · Premium · Prismatic (Timer-Cooldowns) + spezielle Inventar-Packs |
| **Glücks-System** | Aufrüstbarer Luck-Stat der die Seltenheits-Gewichte beeinflusst |
| **Quests** | Fortschritts-Quests mit Münz- und Pack-Belohnungen |
| **Kampfsystem** | PvP-Kampf-Tracking mit Sieg/Niederlagen-Statistiken |
| **Geschenke** | Münzen und Packs an andere Spieler verschicken (Postfach) |
| **Showcase** | Lieblingskarten auf dem öffentlichen Profil pinnen |
| **Cloud-Sync** | Vollständiges Speichern/Laden via Firebase inkl. Profilbild |
| **Redeem Codes** | SHA-1-gehashte Codes mit Ablaufdatum und Kategorie-Grouping |

### 🎰 Casino
| Feature | Details |
|---|---|
| **Blackjack** | Vollständiges 6-Deck-Blackjack mit Hit · Stand · Double · Split · Insurance |
| **Underground-Modus** | Hochrisiko-Modus (1,5× Gewinn-Multiplikator, 3× Blackjack) — benötigt Tickets |
| **Private Tische** | Raum erstellen oder beitreten per 4-stelligem Code + Live-Chat |
| **Rangliste** | Öffentliche Chip-Rangliste synchronisiert mit Firestore |
| **Casino-Titel** | Stat-freigeschaltete Titel (Runden, Siege, Blackjacks, Chips, Underground) |
| **Prismatische Buffs** | Ausgerüstete TCG-Karten gewähren passive Casino-Boni (coinMult, Cashback, Push-Saver …) |
| **Theme-Shop** | Kaufbare Tisch-Themes |
| **Bundle-Shop** | Casino-Chips mit TCG-Münzen kaufen |
| **VIP-System** | Titelbasierter VIP-Zugang mit unlimitierten Chip-Käufen |

<br/>

## 🛠 Tech-Stack

```
Frontend    → Vanilla HTML5 / CSS3 / JavaScript (ES2020+)
Backend     → Firebase v9 (Firestore, Authentication)
Audio       → Web Audio API — 100% synthetisch, keine Datei-Downloads
Hashing     → SubtleCrypto (SHA-256 Startbildschirm) · Custom SHA-1 (Redeem Codes)
Speicher    → localStorage (lokal) + Firestore (Cloud)
```

> **Null Abhängigkeiten.** Kein npm, kein Bundler, keine CDN-Bibliotheken für Audio oder UI.

<br/>

## 📁 Projektstruktur

```
/
├── index.html        ← Haupt-TCG-App (Sammlung, Packs, Shop, Profil, Quests)
├── casino.html       ← Casino-App (Blackjack, Rangliste, Themes, Chat)
├── codes.js          ← Redeem-Code-Hashes, Ablauf-System, Casino-Code-Handler
├── titles.js         ← Vollständige Titel-Datenbank + Freischalt-Logik + Profil-Modal
└── packs.js          ← Spezial-Pack-Konfigurationen und Karten-Pool-Definitionen
```

<br/>

## 🎴 Kartensystem

### Seltenheiten & Gewichte
```js
Common    700  │  Verkauf:     5  │  Farbe: #8AACBC
Rare      200  │  Verkauf:    30  │  Farbe: #6AB2FF
Epic       70  │  Verkauf:   120  │  Farbe: #BA7CFF
Mythical   20  │  Verkauf:   450  │  Farbe: #FF6E9E
Legendary   8  │  Verkauf: 1.500  │  Farbe: #EEC060
SSSR        2  │  Verkauf: 6.000  │  Farbe: #48EEB8
Hidden      —  │  Verkauf: 9.999  │  Farbe: #ff96bc  (nur Code/Quest)
Prismatic   —  │  Verkauf: 50.000 │  Farbe: #d966ff  (nur Spezial-Packs)
```

### Shiny-Karten
Jede gezogene Karte hat eine `SHINY_CHANCE` (Standard `0.0045` ≈ 1-zu-222) Shiny zu sein. Auf `0` setzen um Shinys vollständig zu deaktivieren.

<br/>

## 🎰 Casino

### Blackjack-Regeln
- 6-Deck-Schuh, neu gemischt wenn < 15% übrig
- Dealer steht auf Soft 17
- Double Down, Split (gleiche Kartenwerte), Insurance (bei Dealer Ass/Bild)
- **Underground-Modus** gibt 1,5× Gewinn-Multiplikator und 3× Blackjack-Auszahlung

### Chip-Wirtschaft
```
Chips sind von TCG-Münzen getrennt.
Bundles:      10 / 25 / 50 / 100 / 250 / 500 Chips  (1 Chip = 1.000 TCG-Münzen)
VIP:          Unlimitierter Chip-Kauf (benötigt VIP-Titel)
Tageslimit:   Gilt für Nicht-VIP-Spieler.
```

<br/>

## 🔑 Redeem Codes

Codes werden in `codes.js` als **SHA-1-Hashes** gespeichert (vor dem Hashing immer in Großbuchstaben). Jeder Code hat ein `expires`-Feld:

```js
// expires: 0               → läuft nie ab (Standard)
// expires: 1798761599000   → Unix-Timestamp in ms (Date.now()-Format)

const ACTIVE_SEASON_CODES = {
  "89a382df7d1987321fb34ce448eb4a06b4ee5d68": {   // "freecoins"
    coins:   1000,
    expires: 0,
    msg:     "✨ +1.000 Münzen!",
  },
};
```

**Code-Gruppen:**

| Konstante | Zweck |
|---|---|
| `SYSTEM_CODES` | Nur für Admins |
| `ARCHIVE_CODES` | Ältere Event-Codes (noch gültig, nicht mehr beworben) |
| `ACTIVE_SEASON_CODES` | Aktuell beworbene Codes |
| `CASINO_CODES` | Casino-exklusiv: Chips, Casino-Packs, Casino-Titel |

Alle Gruppen werden am Ende von `codes.js` per Spread-Operator in `window.CODE_HASHES` zusammengeführt. Der Helper `window.isCodeExpired(reward)` wird von `index.html` und `casino.html` vor jeder Belohnungsausgabe aufgerufen.

**Unterstützte Belohnungstypen:** `hidden` · `id_reward` · `godpack` · `admin` · `packs` · `title` · `chips` · `casino_pack` · `casino_title`

<br/>

## 🏅 Titel-System

Alle Titel leben in `titles.js` unter `window.TITLES_DATABASE`. Jeder Titel hat:

```js
{
  id:               'ct_highroller',
  name:             'High Roller',
  rarity:           'Epic',
  icon:             '💰',
  category:         'casino',          // tcg | casino | code | special
  unlockCondition:  { type: 'casino_stat', stat: 'chips', value: 10000 },
  reqText:          'Own 10,000 chips',
  boost: { luck: 1.05, coinMult: 1.08, packLuck: 0.02, shinyBoost: 1.02 },
}
```

**Kategorien:**

| Kategorie | Freischalt-Methode |
|---|---|
| `tcg` | TCG-Stats (Sammlungsgröße, geöffnete Packs usw.) |
| `casino` | Casino-Stats (Runden, Siege, Blackjacks, Chips, Underground-Siege) |
| `code` | Nur per Redeem Code (`type: 'code_granted'`) |
| `special` | Nur Admin/manuell (`type: 'admin_only'`) |

Titel-Boosts wirken sich global auf Pack-Glück, Shiny-Chance, Münz-Multiplikatoren und Casino-Auszahlungen aus.

<br/>

## 🔥 Firebase-Setup

1. Projekt anlegen unter [console.firebase.google.com](https://console.firebase.google.com)
2. **Authentication** aktivieren (E-Mail/Passwort)
3. **Firestore Database** aktivieren
4. Firebase-Config in `index.html` und `casino.html` ersetzen:

```js
const firebaseConfig = {
  apiKey:            "DEIN_API_KEY",
  authDomain:        "DEIN_PROJEKT.firebaseapp.com",
  projectId:         "DEIN_PROJEKT_ID",
  storageBucket:     "DEIN_PROJEKT.appspot.com",
  messagingSenderId: "DEINE_SENDER_ID",
  appId:             "DEINE_APP_ID"
};
```

<br/>

## 🛡 Firestore-Regeln

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Nur der eigene User darf lesen/schreiben
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /usernames/{username} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }
    match /mailbox/{msgId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null;
    }
    match /profiles/{username} {
      // Öffentlich lesbar für Profilansichten
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /casino_players/{userId} {
      allow read:  if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /casino_leaderboard/{userId} {
      allow read:  if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    // … (games, casino_tables — vollständige Regeln im Repo)
  }
}
```

> **Hinweis:** `profiles/{username}` ist öffentlich lesbar damit andere Spieler Stats, Avatar und Showcase sehen können. Sensible Daten (Sammlung, Münzen) liegen nur in `users/{uid}` und sind privat.

<br/>

## 🔊 SFX-System

Alle Soundeffekte werden **zur Laufzeit synthetisiert** via Web Audio API — keine Audio-Dateien, keine Netzwerk-Anfragen.

### index.html Sounds
| Name | Charakter | Ausgelöst bei |
|---|---|---|
| `click` | Sine-Tap 640→280 Hz | Buttons |
| `flip` | Noise-Bandpass-Whoosh | Karte umdrehen |
| `pull` | Tiefer Thump + aufsteigender Shimmer | Pack öffnen |
| `rare` | 4-Ton aufsteigendes Arpeggio | Rare-Enthüllung |
| `sssr` | 7-Ton-Powerchord + Sparkle | SSSR-Enthüllung |
| `collect` | C-E-G-Chime-Kaskade | Karten einsammeln |
| `error` | Square-Buzz absteigend | Fehlermeldungen |
| `coin` | Hoher Sine-Doppel-Clink | Münz-Belohnung |
| `redeem` | 5-Ton-Erfolgs-Jingle | Code eingelöst |
| `sell` | Sine-Sweep 880→440 Hz | Karten verkaufen |

### casino.html Sounds
| Name | Charakter | Ausgelöst bei |
|---|---|---|
| `deal` | 4× Karten-Swoosh (rhythmisch) | Hand austeilen |
| `card` | Einzelner knackiger Swish | Hit / Dealer zieht |
| `bet` | Triangle-Chip-Tap | Einsatz-Buttons |
| `double` | Sawtooth-Power-Punch × 3 | Double Down |
| `split` | Zwei-Noten Schere | Split |
| `insurance` | Shield-Hum (440→528 Hz) | Insurance nehmen |
| `bj` | 5+3-Ton-Chord + Sparkle | Blackjack (21) |
| `win` | Triumphierendes 4-Ton-Arpeggio | Runde gewonnen |
| `push` | Neutrales Doppel-Ping | Unentschieden |
| `lose` | Trauriges Descend (2 Töne) | Runde verloren |
| `bust` | Sawtooth-Crash 300→60 Hz | Bust (> 21) |
| `chip` | Münz-Kaskade (4 Töne) | Chips kaufen |
| `unlock` | Aufsteigendes Twinkle | Theme / Ticket kaufen |
| `underground` | Tiefer Rumble + ätherischer Gleiter | Underground betreten |
| `tab` | Minimaler Blip | Tab wechseln |
| `redeem` | 5-Ton-Jingle | Code eingelöst |
| `collect` | 4-Ton-Chime-Kaskade | Geschenke einsammeln |
| `error` | Square-Buzz × 2 | Alle Fehlermeldungen |

<br/>

## ⚙️ Konfiguration

Wichtige Konstanten am Anfang von `index.html`:

```js
const SHINY_CHANCE = 0.0045;   // Shiny-Wahrscheinlichkeit (0 = deaktiviert)
const MAX_LUCK     = 25.0;     // Maximaler Luck-Wert
const LUCK_BASE    = 80;       // Basis-Kosten des ersten Luck-Upgrades
const LUCK_MULT    = 1.55;     // Kosten-Multiplikator pro Luck-Level
```

Wichtige Konstanten am Anfang von `casino.html`:

```js
const CHIPS_START    = 1500;   // Start-Chips für neue Spieler
const DAILY_LIMIT    = 1000;   // Max. Chips die Nicht-VIPs pro Tag kaufen können
const COINS_PER_CHIP = 1000;   // TCG-Münzen-Kosten pro 1 Chip
```

---

<div align="center">

<br/>

Made with ✦ and Web Audio API &nbsp;·&nbsp; v2.2.1

</div>
