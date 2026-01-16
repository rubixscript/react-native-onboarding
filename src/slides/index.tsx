export { ImageSlide } from './ImageSlide';
export { IconSlide } from './IconSlide';
export { FormSlide } from './FormSlide';
export { VideoSlide } from './VideoSlide';

import { ImageSlide } from './ImageSlide';
import { IconSlide } from './IconSlide';
import { FormSlide } from './FormSlide';
import { VideoSlide } from './VideoSlide';
import { SlideData, OnboardingTheme } from '../types';

interface SlideRendererProps {
  data: SlideData;
  theme: OnboardingTheme;
  darkMode?: boolean;
  onSubmit?: (data: Record<string, any>) => void;
  isSubmitting?: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ data, theme, darkMode, onSubmit, isSubmitting }) => {
  switch (data.type) {
    case 'image':
      return <ImageSlide data={data} theme={theme} darkMode={darkMode} />;
    case 'icon':
      return <IconSlide data={data} theme={theme} darkMode={darkMode} />;
    case 'form':
      return <FormSlide data={data} theme={theme} onSubmit={onSubmit || (() => {})} darkMode={darkMode} isSubmitting={isSubmitting} />;
    case 'video':
      return <VideoSlide data={data} theme={theme} darkMode={darkMode} />;
    case 'custom':
      const CustomComponent = (data as any).component;
      return <CustomComponent {...(data as any).props} theme={theme} darkMode={darkMode} />;
    default:
      return null;
  }
};

