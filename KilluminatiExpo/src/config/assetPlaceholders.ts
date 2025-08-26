// Sistema di placeholder per asset mancanti
// Fornisce alternative visive quando gli asset originali non sono disponibili

// Funzione per creare un placeholder colorato
export const createColorPlaceholder = (color: string, size: { width: number; height: number }, borderRadius?: number) => {
  return {
    width: size.width,
    height: size.height,
    backgroundColor: color,
    borderRadius: borderRadius || 0,
  };
};

// Funzione per ottenere un placeholder appropriato
export const getPlaceholder = (type: string, size?: { width: number; height: number }) => {
  switch (type) {
    case 'player':
      return createColorPlaceholder('#00ff00', size || { width: 40, height: 40 }, 20);
    case 'enemy':
      return createColorPlaceholder('#ff0000', size || { width: 30, height: 30 }, 15);
    case 'bullet':
      return createColorPlaceholder('#ffff00', size || { width: 10, height: 4 }, 2);
    case 'button':
      return createColorPlaceholder('#ffffff', size || { width: 100, height: 50 }, 25);
    case 'background':
      return createColorPlaceholder('#479cde', { width: 100, height: 100 }, 0);
    default:
      return createColorPlaceholder('#cccccc', { width: 50, height: 50 }, 25);
  }
};
