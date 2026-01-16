import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeInDown, withSpring, useSharedValue, useAnimatedStyle, withDelay } from 'react-native-reanimated';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSlideData, OnboardingTheme } from '../types';

interface IconSlideProps {
  data: IconSlideData;
  theme: OnboardingTheme;
  darkMode?: boolean;
}

export const IconSlide: React.FC<IconSlideProps> = ({ data, theme, darkMode }) => {
  const { icon, title, description, subtitle, gradientColors } = data;

  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    rotate.value = withDelay(200, withSpring(0, { damping: 20, stiffness: 100 }));
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const containerStyle = useMemo(() => {
    const styles: any = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    };

    if (data.backgroundColor) {
      styles.backgroundColor = data.backgroundColor;
    } else if (gradientColors && gradientColors.length > 0) {
      // Will use LinearGradient
    } else {
      styles.backgroundColor = theme.colors.background;
    }

    return styles;
  }, [data, theme]);

  const iconContainerStyle: ViewStyle = useMemo(() => ({
    width: icon.backgroundSize || 160,
    height: icon.backgroundSize || 160,
    borderRadius: (icon.backgroundSize || 160) / 2,
    backgroundColor: icon.backgroundColor || theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  }), [icon, theme]);

  const renderIcon = () => {
    const iconProps = {
      name: icon.name as any,
      size: icon.size || 64,
      color: icon.color || theme.colors.text.inverse,
    };

    switch (icon.type) {
      case 'material':
        return <MaterialIcons {...iconProps} />;
      case 'material-community':
        return <MaterialCommunityIcons {...iconProps} />;
      case 'font-awesome':
        return <FontAwesome {...iconProps} />;
      case 'octicons':
        return <Octicons {...iconProps} />;
      case 'feather':
        return <Feather {...iconProps} />;
      case 'ionicons':
      default:
        return <Ionicons {...iconProps} />;
    }
  };

  const titleStyle = useMemo(() => ({
    ...styles.title,
    color: gradientColors?.length ? theme.colors.text.primary : theme.colors.text.primary,
  }), [gradientColors, theme]);

  const subtitleStyle = useMemo(() => ({
    ...styles.subtitle,
    color: gradientColors?.length ? theme.colors.text.secondary : theme.colors.text.secondary,
  }), [gradientColors, theme]);

  const descriptionStyle = useMemo(() => ({
    ...styles.description,
    color: gradientColors?.length ? theme.colors.text.secondary : theme.colors.text.secondary,
  }), [gradientColors, theme]);

  const content = (
    <>
      {/* Icon */}
      <Animated.View style={iconAnimatedStyle}>
        <View style={iconContainerStyle}>
          {renderIcon()}
        </View>
      </Animated.View>

      {/* Title */}
      {title && (
        <Animated.Text entering={FadeInDown.delay(100).springify()} style={titleStyle}>
          {title}
        </Animated.Text>
      )}

      {/* Subtitle */}
      {subtitle && (
        <Animated.Text entering={FadeInDown.delay(200).springify()} style={subtitleStyle}>
          {subtitle}
        </Animated.Text>
      )}

      {/* Description */}
      {description && (
        <Animated.Text entering={FadeInDown.delay(300).springify()} style={descriptionStyle}>
          {description}
        </Animated.Text>
      )}
    </>
  );

  if (gradientColors && gradientColors.length > 0) {
    return (
      <LinearGradient colors={gradientColors as any} style={StyleSheet.absoluteFillObject}>
        <View style={containerStyle}>{content}</View>
      </LinearGradient>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 22,
  },
});

export default IconSlide;
