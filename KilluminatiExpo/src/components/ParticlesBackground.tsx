import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticlesBackground() {
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Inizializza le particelle
    particles.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const animate = () => {
      particles.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Rimbalza sui bordi
        if (particle.x <= 0 || particle.x >= width) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= height) {
          particle.speedY *= -1;
        }

        // Mantieni le particelle sullo schermo
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {particles.current.map((particle, index) => (
        <View
          key={index}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#82fffd',
    borderRadius: 50,
  },
});
