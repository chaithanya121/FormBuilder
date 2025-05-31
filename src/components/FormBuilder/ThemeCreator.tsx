import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, Save, Download, Upload, Eye, Sparkles, 
  Wand2, Copy, Check, Star, Heart, Trash2, Plus 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomTheme {
  id: string;
  name: string;
  category: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    form: string;
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
  };
  layout: {
    borderRadius: number;
    padding: number;
    spacing: number;
    shadow: string;
  };
  effects: {
    animations: boolean;
    gradients: boolean;
    blurEffects: boolean;
    darkMode: boolean;
  };
  created: string;
  rating?: number;
  popular?: boolean;
}

const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff8a80 0%, #ff80ab 100%)',
  'linear-gradient(135deg, #81c784 0%, #aed581 100%)',
  'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
  'linear-gradient(135deg, #ba68c8 0%, #ab47bc 100%)',
];

const FONT_FAMILIES = [
  'Inter', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman',
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Source Sans Pro', 'Playfair Display', 'Merriweather'
];

const THEME_CATEGORIES = [
  'Professional', 'Creative', 'Minimal', 'Modern', 'Classic',
  'Nature', 'Dark', 'Colorful', 'Elegant', 'Corporate'
];

interface ThemeCreatorProps {
  onSaveTheme: (theme: CustomTheme) => void;
  existingThemes: CustomTheme[];
}

const ThemeCreator: React.FC<ThemeCreatorProps> = ({ onSaveTheme, existingThemes }) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<CustomTheme>({
    id: '',
    name: 'My Custom Theme',
    category: 'Modern',
    preview: GRADIENT_PRESETS[0],
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      background: '#ffffff',
      form: '#ffffff',
      text: '#1a1a1a',
      accent: '#f59e0b'
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5
    },
    layout: {
      borderRadius: 8,
      padding: 24,
      spacing: 16,
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    },
    effects: {
      animations: true,
      gradients: true,
      blurEffects: false,
      darkMode: false
    },
    created: new Date().toISOString()
  });

  const [activeTab, setActiveTab] = useState('colors');

  const updateTheme = (section: keyof CustomTheme, field: string, value: any) => {
    setTheme(prev => {
      const currentSection = prev[section];
      if (typeof currentSection === 'object' && currentSection !== null) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleSave = () => {
    if (!theme.name.trim()) {
      toast({
        title: "Theme name required",
        description: "Please enter a name for your theme.",
        variant: "destructive"
      });
      return;
    }

    const savedTheme = {
      ...theme,
      id: Date.now().toString(),
      created: new Date().toISOString()
    };

    onSaveTheme(savedTheme);
    toast({
      title: "Theme saved successfully!",
      description: `${theme.name} has been added to your collection.`,
    });
  };

  const generateRandomTheme = () => {
    const randomGradient = GRADIENT_PRESETS[Math.floor(Math.random() * GRADIENT_PRESETS.length)];
    const randomFont = FONT_FAMILIES[Math.floor(Math.random() * FONT_FAMILIES.length)];
    const randomCategory = THEME_CATEGORIES[Math.floor(Math.random() * THEME_CATEGORIES.length)];
    
    setTheme(prev => ({
      ...prev,
      name: `Random Theme ${Date.now()}`,
      category: randomCategory,
      preview: randomGradient,
      colors: {
        ...prev.colors,
        primary: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        secondary: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        accent: `#${Math.floor(Math.random()*16777215).toString(16)}`
      },
      typography: {
        ...prev.typography,
        fontFamily: randomFont,
        fontSize: Math.floor(Math.random() * 8) + 14
      }
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            Theme Creator
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={generateRandomTheme}>
              <Sparkles className="h-4 w-4 mr-1" />
              Random
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save Theme
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Theme Name</Label>
                <Input
                  value={theme.name}
                  onChange={(e) => setTheme(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter theme name"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={theme.category}
                  onValueChange={(value) => setTheme(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {THEME_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="effects">Effects</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={theme.colors.primary}
                        onChange={(e) => updateTheme('colors', 'primary', e.target.value)}
                        className="w-10 h-8 rounded border"
                      />
                      <Input
                        value={theme.colors.primary}
                        onChange={(e) => updateTheme('colors', 'primary', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={theme.colors.secondary}
                        onChange={(e) => updateTheme('colors', 'secondary', e.target.value)}
                        className="w-10 h-8 rounded border"
                      />
                      <Input
                        value={theme.colors.secondary}
                        onChange={(e) => updateTheme('colors', 'secondary', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Background Gradient</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {GRADIENT_PRESETS.map((gradient, index) => (
                      <button
                        key={index}
                        className={`h-12 rounded-lg border-2 transition-all ${
                          theme.preview === gradient ? 'border-blue-500 scale-105' : 'border-gray-200'
                        }`}
                        style={{ background: gradient }}
                        onClick={() => setTheme(prev => ({ ...prev, preview: gradient }))}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-4">
                <div>
                  <Label>Font Family</Label>
                  <Select
                    value={theme.typography.fontFamily}
                    onValueChange={(value) => updateTheme('typography', 'fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_FAMILIES.map(font => (
                        <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Font Size: {theme.typography.fontSize}px</Label>
                  <Slider
                    value={[theme.typography.fontSize]}
                    onValueChange={(value) => updateTheme('typography', 'fontSize', value[0])}
                    min={12}
                    max={24}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4">
                <div>
                  <Label>Border Radius: {theme.layout.borderRadius}px</Label>
                  <Slider
                    value={[theme.layout.borderRadius]}
                    onValueChange={(value) => updateTheme('layout', 'borderRadius', value[0])}
                    min={0}
                    max={24}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Padding: {theme.layout.padding}px</Label>
                  <Slider
                    value={[theme.layout.padding]}
                    onValueChange={(value) => updateTheme('layout', 'padding', value[0])}
                    min={8}
                    max={48}
                    step={2}
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Animations</Label>
                    <Switch
                      checked={theme.effects.animations}
                      onCheckedChange={(checked) => updateTheme('effects', 'animations', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Gradient Effects</Label>
                    <Switch
                      checked={theme.effects.gradients}
                      onCheckedChange={(checked) => updateTheme('effects', 'gradients', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Blur Effects</Label>
                    <Switch
                      checked={theme.effects.blurEffects}
                      onCheckedChange={(checked) => updateTheme('effects', 'blurEffects', checked)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <Label>Live Preview</Label>
            </div>
            
            <div
              className="p-6 rounded-lg shadow-lg border"
              style={{
                background: theme.preview,
                fontFamily: theme.typography.fontFamily,
                fontSize: `${theme.typography.fontSize}px`
              }}
            >
              <div
                className="p-6 rounded-lg shadow-lg"
                style={{
                  backgroundColor: theme.colors.form,
                  borderRadius: `${theme.layout.borderRadius}px`,
                  padding: `${theme.layout.padding}px`,
                  color: theme.colors.text
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
                        borderColor: theme.colors.primary,
                        borderRadius: `${theme.layout.borderRadius / 2}px`
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
                        borderColor: theme.colors.primary,
                        borderRadius: `${theme.layout.borderRadius / 2}px`
                      }}
                    />
                  </div>
                  <button
                    className="w-full py-2 px-4 text-white font-medium rounded"
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderRadius: `${theme.layout.borderRadius}px`
                    }}
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCreator;
