import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAudio } from '../context/AudioContext';
import { useGame } from '../context/GameContext';
import Gamepad from '../components/Gamepad';
import GameUI from '../components/GameUI';
import { ASSETS, getEnemySprite } from '../config/assets';

const { width, height } = Dimensions.get('window');

// Calcola le dimensioni responsive
const SCALE_FACTOR = Math.min(width / 1080, height / 1920);
const GAME_WIDTH = width;
const GAME_HEIGHT = height;
const PLAYER_SIZE = Math.max(30, 40 * SCALE_FACTOR);
const ENEMY_SIZE = Math.max(25, 30 * SCALE_FACTOR);
const BULLET_WIDTH = Math.max(8, 10 * SCALE_FACTOR);
const BULLET_HEIGHT = Math.max(3, 4 * SCALE_FACTOR);
const SECTION_WIDTH = GAME_WIDTH * 2; // Larghezza di ogni sezione del mondo
const WORLD_TOTAL_WIDTH = SECTION_WIDTH * 100; // Larghezza totale del mondo

// Interfacce per le entità del gioco
interface GameEntity {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  velocity: { x: number; y: number };
  renderer: {
    type: string;
    sprite?: any;
    color?: string;
  };
  physics: {
    type: string;
    mass?: number;
    gravity?: number;
  };
  input?: {
    type: string;
  };
  health?: number;
  points?: number;
  dead?: boolean;
  section?: number; // Sezione del mondo in cui si trova
}

interface GameEntities {
  player?: GameEntity;
  enemies: GameEntity[];
  bullets: GameEntity[];
  particles: GameEntity[];
  platforms: GameEntity[];
  collectibles: GameEntity[];
}

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

