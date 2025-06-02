
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowLeft, Wand, Sparkles, Copy, Download, 
  Eye, Settings, RefreshCw, Save, Share2, Brain,
  Lightbulb, Target, Users, TrendingUp, Heart,
  Palette, Code, Globe, Send, CheckCircle,
  Stars, Rocket, Gauge, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export const AIFormGenerator = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<any>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const formTypes = [
    {
      title: 'Customer Feedback',
      description: 'Collect valuable customer insights',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-400',
      prompt: 'Create a customer feedback form with rating scales, multiple choice questions about service quality, and an open text field for suggestions'
    },
    {
      title: 'Lead Generation',
      description: 'Capture high-quality leads',
      icon: Target,
      gradient: 'from-blue-500 to-cyan-400',
      prompt: 'Create a lead generation form for a B2B SaaS company with company name, role, budget range, pain points, and contact preferences'
    },
    {
      title: 'Event Registration',
      description: 'Streamline event signups',
      icon: Users,
      gradient: 'from-purple-500 to-indigo-400',
      prompt: 'Create an event registration form with attendee details, dietary preferences, session selection, and networking interests'
    },
    {
      title: 'Product Survey',
      description: 'Understand user preferences',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-400',
      prompt: 'Create a product feedback survey with feature importance rating, usage patterns, and improvement suggestions'
    }
  ];

  const generateForm = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a description for your form",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI generation with progress steps
    const steps = [
      { step: 'Analyzing your requirements...', progress: 20 },
      { step: 'Designing form structure...', progress: 40 },
      { step: 'Optimizing for conversions...', progress: 60 },
      { step: 'Adding smart validations...', progress: 80 },
      { step: 'Finalizing your form...', progress: 100 }
    ];

    for (const { step, progress } of steps) {
      setCurrentStep(step);
      setGenerationProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    // Mock generated form with enhanced fields
    const mockGeneratedForm = {
      title: formTitle || "AI Generated Customer Form",
      description: formDescription || "Intelligently designed for maximum engagement and conversion",
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
          aiOptimized: true
        },
        {
          id: '2',
          type: 'email',
          label: 'Email Address',
          placeholder: 'your.email@company.com',
          required: true,
          aiOptimized: true
        },
        {
          id: '3',
          type: 'select',
          label: 'How did you hear about us?',
          options: ['Google Search', 'Social Media', 'Referral', 'Advertisement'],
          required: false,
          aiOptimized: true
        },
        {
          id: '4',
          type: 'textarea',
          label: 'What\'s your biggest challenge?',
          placeholder: 'Tell us about your main pain point...',
          required: false,
          aiOptimized: true
        },
        {
          id: '5',
          type: 'number',
          label: 'Expected Budget Range',
          placeholder: '10000',
          required: false,
          aiOptimized: true
        }
      ],
      aiInsights: {
        conversionRate: '94%',
        completionTime: '2.3 min',
        mobileOptimized: true,
        accessibilityScore: 'A+'
      }
    };
    
    setGeneratedForm(mockGeneratedForm);
    setIsGenerating(false);
    setCurrentStep('');
    
    toast({
      title: "🎉 Form Generated Successfully!",
      description: "Your AI-powered form is ready with optimizations for maximum conversion",
    });
  };

  const saveForm = () => {
    toast({
      title: "Form Saved",
      description: "Your form has been saved to your dashboard",
    });
  };

  const copyFormCode = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedForm, null, 2));
    toast({
      title: "Code Copied",
      description: "Form code copied to clipboard",
    });
  };

  const deployForm = () => {
    toast({
      title: "🚀 Form Deployed",
      description: "Your form is now live and ready to collect responses",
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } relative overflow-hidden`}>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-96 h-96 ${theme === 'light' ? 'bg-violet-200/20' : 'bg-violet-500/10'} rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-96 h-96 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/10'} rounded-full blur-3xl`}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/tools">
            <Button variant="outline" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl shadow-2xl">
              <Brain className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          
          <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${theme === 'light' 
            ? 'from-gray-900 via-violet-800 to-purple-900' 
            : 'from-white via-violet-200 to-purple-200'
          } bg-clip-text text-transparent`}>
            AI Form Generator
          </h1>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-8 max-w-2xl mx-auto`}>
            Create intelligent, conversion-optimized forms powered by advanced AI. 
            Boost engagement by up to 40% with smart design and psychology-driven layouts.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 px-4 py-2">
              <Stars className="h-4 w-4 mr-2" />
              AI POWERED
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0 px-4 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              CONVERSION OPTIMIZED
            </Badge>
          </div>
        </motion.div>

        {/* Quick Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Quick Start Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {formTypes.map((type, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setPrompt(type.prompt);
                  setFormTitle(type.title);
                  setFormDescription(type.description);
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${theme === 'light' 
                  ? 'bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 shadow-xl'
                } backdrop-blur-sm`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${type.gradient} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
                  <type.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {type.title}
                </h4>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand className="h-5 w-5 text-violet-500" />
                  AI Configuration Studio
                </CardTitle>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Describe your form and let AI create the perfect design
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Form Title
                  </label>
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Customer Feedback Survey"
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-violet-500' 
                      : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                    } transition-all duration-300`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Form Description
                  </label>
                  <Input
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Brief description of the form purpose"
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-violet-500' 
                      : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                    } transition-all duration-300`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    AI Prompt
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your ideal form in detail. Include field types, validation rules, styling preferences, and any specific requirements..."
                    rows={8}
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-violet-500' 
                      : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                    } transition-all duration-300`}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Be specific about your target audience and conversion goals for better results
                    </span>
                  </div>
                </div>

                {/* Generation Progress */}
                <AnimatePresence>
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-violet-500 animate-pulse" />
                        <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          {currentStep}
                        </span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  onClick={generateForm}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate AI Form
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm h-full`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <CardTitle>Live Preview</CardTitle>
                  </div>
                  {generatedForm && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyFormCode}>
                        <Code className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={saveForm}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={deployForm} className="bg-gradient-to-r from-green-500 to-emerald-600">
                        <Globe className="h-4 w-4" />
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
                    {/* AI Insights Panel */}
                    <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200' : 'bg-gradient-to-r from-violet-900/20 to-purple-900/20 border border-violet-700'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-4 w-4 text-violet-500" />
                        <span className={`text-sm font-semibold ${theme === 'light' ? 'text-violet-700' : 'text-violet-300'}`}>
                          AI Optimization Insights
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
                            {generatedForm.aiInsights.conversionRate}
                          </div>
                          <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Expected Conversion
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                            {generatedForm.aiInsights.completionTime}
                          </div>
                          <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Completion Time
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3 text-green-500" />
                          <span className={`text-xs ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
                            Mobile Optimized
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3 text-blue-500" />
                          <span className={`text-xs ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                            A+ Accessibility
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Form Preview */}
                    <div>
                      <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>
                        {generatedForm.title}
                      </h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-4`}>
                        {generatedForm.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {generatedForm.fields.map((field: any) => (
                        <motion.div 
                          key={field.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: parseInt(field.id) * 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.aiOptimized && (
                              <Badge className="text-xs bg-gradient-to-r from-violet-400 to-purple-500 text-white border-0">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          {field.type === 'textarea' ? (
                            <Textarea
                              placeholder={field.placeholder}
                              className={`${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              } transition-all duration-300`}
                              disabled
                            />
                          ) : field.type === 'select' ? (
                            <select
                              className={`w-full p-3 rounded-lg border ${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600 text-white'
                              } transition-all duration-300`}
                              disabled
                            >
                              <option>Select an option...</option>
                              {field.options?.map((option: string, i: number) => (
                                <option key={i} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <Input
                              type={field.type}
                              placeholder={field.placeholder}
                              className={`${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              } transition-all duration-300`}
                              disabled
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 text-lg font-semibold shadow-lg" disabled>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Form
                    </Button>
                  </motion.div>
                ) : (
                  <div className={`text-center py-16 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">AI Form Preview</h3>
                    <p className="text-sm mb-4">Your generated form will appear here</p>
                    <p className="text-xs">Describe your form requirements and let AI create the perfect design</p>
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
