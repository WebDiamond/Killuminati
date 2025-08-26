# Killuminati - Expo Game

Un gioco arcade 2D completo riscritto con Expo CLI e React Native, basato sul progetto originale Killuminati.

## 🎮 Caratteristiche del Gioco

### Modalità Principale
- **Gioco Arcade**: Combatti contro nemici con proiettili
- **Sistema di Punteggio**: Raccogli punti eliminando nemici
- **Livelli Dinamici**: Generazione procedurale di nemici e ostacoli
- **Effetti Visivi**: Particelle, esplosioni e animazioni

### Modalità Runner
- **Piattaforme**: Salta da piattaforma a piattaforma
- **Fisica Realistica**: Gravità e collisioni
- **Generazione Procedurale**: Piattaforme generate dinamicamente
- **Punteggio Basato sul Tempo**: Più a lungo sopravvivi, più punti ottieni

### Funzionalità Generali
- **Sistema Audio**: Effetti sonori e musica di sottofondo
- **Controlli Touch**: Joystick virtuale e pulsanti touch
- **Interfaccia Moderna**: UI responsive e animazioni fluide
- **Salvataggio Punteggi**: High score persistenti

## 🚀 Installazione e Esecuzione

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn
- Expo CLI installato globalmente
- Android Studio (per test su dispositivo Android)

### Installazione
```bash
# Installa le dipendenze
npm install

# Oppure con yarn
yarn install
```

### Esecuzione
```bash
# Avvia il server di sviluppo
npm start

# Oppure
expo start

# Per test su Android
npm run android

# Per test su iOS
npm run ios
```

## 📱 Struttura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Gamepad.tsx     # Controlli del gioco
│   ├── GameUI.tsx      # Interfaccia del gioco principale
│   ├── RunnerUI.tsx    # Interfaccia della modalità Runner
│   └── ParticlesBackground.tsx # Effetti particellari
├── context/            # Context React per lo stato globale
│   ├── GameContext.tsx # Stato del gioco
│   └── AudioContext.tsx # Gestione audio
├── screens/            # Schermate dell'app
│   ├── LoadingScreen.tsx
│   ├── MenuScreen.tsx
│   ├── GameScreen.tsx
│   ├── RunnerScreen.tsx
│   └── GameOverScreen.tsx
└── systems/            # Sistemi del motore di gioco
    ├── GameLoop.ts     # Loop principale del gioco
    ├── Renderer.ts     # Sistema di rendering
    ├── Physics.ts      # Sistema di fisica
    ├── InputHandler.ts # Gestione input
    └── Runner*.ts      # Sistemi per la modalità Runner
```

## 🎯 Controlli del Gioco

### Modalità Principale
- **Joystick Sinistro**: Movimento del giocatore
- **Pulsante Rosso**: Sparo proiettili
- **Frecce Direzionali**: Movimento alternativo

### Modalità Runner
- **Frecce Sinistra/Destra**: Movimento orizzontale
- **Pulsante Verde**: Salto
- **Touch Screen**: Controlli diretti

## 🔧 Tecnologie Utilizzate

- **React Native**: Framework per app mobili
- **Expo**: Piattaforma di sviluppo
- **React Native Game Engine**: Motore di gioco
- **TypeScript**: Linguaggio di programmazione
- **Expo AV**: Gestione audio
- **React Navigation**: Navigazione tra schermate

## 🎨 Personalizzazione

### Colori e Temi
I colori principali del gioco sono definiti nei file di stile:
- Blu principale: `#479cde`
- Blu secondario: `#2c95ff`
- Ciano: `#82fffd`

### Sprites e Asset
Gli asset del gioco sono organizzati in:
- `assets/images/`: Immagini e sprite
- `assets/sounds/`: Effetti sonori e musica

## 📊 Sistema di Punteggio

### Modalità Principale
- **Loominadi**: 1 punto
- **Cadooceadi**: 3 punti
- **Scarab**: 5 punti
- **Bombe/Shuriken**: 0 punti (ostacoli)

### Modalità Runner
- **1 punto al secondo** di sopravvivenza
- **Bonus** per salti precisi

## 🐛 Risoluzione Problemi

### Errori Comuni
1. **Dipendenze mancanti**: Esegui `npm install` per reinstallare
2. **Metro bundler**: Riavvia con `expo start --clear`
3. **Audio non funziona**: Verifica i permessi del dispositivo

### Debug
- Usa `console.log()` per debug
- Attiva il debugger di React Native
- Controlla i log di Expo

## 📈 Roadmap Futura

- [ ] Modalità multiplayer
- [ ] Più livelli e boss
- [ ] Power-up e bonus
- [ ] Achievements e statistiche
- [ ] Condivisione social
- [ ] Modalità survival infinita

## 🤝 Contributi

Il progetto è aperto a contributi! Per contribuire:
1. Fai un fork del repository
2. Crea un branch per la tua feature
3. Committa le modifiche
4. Crea una pull request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

## 🙏 Ringraziamenti

Basato sul progetto originale Killuminati, riscritto completamente per Expo e React Native.

---

**Divertiti a giocare! 🎮**
