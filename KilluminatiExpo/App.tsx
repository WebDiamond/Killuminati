import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import LoadingScreen from './src/screens/LoadingScreen';

import { GameProvider } from './src/context/GameContext';
import { AudioProvider } from './src/context/AudioContext';

export type RootStackParamList = {
  Loading: undefined;
  Menu: undefined;
  Game: undefined;
  GameOver: { score: number; highScore: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula il caricamento delle risorse
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AudioProvider>
          <GameProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Menu"
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="GameOver" component={GameOverScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
          </GameProvider>
        </AudioProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
