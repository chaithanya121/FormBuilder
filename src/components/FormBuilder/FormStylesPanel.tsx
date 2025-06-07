
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Type, Layout, Sparkles, Eye, RotateCcw,
  Brush, Zap, Layers, Grid, Image, Droplets
} from 'lucide-react';
import { FormConfig } from './types';
import { motion } from 'framer-motion';

interface FormStylesPanelProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
  onClose: () => void;
}

const FormStylesPanel: React.FC<FormStylesPanelProps> = ({
  formConfig,
  onUpdate,
  onClose
}) => {
  const canvasStyles = formConfig.settings?.canvasStyles || {};

  const updateCanvasStyle = useCallback((key: string, value: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...canvasStyles,
          [key]: value
        }
      }
    });
  }, [formConfig, canvasStyles, onUpdate]);

  const presetThemes = [
    {
      name: 'Ocean Breeze',
      primaryColor: '#0EA5E9',
      secondaryColor: '#0284C7',
      backgroundColor: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)',
      formBackgroundColor: '#ffffff',
      fontColor: '#1f2937',
      fontFamily: 'Inter'
    },
    {
      name: 'Sunset Vibes',
      primaryColor: '#F97316',
      secondaryColor: '#EA580C',
      backgroundColor: 'linear-gradient(135deg, #FED7AA 0%, #FB923C 50%, #EA580C 100%)',
      formBackgroundColor: '#ffffff',
      fontColor: '#1f2937',
      fontFamily: 'Poppins'
    },
    {
      name: 'Forest Calm',
      primaryColor: '#16A34A',
      secondaryColor: '#15803D',
      backgroundColor: 'linear-gradient(135deg, #BBF7D0 0%, #4ADE80 50%, #16A34A 100%)',
      formBackgroundColor: '#ffffff',
      fontColor: '#1f2937',
      fontFamily: 'Roboto'
    },
    {
      name: 'Purple Dream',
      primaryColor: '#9333EA',
      secondaryColor: '#7C3AED',
      backgroundColor: 'linear-gradient(135deg, #DDD6FE 0%, #A855F7 50%, #7C3AED 100%)',
      formBackgroundColor: '#ffffff',
      fontColor: '#1f2937',
      fontFamily: 'Montserrat'
    },
    {
      name: 'Dark Mode',
      primaryColor: '#06B6D4',
      secondaryColor: '#0891B2',
      backgroundColor: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%)',
      formBackgroundColor: '#374151',
      fontColor: '#F9FAFB',
      fontFamily: 'Inter'
    },
    {
      name: 'Rose Gold',
      primaryColor: '#EC4899',
      secondaryColor: '#DB2777',
      backgroundColor: 'linear-gradient(135deg, #FCE7F3 0%, #F472B6 50%, #EC4899 100%)',
      formBackgroundColor: '#ffffff',
      fontColor: '#1f2937',
      fontFamily: 'Lato'
    }
  ];

  const fontFamilies = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 
    'Poppins', 'Source Sans Pro', 'Arial', 'Helvetica', 'Georgia',
    'Times New Roman', 'Playfair Display', 'Dancing Script'
  ];

  const backgroundPatterns = [
    { name: 'None', value: 'none', css: '' },
    { name: 'Dots', value: 'dots', css: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)' },
    { name: 'Grid', value: 'grid', css: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)' },
    { name: 'Diagonal Lines', value: 'diagonal-lines', css: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)' },
    { name: 'Waves', value: 'waves', css: 'radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 50%)' },
    { name: 'Geometric', value: 'geometric', css: 'polygon(50% 0%, 0% 100%, 100% 100%)' }
  ];

  const applyPresetTheme = useCallback((theme: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...canvasStyles,
          ...theme
        }
      }
    });
  }, [formConfig, canvasStyles, onUpdate]);

  const applyBackgroundPattern = useCallback((pattern: any) => {
    const backgroundImage = pattern.value === 'none' ? '' : pattern.css;
    updateCanvasStyle('backgroundImage', backgroundImage);
    updateCanvasStyle('backgroundPattern', pattern.value);
  }, [updateCanvasStyle]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col bg-white border-l border-gray-200"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Form Designer</h3>
              <p className="text-sm text-gray-600">Customize your form's appearance</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="themes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="themes" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="text-xs">
              <Type className="h-3 w-3 mr-1" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              <Layout className="h-3 w-3 mr-1" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="themes" className="space-y-6">
            {/* Modern Preset Themes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Brush className="h-4 w-4" />
                  Modern Preset Themes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {presetThemes.map((theme, index) => (
                    <motion.div 
                      key={index} 
                      className="group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-300 cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-lg border-2 border-white shadow-md relative overflow-hidden"
                            style={{ background: theme.backgroundColor }}
                          >
                            <div className="absolute inset-2 bg-white rounded opacity-90"></div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{theme.name}</h4>
                            <p className="text-xs text-gray-500">{theme.fontFamily}</p>
                            <div className="flex gap-1 mt-1">
                              <div 
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: theme.primaryColor }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: theme.secondaryColor }}
                              />
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => applyPresetTheme(theme)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-500 to-purple-600"
                        >
                          Apply
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Background Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  Background Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {backgroundPatterns.map((pattern, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className={`h-20 w-full flex flex-col items-center gap-2 relative overflow-hidden ${
                          canvasStyles.backgroundPattern === pattern.value ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => applyBackgroundPattern(pattern)}
                      >
                        <div 
                          className="w-8 h-8 bg-gray-100 rounded border"
                          style={{ 
                            backgroundImage: pattern.css,
                            backgroundSize: pattern.value === 'dots' ? '20px 20px' : pattern.value === 'grid' ? '20px 20px' : 'cover'
                          }}
                        />
                        <span className="text-xs font-medium">{pattern.name}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            {/* Enhanced Background Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Background & Form Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bg-color">Canvas Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bg-color"
                      value={canvasStyles.backgroundColor || ''}
                      onChange={(e) => updateCanvasStyle('backgroundColor', e.target.value)}
                      placeholder="Enter gradient or color"
                    />
                    <Input
                      type="color"
                      value="#667eea"
                      onChange={(e) => updateCanvasStyle('backgroundColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-bg">Form Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="form-bg"
                      value={canvasStyles.formBackgroundColor || '#ffffff'}
                      onChange={(e) => updateCanvasStyle('formBackgroundColor', e.target.value)}
                    />
                    <Input
                      type="color"
                      value={canvasStyles.formBackgroundColor || '#ffffff'}
                      onChange={(e) => updateCanvasStyle('formBackgroundColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      value={canvasStyles.primaryColor || '#3b82f6'}
                      onChange={(e) => updateCanvasStyle('primaryColor', e.target.value)}
                    />
                    <Input
                      type="color"
                      value={canvasStyles.primaryColor || '#3b82f6'}
                      onChange={(e) => updateCanvasStyle('primaryColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      value={canvasStyles.secondaryColor || '#8b5cf6'}
                      onChange={(e) => updateCanvasStyle('secondaryColor', e.target.value)}
                    />
                    <Input
                      type="color"
                      value={canvasStyles.secondaryColor || '#8b5cf6'}
                      onChange={(e) => updateCanvasStyle('secondaryColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-color">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="font-color"
                      value={canvasStyles.fontColor || '#1f2937'}
                      onChange={(e) => updateCanvasStyle('fontColor', e.target.value)}
                    />
                    <Input
                      type="color"
                      value={canvasStyles.fontColor || '#1f2937'}
                      onChange={(e) => updateCanvasStyle('fontColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Font Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={canvasStyles.fontFamily || 'Inter'}
                    onValueChange={(value) => updateCanvasStyle('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[canvasStyles.fontSize || 16]}
                      onValueChange={(value) => updateCanvasStyle('fontSize', value[0])}
                      max={32}
                      min={12}
                      step={1}
                      className="flex-1"
                    />
                    <div className="text-sm text-gray-600 w-12">
                      {canvasStyles.fontSize || 16}px
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Form Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Border Radius</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[parseInt(canvasStyles.borderRadius?.replace('px', '') || '12')]}
                      onValueChange={(value) => updateCanvasStyle('borderRadius', `${value[0]}px`)}
                      max={50}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                    <div className="text-sm text-gray-600 w-12">
                      {canvasStyles.borderRadius || '12px'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Padding</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[parseInt(canvasStyles.padding?.replace('px', '') || '32')]}
                      onValueChange={(value) => updateCanvasStyle('padding', `${value[0]}px`)}
                      max={80}
                      min={16}
                      step={4}
                      className="flex-1"
                    />
                    <div className="text-sm text-gray-600 w-12">
                      {canvasStyles.padding || '32px'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Custom CSS */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Custom CSS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter custom CSS..."
                  value={canvasStyles.customCSS || ''}
                  onChange={(e) => updateCanvasStyle('customCSS', e.target.value)}
                  className="font-mono text-sm"
                  rows={6}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              onUpdate({
                ...formConfig,
                settings: {
                  ...formConfig.settings,
                  canvasStyles: {
                    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    formBackgroundColor: "#ffffff",
                    fontColor: "#1f2937",
                    primaryColor: "#3b82f6",
                    secondaryColor: "#8b5cf6",
                    fontFamily: "Inter",
                    fontSize: 16,
                    formWidth: 752,
                    borderRadius: "12px",
                    padding: "32px"
                  }
                }
              });
            }}
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button className="flex-1" onClick={onClose}>
            <Eye className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FormStylesPanel;
