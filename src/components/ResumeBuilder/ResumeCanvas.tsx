import React, { useRef, useEffect, useState } from 'react';
import { Resume } from '@/types/resume-schema';
import { ResumeHeader } from './components/ResumeHeader';
import { ResumeSummary } from './components/ResumeSummary';
import { ResumeExperienceSection } from './components/ResumeExperienceSection';
import { ResumeEducationSection } from './components/ResumeEducationSection';
import { ResumeSkillsSection } from './components/ResumeSkillsSection';
import { ResumeProjectsSection } from './components/ResumeProjectsSection';
import { ResumeCertificationsSection } from './components/ResumeCertificationsSection';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ResumeCanvasProps {
  resume: Resume;
  scale?: number;
  className?: string;
}

export const ResumeCanvas: React.FC<ResumeCanvasProps> = ({
  resume,
  scale: externalScale,
  className = '',
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [internalScale, setInternalScale] = useState(1);
  const scale = externalScale !== undefined ? externalScale : internalScale;

  const { designTokens, settings, personalInfo, experience, education, skills, projects, certifications } = resume;
  const { colors, layout, spacing, typography, effects } = designTokens;

  // Section order
  const sectionOrder = settings.sectionOrder || [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
  ];

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <ResumeSummary
            key="summary"
            summary={personalInfo.summary}
            designTokens={designTokens}
          />
        );
      case 'experience':
        return (
          <ResumeExperienceSection
            key="experience"
            experiences={experience}
            designTokens={designTokens}
            showIcons={settings.showIcons}
          />
        );
      case 'education':
        return (
          <ResumeEducationSection
            key="education"
            education={education}
            designTokens={designTokens}
            showIcons={settings.showIcons}
          />
        );
      case 'skills':
        return (
          <ResumeSkillsSection
            key="skills"
            skills={skills}
            designTokens={designTokens}
            showSkillBars={settings.showSkillBars}
          />
        );
      case 'projects':
        return projects && projects.length > 0 ? (
          <ResumeProjectsSection
            key="projects"
            projects={projects}
            designTokens={designTokens}
            showIcons={settings.showIcons}
          />
        ) : null;
      case 'certifications':
        return certifications && certifications.length > 0 ? (
          <ResumeCertificationsSection
            key="certifications"
            certifications={certifications}
            designTokens={designTokens}
            showIcons={settings.showIcons}
          />
        ) : null;
      default:
        return null;
    }
  };

  const handleZoomIn = () => {
    setInternalScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setInternalScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setInternalScale(1);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Zoom Controls */}
      {externalScale === undefined && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Button size="icon" variant="outline" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleResetZoom}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Canvas Container */}
      <div
        className="resume-canvas-container overflow-auto"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: settings.darkMode ? 'hsl(222, 47%, 8%)' : 'hsl(0, 0%, 96%)',
          minHeight: '100%',
        }}
      >
        <motion.div
          ref={canvasRef}
          className="resume-canvas"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease',
            width: layout.maxWidth,
            maxWidth: '100%',
            backgroundColor: colors.background,
            padding: '60px',
            boxShadow: settings.darkMode 
              ? '0 20px 60px rgba(0, 0, 0, 0.5)' 
              : '0 10px 40px rgba(0, 0, 0, 0.1)',
            borderRadius: effects.borderRadius,
            minHeight: settings.pageSize === 'letter' ? '11in' : '297mm',
            fontFamily: typography.fontFamily.body,
          }}
        >
          {/* Header */}
          <ResumeHeader
            personalInfo={personalInfo}
            designTokens={designTokens}
            showIcons={settings.showIcons}
            showQRCode={settings.showQRCode}
            qrCodeData={settings.qrCodeData}
            showProfileImage={settings.showProfileImage}
          />

          {/* Sections */}
          <div>
            {sectionOrder.map(sectionId => renderSection(sectionId))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
