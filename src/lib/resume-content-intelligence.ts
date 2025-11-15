/**
 * Resume Content Intelligence System
 * AI-powered content analysis, weak phrase detection, and optimization
 */

import { Resume, ResumeContentIntelligence } from '@/types/resume-schema';

// Weak phrases that should be replaced
const weakPhrases: Record<string, string> = {
  'responsible for': 'Led, Managed, Directed, Oversaw, Orchestrated',
  'worked on': 'Developed, Built, Created, Engineered, Implemented',
  'helped': 'Collaborated, Contributed, Facilitated, Supported, Enabled',
  'did': 'Executed, Delivered, Accomplished, Achieved, Completed',
  'made': 'Engineered, Created, Developed, Produced, Designed',
  'many': '[Specify exact number]',
  'various': '[List specific items]',
  'several': '[Specify exact count]',
  'some': '[Quantify precisely]',
  'a lot of': '[Use specific metrics]',
  'worked with': 'Collaborated with, Partnered with, Coordinated with',
  'duties included': 'Key achievements include, Delivered',
  'tasks included': 'Accomplished, Achieved',
};

// Power verbs categorized by context
export const powerVerbs = {
  leadership: [
    'Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Led', 
    'Managed', 'Mentored', 'Supervised', 'Guided', 'Delegated',
  ],
  achievement: [
    'Achieved', 'Exceeded', 'Surpassed', 'Delivered', 'Attained',
    'Accomplished', 'Completed', 'Realized', 'Secured', 'Won',
  ],
  creation: [
    'Architected', 'Designed', 'Developed', 'Engineered', 'Built',
    'Created', 'Established', 'Launched', 'Pioneered', 'Innovated',
  ],
  improvement: [
    'Enhanced', 'Optimized', 'Streamlined', 'Improved', 'Transformed',
    'Revitalized', 'Modernized', 'Upgraded', 'Refined', 'Accelerated',
  ],
  analysis: [
    'Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated',
    'Examined', 'Identified', 'Diagnosed', 'Audited', 'Measured',
  ],
  collaboration: [
    'Collaborated', 'Partnered', 'Coordinated', 'Facilitated', 'United',
    'Aligned', 'Integrated', 'Liaised', 'Negotiated', 'Mediated',
  ],
  growth: [
    'Scaled', 'Expanded', 'Grew', 'Increased', 'Amplified',
    'Boosted', 'Elevated', 'Maximized', 'Multiplied', 'Propelled',
  ],
};

// ATS keywords by industry
export const industryKeywords = {
  software: [
    'Agile', 'Scrum', 'CI/CD', 'API', 'Microservices', 'Cloud', 'AWS',
    'Docker', 'Kubernetes', 'REST', 'GraphQL', 'Testing', 'Git',
  ],
  data: [
    'Machine Learning', 'Data Analysis', 'SQL', 'Python', 'R', 'Statistics',
    'Visualization', 'ETL', 'Data Pipeline', 'Big Data', 'Analytics',
  ],
  product: [
    'Product Strategy', 'Roadmap', 'User Research', 'Metrics', 'A/B Testing',
    'Stakeholder Management', 'Requirements', 'Go-to-Market', 'Launch',
  ],
  design: [
    'UX', 'UI', 'Wireframes', 'Prototyping', 'Figma', 'User Research',
    'Design Systems', 'Accessibility', 'Responsive Design', 'Usability',
  ],
  marketing: [
    'SEO', 'SEM', 'Content Strategy', 'Analytics', 'Campaign Management',
    'Social Media', 'Brand Strategy', 'Lead Generation', 'Conversion',
  ],
};

/**
 * Detect weak phrases in text
 */
export const detectWeakPhrases = (text: string, location: string) => {
  const detected: { phrase: string; suggestion: string; location: string }[] = [];
  
  Object.entries(weakPhrases).forEach(([weak, strong]) => {
    const regex = new RegExp(`\\b${weak}\\b`, 'gi');
    if (regex.test(text)) {
      detected.push({
        phrase: weak,
        suggestion: strong,
        location,
      });
    }
  });

  return detected;
};

/**
 * Calculate ATS score based on various factors
 */
export const calculateATSScore = (resume: Resume): number => {
  let score = 0;
  const maxScore = 100;

  // Check contact information (20 points)
  if (resume.personalInfo.email) score += 5;
  if (resume.personalInfo.phone) score += 5;
  if (resume.personalInfo.location) score += 5;
  if (resume.personalInfo.linkedin || resume.personalInfo.github) score += 5;

  // Check experience section (25 points)
  if (resume.experience.length > 0) score += 10;
  if (resume.experience.some(exp => exp.achievements.length > 0)) score += 10;
  if (resume.experience.some(exp => exp.metrics && exp.metrics.length > 0)) score += 5;

  // Check education (15 points)
  if (resume.education.length > 0) score += 15;

  // Check skills (20 points)
  if (resume.skills.length >= 5) score += 10;
  if (resume.skills.length >= 10) score += 5;
  if (resume.skills.some(skill => skill.proficiency === 'expert' || skill.proficiency === 'advanced')) score += 5;

  // Check formatting (20 points)
  if (!resume.settings.showProfileImage) score += 5; // ATS-friendly
  if (resume.settings.atsOptimized) score += 10;
  if (resume.personalInfo.summary.length >= 100) score += 5;

  return Math.min(score, maxScore);
};

/**
 * Calculate readability score
 */
