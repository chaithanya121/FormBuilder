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
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowLeft, Sparkles, Copy, Download, 
  Eye, Settings, RefreshCw, Brain, Wand2, 
  Upload, FileUp, ExternalLink, Layers, Check,
  History, Palette, Code, Play, ChevronRight, ChevronDown,
  FileText, Layout, Lightbulb, Target, Rocket,
  Clock, Star, Trash2, Save, Share2, Grid3X3,
  Monitor, Smartphone, Tablet, ArrowRight, Sliders,
  Globe, Lock, Zap as ZapIcon, Shield, BarChart3,
  Languages, Paintbrush, GitBranch, Shuffle, Filter,
  CheckCircle2, AlertCircle, Info, PlusCircle, Terminal
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
    "Adding validation rules...",
    "Styling your form...",
    "Finalizing..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % statuses.length);
    }, 1500);
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
            initial={{ x: Math.random() * 500, y: Math.random() * 500 }}
            animate={{
              x: Math.random() * 500,
              y: Math.random() * 500,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-8">
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

          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              style={{ transformOrigin: '0 0' }}
            >
              <motion.div className="absolute" style={{ left: `${50 + i * 15}px`, top: '-8px' }}>
                <Sparkles className={`h-4 w-4 ${i === 0 ? 'text-yellow-300' : i === 1 ? 'text-pink-300' : 'text-cyan-300'}`} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-white mb-3"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI is crafting your form
        </motion.h3>

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

        <div className="w-64 mx-auto">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Canvas Preview Component
const CanvasPreview: React.FC<{ 
  formConfig: FormConfig | null; 
  isGenerating: boolean;
  deviceView: 'desktop' | 'tablet' | 'mobile';
  stylePreset: string;
}> = ({ formConfig, isGenerating, deviceView, stylePreset }) => {
  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const getPresetStyles = () => {
    const presets: Record<string, any> = {
      modern: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', form: '#ffffff', accent: '#7c3aed' },
      minimal: { bg: '#f8fafc', form: '#ffffff', accent: '#0f172a' },
      dark: { bg: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)', form: '#2a2a3e', accent: '#a78bfa' },
      gradient: { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', form: '#ffffff', accent: '#ec4899' },
      ocean: { bg: 'linear-gradient(135deg, #667eea 0%, #64b5f6 100%)', form: '#ffffff', accent: '#3b82f6' },
      forest: { bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', form: '#ffffff', accent: '#10b981' },
      sunset: { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', form: '#ffffff', accent: '#f97316' },
      corporate: { bg: '#1e293b', form: '#ffffff', accent: '#0ea5e9' },
    };
    return presets[stylePreset] || presets.modern;
  };

  const preset = getPresetStyles();

  const getCanvasStyles = () => {
    const styles = formConfig?.settings?.canvasStyles || {};
    return {
      background: styles.backgroundColor || preset.bg,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: styles.fontFamily || 'Inter',
      fontSize: `${styles.fontSize || 16}px`,
      color: styles.fontColor || '#000000'
    };
  };

  const getFormStyles = () => {
    const styles = formConfig?.settings?.canvasStyles || {};
    return {
      backgroundColor: styles.formBackgroundColor || preset.form,
      borderRadius: styles.borderRadius || '20px',
      padding: deviceView === 'mobile' ? '20px' : '32px',
      margin: '24px auto',
      maxWidth: deviceView === 'mobile' ? '100%' : `${styles.formWidth || 600}px`,
      boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.35)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    };
  };

  if (!formConfig && !isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full min-h-[600px] flex items-center justify-center rounded-2xl overflow-hidden"
        style={{ background: preset.bg }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{ width: 100 + i * 100, height: 100 + i * 100 }}
              initial={{ x: '50%', y: '50%', scale: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
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
      style={{ ...getCanvasStyles(), width: getDeviceWidth(), margin: deviceView !== 'desktop' ? '0 auto' : undefined }}
    >
      <AnimatePresence>
        {isGenerating && <AIGeneratingLoader />}
      </AnimatePresence>

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

      {formConfig?.settings?.logo?.enabled && formConfig.settings.logo.url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-20"
          style={{
            top: `${formConfig.settings.logo.position?.top || 20}px`,
            left: formConfig.settings.logo.position?.alignment?.includes('center') ? '50%' : `${formConfig.settings.logo.position?.left || 20}px`,
            transform: formConfig.settings.logo.position?.alignment?.includes('center') ? 'translateX(-50%)' : 'none',
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

      {formConfig && !isGenerating && (
        <div className="relative z-10 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            style={getFormStyles()}
          >
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
                <p className="text-muted-foreground text-base max-w-xl mx-auto">{formConfig.description}</p>
              )}
            </motion.div>

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
                          <Badge variant="outline" className="text-xs text-destructive border-destructive/30">Required</Badge>
                        )}
                      </div>
                      <FormElementRenderer element={element} value="" onChange={() => {}} formConfig={formConfig} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {formConfig.elements.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
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
  { icon: '📝', label: 'Contact', prompt: 'Create a professional contact form with name, email, phone, subject dropdown, and message textarea with validation' },
  { icon: '📊', label: 'Survey', prompt: 'Create a customer satisfaction survey with star ratings, NPS scale, multiple choice, and feedback textarea' },
  { icon: '📅', label: 'Event', prompt: 'Create an event registration form with attendee info, ticket types, dietary preferences, and payment section' },
  { icon: '💼', label: 'Job App', prompt: 'Create a job application form with personal info, work experience, education, skills, and resume upload' },
  { icon: '🛒', label: 'Order', prompt: 'Create a product order form with item selection, quantity, shipping address, and billing information' },
  { icon: '📋', label: 'Feedback', prompt: 'Create a feedback form with rating scales, satisfaction questions, and open-ended responses' },
  { icon: '🎓', label: 'Enrollment', prompt: 'Create a course enrollment form with student details, course selection, prerequisites, and payment' },
  { icon: '🏥', label: 'Medical', prompt: 'Create a patient intake form with personal info, medical history, insurance, and emergency contacts' },
];

// AI Models
const aiModels = [
  { value: 'qwen/qwen-2.5-72b-instruct:free', label: 'Qwen 2.5 72B', tier: 'free', provider: 'Qwen' },
  { value: 'meta-llama/llama-3.1-70b-instruct:free', label: 'Llama 3.1 70B', tier: 'free', provider: 'Meta' },
  { value: 'tngtech/deepseek-r1t-chimera:free', label: 'DeepSeek R1T', tier: 'free', provider: 'TNG' },
  { value: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B', tier: 'free', provider: 'Mistral' },
  { value: 'google/gemini-2.0-flash-exp:free', label: 'Gemini 2.0 Flash', tier: 'free', provider: 'Google' },
  { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku', tier: 'pro', provider: 'Anthropic' },
  { value: 'openai/gpt-4-turbo', label: 'GPT-4 Turbo', tier: 'premium', provider: 'OpenAI' },
  { value: 'other', label: 'Custom Model', tier: 'custom', provider: 'Custom' },
];

// Style Presets
const stylePresets = [
  { value: 'modern', label: 'Modern', color: 'from-violet-500 to-purple-500' },
  { value: 'minimal', label: 'Minimal', color: 'from-slate-400 to-slate-600' },
  { value: 'dark', label: 'Dark Mode', color: 'from-slate-700 to-slate-900' },
  { value: 'gradient', label: 'Gradient', color: 'from-pink-500 to-rose-500' },
  { value: 'ocean', label: 'Ocean', color: 'from-blue-500 to-cyan-500' },
  { value: 'forest', label: 'Forest', color: 'from-emerald-500 to-green-500' },
  { value: 'sunset', label: 'Sunset', color: 'from-orange-500 to-yellow-500' },
  { value: 'corporate', label: 'Corporate', color: 'from-slate-600 to-blue-600' },
];

export const AIFormGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Core State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<FormConfig | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [model, setModel] = useState('qwen/qwen-2.5-72b-instruct:free');
  const [customModel, setCustomModel] = useState('');
  const [context, setContext] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook-test/generate-form');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('generate');
  const [generationHistory, setGenerationHistory] = useState<Array<{ prompt: string; form: FormConfig; timestamp: Date }>>([]);
  const [copied, setCopied] = useState(false);
  
  // Advanced Options State
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [stylePreset, setStylePreset] = useState('modern');
  const [includeValidation, setIncludeValidation] = useState(true);
  const [includeConditionalLogic, setIncludeConditionalLogic] = useState(false);
  const [multiLanguage, setMultiLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [enableAnalytics, setEnableAnalytics] = useState(false);
  const [enableBranding, setEnableBranding] = useState(false);
  const [brandColor, setBrandColor] = useState('#7c3aed');
  const [formWidth, setFormWidth] = useState([640]);
  const [borderRadius, setBorderRadius] = useState([16]);
  const [enableAutoSave, setEnableAutoSave] = useState(true);
  const [enableProgressBar, setEnableProgressBar] = useState(false);
  const [fieldDensity, setFieldDensity] = useState<'compact' | 'normal' | 'spacious'>('normal');
  const [temperature, setTemperature] = useState([0.7]);
  const [maxFields, setMaxFields] = useState([20]);

  const getActiveModel = () => {
    return model === 'other' ? customModel : model;
  };

  const generateForm = async () => {
    if (!prompt.trim()) {
      toast({ title: "Missing Prompt", description: "Please enter a description for your form", variant: "destructive" });
      return;
    }

    const activeModel = getActiveModel();
    if (!activeModel) {
      toast({ title: "Missing Model", description: "Please enter a custom model name", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    
    try {
      const payload = {
        prompt,
        model: activeModel,
        context,
        styleReference: stylePreset,
        includeValidation,
        includeConditionalLogic,
        multiLanguage,
        language: selectedLanguage,
        enableAnalytics,
        formWidth: formWidth[0],
        borderRadius: borderRadius[0],
        fieldDensity,
        temperature: temperature[0],
        maxFields: maxFields[0],
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
      
      setGenerationHistory(prev => [
        { prompt, form: formData, timestamp: new Date() },
        ...prev.slice(0, 9)
      ]);
      
      toast({ title: "Form Generated!", description: `Created ${formData.elements.length} form elements` });
    } catch (error) {
      console.error('Error generating form:', error);
      toast({ title: "Generation Failed", description: error instanceof Error ? error.message : "Check your webhook URL", variant: "destructive" });
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
      conditionalLogic: el.conditionalLogic || '',
      fieldStyles: el.fieldStyles || {
        className: 'w-full',
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderRadius: `${borderRadius[0]}px`,
        padding: fieldDensity === 'compact' ? '10px' : fieldDensity === 'spacious' ? '18px' : '14px',
        fontSize: '16px',
        fontFamily: 'Inter',
        color: '#1f2937'
      },
      labelStyles: el.labelStyles || { color: '#374151', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter' }
    }));

    return {
      name: data.name || data.title || formTitle || 'AI Generated Form',
      description: data.description || formDescription || '',
      elements,
      settings: {
        layout: { gridColumns: 1, questionSpacing: fieldDensity === 'compact' ? 16 : fieldDensity === 'spacious' ? 32 : 24, elementWidth: 'full', labelAlignment: 'top' },
        canvasStyles: data.settings?.canvasStyles || {
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          formBackgroundColor: '#ffffff',
          borderRadius: `${borderRadius[0]}px`,
          padding: '32px',
          fontFamily: 'Inter',
          fontSize: 16,
          fontColor: '#1f2937',
          primaryColor: brandColor,
          formWidth: formWidth[0]
        },
        logo: data.settings?.logo || { enabled: enableBranding }
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

  const clearHistory = () => {
    setGenerationHistory([]);
    toast({ title: "History Cleared", description: "Generation history has been cleared" });
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
                    AI Form Generator Pro
                  </h1>
                  <p className="text-sm text-muted-foreground">Advanced AI-powered form creation</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
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
          {/* Left Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 xl:col-span-3 space-y-4">
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
                  <TabsContent value="generate" className="space-y-4 mt-0">
                    {/* Quick Templates */}
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Quick Templates</Label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {promptTemplates.map((template) => (
                          <Button
                            key={template.label}
                            variant="outline"
                            size="sm"
                            onClick={() => setPrompt(template.prompt)}
                            className="h-auto py-2 px-2 flex-col gap-1 rounded-xl hover:bg-primary/5 hover:border-primary/30"
                            title={template.prompt}
                          >
                            <span className="text-lg">{template.icon}</span>
                            <span className="text-[10px] font-medium truncate w-full">{template.label}</span>
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
                        className="rounded-xl bg-muted/30 border-border/50 text-sm"
                      />
                    </div>

                    {/* AI Model Selection */}
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
                                <Badge variant="secondary" className={`text-[10px] py-0 ${
                                  m.tier === 'free' ? 'bg-green-500/10 text-green-600' :
                                  m.tier === 'pro' ? 'bg-blue-500/10 text-blue-600' :
                                  m.tier === 'premium' ? 'bg-purple-500/10 text-purple-600' :
                                  'bg-orange-500/10 text-orange-600'
                                }`}>
                                  {m.tier === 'custom' ? 'Custom' : m.tier}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Custom Model Input */}
                      <AnimatePresence>
                        {model === 'other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2"
                          >
                            <div className="relative">
                              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                value={customModel}
                                onChange={(e) => setCustomModel(e.target.value)}
                                placeholder="e.g., tngtech/deepseek-r1t-chimera:free"
                                className="pl-10 rounded-xl bg-muted/30 border-border/50 text-sm font-mono"
                              />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">Enter the full model identifier</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Form Title */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Form Title</Label>
                      <Input
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="My Awesome Form"
                        className="rounded-xl bg-muted/30 border-border/50"
                      />
                    </div>

                    {/* Style Preset */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Style Preset</Label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {stylePresets.map((preset) => (
                          <Button
                            key={preset.value}
                            variant={stylePreset === preset.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStylePreset(preset.value)}
                            className={`h-auto py-2 flex-col gap-1 rounded-xl ${stylePreset === preset.value ? '' : 'hover:bg-muted/50'}`}
                          >
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${preset.color}`} />
                            <span className="text-[10px]">{preset.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Prompt */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Form Description *</Label>
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the form you want to create...

Example: Create a multi-step registration form with personal info, address, and preferences sections. Include email validation and required fields."
                        className="rounded-xl bg-muted/30 border-border/50 min-h-[120px] resize-none"
                      />
                    </div>

                    {/* Advanced Options */}
                    <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between rounded-xl hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Sliders className="h-4 w-4" />
                            <span className="text-sm font-medium">Advanced Options</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 pt-4">
                        {/* Context */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Context / Instructions</Label>
                          <Textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder="Additional context, brand guidelines, specific requirements..."
                            className="rounded-xl bg-muted/30 border-border/50 min-h-[60px] resize-none text-sm"
                          />
                        </div>

                        {/* AI Temperature */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">AI Creativity</Label>
                            <span className="text-xs text-muted-foreground">{temperature[0]}</span>
                          </div>
                          <Slider value={temperature} onValueChange={setTemperature} min={0} max={1} step={0.1} className="w-full" />
                          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                            <span>Precise</span>
                            <span>Creative</span>
                          </div>
                        </div>

                        {/* Max Fields */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">Max Fields</Label>
                            <span className="text-xs text-muted-foreground">{maxFields[0]}</span>
                          </div>
                          <Slider value={maxFields} onValueChange={setMaxFields} min={5} max={50} step={1} className="w-full" />
                        </div>

                        {/* Form Width */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">Form Width</Label>
                            <span className="text-xs text-muted-foreground">{formWidth[0]}px</span>
                          </div>
                          <Slider value={formWidth} onValueChange={setFormWidth} min={400} max={900} step={10} className="w-full" />
                        </div>

                        {/* Border Radius */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">Border Radius</Label>
                            <span className="text-xs text-muted-foreground">{borderRadius[0]}px</span>
                          </div>
                          <Slider value={borderRadius} onValueChange={setBorderRadius} min={0} max={32} step={1} className="w-full" />
                        </div>

                        {/* Field Density */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Field Density</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['compact', 'normal', 'spacious'] as const).map((density) => (
                              <Button
                                key={density}
                                variant={fieldDensity === density ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFieldDensity(density)}
                                className="rounded-xl capitalize"
                              >
                                {density}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Toggles */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Include Validation</Label>
                            </div>
                            <Switch checked={includeValidation} onCheckedChange={setIncludeValidation} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GitBranch className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Conditional Logic</Label>
                            </div>
                            <Switch checked={includeConditionalLogic} onCheckedChange={setIncludeConditionalLogic} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Enable Analytics</Label>
                            </div>
                            <Switch checked={enableAnalytics} onCheckedChange={setEnableAnalytics} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Save className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Auto-save Progress</Label>
                            </div>
                            <Switch checked={enableAutoSave} onCheckedChange={setEnableAutoSave} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Layers className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Progress Bar</Label>
                            </div>
                            <Switch checked={enableProgressBar} onCheckedChange={setEnableProgressBar} />
                          </div>
                        </div>

                        <Separator />

                        {/* Multi-language */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Languages className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Multi-language</Label>
                            </div>
                            <Switch checked={multiLanguage} onCheckedChange={setMultiLanguage} />
                          </div>
                          
                          <AnimatePresence>
                            {multiLanguage && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                  <SelectTrigger className="rounded-xl bg-muted/30 border-border/50">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                    <SelectItem value="zh">Chinese</SelectItem>
                                    <SelectItem value="ja">Japanese</SelectItem>
                                    <SelectItem value="ar">Arabic</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                  </SelectContent>
                                </Select>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Branding */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Paintbrush className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Custom Branding</Label>
                            </div>
                            <Switch checked={enableBranding} onCheckedChange={setEnableBranding} />
                          </div>
                          
                          <AnimatePresence>
                            {enableBranding && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-2"
                              >
                                <Label className="text-sm">Brand Color</Label>
                                <input
                                  type="color"
                                  value={brandColor}
                                  onChange={(e) => setBrandColor(e.target.value)}
                                  className="w-8 h-8 rounded-lg border-0 cursor-pointer"
                                />
                                <Input
                                  value={brandColor}
                                  onChange={(e) => setBrandColor(e.target.value)}
                                  className="w-24 rounded-xl text-xs font-mono"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Generate Button */}
                    <Button
                      onClick={generateForm}
                      disabled={isGenerating || !prompt.trim() || (model === 'other' && !customModel.trim())}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-500/25 text-lg font-semibold"
                    >
                      {isGenerating ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
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

                  <TabsContent value="upload" className="mt-0">
                    <div className="text-center py-8">
                      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
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
                        <p className="text-sm text-muted-foreground mb-4">Drag & drop or click to select</p>
                        <Button variant="outline" className="rounded-xl">
                          <Upload className="h-4 w-4 mr-2" />
                          Select File
                        </Button>
                      </motion.div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">{generationHistory.length} items</span>
                      {generationHistory.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearHistory} className="text-xs text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>
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
                                <Badge variant="secondary" className="text-[10px]">{item.form.elements.length} fields</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{item.timestamp.toLocaleTimeString()}</span>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4 text-primary" />
                      Form Statistics
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Total Fields', value: generatedForm.elements.length, icon: Layers },
                        { label: 'Required', value: generatedForm.elements.filter(e => e.required).length, icon: AlertCircle },
                        { label: 'Field Types', value: new Set(generatedForm.elements.map(e => e.type)).size, icon: Grid3X3 },
                        { label: 'With Rules', value: generatedForm.elements.filter(e => e.validation && Object.keys(e.validation).length > 0).length, icon: Shield },
                      ].map((stat) => (
                        <div key={stat.label} className="p-3 rounded-xl bg-muted/30">
                          <div className="flex items-center gap-2 mb-1">
                            <stat.icon className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                          <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Right Panel - Canvas */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-8 xl:col-span-9">
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <Separator orientation="vertical" className="h-5" />
                    <span className="text-sm font-medium text-muted-foreground">{generatedForm?.name || 'AI Form Canvas'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {getActiveModel().split('/').pop()?.split(':')[0] || 'AI'}
                    </Badge>
                    <span>{generatedForm?.elements.length || 0} elements</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 md:p-6">
                <div className={`transition-all duration-500 ${deviceView !== 'desktop' ? 'flex justify-center' : ''}`}>
                  <CanvasPreview 
                    formConfig={generatedForm} 
                    isGenerating={isGenerating}
                    deviceView={deviceView}
                    stylePreset={stylePreset}
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
