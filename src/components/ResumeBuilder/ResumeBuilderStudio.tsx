
import React, { useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Download, 
  Eye, 
  Save,
  Plus,
  Trash2,
  Edit,
  Palette,
  Layout,
  FileText,
  Sparkles,
  Settings,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Camera
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateCurrentResume } from '@/store/slices/resumeSlice';

const ResumeBuilderStudio = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { currentResume } = useAppSelector(state => state.resumes);
  
  const [activeSection, setActiveSection] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewMode, setPreviewMode] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern', color: 'from-blue-500 to-cyan-400', preview: '📄' },
    { id: 'creative', name: 'Creative', color: 'from-purple-500 to-pink-400', preview: '🎨' },
    { id: 'professional', name: 'Professional', color: 'from-gray-600 to-gray-800', preview: '💼' },
    { id: 'minimal', name: 'Minimal', color: 'from-green-500 to-emerald-400', preview: '✨' },
    { id: 'bold', name: 'Bold', color: 'from-orange-500 to-red-400', preview: '🔥' },
    { id: 'elegant', name: 'Elegant', color: 'from-indigo-500 to-purple-600', preview: '👑' }
  ];

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User, color: 'text-blue-500' },
    { id: 'experience', name: 'Experience', icon: Briefcase, color: 'text-green-500' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'text-purple-500' },
    { id: 'skills', name: 'Skills', icon: Code, color: 'text-orange-500' },
    { id: 'projects', name: 'Projects', icon: Award, color: 'text-pink-500' },
    { id: 'design', name: 'Design', icon: Palette, color: 'text-indigo-500' }
  ];

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      title: 'Senior Software Developer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'johndoe.dev',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      summary: 'Passionate software developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.'
    },
    experience: [
      {
        id: '1',
        company: 'Tech Innovation Inc.',
        position: 'Senior Software Developer',
        startDate: '2022-01',
        endDate: 'Present',
        location: 'San Francisco, CA',
        description: 'Led development of microservices architecture, improved system performance by 40%, mentored junior developers.'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: '2020-03',
        endDate: '2022-01',
        location: 'Remote',
        description: 'Built responsive web applications using React and Node.js, collaborated with design team to implement UI/UX improvements.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
      { category: 'Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] }
    ],
    projects: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'github.com/johndoe/ecommerce'
      }
    ]
  });

  const handleSaveResume = () => {
    if (currentResume) {
      dispatch(updateCurrentResume({
        ...currentResume,
        content: resumeData,
        template: selectedTemplate,
        lastUpdated: new Date().toISOString()
      }));
    }
    console.log('Resume saved!');
  };

  const handleExportPDF = () => {
    console.log('Exporting resume as PDF...');
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } relative overflow-hidden`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-64 h-64 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}
        />
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-gradient-to-r from-purple-500 to-pink-400 rounded-3xl shadow-2xl"
            >
              <FileText className="h-10 w-10 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme === 'light' 
                ? 'from-gray-900 via-purple-800 to-pink-900' 
                : 'from-white via-purple-200 to-pink-200'
              } bg-clip-text text-transparent`}>
                Resume Builder Studio
              </h1>
              <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Create professional resumes with AI-powered tools
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className={`${theme === 'light' ? 'bg-white/80 hover:bg-white' : 'bg-gray-800/50 hover:bg-gray-700'} backdrop-blur-sm`}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveResume}
              className={`${theme === 'light' ? 'bg-white/80 hover:bg-white' : 'bg-gray-800/50 hover:bg-gray-700'} backdrop-blur-sm`}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        {previewMode ? (
          // Preview Mode
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className={`w-full max-w-4xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-2xl rounded-2xl overflow-hidden`}>
              {/* Resume Preview Content */}
              <div className="p-12">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>
                    {resumeData.personalInfo.name}
                  </h1>
                  <h2 className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-4`}>
                    {resumeData.personalInfo.title}
                  </h2>
                  <div className={`flex items-center justify-center gap-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <span>{resumeData.personalInfo.email}</span>
                    <span>{resumeData.personalInfo.phone}</span>
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-3 border-b-2 border-purple-500 pb-1`}>
                    Professional Summary
                  </h3>
                  <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} leading-relaxed`}>
                    {resumeData.personalInfo.summary}
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4 border-b-2 border-purple-500 pb-1`}>
                    Experience
                  </h3>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            {exp.position}
                          </h4>
                          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {exp.company} • {exp.location}
                          </p>
                        </div>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} text-sm`}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4 border-b-2 border-purple-500 pb-1`}>
                    Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {resumeData.skills.map((skillGroup, index) => (
                      <div key={index}>
                        <h4 className={`font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} mb-2`}>
                          {skillGroup.category}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {skillGroup.items.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Edit Mode
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm sticky top-6`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Sections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className={`w-full justify-start ${activeSection === section.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-400 text-white' 
                        : ''
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <section.icon className={`h-4 w-4 mr-2 ${section.color}`} />
                      {section.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Template Selector */}
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm mt-4`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      className={`h-20 flex flex-col ${selectedTemplate === template.id 
                        ? `bg-gradient-to-r ${template.color} text-white` 
                        : ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <span className="text-2xl mb-1">{template.preview}</span>
                      <span className="text-xs">{template.name}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardContent className="p-8">
                  {/* Personal Info Section */}
                  {activeSection === 'personal' && (
                    <div className="space-y-6">
                      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6`}>
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            Full Name
                          </label>
                          <Input
                            value={resumeData.personalInfo.name}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                            })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            Professional Title
                          </label>
                          <Input
                            value={resumeData.personalInfo.title}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personalInfo: { ...resumeData.personalInfo, title: e.target.value }
                            })}
                            placeholder="Senior Software Developer"
                          />
                        </div>
                        <div>
                          <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            Email
                          </label>
                          <Input
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                            })}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            Phone
                          </label>
                          <Input
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                            })}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Professional Summary
                        </label>
                        <Textarea
                          value={resumeData.personalInfo.summary}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                          })}
                          placeholder="Write a compelling professional summary..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          Work Experience
                        </h2>
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-400 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      {resumeData.experience.map((exp, index) => (
                        <Card key={exp.id} className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} border`}>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                value={exp.position}
                                placeholder="Job Title"
                                onChange={(e) => {
                                  const newExp = [...resumeData.experience];
                                  newExp[index].position = e.target.value;
                                  setResumeData({ ...resumeData, experience: newExp });
                                }}
                              />
                              <Input
                                value={exp.company}
                                placeholder="Company Name"
                                onChange={(e) => {
                                  const newExp = [...resumeData.experience];
                                  newExp[index].company = e.target.value;
                                  setResumeData({ ...resumeData, experience: newExp });
                                }}
                              />
                            </div>
                            <Textarea
                              value={exp.description}
                              placeholder="Job description and achievements..."
                              className="mt-4"
                              rows={3}
                              onChange={(e) => {
                                const newExp = [...resumeData.experience];
                                newExp[index].description = e.target.value;
                                setResumeData({ ...resumeData, experience: newExp });
                              }}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          Skills & Technologies
                        </h2>
                        <Button className="bg-gradient-to-r from-orange-500 to-red-400 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill Category
                        </Button>
                      </div>
                      {resumeData.skills.map((skillGroup, index) => (
                        <Card key={index} className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} border`}>
                          <CardContent className="p-4">
                            <Input
                              value={skillGroup.category}
                              placeholder="Skill Category (e.g., Frontend)"
                              className="mb-4"
                            />
                            <div className="flex flex-wrap gap-2">
                              {skillGroup.items.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="cursor-pointer hover:bg-red-100">
                                  {skill}
                                  <Trash2 className="h-3 w-3 ml-1" />
                                </Badge>
                              ))}
                              <Button variant="outline" size="sm">
                                <Plus className="h-3 w-3 mr-1" />
                                Add Skill
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Design Section */}
                  {activeSection === 'design' && (
                    <div className="space-y-6">
                      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6`}>
                        Design Customization
                      </h2>
                      <Card className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} border`}>
                        <CardContent className="p-6">
                          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>
                            Color Scheme
                          </h3>
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {[
                              'from-blue-500 to-cyan-400',
                              'from-purple-500 to-pink-400',
                              'from-green-500 to-emerald-400',
                              'from-orange-500 to-red-400',
                              'from-indigo-500 to-purple-600',
                              'from-gray-600 to-gray-800'
                            ].map((gradient, index) => (
                              <Button
                                key={index}
                                className={`h-12 bg-gradient-to-r ${gradient} text-white`}
                                onClick={() => console.log('Color selected:', gradient)}
                              >
                                <Palette className="h-4 w-4" />
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilderStudio;
