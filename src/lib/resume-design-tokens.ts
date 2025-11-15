/**
 * Resume Design System - Design Tokens
 * Comprehensive design tokens for all resume templates
 */

import { ResumeDesignTokens } from '@/types/resume-schema';

export const modernTokens: ResumeDesignTokens = {
  colors: {
    primary: 'hsl(222, 47%, 11%)',
    secondary: 'hsl(210, 40%, 96%)',
    accent: 'hsl(217, 91%, 60%)',
    text: 'hsl(222, 47%, 11%)',
    textSecondary: 'hsl(215, 16%, 47%)',
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(214, 32%, 91%)',
  },
  typography: {
    fontFamily: {
      heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      monospace: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      h1: '28px',
      h2: '20px',
      h3: '16px',
      body: '14px',
      small: '12px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    section: '32px',
    element: '16px',
    compact: '8px',
  },
  layout: {
    maxWidth: '800px',
    columns: 1,
    gutter: '24px',
  },
  effects: {
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
};

export const professionalTokens: ResumeDesignTokens = {
  colors: {
    primary: 'hsl(210, 29%, 24%)',
    secondary: 'hsl(210, 16%, 93%)',
    accent: 'hsl(208, 79%, 51%)',
    text: 'hsl(210, 29%, 24%)',
    textSecondary: 'hsl(210, 11%, 47%)',
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(210, 18%, 87%)',
  },
  typography: {
    fontFamily: {
      heading: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      monospace: '"Roboto Mono", monospace',
    },
    fontSize: {
      h1: '26px',
      h2: '18px',
      h3: '15px',
      body: '13px',
      small: '11px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.15,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  spacing: {
    section: '28px',
    element: '14px',
    compact: '7px',
  },
  layout: {
    maxWidth: '850px',
    columns: 2,
    gutter: '32px',
  },
  effects: {
    borderRadius: '2px',
    boxShadow: 'none',
  },
};

export const creativeTokens: ResumeDesignTokens = {
  colors: {
    primary: 'hsl(271, 76%, 53%)',
    secondary: 'hsl(271, 100%, 97%)',
    accent: 'hsl(340, 82%, 52%)',
    text: 'hsl(271, 47%, 15%)',
    textSecondary: 'hsl(271, 16%, 50%)',
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(271, 32%, 90%)',
  },
  typography: {
    fontFamily: {
      heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      monospace: '"Source Code Pro", monospace',
    },
    fontSize: {
      h1: '32px',
      h2: '22px',
      h3: '17px',
      body: '14px',
      small: '12px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.6,
      relaxed: 1.8,
    },
  },
  spacing: {
    section: '36px',
    element: '18px',
    compact: '10px',
  },
  layout: {
    maxWidth: '820px',
    columns: 1,
    gutter: '28px',
  },
  effects: {
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.1)',
  },
};

export const minimalTokens: ResumeDesignTokens = {
  colors: {
    primary: 'hsl(0, 0%, 0%)',
    secondary: 'hsl(0, 0%, 96%)',
    accent: 'hsl(0, 0%, 20%)',
    text: 'hsl(0, 0%, 0%)',
    textSecondary: 'hsl(0, 0%, 40%)',
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(0, 0%, 90%)',
  },
  typography: {
    fontFamily: {
      heading: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      monospace: '"Courier New", Courier, monospace',
    },
    fontSize: {
      h1: '24px',
      h2: '16px',
      h3: '14px',
      body: '12px',
      small: '10px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.1,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  spacing: {
    section: '24px',
    element: '12px',
    compact: '6px',
  },
  layout: {
    maxWidth: '750px',
    columns: 1,
    gutter: '20px',
  },
  effects: {
    borderRadius: '0px',
    boxShadow: 'none',
  },
};

export const executiveTokens: ResumeDesignTokens = {
  colors: {
    primary: 'hsl(213, 94%, 12%)',
    secondary: 'hsl(213, 30%, 94%)',
    accent: 'hsl(47, 100%, 50%)',
    text: 'hsl(213, 47%, 12%)',
    textSecondary: 'hsl(213, 16%, 45%)',
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(213, 32%, 88%)',
  },
  typography: {
    fontFamily: {
      heading: '"Merriweather", Georgia, serif',
      body: '"Open Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      monospace: '"Consolas", monospace',
    },
    fontSize: {
      h1: '30px',
      h2: '19px',
      h3: '16px',
      body: '13px',
      small: '11px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  spacing: {
    section: '30px',
    element: '15px',
    compact: '8px',
  },
  layout: {
    maxWidth: '850px',
    columns: 2,
    gutter: '36px',
  },
  effects: {
    borderRadius: '3px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
  },
};

export const technicalTokens: ResumeDesignTokens = {
  colors: {
    primary: 'hsl(142, 71%, 45%)',
    secondary: 'hsl(142, 71%, 97%)',
    accent: 'hsl(173, 80%, 40%)',
    text: 'hsl(142, 47%, 10%)',
    textSecondary: 'hsl(142, 16%, 45%)',
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(142, 32%, 90%)',
  },
  typography: {
    fontFamily: {
      heading: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      monospace: '"IBM Plex Mono", monospace',
    },
    fontSize: {
      h1: '27px',
      h2: '19px',
      h3: '15px',
      body: '13px',
      small: '11px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.45,
      relaxed: 1.65,
    },
  },
  spacing: {
    section: '30px',
    element: '14px',
    compact: '7px',
  },
  layout: {
    maxWidth: '820px',
    columns: 1,
    gutter: '24px',
  },
  effects: {
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(34, 197, 94, 0.1)',
  },
};

// Dark mode variants
export const darkModeTokens = (baseTokens: ResumeDesignTokens): ResumeDesignTokens => ({
  ...baseTokens,
  colors: {
    ...baseTokens.colors,
    text: 'hsl(210, 40%, 98%)',
    textSecondary: 'hsl(215, 20%, 65%)',
    background: 'hsl(222, 47%, 11%)',
    border: 'hsl(217, 33%, 17%)',
  },
});

export const getDesignTokens = (
  template: string,
  darkMode: boolean = false
): ResumeDesignTokens => {
  let tokens: ResumeDesignTokens;

  switch (template) {
    case 'professional':
      tokens = professionalTokens;
      break;
    case 'creative':
      tokens = creativeTokens;
      break;
    case 'minimal':
      tokens = minimalTokens;
      break;
    case 'executive':
      tokens = executiveTokens;
      break;
    case 'technical':
      tokens = technicalTokens;
      break;
    case 'modern':
    default:
      tokens = modernTokens;
  }

  return darkMode ? darkModeTokens(tokens) : tokens;
};
