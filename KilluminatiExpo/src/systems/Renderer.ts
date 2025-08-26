import { GameEngine } from 'react-native-game-engine';

export const Renderer = (entities: any, { time, dispatch }: any) => {
  // Aggiorna le particelle
  if (entities.particles) {
    entities.particles.forEach((particle: any) => {
      if (particle.position && particle.velocity) {
        particle.position.x += particle.velocity.x * (time.deltaTime / 1000);
        particle.position.y += particle.velocity.y * (time.deltaTime / 1000);
        
        // Riduci la vita della particella
        particle.life -= time.deltaTime;
        
        // Rimuovi particelle morte
        if (particle.life <= 0) {
          particle.dead = true;
        }
      }
    });
    
    // Filtra le particelle morte
    entities.particles = entities.particles.filter((particle: any) => !particle.dead);
  }

  // Aggiorna l'animazione dei nemici
  if (entities.enemies) {
    entities.enemies.forEach((enemy: any) => {
      if (enemy.type === 'loominadi' && enemy.renderer) {
        // Rotazione per i loominadi
        if (!enemy.rotation) enemy.rotation = 0;
        enemy.rotation += 0.1;
      }
      
      if (enemy.type === 'shuriken' && enemy.renderer) {
        // Rotazione per gli shuriken
        if (!enemy.rotation) enemy.rotation = 0;
        enemy.rotation += 0.3;
      }
    });
  }

  return entities;
};
