
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Type, Layout, Image, Code, Save, Eye, 
  Upload, Download, RefreshCw, Paintbrush, Layers,
  Monitor, Smartphone, Tablet, Zap, Sparkles, Wand2,
  Crown, Star, Heart, Award
} from 'lucide-react';
import { FormConfig } from './types';
import { useToast } from '@/hooks/use-toast';

interface EnhancedFormStylesPanelProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
  onClose: () => void;
}

const EnhancedFormStylesPanel: React.FC<EnhancedFormStylesPanelProps> = ({ 
  formConfig, 
  onUpdate, 
  onClose 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('design');
  const [savedThemes, setSavedThemes] = useState<any[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // Load saved themes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('formBuilder_savedThemes');
    if (saved) {
      setSavedThemes(JSON.parse(saved));
    }
  }, []);

  const handleStyleUpdate = (field: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          [field]: value
        }
      }
    };
    onUpdate(updatedConfig);
    
    // Show instant feedback
    toast({
      title: "Style Updated",
      description: `${field} has been updated successfully.`,
      duration: 2000,
    });
  };

  const handleLayoutUpdate = (field: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        layout: {
          ...formConfig.settings.layout,
          [field]: value
        }
      }
    };
    onUpdate(updatedConfig);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        handleStyleUpdate('backgroundImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const predefinedThemes = [
    {
      name: 'Modern Blue',
      category: 'Professional',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#3b82f6',
      fontColor: '#1f2937',
      borderRadius: '12px',
      fontFamily: 'Inter',
      formWidth: 752
    },
    {
      name: 'Sunset Orange',
      category: 'Creative',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#f59e0b',
      fontColor: '#1f2937',
      borderRadius: '16px',
      fontFamily: 'Poppins',
      formWidth: 680
    },
    {
      name: 'Ocean Breeze',
      category: 'Fresh',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#10b981',
      fontColor: '#1f2937',
      borderRadius: '8px',
      fontFamily: 'Roboto',
      formWidth: 800
    },
    {
      name: 'Purple Dreams',
      category: 'Elegant',
      backgroundColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#8b5cf6',
      fontColor: '#1f2937',
      borderRadius: '20px',
      fontFamily: 'Montserrat',
      formWidth: 720
    },
    {
      name: 'Dark Professional',
      category: 'Dark',
      backgroundColor: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
      formBackgroundColor: '#2d3748',
      primaryColor: '#60a5fa',
      fontColor: '#f7fafc',
      borderRadius: '12px',
      fontFamily: 'Source Sans Pro',
      formWidth: 760
    },
    {
      name: 'Minimalist White',
      category: 'Clean',
      backgroundColor: '#f8fafc',
      formBackgroundColor: '#ffffff',
      primaryColor: '#64748b',
      fontColor: '#334155',
      borderRadius: '4px',
      fontFamily: 'Lato',
      formWidth: 640
    }
  ];

  const applyTheme = (theme: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          ...theme
        }
      }
    };
    onUpdate(updatedConfig);
    
    toast({
      title: "Theme Applied Successfully!",
      description: `${theme.name} theme has been applied to your form.`,
    });
  };

  const saveCurrentTheme = () => {
    const currentTheme = {
      name: `Custom Theme ${Date.now()}`,
      category: 'Custom',
      created: new Date().toISOString(),
      ...formConfig.settings.canvasStyles
    };
    
    const updatedThemes = [...savedThemes, currentTheme];
    setSavedThemes(updatedThemes);
    localStorage.setItem('formBuilder_savedThemes', JSON.stringify(updatedThemes));
    
    toast({
      title: "Theme Saved!",
      description: "Your current theme has been saved to your library.",
    });
  };

  const canvasStyles = formConfig.settings.canvasStyles || {};

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-white via-purple-50 to-pink-50 border-l border-slate-200 shadow-xl">
      {/* Enhanced Header */}
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        <CardTitle className="flex items-center gap-3 relative z-10">
          <motion.div
            className="p-2 bg-white/20 rounded-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Paintbrush className="h-6 w-6" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              Form Designer Studio
              <Crown className="h-5 w-5 text-yellow-300" />
            </h3>
            <p className="text-purple-100 text-sm">Transform your form with stunning designs</p>
          </div>
          <div className="ml-auto flex gap-1">
            <Star className="h-4 w-4 text-yellow-300" />
            <Heart className="h-4 w-4 text-pink-300" />
            <Award className="h-4 w-4 text-orange-300" />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 pt-4 border-b border-slate-200 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100">
              <TabsTrigger value="design" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                Design
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">
                <Layout className="h-3 w-3 mr-1" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="themes" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Themes
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs">
                <Code className="h-3 w-3 mr-1" />
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="design" className="h-full m-0 p-6 space-y-8">
              {/* Colors Section */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <Palette className="h-5 w-5 text-purple-600" />
                  Colors & Background
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-semibold">Canvas Background</Label>
                    <Input
                      type="color"
                      value={canvasStyles.backgroundColor?.includes('gradient') ? '#667eea' : canvasStyles.backgroundColor || '#667eea'}
                      onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                      className="h-12 w-full cursor-pointer border-2 hover:border-purple-400 transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-semibold">Form Background</Label>
                    <Input
                      type="color"
                      value={canvasStyles.formBackgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleUpdate('formBackgroundColor', e.target.value)}
                      className="h-12 w-full cursor-pointer border-2 hover:border-purple-400 transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-semibold">Primary Color</Label>
                    <Input
                      type="color"
                      value={canvasStyles.primaryColor || '#3b82f6'}
                      onChange={(e) => handleStyleUpdate('primaryColor', e.target.value)}
                      className="h-12 w-full cursor-pointer border-2 hover:border-purple-400 transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-semibold">Text Color</Label>
                    <Input
                      type="color"
                      value={canvasStyles.fontColor || '#000000'}
                      onChange={(e) => handleStyleUpdate('fontColor', e.target.value)}
                      className="h-12 w-full cursor-pointer border-2 hover:border-purple-400 transition-colors"
                    />
                  </motion.div>
                </div>

                {/* Background Image */}
                <div>
                  <Label className="text-sm font-semibold">Background Image</Label>
                  <div className="mt-2 space-y-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full border-2 border-dashed hover:border-purple-400 transition-colors"
                    />
                    {canvasStyles.backgroundImage && (
                      <div className="relative">
                        <img 
                          src={canvasStyles.backgroundImage} 
                          alt="Background preview" 
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => handleStyleUpdate('backgroundImage', '')}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              <Separator className="bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

              {/* Typography Section */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <Type className="h-5 w-5 text-blue-600" />
                  Typography
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Font Family</Label>
                    <Select 
                      value={canvasStyles.fontFamily || 'Inter'}
                      onValueChange={(value) => handleStyleUpdate('fontFamily', value)}
                    >
                      <SelectTrigger className="border-2 hover:border-blue-400 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold">Font Size</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[canvasStyles.fontSize || 16]}
                        onValueChange={(value) => handleStyleUpdate('fontSize', value[0])}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500 font-medium">{canvasStyles.fontSize || 16}px</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <Separator className="bg-gradient-to-r from-transparent via-green-300 to-transparent" />

              {/* Spacing & Borders */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-bold text-slate-900 text-lg">Spacing & Borders</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Border Radius</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[parseInt(canvasStyles.borderRadius?.replace('px', '') || '12')]}
                        onValueChange={(value) => handleStyleUpdate('borderRadius', `${value[0]}px`)}
                        max={50}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500 font-medium">{canvasStyles.borderRadius || '12px'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold">Padding</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[parseInt(canvasStyles.padding?.replace('px', '') || '32')]}
                        onValueChange={(value) => handleStyleUpdate('padding', `${value[0]}px`)}
                        max={80}
                        min={8}
                        step={4}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500 font-medium">{canvasStyles.padding || '32px'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="layout" className="h-full m-0 p-6 space-y-8">
              {/* Form Layout */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <Layout className="h-5 w-5 text-green-600" />
                  Form Layout
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold">Form Width</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[canvasStyles.formWidth || 752]}
                        onValueChange={(value) => handleStyleUpdate('formWidth', value[0])}
                        max={1200}
                        min={320}
                        step={8}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500 font-medium">{canvasStyles.formWidth || 752}px</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Question Spacing</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[formConfig.settings.layout?.questionSpacing || 24]}
                        onValueChange={(value) => handleLayoutUpdate('questionSpacing', value[0])}
                        max={60}
                        min={8}
                        step={4}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500 font-medium">{formConfig.settings.layout?.questionSpacing || 24}px</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Label Alignment</Label>
                    <Select 
                      value={formConfig.settings.layout?.labelAlignment || 'top'}
                      onValueChange={(value) => handleLayoutUpdate('labelAlignment', value)}
                    >
                      <SelectTrigger className="border-2 hover:border-green-400 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>

              {/* Responsive Design */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  Responsive Design
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Desktop</span>
                    </div>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.desktop || true}
                      onCheckedChange={(checked) => handleLayoutUpdate('columns', {...formConfig.settings.layout?.columns, desktop: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <Tablet className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Tablet</span>
                    </div>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.tablet || true}
                      onCheckedChange={(checked) => handleLayoutUpdate('columns', {...formConfig.settings.layout?.columns, tablet: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Mobile</span>
                    </div>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.default || true}
                      onCheckedChange={(checked) => handleLayoutUpdate('columns', {...formConfig.settings.layout?.columns, default: checked})}
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="themes" className="h-full m-0 p-6 space-y-8">
              {/* Predefined Themes */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Professional Themes
                  </h4>
                  <Button
                    size="sm"
                    onClick={saveCurrentTheme}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Current
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {predefinedThemes.map((theme, index) => (
                    <motion.div
                      key={theme.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 border-2 rounded-xl cursor-pointer hover:border-purple-300 transition-all duration-300 bg-white hover:shadow-lg"
                      onClick={() => applyTheme(theme)}
                    >
                      <div 
                        className="w-full h-16 rounded-lg mb-3 shadow-inner"
                        style={{ background: theme.backgroundColor }}
                      />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-sm">{theme.name}</div>
                          <Badge variant="secondary" className="text-xs">{theme.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span className="text-xs text-gray-500">{theme.fontFamily}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Saved Themes */}
              {savedThemes.length > 0 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Your Saved Themes
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {savedThemes.map((theme, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 border-2 rounded-xl cursor-pointer hover:border-purple-300 transition-all duration-300 bg-gradient-to-br from-white to-purple-50 hover:shadow-lg"
                        onClick={() => applyTheme(theme)}
                      >
                        <div 
                          className="w-full h-16 rounded-lg mb-3 shadow-inner"
                          style={{ background: theme.backgroundColor }}
                        />
                        <div className="space-y-2">
                          <div className="font-semibold text-sm">{theme.name}</div>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Custom
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="advanced" className="h-full m-0 p-6 space-y-8">
              {/* Custom CSS */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <Code className="h-5 w-5 text-green-600" />
                  Custom CSS
                </h4>
                
                <Textarea
                  placeholder={`/* Add your custom CSS here */
.form-container {
  /* Your styles */
}

.form-element {
  /* Element styles */
}

/* Advanced animations */
@keyframes customFade {
  from { opacity: 0; }
  to { opacity: 1; }
}`}
                  value={canvasStyles.customCSS || ''}
                  onChange={(e) => handleStyleUpdate('customCSS', e.target.value)}
                  className="min-h-[250px] font-mono text-sm border-2 focus:border-green-400 transition-colors"
                />
              </motion.div>

              {/* CSS Class Names */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="font-bold text-slate-900 text-lg">CSS Classes</h4>
                
                <div>
                  <Label className="text-sm font-semibold">Container Class</Label>
                  <Input
                    value={canvasStyles.containerClass || ''}
                    onChange={(e) => handleStyleUpdate('containerClass', e.target.value)}
                    placeholder="custom-container-class"
                    className="mt-2 border-2 focus:border-green-400 transition-colors"
                  />
                </div>
              </motion.div>
            </TabsContent>
          </div>

          {/* Enhanced Actions */}
          <motion.div 
            className="p-6 bg-gradient-to-r from-gray-50 to-purple-50 border-t border-slate-200 flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <Button 
                onClick={onClose} 
                variant="outline" 
                className="flex-1 border-2 hover:border-gray-400 transition-colors"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Styles Applied Successfully!",
                    description: "Your form styling has been updated with all changes.",
                  });
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                Apply & Preview
              </Button>
            </div>
          </motion.div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedFormStylesPanel;
