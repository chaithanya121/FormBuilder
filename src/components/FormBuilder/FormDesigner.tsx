
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Type, Layout, Paintbrush, Check, Sparkles, Settings, Upload, Download, 
  Brush, Eye, Monitor, Smartphone, Tablet, Image as ImageIcon, X, Moon, Sun,
  Zap, Layers, Grid, AlignLeft, RotateCcw, Copy, Wand2, Star, Heart
} from 'lucide-react';
import { FormConfig } from './types';

interface FormDesignerProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const PRESET_THEMES = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      background: '#ffffff',
      form: '#ffffff',
      text: '#1a1a1a'
    },
    gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    category: 'minimal',
    popular: true
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      form: '#ffffff',
      text: '#1e40af'
    },
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    category: 'gradient',
    popular: true
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    colors: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      form: '#ffffff',
      text: '#dc2626'
    },
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    category: 'warm',
    popular: true
  },
  {
    id: 'forest-calm',
    name: 'Forest Calm',
    preview: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      form: '#ffffff',
      text: '#065f46'
    },
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    category: 'nature'
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    preview: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      form: '#374151',
      text: '#f9fafb'
    },
    gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    category: 'dark',
    popular: true
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    preview: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
    colors: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      form: '#ffffff',
      text: '#1e40af'
    },
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
    category: 'professional'
  },
  {
    id: 'purple-dreams',
    name: 'Purple Dreams',
    preview: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      form: '#ffffff',
      text: '#7c3aed'
    },
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    category: 'creative'
  },
  {
    id: 'emerald-fresh',
    name: 'Emerald Fresh',
    preview: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      form: '#ffffff',
      text: '#065f46'
    },
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    category: 'nature'
  }
];

