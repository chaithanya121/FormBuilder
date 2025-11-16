import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  FileText, Eye, Settings, Sparkles, Download, Share2, 
  Activity, BarChart3, Zap, CheckCircle, Star
} from 'lucide-react';
import { Resume } from '@/types/resume-schema';
import ResumeEditor from './ResumeEditor';
import { ResumeCanvas } from './ResumeCanvas';
import { ResumeContentIntelligencePanel } from './components/ResumeContentIntelligencePanel';
import { analyzeResumeContent } from '@/lib/resume-content-intelligence';
import { getDesignTokens } from '@/lib/resume-design-tokens';

interface ResumeBuilderStudioProps {
  resume: Resume;
  onResumeUpdate: (resume: Resume) => void;
}

export const ResumeBuilderStudio: React.FC<ResumeBuilderStudioProps> = ({
  resume,
  onResumeUpdate
}) => {
  const [activeTab, setActiveTab] = useState('edit');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const intelligence = analyzeResumeContent(resume);
  const designTokens = getDesignTokens(resume.settings.template, resume.settings.darkMode);

  const stats = [
    { 
      label: 'ATS Score', 
      value: `${intelligence.atsScore}%`, 
      icon: CheckCircle, 
      color: intelligence.atsScore >= 80 ? 'text-green-600' : 'text-orange-600',
      bgColor: intelligence.atsScore >= 80 ? 'bg-green-50' : 'bg-orange-50'
    },
    { 
      label: 'Readability', 
      value: `${intelligence.readabilityScore}%`, 
      icon: Eye, 
      color: intelligence.readabilityScore >= 80 ? 'text-blue-600' : 'text-orange-600',
      bgColor: intelligence.readabilityScore >= 80 ? 'bg-blue-50' : 'bg-orange-50'
    },
    { 
      label: 'Impact Score', 
      value: `${intelligence.impactScore}%`, 
      icon: Zap, 
      color: intelligence.impactScore >= 80 ? 'text-purple-600' : 'text-orange-600',
      bgColor: intelligence.impactScore >= 80 ? 'bg-purple-50' : 'bg-orange-50'
    },
    { 
      label: 'Completeness', 
      value: `${Math.round((intelligence.atsScore + intelligence.readabilityScore + intelligence.impactScore) / 3)}%`, 
      icon: Activity, 
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, contemporary design with subtle accents',
      features: ['ATS Optimized', 'Clean Layout', 'Icon Support']
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Classic two-column layout for experienced professionals',
      features: ['Two Column', 'Professional', 'Print Ready']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design with creative flair',
      features: ['Creative', 'Colorful', 'Modern']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Minimalist black and white design',
      features: ['Minimal', 'Clean', 'ATS Safe']
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium design for senior positions',
      features: ['Executive', 'Premium', 'Elegant']
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Tech-focused design with modern aesthetics',
      features: ['Technical', 'Modern', 'Skills Focus']
    }
  ];

  const handleTemplateChange = (templateId: string) => {
    const newSettings = {
      ...resume.settings,
      template: templateId as any
    };
    const newDesignTokens = getDesignTokens(templateId, resume.settings.darkMode);
    
    onResumeUpdate({
      ...resume,
      settings: newSettings,
      designTokens: newDesignTokens
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Top Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border shadow-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">{resume.metadata.name}</h1>
                <p className="text-sm text-muted-foreground">Resume Builder Studio</p>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${stat.bgColor} border-0`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card shadow-sm h-12">
            <TabsTrigger value="edit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-accent/10">
              <Settings className="h-4 w-4 mr-2" />
              Edit Content
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-accent/10">
              <Star className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-accent/10">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-accent/10">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          {/* Edit Content Tab */}
          <TabsContent value="edit" className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5">
                <ResumeEditor 
                  onSave={(data) => console.log('Saving resume:', data)}
                  onPreview={() => setActiveTab('preview')}
                  onDownload={() => console.log('Downloading resume')}
                />
              </div>
              <div className="col-span-7">
                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader className="border-b bg-gradient-to-r from-secondary/50 to-accent/10">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Live Preview
                      <Badge variant="secondary" className="ml-auto">Real-time</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResumeCanvas resume={resume} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-secondary/50 to-accent/10">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Professional Templates
                  <Badge className="ml-auto bg-gradient-to-r from-primary to-accent">
                    {templates.length} Available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:shadow-xl ${
                          resume.settings.template === template.id 
                            ? 'ring-2 ring-primary shadow-lg' 
                            : 'hover:ring-2 hover:ring-primary/50'
                        }`}
                        onClick={() => handleTemplateChange(template.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            {resume.settings.template === template.id && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-[8.5/11] bg-gradient-to-br from-secondary/50 to-accent/10 rounded-lg flex items-center justify-center mb-3">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {template.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-secondary/50 to-accent/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Full Preview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={previewMode === 'desktop' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      Desktop
                    </Button>
                    <Button 
                      variant={previewMode === 'mobile' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      Mobile
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 bg-secondary/20">
                <div className={`mx-auto ${previewMode === 'desktop' ? 'max-w-4xl' : 'max-w-md'}`}>
                  <ResumeCanvas resume={resume} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <ResumeContentIntelligencePanel 
              intelligence={intelligence}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilderStudio;
