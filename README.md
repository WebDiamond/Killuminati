# Killuminati — Expo SDK 54

## Requisiti
- **Node.js 20.19+** (requisito minimo SDK 54)
- Expo Go aggiornato a SDK 54

## Avvio rapido

```bash
cd killuminati-expo
npm install
npx expo start
```

Scansiona il QR con **Expo Go** (iOS/Android).

## Struttura
```
├── App.tsx              ← Schermata principale + rendering SVG
├── src/
│   ├── Sprites.tsx      ← Sprite SVG (react-native-svg)
│   └── engine.ts        ← Game engine (logica, collisioni, spawn)
├── app.json             ← Config Expo SDK 54 + New Architecture
├── package.json         ← Dipendenze SDK 54 compatibili
└── tsconfig.json
```

## SDK 54 — Versioni compatibili
| Pacchetto | Versione |
|-----------|----------|
| expo | ~54.0.9 |
| react | 19.1.0 |
| react-native | 0.81.4 |
| react-native-svg | ~15.11.2 |
| react-native-safe-area-context | ~5.6.0 |
| @react-native-async-storage/async-storage | ~2.2.0 |
| expo-asset | ~11.1.5 |
| expo-status-bar | ~2.2.3 |

## New Architecture
SDK 54 ha `newArchEnabled: true` in app.json. Questa è l'ultima versione che supporta la Legacy Architecture — SDK 55 la rimuoverà completamente.

## AdMob
In `App.tsx`, riga 14:
```ts
const ADMOB_ID = ""; // tuo Ad Unit ID
```

## Build APK
```bash
npm install -g eas-cli
eas build --platform android --profile preview
```
