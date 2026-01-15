import { Platform, StyleSheet } from 'react-native';
import { OnboardingTheme, PresetConfig } from '../types';

// ============================================================================
// BASE THEME UTILITIES
// ============================================================================

const createBaseTypography = () => ({
  title: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  description: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  button: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  label: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '500' as const,
  },
});

const createSpacing = () => ({
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
});

const createBorderRadius = () => ({
  sm: 4,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
});

const createShadows = () => ({
  sm: {
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  md: {
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  lg: {
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
});

// ============================================================================
// ONEPAGE THEME
// ============================================================================

export const onepageTheme: OnboardingTheme = {
  colors: {
    primary: '#667EEA',
    secondary: '#06D6A0',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
    overlay: 'rgba(0, 0, 0, 0.1)',
  },
  typography: {
    title: {
      ...createBaseTypography().title,
      fontSize: 28,
      color: '#1E293B',
    },
    description: {
      ...createBaseTypography().description,
      fontSize: 15,
      color: '#64748B',
    },
    button: {
      ...createBaseTypography().button,
      fontSize: 16,
      color: '#FFFFFF',
    },
    label: {
      ...createBaseTypography().label,
      fontSize: 14,
      color: '#475569',
    },
  },
  spacing: createSpacing(),
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
};

export const onepagePreset: PresetConfig = {
  theme: onepageTheme,
  navigation: {
    style: 'dots',
    position: 'bottom',
    showSkip: true,
    showBack: true,
    skipLabel: 'Skip',
    backLabel: 'Back',
    nextLabel: 'Next',
    doneLabel: "Let's Get Started",
  },
  animation: {
    type: 'slide',
    duration: 300,
  },
  defaultSlideStyles: {
    image: {
      width: '100%',
      height: 280,
      borderRadius: 16,
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      marginBottom: 12,
      textAlign: 'center',
    },
    description: {
      fontSize: 15,
      textAlign: 'center',
      paddingHorizontal: 32,
      lineHeight: 22,
    },
  },
};

// ============================================================================
// ZAPRECIPE THEME
// ============================================================================

export const zaprecipeTheme: OnboardingTheme = {
  colors: {
    primary: '#6B4EFF',
    secondary: '#FF8C42',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
    overlay: 'rgba(255, 255, 255, 0.2)',
  },
  typography: {
    title: {
      ...createBaseTypography().title,
      fontSize: 32,
      color: '#FFFFFF',
    },
    description: {
      ...createBaseTypography().description,
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
      ...createBaseTypography().button,
      fontSize: 16,
      color: '#FFFFFF',
    },
    label: {
      ...createBaseTypography().label,
      fontSize: 14,
      color: '#FFFFFF',
    },
  },
  spacing: createSpacing(),
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
};

export const zaprecipePreset: PresetConfig = {
  theme: zaprecipeTheme,
  navigation: {
    style: 'dots',
    position: 'floating',
    showSkip: true,
    showBack: true,
    skipLabel: 'Skip',
    backLabel: 'Back',
    nextLabel: 'Continue',
    doneLabel: "Let's Start Cooking!",
  },
  animation: {
    type: 'fade',
    duration: 250,
  },
  defaultSlideStyles: {
    image: {
      width: '100%',
      height: 300,
      borderRadius: 0,
      marginBottom: 0,
    },
    title: {
      fontSize: 28,
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 15,
      textAlign: 'center',
      paddingHorizontal: 24,
      lineHeight: 22,
    },
  },
};

// ============================================================================
// POMODO THEME
// ============================================================================

export const pomodoTheme: OnboardingTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#667EEA',
    background: '#F6F6F6',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
    overlay: 'rgba(0, 0, 0, 0.05)',
  },
  typography: {
    title: {
      ...createBaseTypography().title,
      fontSize: 24,
      color: '#1E293B',
    },
    description: {
      ...createBaseTypography().description,
      fontSize: 14,
      color: '#64748B',
    },
    button: {
      ...createBaseTypography().button,
      fontSize: 16,
      color: '#FFFFFF',
    },
  },
  spacing: createSpacing(),
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
};

export const pomodoPreset: PresetConfig = {
  theme: pomodoTheme,
  navigation: {
    style: 'dots',
    position: 'bottom',
    showSkip: false,
    showBack: false,
    nextLabel: 'Next',
    doneLabel: 'Get Started',
  },
  animation: {
    type: 'fade',
    duration: 500,
  },
  defaultSlideStyles: {
    icon: {
      width: 160,
      height: 160,
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 22,
      marginBottom: 12,
      textAlign: 'center',
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 32,
      lineHeight: 20,
    },
  },
};

// ============================================================================
// MODERN THEME
// ============================================================================

export const modernTheme: OnboardingTheme = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      inverse: '#FFFFFF',
    },
    border: '#E5E7EB',
    overlay: 'rgba(0, 0, 0, 0.05)',
  },
  typography: {
    title: {
      ...createBaseTypography().title,
      fontSize: 30,
      color: '#111827',
    },
    description: {
      ...createBaseTypography().description,
      fontSize: 16,
      color: '#6B7280',
    },
    button: {
      ...createBaseTypography().button,
      fontSize: 16,
      color: '#FFFFFF',
    },
  },
  spacing: createSpacing(),
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
};

