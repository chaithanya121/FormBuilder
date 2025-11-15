import React from 'react';
import { ResumeEducation, ResumeDesignTokens } from '@/types/resume-schema';
import { Calendar, MapPin, Award } from 'lucide-react';

interface ResumeEducationSectionProps {
  education: ResumeEducation[];
  designTokens: ResumeDesignTokens;
  showIcons?: boolean;
}

export const ResumeEducationSection: React.FC<ResumeEducationSectionProps> = ({
  education,
  designTokens,
  showIcons = true,
}) => {
  const { colors, typography, spacing } = designTokens;

  if (!education || education.length === 0) return null;

  return (
    <div className="resume-education-section" style={{ marginBottom: spacing.section }}>
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
        EDUCATION
      </h2>

      {education.map((edu) => (
        <div
          key={edu.id}
          style={{
            marginBottom: spacing.element,
          }}
        >
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
                {edu.degree}
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
                {edu.institution}
              </p>
              {edu.field && (
                <p
                  style={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: typography.fontSize.small,
                    color: colors.textSecondary,
                    margin: '4px 0 0 0',
                  }}
                >
                  Field of Study: {edu.field}
                </p>
              )}
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
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  {showIcons && <MapPin size={12} />}
                  <span>{edu.location}</span>
                </div>
              )}
              {edu.gpa && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  {showIcons && <Award size={12} />}
                  <span>GPA: {edu.gpa}</span>
                </div>
              )}
            </div>
          </div>

          {/* Honors */}
          {edu.honors && edu.honors.length > 0 && (
            <div style={{ marginTop: spacing.compact }}>
              <p
                style={{
                  fontSize: typography.fontSize.small,
                  color: colors.textSecondary,
                  fontWeight: typography.fontWeight.medium,
                  marginBottom: '4px',
                }}
              >
                Honors:
              </p>
              <ul
                style={{
                  fontSize: typography.fontSize.small,
                  color: colors.text,
                  marginLeft: '20px',
                  marginTop: '2px',
                }}
              >
                {edu.honors.map((honor, index) => (
                  <li key={index}>{honor}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Relevant Courses */}
          {edu.relevantCourses && edu.relevantCourses.length > 0 && (
            <div style={{ marginTop: spacing.compact }}>
              <p
                style={{
                  fontSize: typography.fontSize.small,
                  color: colors.textSecondary,
                  fontWeight: typography.fontWeight.medium,
                  marginBottom: '4px',
                }}
              >
                Relevant Courses:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {edu.relevantCourses.map((course, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '2px 8px',
                      backgroundColor: colors.secondary,
                      color: colors.text,
                      fontSize: typography.fontSize.small,
                      borderRadius: '3px',
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
