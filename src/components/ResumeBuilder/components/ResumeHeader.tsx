import React from 'react';
import { ResumePersonalInfo, ResumeDesignTokens } from '@/types/resume-schema';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ResumeHeaderProps {
  personalInfo: ResumePersonalInfo;
  designTokens: ResumeDesignTokens;
  showIcons?: boolean;
  showQRCode?: boolean;
  qrCodeData?: string;
  showProfileImage?: boolean;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  personalInfo,
  designTokens,
  showIcons = true,
  showQRCode = false,
  qrCodeData,
  showProfileImage = false,
}) => {
  const { colors, typography, spacing } = designTokens;

  return (
    <div 
      className="resume-header"
      style={{
        marginBottom: spacing.section,
        display: 'flex',
        gap: spacing.element,
        alignItems: 'center',
      }}
    >
      {/* Profile Image */}
      {showProfileImage && personalInfo.profileImage && (
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: `2px solid ${colors.border}`,
          }}
        >
          <img
            src={personalInfo.profileImage}
            alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Main Info */}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontFamily: typography.fontFamily.heading,
            fontSize: typography.fontSize.h1,
            fontWeight: typography.fontWeight.bold,
            color: colors.primary,
            margin: 0,
            lineHeight: typography.lineHeight.tight,
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <h2
          style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.h3,
            fontWeight: typography.fontWeight.medium,
            color: colors.accent,
            margin: `${spacing.compact} 0`,
            lineHeight: typography.lineHeight.tight,
          }}
        >
          {personalInfo.title}
        </h2>

        {/* Contact Information */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing.element,
            marginTop: spacing.compact,
            fontSize: typography.fontSize.small,
            color: colors.textSecondary,
          }}
        >
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {showIcons && <Mail size={14} />}
              <a
                href={`mailto:${personalInfo.email}`}
                style={{ color: colors.textSecondary, textDecoration: 'none' }}
              >
                {personalInfo.email}
              </a>
            </div>
          )}

          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {showIcons && <Phone size={14} />}
              <a
                href={`tel:${personalInfo.phone}`}
                style={{ color: colors.textSecondary, textDecoration: 'none' }}
              >
                {personalInfo.phone}
              </a>
            </div>
          )}

          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {showIcons && <MapPin size={14} />}
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {showIcons && <Globe size={14} />}
              <a
                href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.textSecondary, textDecoration: 'none' }}
              >
                {personalInfo.website}
              </a>
            </div>
          )}

          {personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {showIcons && <Linkedin size={14} />}
              <a
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.textSecondary, textDecoration: 'none' }}
              >
                LinkedIn
              </a>
            </div>
          )}

          {personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {showIcons && <Github size={14} />}
              <a
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.textSecondary, textDecoration: 'none' }}
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>

      {/* QR Code */}
      {showQRCode && qrCodeData && (
        <div
          style={{
            flexShrink: 0,
          }}
        >
          <QRCodeSVG
            value={qrCodeData}
            size={80}
            level="M"
            includeMargin={false}
          />
        </div>
      )}
    </div>
  );
};
