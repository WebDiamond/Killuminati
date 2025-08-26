import { GameEngine } from 'react-native-game-engine';
import { ASSETS } from '../config/assets';

export const InputHandler = (entities: any, { time, dispatch, events }: any) => {
  // Gestisci gli eventi di input
  if (events && events.length) {
    events.forEach((event: any) => {
      switch (event.type) {
        case 'FIRE_BULLET':
          createBullet(entities, dispatch);
          break;
        case 'MOVE_PLAYER':
          movePlayer(entities, event.payload);
          break;
        case 'JOYSTICK_MOVE':
          handleJoystickMove(entities, event.payload);
          break;
      }
    });
  }

  return entities;
};

const createBullet = (entities: any, dispatch: any) => {
  if (!entities.player || !entities.bullets) return;

  const player = entities.player;
  
  // Crea un nuovo proiettile
  const bullet = {
    id: `bullet_${Date.now()}`,
    position: {
      x: player.position.x + player.size.width,
      y: player.position.y + player.size.height / 2,
    },
    size: { width: 10, height: 4 },
    velocity: { x: 1000, y: 0 },
           renderer: {
         type: 'sprite',
         sprite: ASSETS.interface.bullet,
       },
    physics: {
      type: 'dynamic',
      gravity: 0,
    },
  };

  entities.bullets.push(bullet);
};

const movePlayer = (entities: any, direction: string) => {
  if (!entities.player) return;

  const player = entities.player;
  const speed = 200;

  switch (direction) {
    case 'up':
      player.velocity.y = -speed;
      break;
    case 'down':
      player.velocity.y = speed;
      break;
    case 'left':
      player.velocity.x = -speed;
      break;
    case 'right':
      player.velocity.x = speed;
      break;
    case 'stop':
      player.velocity.x = 0;
      player.velocity.y = 0;
      break;
  }
};

const handleJoystickMove = (entities: any, joystickData: any) => {
  if (!entities.player) return;

  const player = entities.player;
  const { x, y } = joystickData;
  const speed = 200;

  // Normalizza i valori del joystick
  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude > 0.1) {
    player.velocity.x = (x / magnitude) * speed;
    player.velocity.y = (y / magnitude) * speed;
  } else {
    player.velocity.x = 0;
    player.velocity.y = 0;
  }
};
