
import React, { useState, useRef } from 'react';
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
  Lightbulb, Target, Wand2, Stars, Rocket, ChevronRight,
  Upload, FileUp, ExternalLink, Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import FormElementRenderer from '@/components/FormBuilder/FormElementRenderer';
import { FormConfig, FormElement } from '@/components/FormBuilder/types';

// Animated loader component
const AIGeneratingLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-violet-600/95 via-purple-600/95 to-indigo-600/95 backdrop-blur-sm rounded-xl"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 400,
            }}
            animate={{
              x: Math.random() * 400,
              y: Math.random() * 400,
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main spinning brain */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          className="relative mx-auto mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Brain className="h-12 w-12 text-white" />
          </div>
          
          {/* Orbiting sparkles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  left: `${40 + i * 10}px`,
                  top: '-6px',
                }}
              >
                <Sparkles className="h-4 w-4 text-yellow-300" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.h3
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl font-bold text-white mb-2"
        >
          AI is crafting your form
        </motion.h3>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Status messages */}
        <motion.div
          className="mt-4 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key="analyzing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-white/80"
            >
              Analyzing your requirements...
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Canvas Preview Component - matches FormBuilder canvas style
const CanvasPreview: React.FC<{ formConfig: FormConfig | null; isGenerating: boolean }> = ({ 
  formConfig, 
  isGenerating 
}) => {
  const { theme } = useTheme();

  const getCanvasStyles = () => {
    const styles = formConfig?.settings?.canvasStyles || {};
    return {
      background: styles.backgroundImage && styles.backgroundImage !== '' 
        ? `url(${styles.backgroundImage})`
        : styles.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: styles.fontFamily || 'Inter',
      fontSize: `${styles.fontSize || 16}px`,
      color: styles.fontColor || '#000000'
    };
  };

  const getFormStyles = () => {
    const styles = formConfig?.settings?.canvasStyles || {};
    return {
      backgroundColor: styles.formBackgroundColor || '#ffffff',
      borderRadius: styles.borderRadius || '16px',
      padding: styles.padding || '32px',
      margin: '20px auto',
      maxWidth: `${styles.formWidth || 600}px`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    };
  };

  if (!formConfig && !isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full min-h-[500px] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
        }}
      >
        <div className="text-center py-16 px-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">AI Form Canvas</h3>
          <p className="text-white/80 max-w-md mx-auto mb-4">
            Your AI-generated form will appear here with full canvas preview
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-white/20 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Eye className="h-3 w-3 mr-1" />
              Live Preview
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Layers className="h-3 w-3 mr-1" />
              Canvas View
            </Badge>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div 
      className="relative min-h-[500px] rounded-xl overflow-hidden"
      style={getCanvasStyles()}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {isGenerating && <AIGeneratingLoader />}
      </AnimatePresence>

      {/* Animated Background Particles */}
      {!isGenerating && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 600,
                y: Math.random() * 600,
              }}
              animate={{
                x: Math.random() * 600,
                y: Math.random() * 600,
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Logo Display */}
      {formConfig?.settings?.logo?.enabled && formConfig.settings.logo.url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-20"
          style={{
            top: `${formConfig.settings.logo.position?.top || 20}px`,
            left: formConfig.settings.logo.position?.alignment?.includes('center')
              ? '50%'
              : `${formConfig.settings.logo.position?.left || 20}px`,
            transform: formConfig.settings.logo.position?.alignment?.includes('center')
              ? 'translateX(-50%)'
              : 'none',
            opacity: formConfig.settings.logo.opacity || 1
          }}
        >
          <img
            src={formConfig.settings.logo.url}
            alt="Form Logo"
            style={{
              width: `${formConfig.settings.logo.width || 100}px`,
              height: `${formConfig.settings.logo.height || 100}px`,
              borderRadius: `${formConfig.settings.logo.borderRadius || 0}px`,
              objectFit: 'contain'
            }}
            className="shadow-lg"
          />
        </motion.div>
      )}

      {/* Main Form Container */}
      {formConfig && !isGenerating && (
        <div className="relative z-10 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            style={getFormStyles()}
          >
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formConfig.name || 'Untitled Form'}
              </h1>
              {formConfig.description && (
                <p className="text-gray-600 text-base max-w-xl mx-auto">
                  {formConfig.description}
                </p>
              )}
            </motion.div>

            {/* Form Elements */}
            <div className="space-y-4">
              <AnimatePresence>
                {formConfig.elements.map((element, index) => (
                  <motion.div
                    key={element.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        {element.type}
                      </Badge>
                      {element.required && (
                        <Badge variant="outline" className="text-xs text-red-500 border-red-200">
                          Required
                        </Badge>
                      )}
                    </div>
                    <FormElementRenderer
                      element={element}
                      value=""
                      onChange={() => {}}
                      formConfig={formConfig}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Submit Button Preview */}
            {formConfig.elements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg"
                  disabled
                >
                  Submit Form
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export const AIFormGenerator = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<FormConfig | null>(null);
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
      
      // Handle the response - normalize to FormConfig format
      const formData = normalizeFormConfig(data.form || data);
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

  // Normalize API response to FormConfig format
  const normalizeFormConfig = (data: any): FormConfig => {
    const elements: FormElement[] = (data.elements || data.fields || []).map((el: any, index: number) => ({
      id: el.id || `element-${Date.now()}-${index}`,
      type: el.type || 'text',
      label: el.label || `Field ${index + 1}`,
      placeholder: el.placeholder || '',
      required: el.required || false,
      options: el.options || [],
      validation: el.validation || {},
      settings: el.settings || {},
      fieldStyles: el.fieldStyles || {
        className: 'w-full',
        backgroundColor: '#ffffff',
        borderColor: '#d1d5db',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '16px',
        fontFamily: 'Inter',
        color: '#374151'
      },
      labelStyles: el.labelStyles || {
        color: '#374151',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Inter'
      }
    }));

    return {
      name: data.name || data.title || formTitle || 'AI Generated Form',
      description: data.description || formDescription || '',
      elements,
      settings: {
        layout: {
          gridColumns: 1,
          questionSpacing: 24,
          elementWidth: 'full',
          labelAlignment: 'top'
        },
        canvasStyles: data.settings?.canvasStyles || {
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          formBackgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          formWidth: 600,
          fontFamily: 'Inter',
          fontSize: 16,
          fontColor: '#374151'
        }
      }
    };
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
        const formData = normalizeFormConfig(jsonData.form || jsonData);
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

  const copyFormCode = () => {
    if (!generatedForm) return;
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
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [-20, 20, -20]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
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
          {/* Input Panel */}
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
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
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
              </CardHeader>
              
              <CardContent className="space-y-5 relative z-10">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json"
                  className="hidden"
                />

                {/* Webhook URL */}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Form Title
                    </label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g., Customer Survey"
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300' 
                        : 'bg-gray-700 border-gray-600'
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
                        ? 'bg-white border-gray-300' 
                        : 'bg-gray-700 border-gray-600'
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
                    Context (Optional)
                  </label>
                  <Input
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Target audience, industry, style preferences..."
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300' 
                      : 'bg-gray-700 border-gray-600'
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
                    placeholder="Describe the form you want to create..."
                    rows={5}
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300' 
                      : 'bg-gray-700 border-gray-600'
                    } rounded-xl resize-none`}
                  />
                </div>

                {/* Quick Suggestions */}
                <div>
                  <p className={`text-xs font-medium mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Quick suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPrompt(suggestion)}
                        className={`text-xs p-2 rounded-lg border ${theme === 'light' 
                          ? 'border-gray-200 hover:border-violet-300 hover:bg-violet-50 text-gray-600' 
                          : 'border-gray-600 hover:border-violet-500 hover:bg-violet-900/20 text-gray-400'
                        } transition-all`}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={generateForm}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-5 rounded-xl font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleUploadJson}
                    variant="outline"
                    className={`w-full py-5 rounded-xl font-semibold ${theme === 'light' 
                      ? 'border-violet-300 hover:bg-violet-50 text-violet-700' 
                      : 'border-violet-500 hover:bg-violet-900/20 text-violet-300'
                    }`}
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Canvas Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm h-full overflow-hidden`}>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-lg"
                    >
                      <Eye className="h-6 w-6 text-white" />
                    </motion.div>
                    Canvas Preview
                    {generatedForm && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        {generatedForm.elements.length} elements
                      </Badge>
                    )}
                  </CardTitle>
                  {generatedForm && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyFormCode} className="rounded-lg">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadJson} className="rounded-lg">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={openInFormBuilder} 
                        className="rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open in Canvas
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-2">
                <CanvasPreview formConfig={generatedForm} isGenerating={isGenerating} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
