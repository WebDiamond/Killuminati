// Configurazione per i suoni del gioco
// Sistema che gestisce correttamente gli asset null

export const SOUND_CONFIG = {
  // Configurazione per i suoni
  sounds: {
    button: {
      enabled: false,
      volume: 0.5,
      loop: false,
    },
    enemyHit: {
      enabled: false,
      volume: 0.6,
      loop: false,
    },
    fireBullet: {
      enabled: false,
      volume: 0.4,
      loop: false,
    },
    gameOver: {
      enabled: false,
      volume: 0.7,
      loop: false,
    },
    background: {
      enabled: false,
      volume: 0.3,
      loop: true,
    },
  },
  
  // Configurazione generale audio
  global: {
    masterVolume: 0.5,
    soundEffectsEnabled: false,
    musicEnabled: false,
  },
};

// Funzione per verificare se un suono è abilitato
export const isSoundEnabled = (soundName: keyof typeof SOUND_CONFIG.sounds) => {
  return SOUND_CONFIG.sounds[soundName].enabled;
};

// Funzione per ottenere il volume di un suono
export const getSoundVolume = (soundName: keyof typeof SOUND_CONFIG.sounds) => {
  return SOUND_CONFIG.sounds[soundName].volume * SOUND_CONFIG.global.masterVolume;
};

// Funzione per verificare se i suoni sono abilitati globalmente
export const areSoundEffectsEnabled = () => {
  return SOUND_CONFIG.global.soundEffectsEnabled;
};

// Funzione per verificare se la musica è abilitata globalmente
export const isMusicEnabled = () => {
  return SOUND_CONFIG.global.musicEnabled;
};
