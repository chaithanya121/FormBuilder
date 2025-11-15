import React from 'react';
import { ResumeDesignTokens } from '@/types/resume-schema';

interface ResumeSummaryProps {
  summary: string;
  designTokens: ResumeDesignTokens;
}

export const ResumeSummary: React.FC<ResumeSummaryProps> = ({
  summary,
  designTokens,
}) => {
  const { colors, typography, spacing } = designTokens;

  if (!summary) return null;

  return (
    <div
      className="resume-summary"
      style={{
        marginBottom: spacing.section,
      }}
    >
      <p
        style={{
          fontFamily: typography.fontFamily.body,
          fontSize: typography.fontSize.body,
          lineHeight: typography.lineHeight.relaxed,
          color: colors.text,
          margin: 0,
        }}
      >
        {summary}
      </p>
    </div>
  );
};
