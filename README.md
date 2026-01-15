# @rubixscript/react-native-onboarding

A comprehensive React Native onboarding library with customizable slide types, animations, and themes. Built for React Native 0.70+ with Expo.

## Features

- **Multiple Slide Types**: Image, Icon, Form, Video, and Custom slides
- **Pre-built Themes**: onepage, zaprecipe, pomodo, modern, minimal, gradient presets
- **Customizable Navigation**: Dots, progress bar, steps, numbers, or no pagination
- **Smooth Animations**: Slide, fade, scale, parallax transitions with react-native-reanimated
- **Storage Integration**: AsyncStorage persistence for onboarding completion
- **Form Support**: Built-in form validation and data collection
- **Dark Mode**: Full dark mode support
- **TypeScript**: Fully typed for better developer experience

## Installation

```bash
npm install @rubixscript/react-native-onboarding
# or
yarn add @rubixscript/react-native-onboarding
```

### Peer Dependencies

Ensure you have these installed:

```bash
npm install react-native-reanimated @react-native-async-storage/async-storage expo-linear-gradient expo-blur @expo/vector-icons
```

## Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Onboarding, useOnboarding } from '@rubixscript/react-native-onboarding';

const App = () => {
  const { hasCompletedOnboarding, isLoading } = useOnboarding('@myapp:onboarding_complete');
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);

  if (isLoading) return null;

  return (
    <>
      {showOnboarding ? (
        <Onboarding
          visible={showOnboarding}
          slides={mySlides}
          onboardingComplete={(data) => {
            setShowOnboarding(false);
            console.log('Onboarding data:', data);
          }}
        />
      ) : (
        <YourMainApp />
      )}
    </>
  );
};
```

### Using Presets

```tsx
import { Onboarding } from '@rubixscript/react-native-onboarding';
import { onepageConfig, onepagePreset } from '@rubixscript/react-native-onboarding/presets';

// Use a complete preset
<Onboarding
  visible={true}
  {...onepageConfig}
  theme={onepagePreset.theme}
  navigation={onepagePreset.navigation}
  animation={onepagePreset.animation}
  onboardingComplete={() => console.log('Done!')}
/>

// Or just use the theme with custom slides
<Onboarding
  visible={true}
  slides={myCustomSlides}
  theme={onepagePreset.theme}
  onboardingComplete={() => console.log('Done!')}
/>
```

## Slide Types

### Image Slide

```tsx
{
  id: 'welcome',
  type: 'image',
  title: 'Welcome',
  description: 'Your description here',
  image: require('./assets/welcome.png'),
  imageResizeMode: 'cover',
  gradientColors: ['#667EEA', '#764BA2'],
  overlayIcon: {
    name: 'heart',
    size: 40,
    color: '#FFFFFF'
  }
}
```

### Icon Slide

```tsx
{
  id: 'features',
  type: 'icon',
  title: 'Powerful Features',
  description: 'Discover what we offer',
  icon: {
    name: 'rocket',
    type: 'ionicons', // or 'material', 'material-community', 'font-awesome', 'octicons', 'feather'
    size: 64,
    color: '#FFFFFF',
    backgroundColor: '#8B5CF6',
    backgroundSize: 160
  },
  backgroundColor: '#F6F6F6'
}
```

### Form Slide

```tsx
{
  id: 'profile',
  type: 'form',
  title: 'Tell us about yourself',
  description: 'We\'ll personalize your experience',
  fields: [
    {
      key: 'name',
      label: 'Your Name',
      placeholder: 'Enter your name',
      type: 'text',
      required: true
    },
    {
      key: 'level',
      label: 'Experience Level',
      placeholder: 'Select level',
      type: 'select',
      required: true,
      options: [
        { value: 'beginner', label: 'Beginner', icon: 'leaf' },
        { value: 'advanced', label: 'Advanced', icon: 'star' }
      ]
    }
  ],
  submitLabel: 'Get Started',
  onSubmit: async (data) => {
    console.log('Form data:', data);
    // Save to backend, etc.
  }
}
```

### Video Slide

```tsx
{
  id: 'intro',
  type: 'video',
  title: 'Watch Our Story',
  description: 'A quick introduction',
  videoSource: require('./assets/intro.mp4'),
  autoPlay: true,
  loop: true,
  muted: true,
  poster: require('./assets/poster.png')
}
```

## Customization

### Theme

```tsx
import { mergeTheme, modernTheme } from '@rubixscript/react-native-onboarding';

const customTheme = mergeTheme(modernTheme, {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
  typography: {
    title: {
      fontSize: 32,
      fontWeight: '800',
    }
  }
});

