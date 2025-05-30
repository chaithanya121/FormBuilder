
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Palette, ArrowLeft, Brush, Download, Upload, Eye, Paintbrush, Type, Layout, Sparkles, Copy, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROFESSIONAL_THEMES = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Professional',
    preview: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      background: '#ffffff',
      text: '#000000'
    },
    rating: 4.8
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    category: 'Nature',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      background: '#ffffff',
      text: '#1e293b'
    },
    rating: 4.9
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    category: 'Warm',
    preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    colors: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      background: '#ffffff',
      text: '#7c2d12'
    },
    rating: 4.7
  },
  {
    id: 'forest-calm',
    name: 'Forest Calm',
    category: 'Nature',
    preview: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      background: '#ffffff',
      text: '#064e3b'
    },
    rating: 4.6
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    category: 'Premium',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      background: '#ffffff',
      text: '#581c87'
    },
    rating: 4.8
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    category: 'Dark',
    preview: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      background: '#374151',
      text: '#ffffff'
    },
    rating: 4.9
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'Professional',
    preview: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      background: '#ffffff',
      text: '#1e293b'
    },
    rating: 4.5
  },
  {
    id: 'creative-burst',
    name: 'Creative Burst',
    category: 'Creative',
    preview: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
    colors: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      background: '#ffffff',
      text: '#2d3748'
    },
    rating: 4.4
  }
];

const FONT_FAMILIES = [
  'Inter', 'Arial', 'Helvetica', 'Georgia', 'Roboto', 
  'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro',
  'Playfair Display', 'Oswald', 'Raleway', 'Nunito', 'Work Sans'
];

