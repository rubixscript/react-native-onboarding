import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { PaginationProps, NavigationStyle } from '../types';

// DOTS PAGINATION
const DotsPagination: React.FC<PaginationProps> = ({ currentIndex, totalSlides, theme, style }) => {
  const animatedIndex = useDerivedValue(() => withSpring(currentIndex, { damping: 15, stiffness: 150 }));

  return (
    <View style={[styles.dotsContainer, style]}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          width: index === animatedIndex.value ? 24 : 8,
          opacity: withSpring(index === animatedIndex.value ? 1 : 0.4, { damping: 15, stiffness: 150 }),
        }));

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: theme.colors.primary,
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

// PROGRESS BAR PAGINATION
const ProgressBarPagination: React.FC<PaginationProps> = ({ currentIndex, totalSlides, theme, style }) => {
  const progress = useMemo(() => (currentIndex + 1) / totalSlides, [currentIndex, totalSlides]);

  return (
    <View style={[styles.progressContainer, style]}>
      <View style={[styles.progressBackground, { backgroundColor: theme.colors.border }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%`,
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
      </View>
      <Animated.Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>
        {currentIndex + 1} / {totalSlides}
      </Animated.Text>
    </View>
  );
};

// STEPS PAGINATION
const StepsPagination: React.FC<PaginationProps> = ({ currentIndex, totalSlides, theme, style }) => {
  return (
    <View style={[styles.stepsContainer, style]}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <View key={index} style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                {
                  backgroundColor: isCompleted ? theme.colors.primary : isCurrent ? theme.colors.primary : theme.colors.border,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              {isCompleted ? (
                <View style={styles.stepCheckmark} />
              ) : (
                <Animated.Text
                  style={[
                    styles.stepNumber,
                    { color: isCurrent ? theme.colors.text.inverse : theme.colors.text.secondary },
                  ]}
                >
                  {index + 1}
                </Animated.Text>
              )}
            </View>
            {index < totalSlides - 1 && (
              <View
                style={[
                  styles.stepLine,
                  { backgroundColor: isCompleted ? theme.colors.primary : theme.colors.border },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

// NUMBERS PAGINATION
const NumbersPagination: React.FC<PaginationProps> = ({ currentIndex, totalSlides, theme, style }) => {
  return (
    <View style={[styles.numbersContainer, style]}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isCurrent = index === currentIndex;

        return (
          <Animated.View
            key={index}
            style={[
              styles.numberCircle,
              {
                backgroundColor: isCurrent ? theme.colors.primary : 'transparent',
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.numberText,
                { color: isCurrent ? theme.colors.text.inverse : theme.colors.text.secondary },
              ]}
            >
              {index + 1}
            </Animated.Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

// FLOATING DOTS PAGINATION
const FloatingDotsPagination: React.FC<PaginationProps> = ({ currentIndex, totalSlides, theme, style }) => {
  return (
    <View style={[styles.floatingContainer, style]}>
      <LinearGradient
        colors={[theme.colors.surface + 'CC', theme.colors.surface + 'CC']}
        style={styles.floatingBackground}
      >
        <View style={styles.floatingDots}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.floatingDot,
                {
                  width: index === currentIndex ? 28 : 10,
                  backgroundColor: index === currentIndex ? theme.colors.primary : theme.colors.border,
                },
              ]}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

// MAIN PAGINATION COMPONENT
export const Pagination: React.FC<PaginationProps> = ({ currentIndex, totalSlides, theme, config, style }) => {
  const { style: navStyle, position } = config || { style: 'dots' as const, position: 'bottom' as const };

  const containerStyle: ViewStyle = useMemo(() => {
    const base: ViewStyle = {};

    if (position === 'top') {
      base.position = 'absolute';
      base.top = 0;
      base.left = 0;
      base.right = 0;
      base.paddingTop = 20;
    } else if (position === 'bottom') {
      base.position = 'absolute';
      base.bottom = 0;
      base.left = 0;
      base.right = 0;
      base.paddingBottom = 20;
    }

    return base;
  }, [position]);

  const renderPagination = () => {
    switch (navStyle) {
      case 'dots':
        return <DotsPagination currentIndex={currentIndex} totalSlides={totalSlides} theme={theme} style={style} />;
      case 'progress-bar':
        return <ProgressBarPagination currentIndex={currentIndex} totalSlides={totalSlides} theme={theme} style={style} />;
      case 'steps':
        return <StepsPagination currentIndex={currentIndex} totalSlides={totalSlides} theme={theme} style={style} />;
      case 'numbers':
        return <NumbersPagination currentIndex={currentIndex} totalSlides={totalSlides} theme={theme} style={style} />;
      case 'none':
        return null;
      default:
        return <DotsPagination currentIndex={currentIndex} totalSlides={totalSlides} theme={theme} style={style} />;
    }
  };

  if (navStyle === 'none') return null;

  return <View style={containerStyle}>{renderPagination()}</View>;
};

const styles = StyleSheet.create({
  // Dots
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },

  // Progress Bar
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Steps
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepCheckmark: {
    width: 12,
    height: 6,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }, { translateY: -2 }],
  },
  stepLine: {
    flex: 1,
    height: 2,
    minWidth: 8,
  },

  // Numbers
  numbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Floating
  floatingContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  floatingBackground: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  floatingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  floatingDot: {
    height: 10,
    borderRadius: 5,
  },
});

export default Pagination;
