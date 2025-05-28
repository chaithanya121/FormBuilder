
import React from 'react';
import { useTheme } from '@/components/theme-provider';

export const useEnhancedTheme = () => {
  const { theme } = useTheme();
  
  const themeClasses = {
    // Background gradients
    pageBackground: theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    
    // Card styles
    card: theme === 'light'
      ? 'bg-white/90 border-white/50 shadow-xl backdrop-blur-sm'
      : 'bg-gray-800/50 border-gray-700 shadow-2xl backdrop-blur-sm',
    
    cardHover: theme === 'light'
      ? 'hover:shadow-2xl hover:bg-white/95'
      : 'hover:shadow-purple-500/10 hover:bg-gray-800/70',
    
    // Text colors
    heading: theme === 'light'
      ? 'bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent',
    
    text: theme === 'light' ? 'text-gray-700' : 'text-gray-300',
    textMuted: theme === 'light' ? 'text-gray-500' : 'text-gray-400',
    
    // Button styles
    button: theme === 'light'
      ? 'bg-white/80 hover:bg-blue-50 border-gray-300 text-gray-700 hover:text-blue-600'
      : 'bg-gray-800/80 hover:bg-gray-700 border-gray-600 text-gray-300 hover:text-white',
    
    // Input styles
    input: theme === 'light'
      ? 'bg-white/80 border-gray-300 focus:border-blue-500 text-gray-900'
      : 'bg-gray-800/50 border-gray-600 focus:border-blue-400 text-white',
    
    // Gradient accents
    accent: 'bg-gradient-to-r from-blue-500 to-purple-600',
    accentHover: 'from-blue-600 to-purple-700',
    
    // Status colors
    success: theme === 'light' ? 'text-green-600' : 'text-green-400',
    warning: theme === 'light' ? 'text-amber-600' : 'text-amber-400',
    error: theme === 'light' ? 'text-red-600' : 'text-red-400',
    
    // Decorative elements
    decoration: theme === 'light' ? 'bg-blue-200/30' : 'bg-blue-500/10',
    decorationSecondary: theme === 'light' ? 'bg-purple-200/30' : 'bg-purple-500/10'
  };
  
  return { theme, themeClasses };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
