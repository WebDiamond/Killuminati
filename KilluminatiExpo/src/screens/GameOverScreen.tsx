import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAudio } from '../context/AudioContext';
import { useGame } from '../context/GameContext';
import ParticlesBackground from '../components/ParticlesBackground';
import { ASSETS } from '../config/assets';

const { width, height } = Dimensions.get('window');

type GameOverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameOver'>;
type GameOverScreenRouteProp = RouteProp<RootStackParamList, 'GameOver'>;

export default function GameOverScreen() {
  const navigation = useNavigation<GameOverScreenNavigationProp>();
  const route = useRoute<GameOverScreenRouteProp>();
  const { playButtonSound, playBackgroundMusic } = useAudio();
  const { state, dispatch } = useGame();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

  const { score, highScore } = route.params;

  useEffect(() => {
    // Avvia la musica di sottofondo
    playBackgroundMusic();

    // Animazioni di entrata
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(scoreAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackToMenu = async () => {
    await playButtonSound();
    dispatch({ type: 'RESET_GAME' });
    navigation.navigate('Menu');
  };

  const handlePlayAgain = async () => {
    await playButtonSound();
    dispatch({ type: 'RESET_GAME' });
    navigation.navigate('Game');
  };

  const isNewHighScore = score >= highScore;

  return (
    <View style={styles.container}>
      <ParticlesBackground />
      
             <View
         style={[styles.overlay, { backgroundColor: 'rgba(71, 156, 222, 0.8)' }]}
       >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.gameOverText}>GAME OVER</Text>
          
          <View style={styles.scoreContainer}>
            <Animated.Text
              style={[
                styles.scoreText,
                {
                  opacity: scoreAnim,
                  transform: [
                    {
                      scale: scoreAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {score}
            </Animated.Text>
            
            <Text style={styles.scoreLabel}>FINAL SCORE</Text>
          </View>

          {isNewHighScore && (
            <View style={styles.highScoreContainer}>
              <Text style={styles.highScoreText}>NEW HIGH SCORE!</Text>
                             <Image
                 source={ASSETS.interface.trophy}
                 style={styles.trophyIcon}
                 resizeMode="contain"
               />
            </View>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Previous Best</Text>
              <Text style={styles.statValue}>{highScore}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Current Score</Text>
              <Text style={styles.statValue}>{score}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePlayAgain}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>PLAY AGAIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleBackToMenu}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>MAIN MENU</Text>
            </TouchableOpacity>
          </View>
                 </Animated.View>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
    marginBottom: 40,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  highScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 30,
  },
  highScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  trophyIcon: {
    width: 30,
    height: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
    borderRadius: 15,
    minWidth: 120,
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
