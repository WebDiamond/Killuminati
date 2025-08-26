import { GameEngine } from 'react-native-game-engine';

export const GameLoop = (entities: any, { time, dispatch }: any) => {
  const { current, deltaTime } = time;
  
  // Aggiorna il tempo del gioco
  if (entities.gameState) {
    entities.gameState.totalTime += deltaTime;
    
    // Controlla se il tempo è scaduto
    if (entities.gameState.totalTime >= entities.gameState.elapsedTime * 1000) {
      dispatch({ type: 'GAME_OVER' });
    }
  }

  // Aggiorna la posizione della camera
  if (entities.camera) {
    entities.camera.position.x += 2;
    entities.camera.position.y += 1.5;
  }

  // Aggiorna i nemici
  if (entities.enemies) {
    entities.enemies.forEach((enemy: any) => {
      if (enemy.position && enemy.velocity) {
        enemy.position.x += enemy.velocity.x * (deltaTime / 1000);
        enemy.position.y += enemy.velocity.y * (deltaTime / 1000);
        
        // Rimuovi nemici fuori dallo schermo
        if (enemy.position.x < entities.camera.position.x - 100) {
          enemy.dead = true;
        }
      }
    });
    
    // Filtra i nemici morti
    entities.enemies = entities.enemies.filter((enemy: any) => !enemy.dead);
  }

  // Aggiorna i proiettili
  if (entities.bullets) {
    entities.bullets.forEach((bullet: any) => {
      if (bullet.position && bullet.velocity) {
        bullet.position.x += bullet.velocity.x * (deltaTime / 1000);
        bullet.position.y += bullet.velocity.y * (deltaTime / 1000);
        
        // Rimuovi proiettili fuori dallo schermo
        if (bullet.position.x > entities.camera.position.x + 800) {
          bullet.dead = true;
        }
      }
    });
    
    // Filtra i proiettili morti
    entities.bullets = entities.bullets.filter((bullet: any) => !bullet.dead);
  }

  // Controlla le collisioni
  checkCollisions(entities, dispatch);

  return entities;
};

const checkCollisions = (entities: any, dispatch: any) => {
  if (!entities.bullets || !entities.enemies) return;

  entities.bullets.forEach((bullet: any) => {
    entities.enemies.forEach((enemy: any) => {
      if (bullet.dead || enemy.dead) return;

      if (isColliding(bullet, enemy)) {
        // Gestisci la collisione
        handleCollision(bullet, enemy, entities, dispatch);
      }
    });
  });

  // Controlla collisioni giocatore-nemici
  if (entities.player && entities.enemies) {
    entities.enemies.forEach((enemy: any) => {
      if (enemy.dead) return;

      if (isColliding(entities.player, enemy)) {
        // Giocatore colpito
        dispatch({ type: 'GAME_OVER' });
      }
    });
  }
};

const isColliding = (obj1: any, obj2: any) => {
  if (!obj1.position || !obj2.position || !obj1.size || !obj2.size) return false;

  return (
    obj1.position.x < obj2.position.x + obj2.size.width &&
    obj1.position.x + obj1.size.width > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.size.height &&
    obj1.position.y + obj1.size.height > obj2.position.y
  );
};

const handleCollision = (bullet: any, enemy: any, entities: any, dispatch: any) => {
  // Marca entrambi come morti
  bullet.dead = true;
  enemy.dead = true;

  // Aggiungi particelle di esplosione
  if (!entities.particles) entities.particles = [];
  
  for (let i = 0; i < 5; i++) {
    entities.particles.push({
      id: `particle_${Date.now()}_${i}`,
      position: {
        x: enemy.position.x + Math.random() * 20 - 10,
        y: enemy.position.y + Math.random() * 20 - 10,
      },
      velocity: {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      },
      life: 1000,
      maxLife: 1000,
      renderer: {
        type: 'particle',
        color: '#ff0000',
        size: Math.random() * 3 + 1,
      },
    });
  }

  // Aggiorna il punteggio
  dispatch({ type: 'SCORE_UPDATE', payload: enemy.points || 1 });
  
  // Invia evento di hit
  dispatch({ type: 'ENEMY_HIT' });
};
