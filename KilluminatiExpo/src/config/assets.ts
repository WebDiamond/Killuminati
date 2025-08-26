import { getPlaceholder } from './assetPlaceholders';

// Configurazione centralizzata per tutti gli asset del progetto
// Sistema completamente basato su placeholder per evitare problemi di runtime

export const ASSETS = {
  // Immagini di sfondo - tutti placeholder
  backgrounds: {
    main: getPlaceholder('background'),
    gameOver: getPlaceholder('background'),
    logo: getPlaceholder('background'),
  },
  
  // Immagini dei nemici - tutti placeholder
  enemies: {
    loominadi: getPlaceholder('enemy'),
    scarab: getPlaceholder('enemy'),
    cadooceadi: getPlaceholder('enemy'),
    bomb: getPlaceholder('enemy'),
    shuriken: getPlaceholder('enemy'),
  },
  
  // Immagini dell'interfaccia - tutti placeholder
  interface: {
    bullet: getPlaceholder('bullet'),
    player: getPlaceholder('player'),
    trophy: getPlaceholder('player'),
    explosion: getPlaceholder('enemy'),
    fail: getPlaceholder('enemy'),
    points: getPlaceholder('enemy'),
    timer: getPlaceholder('enemy'),
  },
  
  // Pulsanti - tutti placeholder
  buttons: {
    start: getPlaceholder('button'),
    credits: getPlaceholder('button'),
    info: getPlaceholder('button'),
    record: getPlaceholder('button'),
    refresh: getPlaceholder('button'),
  },
  
  // Suoni - tutti null per ora
  sounds: {
    button: null,
    enemyHit: null,
    fireBullet: null,
    gameOver: null,
  },
};

// Funzioni helper per ottenere asset specifici
export const getEnemySprite = (type: string) => {
  // Restituisci sempre un placeholder
  return getPlaceholder('enemy');
};

export const getBackgroundImage = (type: string) => {
  // Restituisci sempre un placeholder
  return getPlaceholder('background');
};

// Funzione per verificare se un asset è disponibile
export const isAssetAvailable = (asset: any) => {
  return asset !== null && asset !== undefined;
};

// Funzione per ottenere un asset con fallback
export const getAssetWithFallback = (asset: any, fallback: any) => {
  return isAssetAvailable(asset) ? asset : fallback;
};

// Funzione per ottenere un asset con placeholder appropriato
export const getAssetWithPlaceholder = (asset: any, type: string, size?: { width: number; height: number }) => {
  if (isAssetAvailable(asset)) return asset;
  return getPlaceholder(type, size);
};
