import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowLeft, Sparkles, Copy, Download, 
  Eye, Settings, RefreshCw, Brain, Wand2, 
  Upload, FileUp, ExternalLink, Layers, Check,
  History, Palette, Code, Play, ChevronRight,
  FileText, Layout, Lightbulb, Target, Rocket,
  Clock, Star, Trash2, Save, Share2, Grid3X3,
  Monitor, Smartphone, Tablet, ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import FormElementRenderer from '@/components/FormBuilder/FormElementRenderer';
import { FormConfig, FormElement } from '@/components/FormBuilder/types';

// Stunning AI Generating Loader
const AIGeneratingLoader = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = [
    "Analyzing your requirements...",
    "Generating form structure...",
    "Applying AI optimizations...",
    "Finalizing your form..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % statuses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-2xl"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`,
            }}
            initial={{
              x: Math.random() * 500,
              y: Math.random() * 500,
            }}
            animate={{
              x: Math.random() * 500,
              y: Math.random() * 500,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-8">
        {/* Main animated brain icon */}
        <motion.div className="relative mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8"
          >
            <div className="w-full h-full rounded-full border border-white/10" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-16"
          >
            <div className="w-full h-full rounded-full border border-white/5" />
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-28 h-28 mx-auto"
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl rotate-45" />
            <div className="absolute inset-2 bg-white/10 backdrop-blur-sm rounded-2xl rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          {/* Orbiting elements */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
              style={{ transformOrigin: '0 0' }}
            >
              <motion.div
                className="absolute"
                style={{ left: `${50 + i * 15}px`, top: '-8px' }}
              >
                <Sparkles className={`h-4 w-4 ${i === 0 ? 'text-yellow-300' : i === 1 ? 'text-pink-300' : 'text-cyan-300'}`} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.h3
          className="text-2xl font-bold text-white mb-3"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI is crafting your form
        </motion.h3>

        {/* Status text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={statusIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/70 text-sm mb-6"
          >
            {statuses[statusIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Canvas Preview Component - Exact match to FormBuilder
const CanvasPreview: React.FC<{ 
  formConfig: FormConfig | null; 
  isGenerating: boolean;
  deviceView: 'desktop' | 'tablet' | 'mobile';
}> = ({ formConfig, isGenerating, deviceView }) => {
  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

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
      borderRadius: styles.borderRadius || '20px',
      padding: deviceView === 'mobile' ? '20px' : '32px',
      margin: '24px auto',
      maxWidth: deviceView === 'mobile' ? '100%' : `${styles.formWidth || 600}px`,
      boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.35), 0 10px 30px -10px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    };
  };

  if (!formConfig && !isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full min-h-[600px] flex items-center justify-center rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: 100 + i * 100,
                height: 100 + i * 100,
              }}
              initial={{ x: '50%', y: '50%', scale: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center py-16 px-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
              />
              <div className="absolute inset-4 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                <Brain className="h-14 w-14 text-white" />
              </div>
            </div>
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-3"
          >
            AI Form Canvas
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 max-w-md mx-auto mb-6 text-lg"
          >
            Describe your form and watch AI create it instantly
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Sparkles, label: 'AI Powered' },
              { icon: Eye, label: 'Live Preview' },
              { icon: Layers, label: 'Canvas View' },
            ].map(({ icon: Icon, label }) => (
              <Badge key={label} className="bg-white/15 text-white border-0 px-4 py-2 text-sm backdrop-blur-sm">
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Badge>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div 
      className="relative min-h-[600px] rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        ...getCanvasStyles(),
        width: getDeviceWidth(),
        margin: deviceView !== 'desktop' ? '0 auto' : undefined,
      }}
    >
      <AnimatePresence>
        {isGenerating && <AIGeneratingLoader />}
      </AnimatePresence>

      {/* Background particles */}
      {!isGenerating && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              initial={{ x: Math.random() * 600, y: Math.random() * 800 }}
              animate={{ x: Math.random() * 600, y: Math.random() * 800 }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
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
              ? '50%' : `${formConfig.settings.logo.position?.left || 20}px`,
            transform: formConfig.settings.logo.position?.alignment?.includes('center')
              ? 'translateX(-50%)' : 'none',
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
            className="shadow-xl"
          />
        </motion.div>
      )}

      {/* Main Form Container */}
      {formConfig && !isGenerating && (
        <div className="relative z-10 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            style={getFormStyles()}
          >
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {formConfig.name || 'Untitled Form'}
              </h1>
              {formConfig.description && (
                <p className="text-muted-foreground text-base max-w-xl mx-auto">
                  {formConfig.description}
                </p>
              )}
            </motion.div>

            {/* Form Elements */}
            <div className="space-y-5">
              <AnimatePresence>
                {formConfig.elements.map((element, index) => (
                  <motion.div
                    key={element.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group relative"
                  >
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary font-medium">
                          {element.type}
                        </Badge>
                        {element.required && (
                          <Badge variant="outline" className="text-xs text-destructive border-destructive/30">
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
                    </div>
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
                className="mt-8"
              >
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white py-6 rounded-xl font-semibold text-lg shadow-xl shadow-purple-500/25"
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

// Quick Prompt Templates
const promptTemplates = [
  { icon: '📝', label: 'Contact Form', prompt: 'Create a professional contact form with name, email, phone, subject, and message fields' },
  { icon: '📊', label: 'Survey', prompt: 'Create a customer satisfaction survey with rating scales and feedback sections' },
  { icon: '📅', label: 'Event Registration', prompt: 'Create an event registration form with attendee details, ticket selection, and dietary preferences' },
  { icon: '💼', label: 'Job Application', prompt: 'Create a job application form with personal info, work experience, education, and file upload for resume' },
  { icon: '🛒', label: 'Order Form', prompt: 'Create a product order form with item selection, quantity, shipping address, and payment info' },
  { icon: '📋', label: 'Feedback Form', prompt: 'Create a feedback form with rating scales, multiple choice questions, and open-ended responses' },
];

// AI Models
const aiModels = [
  { value: 'qwen/qwen-2.5-72b-instruct:free', label: 'Qwen 2.5 72B (Free)', tier: 'free' },
  { value: 'meta-llama/llama-3.1-70b-instruct:free', label: 'Llama 3.1 70B (Free)', tier: 'free' },
  { value: 'google/gemini-pro', label: 'Gemini Pro', tier: 'pro' },
  { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku', tier: 'pro' },
  { value: 'openai/gpt-4-turbo', label: 'GPT-4 Turbo', tier: 'premium' },
];

export const AIFormGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<FormConfig | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [model, setModel] = useState('qwen/qwen-2.5-72b-instruct:free');
  const [context, setContext] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook-test/generate-form');
  const [includeValidation, setIncludeValidation] = useState(true);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('generate');
  const [generationHistory, setGenerationHistory] = useState<Array<{ prompt: string; form: FormConfig; timestamp: Date }>>([]);
  const [copied, setCopied] = useState(false);

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
        prompt,
        model,
        context,
        styleReference: '',
        includeValidation,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const formData = normalizeFormConfig(data.form || data);
      setGeneratedForm(formData);
      
      // Add to history
      setGenerationHistory(prev => [
        { prompt, form: formData, timestamp: new Date() },
        ...prev.slice(0, 9)
      ]);
      
      toast({
        title: "Form Generated!",
        description: `Created ${formData.elements.length} form elements`,
      });
    } catch (error) {
      console.error('Error generating form:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Check your webhook URL",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
        borderColor: '#e5e7eb',
        borderRadius: '12px',
        padding: '14px',
        fontSize: '16px',
        fontFamily: 'Inter',
        color: '#1f2937'
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
        layout: { gridColumns: 1, questionSpacing: 24, elementWidth: 'full', labelAlignment: 'top' },
        canvasStyles: data.settings?.canvasStyles || {
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          formBackgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          fontFamily: 'Inter',
          fontSize: 16,
          fontColor: '#1f2937',
          primaryColor: '#7c3aed',
          formWidth: 640
        },
        logo: data.settings?.logo || { enabled: false }
      }
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const formData = normalizeFormConfig(json);
        setGeneratedForm(formData);
        toast({ title: "JSON Imported", description: `Loaded ${formData.elements.length} elements` });
      } catch {
        toast({ title: "Invalid JSON", description: "Could not parse the file", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyToClipboard = () => {
    if (generatedForm) {
      navigator.clipboard.writeText(JSON.stringify(generatedForm, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copied!", description: "JSON copied to clipboard" });
    }
  };

  const downloadJSON = () => {
    if (generatedForm) {
      const blob = new Blob([JSON.stringify(generatedForm, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedForm.name?.replace(/\s+/g, '-').toLowerCase() || 'form'}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const openInCanvas = () => {
    if (generatedForm) {
      sessionStorage.setItem('importedFormConfig', JSON.stringify(generatedForm));
      navigate('/form-builder');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
      >
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/tools">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Form Generator
                  </h1>
                  <p className="text-sm text-muted-foreground">Create forms with natural language</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Device Preview Toggle */}
              <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
                {[
                  { value: 'desktop', icon: Monitor },
                  { value: 'tablet', icon: Tablet },
                  { value: 'mobile', icon: Smartphone },
                ].map(({ value, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={deviceView === value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDeviceView(value as any)}
                    className={`rounded-lg ${deviceView === value ? 'shadow-md' : ''}`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              {generatedForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="rounded-xl">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadJSON} className="rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={openInCanvas} className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-purple-500/25">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Canvas
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 xl:col-span-3 space-y-4"
          >
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 p-1.5 bg-muted/50 rounded-xl m-3 mr-6">
                  <TabsTrigger value="generate" className="rounded-lg data-[state=active]:shadow-md">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-lg data-[state=active]:shadow-md">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-lg data-[state=active]:shadow-md">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>

                <CardContent className="pt-2">
                  <TabsContent value="generate" className="space-y-5 mt-0">
                    {/* Quick Templates */}
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
                        Quick Templates
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {promptTemplates.map((template) => (
                          <Button
                            key={template.label}
                            variant="outline"
                            size="sm"
                            onClick={() => setPrompt(template.prompt)}
                            className="justify-start h-auto py-2.5 px-3 text-left rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all"
                          >
                            <span className="mr-2 text-base">{template.icon}</span>
                            <span className="text-xs font-medium truncate">{template.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Webhook URL */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Webhook URL</Label>
                      <Input
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="Enter webhook URL"
                        className="rounded-xl bg-muted/30 border-border/50"
                      />
                    </div>

                    {/* Form Details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Form Title</Label>
                        <Input
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="My Form"
                          className="rounded-xl bg-muted/30 border-border/50"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">AI Model</Label>
                        <Select value={model} onValueChange={setModel}>
                          <SelectTrigger className="rounded-xl bg-muted/30 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {aiModels.map((m) => (
                              <SelectItem key={m.value} value={m.value}>
                                <div className="flex items-center gap-2">
                                  <span>{m.label}</span>
                                  {m.tier === 'free' && <Badge variant="secondary" className="text-[10px] py-0">Free</Badge>}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Context */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Context (Optional)</Label>
                      <Textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Add business context, brand guidelines, or specific requirements..."
                        className="rounded-xl bg-muted/30 border-border/50 min-h-[80px] resize-none"
                      />
                    </div>

                    {/* Prompt */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Form Description *</Label>
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the form you want to create...

Example: Create a contact form with name, email, phone number, subject dropdown, and a message textarea. Add validation for all fields."
                        className="rounded-xl bg-muted/30 border-border/50 min-h-[140px] resize-none"
                      />
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Switch checked={includeValidation} onCheckedChange={setIncludeValidation} />
                        <Label className="text-sm">Include validation rules</Label>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <Button
                      onClick={generateForm}
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-500/25 text-lg font-semibold"
                    >
                      {isGenerating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="h-5 w-5 mr-2" />
                          </motion.div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Generate Form
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-5 mt-0">
                    <div className="text-center py-8">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer"
                      >
                        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-dashed border-violet-500/30 flex items-center justify-center hover:border-violet-500/50 transition-colors">
                          <FileUp className="h-10 w-10 text-violet-500" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Upload JSON File</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag & drop or click to select a form JSON file
                        </p>
                        <Button variant="outline" className="rounded-xl">
                          <Upload className="h-4 w-4 mr-2" />
                          Select File
                        </Button>
                      </motion.div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-0">
                    <ScrollArea className="h-[400px]">
                      {generationHistory.length === 0 ? (
                        <div className="text-center py-12">
                          <History className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                          <p className="text-muted-foreground">No generation history yet</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {generationHistory.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => setGeneratedForm(item.form)}
                              className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-primary/20"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{item.form.name}</p>
                                  <p className="text-xs text-muted-foreground truncate mt-1">{item.prompt}</p>
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                  {item.form.elements.length} fields
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {item.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* Stats Card */}
            {generatedForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4 text-primary" />
                      Form Statistics
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Total Fields', value: generatedForm.elements.length },
                        { label: 'Required', value: generatedForm.elements.filter(e => e.required).length },
                        { label: 'Field Types', value: new Set(generatedForm.elements.map(e => e.type)).size },
                        { label: 'With Validation', value: generatedForm.elements.filter(e => e.validation && Object.keys(e.validation).length > 0).length },
                      ].map((stat) => (
                        <div key={stat.label} className="p-3 rounded-xl bg-muted/30">
                          <p className="text-2xl font-bold text-primary">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Right Panel - Canvas Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 xl:col-span-9"
          >
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
              {/* Canvas Header */}
              <div className="px-4 py-3 border-b border-border/50 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <Separator orientation="vertical" className="h-5" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {generatedForm?.name || 'AI Form Canvas'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Powered
                    </Badge>
                    <span>{generatedForm?.elements.length || 0} elements</span>
                  </div>
                </div>
              </div>

              {/* Canvas Content */}
              <CardContent className="p-4 md:p-6">
                <div className={`transition-all duration-500 ${deviceView !== 'desktop' ? 'flex justify-center' : ''}`}>
                  <CanvasPreview 
                    formConfig={generatedForm} 
                    isGenerating={isGenerating}
                    deviceView={deviceView}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIFormGenerator;