export const modernPreset: PresetConfig = {
  theme: modernTheme,
  navigation: {
    style: 'progress-bar',
    position: 'top',
    showSkip: true,
    showBack: true,
    skipLabel: 'Skip',
    backLabel: 'Back',
    nextLabel: 'Next',
    doneLabel: 'Get Started',
  },
  animation: {
    type: 'slide',
    duration: 350,
  },
  defaultSlideStyles: {
    title: {
      fontSize: 28,
      marginBottom: 16,
      fontWeight: '700',
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
    },
  },
};

// ============================================================================
// MINIMAL THEME
// ============================================================================

export const minimalTheme: OnboardingTheme = {
  colors: {
    primary: '#111827',
    secondary: '#6B7280',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      inverse: '#FFFFFF',
    },
    border: '#E5E7EB',
  },
  typography: {
    title: {
      ...createBaseTypography().title,
      fontSize: 24,
      color: '#111827',
    },
    description: {
      ...createBaseTypography().description,
      fontSize: 15,
      color: '#6B7280',
    },
    button: {
      ...createBaseTypography().button,
      fontSize: 15,
      color: '#FFFFFF',
    },
  },
  spacing: createSpacing(),
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
};

export const minimalPreset: PresetConfig = {
  theme: minimalTheme,
  navigation: {
    style: 'steps',
    position: 'bottom',
    showSkip: true,
    showBack: false,
    skipLabel: 'Skip',
    nextLabel: 'Next',
    doneLabel: 'Start',
  },
  animation: {
    type: 'fade',
    duration: 200,
  },
  defaultSlideStyles: {
    title: {
      fontSize: 22,
      marginBottom: 8,
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
};

// ============================================================================
// GRADIENT THEME
// ============================================================================

export const gradientTheme: OnboardingTheme = {
  colors: {
    primary: '#667EEA',
    secondary: '#764BA2',
    background: '#667EEA',
    surface: 'rgba(255, 255, 255, 0.15)',
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      inverse: '#FFFFFF',
    },
    border: 'rgba(255, 255, 255, 0.2)',
    overlay: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    title: {
      ...createBaseTypography().title,
      fontSize: 32,
      color: '#FFFFFF',
    },
    description: {
      ...createBaseTypography().description,
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
      ...createBaseTypography().button,
      fontSize: 16,
      color: '#FFFFFF',
    },
  },
  spacing: createSpacing(),
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
};

export const gradientPreset: PresetConfig = {
  theme: gradientTheme,
  navigation: {
    style: 'dots',
    position: 'floating',
    showSkip: true,
    showBack: true,
    skipLabel: 'Skip',
    backLabel: 'Back',
    nextLabel: 'Next',
    doneLabel: 'Get Started',
  },
  animation: {
    type: 'parallax',
    duration: 400,
    parallaxFactor: 0.3,
  },
  defaultSlideStyles: {
    title: {
      fontSize: 28,
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 15,
      textAlign: 'center',
      paddingHorizontal: 24,
      lineHeight: 22,
    },
  },
};

// ============================================================================
// THEME GETTERS
// ============================================================================

export const getTheme = (preset: string): OnboardingTheme => {
  const themes: Record<string, OnboardingTheme> = {
    onepage: onepageTheme,
    zaprecipe: zaprecipeTheme,
    pomodo: pomodoTheme,
    modern: modernTheme,
    minimal: minimalTheme,
    gradient: gradientTheme,
  };
  return themes[preset] || modernTheme;
};

export const getPreset = (preset: string): PresetConfig => {
  const presets: Record<string, PresetConfig> = {
    onepage: onepagePreset,
    zaprecipe: zaprecipePreset,
    pomodo: pomodoPreset,
    modern: modernPreset,
    minimal: minimalPreset,
    gradient: gradientPreset,
  };
  return presets[preset] || modernPreset;
};

export const mergeTheme = (base: OnboardingTheme, custom?: Partial<OnboardingTheme>): OnboardingTheme => {
  if (!custom) return base;

  return {
    colors: { ...base.colors, ...custom.colors, text: { ...base.colors.text, ...custom.colors?.text } },
    typography: { ...base.typography, ...custom.typography },
    spacing: { ...base.spacing, ...custom.spacing },
    borderRadius: { ...base.borderRadius, ...custom.borderRadius },
    shadows: { ...base.shadows, ...custom.shadows },
  };
};

export default {
  onepageTheme,
  zaprecipeTheme,
  pomodoTheme,
  modernTheme,
  minimalTheme,
  gradientTheme,
  onepagePreset,
  zaprecipePreset,
  pomodoPreset,
  modernPreset,
  minimalPreset,
  gradientPreset,
  getTheme,
  getPreset,
  mergeTheme,
};
