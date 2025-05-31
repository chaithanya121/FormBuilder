
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Wand2, Download, Upload, Save, Eye, 
  Sparkles, Grid, Layers, Zap, Star, Heart,
  Plus, Trash2, Copy, Check
} from 'lucide-react';
import { CustomTheme } from '../types';
import ThemeCreator from './ThemeCreator';
import ThemeGallery from './ThemeGallery';
import ThemePreview from './ThemePreview';
import { useToast } from '@/hooks/use-toast';

interface ThemeStudioProps {
  onApplyTheme: (theme: CustomTheme) => void;
  onClose: () => void;
}

const ThemeStudio: React.FC<ThemeStudioProps> = ({ onApplyTheme, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('gallery');
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<CustomTheme | null>(null);
  const [favoriteThemes, setFavoriteThemes] = useState<string[]>([]);

  useEffect(() => {
    // Load saved themes from localStorage
    const savedThemes = localStorage.getItem('formBuilder_customThemes');
    if (savedThemes) {
      try {
        setCustomThemes(JSON.parse(savedThemes));
      } catch (error) {
        console.error('Failed to load themes:', error);
      }
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('formBuilder_favoriteThemes');
    if (savedFavorites) {
      try {
        setFavoriteThemes(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  const handleSaveTheme = (theme: CustomTheme) => {
    const updatedThemes = [...customThemes, theme];
    setCustomThemes(updatedThemes);
    localStorage.setItem('formBuilder_customThemes', JSON.stringify(updatedThemes));
    
    toast({
      title: "Theme Created!",
      description: `"${theme.name}" has been saved to your collection.`,
    });
    
    setActiveTab('gallery');
  };

  const handleDeleteTheme = (themeId: string) => {
    const updatedThemes = customThemes.filter(theme => theme.id !== themeId);
    setCustomThemes(updatedThemes);
    localStorage.setItem('formBuilder_customThemes', JSON.stringify(updatedThemes));
    
    toast({
      title: "Theme Deleted",
      description: "Theme has been removed from your collection.",
    });
  };

  const handleToggleFavorite = (themeId: string) => {
    const updatedFavorites = favoriteThemes.includes(themeId)
      ? favoriteThemes.filter(id => id !== themeId)
      : [...favoriteThemes, themeId];
    
    setFavoriteThemes(updatedFavorites);
    localStorage.setItem('formBuilder_favoriteThemes', JSON.stringify(updatedFavorites));
  };

  const handleApplyTheme = (theme: CustomTheme) => {
    onApplyTheme(theme);
    toast({
      title: "Theme Applied!",
      description: `"${theme.name}" has been applied to your form.`,
    });
  };

  const handleExportThemes = () => {
    const dataStr = JSON.stringify(customThemes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-themes.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportThemes = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedThemes = JSON.parse(event.target?.result as string);
            setCustomThemes(prev => [...prev, ...importedThemes]);
            localStorage.setItem('formBuilder_customThemes', JSON.stringify([...customThemes, ...importedThemes]));
            toast({
              title: "Themes Imported!",
              description: `${importedThemes.length} themes have been added to your collection.`,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-7xl w-full max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 h-full">
          <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Theme Studio</h2>
                  <p className="text-purple-100 text-sm">Create, customize, and manage your form themes</p>
                </div>
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {customThemes.length} Themes
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportThemes}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportThemes}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b bg-gray-50">
                <TabsList className="w-full h-auto p-2 bg-transparent">
                  <TabsTrigger 
                    value="gallery" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Theme Gallery
                  </TabsTrigger>
                  <TabsTrigger 
                    value="creator" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Theme Creator
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    disabled={!selectedTheme}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Live Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="gallery" className="h-full m-0">
                  <ThemeGallery
                    themes={customThemes}
                    favorites={favoriteThemes}
                    onSelectTheme={setSelectedTheme}
                    onApplyTheme={handleApplyTheme}
                    onDeleteTheme={handleDeleteTheme}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </TabsContent>

                <TabsContent value="creator" className="h-full m-0">
                  <ThemeCreator
                    onSaveTheme={handleSaveTheme}
                    existingThemes={customThemes}
                  />
                </TabsContent>

                <TabsContent value="preview" className="h-full m-0">
                  {selectedTheme && (
                    <ThemePreview
                      theme={selectedTheme}
                      onApplyTheme={handleApplyTheme}
                    />
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ThemeStudio;
