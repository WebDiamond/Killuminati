import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAudio } from '../context/AudioContext';
import { ASSETS } from '../config/assets';

const { width, height } = Dimensions.get('window');

// Calcola le dimensioni responsive per il menu
const SCALE_FACTOR = Math.min(width / 1080, height / 1920);
const MENU_TITLE_FONT_SIZE = Math.max(32, 48 * SCALE_FACTOR);
const MENU_BUTTON_FONT_SIZE = Math.max(18, 24 * SCALE_FACTOR);
const BUTTON_WIDTH = Math.max(200, 300 * SCALE_FACTOR);
const BUTTON_HEIGHT = Math.max(60, 80 * SCALE_FACTOR);

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen() {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const { playButtonSound } = useAudio();

  const handlePlayPress = async () => {
    await playButtonSound();
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      {/* Logo del gioco */}
      <View style={styles.logoContainer}>
        <Image
          source={ASSETS.backgrounds.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>KILLUMINATI</Text>
      </View>

      {/* Menu principale */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPress}
          activeOpacity={0.8}
        >
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Infinite Adventure Awaits</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#479cde',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50 * SCALE_FACTOR,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50 * SCALE_FACTOR,
  },
  logo: {
    width: 200 * SCALE_FACTOR,
    height: 200 * SCALE_FACTOR,
    marginBottom: 20 * SCALE_FACTOR,
  },
  title: {
    fontSize: MENU_TITLE_FONT_SIZE,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2 * SCALE_FACTOR, height: 2 * SCALE_FACTOR },
    textShadowRadius: 4 * SCALE_FACTOR,
    letterSpacing: 2 * SCALE_FACTOR,
  },
  menuContainer: {
    alignItems: 'center',
  },
  playButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 3 * SCALE_FACTOR,
    borderColor: '#ffffff',
    borderRadius: BUTTON_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 * SCALE_FACTOR },
    shadowOpacity: 0.3,
    shadowRadius: 8 * SCALE_FACTOR,
    elevation: 8,
  },
  playButtonText: {
    fontSize: MENU_BUTTON_FONT_SIZE,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16 * SCALE_FACTOR,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
