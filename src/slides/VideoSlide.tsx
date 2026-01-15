import React, { useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoSlideData, OnboardingTheme } from '../types';

interface VideoSlideProps {
  data: VideoSlideData;
  theme: OnboardingTheme;
  darkMode?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const VideoSlide: React.FC<VideoSlideProps> = ({ data, theme, darkMode }) => {
  const { videoSource, title, description, autoPlay = true, loop = true, muted = true, poster, gradientColors } = data;
  const videoRef = useRef<Video>(null);
  const [isReady, setIsReady] = useState(false);

  const handleVideoLoad = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsReady(true);
      if (autoPlay) {
        videoRef.current?.playAsync();
      }
    }
  };

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

  const videoContainerStyle = useMemo(() => ({
    ...styles.videoContainer,
    marginBottom: theme.spacing.lg,
  }), [theme]);

  const videoStyle = {
    width: SCREEN_WIDTH - theme.spacing.xl * 2,
    height: (SCREEN_WIDTH - theme.spacing.xl * 2) * (9 / 16),
    borderRadius: theme.borderRadius.lg,
  };

  const titleStyle = useMemo(() => ({
    ...styles.title,
    color: gradientColors?.length ? theme.colors.text.primary : theme.colors.text.primary,
  }), [gradientColors, theme]);

  const descriptionStyle = useMemo(() => ({
    ...styles.description,
    color: gradientColors?.length ? theme.colors.text.secondary : theme.colors.text.secondary,
  }), [gradientColors, theme]);

  const videoSourceUri = typeof videoSource === 'string' ? { uri: videoSource } : videoSource;

  const content = (
    <>
      {/* Video */}
      <Animated.View entering={FadeIn.duration(400)} style={videoContainerStyle}>
        <View style={videoStyle}>
          <Video
            ref={videoRef}
            source={videoSourceUri}
            style={StyleSheet.absoluteFillObject}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={autoPlay}
            isLooping={loop}
            isMuted={muted}
            onLoad={handleVideoLoad}
          />
          {!isReady && poster && (
            <Animated.Image
              source={poster}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
          )}
        </View>
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
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
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

export default VideoSlide;
