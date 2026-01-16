import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Modal,
  ViewStyle,
  Animated,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlatList from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { OnboardingProps, OnboardingConfig } from '../types';
import { mergeTheme, getPreset } from '../themes';
import { SlideRenderer } from '../slides';
import { Pagination, NavigationButtons } from './index';

// Type assertion for AnimatedFlatList from react-native-reanimated
const AnimatedFlatListImplemented = FlatList as any;

export const Onboarding: React.FC<OnboardingProps> = ({
  visible,
  slides = [],
  theme: customTheme,
  navigation: customNavigation,
  animation: customAnimation,
  storage,
  onboardingComplete,
  onSlideChange,
  onSkip,
  initialSlide = 0,
  swipeEnabled = true,
  containerStyle,
  safeAreaEnabled = true,
  darkMode = false,
}) => {
  // State
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  //Refs
  const flatListRef = React.useRef<any>(null);

  // Merge theme with preset
  const preset = useMemo(() => {
    if (!customTheme) return getPreset('modern');
    const presetKey = Object.keys(getPreset('modern')).find(
      key => (customTheme as any)[key]
    );
    return presetKey ? getPreset(presetKey) : getPreset('modern');
  }, [customTheme]);

  const theme = useMemo(
    () => mergeTheme(preset.theme, customTheme),
    [preset, customTheme]
  );

  const navigationConfig = useMemo(
    () => ({ ...preset.navigation, ...customNavigation }),
    [preset, customNavigation]
  );

  const animationConfig = useMemo(
    () => ({ ...preset.animation, ...customAnimation }),
    [preset, customAnimation]
  );

  // Check storage on mount
  useEffect(() => {
    if (storage?.enabled) {
      checkOnboardingStatus();
    }
  }, [storage]);

  const checkOnboardingStatus = async () => {
    try {
      const key = storage?.key || '@onboarding_complete';
      const completed = await AsyncStorage.getItem(key);
      if (completed && !visible) {
        // Already completed, don't show
        return;
      }
    } catch (error) {
      console.warn('Error checking onboarding status:', error);
    }
  };

  const saveOnboardingComplete = async () => {
    if (storage?.enabled) {
      try {
        const key = storage?.key || '@onboarding_complete';
        await AsyncStorage.setItem(key, 'true');
        if (storage.onComplete) {
          await storage.onComplete();
        }
      } catch (error) {
        console.warn('Error saving onboarding status:', error);
      }
    }
  };

  // Handlers
  const handleNext = useCallback(async () => {
    const currentSlide = slides[currentIndex];

    // Check if form slide and validate
    if (currentSlide.type === 'form') {
      const formSlide = currentSlide as any;
      const requiredFields = formSlide.fields.filter((f: any) => f.required);
      const isValid = requiredFields.every((field: any) => formData[field.key]);

      if (!isValid) {
        return; // Form validation failed
      }

      // Submit form data
      if (formSlide.onSubmit) {
        setIsSubmitting(true);
        try {
          await formSlide.onSubmit(formData);
        } catch (error) {
          console.warn('Form submit error:', error);
        }
        setIsSubmitting(false);
      }
    }

    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      // Complete onboarding
      await saveOnboardingComplete();
      if (onboardingComplete) {
        await onboardingComplete(formData);
      }
    }
  }, [currentIndex, slides, formData, onboardingComplete, storage]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  }, [currentIndex]);

  const handleSkip = useCallback(async () => {
    await saveOnboardingComplete();
    if (onSkip) {
      await onSkip();
    } else if (onboardingComplete) {
      await onboardingComplete();
    }
  }, [onSkip, onboardingComplete, storage]);

  const handleMomentumScrollEnd = useCallback(
    (event: any) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
      if (index !== currentIndex) {
        setCurrentIndex(index);
        if (onSlideChange) {
          onSlideChange(index);
        }
      }
    },
    [currentIndex, onSlideChange]
  );

  const handleFormDataChange = useCallback((data: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  // Renderers
  const renderSlide = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View style={[styles.slide, { width: '100%' }]}>
          <SlideRenderer
            data={item}
            theme={theme}
            darkMode={darkMode}
            onSubmit={handleFormDataChange}
            isSubmitting={isSubmitting}
          />
        </View>
      );
    },
    [theme, darkMode, isSubmitting, handleFormDataChange]
  );

  const getKey = useCallback((item: any, index: number) => item.id || `slide-${index}`, []);

  // Computed values
  const isLastSlide = currentIndex === slides.length - 1;
  const currentSlide = slides[currentIndex];

  // Determine if we should show navigation (not for form slides that handle their own)
  const showNavigation = currentSlide?.type !== 'form';

  if (!visible) return null;

  const content = (
    <View style={[styles.container, containerStyle]}>
      {/* Background Gradient if applicable */}
      {currentSlide?.gradientColors && currentSlide.gradientColors.length > 0 && (
        <LinearGradient
          colors={currentSlide.gradientColors as any}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Pagination */}
      {showNavigation && (
        <Pagination
          currentIndex={currentIndex}
          totalSlides={slides.length}
          theme={theme}
          config={navigationConfig}
        />
      )}

      {/* Slides */}
      <AnimatedFlatListImplemented
        ref={flatListRef as any}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={getKey}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEnabled={swipeEnabled}
        bounces={false}
        initialScrollIndex={initialSlide}
        onScrollToIndexFailed={(info: any) => {
          // Retry if scroll to index fails
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 100);
        }}
      />

      {/* Navigation Buttons */}
      {showNavigation && (
        <NavigationButtons
          currentIndex={currentIndex}
          totalSlides={slides.length}
          theme={theme}
          config={navigationConfig}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
          isLastSlide={isLastSlide}
          isLoading={isSubmitting}
          darkMode={darkMode}
        />
      )}
    </View>
  );

  if (safeAreaEnabled) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <SafeAreaProvider>{content}</SafeAreaProvider>
      </SafeAreaView>
    );
  }

  return content;
};

// Hook for checking onboarding status
export const useOnboarding = (storageKey: string = '@onboarding_complete') => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(storageKey);
      setHasCompletedOnboarding(completed === 'true');
    } catch (error) {
      console.warn('Error checking onboarding:', error);
      setHasCompletedOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  const markComplete = async () => {
    try {
      await AsyncStorage.setItem(storageKey, 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.warn('Error marking onboarding complete:', error);
    }
  };

  const reset = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
      setHasCompletedOnboarding(false);
    } catch (error) {
      console.warn('Error resetting onboarding:', error);
    }
  };

  return { hasCompletedOnboarding, isLoading, markComplete, reset };
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding;
