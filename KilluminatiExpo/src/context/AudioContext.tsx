import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SOUND_CONFIG, isSoundEnabled, areSoundEffectsEnabled, isMusicEnabled } from '../config/sounds';

interface AudioContextType {
  playButtonSound: () => Promise<void>;
  playHitSound: () => Promise<void>;
  playBulletSound: () => Promise<void>;
  playGameOverSound: () => Promise<void>;
  playBackgroundMusic: () => Promise<void>;
  stopBackgroundMusic: () => Promise<void>;
  isAudioLoaded: boolean;
  toggleSoundEffects: () => void;
  toggleMusic: () => void;
  soundEffectsEnabled: boolean;
  musicEnabled: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(SOUND_CONFIG.global.soundEffectsEnabled);
  const [musicEnabled, setMusicEnabled] = useState(SOUND_CONFIG.global.musicEnabled);

  useEffect(() => {
    // Simula il caricamento audio
    setTimeout(() => {
      setIsAudioLoaded(true);
    }, 100);
  }, []);

  const playButtonSound = async () => {
    if (soundEffectsEnabled && isSoundEnabled('button')) {
      console.log('🔊 Suono bottone riprodotto');
    } else {
      console.log('🔇 Suono bottone disabilitato');
    }
  };

  const playHitSound = async () => {
    if (soundEffectsEnabled && isSoundEnabled('enemyHit')) {
      console.log('🔊 Suono hit riprodotto');
    } else {
      console.log('🔇 Suono hit disabilitato');
    }
  };

  const playBulletSound = async () => {
    if (soundEffectsEnabled && isSoundEnabled('fireBullet')) {
      console.log('🔊 Suono proiettile riprodotto');
    } else {
      console.log('🔇 Suono proiettile disabilitato');
    }
  };

  const playGameOverSound = async () => {
    if (soundEffectsEnabled && isSoundEnabled('gameOver')) {
      console.log('🔊 Suono game over riprodotto');
    } else {
      console.log('🔇 Suono game over disabilitato');
    }
  };

  const playBackgroundMusic = async () => {
    if (musicEnabled && isSoundEnabled('background')) {
      console.log('🎵 Musica di sottofondo avviata');
    } else {
      console.log('🔇 Musica di sottofondo disabilitata');
    }
  };

  const stopBackgroundMusic = async () => {
    if (musicEnabled && isSoundEnabled('background')) {
      console.log('⏹️ Musica di sottofondo fermata');
    } else {
      console.log('🔇 Musica di sottofondo disabilitata');
    }
  };

  const toggleSoundEffects = () => {
    setSoundEffectsEnabled(prev => !prev);
  };

  const toggleMusic = () => {
    setMusicEnabled(prev => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
        playButtonSound,
        playHitSound,
        playBulletSound,
        playGameOverSound,
        playBackgroundMusic,
        stopBackgroundMusic,
        isAudioLoaded,
        toggleSoundEffects,
        toggleMusic,
        soundEffectsEnabled,
        musicEnabled,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
