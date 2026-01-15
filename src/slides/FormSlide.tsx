import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FormSlideData, OnboardingTheme, FormFieldConfig } from '../types';

interface FormSlideProps {
  data: FormSlideData;
  theme: OnboardingTheme;
  onSubmit: (formData: Record<string, any>) => void;
  darkMode?: boolean;
  isSubmitting?: boolean;
}

export const FormSlide: React.FC<FormSlideProps> = ({
  data,
  theme,
  onSubmit,
  darkMode,
  isSubmitting = false,
}) => {
  const { title, description, fields, submitLabel = 'Get Started', gradientColors } = data;
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const containerStyle = useMemo(() => {
    const styles: any = {
      flex: 1,
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

  const updateField = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`;
      } else if (field.validation && formData[field.key]) {
        const validationResult = field.validation(formData[field.key]);
        if (typeof validationResult === 'string') {
          newErrors[field.key] = validationResult;
        } else if (!validationResult) {
          newErrors[field.key] = `${field.label} is invalid`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormFieldConfig) => {
    const value = formData[field.key];
    const error = errors[field.key];

    if (field.type === 'select') {
      return (
        <View key={field.key} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.optionsContainer}>
            {field.options?.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  value === option.value && styles.optionCardActive,
                  { borderColor: theme.colors.border },
                ]}
                onPress={() => updateField(field.key, option.value)}
              >
                {option.icon && (
                  <Ionicons
                    name={option.icon as any}
                    size={20}
                    color={value === option.value ? theme.colors.text.inverse : theme.colors.text.secondary}
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text
                  style={[
                    styles.optionLabel,
                    value === option.value && { color: theme.colors.text.inverse },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      );
    }

    return (
      <View key={field.key} style={styles.fieldContainer}>
        <Text style={styles.label}>{field.label}</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: error ? theme.colors.text.secondary : theme.colors.border },
          ]}
          placeholder={field.placeholder}
          placeholderTextColor={theme.colors.text.secondary}
          value={value}
          onChangeText={text => updateField(field.key, text)}
          keyboardType={field.type === 'number' ? 'numeric' : field.type === 'email' ? 'email-address' : 'default'}
          secureTextEntry={field.type === 'password'}
          multiline={field.multiline}
          numberOfLines={field.numberOfLines}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  const headerStyle = useMemo(() => ({
    ...styles.header,
    backgroundColor: 'transparent',
  }), []);

  const titleStyle = useMemo(() => ({
    ...styles.title,
    color: gradientColors?.length ? theme.colors.text.primary : theme.colors.text.primary,
  }), [gradientColors, theme]);

  const descriptionStyle = useMemo(() => ({
    ...styles.description,
    color: gradientColors?.length ? theme.colors.text.secondary : theme.colors.text.secondary,
  }), [gradientColors, theme]);

  const content = (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(300)} style={headerStyle}>
          {title && <Text style={titleStyle}>{title}</Text>}
          {description && <Text style={descriptionStyle}>{description}</Text>}
        </Animated.View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {fields.map(renderField)}
        </View>

        {/* Submit Button */}
        <Animated.View entering={FadeIn.delay(300).duration(300)} style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>{isSubmitting ? 'Submitting...' : submitLabel}</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  fieldContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    minWidth: 100,
  },
  optionCardActive: {
    backgroundColor: '#6B4EFF',
    borderColor: '#6B4EFF',
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  submitButton: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 9999,
    minWidth: 200,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FormSlide;
