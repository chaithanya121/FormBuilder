import React from 'react';
import { ResumeBuilderStudio } from '@/components/ResumeBuilder/ResumeBuilderStudio';
import { Resume } from '@/types/resume-schema';
import { getDesignTokens } from '@/lib/resume-design-tokens';

const ResumePage = () => {
  const [resumeData, setResumeData] = React.useState<Resume>({
    metadata: {
      id: '1',
      name: 'My Professional Resume',
      version: 1,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      downloads: 0,
      views: 0,
      status: 'draft',
      tags: []
    },
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      title: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud architecture. Proven track record of delivering scalable solutions and leading high-performing teams.'
    },
    experience: [
      {
        id: '1',
        company: 'Tech Innovations Inc.',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        endDate: 'Present',
        current: true,
        description: 'Led development of enterprise-scale web applications',
        achievements: [
          'Improved application performance by 40% through optimization',
          'Mentored team of 5 junior developers',
          'Architected microservices infrastructure'
        ],
        technologies: ['React', 'Node.js', 'AWS', 'TypeScript']
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2012',
        endDate: '2016',
        gpa: '3.8',
        honors: ['Summa Cum Laude', 'Dean\'s List']
      }
    ],
    skills: [
      { id: '1', name: 'React', category: 'framework', proficiency: 'expert', yearsOfExperience: 5, visualize: true },
      { id: '2', name: 'Node.js', category: 'framework', proficiency: 'expert', yearsOfExperience: 6, visualize: true },
      { id: '3', name: 'TypeScript', category: 'technical', proficiency: 'advanced', yearsOfExperience: 4, visualize: true },
      { id: '4', name: 'AWS', category: 'tool', proficiency: 'advanced', yearsOfExperience: 3, visualize: true },
      { id: '5', name: 'Leadership', category: 'soft', proficiency: 'advanced', visualize: false }
    ],
    projects: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Built scalable e-commerce solution handling 1M+ daily users',
        role: 'Lead Developer',
        startDate: '2022-01',
        endDate: '2023-06',
        url: 'https://example.com',
        github: 'https://github.com/example',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redis'],
        achievements: [
          'Reduced load time by 60%',
          'Implemented real-time inventory system',
          'Integrated payment gateway with 99.9% uptime'
        ]
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2022-05',
        credentialId: 'AWS-12345',
        url: 'https://aws.amazon.com/certification'
      }
    ],
    settings: {
      template: 'modern',
      colorScheme: 'blue',
      layout: 'single-column',
      pageSize: 'letter',
      showProfileImage: false,
      showIcons: true,
      showSkillBars: true,
      showQRCode: false,
      darkMode: false,
      atsOptimized: true,
      sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications']
    },
    designTokens: getDesignTokens('modern', false)
  });

  const handleResumeUpdate = (updatedResume: Resume) => {
    setResumeData(updatedResume);
    console.log('Resume updated:', updatedResume);
  };

  return <ResumeBuilderStudio resume={resumeData} onResumeUpdate={handleResumeUpdate} />;
};

export default ResumePage;
