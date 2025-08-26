import { GameEngine } from 'react-native-game-engine';

export const Physics = (entities: any, { time, dispatch }: any) => {
  const { deltaTime } = time;
  const dt = deltaTime / 1000;

  // Applica fisica al giocatore
  if (entities.player && entities.player.physics) {
    const player = entities.player;
    
    // Applica gravità
    if (player.physics.gravity) {
      player.velocity.y += player.physics.gravity * dt;
    }
    
    // Applica attrito
    if (player.physics.friction) {
      player.velocity.x *= (1 - player.physics.friction * dt);
      player.velocity.y *= (1 - player.physics.friction * dt);
    }
    
    // Limita la velocità massima
    if (player.physics.maxVelocity) {
      const maxVel = player.physics.maxVelocity;
      player.velocity.x = Math.max(-maxVel, Math.min(maxVel, player.velocity.x));
      player.velocity.y = Math.max(-maxVel, Math.min(maxVel, player.velocity.y));
    }
    
    // Aggiorna la posizione
    player.position.x += player.velocity.x * dt;
    player.position.y += player.velocity.y * dt;
    
    // Mantieni il giocatore sullo schermo
    if (player.position.x < 0) player.position.x = 0;
    if (player.position.x > 800 - player.size.width) player.position.x = 800 - player.size.width;
    if (player.position.y < 0) player.position.y = 0;
    if (player.position.y > 600 - player.size.height) player.position.y = 600 - player.size.height;
  }

  // Applica fisica ai nemici
  if (entities.enemies) {
    entities.enemies.forEach((enemy: any) => {
      if (enemy.physics && enemy.position && enemy.velocity) {
        // Applica gravità ai nemici volanti
        if (enemy.type === 'shuriken' || enemy.type === 'bomb') {
          enemy.velocity.y += 50 * dt;
        }
        
        // Aggiorna la posizione
        enemy.position.x += enemy.velocity.x * dt;
        enemy.position.y += enemy.velocity.y * dt;
        
        // Rimbalza sui bordi del mondo di gioco
        if (enemy.position.x <= 0 || enemy.position.x >= 3500) {
          enemy.velocity.x *= -1;
        }
        if (enemy.position.y <= 0 || enemy.position.y >= 3500) {
          enemy.velocity.y *= -1;
        }
      }
    });
  }

  // Applica fisica ai proiettili
  if (entities.bullets) {
    entities.bullets.forEach((bullet: any) => {
      if (bullet.physics && bullet.position && bullet.velocity) {
        // Applica gravità ai proiettili
        if (bullet.physics.gravity) {
          bullet.velocity.y += bullet.physics.gravity * dt;
        }
        
        // Aggiorna la posizione
        bullet.position.x += bullet.velocity.x * dt;
        bullet.position.y += bullet.velocity.y * dt;
      }
    });
  }

  return entities;
};