const COLOR_PALETTES = [
  { name: 'Blues', colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'] },
  { name: 'Greens', colors: ['#065f46', '#10b981', '#34d399', '#6ee7b7', '#d1fae5'] },
  { name: 'Purples', colors: ['#581c87', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe'] },
  { name: 'Reds', colors: ['#991b1b', '#ef4444', '#f87171', '#fca5a5', '#fee2e2'] },
  { name: 'Oranges', colors: ['#c2410c', '#f97316', '#fb923c', '#fdba74', '#fed7aa'] },
  { name: 'Grays', colors: ['#111827', '#374151', '#6b7280', '#9ca3af', '#f3f4f6'] }
];

const FONT_FAMILIES = [
  { value: 'Inter', label: 'Inter (Recommended)', category: 'Sans-serif' },
  { value: 'Arial', label: 'Arial', category: 'Sans-serif' },
  { value: 'Helvetica', label: 'Helvetica', category: 'Sans-serif' },
  { value: 'Georgia', label: 'Georgia', category: 'Serif' },
  { value: 'Times New Roman', label: 'Times New Roman', category: 'Serif' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans-serif' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans-serif' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans-serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' }
];

const FormDesigner: React.FC<FormDesignerProps> = ({ isOpen, onClose, formConfig, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedTheme, setSelectedTheme] = useState('modern-minimal');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [darkMode, setDarkMode] = useState(false);
  const [customColor, setCustomColor] = useState('#3b82f6');

  const handleStyleUpdate = (category: string, field: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        [category]: {
          ...formConfig.settings[category as keyof typeof formConfig.settings],
          [field]: value
        }
      }
    };
    onUpdate(updatedConfig);
  };

  const applyTheme = (themeId: string) => {
    const selectedThemeData = PRESET_THEMES.find(t => t.id === themeId);
    if (selectedThemeData) {
      setSelectedTheme(themeId);
      const updatedConfig = {
        ...formConfig,
        settings: {
          ...formConfig.settings,
          canvasStyles: {
            ...formConfig.settings.canvasStyles,
            backgroundColor: selectedThemeData.gradient,
            backgroundImage: '',
            formBackgroundColor: selectedThemeData.colors.form,
            primaryColor: selectedThemeData.colors.primary,
            secondaryColor: selectedThemeData.colors.secondary,
            fontColor: selectedThemeData.colors.text
          }
        }
      };
      onUpdate(updatedConfig);
    }
  };

  const generateRandomTheme = () => {
    const colors = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)].colors;
    const primaryColor = colors[1];
    const secondaryColor = colors[2];
    const backgroundColor = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          backgroundColor: backgroundColor,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          fontColor: darkMode ? '#ffffff' : '#1a1a1a',
          formBackgroundColor: darkMode ? '#374151' : '#ffffff'
        }
      }
    };
    onUpdate(updatedConfig);
  };

  const resetToDefault = () => {
    applyTheme('modern-minimal');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Preview Mode */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-slate-900">Form Designer</h4>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Pro
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={generateRandomTheme}>
              <Sparkles className="w-3 w-3 mr-1" />
              Random
            </Button>
            <Button size="sm" variant="outline" onClick={resetToDefault}>
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('mobile')}
              className="w-9 h-9 p-0"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === 'tablet' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('tablet')}
              className="w-9 h-9 p-0"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('desktop')}
              className="w-9 h-9 p-0"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-blue-600"
            />
            <Moon className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-4 border-b border-slate-200 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 h-10">
            <TabsTrigger value="themes" className="text-xs data-[state=active]:bg-white">
              <Sparkles className="h-3 w-3 mr-1" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs data-[state=active]:bg-white">
              <Palette className="h-3 w-3 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="text-xs data-[state=active]:bg-white">
              <Type className="h-3 w-3 mr-1" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs data-[state=active]:bg-white">
              <Layout className="h-3 w-3 mr-1" />
              Layout
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Enhanced Themes Tab */}
          <TabsContent value="themes" className="p-4 space-y-4 mt-0 h-full">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-slate-900 mb-2">Professional Themes</h3>
              <p className="text-slate-600 text-sm">Choose from our collection of modern themes</p>
            </div>

            {/* Popular Themes */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-500" />
                <h4 className="font-medium text-slate-800">Popular</h4>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {PRESET_THEMES.filter(theme => theme.popular).map((theme) => (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer overflow-hidden transition-all duration-200 ${
                      selectedTheme === theme.id 
                        ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50' 
                        : 'hover:shadow-md hover:scale-[1.01] border-gray-200'
                    }`}
                    onClick={() => applyTheme(theme.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                          style={{ background: theme.preview }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-slate-900 text-sm">{theme.name}</h4>
                            {selectedTheme === theme.id && (
                              <div className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                <Check className="w-3 h-3" />
                                Active
                              </div>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1 capitalize">
                            {theme.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Themes */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">All Themes</h4>
              <div className="grid grid-cols-2 gap-3">
                {PRESET_THEMES.map((theme) => (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer overflow-hidden transition-all duration-200 ${
                      selectedTheme === theme.id 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'hover:shadow-md hover:scale-[1.02]'
                    }`}
                    onClick={() => applyTheme(theme.id)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div 
                        className="absolute inset-0"
                        style={{ background: theme.preview }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Theme Preview */}
                      <div className="absolute inset-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                        <div className="space-y-1">
                          <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-1 bg-slate-300 rounded w-1/2"></div>
                          <div 
                            className="h-4 rounded shadow-sm"
                            style={{ backgroundColor: theme.colors.primary }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <Badge 
                        className="absolute top-2 right-2 text-xs capitalize bg-white/90 text-gray-700"
                        variant="secondary"
                      >
                        {theme.category}
                      </Badge>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-900 text-sm">{theme.name}</h4>
                        {selectedTheme === theme.id && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Colors Tab */}
          <TabsContent value="colors" className="p-4 space-y-6 mt-0 h-full">
            {/* Color Palettes */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-3 block">Color Palettes</Label>
              <div className="space-y-3">
                {COLOR_PALETTES.map((palette, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-16">{palette.name}</span>
                    <div className="flex gap-1 flex-1">
                      {palette.colors.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          className="w-8 h-8 rounded-lg border-2 border-white shadow-sm transition-all duration-200 hover:scale-110 hover:border-slate-300"
                          style={{ backgroundColor: color }}
                          onClick={() => handleStyleUpdate('canvasStyles', 'primaryColor', color)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Custom Color Picker */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-3 block">Custom Colors</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-600">Primary Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'primaryColor', e.target.value)}
                      className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <Input
                      value={formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'primaryColor', e.target.value)}
                      className="flex-1 text-xs font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-slate-600">Secondary Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={formConfig.settings.canvasStyles?.secondaryColor || '#64748b'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'secondaryColor', e.target.value)}
                      className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <Input
                      value={formConfig.settings.canvasStyles?.secondaryColor || '#64748b'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'secondaryColor', e.target.value)}
                      className="flex-1 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Background Settings */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Page Background</Label>
                <Input
                  value={formConfig.settings.canvasStyles?.backgroundColor || ''}
                  onChange={(e) => handleStyleUpdate('canvasStyles', 'backgroundColor', e.target.value)}
                  className="mt-2"
                  placeholder="Enter color, gradient, or CSS background"
                />
                <p className="text-xs text-slate-500 mt-1">Use hex colors, gradients, or CSS background properties</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Form Background</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleUpdate('canvasStyles', 'formBackgroundColor', e.target.value)}
                    className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <Input
                    value={formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleUpdate('canvasStyles', 'formBackgroundColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Text Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={formConfig.settings.canvasStyles?.fontColor || '#000000'}
                    onChange={(e) => handleStyleUpdate('canvasStyles', 'fontColor', e.target.value)}
                    className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <Input
                    value={formConfig.settings.canvasStyles?.fontColor || '#000000'}
                    onChange={(e) => handleStyleUpdate('canvasStyles', 'fontColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Typography Tab */}
          <TabsContent value="typography" className="p-4 space-y-6 mt-0 h-full">
            <div>
              <Label className="text-sm font-medium text-slate-700">Font Family</Label>
              <Select 
                value={formConfig.settings.canvasStyles?.fontFamily || 'Inter'}
                onValueChange={(value) => handleStyleUpdate('canvasStyles', 'fontFamily', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {FONT_FAMILIES.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between w-full">
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {font.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700 mb-3 block">
                Font Size: {formConfig.settings.canvasStyles?.fontSize || 16}px
              </Label>
              <Slider
                value={[formConfig.settings.canvasStyles?.fontSize || 16]}
                onValueChange={(value) => handleStyleUpdate('canvasStyles', 'fontSize', value[0])}
                min={12}
                max={28}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>12px</span>
                <span>28px</span>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium text-slate-700 mb-3 block">
                Form Width: {formConfig.settings.canvasStyles?.formWidth || 752}px
              </Label>
              <Slider
                value={[formConfig.settings.canvasStyles?.formWidth || 752]}
                onValueChange={(value) => handleStyleUpdate('canvasStyles', 'formWidth', value[0])}
                min={320}
                max={1200}
                step={10}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>320px</span>
                <span>1200px</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Padding</Label>
                <Input
                  value={formConfig.settings.canvasStyles?.padding || '32px'}
                  onChange={(e) => handleStyleUpdate('canvasStyles', 'padding', e.target.value)}
                  className="mt-2"
                  placeholder="32px"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Border Radius</Label>
                <Input
                  value={formConfig.settings.canvasStyles?.borderRadius || '16px'}
                  onChange={(e) => handleStyleUpdate('canvasStyles', 'borderRadius', e.target.value)}
                  className="mt-2"
                  placeholder="16px"
                />
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Layout Tab */}
          <TabsContent value="layout" className="p-4 space-y-6 mt-0 h-full">
            <div>
              <Label className="text-sm font-medium text-slate-700">Form Width Mode</Label>
              <Select 
                value={typeof formConfig.settings.preview?.width === 'number' ? formConfig.settings.preview.width.toString() : (formConfig.settings.preview?.width || 'Full')}
                onValueChange={(value) => {
                  const widthValue = value === 'Full' ? 'Full' : parseInt(value);
                  handleStyleUpdate('preview', 'width', widthValue);
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="400">Small (400px)</SelectItem>
                  <SelectItem value="600">Medium (600px)</SelectItem>
                  <SelectItem value="800">Large (800px)</SelectItem>
                  <SelectItem value="1000">Extra Large (1000px)</SelectItem>
                  <SelectItem value="Full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-slate-700">Responsive Design</Label>
                <p className="text-xs text-slate-500">Enable responsive breakpoints</p>
              </div>
              <Switch
                checked={formConfig.settings.preview?.nesting || false}
                onCheckedChange={(checked) => handleStyleUpdate('preview', 'nesting', checked)}
              />
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium text-slate-700">Label Alignment</Label>
              <Select 
                value={formConfig.settings.layout?.labelAlignment || 'top'}
                onValueChange={(value) => handleStyleUpdate('layout', 'labelAlignment', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700 mb-3 block">
                Question Spacing: {formConfig.settings.layout?.questionSpacing || 12}px
              </Label>
              <Slider
                value={[formConfig.settings.layout?.questionSpacing || 12]}
                onValueChange={(value) => handleStyleUpdate('layout', 'questionSpacing', value[0])}
                min={0}
                max={48}
                step={4}
                className="mt-2"
              />
            </div>

            {formConfig.settings.layout?.labelAlignment === 'left' && (
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-3 block">
                  Label Width: {formConfig.settings.layout?.labelWidth || 230}px
                </Label>
                <Slider
                  value={[formConfig.settings.layout?.labelWidth || 230]}
                  onValueChange={(value) => handleStyleUpdate('layout', 'labelWidth', value[0])}
                  min={100}
                  max={400}
                  step={10}
                  className="mt-2"
                />
              </div>
            )}

            <Separator />

            <div>
              <Label className="text-sm font-medium text-slate-700">Custom CSS</Label>
              <Textarea
                value={formConfig.settings.canvasStyles?.customCSS || ''}
                onChange={(e) => handleStyleUpdate('canvasStyles', 'customCSS', e.target.value)}
                className="mt-2 font-mono text-sm"
                placeholder="/* Add your custom CSS here */
.form-container {
  /* Custom styles */
}

.form-input {
  /* Input styles */
}"
                rows={8}
              />
              <p className="text-xs text-slate-500 mt-1">Add custom CSS to override default styles</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FormDesigner;
