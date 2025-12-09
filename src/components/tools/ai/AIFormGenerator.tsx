
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  Zap, ArrowLeft, Wand, Sparkles, Copy, Download, 
  Eye, Settings, RefreshCw, Save, Share2, Brain,
  Lightbulb, Target, Wand2, Stars, Rocket, ChevronRight,
  Upload, FileUp, ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const AIFormGenerator = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<any>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [model, setModel] = useState('qwen/qwen-2.5-72b-instruct:free');
  const [context, setContext] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook-test/generate-form');

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
    
    try {
      const payload = {
        prompt: prompt,
        model: model,
        context: context,
        styleReference: '',
        includeValidation: true,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle the response - extract form data
      const formData = data.form || data;
      setGeneratedForm(formData);
      
      toast({
        title: "Form Generated!",
        description: "Your AI-powered form has been created successfully",
      });
    } catch (error) {
      console.error('Error generating form:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate form. Please check your webhook URL.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUploadJson = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const formData = jsonData.form || jsonData;
        setGeneratedForm(formData);
        toast({
          title: "JSON Imported",
          description: "Form configuration loaded successfully",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid JSON file format",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const openInFormBuilder = () => {
    if (generatedForm) {
      // Store the form in sessionStorage for the FormBuilder to pick up
      sessionStorage.setItem('importedFormConfig', JSON.stringify(generatedForm));
      navigate('/form-builder');
      toast({
        title: "Opening in Form Builder",
        description: "Your form is being loaded in the canvas",
      });
    }
  };

  const downloadJson = () => {
    if (!generatedForm) return;
    const dataStr = JSON.stringify(generatedForm, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedForm.name || 'form'}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded",
      description: "Form JSON downloaded successfully",
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

  const suggestions = [
    'Create a customer feedback survey with rating scales',
    'Build a job application form with file upload',
    'Design a contact form with conditional fields',
    'Generate an event registration form with payment'
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100' 
      : 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900'
    } relative overflow-hidden`}>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [-20, 20, -20]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-blue-400/20 rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            y: [-10, 10, -10],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl`}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            {/* <Link to="/tools">
              <Button variant="outline" size="sm" className={`${theme === 'light' ? 'bg-white/80 hover:bg-white' : 'bg-gray-800/50 hover:bg-gray-700'} backdrop-blur-sm border-gray-300 dark:border-gray-600`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" /> */}
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl shadow-2xl"
              >
                <Brain className="h-10 w-10 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme === 'light' 
                  ? 'from-gray-900 via-violet-800 to-purple-900' 
                  : 'from-white via-violet-200 to-purple-200'
                } bg-clip-text text-transparent`}>
                  AI Form Generator
                </h1>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Create intelligent forms with advanced AI assistance
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-1" />
              AI Powered
            </Badge>
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-4 py-2 text-sm">
              <Stars className="h-4 w-4 mr-1" />
              Premium
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm overflow-hidden relative group`}>
              
              {/* Card Background Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg shadow-lg"
                  >
                    <Wand className="h-6 w-6 text-white" />
                  </motion.div>
                  AI Prompt Configuration
                  <Badge className="ml-auto bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    Smart
                  </Badge>
                </CardTitle>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Describe your form and let AI create it for you
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                {/* Hidden file input for JSON upload */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json"
                  className="hidden"
                />

                {/* Webhook URL Configuration */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Webhook URL
                  </label>
                  <Input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="http://localhost:5678/webhook-test/generate-form"
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-violet-500' 
                      : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                    } rounded-xl font-mono text-sm`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Form Title
                    </label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g., Customer Feedback Survey"
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-violet-500' 
                        : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                      } rounded-xl`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      AI Model
                    </label>
                    <select 
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border ${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-violet-500' 
                        : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                      }`}
                    >
                      <option value="qwen/qwen-2.5-72b-instruct:free">Qwen 2.5 72B (Free)</option>
                      <option value="tngtech/deepseek-r1t2-chimera:free">DeepSeek R1T2 (Free)</option>
                      <option value="qwen/qwen2.5-vl-32b-instruct">Qwen 2.5 VL 32B</option>
                      <option value="openai/gpt-4o">GPT-4o</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Form Description / Context
                  </label>
                  <Input
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Additional context for the AI (e.g., target audience, industry, style preferences)"
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-violet-500' 
                      : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                    } rounded-xl`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} flex items-center gap-2`}>
                    <Lightbulb className="h-4 w-4 text-violet-500" />
                    AI Prompt
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the form you want to create. Be specific about fields, validation, styling, and functionality..."
                    rows={6}
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-violet-500' 
                      : 'bg-gray-700 border-gray-600 focus:border-violet-400'
                    } rounded-xl resize-none`}
                  />
                </div>

                {/* AI Suggestions */}
                <div>
                  <p className={`text-xs font-medium mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} flex items-center gap-1`}>
                    <Target className="h-3 w-3" />
                    Quick suggestions:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPrompt(suggestion)}
                        className={`text-left p-3 rounded-lg border-2 border-dashed ${theme === 'light' 
                          ? 'border-gray-200 hover:border-violet-300 hover:bg-violet-50 text-gray-600 hover:text-violet-700' 
                          : 'border-gray-600 hover:border-violet-500 hover:bg-violet-900/20 text-gray-400 hover:text-violet-300'
                        } transition-all duration-200 text-sm`}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={generateForm}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-xl py-6 rounded-xl text-lg font-semibold"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-3" />
                          Generate
                        </>
                      )}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={handleUploadJson}
                      variant="outline"
                      className={`w-full py-6 rounded-xl text-lg font-semibold ${theme === 'light' 
                        ? 'border-violet-300 hover:bg-violet-50 text-violet-700' 
                        : 'border-violet-500 hover:bg-violet-900/20 text-violet-300'
                      }`}
                    >
                      <Upload className="h-5 w-5 mr-3" />
                      Upload JSON
                    </Button>
                  </motion.div>
                </div>
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
              ? 'bg-white/90 border-white/50 shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm h-full overflow-hidden relative group`}>
              
              {/* Card Background Effect */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-lg"
                    >
                      <Eye className="h-6 w-6 text-white" />
                    </motion.div>
                    Live Preview
                    {generatedForm && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        Generated
                      </Badge>
                    )}
                  </CardTitle>
                  {generatedForm && (
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="sm" onClick={copyFormCode} className="rounded-lg">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="sm" onClick={downloadJson} className="rounded-lg">
                          <Download className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="sm" onClick={openInFormBuilder} className="rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 hover:from-violet-600 hover:to-purple-700">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open in Canvas
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Real-time preview of your AI-generated form
                </p>
              </CardHeader>
              
              <CardContent className="relative z-10">
                {generatedForm ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className={`p-6 rounded-xl border-2 border-dashed ${theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-600 bg-gray-700/50'}`}>
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                      >
                        {generatedForm.title || generatedForm.name || 'Generated Form'}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                      >
                        {generatedForm.description || 'AI-generated form configuration'}
                      </motion.p>
                    </div>
                    
                    {/* Render elements from API response */}
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {(generatedForm.elements || generatedForm.fields || []).map((element: any, index: number) => (
                        <motion.div
                          key={element.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className={`p-4 rounded-lg border ${theme === 'light' ? 'border-gray-200 bg-white' : 'border-gray-600 bg-gray-800'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <label className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                              {element.label || element.type} {element.required && <span className="text-red-500">*</span>}
                            </label>
                            <Badge variant="outline" className="text-xs capitalize">
                              {element.type}
                            </Badge>
                          </div>
                          {element.type === 'textarea' || element.type === 'rich-text' ? (
                            <Textarea
                              placeholder={element.placeholder || `Enter ${element.label}`}
                              className={`${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              } rounded-xl`}
                              disabled
                            />
                          ) : element.type === 'select' || element.type === 'dropdown' ? (
                            <select 
                              className={`w-full px-3 py-2 rounded-xl border ${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              }`}
                              disabled
                            >
                              <option>{element.placeholder || `Select ${element.label}`}</option>
                              {(element.options || []).map((opt: any, i: number) => (
                                <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
                              ))}
                            </select>
                          ) : element.type === 'checkbox' ? (
                            <div className="flex items-center gap-2">
                              <input type="checkbox" disabled className="rounded" />
                              <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                {element.placeholder || element.label}
                              </span>
                            </div>
                          ) : element.type === 'radio' ? (
                            <div className="space-y-2">
                              {(element.options || [{ label: 'Option 1' }, { label: 'Option 2' }]).map((opt: any, i: number) => (
                                <div key={i} className="flex items-center gap-2">
                                  <input type="radio" name={element.id} disabled className="rounded-full" />
                                  <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {opt.label || opt}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : element.type === 'heading' || element.type === 'section-header' ? (
                            <h4 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                              {element.content || element.label}
                            </h4>
                          ) : element.type === 'paragraph' || element.type === 'text-block' ? (
                            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                              {element.content || element.placeholder}
                            </p>
                          ) : (
                            <Input
                              type={element.type === 'email' ? 'email' : element.type === 'number' ? 'number' : 'text'}
                              placeholder={element.placeholder || `Enter ${element.label}`}
                              className={`${theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              } rounded-xl`}
                              disabled
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex gap-3"
                    >
                      <Button 
                        onClick={openInFormBuilder}
                        className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                      >
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Open in Form Builder
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`text-center py-16 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Brain className="h-16 w-16 mx-auto mb-6 opacity-50" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">AI Form Preview</h3>
                    <p className="text-sm mb-4">Your generated form will appear here</p>
                    <p className="text-xs">Enter a prompt and click generate, or upload a JSON file</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
