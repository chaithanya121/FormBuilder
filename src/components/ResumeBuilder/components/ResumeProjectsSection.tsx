import React from 'react';
import { ResumeProject, ResumeDesignTokens } from '@/types/resume-schema';
import { Calendar, ExternalLink, Github } from 'lucide-react';

interface ResumeProjectsSectionProps {
  projects: ResumeProject[];
  designTokens: ResumeDesignTokens;
  showIcons?: boolean;
}

export const ResumeProjectsSection: React.FC<ResumeProjectsSectionProps> = ({
  projects,
  designTokens,
  showIcons = true,
}) => {
  const { colors, typography, spacing } = designTokens;

  if (!projects || projects.length === 0) return null;

  return (
    <div className="resume-projects-section" style={{ marginBottom: spacing.section }}>
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
        PROJECTS
      </h2>

      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: spacing.element }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3
                  style={{
                    fontFamily: typography.fontFamily.heading,
                    fontSize: typography.fontSize.h3,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {project.name}
                </h3>
                {showIcons && (
                  <>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: colors.accent }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: colors.accent }}
                      >
                        <Github size={14} />
                      </a>
                    )}
                  </>
                )}
              </div>

              {project.role && (
                <p
                  style={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: typography.fontSize.small,
                    color: colors.accent,
                    margin: '4px 0',
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  Role: {project.role}
                </p>
              )}
            </div>

            <div
              style={{
                textAlign: 'right',
                fontSize: typography.fontSize.small,
                color: colors.textSecondary,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {showIcons && <Calendar size={12} />}
              <span>
                {project.startDate} - {project.endDate}
              </span>
            </div>
          </div>

          <p
            style={{
              fontFamily: typography.fontFamily.body,
              fontSize: typography.fontSize.body,
              color: colors.text,
              margin: `${spacing.compact} 0`,
              lineHeight: typography.lineHeight.normal,
            }}
          >
            {project.description}
          </p>

          {project.achievements && project.achievements.length > 0 && (
            <ul
              style={{
                fontSize: typography.fontSize.body,
                color: colors.text,
                marginLeft: '20px',
                marginTop: spacing.compact,
                lineHeight: typography.lineHeight.normal,
              }}
            >
              {project.achievements.map((achievement, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', marginTop: spacing.compact, flexWrap: 'wrap' }}>
              {project.technologies.map((tech, index) => (
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
