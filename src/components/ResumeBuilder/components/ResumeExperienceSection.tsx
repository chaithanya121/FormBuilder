import React from 'react';
import { ResumeExperience, ResumeDesignTokens } from '@/types/resume-schema';
import { Calendar, MapPin } from 'lucide-react';

interface ResumeExperienceSectionProps {
  experiences: ResumeExperience[];
  designTokens: ResumeDesignTokens;
  showIcons?: boolean;
}

export const ResumeExperienceSection: React.FC<ResumeExperienceSectionProps> = ({
  experiences,
  designTokens,
  showIcons = true,
}) => {
  const { colors, typography, spacing } = designTokens;

  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="resume-experience-section" style={{ marginBottom: spacing.section }}>
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
        EXPERIENCE
      </h2>

      {experiences.map((experience) => (
        <div
          key={experience.id}
          style={{
            marginBottom: spacing.element,
          }}
        >
          {/* Position and Company */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: spacing.compact,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: typography.fontFamily.heading,
                  fontSize: typography.fontSize.h3,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text,
                  margin: 0,
                }}
              >
                {experience.position}
              </h3>
              <p
                style={{
                  fontFamily: typography.fontFamily.body,
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.accent,
                  margin: `${spacing.compact} 0 0 0`,
                }}
              >
                {experience.company}
              </p>
            </div>

            <div
              style={{
                textAlign: 'right',
                fontSize: typography.fontSize.small,
                color: colors.textSecondary,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                {showIcons && <Calendar size={12} />}
                <span>
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>
              {experience.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  {showIcons && <MapPin size={12} />}
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {experience.description && (
            <p
              style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize.body,
                lineHeight: typography.lineHeight.normal,
                color: colors.textSecondary,
                marginBottom: spacing.compact,
              }}
            >
              {experience.description}
            </p>
          )}

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <ul
              style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize.body,
                lineHeight: typography.lineHeight.normal,
                color: colors.text,
                marginLeft: '20px',
                marginTop: spacing.compact,
              }}
            >
              {experience.achievements.map((achievement, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          {/* Metrics */}
          {experience.metrics && experience.metrics.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: spacing.element,
                marginTop: spacing.compact,
                flexWrap: 'wrap',
              }}
            >
              {experience.metrics.map((metric, index) => (
                <div
                  key={index}
                  style={{
                    padding: `${spacing.compact} ${spacing.element}`,
                    backgroundColor: colors.secondary,
                    borderRadius: '4px',
                    fontSize: typography.fontSize.small,
                  }}
                >
                  <div style={{ fontWeight: typography.fontWeight.bold, color: colors.accent }}>
                    {metric.value}
                  </div>
                  <div style={{ color: colors.textSecondary, fontSize: '10px' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: spacing.compact,
                flexWrap: 'wrap',
              }}
            >
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    padding: '2px 8px',
                    backgroundColor: colors.secondary,
                    color: colors.text,
                    fontSize: typography.fontSize.small,
                    borderRadius: '3px',
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
