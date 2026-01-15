import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { NavigationButtonProps } from '../types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  label,
  onPress,
  theme,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = useMemo(() => {
    const base: ViewStyle = {
      ...styles.button,
      minHeight: 48,
      paddingHorizontal: 24,
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'primary':
        base.backgroundColor = theme.colors.primary;
        break;
      case 'secondary':
        base.backgroundColor = theme.colors.secondary;
        break;
      case 'ghost':
        base.backgroundColor = 'transparent';
        base.borderWidth = 1.5;
        base.borderColor = theme.colors.border;
        break;
    }

    return base;
  }, [theme, variant]);

  const buttonText = useMemo(() => {
    const base: TextStyle = {
      ...styles.buttonText,
      color: variant === 'ghost' ? theme.colors.text.primary : theme.colors.text.inverse,
    };

    return base;
  }, [theme, variant]);

  return (
    <AnimatedTouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? theme.colors.text.primary : theme.colors.text.inverse} />
      ) : (
        <Text style={[buttonText, textStyle]}>{label}</Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

interface NavigationButtonsProps {
  currentIndex: number;
  totalSlides: number;
  theme: any;
  config: any;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  canGoNext?: boolean;
  isLastSlide?: boolean;
  isLoading?: boolean;
  darkMode?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  totalSlides,
  theme,
  config,
  onNext,
  onBack,
  onSkip,
  canGoNext = true,
  isLastSlide = false,
  isLoading = false,
  darkMode = false,
}) => {
  const { showSkip = true, showBack = true, skipLabel = 'Skip', backLabel = 'Back', nextLabel = 'Next', doneLabel = 'Get Started', position = 'bottom' } = config;

  const containerStyle: ViewStyle = useMemo(() => {
    const base: ViewStyle = {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.sm,
    };

    if (position === 'floating') {
      base.position = 'absolute';
      base.bottom = theme.spacing.xl;
      base.left = theme.spacing.lg;
      base.right = theme.spacing.lg;
    }

    return base;
  }, [theme, position]);

  const isAtStart = currentIndex === 0;

  const buttons = (
    <>
      {/* Back Button */}
      {showBack && !isAtStart && (
        <NavigationButton
          label={backLabel}
          onPress={onBack}
          theme={theme}
          variant="ghost"
        />
      )}

      {/* Skip Button */}
      {showSkip && !isLastSlide && !isLoading && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onSkip}
          activeOpacity={0.7}
        >
          <Text style={[styles.skipButtonText, { color: theme.colors.text.secondary }]}>
            {skipLabel}
          </Text>
        </TouchableOpacity>
      )}

      {/* Next/Done Button */}
      <NavigationButton
        label={isLastSlide ? doneLabel : nextLabel}
        onPress={onNext}
        theme={theme}
        variant="primary"
        disabled={!canGoNext}
        loading={isLoading}
      />
    </>
  );

  if (position === 'floating') {
    return (
      <BlurView intensity={80} tint={darkMode ? 'dark' : 'light'} style={containerStyle}>
        <View style={styles.buttonRow}>{buttons}</View>
      </BlurView>
    );
  }

  return <View style={containerStyle}>{buttons}</View>;
};

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginRight: 8,
  },
  skipButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default { NavigationButton, NavigationButtons };
