/**
 * Comprehensive Resume Schema - Next Generation
 * Fully modular, ATS-compliant, and dynamically renderable
 */

export interface ResumeDesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    background: string;
    border: string;
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
      monospace: string;
    };
    fontSize: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
      small: string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    section: string;
    element: string;
    compact: string;
  };
  layout: {
    maxWidth: string;
    columns: number;
    gutter: string;
  };
  effects: {
    borderRadius: string;
    boxShadow: string;
  };
}

export interface ResumePersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary: string;
  profileImage?: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  current: boolean;
  description: string;
  achievements: string[];
  technologies?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
}

export interface ResumeSkill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool' | 'framework';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  visualize: boolean;
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
  url?: string;
  github?: string;
  technologies: string[];
  achievements: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeAward {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface ResumePublication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  coAuthors?: string[];
}

export interface ResumeLanguage {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface ResumeSettings {
  template: 'modern' | 'professional' | 'creative' | 'minimal' | 'executive' | 'technical';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'monochrome' | 'custom';
  layout: 'single-column' | 'two-column' | 'sidebar' | 'timeline';
  pageSize: 'letter' | 'a4';
  showProfileImage: boolean;
  showIcons: boolean;
  showSkillBars: boolean;
  showQRCode: boolean;
  qrCodeData?: string;
  darkMode: boolean;
  atsOptimized: boolean;
  sectionOrder: string[];
}

export interface ResumeMetadata {
  id: string;
  name: string;
  version: number;
  created: string;
  lastModified: string;
  downloads: number;
  views: number;
  status: 'draft' | 'active' | 'archived';
  tags: string[];
  targetRole?: string;
  targetCompany?: string;
}

export interface ResumeContentIntelligence {
  weakPhrases: {
    phrase: string;
    suggestion: string;
    location: string;
  }[];
  missingKeywords: string[];
  atsScore: number;
  readabilityScore: number;
  impactScore: number;
  suggestions: {
    type: 'improvement' | 'warning' | 'error';
    section: string;
    message: string;
  }[];
}

export interface Resume {
  metadata: ResumeMetadata;
  personalInfo: ResumePersonalInfo;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  projects?: ResumeProject[];
  certifications?: ResumeCertification[];
  awards?: ResumeAward[];
  publications?: ResumePublication[];
  languages?: ResumeLanguage[];
  customSections?: {
    id: string;
    title: string;
    content: string;
    order: number;
  }[];
  settings: ResumeSettings;
  designTokens: ResumeDesignTokens;
  intelligence?: ResumeContentIntelligence;
}

// Template Definitions
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'modern' | 'professional' | 'creative' | 'minimal' | 'executive' | 'technical';
  atsCompliant: boolean;
  designTokens: ResumeDesignTokens;
  defaultSettings: ResumeSettings;
  features: string[];
  preview: string;
}

// Export formats
export type ResumeExportFormat = 'pdf' | 'docx' | 'html' | 'json' | 'png';

export interface ResumeExportOptions {
  format: ResumeExportFormat;
  quality: 'standard' | 'high' | 'print';
  includeImages: boolean;
  embedFonts: boolean;
  optimize: boolean;
  fileName: string;
}
