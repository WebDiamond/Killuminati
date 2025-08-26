import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Calcola le dimensioni responsive per il gamepad
const SCALE_FACTOR = Math.min(width / 1080, height / 1920);
const GAMEPAD_BOTTOM_MARGIN = Math.max(20, 30 * SCALE_FACTOR);
const GAMEPAD_HORIZONTAL_MARGIN = Math.max(20, 30 * SCALE_FACTOR);
const FIRE_BUTTON_SIZE = Math.max(70, 80 * SCALE_FACTOR);
const MOVE_BUTTON_SIZE = Math.max(60, 70 * SCALE_FACTOR);

interface GamepadProps {
  onFire: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onJump?: () => void;
}

export default function Gamepad({ 
  onFire, 
  onMoveLeft, 
  onMoveRight, 
  onJump 
}: GamepadProps) {
  return (
    <View style={styles.container}>
      {/* Controlli di movimento a sinistra */}
      <View style={styles.leftControls}>
        <TouchableOpacity
          style={styles.moveButton}
          onPress={onMoveLeft}
          activeOpacity={0.8}
        >
          <Text style={styles.moveButtonText}>←</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.moveButton}
          onPress={onMoveRight}
          activeOpacity={0.8}
        >
          <Text style={styles.moveButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Pulsante di fuoco a destra */}
      <TouchableOpacity
        style={styles.fireButton}
        onPress={onFire}
        activeOpacity={0.8}
      >
        <View style={styles.fireButtonInner}>
          <View style={styles.fireIcon} />
        </View>
      </TouchableOpacity>

      {/* Pulsante di salto (opzionale) */}
      {onJump && (
        <TouchableOpacity
          style={styles.jumpButton}
          onPress={onJump}
          activeOpacity={0.8}
        >
          <Text style={styles.jumpButtonText}>JUMP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: GAMEPAD_BOTTOM_MARGIN,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: GAMEPAD_HORIZONTAL_MARGIN,
    alignItems: 'flex-end',
  },
  leftControls: {
    flexDirection: 'row',
    gap: 15 * SCALE_FACTOR,
  },
  moveButton: {
    width: MOVE_BUTTON_SIZE,
    height: MOVE_BUTTON_SIZE,
    borderRadius: MOVE_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2 * SCALE_FACTOR,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 * SCALE_FACTOR },
    shadowOpacity: 0.3,
    shadowRadius: 4 * SCALE_FACTOR,
    elevation: 4,
  },
  moveButtonText: {
    color: '#ffffff',
    fontSize: 24 * SCALE_FACTOR,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
  fireButton: {
    position: 'absolute',
    bottom: 0,
    right: GAMEPAD_HORIZONTAL_MARGIN,
    width: FIRE_BUTTON_SIZE,
    height: FIRE_BUTTON_SIZE,
    borderRadius: FIRE_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderWidth: 3 * SCALE_FACTOR,
    borderColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 * SCALE_FACTOR },
    shadowOpacity: 0.3,
    shadowRadius: 8 * SCALE_FACTOR,
    elevation: 8,
  },
  fireButtonInner: {
    width: FIRE_BUTTON_SIZE * 0.75,
    height: FIRE_BUTTON_SIZE * 0.75,
    borderRadius: (FIRE_BUTTON_SIZE * 0.75) / 2,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireIcon: {
    width: FIRE_BUTTON_SIZE * 0.25,
    height: FIRE_BUTTON_SIZE * 0.25,
    backgroundColor: '#ffffff',
    borderRadius: 2 * SCALE_FACTOR,
  },
  jumpButton: {
    position: 'absolute',
    bottom: 0,
    right: GAMEPAD_HORIZONTAL_MARGIN + FIRE_BUTTON_SIZE + 15 * SCALE_FACTOR,
    width: MOVE_BUTTON_SIZE,
    height: MOVE_BUTTON_SIZE,
    borderRadius: MOVE_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
    borderWidth: 2 * SCALE_FACTOR,
    borderColor: '#00ff00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 * SCALE_FACTOR },
    shadowOpacity: 0.3,
    shadowRadius: 4 * SCALE_FACTOR,
    elevation: 4,
  },
  jumpButtonText: {
    color: '#ffffff',
    fontSize: 12 * SCALE_FACTOR,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
});
