import { ImageSourcePropType, ViewStyle, TextStyle, ImageStyle, Animated } from 'react-native';

// ============================================================================
// SLIDE TYPES
// ============================================================================

export type SlideType = 'image' | 'icon' | 'form' | 'video' | 'custom';

export interface BaseSlideData {
  id: string;
  type: SlideType;
  title?: string;
  description?: string;
  backgroundColor?: string;
  gradientColors?: string[];
}

export interface ImageSlideData extends BaseSlideData {
  type: 'image';
  image: ImageSourcePropType;
  imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  imageStyle?: ImageStyle;
  overlayIcon?: {
    name: string;
    size?: number;
    color?: string;
  };
}

export interface IconSlideData extends BaseSlideData {
  type: 'icon';
  icon: {
    name: string;
    type?: 'ionicons' | 'material' | 'material-community' | 'font-awesome' | 'octicons' | 'feather';
    size?: number;
    color?: string;
    backgroundColor?: string;
    backgroundSize?: number;
  };
  subtitle?: string;
}

export interface FormFieldConfig {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'multiselect';
  required?: boolean;
  options?: Array<{ value: string; label: string; icon?: string }>;
  validation?: (value: any) => boolean | string;
  multiline?: boolean;
  numberOfLines?: number;
}

export interface FormSlideData extends BaseSlideData {
  type: 'form';
  fields: FormFieldConfig[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  customFormComponent?: React.ComponentType<FormSlideCustomProps>;
}

export interface VideoSlideData extends BaseSlideData {
  type: 'video';
  videoSource: string | { uri: string };
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: ImageSourcePropType;
}

export interface CustomSlideData extends BaseSlideData {
  type: 'custom';
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export type SlideData = ImageSlideData | IconSlideData | FormSlideData | VideoSlideData | CustomSlideData;

// ============================================================================
// THEME TYPES
// ============================================================================

export interface OnboardingTheme {
  // Colors
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    border: string;
    overlay?: string;
  };

  // Typography
  typography: {
    title: TextStyle;
    description: TextStyle;
    button: TextStyle;
    label?: TextStyle;
  };

  // Spacing
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  // Border radius
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };

  // Shadows
  shadows?: {
    sm?: ViewStyle;
    md?: ViewStyle;
    lg?: ViewStyle;
  };
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type NavigationStyle = 'dots' | 'progress-bar' | 'steps' | 'numbers' | 'none';

export interface NavigationConfig {
  style: NavigationStyle;
  position?: 'top' | 'bottom' | 'floating';
  showSkip?: boolean;
  showBack?: boolean;
  skipLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  doneLabel?: string;
  containerStyle?: ViewStyle;
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export type AnimationType = 'slide' | 'fade' | 'scale' | 'parallax' | 'cube' | 'none';

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  easing?: (t: number) => number;
  parallaxFactor?: number;
}

// ============================================================================
// STORAGE TYPES
// ============================================================================

export interface StorageConfig {
  key: string;
  enabled: boolean;
  onComplete?: () => void | Promise<void>;
}

// ============================================================================
// COMPLETE CONFIG
// ============================================================================

export interface OnboardingConfig {
  slides: SlideData[];
  theme?: Partial<OnboardingTheme>;
  navigation?: Partial<NavigationConfig>;
  animation?: Partial<AnimationConfig>;
  storage?: Partial<StorageConfig>;
  onboardingComplete?: (data?: Record<string, any>) => void | Promise<void>;
  onSlideChange?: (index: number) => void;
  onSkip?: () => void | Promise<void>;
  initialSlide?: number;
  swipeEnabled?: boolean;
  containerStyle?: ViewStyle;
  safeAreaEnabled?: boolean;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface OnboardingProps extends OnboardingConfig {
  visible: boolean;
  darkMode?: boolean;
}

export interface FormSlideCustomProps {
  data: FormSlideData;
  theme: OnboardingTheme;
  onSubmit: (data: Record<string, any>) => void;
  isSubmitting?: boolean;
  darkMode?: boolean;
}

export interface PaginationProps {
  currentIndex: number;
  totalSlides: number;
  theme: OnboardingTheme;
  config?: NavigationConfig;
  style?: ViewStyle;
}

export interface NavigationButtonProps {
  label: string;
  onPress: () => void;
  theme: OnboardingTheme;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// ============================================================================
// PRESET TYPES
// ============================================================================

export type OnboardingPreset = 'onepage' | 'zaprecipe' | 'pomodo' | 'modern' | 'minimal' | 'gradient';

export interface PresetConfig {
  theme: OnboardingTheme;
  navigation: NavigationConfig;
  animation: AnimationConfig;
  defaultSlideStyles: {
    image?: ImageStyle;
    icon?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
  };
}
