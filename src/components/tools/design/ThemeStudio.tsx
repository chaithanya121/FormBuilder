import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, Save, Eye, Download, Upload, RefreshCw, Zap, Star,
  Plus, Copy, Trash2, Edit3, Sparkles, Brush, Type, Layout,
  Image as ImageIcon, Settings, Code, Share, Heart, Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ThemeStudio: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [customTheme, setCustomTheme] = useState({
    name: 'My Custom Theme',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    formBackgroundColor: '#ffffff',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    fontColor: '#1f2937',
    fontFamily: 'Inter',
    fontSize: 16,
    borderRadius: '12px',
    padding: '32px',
    formWidth: 752
  });

  const [savedThemes, setSavedThemes] = useState([
    {
      id: 1,
      name: 'Ocean Depths',
      category: 'Professional',
      backgroundColor: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
      formBackgroundColor: '#ffffff',
      primaryColor: '#0ea5e9',
      secondaryColor: '#0284c7',
      fontColor: '#0f172a',
      popular: true,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Sunset Vibes',
      category: 'Creative',
      backgroundColor: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)',
      formBackgroundColor: '#fffbeb',
      primaryColor: '#f59e0b',
      secondaryColor: '#dc2626',
      fontColor: '#451a03',
      popular: true,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Forest Green',
      category: 'Nature',
      backgroundColor: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
      formBackgroundColor: '#f0fdf4',
      primaryColor: '#22c55e',
      secondaryColor: '#16a34a',
      fontColor: '#14532d',
      popular: false,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Purple Dreams',
      category: 'Modern',
      backgroundColor: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
      formBackgroundColor: '#faf5ff',
      primaryColor: '#8b5cf6',
      secondaryColor: '#a855f7',
      fontColor: '#581c87',
      popular: true,
      rating: 4.9
    }
  ]);

  const categories = ['All', 'Professional', 'Creative', 'Nature', 'Modern', 'Minimal'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredThemes = selectedCategory === 'All' 
    ? savedThemes 
    : savedThemes.filter(theme => theme.category === selectedCategory);

  const handleCreateTheme = () => {
    const newTheme = {
      id: Date.now(),
      ...customTheme,
      category: 'Custom',
      popular: false,
      rating: 0
    };
    
    setSavedThemes([...savedThemes, newTheme]);
    toast({
      title: "Theme Created!",
      description: `${customTheme.name} has been added to your collection.`,
    });
  };

  const handleSaveTheme = () => {
    if (selectedTheme) {
      const updated = savedThemes.map(theme => 
        theme.id === selectedTheme.id ? { ...theme, ...customTheme } : theme
      );
      setSavedThemes(updated);
      toast({
        title: "Theme Updated!",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleExportTheme = () => {
    const themeData = JSON.stringify(customTheme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${customTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target?.result as string);
            setCustomTheme(imported);
            toast({
              title: "Theme Imported!",
              description: "Your theme has been loaded successfully.",
            });
          } catch (error) {
            toast({
              title: "Import Failed",
              description: "Invalid theme file format.",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Theme Studio Pro
                </h1>
                <p className="text-lg text-gray-600 mt-1">Create, customize, and manage beautiful form themes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Premium Studio
              </Badge>
              <Button variant="outline" onClick={handleImportTheme}>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button onClick={handleExportTheme} className="bg-gradient-to-r from-purple-500 to-blue-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Themes', value: savedThemes.length, icon: Palette, color: 'blue' },
              { label: 'Popular Themes', value: savedThemes.filter(t => t.popular).length, icon: Star, color: 'yellow' },
              { label: 'Categories', value: categories.length - 1, icon: Layout, color: 'green' },
              { label: 'Downloads', value: '1.2k', icon: Download, color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm h-12">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Theme Gallery
            </TabsTrigger>
            <TabsTrigger value="creator" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Brush className="w-4 h-4 mr-2" />
              Theme Creator
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Code className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Theme Gallery */}
          <TabsContent value="gallery" className="space-y-6">
            {/* Category Filter */}
            <div className="flex items-center gap-4 mb-6">
              <Label className="font-medium">Category:</Label>
              <div className="flex gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-gradient-to-r from-purple-500 to-blue-500" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Themes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredThemes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <div 
                          className="h-40 relative overflow-hidden"
                          style={{ background: theme.backgroundColor }}
                        >
                          <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                            <div className="space-y-3">
                              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                              <div 
                                className="h-8 rounded shadow-sm"
                                style={{ backgroundColor: theme.primaryColor }}
                              ></div>
                            </div>
                          </div>
                          
                          {theme.popular && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">{theme.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {theme.category}
                            </Badge>
                            
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // Extract only the properties that match customTheme structure
                                  const themeForEditing = {
                                    name: theme.name,
                                    backgroundColor: theme.backgroundColor,
                                    formBackgroundColor: theme.formBackgroundColor,
                                    primaryColor: theme.primaryColor,
                                    secondaryColor: theme.secondaryColor,
                                    fontColor: theme.fontColor,
                                    fontFamily: 'Inter', // Default values for missing properties
                                    fontSize: 16,
                                    borderRadius: '12px',
                                    padding: '32px',
                                    formWidth: 752
                                  };
                                  setCustomTheme(themeForEditing);
                                  setSelectedTheme(theme);
                                  setActiveTab('creator');
                                }}
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(JSON.stringify(theme));
                                  toast({
                                    title: "Theme Copied!",
                                    description: "Theme data copied to clipboard.",
                                  });
                                }}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Theme Creator */}
          <TabsContent value="creator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brush className="w-5 h-5" />
                      Theme Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Theme Name</Label>
                      <Input
                        value={customTheme.name}
                        onChange={(e) => setCustomTheme({...customTheme, name: e.target.value})}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Primary Color</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="color"
                            value={customTheme.primaryColor}
                            onChange={(e) => setCustomTheme({...customTheme, primaryColor: e.target.value})}
                            className="w-12 h-10 rounded border"
                          />
                          <Input
                            value={customTheme.primaryColor}
                            onChange={(e) => setCustomTheme({...customTheme, primaryColor: e.target.value})}
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Form Background</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="color"
                            value={customTheme.formBackgroundColor}
                            onChange={(e) => setCustomTheme({...customTheme, formBackgroundColor: e.target.value})}
                            className="w-12 h-10 rounded border"
                          />
                          <Input
                            value={customTheme.formBackgroundColor}
                            onChange={(e) => setCustomTheme({...customTheme, formBackgroundColor: e.target.value})}
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Canvas Background</Label>
                      <Textarea
                        value={customTheme.backgroundColor}
                        onChange={(e) => setCustomTheme({...customTheme, backgroundColor: e.target.value})}
                        placeholder="Enter CSS background (gradient, color, etc.)"
                        className="mt-2 font-mono text-sm"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Font Family</Label>
                      <Select 
                        value={customTheme.fontFamily}
                        onValueChange={(value) => setCustomTheme({...customTheme, fontFamily: value})}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Lato">Lato</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
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

                    <div className="flex gap-3">
                      <Button onClick={handleCreateTheme} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Theme
                      </Button>
                      {selectedTheme && (
                        <Button onClick={handleSaveTheme} variant="outline" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Update Theme
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="relative rounded-lg overflow-hidden shadow-lg"
                      style={{ 
                        background: customTheme.backgroundColor,
                        minHeight: '400px',
                        padding: '32px'
                      }}
                    >
                      <div 
                        className="max-w-md mx-auto rounded-lg shadow-xl p-8"
                        style={{ 
                          backgroundColor: customTheme.formBackgroundColor,
                          borderRadius: customTheme.borderRadius,
                          fontFamily: customTheme.fontFamily,
                          fontSize: `${customTheme.fontSize}px`,
                          color: customTheme.fontColor
                        }}
                      >
                        <h3 className="text-xl font-bold mb-6" style={{ color: customTheme.fontColor }}>
                          Sample Form
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <div className="w-full h-10 bg-gray-100 rounded border"></div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <div className="w-full h-10 bg-gray-100 rounded border"></div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <div className="w-full h-20 bg-gray-100 rounded border"></div>
                          </div>
                          
                          <div 
                            className="w-full h-12 rounded font-medium flex items-center justify-center text-white"
                            style={{ backgroundColor: customTheme.primaryColor }}
                          >
                            Submit Form
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Advanced Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Custom CSS</Label>
                  <Textarea
                    placeholder="/* Add your custom CSS here */
.form-container {
  /* Custom styles */
}

.form-input {
  /* Input styles */
}"
                    className="mt-2 font-mono text-sm"
                    rows={10}
                  />
                </div>

                <div>
                  <Label>Theme JSON</Label>
                  <Textarea
                    value={JSON.stringify(customTheme, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setCustomTheme(parsed);
                      } catch (error) {
                        // Invalid JSON, don't update
                      }
                    }}
                    className="mt-2 font-mono text-sm"
                    rows={15}
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleExportTheme} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                  <Button onClick={handleImportTheme} variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ThemeStudio;
