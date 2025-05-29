
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Palette, Type, Layout, Paintbrush, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnhancedTheme } from '@/components/ui/enhanced-theme';
import { FormConfig } from './types';

interface FormDesignerProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const PRESET_THEMES = [
  {
    id: 'default',
    name: 'Default Theme',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      background: '#ffffff',
      form: '#f8fafc'
    }
  },
  {
    id: 'simplicity',
    name: 'Simplicity',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      background: '#ffffff',
      form: '#ffffff'
    }
  },
  {
    id: 'clever-colorful',
    name: 'Clever Colorful',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    colors: {
      primary: '#10b981',
      secondary: '#3b82f6',
      background: '#0f172a',
      form: '#1e293b'
    }
  },
  {
    id: 'sunset-hair',
    name: 'Sunset Hair',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    colors: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      background: '#1f2937',
      form: '#374151'
    }
  },
  {
    id: 'vintage-star',
    name: 'Vintage Star',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
    colors: {
      primary: '#8b5cf6',
      secondary: '#64748b',
      background: '#f8fafc',
      form: '#ffffff'
    }
  },
  {
    id: 'brick-wall',
    name: 'Brick Wall',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    colors: {
      primary: '#dc2626',
      secondary: '#92400e',
      background: '#7c2d12',
      form: '#a16207'
    }
  },
  {
    id: 'techy',
    name: 'Techy',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
    colors: {
      primary: '#06b6d4',
      secondary: '#64748b',
      background: '#f1f5f9',
      form: '#ffffff'
    }
  },
  {
    id: 'cool-minimal',
    name: 'Cool and Minimal',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      background: '#e0f2fe',
      form: '#ffffff'
    }
  }
];

const COLOR_PRESETS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', 
  '#ef4444', '#10b981', '#06b6d4', '#64748b'
];