export const calculateReadabilityScore = (resume: Resume): number => {
  let score = 0;
  const maxScore = 100;

  // Summary clarity (20 points)
  const summaryWords = resume.personalInfo.summary.split(/\s+/).length;
  if (summaryWords >= 30 && summaryWords <= 100) score += 20;
  else if (summaryWords > 0) score += 10;

  // Experience descriptions (30 points)
  resume.experience.forEach(exp => {
    if (exp.achievements.length > 0) score += 5;
    if (exp.achievements.some(a => a.length >= 50 && a.length <= 200)) score += 5;
  });
  score = Math.min(score, 30);

  // Bullet points usage (20 points)
  const totalBullets = resume.experience.reduce((sum, exp) => sum + exp.achievements.length, 0);
  if (totalBullets >= 10) score += 20;
  else if (totalBullets >= 5) score += 10;

  // Section completeness (30 points)
  if (resume.personalInfo.summary) score += 10;
  if (resume.experience.length > 0) score += 10;
  if (resume.education.length > 0) score += 5;
  if (resume.skills.length > 0) score += 5;

  return Math.min(score, maxScore);
};

/**
 * Calculate impact score based on metrics and quantification
 */
export const calculateImpactScore = (resume: Resume): number => {
  let score = 0;
  const maxScore = 100;

  // Metrics in experience (50 points)
  const metricsCount = resume.experience.reduce((sum, exp) => {
    return sum + (exp.metrics?.length || 0);
  }, 0);
  score += Math.min(metricsCount * 10, 50);

  // Quantified achievements (30 points)
  const quantifiedAchievements = resume.experience.reduce((sum, exp) => {
    return sum + exp.achievements.filter(a => /\d+/.test(a)).length;
  }, 0);
  score += Math.min(quantifiedAchievements * 5, 30);

  // Power verbs usage (20 points)
  let powerVerbCount = 0;
  const allPowerVerbs = Object.values(powerVerbs).flat();
  resume.experience.forEach(exp => {
    exp.achievements.forEach(achievement => {
      if (allPowerVerbs.some(verb => achievement.toLowerCase().includes(verb.toLowerCase()))) {
        powerVerbCount++;
      }
    });
  });
  score += Math.min(powerVerbCount * 2, 20);

  return Math.min(score, maxScore);
};

/**
 * Analyze resume content and return intelligence data
 */
export const analyzeResumeContent = (resume: Resume): ResumeContentIntelligence => {
  const weakPhrasesDetected: { phrase: string; suggestion: string; location: string }[] = [];

  // Analyze summary
  const summaryWeak = detectWeakPhrases(resume.personalInfo.summary, 'Summary');
  weakPhrasesDetected.push(...summaryWeak);

  // Analyze experience
  resume.experience.forEach((exp, index) => {
    exp.achievements.forEach((achievement, achIndex) => {
      const weak = detectWeakPhrases(achievement, `Experience ${index + 1}, Achievement ${achIndex + 1}`);
      weakPhrasesDetected.push(...weak);
    });
  });

  // Calculate scores
  const atsScore = calculateATSScore(resume);
  const readabilityScore = calculateReadabilityScore(resume);
  const impactScore = calculateImpactScore(resume);

  // Generate suggestions
  const suggestions: ResumeContentIntelligence['suggestions'] = [];

  if (atsScore < 70) {
    suggestions.push({
      type: 'warning',
      section: 'general',
      message: 'Your ATS score is below 70%. Consider adding more relevant keywords and quantifying achievements.',
    });
  }

  if (!resume.personalInfo.linkedin && !resume.personalInfo.github) {
    suggestions.push({
      type: 'improvement',
      section: 'personal',
      message: 'Add LinkedIn or GitHub profile to increase credibility and ATS score.',
    });
  }

  if (resume.experience.some(exp => exp.achievements.length === 0)) {
    suggestions.push({
      type: 'error',
      section: 'experience',
      message: 'Some experience entries lack achievements. Add specific accomplishments with metrics.',
    });
  }

  if (resume.skills.length < 8) {
    suggestions.push({
      type: 'improvement',
      section: 'skills',
      message: 'Add more relevant skills to reach at least 8-10 for better ATS performance.',
    });
  }

  if (weakPhrasesDetected.length > 5) {
    suggestions.push({
      type: 'warning',
      section: 'content',
      message: `Found ${weakPhrasesDetected.length} weak phrases. Replace them with strong action verbs for more impact.`,
    });
  }

  return {
    weakPhrases: weakPhrasesDetected,
    missingKeywords: [], // Can be enhanced with industry-specific analysis
    atsScore,
    readabilityScore,
    impactScore,
    suggestions,
  };
};

/**
 * Get power verb suggestions for a given context
 */
export const getPowerVerbSuggestions = (context: string): string[] => {
  const contextLower = context.toLowerCase();
  
  if (contextLower.includes('lead') || contextLower.includes('manage')) {
    return powerVerbs.leadership;
  } else if (contextLower.includes('create') || contextLower.includes('build')) {
    return powerVerbs.creation;
  } else if (contextLower.includes('improve') || contextLower.includes('optimize')) {
    return powerVerbs.improvement;
  } else if (contextLower.includes('analyze') || contextLower.includes('research')) {
    return powerVerbs.analysis;
  } else if (contextLower.includes('grow') || contextLower.includes('scale')) {
    return powerVerbs.growth;
  } else if (contextLower.includes('work with') || contextLower.includes('team')) {
    return powerVerbs.collaboration;
  }
  
  return powerVerbs.achievement;
};
