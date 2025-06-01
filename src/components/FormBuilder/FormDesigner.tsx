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
  Zap, Layers, Grid, AlignLeft, RotateCcw, Copy, Wand2, Star, Heart, Save
} from 'lucide-react';
import { FormConfig } from './types';
import { useToast } from '@/hooks/use-toast';

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
  const [backgroundImage, setBackgroundImage] = useState('');
  const { toast } = useToast();

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
      
      toast({
        title: "Theme Applied",
        description: `${selectedThemeData.name} theme has been applied successfully.`,
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setBackgroundImage(imageUrl);
        handleStyleUpdate('backgroundImage', imageUrl);
        toast({
          title: "Background Image Added",
          description: "Your background image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveTheme = () => {
    const currentTheme = {
      id: `custom-${Date.now()}`,
      name: `Custom Theme ${new Date().toLocaleDateString()}`,
      preview: formConfig.settings.canvasStyles?.backgroundColor || '#f8fafc',
      colors: {
        primary: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6',
        secondary: formConfig.settings.canvasStyles?.secondaryColor || '#64748b',
        background: formConfig.settings.canvasStyles?.backgroundColor || '#ffffff',
        form: formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff',
        text: formConfig.settings.canvasStyles?.fontColor || '#000000'
      },
      gradient: formConfig.settings.canvasStyles?.backgroundColor || '#f8fafc',
      category: 'custom'
    };

    const savedThemes = JSON.parse(localStorage.getItem('formBuilder_savedThemes') || '[]');
    savedThemes.push(currentTheme);
    localStorage.setItem('formBuilder_savedThemes', JSON.stringify(savedThemes));

    toast({
      title: "Theme Saved",
      description: "Your custom theme has been saved to your browser.",
    });
  };

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Form Designer Studio
            </h4>
            <p className="text-sm text-gray-600">Create stunning form designs with professional themes</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              v3.0 Pro
            </Badge>
            <Badge variant="outline">
              {Object.keys(PRESET_THEMES).length} Themes Available
            </Badge>
          </div>
          
          <Button onClick={saveTheme} className="bg-gradient-to-r from-purple-500 to-blue-500">
            <Save className="w-4 h-4 mr-2" />
            Save Theme
          </Button>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 pt-4 border-b border-slate-200 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 h-12">
            <TabsTrigger value="themes" className="text-sm data-[state=active]:bg-white">
              <Sparkles className="h-4 w-4 mr-2" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-sm data-[state=active]:bg-white">
              <Palette className="h-4 w-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="text-sm data-[state=active]:bg-white">
              <Type className="h-4 w-4 mr-2" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="background" className="text-sm data-[state=active]:bg-white">
              <ImageIcon className="h-4 w-4 mr-2" />
              Background
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="themes" className="p-6 space-y-6 mt-0 h-full">
            {/* Popular Themes */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Popular Themes
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {PRESET_THEMES.filter(theme => theme.popular).map((theme) => (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer overflow-hidden transition-all duration-300 ${
                      selectedTheme === theme.id 
                        ? 'ring-2 ring-purple-500 shadow-lg scale-105' 
                        : 'hover:shadow-md hover:scale-102'
                    }`}
                    onClick={() => applyTheme(theme.id)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div 
                        className="absolute inset-0"
                        style={{ background: theme.preview }}
                      />
                      <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <div className="space-y-2">
                          <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-1.5 bg-slate-300 rounded w-1/2"></div>
                          <div 
                            className="h-6 rounded shadow-sm"
                            style={{ backgroundColor: theme.colors.primary }}
                          ></div>
                        </div>
                      </div>
                      
                      {selectedTheme === theme.id && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white p-1 rounded-full">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-medium text-slate-900">{theme.name}</h4>
                      <Badge variant="outline" className="mt-2 text-xs capitalize">
                        {theme.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="p-6 space-y-6 mt-0 h-full">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}
                    onChange={(e) => handleStyleUpdate('primaryColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-white shadow-lg cursor-pointer"
                  />
                  <Input
                    value={formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}
                    onChange={(e) => handleStyleUpdate('primaryColor', e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-3 block">Form Background</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleUpdate('formBackgroundColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-white shadow-lg cursor-pointer"
                  />
                  <Input
                    value={formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleUpdate('formBackgroundColor', e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-3 block">Canvas Background</Label>
              <Textarea
                value={formConfig.settings.canvasStyles?.backgroundColor || ''}
                onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                placeholder="Enter CSS background (color, gradient, etc.)"
                className="font-mono"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">Examples: #ffffff, linear-gradient(135deg, #667eea 0%, #764ba2 100%)</p>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="p-6 space-y-6 mt-0 h-full">
            <div>
              <Label className="text-sm font-medium mb-3 block">Font Family</Label>
              <Select 
                value={formConfig.settings.canvasStyles?.fontFamily || 'Inter'}
                onValueChange={(value) => handleStyleUpdate('fontFamily', value)}
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
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">
                Font Size: {formConfig.settings.canvasStyles?.fontSize || 16}px
              </Label>
              <Slider
                value={[formConfig.settings.canvasStyles?.fontSize || 16]}
                onValueChange={(value) => handleStyleUpdate('fontSize', value[0])}
                min={12}
                max={28}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">
                Form Width: {formConfig.settings.canvasStyles?.formWidth || 752}px
              </Label>
              <Slider
                value={[formConfig.settings.canvasStyles?.formWidth || 752]}
                onValueChange={(value) => handleStyleUpdate('formWidth', value[0])}
                min={320}
                max={1200}
                step={10}
                className="mt-2"
              />
            </div>
          </TabsContent>

          <TabsContent value="background" className="p-6 space-y-6 mt-0 h-full">
            <div>
              <Label className="text-sm font-medium mb-3 block">Background Image</Label>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
                {(backgroundImage || formConfig.settings.canvasStyles?.backgroundImage) && (
                  <div className="relative">
                    <img 
                      src={backgroundImage || formConfig.settings.canvasStyles?.backgroundImage} 
                      alt="Background preview" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setBackgroundImage('');
                        handleStyleUpdate('backgroundImage', '');
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Border Radius</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[parseInt(formConfig.settings.canvasStyles?.borderRadius?.replace('px', '') || '12')]}
                  onValueChange={(value) => handleStyleUpdate('borderRadius', `${value[0]}px`)}
                  max={50}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 min-w-[60px]">
                  {formConfig.settings.canvasStyles?.borderRadius || '12px'}
                </span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Padding</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[parseInt(formConfig.settings.canvasStyles?.padding?.replace('px', '') || '32')]}
                  onValueChange={(value) => handleStyleUpdate('padding', `${value[0]}px`)}
                  max={80}
                  min={8}
                  step={4}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 min-w-[60px]">
                  {formConfig.settings.canvasStyles?.padding || '32px'}
                </span>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FormDesigner;
