import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ImageSlideData, OnboardingTheme } from '../types';

interface ImageSlideProps {
  data: ImageSlideData;
  theme: OnboardingTheme;
  darkMode?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ImageSlide: React.FC<ImageSlideProps> = ({ data, theme, darkMode }) => {
  const { image, title, description, imageResizeMode = 'cover', imageStyle, overlayIcon, gradientColors } = data;

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

  const imageContainerStyle = useMemo(() => ({
    ...styles.imageContainer,
    marginBottom: theme.spacing.lg,
  }), [theme]);

  const baseImageStyle: ImageStyle = useMemo(() => ({
    width: SCREEN_WIDTH - theme.spacing.xl * 2,
    height: 280,
    borderRadius: theme.borderRadius.lg,
    resizeMode: imageResizeMode,
    ...imageStyle,
  }), [theme, imageResizeMode, imageStyle]);

  const titleStyle = useMemo(() => ({
    ...styles.title,
    color: gradientColors?.length ? theme.colors.text.primary : theme.colors.text.primary,
  }), [gradientColors, theme]);

  const descriptionStyle = useMemo(() => ({
    ...styles.description,
    color: gradientColors?.length ? theme.colors.text.secondary : theme.colors.text.secondary,
  }), [gradientColors, theme]);

  const content = (
    <>
      {/* Image with optional overlay icon */}
      <Animated.View entering={FadeIn.duration(400).springify()} style={imageContainerStyle}>
        <Image source={image} style={baseImageStyle} />
        {overlayIcon && (
          <View style={styles.overlayIcon}>
            <Ionicons
              name={overlayIcon.name as any}
              size={overlayIcon.size || 48}
              color={overlayIcon.color || '#FFFFFF'}
            />
          </View>
        )}
      </Animated.View>

      {/* Title */}
      {title && (
        <Animated.Text entering={FadeInDown.delay(100).springify()} style={titleStyle}>
          {title}
        </Animated.Text>
      )}

      {/* Description */}
      {description && (
        <Animated.Text entering={FadeInDown.delay(200).springify()} style={descriptionStyle}>
          {description}
        </Animated.Text>
      )}
    </>
  );

  if (gradientColors && gradientColors.length > 0) {
    return (
      <LinearGradient colors={gradientColors} style={StyleSheet.absoluteFillObject}>
        <View style={containerStyle}>{content}</View>
      </LinearGradient>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  overlayIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
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

export default ImageSlide;
