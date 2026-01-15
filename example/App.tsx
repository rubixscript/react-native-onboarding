import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Onboarding',
    description: 'Discover amazing features that will transform your experience',
    icon: 'rocket-outline' as const,
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: '2',
    title: 'Customizable Slides',
    description: 'Create beautiful onboarding flows with flexible components',
    icon: 'color-palette-outline' as const,
    gradient: ['#f093fb', '#f5576c'],
  },
  {
    id: '3',
    title: 'Smooth Animations',
    description: 'Delightful transitions powered by React Native Reanimated',
    icon: 'flash-outline' as const,
    gradient: ['#4facfe', '#00f2fe'],
  },
  {
    id: '4',
    title: 'Ready to Go',
    description: 'Get started now and explore all the possibilities',
    icon: 'checkmark-circle-outline' as const,
    gradient: ['#43e97b', '#38f9d7'],
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHome, setShowHome] = useState(false);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      translateX.value = withTiming(-width, { duration: 300 }, () => {
        translateX.value = 0;
        runOnJS(setCurrentIndex)(newIndex);
      });
    } else {
      setShowHome(true);
    }
  };

  const skip = () => {
    setShowHome(true);
  };

  const resetOnboarding = () => {
    setShowHome(false);
    setCurrentIndex(0);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const buttonScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  if (showHome) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.homeContent}>
            <Ionicons name="checkmark-circle" size={80} color="#fff" />
            <Text style={styles.homeTitle}>Welcome Aboard!</Text>
            <Text style={styles.homeDescription}>
              You've completed the onboarding flow
            </Text>
            <Pressable style={styles.homeButton} onPress={resetOnboarding}>
              <Text style={styles.homeButtonText}>Replay Onboarding</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={currentSlide.gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Skip Button */}
          {currentIndex < slides.length - 1 && (
            <Pressable style={styles.skipButton} onPress={skip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </Pressable>
          )}

          {/* Slides Container */}
          <View style={styles.slidesContainer}>
            <Animated.View style={[styles.slide, animatedStyle]}>
              <View style={styles.iconContainer}>
                <View style={styles.iconBlur}>
                  <Ionicons name={currentSlide.icon} size={80} color="#fff" />
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{currentSlide.title}</Text>
                <Text style={styles.description}>{currentSlide.description}</Text>
              </View>
            </Animated.View>
          </View>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {/* Next/Done Button */}
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={nextSlide}
          >
            <Animated.View style={[styles.button, buttonScale]}>
              <View style={styles.buttonBlur}>
                <Text style={styles.buttonText}>
                  {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                </Text>
                {currentIndex < slides.length - 1 && (
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                )}
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  slidesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBlur: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    marginBottom: 12,
  },
  homeDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  homeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  homeButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});
