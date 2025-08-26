import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useGame } from '../context/GameContext';

const { width, height } = Dimensions.get('window');

// Calcola le dimensioni responsive per l'UI
const SCALE_FACTOR = Math.min(width / 1080, height / 1920);
const UI_TOP_PADDING = Math.max(30, 50 * SCALE_FACTOR);
const UI_HORIZONTAL_PADDING = Math.max(15, 20 * SCALE_FACTOR);
const UI_VERTICAL_PADDING = Math.max(8, 10 * SCALE_FACTOR);
const UI_LABEL_FONT_SIZE = Math.max(10, 12 * SCALE_FACTOR);
const UI_VALUE_FONT_SIZE = Math.max(18, 24 * SCALE_FACTOR);
const UI_SMALL_FONT_SIZE = Math.max(8, 10 * SCALE_FACTOR);
const UI_PROGRESS_HEIGHT = Math.max(15, 20 * SCALE_FACTOR);
const UI_INDICATOR_SIZE = Math.max(6, 8 * SCALE_FACTOR);

export default function GameUI() {
  const { state } = useGame();

  return (
    <View style={styles.container}>
      {/* Pannello superiore */}
      <View style={styles.topPanel}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{state.score}</Text>
        </View>

        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>LEVEL</Text>
          <Text style={styles.levelValue}>{state.currentLevel}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>TIME</Text>
          <Text style={styles.timeValue}>
            {Math.max(0, state.elapsedTime - state.totalTime)}
          </Text>
        </View>
      </View>

      {/* Pannello inferiore */}
      <View style={styles.bottomPanel}>
        <View style={styles.requiredContainer}>
          <Text style={styles.requiredLabel}>REQUIRED</Text>
          <Text style={styles.requiredValue}>
            {Math.max(0, state.requiredPoints)}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.max(0, (state.requiredPoints / 15) * 100)}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Indicatori di stato */}
      <View style={styles.statusIndicators}>
        {state.isGameActive && (
          <View style={styles.gameActiveIndicator}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>GAME ACTIVE</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  topPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: UI_HORIZONTAL_PADDING,
    paddingTop: UI_TOP_PADDING,
    paddingBottom: UI_VERTICAL_PADDING,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#ffffff',
    fontSize: UI_LABEL_FONT_SIZE,
    fontWeight: 'bold',
    marginBottom: 5 * SCALE_FACTOR,
  },
  scoreValue: {
    color: '#ffffff',
    fontSize: UI_VALUE_FONT_SIZE,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelLabel: {
    color: '#ffffff',
    fontSize: UI_LABEL_FONT_SIZE,
    fontWeight: 'bold',
    marginBottom: 5 * SCALE_FACTOR,
  },
  levelValue: {
    color: '#ffffff',
    fontSize: UI_VALUE_FONT_SIZE,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeLabel: {
    color: '#ffffff',
    fontSize: UI_LABEL_FONT_SIZE,
    fontWeight: 'bold',
    marginBottom: 5 * SCALE_FACTOR,
  },
  timeValue: {
    color: '#ffffff',
    fontSize: UI_VALUE_FONT_SIZE,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
  bottomPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: UI_HORIZONTAL_PADDING,
    paddingVertical: UI_VERTICAL_PADDING,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  requiredContainer: {
    alignItems: 'center',
  },
  requiredLabel: {
    color: '#ffffff',
    fontSize: UI_LABEL_FONT_SIZE,
    fontWeight: 'bold',
    marginBottom: 5 * SCALE_FACTOR,
  },
  requiredValue: {
    color: '#ffffff',
    fontSize: UI_VALUE_FONT_SIZE * 0.8,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1 * SCALE_FACTOR, height: 1 * SCALE_FACTOR },
    textShadowRadius: 2 * SCALE_FACTOR,
  },
  progressContainer: {
    flex: 1,
    marginLeft: UI_HORIZONTAL_PADDING,
  },
  progressBar: {
    height: UI_PROGRESS_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: UI_PROGRESS_HEIGHT / 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff00',
    borderRadius: UI_PROGRESS_HEIGHT / 2,
  },
  statusIndicators: {
    position: 'absolute',
    top: UI_TOP_PADDING + UI_VERTICAL_PADDING + UI_VALUE_FONT_SIZE + 20 * SCALE_FACTOR,
    right: UI_HORIZONTAL_PADDING,
  },
  gameActiveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
    paddingHorizontal: UI_HORIZONTAL_PADDING * 0.5,
    paddingVertical: UI_VERTICAL_PADDING * 0.5,
    borderRadius: 15 * SCALE_FACTOR,
  },
  activeDot: {
    width: UI_INDICATOR_SIZE,
    height: UI_INDICATOR_SIZE,
    borderRadius: UI_INDICATOR_SIZE / 2,
    backgroundColor: '#ffffff',
    marginRight: 5 * SCALE_FACTOR,
  },
  activeText: {
    color: '#ffffff',
    fontSize: UI_SMALL_FONT_SIZE,
    fontWeight: 'bold',
  },
});