<Onboarding theme={customTheme} {...otherProps} />
```

### Navigation

```tsx
<Onboarding
  navigation={{
    style: 'dots', // 'dots' | 'progress-bar' | 'steps' | 'numbers' | 'none'
    position: 'bottom', // 'top' | 'bottom' | 'floating'
    showSkip: true,
    showBack: true,
    skipLabel: 'Skip',
    backLabel: 'Back',
    nextLabel: 'Continue',
    doneLabel: 'Get Started',
  }}
  {...otherProps}
/>
```

### Animation

```tsx
<Onboarding
  animation={{
    type: 'slide', // 'slide' | 'fade' | 'scale' | 'parallax' | 'cube' | 'none'
    duration: 300,
    parallaxFactor: 0.3
  }}
  {...otherProps}
/>
```

### Storage

```tsx
<Onboarding
  storage={{
    key: '@myapp:onboarding_complete',
    enabled: true,
    onComplete: async () => {
      // Called after saving completion status
      console.log('Onboarding saved!');
    }
  }}
  {...otherProps}
/>
```

## Hooks

### useOnboarding

```tsx
import { useOnboarding } from '@rubixscript/react-native-onboarding';

const MyComponent = () => {
  const {
    hasCompletedOnboarding, // boolean | null
    isLoading, // boolean
    markComplete, // () => Promise<void>
    reset // () => Promise<void>
  } = useOnboarding('@myapp:onboarding_key');

  if (isLoading) return <LoadingScreen />;

  return hasCompletedOnboarding ? <App /> : <Onboarding ... />;
};
```

## Available Presets

| Preset | Style | Best For |
|--------|-------|----------|
| `onepage` | Gradient backgrounds, images, forms | Reading apps, content apps |
| `zaprecipe` | Rich images, overlay icons, gradients | Lifestyle, food, travel apps |
| `pomodo` | Clean icons, minimal design | Productivity, utility apps |
| `modern` | Contemporary, rounded, vibrant | Modern consumer apps |
| `minimal` | Simple, monochrome, clean | Professional, business apps |
| `gradient` | Full-screen gradients, immersive | Creative, artistic apps |

## Integration Examples

### Expo Router

```tsx
// app/onboarding.tsx
import { View } from 'react-native';
import { Onboarding } from '@rubixscript/react-native-onboarding';
import { router } from 'expo-router';
import { onepageConfig } from '@rubixscript/react-native-onboarding/presets';

export default function OnboardingScreen() {
  return (
    <Onboarding
      visible={true}
      {...onepageConfig}
      onboardingComplete={() => router.replace('/(tabs)')}
    />
  );
}

// app/_layout.tsx
import { useOnboarding } from '@rubixscript/react-native-onboarding';
import { router } from 'expo-router';

export default function Layout() {
  const { hasCompletedOnboarding, isLoading } = useOnboarding();

  useEffect(() => {
    if (!isLoading && !hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  }, [hasCompletedOnboarding, isLoading]);

  return <Slot />;
}
```

### React Navigation

```tsx
import { Onboarding, useOnboarding } from '@rubixscript/react-native-onboarding';

const OnboardingScreen = ({ navigation }: any) => (
  <Onboarding
    visible={true}
    slides={slides}
    onboardingComplete={() => navigation.navigate('Home')}
  />
);

const RootNavigator = () => {
  const { hasCompletedOnboarding, isLoading } = useOnboarding();

  if (isLoading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
```

## API Reference

### Onboarding Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | *required* | Controls visibility of onboarding |
| `slides` | `SlideData[]` | `[]` | Array of slide configurations |
| `theme` | `Partial<OnboardingTheme>` | `modernTheme` | Custom theme configuration |
| `navigation` | `Partial<NavigationConfig>` | See below | Navigation options |
| `animation` | `Partial<AnimationConfig>` | See below | Animation settings |
| `storage` | `Partial<StorageConfig>` | See below | AsyncStorage configuration |
| `onboardingComplete` | `(data?) => void \| Promise<void>` | - | Called when onboarding completes |
| `onSlideChange` | `(index: number) => void` | - | Called on slide change |
| `onSkip` | `() => void \| Promise<void>` | - | Called when user skips |
| `initialSlide` | `number` | `0` | Starting slide index |
| `swipeEnabled` | `boolean` | `true` | Enable swipe navigation |
| `safeAreaEnabled` | `boolean` | `true` | Use SafeAreaView |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |

## License

MIT

## Author

RubixScript Team

---

For more examples and updates, visit [GitHub](https://github.com/rubixscript/react-native-onboarding).
