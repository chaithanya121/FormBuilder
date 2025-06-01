
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Star, Download, Upload, Save, Eye, Heart, 
  Crown, Sparkles, Wand2, Settings, Grid, Check,
  ArrowLeft, Plus, Trash2, Copy, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';

interface Theme {
  id: string;
  name: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    formBackground: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
  };
  design: {
    borderRadius: number;
    shadow: string;
  };
  popular?: boolean;
  rating?: number;
  createdAt?: string;
}

export const FormDesignerStudio = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteThemes, setFavoriteThemes] = useState<string[]>([]);
  const [savedThemes, setSavedThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const categories = ['All', 'Popular', 'Modern', 'Minimal', 'Gradient', 'Dark', 'Custom'];

  const defaultThemes: Theme[] = [
    {
      id: '1',
      name: 'Modern Minimal',
      category: 'Modern',
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        formBackground: '#ffffff',
        text: '#1e293b'
      },
      typography: { fontFamily: 'Inter', fontSize: 16 },
      design: { borderRadius: 12, shadow: '0 10px 25px rgba(0,0,0,0.1)' },
      popular: true,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Ocean Breeze',
      category: 'Gradient',
      colors: {
        primary: '#0ea5e9',
        secondary: '#0284c7',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
        formBackground: '#f0f9ff',
        text: '#0f172a'
      },
      typography: { fontFamily: 'Poppins', fontSize: 16 },
      design: { borderRadius: 16, shadow: '0 20px 40px rgba(14,165,233,0.2)' },
      popular: true,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Sunset Glow',
      category: 'Gradient',
      colors: {
        primary: '#f59e0b',
        secondary: '#dc2626',
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #dc2626 100%)',
        formBackground: '#fffbeb',
        text: '#451a03'
      },
      typography: { fontFamily: 'Roboto', fontSize: 15 },
      design: { borderRadius: 20, shadow: '0 25px 50px rgba(245,158,11,0.3)' },
      rating: 4.7
    },
    {
      id: '4',
      name: 'Dark Professional',
      category: 'Dark',
      colors: {
        primary: '#8b5cf6',
        secondary: '#a855f7',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        formBackground: '#1f2937',
        text: '#f9fafb'
      },
      typography: { fontFamily: 'Space Grotesk', fontSize: 16 },
      design: { borderRadius: 8, shadow: '0 25px 50px rgba(0,0,0,0.5)' },
      popular: true,
      rating: 4.9
    }
  ];

  useEffect(() => {
    // Load saved themes from localStorage
    const saved = localStorage.getItem('formBuilder_customThemes');
    const favorites = localStorage.getItem('formBuilder_favoriteThemes');
    
    if (saved) {
      try {
        setSavedThemes(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load themes:', error);
      }
    }
    
    if (favorites) {
      try {
        setFavoriteThemes(JSON.parse(favorites));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  const allThemes = [...defaultThemes, ...savedThemes];

  const filteredThemes = allThemes.filter(theme => {
    const matchesCategory = selectedCategory === 'All' || 
                           (selectedCategory === 'Popular' && theme.popular) ||
                           theme.category === selectedCategory ||
                           (selectedCategory === 'Custom' && savedThemes.some(s => s.id === theme.id));
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (themeId: string) => {
    const updated = favoriteThemes.includes(themeId)
      ? favoriteThemes.filter(id => id !== themeId)
      : [...favoriteThemes, themeId];
    
    setFavoriteThemes(updated);
    localStorage.setItem('formBuilder_favoriteThemes', JSON.stringify(updated));
  };

  const handleApplyTheme = (theme: Theme) => {
    toast({
      title: "Theme Applied!",
      description: `"${theme.name}" has been applied to your form.`,
    });
  };

  const handleSaveTheme = (theme: Theme) => {
    const updated = [...savedThemes, { ...theme, id: Date.now().toString(), createdAt: new Date().toISOString() }];
    setSavedThemes(updated);
    localStorage.setItem('formBuilder_customThemes', JSON.stringify(updated));
    
    toast({
      title: "Theme Saved!",
      description: `"${theme.name}" has been saved to your collection.`,
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                  Form Designer Studio
                </h1>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                  Create stunning form designs with professional themes
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              <Crown className="h-4 w-4 mr-2" />
              v3.0 Pro
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {allThemes.length} Themes Available
            </Badge>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Theme
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Themes', value: allThemes.length, icon: Palette, color: 'blue' },
            { label: 'Popular', value: allThemes.filter(t => t.popular).length, icon: Star, color: 'yellow' },
            { label: 'Favorites', value: favoriteThemes.length, icon: Heart, color: 'red' },
            { label: 'Custom', value: savedThemes.length, icon: Wand2, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{stat.label}</p>
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

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="grid w-full lg:w-auto grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg h-12">
              <TabsTrigger value="themes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <Grid className="w-4 h-4 mr-2" />
                Themes
              </TabsTrigger>
              <TabsTrigger value="colors" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <Palette className="w-4 h-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                Typography
              </TabsTrigger>
              <TabsTrigger value="background" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                Background
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Input
                  placeholder="Search themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
                <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="themes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredThemes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm">
                      <div className="relative">
                        <div 
                          className="h-32 relative overflow-hidden"
                          style={{ background: theme.colors.background }}
                        >
                          <div className="absolute inset-4 rounded-lg overflow-hidden shadow-xl"
                               style={{ backgroundColor: theme.colors.formBackground }}>
                            <div className="p-3 space-y-2">
                              <div className="h-2 rounded" style={{ backgroundColor: `${theme.colors.primary}20` }}></div>
                              <div className="h-1.5 rounded w-2/3" style={{ backgroundColor: `${theme.colors.text}30` }}></div>
                              <div className="h-6 rounded shadow-sm" style={{ backgroundColor: theme.colors.primary }}></div>
                            </div>
                          </div>
                          
                          {theme.popular && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          )}

                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(theme.id);
                            }}
                          >
                            <Heart className={`w-4 h-4 ${favoriteThemes.includes(theme.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                          </Button>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {theme.name}
                            </h3>
                            {theme.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-600">{theme.rating}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {theme.category}
                            </Badge>
                            
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApplyTheme(theme)}
                                className="h-7 text-xs hover:bg-purple-50 hover:border-purple-300"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(JSON.stringify(theme));
                                  toast({ title: "Theme copied to clipboard!" });
                                }}
                                className="h-7 text-xs hover:bg-blue-50 hover:border-blue-300"
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

          <TabsContent value="colors" className="space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Customization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Advanced color customization tools coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>Typography Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Font family and typography controls coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="background" className="space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>Background Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Background customization tools coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
