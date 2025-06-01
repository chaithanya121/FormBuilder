
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, Heart, Trash2, Copy, 
  Download, Eye, Zap, Palette, Grid
} from 'lucide-react';
import { CustomTheme } from '../types';

interface ThemeGalleryProps {
  themes: CustomTheme[];
  favorites: string[];
  onSelectTheme: (theme: CustomTheme) => void;
  onApplyTheme: (theme: CustomTheme) => void;
  onDeleteTheme: (themeId: string) => void;
  onToggleFavorite: (themeId: string) => void;
}

const ThemeGallery: React.FC<ThemeGalleryProps> = ({
  themes,
  favorites,
  onSelectTheme,
  onApplyTheme,
  onDeleteTheme,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', ...Array.from(new Set(themes.map(theme => theme.category || 'uncategorized')))];
  
  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (theme.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || theme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ThemeCard = ({ theme, index }: { theme: CustomTheme; index: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Preview */}
      <div 
        className="h-32 relative cursor-pointer"
        style={{ background: theme.backgroundColor }}
        onClick={() => onSelectTheme(theme)}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Eye className="h-6 w-6 text-white" />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(String(theme.id || ''));
          }}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart 
            className={`h-4 w-4 ${
              favorites.includes(String(theme.id || '')) 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-400'
            }`}
          />
        </button>

        {/* Rating */}
        {theme.rating && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium">{theme.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {theme.name}
          </h3>
          <Badge variant="outline" className="text-xs">
            {theme.category || 'Custom'}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>{theme.created ? new Date(theme.created).toLocaleDateString() : 'Custom Theme'}</span>
          {theme.popular && (
            <Badge variant="secondary" className="text-xs">
              Popular
            </Badge>
          )}
        </div>

        {/* Colors Preview */}
        <div className="flex gap-1 mb-3">
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: theme.secondaryColor }}
          />
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: theme.formBackgroundColor }}
          />
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: theme.fontColor }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onApplyTheme(theme)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Zap className="h-3 w-3 mr-1" />
            Apply
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSelectTheme(theme)}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDeleteTheme(String(theme.id || ''))}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Themes</h3>
            <p className="text-sm text-gray-600">{filteredThemes.length} themes available</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Palette className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredThemes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No themes found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first theme using the Theme Creator'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }
            `}
          >
            <AnimatePresence>
              {filteredThemes.map((theme, index) => (
                <ThemeCard key={theme.id || `theme-${index}`} theme={theme} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThemeGallery;
