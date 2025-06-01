
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  Paintbrush, ArrowLeft, Pen, Palette, Type, Layout, 
  Sparkles, Code, Eye, Download, Upload, Save, 
  Layers, Grid, Zap, Moon, Sun, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StyleConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
  };
  layout: {
    borderRadius: number;
    spacing: number;
    maxWidth: number;
    padding: number;
    margin: number;
  };
  effects: {
    shadows: boolean;
    gradients: boolean;
    animations: boolean;
    blur: boolean;
    glass: boolean;
  };
  customCSS: string;
}

export const StyleEditor = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('colors');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b'
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0
    },
    layout: {
      borderRadius: 12,
      spacing: 16,
      maxWidth: 1200,
      padding: 24,
      margin: 16
    },
    effects: {
      shadows: true,
      gradients: true,
      animations: true,
      blur: false,
      glass: false
    },
    customCSS: ''
  });

  const fontFamilies = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 
    'Poppins', 'Source Sans Pro', 'Nunito', 'Raleway', 'Playfair Display'
  ];

  const fontWeights = ['300', '400', '500', '600', '700', '800'];

  const predefinedThemes = [
    {
      name: 'Ocean Blue',
      colors: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#3b82f6',
        background: '#ffffff',
        surface: '#f0f9ff',
        text: '#0c4a6e',
        textSecondary: '#0369a1'
      }
    },
    {
      name: 'Forest Green',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#34d399',
        background: '#ffffff',
        surface: '#f0fdf4',
        text: '#064e3b',
        textSecondary: '#047857'
      }
    },
    {
      name: 'Sunset Orange',
      colors: {
        primary: '#ea580c',
        secondary: '#f97316',
        accent: '#fb923c',
        background: '#ffffff',
        surface: '#fff7ed',
        text: '#9a3412',
        textSecondary: '#c2410c'
      }
    },
    {
      name: 'Purple Dream',
      colors: {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#a78bfa',
        background: '#ffffff',
        surface: '#faf5ff',
        text: '#581c87',
        textSecondary: '#7c2d92'
      }
    }
  ];

  const updateColors = (colorKey: keyof StyleConfig['colors'], value: string) => {
    setStyleConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }));
  };

  const updateTypography = (key: keyof StyleConfig['typography'], value: any) => {
    setStyleConfig(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value
      }
    }));
  };

  const updateLayout = (key: keyof StyleConfig['layout'], value: number) => {
    setStyleConfig(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        [key]: value
      }
    }));
  };

  const updateEffects = (key: keyof StyleConfig['effects'], value: boolean) => {
    setStyleConfig(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [key]: value
      }
    }));
  };

  const applyTheme = (themeColors: any) => {
    setStyleConfig(prev => ({
      ...prev,
      colors: themeColors
    }));
  };

  const exportStyles = () => {
    const cssOutput = generateCSS();
    const blob = new Blob([cssOutput], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'custom-styles.css';
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateCSS = () => {
    const { colors, typography, layout, effects } = styleConfig;
    
    let css = `:root {
  /* Colors */
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --background: ${colors.background};
  --surface: ${colors.surface};
  --text: ${colors.text};
  --text-secondary: ${colors.textSecondary};
  
  /* Typography */
  --font-family: ${typography.fontFamily}, sans-serif;
  --font-size: ${typography.fontSize}px;
  --font-weight: ${typography.fontWeight};
  --line-height: ${typography.lineHeight};
  --letter-spacing: ${typography.letterSpacing}px;
  
  /* Layout */
  --border-radius: ${layout.borderRadius}px;
  --spacing: ${layout.spacing}px;
  --max-width: ${layout.maxWidth}px;
  --padding: ${layout.padding}px;
  --margin: ${layout.margin}px;
}

/* Base Styles */
body {
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
  color: var(--text);
  background: var(--background);
}

/* Component Styles */
.btn-primary {
  background: var(--primary);
  color: white;
  border-radius: var(--border-radius);
  padding: var(--spacing);
  ${effects.shadows ? 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);' : ''}
  ${effects.animations ? 'transition: all 0.3s ease;' : ''}
}

.card {
  background: var(--surface);
  border-radius: var(--border-radius);
  padding: var(--padding);
  ${effects.shadows ? 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);' : ''}
  ${effects.glass ? 'backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.8);' : ''}
}

.gradient-bg {
  ${effects.gradients ? `background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});` : `background: ${colors.primary};`}
}

/* Custom CSS */
${styleConfig.customCSS}
`;

    return css;
  };

  const getPreviewStyles = () => {
    return {
      fontFamily: `${styleConfig.typography.fontFamily}, sans-serif`,
      fontSize: `${styleConfig.typography.fontSize}px`,
      fontWeight: styleConfig.typography.fontWeight,
      lineHeight: styleConfig.typography.lineHeight,
      letterSpacing: `${styleConfig.typography.letterSpacing}px`,
      color: styleConfig.colors.text,
      background: styleConfig.colors.background
    };
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link to="/tools">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Paintbrush className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Style Editor Pro
                </h1>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Advanced styling and design system creator
                </p>
              </div>
            </div>
          </div>
          
          {/* Theme Toggle & Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button onClick={exportStyles} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Download className="h-4 w-4 mr-2" />
              Export CSS
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Style Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-orange-500" />
                  Design System Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="colors" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Colors
                    </TabsTrigger>
                    <TabsTrigger value="typography" className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Typography
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      Layout
                    </TabsTrigger>
                    <TabsTrigger value="effects" className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Effects
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-6">
                    {/* Predefined Themes */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Quick Themes</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {predefinedThemes.map((theme, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => applyTheme(theme.colors)}
                            className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                          >
                            <div className="flex gap-1 mb-2">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: theme.colors.primary }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: theme.colors.secondary }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: theme.colors.accent }}
                              />
                            </div>
                            <p className="text-xs font-medium">{theme.name}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Color Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(styleConfig.colors).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={value}
                              onChange={(e) => updateColors(key as keyof StyleConfig['colors'], e.target.value)}
                              className="w-16 h-10"
                            />
                            <Input
                              type="text"
                              value={value}
                              onChange={(e) => updateColors(key as keyof StyleConfig['colors'], e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="typography" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Font Family</Label>
                        <Select 
                          value={styleConfig.typography.fontFamily} 
                          onValueChange={(value) => updateTypography('fontFamily', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontFamilies.map(font => (
                              <SelectItem key={font} value={font}>{font}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Font Weight</Label>
                        <Select 
                          value={styleConfig.typography.fontWeight} 
                          onValueChange={(value) => updateTypography('fontWeight', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontWeights.map(weight => (
                              <SelectItem key={weight} value={weight}>{weight}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Font Size: {styleConfig.typography.fontSize}px</Label>
                        <Slider
                          value={[styleConfig.typography.fontSize]}
                          onValueChange={(value) => updateTypography('fontSize', value[0])}
                          min={12}
                          max={32}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Line Height: {styleConfig.typography.lineHeight}</Label>
                        <Slider
                          value={[styleConfig.typography.lineHeight]}
                          onValueChange={(value) => updateTypography('lineHeight', value[0])}
                          min={1}
                          max={2.5}
                          step={0.1}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Letter Spacing: {styleConfig.typography.letterSpacing}px</Label>
                        <Slider
                          value={[styleConfig.typography.letterSpacing]}
                          onValueChange={(value) => updateTypography('letterSpacing', value[0])}
                          min={-2}
                          max={5}
                          step={0.1}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="layout" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Border Radius: {styleConfig.layout.borderRadius}px</Label>
                        <Slider
                          value={[styleConfig.layout.borderRadius]}
                          onValueChange={(value) => updateLayout('borderRadius', value[0])}
                          min={0}
                          max={32}
                          step={1}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Spacing: {styleConfig.layout.spacing}px</Label>
                        <Slider
                          value={[styleConfig.layout.spacing]}
                          onValueChange={(value) => updateLayout('spacing', value[0])}
                          min={4}
                          max={64}
                          step={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Max Width: {styleConfig.layout.maxWidth}px</Label>
                        <Slider
                          value={[styleConfig.layout.maxWidth]}
                          onValueChange={(value) => updateLayout('maxWidth', value[0])}
                          min={320}
                          max={1920}
                          step={40}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Padding: {styleConfig.layout.padding}px</Label>
                        <Slider
                          value={[styleConfig.layout.padding]}
                          onValueChange={(value) => updateLayout('padding', value[0])}
                          min={8}
                          max={64}
                          step={4}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(styleConfig.effects).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                            <p className="text-sm text-gray-500">
                              {key === 'shadows' && 'Add drop shadows to elements'}
                              {key === 'gradients' && 'Enable gradient backgrounds'}
                              {key === 'animations' && 'Add smooth transitions'}
                              {key === 'blur' && 'Add blur effects'}
                              {key === 'glass' && 'Enable glassmorphism'}
                            </p>
                          </div>
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => updateEffects(key as keyof StyleConfig['effects'], checked)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>Custom CSS</Label>
                      <Textarea
                        placeholder="Add your custom CSS here..."
                        value={styleConfig.customCSS}
                        onChange={(e) => setStyleConfig(prev => ({ ...prev, customCSS: e.target.value }))}
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-500" />
                  Live Preview
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    📱
                  </Button>
                  <Button
                    size="sm"
                    variant={previewMode === 'tablet' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('tablet')}
                  >
                    📟
                  </Button>
                  <Button
                    size="sm"
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    previewMode === 'mobile' ? 'max-w-sm mx-auto' :
                    previewMode === 'tablet' ? 'max-w-md mx-auto' : 'w-full'
                  }`}
                  style={getPreviewStyles()}
                >
                  <div 
                    className="p-4 rounded-lg mb-4"
                    style={{
                      background: styleConfig.effects.gradients 
                        ? `linear-gradient(135deg, ${styleConfig.colors.primary}, ${styleConfig.colors.secondary})`
                        : styleConfig.colors.primary,
                      color: 'white',
                      borderRadius: `${styleConfig.layout.borderRadius}px`,
                      boxShadow: styleConfig.effects.shadows ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
                    }}
                  >
                    <h3 className="font-bold mb-2">Sample Button</h3>
                    <p className="text-sm opacity-90">This is how your primary button will look</p>
                  </div>

                  <div 
                    className="p-4 rounded-lg mb-4"
                    style={{
                      background: styleConfig.colors.surface,
                      borderRadius: `${styleConfig.layout.borderRadius}px`,
                      boxShadow: styleConfig.effects.shadows ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
                      backdropFilter: styleConfig.effects.glass ? 'blur(10px)' : 'none'
                    }}
                  >
                    <h4 className="font-semibold mb-2">Sample Card</h4>
                    <p className="text-sm" style={{ color: styleConfig.colors.textSecondary }}>
                      This demonstrates how cards and surfaces will appear with your styling.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Typography Sample</p>
                    <p style={{ color: styleConfig.colors.textSecondary }}>
                      The quick brown fox jumps over the lazy dog. This shows your font and color choices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated CSS Preview */}
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-500" />
                  Generated CSS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  value={generateCSS()}
                  className="font-mono text-xs h-64 resize-none"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
