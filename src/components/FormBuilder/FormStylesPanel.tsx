
import React, { useState } from 'react';
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
import { 
  Palette, Type, Layout, Image, Code, Save, Eye, 
  Upload, Download, RefreshCw, Paintbrush, Layers,
  Monitor, Smartphone, Tablet, Zap
} from 'lucide-react';
import { FormConfig } from './types';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface FormStylesPanelProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
  onClose: () => void;
}

const FormStylesPanel: React.FC<FormStylesPanelProps> = ({ formConfig, onUpdate, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('design');
  const [savedThemes, setSavedThemes] = useState<any[]>([]);

  const handleStyleUpdate = (category: string, field: string, value: any) => {
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
        handleStyleUpdate('canvasStyles', 'backgroundImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const predefinedThemes = [
    {
      name: 'Modern Blue',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#3b82f6',
      fontColor: '#1f2937',
      borderRadius: '12px'
    },
    {
      name: 'Sunset Orange',
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#f59e0b',
      fontColor: '#1f2937',
      borderRadius: '16px'
    },
    {
      name: 'Forest Green',
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#10b981',
      fontColor: '#1f2937',
      borderRadius: '8px'
    },
    {
      name: 'Purple Dreams',
      backgroundColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#8b5cf6',
      fontColor: '#1f2937',
      borderRadius: '20px'
    },
    {
      name: 'Dark Mode',
      backgroundColor: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
      formBackgroundColor: '#2d3748',
      primaryColor: '#60a5fa',
      fontColor: '#f7fafc',
      borderRadius: '12px'
    },
    {
      name: 'Minimalist',
      backgroundColor: '#f8fafc',
      formBackgroundColor: '#ffffff',
      primaryColor: '#64748b',
      fontColor: '#334155',
      borderRadius: '4px'
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
      title: "Theme Applied",
      description: `${theme.name} theme has been applied to your form.`,
    });
  };

  const saveCurrentTheme = () => {
    const currentTheme = {
      name: `Custom Theme ${Date.now()}`,
      ...formConfig.settings.canvasStyles
    };
    
    const updatedThemes = [...savedThemes, currentTheme];
    setSavedThemes(updatedThemes);
    localStorage.setItem('formBuilder_savedThemes', JSON.stringify(updatedThemes));
    
    toast({
      title: "Theme Saved",
      description: "Your current theme has been saved to your browser.",
    });
  };

  const canvasStyles = formConfig.settings.canvasStyles || {};

  return (
    <Card className="h-full flex flex-col bg-white border-l border-slate-200">
      {/* Header */}
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          <div>
            <h3 className="text-lg font-bold">Form Designer</h3>
            <p className="text-purple-100 text-sm">Customize your form's appearance</p>
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
            <TabsContent value="design" className="h-full m-0 p-4 space-y-6">
              {/* Colors Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors & Background
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Canvas Background</Label>
                    <Input
                      type="color"
                      value={canvasStyles.backgroundColor?.includes('gradient') ? '#667eea' : canvasStyles.backgroundColor || '#667eea'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'backgroundColor', e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Form Background</Label>
                    <Input
                      type="color"
                      value={canvasStyles.formBackgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'formBackgroundColor', e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Primary Color</Label>
                    <Input
                      type="color"
                      value={canvasStyles.primaryColor || '#3b82f6'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'primaryColor', e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Text Color</Label>
                    <Input
                      type="color"
                      value={canvasStyles.fontColor || '#000000'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'fontColor', e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                </div>

                {/* Background Image */}
                <div>
                  <Label className="text-sm">Background Image</Label>
                  <div className="mt-2 space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                    />
                    {canvasStyles.backgroundImage && (
                      <div className="relative">
                        <img 
                          src={canvasStyles.backgroundImage} 
                          alt="Background preview" 
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1"
                          onClick={() => handleStyleUpdate('canvasStyles', 'backgroundImage', '')}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Typography Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Typography
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Font Family</Label>
                    <Select 
                      value={canvasStyles.fontFamily || 'Inter'}
                      onValueChange={(value) => handleStyleUpdate('canvasStyles', 'fontFamily', value)}
                    >
                      <SelectTrigger>
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
                    <Label className="text-sm">Font Size</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[canvasStyles.fontSize || 16]}
                        onValueChange={(value) => handleStyleUpdate('canvasStyles', 'fontSize', value[0])}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{canvasStyles.fontSize || 16}px</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Spacing & Borders */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Spacing & Borders</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Border Radius</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[parseInt(canvasStyles.borderRadius?.replace('px', '') || '12')]}
                        onValueChange={(value) => handleStyleUpdate('canvasStyles', 'borderRadius', `${value[0]}px`)}
                        max={50}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{canvasStyles.borderRadius || '12px'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm">Padding</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[parseInt(canvasStyles.padding?.replace('px', '') || '32')]}
                        onValueChange={(value) => handleStyleUpdate('canvasStyles', 'padding', `${value[0]}px`)}
                        max={80}
                        min={8}
                        step={4}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{canvasStyles.padding || '32px'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="h-full m-0 p-4 space-y-6">
              {/* Form Layout */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  Form Layout
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Form Width</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[canvasStyles.formWidth || 752]}
                        onValueChange={(value) => handleStyleUpdate('canvasStyles', 'formWidth', value[0])}
                        max={1200}
                        min={320}
                        step={8}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{canvasStyles.formWidth || 752}px</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Question Spacing</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[formConfig.settings.layout?.questionSpacing || 24]}
                        onValueChange={(value) => handleLayoutUpdate('questionSpacing', value[0])}
                        max={60}
                        min={8}
                        step={4}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{formConfig.settings.layout?.questionSpacing || 24}px</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Label Alignment</Label>
                    <Select 
                      value={formConfig.settings.layout?.labelAlignment || 'top'}
                      onValueChange={(value) => handleLayoutUpdate('labelAlignment', value)}
                    >
                      <SelectTrigger>
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
              </div>

              {/* Responsive Design */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Responsive Design
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.desktop || true}
                      onCheckedChange={(checked) => handleLayoutUpdate('columns', {...formConfig.settings.layout?.columns, desktop: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tablet className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.tablet || true}
                      onCheckedChange={(checked) => handleLayoutUpdate('columns', {...formConfig.settings.layout?.columns, tablet: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.default || true}
                      onCheckedChange={(checked) => handleLayoutUpdate('columns', {...formConfig.settings.layout?.columns, default: checked})}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="themes" className="h-full m-0 p-4 space-y-6">
              {/* Predefined Themes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Predefined Themes
                  </h4>
                  <Button
                    size="sm"
                    onClick={saveCurrentTheme}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Current
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {predefinedThemes.map((theme, index) => (
                    <motion.div
                      key={theme.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 border rounded-lg cursor-pointer hover:border-purple-300 transition-colors"
                      onClick={() => applyTheme(theme)}
                    >
                      <div 
                        className="w-full h-12 rounded-md mb-2"
                        style={{ background: theme.backgroundColor }}
                      />
                      <div className="text-xs font-medium">{theme.name}</div>
                      <div 
                        className="w-4 h-4 rounded-full mt-1"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Saved Themes */}
              {savedThemes.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Your Saved Themes</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {savedThemes.map((theme, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 border rounded-lg cursor-pointer hover:border-purple-300 transition-colors"
                        onClick={() => applyTheme(theme)}
                      >
                        <div 
                          className="w-full h-12 rounded-md mb-2"
                          style={{ background: theme.backgroundColor }}
                        />
                        <div className="text-xs font-medium">{theme.name}</div>
                        <Badge variant="secondary" className="mt-1">Custom</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="advanced" className="h-full m-0 p-4 space-y-6">
              {/* Custom CSS */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Custom CSS
                </h4>
                
                <Textarea
                  placeholder="/* Add your custom CSS here */
.form-container {
  /* Your styles */
}

.form-element {
  /* Element styles */
}"
                  value={canvasStyles.customCSS || ''}
                  onChange={(e) => handleStyleUpdate('canvasStyles', 'customCSS', e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              {/* CSS Class Names */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">CSS Classes</h4>
                
                <div>
                  <Label className="text-sm">Container Class</Label>
                  <Input
                    value={canvasStyles.containerClass || ''}
                    onChange={(e) => handleStyleUpdate('canvasStyles', 'containerClass', e.target.value)}
                    placeholder="custom-container-class"
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
          </div>

          {/* Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Styles Applied",
                    description: "Your form styling has been updated.",
                  });
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Eye className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FormStylesPanel;
