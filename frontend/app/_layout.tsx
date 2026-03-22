import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withDelay,
  runOnJS,
  FadeOut
} from 'react-native-reanimated';
import 'react-native-reanimated';
import '../global.css';

const { width } = Dimensions.get('window');

const AnimatedSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Stage 1: Scale in (800ms)
    scale.value = withTiming(1, { duration: 800 }, () => {
      // Stage 2: Wait (400ms) then fade out (800ms)
      opacity.value = withDelay(400, withTiming(0, { duration: 800 }, () => {
        runOnJS(onFinish)();
      }));
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.splashContainer, { opacity: opacity.value }]}>
      <Animated.View style={[styles.logoWrapper, animatedStyle]}>
        <View style={styles.pawContainer}>
          <FontAwesome5 name="paw" size={32} color="white" />
        </View>
        <Text style={styles.logoText}>
          Pati<Text style={{ color: '#f97316' }}>Bak</Text>
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pet/[id]" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>

      {showSplash && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pawContainer: {
    backgroundColor: '#f97316',
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-12deg' }],
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#111827',
    marginLeft: 20,
    letterSpacing: -2,
  },
});
