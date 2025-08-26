import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { ASSETS } from '../config/assets';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const scaleUp = Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    });

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    Animated.parallel([fadeIn, scaleUp, rotate]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
         <View
       style={[styles.container, { backgroundColor: '#479cde' }]}
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
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
                     <Image
             source={ASSETS.backgrounds.logo}
             style={styles.logo}
             resizeMode="contain"
           />
        </Animated.View>

        <Text style={styles.title}>KILLUMINATI</Text>
        <Text style={styles.subtitle}>Loading...</Text>

        <View style={styles.particlesContainer}>
          {[...Array(20)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  left: Math.random() * width,
                  top: Math.random() * height,
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -100],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
             </Animated.View>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.8,
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});
