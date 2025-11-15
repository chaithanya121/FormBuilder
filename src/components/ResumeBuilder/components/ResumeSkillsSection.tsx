import React from 'react';
import { ResumeSkill, ResumeDesignTokens } from '@/types/resume-schema';

interface ResumeSkillsSectionProps {
  skills: ResumeSkill[];
  designTokens: ResumeDesignTokens;
  showSkillBars?: boolean;
}

export const ResumeSkillsSection: React.FC<ResumeSkillsSectionProps> = ({
  skills,
  designTokens,
  showSkillBars = true,
}) => {
  const { colors, typography, spacing } = designTokens;

  if (!skills || skills.length === 0) return null;

  const getProficiencyPercentage = (proficiency: string): number => {
    switch (proficiency) {
      case 'expert': return 100;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      case 'beginner': return 40;
      default: return 50;
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, ResumeSkill[]>);

  return (
    <div className="resume-skills-section" style={{ marginBottom: spacing.section }}>
      <h2
        style={{
          fontFamily: typography.fontFamily.heading,
          fontSize: typography.fontSize.h2,
          fontWeight: typography.fontWeight.bold,
          color: colors.primary,
          marginBottom: spacing.element,
          borderBottom: `2px solid ${colors.accent}`,
          paddingBottom: spacing.compact,
        }}
      >
        SKILLS
      </h2>

      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} style={{ marginBottom: spacing.element }}>
          <h3
            style={{
              fontFamily: typography.fontFamily.heading,
              fontSize: typography.fontSize.h3,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text,
              marginBottom: spacing.compact,
              textTransform: 'capitalize',
            }}
          >
            {category}
          </h3>

          {showSkillBars ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.compact }}>
              {categorySkills.map((skill) => (
                <div key={skill.id}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                      fontSize: typography.fontSize.small,
                    }}
                  >
                    <span style={{ color: colors.text, fontWeight: typography.fontWeight.medium }}>
                      {skill.name}
                    </span>
                    <span style={{ color: colors.textSecondary, fontSize: '10px' }}>
                      {skill.proficiency}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: colors.secondary,
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${getProficiencyPercentage(skill.proficiency)}%`,
                        height: '100%',
                        backgroundColor: colors.accent,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {categorySkills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: colors.secondary,
                    color: colors.text,
                    fontSize: typography.fontSize.small,
                    borderRadius: '4px',
                    fontWeight: typography.fontWeight.medium,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
