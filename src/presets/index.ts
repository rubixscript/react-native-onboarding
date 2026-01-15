import { SlideData, OnboardingConfig } from '../types';

// ============================================================================
// ONEPAGE PRESET SLIDES
// ============================================================================

export const onepageSlides: SlideData[] = [
  {
    id: 'welcome',
    type: 'image',
    title: 'Welcome to 1Page',
    description: 'Your personal reading companion for tracking and discovering amazing books.',
    image: require('../../assets/images/onboarding/welcome.png'),
    gradientColors: ['#667EEA', '#764BA2'],
  },
  {
    id: 'library',
    type: 'image',
    title: 'Smart Library',
    description: 'Organize your books effortlessly and discover insights about your reading habits.',
    image: require('../../assets/images/onboarding/library.png'),
    gradientColors: ['#667EEA', '#06D6A0'],
  },
  {
    id: 'progress',
    type: 'image',
    title: 'Track Progress',
    description: 'Monitor your reading journey with beautiful statistics and achievements.',
    image: require('../../assets/images/onboarding/progress.png'),
    gradientColors: ['#06D6A0', '#764BA2'],
  },
  {
    id: 'profile',
    type: 'form',
    title: 'Let\'s Get Started',
    description: 'Tell us a bit about yourself to personalize your experience.',
    fields: [
      {
        key: 'name',
        label: 'What should we call you?',
        placeholder: 'Enter your name',
        type: 'text',
        required: true,
      },
      {
        key: 'readerLevel',
        label: 'Reader Level',
        placeholder: 'Select your level',
        type: 'select',
        required: true,
        options: [
          { value: 'novice', label: 'Novice', icon: 'book-outline' },
          { value: 'reader', label: 'Reader', icon: 'book' },
          { value: 'bookworm', label: 'Bookworm', icon: 'library' },
          { value: 'scholar', label: 'Scholar', icon: 'school' },
          { value: 'sage', label: 'Sage', icon: 'sparkles' },
          { value: 'master', label: 'Master', icon: 'trophy' },
        ],
      },
      {
        key: 'yearlyPages',
        label: 'Yearly Reading Goal',
        placeholder: 'Select your goal',
        type: 'select',
        required: true,
        options: [
          { value: '0-500', label: '0-500 pages' },
          { value: '500-1500', label: '500-1500 pages' },
          { value: '1500-3000', label: '1500-3000 pages' },
          { value: '3000-5000', label: '3000-5000 pages' },
          { value: '5000+', label: '5000+ pages' },
        ],
      },
    ],
    submitLabel: 'Start Reading',
    gradientColors: ['#667EEA', '#764BA2'],
  },
];

// ============================================================================
// ZAPRECIPE PRESET SLIDES
// ============================================================================

export const zaprecipeSlides: SlideData[] = [
  {
    id: 'discover',
    type: 'image',
    title: 'Find Perfect Recipes',
    description: 'Discover thousands of recipes tailored to your taste and dietary preferences.',
    image: require('../../assets/images/onboarding/recipes.jpg'),
    overlayIcon: { name: 'search', size: 40 },
    gradientColors: ['#667eea', '#764ba2', '#6B4EFF'],
  },
  {
    id: 'save',
    type: 'image',
    title: 'Save Your Favorites',
    description: 'Build your personal cookbook with recipes you love and want to try.',
    image: require('../../assets/images/onboarding/favorites.jpg'),
    overlayIcon: { name: 'heart', size: 40 },
    gradientColors: ['#667eea', '#764ba2', '#6B4EFF'],
  },
  {
    id: 'cook',
    type: 'image',
    title: 'Cook with Confidence',
    description: 'Step-by-step instructions make cooking easy and enjoyable for everyone.',
    image: require('../../assets/images/onboarding/cooking.jpg'),
    overlayIcon: { name: 'restaurant', size: 40 },
    gradientColors: ['#667eea', '#764ba2', '#6B4EFF'],
  },
  {
    id: 'profile',
    type: 'form',
    title: 'Tell Us About Yourself',
    description: 'Help us personalize your cooking experience.',
    fields: [
      {
        key: 'name',
        label: 'Your Name',
        placeholder: 'Enter your name',
        type: 'text',
        required: true,
      },
      {
        key: 'cookingLevel',
        label: 'Cooking Level',
        placeholder: 'Select your level',
        type: 'select',
        required: true,
        options: [
          { value: 'beginner', label: 'Beginner', icon: 'leaf' },
          { value: 'intermediate', label: 'Intermediate', icon: 'flame' },
          { value: 'advanced', label: 'Advanced', icon: 'star' },
        ],
      },
      {
        key: 'improveHabits',
        label: 'What cooking habits do you want to improve?',
        placeholder: 'e.g., Faster prep, Better seasoning',
        type: 'text',
      },
      {
        key: 'masterSkill',
        label: 'What culinary skill do you want to master?',
        placeholder: 'e.g., Knife skills, Baking',
        type: 'text',
      },
    ],
    submitLabel: "Let's Start Cooking!",
    gradientColors: ['#667eea', '#764ba2', '#6B4EFF'],
  },
];

// ============================================================================
// POMODO PRESET SLIDES
// ============================================================================

