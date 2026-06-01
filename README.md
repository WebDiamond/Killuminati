# Dragon Strike

Un gioco mobile 2D side-scrolling sviluppato con **Expo** (React Native) e **Three.js** (WebGL) via WebView.

## Stack Tecnico

| Layer | Tecnologia |
|---|---|
| App shell | Expo SDK 54 / React Native |
| Rendering gioco | Three.js r158 (WebGL) in WebView |
| Scripting gioco | JavaScript ES5 auto-contenuto |
| Font | Google Fonts (Cinzel, Exo 2) |
| Storage | `localStorage` (hi score) |

## Architettura

```
App.tsx                  ← SafeAreaProvider + StatusBar
  └─ GameWebView.tsx     ← react-native-webview wrapper
       └─ gameHTML.ts    ← assembla l'HTML finale da parti
            ├─ html/css.ts        → stili di tutte le schermate
            ├─ html/htmlBody.ts   → struttura HTML (5 schermate)
            ├─ html/engine.ts     → motore di gioco (JS puro)
            ├─ html/sprites.ts    → disegno sprite Canvas 2D + texture Three.js
            ├─ html/renderer.ts   → Three.js: scene, camera, game loop
            └─ html/screens.ts    → gestione schermate, controlli, animazioni
```

### Bridge RN ↔ WebView

| Direzione | Evento | Dati |
|---|---|---|
| WebView → RN | `postMessage` | `{ type: "exit" }` |
| WebView → RN | `postMessage` | `{ type: "gameOver", score: s }` |

Lo **hi score** è gestito tramite `localStorage` direttamente nel WebView (nessun bridge necessario).

## Ads & Monetizzazione

### 1) AdMob in Expo

Nel progetto puoi usare `react-native-google-mobile-ads` per:

- un `RewardedAd` al primo avvio giornaliero
- un `InterstitialAd` al `gameOver`

Tutto il codice è già preparato e commentato in `App.tsx`.

#### Passaggi principali

1. Assicurati di avere installato:
   ```bash
   npx expo install @react-native-async-storage/async-storage
   npx expo install react-native-google-mobile-ads
   ```
   > Nota: `react-native-google-mobile-ads` è un modulo nativo, quindi con Expo Managed è necessario usare EAS Build o `expo prebuild`.
2. Con Expo Managed, usa EAS Build dopo l'installazione dei moduli nativi:
   ```bash
   eas build --platform android --profile preview
   ```
3. Inserisci i tuoi veri ID AdMob in `App.tsx`:
   - `DAILY_REWARD_AD_ID`
   - `GAME_OVER_INTERSTITIAL_ID`
3. Aggiungi la configurazione AdMob in `app.json`:
   ```json
   "plugins": [
     [
       "react-native-google-mobile-ads",
       {
         "androidAppId": "ca-app-pub-3940256099942544~3347511713",
         "iosAppId": "ca-app-pub-3940256099942544~1458002511"
       }
     ]
   ]
   ```
   Questi sono gli App ID di test ufficiali Google. Sostituiscili con i tuoi App ID reali prima della pubblicazione.
   
    Nota: Ho aggiunto il plugin `react-native-google-mobile-ads` in `app.json` con App ID di test per evitare crash nativi nelle build EAS. Mantieni il codice AdMob commentato finché non sei pronto a pubblicare.
4. Per il testing usa gli ID `TestIds` forniti da Google Mobile Ads nel codice JavaScript.
5. Con Expo Managed + moduli nativi, usa EAS Build:
   ```bash
   eas build --platform android --profile preview
   ```

### 2) A-Ads con Expo

`a-ads` non ha un SDK mobile React Native ufficiale, quindi in Expo lo devi usare come contenuto web:

- apri l'annuncio in una `WebView` o con `Linking.openURL`
- gestisci la ricompensa BTC al ritorno nell'app
- non esiste un equivalente diretto a `RewardedAd` nativo

#### Esempio di flusso possibile

1. L'utente clicca su un pulsante "Guadagna BTC".
2. L'app apre una pagina `a-ads` in una `WebView`.
3. Alla chiusura della WebView, assegni la ricompensa in-game.

> Nota: per `a-ads` il tracking della visualizzazione deve essere gestito lato web; in app Expo serve solo il contenitore WebView / URL.

## Build (EAS)

```bash
# Android
eas build --platform android --profile preview

# iOS
eas build --platform ios --profile preview
```

Vedi `COMPILE.md` per la guida completa alla compilazione.

## Schermate

- **Splash** — Piramide animata su sfondo nero (Canvas 2D)
- **Menu** — Sprites animati, titolo, pulsanti GIOCA / INFO / ESCI
- **Info** — Guida ai nemici e ai controlli
- **Gioco** — Three.js WebGL + HUD + barra comandi touch
- **Game Over** — Punteggio, record, Riprova / Home / Esci

## Nemici & Hazard

| Sprite | Tipo | Effetto |
|---|---|---|
| ▲ Loominadi | Nemico | -1 kill |
| ⚕ Cadooceadis | Nemico | -3 kills |
| ◉ Scarab | Nemico | -5 secondi al timer |
| 💣 Bomba | Hazard | game over al contatto |
| ✦ Shuriken | Hazard | game over al contatto |

## Setup & Avvio

```bash
# Installa dipendenze
npm install

# Avvia in development
npx expo start
```

> **Nota:** Il WebView carica Three.js e i Google Fonts via CDN (jsdelivr / fonts.googleapis.com).  
> È richiesta la connessione internet al **primo avvio**. Le risorse vengono poi messe in cache dal browser.

## Struttura File

```
├── App.tsx                  # Entry point (semplificato)
├── src/
│   ├── GameWebView.tsx      # Componente WebView
│   ├── gameHTML.ts          # Assembler HTML
│   └── html/
│       ├── css.ts           # Stili CSS
│       ├── htmlBody.ts      # Struttura HTML
│       ├── engine.ts        # Motore di gioco
│       ├── sprites.ts       # Sprite Canvas 2D
│       ├── renderer.ts      # Three.js renderer
│       └── screens.ts       # Schermate & controlli
├── assets/                  # Icone e splash screen Expo
├── app.json                 # Configurazione Expo
└── eas.json                 # Configurazione EAS Build
```
