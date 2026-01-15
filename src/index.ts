// Main Component
export { Onboarding, useOnboarding } from './components/Onboarding';

// Slide Components
export {
  ImageSlide,
  IconSlide,
  FormSlide,
  VideoSlide,
  SlideRenderer,
} from './slides';

// UI Components
export {
  Pagination,
  NavigationButton,
  NavigationButtons,
} from './components';

// Themes & Presets
export {
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
} from './themes';

// Types
export type {
  SlideType,
  BaseSlideData,
  ImageSlideData,
  IconSlideData,
  FormSlideData,
  VideoSlideData,
  CustomSlideData,
  SlideData,
  OnboardingTheme,
  NavigationStyle,
  NavigationConfig,
  AnimationType,
  AnimationConfig,
  StorageConfig,
  OnboardingConfig,
  OnboardingProps,
  FormSlideCustomProps,
  PaginationProps,
  NavigationButtonProps,
  OnboardingPreset,
  PresetConfig,
} from './types';

// Default export
export { default } from './components/Onboarding';