export const pomodoSlides: SlideData[] = [
  {
    id: 'focus',
    type: 'icon',
    title: 'Stay Focused',
    subtitle: 'Pomodoro Timer',
    description: 'Boost your productivity with our customizable Pomodoro timer. Work in focused intervals and take meaningful breaks.',
    icon: {
      name: 'timer',
      type: 'ionicons',
      size: 64,
      color: '#FFFFFF',
      backgroundColor: '#FF6B6B',
      backgroundSize: 160,
    },
    backgroundColor: '#F6F6F6',
  },
  {
    id: 'tasks',
    type: 'icon',
    title: 'Organize Tasks',
    subtitle: 'Task Management',
    description: 'Keep track of all your tasks with priorities, tags, and subtasks. Never lose track of what needs to be done.',
    icon: {
      name: 'checkmark-circle',
      type: 'ionicons',
      size: 64,
      color: '#FFFFFF',
      backgroundColor: '#667EEA',
      backgroundSize: 160,
    },
    backgroundColor: '#F6F6F6',
  },
  {
    id: 'stats',
    type: 'icon',
    title: 'Track Progress',
    subtitle: 'Insights & Analytics',
    description: 'Monitor your productivity with detailed statistics. See your focus time, completed tasks, and patterns.',
    icon: {
      name: 'stats-chart',
      type: 'ionicons',
      size: 64,
      color: '#FFFFFF',
      backgroundColor: '#06D6A0',
      backgroundSize: 160,
    },
    backgroundColor: '#F6F6F6',
  },
];

// ============================================================================
// MODERN PRESET SLIDES
// ============================================================================

export const modernSlides: SlideData[] = [
  {
    id: 'welcome',
    type: 'icon',
    title: 'Welcome Aboard',
    description: 'Get started with an amazing experience tailored just for you.',
    icon: {
      name: 'rocket',
      type: 'ionicons',
      size: 72,
      color: '#FFFFFF',
      backgroundColor: '#8B5CF6',
      backgroundSize: 180,
    },
  },
  {
    id: 'features',
    type: 'icon',
    title: 'Powerful Features',
    description: 'Discover tools and features designed to help you achieve more.',
    icon: {
      name: 'apps',
      type: 'ionicons',
      size: 72,
      color: '#FFFFFF',
      backgroundColor: '#EC4899',
      backgroundSize: 180,
    },
  },
  {
    id: 'ready',
    type: 'icon',
    title: 'Ready to Go?',
    description: 'Let\'s set up your account and get started on your journey.',
    icon: {
      name: 'checkmark-done',
      type: 'ionicons',
      size: 72,
      color: '#FFFFFF',
      backgroundColor: '#10B981',
      backgroundSize: 180,
    },
  },
];

// ============================================================================
// MINIMAL PRESET SLIDES
// ============================================================================

export const minimalSlides: SlideData[] = [
  {
    id: 'one',
    type: 'icon',
    title: 'Simple',
    description: 'Clean and intuitive interface that\'s easy to use.',
    icon: {
      name: 'remove',
      type: 'ionicons',
      size: 48,
      color: '#111827',
      backgroundColor: '#F3F4F6',
      backgroundSize: 120,
    },
  },
  {
    id: 'two',
    type: 'icon',
    title: 'Fast',
    description: 'Lightning quick performance for a smooth experience.',
    icon: {
      name: 'flash',
      type: 'ionicons',
      size: 48,
      color: '#111827',
      backgroundColor: '#F3F4F6',
      backgroundSize: 120,
    },
  },
  {
    id: 'three',
    type: 'icon',
    title: 'Yours',
    description: 'Personalized to fit your needs perfectly.',
    icon: {
      name: 'person',
      type: 'ionicons',
      size: 48,
      color: '#111827',
      backgroundColor: '#F3F4F6',
      backgroundSize: 120,
    },
  },
];

// ============================================================================
// GRADIENT PRESET SLIDES
// ============================================================================

export const gradientSlides: SlideData[] = [
  {
    id: 'discover',
    type: 'image',
    title: 'Discover',
    description: 'Explore new possibilities and unlock your potential.',
    image: require('../../assets/images/onboarding/gradient1.jpg'),
    gradientColors: ['#667EEA', '#764BA2'],
  },
  {
    id: 'create',
    type: 'image',
    title: 'Create',
    description: 'Build something amazing with powerful tools at your fingertips.',
    image: require('../../assets/images/onboarding/gradient2.jpg'),
    gradientColors: ['#f093fb', '#f5576c'],
  },
  {
    id: 'share',
    type: 'image',
    title: 'Share',
    description: 'Connect with others and share your journey.',
    image: require('../../assets/images/onboarding/gradient3.jpg'),
    gradientColors: ['#4facfe', '#00f2fe'],
  },
];

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

export const getPresetSlides = (preset: string): SlideData[] => {
  const slidesMap: Record<string, SlideData[]> = {
    onepage: onepageSlides,
    zaprecipe: zaprecipeSlides,
    pomodo: pomodoSlides,
    modern: modernSlides,
    minimal: minimalSlides,
    gradient: gradientSlides,
  };
  return slidesMap[preset] || modernSlides;
};

export const getPresetConfig = (preset: string): Partial<OnboardingConfig> => {
  return {
    slides: getPresetSlides(preset),
    // Theme and navigation presets are applied via theme prop
  };
};

// ============================================================================
// QUICK START CONFIGS
// ============================================================================

export const onepageConfig: OnboardingConfig = {
  slides: onepageSlides,
  storage: { key: '@1page:onboarding_complete', enabled: true },
};

export const zaprecipeConfig: OnboardingConfig = {
  slides: zaprecipeSlides,
  storage: { key: '@zaprecipe:onboarding_complete', enabled: true },
};

export const pomodoConfig: OnboardingConfig = {
  slides: pomodoSlides,
  storage: { key: '@pomodo:onboarding_complete', enabled: true },
  navigation: { showSkip: false },
};

export default {
  onepageSlides,
  zaprecipeSlides,
  pomodoSlides,
  modernSlides,
  minimalSlides,
  gradientSlides,
  getPresetSlides,
  getPresetConfig,
  onepageConfig,
  zaprecipeConfig,
  pomodoConfig,
};