const FormDesigner: React.FC<FormDesignerProps> = ({ isOpen, onClose, formConfig, onUpdate }) => {
  const { theme, themeClasses } = useEnhancedTheme();
  const [activeTab, setActiveTab] = useState('colors');
  const [selectedTheme, setSelectedTheme] = useState('default');

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
            backgroundColor: selectedThemeData.colors.background,
            formBackgroundColor: selectedThemeData.colors.form,
            primaryColor: selectedThemeData.colors.primary,
            secondaryColor: selectedThemeData.colors.secondary
          }
        }
      };
      onUpdate(updatedConfig);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-[900px] h-[750px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
      >
        {/* Header with Gradient */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Paintbrush className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Form Designer</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="bg-slate-800 border border-slate-700 p-1 rounded-xl grid grid-cols-4 w-full">
              <TabsTrigger 
                value="colors" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg text-slate-300 font-medium"
              >
                COLORS
              </TabsTrigger>
              <TabsTrigger 
                value="styles" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg text-slate-300 font-medium"
              >
                STYLES
              </TabsTrigger>
              <TabsTrigger 
                value="themes" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg text-slate-300 font-medium"
              >
                THEMES
              </TabsTrigger>
              <TabsTrigger 
                value="layout" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg text-slate-300 font-medium"
              >
                LAYOUT
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6 mt-0">
              <div className="grid grid-cols-8 gap-3 mb-6">
                {COLOR_PRESETS.map((color, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl border-2 border-slate-600 shadow-lg transition-all duration-200 hover:shadow-xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    }}
                    onClick={() => handleStyleUpdate('canvasStyles', 'primaryColor', color)}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Page Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.backgroundColor || '#5a4b44'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'backgroundColor', e.target.value)}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                      placeholder="#5a4b44"
                    />
                    <div 
                      className="w-12 h-10 rounded-lg border border-slate-600"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.backgroundColor || '#5a4b44' }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Page Image</Label>
                  <div className="space-y-2">
                    <div className="w-full h-24 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center overflow-hidden">
                      {formConfig.settings.canvasStyles?.backgroundImage ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={formConfig.settings.canvasStyles.backgroundImage} 
                            alt="Background" 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleStyleUpdate('canvasStyles', 'backgroundImage', '')}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <Upload className="h-8 w-8 text-slate-400" />
                      )}
                    </div>
                    <Input
                      placeholder="Enter image URL"
                      value={formConfig.settings.canvasStyles?.backgroundImage || ''}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'backgroundImage', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                    {formConfig.settings.canvasStyles?.backgroundImage && (
                      <p className="text-orange-400 text-xs">jobapp.530.jpg - Remove Image</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Form Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.formBackgroundColor || '#efe8d4'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'formBackgroundColor', e.target.value)}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                      placeholder="#efe8d4"
                    />
                    <div 
                      className="w-12 h-10 rounded-lg border border-slate-600"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.formBackgroundColor || '#efe8d4' }}
                    />
                  </div>
                  <p className="text-sm text-slate-400">Change form background color</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Form Image</Label>
                  <Button variant="outline" className="w-full bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700">
                    <Upload className="h-4 w-4 mr-2" />
                    CHOOSE A FILE
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Font Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.fontColor || '#321f16'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'fontColor', e.target.value)}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                      placeholder="#321f16"
                    />
                    <div 
                      className="w-12 h-10 rounded-lg border border-slate-600"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.fontColor || '#321f16' }}
                    />
                  </div>
                  <p className="text-sm text-slate-400">Change font color</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Input Background</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.inputBackground || '#ffffff'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'inputBackground', e.target.value)}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                      placeholder="#ffffff"
                    />
                    <div 
                      className="w-12 h-10 rounded-lg border border-slate-600"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.inputBackground || '#ffffff' }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl">
                  ADVANCED DESIGNER
                </Button>
              </div>
            </TabsContent>

            {/* Styles Tab */}
            <TabsContent value="styles" className="space-y-6 mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Form Width</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.canvasStyles?.formWidth || 752}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'formWidth', parseInt(e.target.value))}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                    />
                    <span className="text-slate-400 text-sm font-medium px-2">PX</span>
                  </div>
                  <p className="text-sm text-slate-400">Resize form width</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Label Alignment</Label>
                  <Select 
                    value={formConfig.settings.layout?.labelAlignment || 'top'}
                    onValueChange={(value) => handleStyleUpdate('layout', 'labelAlignment', value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="top" className="text-white">Top</SelectItem>
                      <SelectItem value="left" className="text-white">Left</SelectItem>
                      <SelectItem value="right" className="text-white">Right</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-400">Align questions and answers</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Question Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.layout?.questionSpacing || 12}
                      onChange={(e) => handleStyleUpdate('layout', 'questionSpacing', parseInt(e.target.value))}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                    />
                    <span className="text-slate-400 text-sm font-medium px-2">PX</span>
                  </div>
                  <p className="text-sm text-slate-400">Distance between questions</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Label Width</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.layout?.labelWidth || 230}
                      onChange={(e) => handleStyleUpdate('layout', 'labelWidth', parseInt(e.target.value))}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                    />
                    <span className="text-slate-400 text-sm font-medium px-2">PX</span>
                  </div>
                  <p className="text-sm text-slate-400">Resize label width</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Font</Label>
                  <Select 
                    value={formConfig.settings.canvasStyles?.fontFamily || 'Inter'}
                    onValueChange={(value) => handleStyleUpdate('canvasStyles', 'fontFamily', value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="Inter" className="text-white">Inter</SelectItem>
                      <SelectItem value="Arial" className="text-white">Arial</SelectItem>
                      <SelectItem value="Helvetica" className="text-white">Helvetica</SelectItem>
                      <SelectItem value="Times New Roman" className="text-white">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-400">Change font style</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.canvasStyles?.fontSize || 16}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'fontSize', parseInt(e.target.value))}
                      className="flex-1 bg-slate-800 border-slate-600 text-white"
                    />
                    <span className="text-slate-400 text-sm font-medium px-2">PX</span>
                  </div>
                  <p className="text-sm text-slate-400">Change font size</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Button Style</Label>
                  <Button variant="outline" className="w-full bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700">
                    <Palette className="h-4 w-4 mr-2" />
                    CHOOSE STYLE
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Inject Custom CSS</Label>
                  <div className="bg-slate-900 rounded-lg border border-slate-700 h-32 relative">
                    <div className="absolute top-2 left-3 text-green-400 text-sm font-mono">1</div>
                    <Textarea
                      value={formConfig.settings.canvasStyles?.customCSS || ''}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'customCSS', e.target.value)}
                      placeholder="/* Add your custom CSS here */"
                      className="w-full h-full bg-transparent border-0 text-green-400 font-mono text-sm pl-8 pt-6 resize-none focus:ring-0"
                    />
                  </div>
                  <p className="text-sm text-slate-400">
                    Add custom CSS codes to your form. CSS codes let you customize every aspect of your form design.
                    <a href="#" className="text-blue-400 hover:underline ml-1">Learn more.</a>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl">
                  ADVANCED DESIGNER
                </Button>
              </div>
            </TabsContent>

            {/* Themes Tab */}
            <TabsContent value="themes" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-200 font-semibold">Featured Themes</Label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      {PRESET_THEMES.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id} className="text-white">
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {PRESET_THEMES.map((theme) => (
                    <motion.div
                      key={theme.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`relative cursor-pointer overflow-hidden transition-all duration-300 bg-slate-800 border-slate-600 ${
                          selectedTheme === theme.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => applyTheme(theme.id)}
                      >
                        <div className="aspect-video">
                          <img
                            src={theme.image}
                            alt={theme.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3">
                          <h4 className="font-medium text-sm">{theme.name}</h4>
                        </div>
                        {selectedTheme === theme.id && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            Current Theme
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6 mt-0">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200">Form Layout</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`p-6 cursor-pointer transition-all duration-300 bg-slate-800 border-slate-600 hover:bg-slate-700 ${
                          formConfig.settings.layout?.type === 'classic' ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleStyleUpdate('layout', 'type', 'classic')}
                      >
                        <div className="space-y-3">
                          <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                            <div className="w-16 h-12 bg-white rounded shadow"></div>
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold text-slate-200">Classic Form</h4>
                            <p className="text-sm text-slate-400">All questions on one page</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`p-6 cursor-pointer transition-all duration-300 bg-slate-800 border-slate-600 hover:bg-slate-700 ${
                          formConfig.settings.layout?.type === 'card' ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleStyleUpdate('layout', 'type', 'card')}
                      >
                        <div className="space-y-3">
                          <div className="w-full h-20 bg-slate-700 rounded flex items-center justify-center">
                            <div className="w-16 h-12 bg-white rounded shadow border-b-4 border-green-500"></div>
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold text-slate-200">Card Form</h4>
                            <p className="text-sm text-slate-400">Single question per page</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default FormDesigner;