export default function GameScreen() {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const { playBulletSound, playHitSound, stopBackgroundMusic } = useAudio();
  const { state, dispatch } = useGame();
  const scrollViewRef = useRef<ScrollView>(null);
  const [gameState, setGameState] = useState({
    entities: {} as GameEntities,
    worldPosition: 0, // Posizione corrente nel mondo
    currentSection: 0, // Sezione corrente
    running: true,
  });

  useEffect(() => {
    // Ferma la musica di sottofondo
    stopBackgroundMusic();

    // Inizializza il gioco
    initializeGame();

    return () => {
      // Cleanup
    };
  }, []);

  const initializeGame = () => {
    const entities = {
      player: {
        id: 'player',
        position: { x: PLAYER_SIZE * 2, y: GAME_HEIGHT / 2 },
        size: { width: PLAYER_SIZE, height: PLAYER_SIZE },
        velocity: { x: 0, y: 0 },
        renderer: {
          type: 'sprite',
          sprite: ASSETS.interface.player,
        },
        physics: {
          type: 'dynamic',
          mass: 1,
        },
        input: {
          type: 'player',
        },
        section: 0,
      },
      enemies: [],
      bullets: [],
      particles: [],
      platforms: [],
      collectibles: [],
    };

    setGameState(prev => ({
      ...prev,
      entities,
    }));

    // Imposta i parametri del livello
    const requiredPoints = 10 + Math.round(5 * Math.random());
    const elapsedTime = 10 + Math.round(5 * Math.random());
    
    dispatch({ type: 'SET_REQUIRED_POINTS', payload: requiredPoints });
    dispatch({ type: 'SET_ELAPSED_TIME', payload: elapsedTime });
    dispatch({ type: 'SET_GAME_ACTIVE', payload: true });

    // Genera contenuti iniziali
    generateWorldContent(0);
  };

  const generateWorldContent = (sectionIndex: number) => {
    const sectionStartX = sectionIndex * SECTION_WIDTH;
    const sectionEndX = sectionStartX + SECTION_WIDTH;

    // Genera nemici per questa sezione
    const enemies = generateEnemiesForSection(sectionIndex, sectionStartX, sectionEndX);
    
    // Genera piattaforme per questa sezione
    const platforms = generatePlatformsForSection(sectionIndex, sectionStartX, sectionEndX);
    
    // Genera collezionabili per questa sezione
    const collectibles = generateCollectiblesForSection(sectionIndex, sectionStartX, sectionEndX);

    setGameState(prev => ({
      ...prev,
      entities: {
        ...prev.entities,
        enemies: [...(prev.entities.enemies || []), ...enemies],
        platforms: [...(prev.entities.platforms || []), ...platforms],
        collectibles: [...(prev.entities.collectibles || []), ...collectibles],
      },
    }));
  };

  const generateEnemiesForSection = (sectionIndex: number, startX: number, endX: number) => {
    const enemyTypes = [
      'loominadi',
      'scarab',
      'cadooceadi',
      'bomb',
      'shuriken',
    ];

    const enemies: GameEntity[] = [];
    const numEnemies = Math.floor(5 + 3 * SCALE_FACTOR); // Nemici per sezione

    for (let i = 0; i < numEnemies; i++) {
      const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const enemy = {
        id: `enemy_${sectionIndex}_${i}`,
        type,
        position: {
          x: startX + Math.random() * SECTION_WIDTH,
          y: Math.random() * (GAME_HEIGHT - ENEMY_SIZE * 2) + ENEMY_SIZE,
        },
        size: { width: ENEMY_SIZE, height: ENEMY_SIZE },
        velocity: {
          x: -(20 + Math.random() * 30) * SCALE_FACTOR,
          y: (10 + Math.random() * 20) * SCALE_FACTOR,
        },
        renderer: {
          type: 'sprite',
          sprite: getEnemySprite(type),
        },
        physics: {
          type: 'dynamic',
          mass: 1,
        },
        health: getEnemyHealth(type),
        points: getEnemyPoints(type),
        section: sectionIndex,
      };
      enemies.push(enemy);
    }

    return enemies;
  };

  const generatePlatformsForSection = (sectionIndex: number, startX: number, endX: number) => {
    const platforms: GameEntity[] = [];
    const numPlatforms = Math.floor(3 + 2 * SCALE_FACTOR);

    for (let i = 0; i < numPlatforms; i++) {
      const platform = {
        id: `platform_${sectionIndex}_${i}`,
        position: {
          x: startX + Math.random() * SECTION_WIDTH,
          y: GAME_HEIGHT - 100 - Math.random() * 200,
        },
        size: { width: 100 * SCALE_FACTOR, height: 20 * SCALE_FACTOR },
        velocity: { x: 0, y: 0 },
        renderer: {
          type: 'rectangle',
          color: '#8B4513',
        },
        physics: {
          type: 'static',
        },
        section: sectionIndex,
      };
      platforms.push(platform);
    }

    return platforms;
  };

  const generateCollectiblesForSection = (sectionIndex: number, startX: number, endX: number) => {
    const collectibles: GameEntity[] = [];
    const numCollectibles = Math.floor(2 + Math.random() * 3);

    for (let i = 0; i < numCollectibles; i++) {
      const collectible = {
        id: `collectible_${sectionIndex}_${i}`,
        position: {
          x: startX + Math.random() * SECTION_WIDTH,
          y: Math.random() * (GAME_HEIGHT - 100) + 50,
        },
        size: { width: 30 * SCALE_FACTOR, height: 30 * SCALE_FACTOR },
        velocity: { x: 0, y: 0 },
        renderer: {
          type: 'rectangle',
          color: '#FFD700',
        },
        physics: {
          type: 'static',
        },
        points: 10,
        section: sectionIndex,
      };
      collectibles.push(collectible);
    }

    return collectibles;
  };

  const getEnemyHealth = (type: string) => {
    switch (type) {
      case 'loominadi':
        return 1;
      case 'scarab':
        return 2;
      case 'cadooceadi':
        return 3;
      case 'bomb':
        return 1;
      case 'shuriken':
        return 1;
      default:
        return 1;
    }
  };

  const getEnemyPoints = (type: string) => {
    switch (type) {
      case 'loominadi':
        return 1;
      case 'scarab':
        return 5;
      case 'cadooceadi':
        return 3;
      case 'bomb':
        return 0;
      case 'shuriken':
        return 0;
      default:
        return 1;
    }
  };

  const handleFireBullet = async () => {
    await playBulletSound();
    
    const newBullet = {
      id: `bullet_${Date.now()}`,
      position: {
        x: (gameState.entities.player?.position?.x || PLAYER_SIZE * 2) + PLAYER_SIZE,
        y: (gameState.entities.player?.position?.y || GAME_HEIGHT / 2) + PLAYER_SIZE / 2,
      },
      size: { width: BULLET_WIDTH, height: BULLET_HEIGHT },
      velocity: { x: 800 * SCALE_FACTOR, y: 0 },
      renderer: {
        type: 'sprite',
        sprite: ASSETS.interface.bullet,
      },
      physics: {
        type: 'dynamic',
        gravity: 0,
      },
    };
    
    setGameState(prev => ({
      ...prev,
      entities: {
        ...prev.entities,
        bullets: [...(prev.entities.bullets || []), newBullet],
      },
    }));
  };

  const handleMovePlayer = (direction: 'left' | 'right' | 'jump') => {
    if (!gameState.entities.player) return;

    const moveDistance = 50 * SCALE_FACTOR;
    const jumpHeight = 100 * SCALE_FACTOR;

    setGameState(prev => {
      const player = prev.entities.player;
      if (!player) return prev;

      let newPosition = { ...player.position };

      switch (direction) {
        case 'left':
          newPosition.x = Math.max(0, player.position.x - moveDistance);
          break;
        case 'right':
          newPosition.x = Math.min(WORLD_TOTAL_WIDTH - PLAYER_SIZE, player.position.x + moveDistance);
          break;
        case 'jump':
          newPosition.y = Math.max(0, player.position.y - jumpHeight);
          break;
      }

      return {
        ...prev,
        entities: {
          ...prev.entities,
          player: {
            ...player,
            position: newPosition,
          },
        },
      };
    });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentSection = Math.floor(offsetX / SECTION_WIDTH);
    
    if (currentSection !== gameState.currentSection) {
      setGameState(prev => ({
        ...prev,
        worldPosition: offsetX,
        currentSection,
      }));
      
      // Genera contenuti per la nuova sezione se non esistono già
      if (!gameState.entities.enemies?.some(e => e.section === currentSection)) {
        generateWorldContent(currentSection);
      }
    }
  };

  const handleGameOver = () => {
    dispatch({ type: 'SET_LAST_SCORE', payload: state.score });
    if (state.score > state.highScore) {
      dispatch({ type: 'SET_HIGH_SCORE', payload: state.score });
    }
    
    navigation.navigate('GameOver', {
      score: state.score,
      highScore: Math.max(state.score, state.highScore),
    });
  };

  // Funzione per renderizzare le entità con scaling responsive
  const renderEntity = (entity: GameEntity) => {
    if (entity.dead) return null;

    // Applica scaling responsive alle posizioni e dimensioni
    const scaledPosition = {
      x: entity.position.x * SCALE_FACTOR,
      y: entity.position.y * SCALE_FACTOR,
    };

    const scaledSize = {
      width: entity.size.width * SCALE_FACTOR,
      height: entity.size.height * SCALE_FACTOR,
    };

    const style = {
      position: 'absolute' as const,
      left: scaledPosition.x,
      top: scaledPosition.y,
      width: scaledSize.width,
      height: scaledSize.height,
      zIndex: 1,
    };

    if (entity.renderer.type === 'sprite' && entity.renderer.sprite) {
      return (
        <Image
          key={entity.id}
          source={entity.renderer.sprite}
          style={style}
          resizeMode="contain"
        />
      );
    } else if (entity.renderer.type === 'rectangle' && entity.renderer.color) {
      return (
        <View
          key={entity.id}
          style={[
            style,
            {
              backgroundColor: entity.renderer.color,
              borderRadius: 5 * SCALE_FACTOR,
            },
          ]}
        />
      );
    } else {
      // Fallback per entità senza renderer
      return (
        <View
          key={entity.id}
          style={[
            style,
            {
              backgroundColor: '#ff0000',
              borderRadius: 5 * SCALE_FACTOR,
            },
          ]}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* ScrollView per il mondo infinito */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.worldContainer}
      >
        {/* Renderizza le entità del gioco */}
        <View style={styles.gameArea}>
          {gameState.entities.player && renderEntity(gameState.entities.player)}
          {gameState.entities.enemies?.map(enemy => renderEntity(enemy))}
          {gameState.entities.bullets?.map(bullet => renderEntity(bullet))}
          {gameState.entities.particles?.map(particle => renderEntity(particle))}
          {gameState.entities.platforms?.map(platform => renderEntity(platform))}
          {gameState.entities.collectibles?.map(collectible => renderEntity(collectible))}
        </View>
      </ScrollView>
      
      <GameUI />
      <Gamepad 
        onFire={handleFireBullet}
        onMoveLeft={() => handleMovePlayer('left')}
        onMoveRight={() => handleMovePlayer('right')}
        onJump={() => handleMovePlayer('jump')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#479cde',
  },
  worldContainer: {
    width: WORLD_TOTAL_WIDTH,
    height: GAME_HEIGHT,
  },
  gameArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WORLD_TOTAL_WIDTH,
    height: GAME_HEIGHT,
    zIndex: 0,
  },
});
