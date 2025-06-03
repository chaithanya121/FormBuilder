
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  Zap, ArrowLeft, Wand, Sparkles, Copy, Download, 
  Eye, Settings, RefreshCw, Save, Share2, 
  FileText, Users, MessageSquare, Calendar,
  ShoppingCart, Briefcase, Heart, Star,
  Play, Lightbulb, Rocket, Target
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  gradient: string;
  prompt: string;
  popular: boolean;
}

export const EnhancedAIFormGenerator = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<any>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);

  const quickStartTemplates: FormTemplate[] = [
    {
      id: 'contact',
      name: 'Contact Form',
      description: 'Professional contact form with validation',
      category: 'Business',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-cyan-400',
      prompt: 'Create a professional contact form with name, email, phone, subject, and message fields. Include proper validation and a clean design.',
      popular: true
    },
    {
      id: 'survey',
      name: 'Customer Survey',
      description: 'Collect customer feedback and ratings',
      category: 'Research',
      icon: Star,
      gradient: 'from-purple-500 to-pink-400',
      prompt: 'Create a customer satisfaction survey with rating scales, multiple choice questions, and open-ended feedback sections.',
      popular: true
    },
    {
      id: 'registration',
      name: 'Event Registration',
      description: 'Event signup with attendee details',
      category: 'Events',
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-400',
      prompt: 'Create an event registration form with personal details, dietary preferences, session selection, and payment options.',
      popular: false
    },
    {
      id: 'order',
      name: 'Order Form',
      description: 'Product ordering with calculations',
      category: 'E-commerce',
      icon: ShoppingCart,
      gradient: 'from-orange-500 to-red-400',
      prompt: 'Create an order form with product selection, quantity, shipping details, and automatic price calculations.',
      popular: true
    },
    {
      id: 'application',
      name: 'Job Application',
      description: 'Professional job application form',
      category: 'HR',
      icon: Briefcase,
      gradient: 'from-indigo-500 to-purple-600',
      prompt: 'Create a comprehensive job application form with personal info, experience, skills, and file upload for resume.',
      popular: false
    },
    {
      id: 'feedback',
      name: 'Feedback Form',
      description: 'General feedback collection',
      category: 'General',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-400',
      prompt: 'Create a user-friendly feedback form with rating system, categorized questions, and improvement suggestions.',
      popular: false
    }
  ];

  const generateForm = async () => {
    if (!prompt.trim() && !selectedTemplate) {
      toast({
        title: "Missing Input",
        description: "Please enter a description or select a template",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    const finalPrompt = selectedTemplate ? selectedTemplate.prompt : prompt;
    const finalTitle = formTitle || selectedTemplate?.name || "AI Generated Form";
    const finalDescription = formDescription || selectedTemplate?.description || "Generated using AI prompts";
    
    // Simulate AI generation with more realistic delay
    setTimeout(() => {
      const mockGeneratedForm = {
        title: finalTitle,
        description: finalDescription,
        category: selectedTemplate?.category || 'Custom',
        fields: [
          {
            id: '1',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
          },
          {
            id: '2',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
          },
          {
            id: '3',
            type: 'phone',
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            required: false
          },
          {
            id: '4',
            type: 'select',
            label: 'Subject',
            options: ['General Inquiry', 'Support', 'Sales', 'Partnership'],
            required: true
          },
          {
            id: '5',
            type: 'textarea',
            label: 'Message',
            placeholder: 'Enter your message',
            required: true
          }
        ]
      };
      
      setGeneratedForm(mockGeneratedForm);
      setIsGenerating(false);
      
      toast({
        title: "Form Generated Successfully!",
        description: "Your AI-powered form is ready for customization",
      });
    }, 2500);
  };

  const useTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template);
    setFormTitle(template.name);
    setFormDescription(template.description);
    setPrompt(template.prompt);
    
    toast({
      title: "Template Selected",
      description: `Using ${template.name} template`,
    });
  };

  const saveFormToBuilder = () => {
    // Navigate to form builder with generated form data
    navigate('/create', { 
      state: { 
        generatedForm,
        template: selectedTemplate?.id 
      } 
    });
    
    toast({
      title: "Redirecting to Form Builder",
      description: "Your form will be loaded in the builder",
    });
  };

  const copyFormCode = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedForm, null, 2));
    toast({
      title: "Code Copied",
      description: "Form configuration copied to clipboard",
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } relative overflow-hidden`}>
      
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-96 h-96 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-96 h-96 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}
        />
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="shadow-lg backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-xl"
            >
              <Zap className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme === 'light' 
                ? 'from-gray-900 via-purple-800 to-violet-900' 
                : 'from-white via-purple-200 to-violet-200'
              } bg-clip-text text-transparent`}>
                AI Form Generator
              </h1>
              <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Generate professional forms using advanced AI technology
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg">
              ✨ NEW
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0 shadow-lg">
              🚀 AI-POWERED
            </Badge>
          </div>
        </motion.div>

        {/* Quick Start Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-orange-500" />
                Quick Start Templates
                <Badge variant="outline" className="ml-2">Popular</Badge>
              </CardTitle>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Choose from pre-built templates to get started quickly
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickStartTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => useTemplate(template)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      selectedTemplate?.id === template.id
                        ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800'
                        : 'border-transparent hover:border-purple-300 dark:hover:border-purple-700'
                    } ${theme === 'light' 
                      ? 'bg-gradient-to-br from-gray-50 to-white hover:shadow-lg' 
                      : 'bg-gray-700/50 hover:bg-gray-600'
                    }`}
                  >
                    {template.popular && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs">
                          Popular
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${template.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <template.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {template.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                      {template.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm h-fit`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand className="h-5 w-5 text-violet-500" />
                  AI Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Form Title
                    </label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g., Customer Contact Form"
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-purple-500' 
                        : 'bg-gray-700 border-gray-600 focus:border-purple-500'
                      } transition-colors`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Description
                    </label>
                    <Input
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Brief description of the form purpose"
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-purple-500' 
                        : 'bg-gray-700 border-gray-600 focus:border-purple-500'
                      } transition-colors`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      AI Prompt
                      <Badge variant="outline" className="ml-2 text-xs">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        Be specific
                      </Badge>
                    </label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your form requirements in detail. Include field types, validation rules, styling preferences, and any specific functionality you need..."
                      rows={8}
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-purple-500' 
                        : 'bg-gray-700 border-gray-600 focus:border-purple-500'
                      } transition-colors resize-none`}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={generateForm}
                    disabled={isGenerating}
                    className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Form
                      </>
                    )}
                  </Button>
                  
                  {selectedTemplate && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedTemplate(null);
                        setFormTitle('');
                        setFormDescription('');
                        setPrompt('');
                      }}
                      className="px-4"
                    >
                      Clear
                    </Button>
                  )}
                </div>

                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="animate-spin">
                        <Zap className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className={`font-medium ${theme === 'light' ? 'text-purple-800' : 'text-purple-300'}`}>
                          AI is crafting your form...
                        </p>
                        <p className={`text-sm ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
                          Analyzing requirements and generating optimized form structure
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm h-fit`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Live Preview
                  </CardTitle>
                  {generatedForm && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyFormCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={saveFormToBuilder}>
                        <Play className="h-4 w-4 mr-1" />
                        Open in Builder
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedForm ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>
                        {generatedForm.title}
                      </h3>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {generatedForm.description}
                      </p>
                      <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {generatedForm.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {generatedForm.fields.map((field: any) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: parseInt(field.id) * 0.1 }}
                        >
                          <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            {field.label} 
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === 'textarea' ? (
                            <Textarea
                              placeholder={field.placeholder}
                              className={`${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              } transition-colors`}
                              disabled
                            />
                          ) : field.type === 'select' ? (
                            <select 
                              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600 text-white'
                              }`}
                              disabled
                            >
                              <option>Choose an option...</option>
                              {field.options?.map((option: string, index: number) => (
                                <option key={index} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <Input
                              type={field.type}
                              placeholder={field.placeholder}
                              className={`${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              } transition-colors`}
                              disabled
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg shadow-lg" disabled>
                        <Target className="h-5 w-5 mr-2" />
                        Submit Form
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-green-500" />
                        <span className={`font-medium ${theme === 'light' ? 'text-green-800' : 'text-green-300'}`}>
                          AI Optimization
                        </span>
                      </div>
                      <p className={`text-sm ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>
                        Form optimized for 87% completion rate with mobile-first design and smart validation
                      </p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className={`text-center py-16 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    </motion.div>
                    <h3 className="text-lg font-medium mb-2">AI Form Preview</h3>
                    <p className="text-sm mb-4">
                      Your generated form will appear here
                    </p>
                    <p className="text-xs">
                      Select a template or enter a custom prompt to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
