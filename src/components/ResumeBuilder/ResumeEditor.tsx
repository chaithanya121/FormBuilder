
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  X, 
  Save, 
  Download, 
  Eye,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Calendar,
  FileText,
  Palette,
  Layout
} from 'lucide-react';

interface ResumeEditorProps {
  onSave: (resumeData: any) => void;
  onPreview: () => void;
  onDownload: () => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ onSave, onPreview, onDownload }) => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('personal');
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'design', label: 'Design', icon: Palette }
  ];

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, {
        id: Date.now(),
        institution: '',
        degree: '',
        startDate: '',
        endDate: ''
      }]
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, '']
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Resume Editor
            </h1>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Create your professional resume with AI assistance
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onPreview}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant="outline"
              onClick={onDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={() => onSave(resumeData)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Resume
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50' 
              : 'bg-gray-800/50 border-gray-700'
            } backdrop-blur-sm shadow-xl`}>
              <CardHeader>
                <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Sections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : theme === 'light'
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-gray-700/50 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <section.icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor Area */}
          <div className="lg:col-span-3">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50' 
              : 'bg-gray-800/50 border-gray-700'
            } backdrop-blur-sm shadow-xl`}>
              <CardContent className="p-6">
                {/* Personal Information Section */}
                {activeSection === 'personal' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          Personal Information
                        </h2>
                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Basic details that will appear on your resume
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Full Name
                        </label>
                        <Input
                          placeholder="John Doe"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                          })}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                          })}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Phone Number
                        </label>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                          })}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Location
                        </label>
                        <Input
                          placeholder="New York, NY"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Professional Summary
                      </label>
                      <Textarea
                        placeholder="Brief overview of your professional background and career objectives..."
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                        })}
                        className="w-full h-32"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Experience Section */}
                {activeSection === 'experience' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                          <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Work Experience
                          </h2>
                          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Your professional work history
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={addExperience}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>

                    {resumeData.experience.length === 0 ? (
                      <div className={`text-center py-12 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No work experience added yet.</p>
                        <p className="text-sm">Click "Add Experience" to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {resumeData.experience.map((exp: any, index: number) => (
                          <Card key={exp.id} className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/30'} border-dashed`}>
                            <CardContent className="p-6">
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <Input placeholder="Company Name" />
                                <Input placeholder="Job Title" />
                                <Input type="date" placeholder="Start Date" />
                                <Input type="date" placeholder="End Date" />
                              </div>
                              <Textarea
                                placeholder="Describe your responsibilities and achievements..."
                                className="w-full h-24"
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Education Section */}
                {activeSection === 'education' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Education
                          </h2>
                          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Your educational background
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={addEducation}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>

                    {resumeData.education.length === 0 ? (
                      <div className={`text-center py-12 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No education added yet.</p>
                        <p className="text-sm">Click "Add Education" to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {resumeData.education.map((edu: any, index: number) => (
                          <Card key={edu.id} className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/30'} border-dashed`}>
                            <CardContent className="p-6">
                              <div className="grid md:grid-cols-2 gap-4">
                                <Input placeholder="Institution Name" />
                                <Input placeholder="Degree/Certification" />
                                <Input type="date" placeholder="Start Date" />
                                <Input type="date" placeholder="Graduation Date" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Skills Section */}
                {activeSection === 'skills' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg">
                          <Code className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Skills
                          </h2>
                          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Your technical and soft skills
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={addSkill}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resumeData.skills.map((skill: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input placeholder="Enter skill" className="flex-1" />
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {resumeData.skills.length === 0 && (
                        <div className={`col-span-full text-center py-12 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No skills added yet.</p>
                          <p className="text-sm">Click "Add Skill" to get started.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