export const ThemeStudio = () => {
  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('modern-minimal');
  const [customTheme, setCustomTheme] = useState({
    name: 'My Custom Theme',
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    text: '#000000',
    fontFamily: 'Inter',
    fontSize: 16,
    borderRadius: 8
  });
  const [activeTab, setActiveTab] = useState('browse');
  const [copiedTheme, setCopiedTheme] = useState('');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    const selected = PROFESSIONAL_THEMES.find(t => t.id === themeId);
    if (selected) {
      setCustomTheme({
        ...customTheme,
        ...selected.colors,
        name: selected.name
      });
    }
  };

  const exportTheme = () => {
    const themeData = {
      name: customTheme.name,
      colors: {
        primary: customTheme.primary,
        secondary: customTheme.secondary,
        background: customTheme.background,
        text: customTheme.text
      },
      typography: {
        fontFamily: customTheme.fontFamily,
        fontSize: customTheme.fontSize
      },
      design: {
        borderRadius: customTheme.borderRadius
      }
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customTheme.name.replace(/\s+/g, '-').toLowerCase()}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyThemeCode = (themeId: string) => {
    const selected = PROFESSIONAL_THEMES.find(t => t.id === themeId);
    if (selected) {
      const css = `
/* ${selected.name} Theme */
:root {
  --primary-color: ${selected.colors.primary};
  --secondary-color: ${selected.colors.secondary};
  --background-color: ${selected.colors.background};
  --text-color: ${selected.colors.text};
}

.form-container {
  background: ${selected.preview};
  color: var(--text-color);
}

.form-input {
  border-color: var(--primary-color);
}

.form-button {
  background-color: var(--primary-color);
  color: white;
}
      `.trim();
      
      navigator.clipboard.writeText(css);
      setCopiedTheme(themeId);
      setTimeout(() => setCopiedTheme(''), 2000);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Theme Studio
              </h1>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Create and customize beautiful form themes
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Theme Browser & Editor */}
          <div className="lg:col-span-2">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brush className="h-5 w-5 text-purple-500" />
                  Theme Studio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="browse">Browse Themes</TabsTrigger>
                    <TabsTrigger value="customize">Customize</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                  </TabsList>

                  <TabsContent value="browse" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PROFESSIONAL_THEMES.map((theme) => (
                        <motion.div
                          key={theme.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card 
                            className={`cursor-pointer transition-all duration-200 ${
                              selectedTheme === theme.id 
                                ? 'ring-2 ring-purple-500 shadow-lg' 
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => handleThemeSelect(theme.id)}
                          >
                            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                              <div 
                                className="absolute inset-0"
                                style={{ background: theme.preview }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              
                              {/* Mini Form Preview */}
                              <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                                <div className="space-y-2">
                                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                  <div 
                                    className="h-6 rounded shadow-sm"
                                    style={{ backgroundColor: theme.colors.primary }}
                                  ></div>
                                  <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                                </div>
                              </div>
                              
                              {/* Category Badge */}
                              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                {theme.category}
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-sm">{theme.name}</h3>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">{theme.rating}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyThemeCode(theme.id);
                                    }}
                                  >
                                    {copiedTheme === theme.id ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                  </Button>
                                  <div className="flex gap-1">
                                    {Object.values(theme.colors).slice(0, 3).map((color, i) => (
                                      <div 
                                        key={i}
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: color }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="customize" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Theme Name</Label>
                        <Input 
                          value={customTheme.name}
                          onChange={(e) => setCustomTheme({...customTheme, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Primary Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="color"
                              value={customTheme.primary}
                              onChange={(e) => setCustomTheme({...customTheme, primary: e.target.value})}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={customTheme.primary}
                              onChange={(e) => setCustomTheme({...customTheme, primary: e.target.value})}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Secondary Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="color"
                              value={customTheme.secondary}
                              onChange={(e) => setCustomTheme({...customTheme, secondary: e.target.value})}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={customTheme.secondary}
                              onChange={(e) => setCustomTheme({...customTheme, secondary: e.target.value})}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Background Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="color"
                              value={customTheme.background}
                              onChange={(e) => setCustomTheme({...customTheme, background: e.target.value})}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={customTheme.background}
                              onChange={(e) => setCustomTheme({...customTheme, background: e.target.value})}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Text Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="color"
                              value={customTheme.text}
                              onChange={(e) => setCustomTheme({...customTheme, text: e.target.value})}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={customTheme.text}
                              onChange={(e) => setCustomTheme({...customTheme, text: e.target.value})}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Font Family</Label>
                        <Select 
                          value={customTheme.fontFamily}
                          onValueChange={(value) => setCustomTheme({...customTheme, fontFamily: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FONT_FAMILIES.map((font) => (
                              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                                {font}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Font Size: {customTheme.fontSize}px</Label>
                        <Slider
                          value={[customTheme.fontSize]}
                          onValueChange={(value) => setCustomTheme({...customTheme, fontSize: value[0]})}
                          min={12}
                          max={24}
                          step={1}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Border Radius: {customTheme.borderRadius}px</Label>
                        <Slider
                          value={[customTheme.borderRadius]}
                          onValueChange={(value) => setCustomTheme({...customTheme, borderRadius: value[0]})}
                          min={0}
                          max={20}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="export" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold mb-2">Export Your Theme</h3>
                        <p className="text-sm text-gray-600">Download your custom theme as JSON or copy the CSS code</p>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={exportTheme} className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download JSON
                        </Button>
                        <Button variant="outline" onClick={() => copyThemeCode(selectedTheme)} className="flex-1">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy CSS
                        </Button>
                      </div>

                      <div>
                        <Label>CSS Preview</Label>
                        <Textarea
                          readOnly
                          rows={10}
                          className="mt-1 font-mono text-xs"
                          value={`/* ${customTheme.name} Theme */
:root {
  --primary-color: ${customTheme.primary};
  --secondary-color: ${customTheme.secondary};
  --background-color: ${customTheme.background};
  --text-color: ${customTheme.text};
  --font-family: ${customTheme.fontFamily};
  --font-size: ${customTheme.fontSize}px;
  --border-radius: ${customTheme.borderRadius}px;
}

.form-container {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--font-family);
  font-size: var(--font-size);
}

.form-input {
  border-radius: var(--border-radius);
  border-color: var(--primary-color);
}

.form-button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  color: white;
}`}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm sticky top-6`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg shadow-lg"
                  style={{
                    backgroundColor: customTheme.background,
                    fontFamily: customTheme.fontFamily,
                    fontSize: `${customTheme.fontSize}px`,
                    color: customTheme.text
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4">Sample Form</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input 
                        type="text"
                        placeholder="Enter your name"
                        className="w-full p-2 border rounded"
                        style={{
                          borderColor: customTheme.primary,
                          borderRadius: `${customTheme.borderRadius}px`
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded"
                        style={{
                          borderColor: customTheme.primary,
                          borderRadius: `${customTheme.borderRadius}px`
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea 
                        placeholder="Your message"
                        rows={3}
                        className="w-full p-2 border rounded"
                        style={{
                          borderColor: customTheme.primary,
                          borderRadius: `${customTheme.borderRadius}px`
                        }}
                      />
                    </div>
                    
                    <button
                      className="w-full py-2 px-4 text-white font-medium rounded"
                      style={{
                        backgroundColor: customTheme.primary,
                        borderRadius: `${customTheme.borderRadius}px`
                      }}
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
