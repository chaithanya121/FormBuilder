
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { X, Upload, Palette, Type, Layout, Paintbrush } from 'lucide-react';
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
  '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#64748b', '#ec4899', '#0ea5e9'
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
        className={`w-[800px] h-[700px] ${themeClasses.card} rounded-2xl border-2 shadow-2xl overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Paintbrush className="h-5 w-5 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${themeClasses.text}`}>Form Designer</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className={`${themeClasses.card} p-1 rounded-xl border grid grid-cols-4 w-full`}>
              <TabsTrigger value="colors" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                COLORS
              </TabsTrigger>
              <TabsTrigger value="styles" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                STYLES
              </TabsTrigger>
              <TabsTrigger value="themes" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                THEMES
              </TabsTrigger>
              <TabsTrigger value="layout" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                LAYOUT
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6 mt-0">
              <div className="grid grid-cols-8 gap-2 mb-6">
                {COLOR_PRESETS.map((color, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-lg border-2 border-white shadow-lg hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => handleStyleUpdate('canvasStyles', 'primaryColor', color)}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Page Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'backgroundColor', e.target.value)}
                      className="flex-1"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.backgroundColor || '#ffffff' }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Page Image</Label>
                  <div className="space-y-2">
                    <div className="w-full h-24 bg-gray-200 rounded border flex items-center justify-center">
                      {formConfig.settings.canvasStyles?.backgroundImage ? (
                        <img 
                          src={formConfig.settings.canvasStyles.backgroundImage} 
                          alt="Background" 
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Input
                      placeholder="Enter image URL"
                      value={formConfig.settings.canvasStyles?.backgroundImage || ''}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'backgroundImage', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Form Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'formBackgroundColor', e.target.value)}
                      className="flex-1"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff' }}
                    />
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Change form background color</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Form Image</Label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    CHOOSE A FILE
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Font Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.fontColor || '#000000'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'fontColor', e.target.value)}
                      className="flex-1"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.fontColor || '#000000' }}
                    />
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Change font color</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Input Background</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={formConfig.settings.canvasStyles?.inputBackground || '#ffffff'}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'inputBackground', e.target.value)}
                      className="flex-1"
                    />
                    <div 
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: formConfig.settings.canvasStyles?.inputBackground || '#ffffff' }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  ADVANCED DESIGNER
                </Button>
              </div>
            </TabsContent>

            {/* Styles Tab */}
            <TabsContent value="styles" className="space-y-6 mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Form Width</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.canvasStyles?.formWidth || 752}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'formWidth', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">PX</span>
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Resize form width</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Label Alignment</Label>
                  <Select 
                    value={formConfig.settings.layout?.labelAlignment || 'top'}
                    onValueChange={(value) => handleStyleUpdate('layout', 'labelAlignment', value)}
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
                  <p className={`text-sm ${themeClasses.textMuted}`}>Align questions and answers</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Question Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.layout?.questionSpacing || 12}
                      onChange={(e) => handleStyleUpdate('layout', 'questionSpacing', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">PX</span>
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Distance between questions</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Label Width</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.layout?.labelWidth || 230}
                      onChange={(e) => handleStyleUpdate('layout', 'labelWidth', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">PX</span>
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Resize label width</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Font</Label>
                  <Select 
                    value={formConfig.settings.canvasStyles?.fontFamily || 'Inter'}
                    onValueChange={(value) => handleStyleUpdate('canvasStyles', 'fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Change font style</p>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formConfig.settings.canvasStyles?.fontSize || 16}
                      onChange={(e) => handleStyleUpdate('canvasStyles', 'fontSize', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">PX</span>
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>Change font size</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Button Style</Label>
                  <Button variant="outline" className="w-full">
                    <Palette className="h-4 w-4 mr-2" />
                    CHOOSE STYLE
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Inject Custom CSS</Label>
                  <div className="bg-gray-900 rounded-lg p-4 h-32">
                    <div className="text-green-400 text-sm font-mono">1</div>
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>
                    Add custom CSS codes to your form. CSS codes let you customize every aspect of your form design.
                    <a href="#" className="text-blue-500 hover:underline ml-1">Learn more.</a>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  ADVANCED DESIGNER
                </Button>
              </div>
            </TabsContent>

            {/* Themes Tab */}
            <TabsContent value="themes" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className={`${themeClasses.text} font-semibold`}>Featured Themes</Label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESET_THEMES.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {PRESET_THEMES.map((theme) => (
                    <Card
                      key={theme.id}
                      className={`relative cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 ${
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
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                        <h4 className="font-medium text-sm">{theme.name}</h4>
                      </div>
                      {selectedTheme === theme.id && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Current Theme
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6 mt-0">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Form Layout</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card 
                      className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        formConfig.settings.layout?.type === 'classic' ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleStyleUpdate('layout', 'type', 'classic')}
                    >
                      <div className="space-y-3">
                        <div className="w-full h-20 bg-blue-500 rounded flex items-center justify-center">
                          <div className="w-16 h-12 bg-white rounded"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold">Classic Form</h4>
                          <p className="text-sm text-gray-500">All questions on one page</p>
                        </div>
                      </div>
                    </Card>

                    <Card 
                      className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        formConfig.settings.layout?.type === 'card' ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleStyleUpdate('layout', 'type', 'card')}
                    >
                      <div className="space-y-3">
                        <div className="w-full h-20 bg-gray-300 rounded flex items-center justify-center">
                          <div className="w-16 h-12 bg-white rounded shadow border-b-4 border-green-500"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold">Card Form</h4>
                          <p className="text-sm text-gray-500">Single question per page</p>
                        </div>
                      </div>
                    </Card>
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
