import React from 'react';
import { ResumeCertification, ResumeDesignTokens } from '@/types/resume-schema';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface ResumeCertificationsSectionProps {
  certifications: ResumeCertification[];
  designTokens: ResumeDesignTokens;
  showIcons?: boolean;
}

export const ResumeCertificationsSection: React.FC<ResumeCertificationsSectionProps> = ({
  certifications,
  designTokens,
  showIcons = true,
}) => {
  const { colors, typography, spacing } = designTokens;

  if (!certifications || certifications.length === 0) return null;

  return (
    <div className="resume-certifications-section" style={{ marginBottom: spacing.section }}>
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
        CERTIFICATIONS
      </h2>

      {certifications.map((cert) => (
        <div
          key={cert.id}
          style={{
            marginBottom: spacing.element,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {showIcons && <Award size={16} style={{ color: colors.accent }} />}
              <h3
                style={{
                  fontFamily: typography.fontFamily.heading,
                  fontSize: typography.fontSize.h3,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text,
                  margin: 0,
                }}
              >
                {cert.name}
              </h3>
              {cert.url && showIcons && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.accent }}
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            <p
              style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize.body,
                color: colors.textSecondary,
                margin: '4px 0',
              }}
            >
              {cert.issuer}
            </p>

            {cert.credentialId && (
              <p
                style={{
                  fontFamily: typography.fontFamily.monospace,
                  fontSize: typography.fontSize.small,
                  color: colors.textSecondary,
                  margin: '2px 0',
                }}
              >
                ID: {cert.credentialId}
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
              <span>{cert.date}</span>
            </div>
            {cert.expiryDate && (
              <div style={{ marginTop: '4px' }}>
                <span style={{ fontSize: '10px' }}>Expires: {cert.expiryDate}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
