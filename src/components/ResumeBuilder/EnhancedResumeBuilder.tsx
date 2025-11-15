import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateCurrentResume, fetchResumeById } from '@/store/slices/resumeSlice';
import { Resume } from '@/types/resume-schema';
import { getDesignTokens } from '@/lib/resume-design-tokens';
import { analyzeResumeContent } from '@/lib/resume-content-intelligence';
import { ResumeCanvas } from './ResumeCanvas';
import { ResumeContentIntelligencePanel } from './components/ResumeContentIntelligencePanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Save,
  Download,
  Eye,
  FileText,
  Sparkles,
  Settings as SettingsIcon,
  ArrowLeft,
  Plus,
  Trash2,
  Moon,
  Sun,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EnhancedResumeBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { currentResume, loading } = useAppSelector(state => state.resumes);

  const [activeTab, setActiveTab] = useState('edit');
  const [activeSection, setActiveSection] = useState('personal');

  // Sample resume data structure
  const [resumeData, setResumeData] = useState<Resume>({
    metadata: {
      id: id || 'new',
      name: 'My Resume',
      version: 1,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      downloads: 0,
      views: 0,
      status: 'draft',
      tags: [],
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
      summary: 'Experienced software engineer with 5+ years of expertise in building scalable web applications using modern technologies. Proven track record of delivering high-quality solutions and leading cross-functional teams.',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2021-01',
        endDate: 'Present',
        current: true,
        description: 'Leading development of microservices architecture',
        achievements: [
          'Architected and deployed microservices infrastructure serving 2M+ users',
          'Reduced system latency by 40% through performance optimization',
          'Mentored team of 5 junior developers',
        ],
        technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
        metrics: [
          { label: 'Users Served', value: '2M+' },
          { label: 'Performance Gain', value: '40%' },
        ],
      },
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2016',
        endDate: '2020',
        gpa: '3.8',
        honors: ['Cum Laude', "Dean's List"],
      },
    ],
    skills: [
      { id: '1', name: 'React', category: 'framework', proficiency: 'expert', visualize: true, yearsOfExperience: 5 },
      { id: '2', name: 'TypeScript', category: 'technical', proficiency: 'expert', visualize: true, yearsOfExperience: 4 },
      { id: '3', name: 'Node.js', category: 'technical', proficiency: 'advanced', visualize: true, yearsOfExperience: 5 },
      { id: '4', name: 'AWS', category: 'tool', proficiency: 'advanced', visualize: true, yearsOfExperience: 3 },
      { id: '5', name: 'Leadership', category: 'soft', proficiency: 'advanced', visualize: true },
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
      sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    },
    designTokens: getDesignTokens('modern', false),
  });

  useEffect(() => {
    if (id && id !== 'new') {
      // Fetch resume data
      dispatch(fetchResumeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    // Update design tokens when template or dark mode changes
    const newTokens = getDesignTokens(resumeData.settings.template, resumeData.settings.darkMode);
    setResumeData(prev => ({
      ...prev,
      designTokens: newTokens,
    }));
  }, [resumeData.settings.template, resumeData.settings.darkMode]);

  const handleSave = () => {
    // Update intelligence before saving
    const intelligence = analyzeResumeContent(resumeData);
    const updatedResume = {
      ...resumeData,
      intelligence,
      metadata: {
        ...resumeData.metadata,
        lastModified: new Date().toISOString(),
      },
    };

    setResumeData(updatedResume);
    dispatch(updateCurrentResume(updatedResume));
    
    toast({
      title: 'Resume Saved',
      description: 'Your resume has been saved successfully.',
    });
  };

  const handleExport = (format: 'pdf' | 'docx') => {
    toast({
      title: 'Export Started',
      description: `Exporting resume as ${format.toUpperCase()}...`,
    });
    // Implement export logic
  };

  const toggleDarkMode = () => {
    setResumeData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        darkMode: !prev.settings.darkMode,
      },
    }));
  };

  // Calculate intelligence
  const intelligence = analyzeResumeContent(resumeData);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/platform/resume')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Resume Builder</h1>
                <p className="text-sm text-muted-foreground">
                  {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName} - {resumeData.personalInfo.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                {resumeData.settings.darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('preview')}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="edit">
              <FileText className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="intelligence">
              <Sparkles className="h-4 w-4 mr-2" />
              Intelligence ({intelligence.atsScore})
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">First Name</label>
                            <Input
                              value={resumeData.personalInfo.firstName}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                              }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Last Name</label>
                            <Input
                              value={resumeData.personalInfo.lastName}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                              }))}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Professional Title</label>
                          <Input
                            value={resumeData.personalInfo.title}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, title: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Summary</label>
                          <Textarea
                            rows={4}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, summary: e.target.value }
                            }))}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-start gap-2">
                            <Sparkles className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                            <span>Use action verbs like "Led", "Developed", "Achieved"</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <Sparkles className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>Quantify achievements with numbers and metrics</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <Sparkles className="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" />
                            <span>Keep bullet points concise (1-2 lines)</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </div>

              <div className="col-span-7">
                <Card className="h-[calc(100vh-200px)]">
                  <CardContent className="p-0">
                    <ResumeCanvas resume={resumeData} scale={0.7} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <ResumeCanvas resume={resumeData} />
          </TabsContent>

          {/* Intelligence Tab */}
          <TabsContent value="intelligence">
            <div className="max-w-4xl mx-auto">
              <ResumeContentIntelligencePanel intelligence={intelligence} />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="max-w-4xl mx-auto space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Template & Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Template settings coming soon...
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
