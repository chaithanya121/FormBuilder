
import { useState, useEffect } from 'react';
import { FormConfig } from '@/components/FormBuilder/types';

interface ThemeData {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
  };
  design: {
    borderRadius: number;
  };
}

export const useThemeIntegration = () => {
  const [savedThemes, setSavedThemes] = useState<ThemeData[]>([]);

  const saveTheme = (theme: ThemeData) => {
    try {
      const themes = getSavedThemes();
      const existingIndex = themes.findIndex(t => t.name === theme.name);
      
      if (existingIndex >= 0) {
        themes[existingIndex] = theme;
      } else {
        themes.push(theme);
      }
      
      localStorage.setItem('themeStudio_themes', JSON.stringify(themes));
      setSavedThemes(themes);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const getSavedThemes = (): ThemeData[] => {
    try {
      const saved = localStorage.getItem('themeStudio_themes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to get saved themes:', error);
      return [];
    }
  };

  const applyThemeToForm = (theme: ThemeData, formConfig: FormConfig): FormConfig => {
    return {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          primaryColor: theme.colors.primary,
          secondaryColor: theme.colors.secondary,
          formBackgroundColor: theme.colors.background,
          fontColor: theme.colors.text,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          borderRadius: `${theme.design.borderRadius}px`
        }
      }
    };
  };

  const exportThemeForFormBuilder = (theme: ThemeData) => {
    const formBuilderTheme = {
      backgroundColor: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
      formBackgroundColor: theme.colors.background,
      fontColor: theme.colors.text,
      primaryColor: theme.colors.primary,
      secondaryColor: theme.colors.secondary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      borderRadius: `${theme.design.borderRadius}px`,
      padding: "32px",
      margin: "10px"
    };

    return formBuilderTheme;
  };

  useEffect(() => {
    setSavedThemes(getSavedThemes());
  }, []);

  return {
    savedThemes,
    saveTheme,
    getSavedThemes,
    applyThemeToForm,
    exportThemeForFormBuilder
  };
};
