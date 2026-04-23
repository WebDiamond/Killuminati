# Killuminati — Unity Version Setup Guide

## Requisiti

| Tool | Link | Note |
|------|------|------|
| Unity Hub | https://unity.com/download | Gratuito |
| Unity 2022.3 LTS **o** Unity 6 LTS | Installa da Unity Hub | Scegli il modulo **Android Build Support** e **iOS Build Support** |
| Android SDK (auto-incluso) | — | Unity Hub lo installa automaticamente |
| Xcode *(solo per iOS)* | Mac App Store | Solo se compili per iOS su Mac |

---

## Passo 1 — Crea il Progetto Unity

1. Apri **Unity Hub**
2. Clicca **New Project**
3. Seleziona template: **2D (Core)**
4. Nome: `Killuminati`
5. Location: scegli dove vuoi
6. Clicca **Create Project**

---

## Passo 2 — Copia gli Script

Copia l'intera cartella `Assets/Scripts/` di questa repo dentro la cartella `Assets/` del tuo progetto Unity.

Struttura finale attesa:
```
Assets/
└── Scripts/
    ├── Core/
    │   ├── GameEngine.cs
    │   └── GameManager.cs
    ├── Gameplay/
    │   └── PlayerController.cs
    └── Rendering/
        ├── GameRenderer.cs
        └── SpritePainter.cs
```

Attendi che Unity compili tutti gli script (progress bar in basso).
Se ci sono errori, controlla la console (Window → General → Console).

---

## Passo 3 — Configura la Scena

1. Nel pannello **Hierarchy**, clicca con tasto destro → **Create Empty**
2. Rinomina il GameObject: `KilluminatiManager`
3. Con `KilluminatiManager` selezionato, vai nel pannello **Inspector**
4. Clicca **Add Component** → cerca `GameManager` → aggiungilo
5. Clicca **Add Component** → cerca `PlayerController` → aggiungilo

### Camera Setup
1. Seleziona la **Main Camera** in Hierarchy
2. Clicca **Add Component** → cerca `GameRenderer` → aggiungilo
3. Imposta i valori in Inspector:
   - `Game W`: `420`
   - `Game H`: `600` *(verrà aggiornato runtime in base allo schermo)*
   - `Offset X`: `0`
   - `Offset Y`: `40`

---

## Passo 4 — Build Settings

### Per Android
1. **File → Build Settings**
2. Seleziona **Android** → clicca **Switch Platform**
3. **Player Settings** (pulsante in basso a sinistra):
   - `Company Name`: il tuo nome
   - `Product Name`: `Killuminati`
   - `Package Name`: `com.tuonome.killuminati`
   - `Minimum API Level`: Android 7.0 (API 24)
   - `Target API Level`: Automatic
4. Torna in **Build Settings** → clicca **Build**
5. Unity genera un file `.apk` o `.aab` (selezionabile in Player Settings → Publishing)

### Per iOS
1. **File → Build Settings**
2. Seleziona **iOS** → clicca **Switch Platform**
3. **Player Settings**:
   - `Bundle Identifier`: `com.tuonome.killuminati`
   - `Target minimum iOS version`: `13.0`
4. Clicca **Build** → Unity genera un progetto **Xcode**
5. Apri il progetto Xcode su Mac → **Product → Archive** per pubblicare su App Store

> **Nota**: Per iOS serve un Mac con Xcode e un Apple Developer Account ($99/anno).
> Per Android basta un PC Windows con Unity installato — nessun account richiesto per APK sideload.

---

## Passo 5 — Test in Editor

Premi ▶ **Play** in Unity Editor per testare il gioco direttamente.

### Controlli da tastiera (Editor/Desktop):
| Tasto | Azione |
|-------|--------|
| ↑ o W | Dragon su |
| ↓ o S | Dragon giù |
| Spazio o F | Spara |
| Esc | Esci |

Su mobile: **swipe verticale** per muoversi, **tap** per sparare.

---

## Struttura del Codice

| File | Responsabilità |
|------|---------------|
| `GameEngine.cs` | Logica pura del gioco (port 1:1 di `engine.ts`) |
| `GameManager.cs` | Singleton FSM: gestisce schermate, punteggio, HiScore, OnGUI |
| `GameRenderer.cs` | Attach alla Camera: disegna tutti gli sprite via GL |
| `SpritePainter.cs` | Metodi statici di disegno per ogni sprite (Dragon, Pyramid, ecc.) |
| `PlayerController.cs` | Legge input touch/tastiera e chiama GameManager |

---

## Differenze rispetto alla versione Expo

| Aspetto | Expo | Unity |
|---------|------|-------|
| Linguaggio | TypeScript | C# |
| Sprite | SVG procedurale | GL procedurale |
| HiScore | AsyncStorage | PlayerPrefs |
| UI | React Native | OnGUI |
| Build iOS | EAS cloud | Xcode locale (Mac) |
| Build Android | EAS cloud | Unity Editor (Windows/Mac/Linux) |
| Account Apple | Obbligatorio | Obbligatorio solo per App Store |
| Dipendenze | npm | Nessuna |

---

## Troubleshooting

**Errore "Shader not found"** → Assicurati di usare Unity 2022.3+ o Unity 6. Lo shader `Hidden/Internal-Colored` è built-in.

**Schermo nero in Play mode** → Controlla che `GameRenderer` sia sulla Main Camera e che `GameManager` sia nella scena.

**Touch non funziona su device** → In Player Settings → Other Settings → verifica che `Active Input Handling` sia `Both` o `Input Manager (Old)`.
