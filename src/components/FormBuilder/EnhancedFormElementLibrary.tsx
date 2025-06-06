
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import {
  Type, AtSign, Phone, Calendar, Clock, MapPin, Link2,
  FileText, Image, Video, Star, ThumbsUp, Hash, DollarSign,
  Palette, Users, Shield, Zap, Smartphone, Globe, Camera,
  Search, Filter, Plus, Grid, List, Heart, MessageSquare,
  BarChart3, PieChart, Sliders, ToggleLeft, CheckSquare,
  RadioIcon as Radio, Upload, Download, Eye, EyeOff, Lock,
  Unlock, AlertCircle, Info, CheckCircle, XCircle, Bell,
  Tag, Bookmark, Share, Copy, Edit, Trash2, Settings
} from 'lucide-react';

interface FormElement {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'basic' | 'advanced' | 'layout' | 'media' | 'interactive' | 'data';
  isPro?: boolean;
  isNew?: boolean;
  popularity: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ElementLibraryProps {
  onElementAdd: (element: any) => void;
  formConfig: any;
}

const EnhancedFormElementLibrary: React.FC<ElementLibraryProps> = ({ onElementAdd, formConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdvancedOnly, setShowAdvancedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formElements: FormElement[] = [
    // Basic Elements
    {
      id: 'text-input',
      type: 'text',
      name: 'Text Input',
      description: 'Single line text input for names, titles, etc.',
      icon: Type,
      category: 'basic',
      popularity: 95,
      difficulty: 'easy'
    },
    {
      id: 'textarea',
      type: 'textarea',
      name: 'Textarea',
      description: 'Multi-line text input for longer content',
      icon: FileText,
      category: 'basic',
      popularity: 88,
      difficulty: 'easy'
    },
    {
      id: 'email',
      type: 'email',
      name: 'Email Input',
      description: 'Email input with built-in validation',
      icon: AtSign,
      category: 'basic',
      popularity: 92,
      difficulty: 'easy'
    },
    {
      id: 'phone',
      type: 'phone',
      name: 'Phone Input',
      description: 'Phone number input with format validation',
      icon: Phone,
      category: 'basic',
      popularity: 78,
      difficulty: 'easy'
    },
    {
      id: 'number',
      type: 'number',
      name: 'Number Input',
      description: 'Numeric input with increment/decrement controls',
      icon: Hash,
      category: 'basic',
      popularity: 76,
      difficulty: 'easy'
    },
    {
      id: 'password',
      type: 'password',
      name: 'Password Input',
      description: 'Secure password input with visibility toggle',
      icon: Lock,
      category: 'basic',
      popularity: 85,
      difficulty: 'easy'
    },
    {
      id: 'url',
      type: 'url',
      name: 'URL Input',
      description: 'Website URL input with validation',
      icon: Link2,
      category: 'basic',
      popularity: 67,
      difficulty: 'easy'
    },
    {
      id: 'search',
      type: 'search',
      name: 'Search Input',
      description: 'Search input with autocomplete functionality',
      icon: Search,
      category: 'basic',
      popularity: 71,
      difficulty: 'easy'
    },

    // Selection Elements
    {
      id: 'select',
      type: 'select',
      name: 'Dropdown Select',
      description: 'Single selection from dropdown list',
      icon: List,
      category: 'basic',
      popularity: 85,
      difficulty: 'easy'
    },
    {
      id: 'multiselect',
      type: 'multiselect',
      name: 'Multi Select',
      description: 'Multiple selection dropdown with tags',
      icon: List,
      category: 'advanced',
      popularity: 68,
      difficulty: 'medium'
    },
    {
      id: 'radio',
      type: 'radio',
      name: 'Radio Buttons',
      description: 'Single selection from visible options',
      icon: Radio,
      category: 'basic',
      popularity: 82,
      difficulty: 'easy'
    },
    {
      id: 'checkbox',
      type: 'checkbox',
      name: 'Checkbox',
      description: 'Single checkbox for yes/no questions',
      icon: CheckSquare,
      category: 'basic',
      popularity: 89,
      difficulty: 'easy'
    },
    {
      id: 'checkbox-group',
      type: 'checkbox-group',
      name: 'Checkbox Group',
      description: 'Multiple selection checkboxes',
      icon: CheckSquare,
      category: 'basic',
      popularity: 84,
      difficulty: 'easy'
    },
    {
      id: 'toggle',
      type: 'toggle',
      name: 'Toggle Switch',
      description: 'Modern on/off toggle switch',
      icon: ToggleLeft,
      category: 'advanced',
      popularity: 69,
      difficulty: 'easy'
    },

    // Date & Time Elements
    {
      id: 'date-picker',
      type: 'date',
      name: 'Date Picker',
      description: 'Calendar-based date selection',
      icon: Calendar,
      category: 'advanced',
      popularity: 74,
      difficulty: 'medium'
    },
    {
      id: 'time-picker',
      type: 'time',
      name: 'Time Picker',
      description: 'Time selection with hour/minute controls',
      icon: Clock,
      category: 'advanced',
      popularity: 65,
      difficulty: 'medium'
    },
    {
      id: 'datetime-picker',
      type: 'datetime',
      name: 'DateTime Picker',
      description: 'Combined date and time selection',
      icon: Calendar,
      category: 'advanced',
      popularity: 61,
      difficulty: 'medium'
    },
    {
      id: 'date-range',
      type: 'daterange',
      name: 'Date Range',
      description: 'Select start and end dates',
      icon: Calendar,
      category: 'advanced',
      isPro: true,
      popularity: 55,
      difficulty: 'hard'
    },

    // Advanced Input Elements
    {
      id: 'slider',
      type: 'range',
      name: 'Range Slider',
      description: 'Numeric range selection slider',
      icon: Sliders,
      category: 'advanced',
      popularity: 63,
      difficulty: 'medium'
    },
    {
      id: 'color-picker',
      type: 'color',
      name: 'Color Picker',
      description: 'Visual color selection tool',
      icon: Palette,
      category: 'advanced',
      isNew: true,
      popularity: 52,
      difficulty: 'medium'
    },
    {
      id: 'rating',
      type: 'rating',
      name: 'Star Rating',
      description: '5-star rating input component',
      icon: Star,
      category: 'advanced',
      popularity: 71,
      difficulty: 'medium'
    },
    {
      id: 'thumbs-rating',
      type: 'thumbs',
      name: 'Thumbs Rating',
      description: 'Thumbs up/down rating system',
      icon: ThumbsUp,
      category: 'advanced',
      popularity: 56,
      difficulty: 'easy'
    },
    {
      id: 'scale-rating',
      type: 'scale',
      name: 'Scale Rating',
      description: 'Numeric scale rating (1-10)',
      icon: BarChart3,
      category: 'advanced',
      popularity: 58,
      difficulty: 'medium'
    },
    {
      id: 'nps-score',
      type: 'nps',
      name: 'NPS Score',
      description: 'Net Promoter Score rating',
      icon: BarChart3,
      category: 'advanced',
      isPro: true,
      popularity: 45,
      difficulty: 'medium'
    },

    // File & Media Elements
    {
      id: 'file-upload',
      type: 'file',
      name: 'File Upload',
      description: 'Single file upload with drag & drop',
      icon: Upload,
      category: 'media',
      popularity: 77,
      difficulty: 'medium'
    },
    {
      id: 'multi-file-upload',
      type: 'multi-file',
      name: 'Multi File Upload',
      description: 'Multiple file upload with progress',
      icon: Upload,
      category: 'media',
      popularity: 72,
      difficulty: 'medium'
    },
    {
      id: 'image-upload',
      type: 'image-upload',
      name: 'Image Upload',
      description: 'Image upload with preview and cropping',
      icon: Camera,
      category: 'media',
      popularity: 74,
      difficulty: 'medium'
    },
    {
      id: 'signature',
      type: 'signature',
      name: 'Digital Signature',
      description: 'Capture digital signatures with stylus support',
      icon: Edit,
      category: 'data',
      isPro: true,
      popularity: 61,
      difficulty: 'hard'
    },

    // Layout Elements
    {
      id: 'heading',
      type: 'heading',
      name: 'Heading',
      description: 'Section headings and titles (H1-H6)',
      icon: Type,
      category: 'layout',
      popularity: 91,
      difficulty: 'easy'
    },
    {
      id: 'paragraph',
      type: 'paragraph',
      name: 'Paragraph',
      description: 'Text content and descriptions',
      icon: FileText,
      category: 'layout',
      popularity: 87,
      difficulty: 'easy'
    },
    {
      id: 'divider',
      type: 'divider',
      name: 'Divider',
      description: 'Visual separator between sections',
      icon: Filter,
      category: 'layout',
      popularity: 75,
      difficulty: 'easy'
    },
    {
      id: 'spacer',
      type: 'spacer',
      name: 'Spacer',
      description: 'Add vertical spacing between elements',
      icon: Plus,
      category: 'layout',
      popularity: 68,
      difficulty: 'easy'
    },
    {
      id: 'container',
      type: 'container',
      name: 'Container',
      description: 'Group elements with custom styling',
      icon: Grid,
      category: 'layout',
      popularity: 73,
      difficulty: 'medium'
    },
    {
      id: 'columns',
      type: 'columns',
      name: 'Columns Layout',
      description: 'Multi-column responsive layout',
      icon: Grid,
      category: 'layout',
      popularity: 66,
      difficulty: 'medium'
    },

    // Interactive Elements
    {
      id: 'button',
      type: 'button',
      name: 'Button',
      description: 'Interactive button with custom actions',
      icon: Plus,
      category: 'interactive',
      popularity: 88,
      difficulty: 'easy'
    },
    {
      id: 'like-button',
      type: 'like',
      name: 'Like Button',
      description: 'Interactive like/heart button with counter',
      icon: Heart,
      category: 'interactive',
      isNew: true,
      popularity: 48,
      difficulty: 'easy'
    },
    {
      id: 'social-share',
      type: 'social-share',
      name: 'Social Share',
      description: 'Share buttons for social platforms',
      icon: Share,
      category: 'interactive',
      popularity: 54,
      difficulty: 'medium'
    },
    {
      id: 'qr-code',
      type: 'qr-code',
      name: 'QR Code',
      description: 'Generate QR codes dynamically',
      icon: Camera,
      category: 'interactive',
      isNew: true,
      popularity: 43,
      difficulty: 'medium'
    },

    // Data & Analytics
    {
      id: 'calculation',
      type: 'calculation',
      name: 'Auto Calculate',
      description: 'Automatic calculations based on other fields',
      icon: BarChart3,
      category: 'data',
      isPro: true,
      popularity: 55,
      difficulty: 'hard'
    },
    {
      id: 'conditional',
      type: 'conditional',
      name: 'Conditional Logic',
      description: 'Show/hide fields based on conditions',
      icon: Zap,
      category: 'data',
      isPro: true,
      popularity: 67,
      difficulty: 'hard'
    },
    {
      id: 'progress-bar',
      type: 'progress',
      name: 'Progress Bar',
      description: 'Visual progress indicator',
      icon: BarChart3,
      category: 'data',
      popularity: 59,
      difficulty: 'medium'
    },
    {
      id: 'counter',
      type: 'counter',
      name: 'Counter',
      description: 'Numeric counter with increment/decrement',
      icon: Hash,
      category: 'data',
      popularity: 52,
      difficulty: 'easy'
    },

    // Location & Maps
    {
      id: 'location',
      type: 'location',
      name: 'Location Picker',
      description: 'Interactive map-based location selection',
      icon: MapPin,
      category: 'advanced',
      isPro: true,
      popularity: 58,
      difficulty: 'hard'
    },
    {
      id: 'address',
      type: 'address',
      name: 'Address Input',
      description: 'Complete address form with autocomplete',
      icon: MapPin,
      category: 'advanced',
      popularity: 71,
      difficulty: 'medium'
    },
    {
      id: 'country-select',
      type: 'country',
      name: 'Country Select',
      description: 'Country dropdown with flags',
      icon: Globe,
      category: 'basic',
      popularity: 64,
      difficulty: 'easy'
    },

    // Payment & Commerce
    {
      id: 'payment',
      type: 'payment',
      name: 'Payment Field',
      description: 'Secure payment collection with Stripe',
      icon: DollarSign,
      category: 'data',
      isPro: true,
      popularity: 49,
      difficulty: 'hard'
    },
    {
      id: 'price-input',
      type: 'price',
      name: 'Price Input',
      description: 'Currency-formatted price input',
      icon: DollarSign,
      category: 'basic',
      popularity: 58,
      difficulty: 'easy'
    },

    // Security & Verification
    {
      id: 'captcha',
      type: 'captcha',
      name: 'CAPTCHA',
      description: 'Bot protection with reCAPTCHA',
      icon: Shield,
      category: 'data',
      isPro: true,
      popularity: 46,
      difficulty: 'hard'
    },
    {
      id: 'otp-input',
      type: 'otp',
      name: 'OTP Input',
      description: 'One-time password verification',
      icon: Lock,
      category: 'advanced',
      isPro: true,
      popularity: 41,
      difficulty: 'medium'
    },

    // Communication
    {
      id: 'comment-box',
      type: 'comments',
      name: 'Comment Box',
      description: 'Rich text comment with replies',
      icon: MessageSquare,
      category: 'interactive',
      isPro: true,
      popularity: 54,
      difficulty: 'medium'
    },
    {
      id: 'feedback',
      type: 'feedback',
      name: 'Feedback Widget',
      description: 'Structured feedback collection',
      icon: MessageSquare,
      category: 'interactive',
      popularity: 62,
      difficulty: 'medium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Elements', count: formElements.length },
    { id: 'basic', name: 'Basic Inputs', count: formElements.filter(e => e.category === 'basic').length },
    { id: 'advanced', name: 'Advanced', count: formElements.filter(e => e.category === 'advanced').length },
    { id: 'layout', name: 'Layout', count: formElements.filter(e => e.category === 'layout').length },
    { id: 'media', name: 'Media', count: formElements.filter(e => e.category === 'media').length },
    { id: 'interactive', name: 'Interactive', count: formElements.filter(e => e.category === 'interactive').length },
    { id: 'data', name: 'Data & Logic', count: formElements.filter(e => e.category === 'data').length }
  ];

  const filteredElements = formElements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || element.category === selectedCategory;
    const matchesAdvanced = !showAdvancedOnly || element.category === 'advanced' || element.category === 'data';
    
    return matchesSearch && matchesCategory && matchesAdvanced;
  });

  const popularElements = formElements
    .filter(e => e.popularity >= 75)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8);

  const newElements = formElements.filter(e => e.isNew);
  const proElements = formElements.filter(e => e.isPro);

  const handleDragStart = (e: React.DragEvent, element: FormElement) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: element.type,
      name: element.name,
      id: `${element.type}_${Date.now()}`
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderElement = (element: FormElement) => (
    <div
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, element)}
      className={`cursor-move transition-all duration-300 hover:shadow-lg group relative overflow-hidden rounded-xl border-2 
        ${element.isPro ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : 
          element.isNew ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' : 
          'border-gray-200 bg-white hover:border-blue-300'}`}
    >
      {/* Pro/New Badge */}
      {(element.isPro || element.isNew) && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className={element.isPro ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'}>
            {element.isPro ? 'Pro' : 'New'}
          </Badge>
        </div>
      )}

      <Card className="border-0 bg-transparent shadow-none h-full">
        <CardHeader className={`${viewMode === 'list' ? 'pb-2' : 'pb-3'}`}>
          <div className={`flex ${viewMode === 'list' ? 'items-center gap-4' : 'flex-col items-center text-center'}`}>
            <div className={`p-3 rounded-xl ${
              element.isPro ? 'bg-purple-100' :
              element.isNew ? 'bg-green-100' : 'bg-blue-100'
            } group-hover:scale-110 transition-transform duration-300 ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
              <element.icon className={`h-6 w-6 ${
                element.isPro ? 'text-purple-600' :
                element.isNew ? 'text-green-600' : 'text-blue-600'
              }`} />
            </div>
            
            <div className={`${viewMode === 'list' ? 'flex-1 min-w-0' : ''}`}>
              <CardTitle className={`font-bold group-hover:text-blue-600 transition-colors ${
                viewMode === 'list' ? 'text-base mb-1' : 'text-sm mb-2'
              }`}>
                {element.name}
              </CardTitle>
              <p className={`text-gray-600 leading-relaxed ${
                viewMode === 'list' ? 'text-sm' : 'text-xs'
              }`}>
                {element.description}
              </p>
            </div>

            {viewMode === 'list' && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className={getDifficultyColor(element.difficulty)}>
                  {element.difficulty}
                </Badge>
                <Badge variant="outline">
                  {element.popularity}% popular
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        {viewMode === 'grid' && (
          <CardContent className="pt-0 pb-4">
            <div className="flex items-center justify-between">
              <Badge className={getDifficultyColor(element.difficulty)}>
                {element.difficulty}
              </Badge>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{element.popularity}%</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/95 to-white/95">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Element Library
          </h3>
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
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 border-gray-300"
          />
        </div>

        {/* Advanced Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Advanced elements only</span>
          <Switch checked={showAdvancedOnly} onCheckedChange={setShowAdvancedOnly} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="browse" className="h-full flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="grid w-full grid-cols-4 text-xs">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="pro">Pro</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <TabsContent value="browse" className="mt-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-1 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-xs"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* Elements Grid */}
              <div className={`grid gap-3 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
              }`}>
                {filteredElements.map(renderElement)}
              </div>

              {filteredElements.length === 0 && (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No elements found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setShowAdvancedOnly(false); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="popular" className="mt-4">
              <div className={`grid gap-3 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
              }`}>
                {popularElements.map(renderElement)}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-4">
              {newElements.length > 0 ? (
                <div className={`grid gap-3 ${
                  viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                }`}>
                  {newElements.map(renderElement)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No new elements</h3>
                  <p className="text-gray-600">Check back soon for new additions!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pro" className="mt-4">
              <div className={`grid gap-3 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
              }`}>
                {proElements.map(renderElement)}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Unlock Pro Elements</h4>
                </div>
                <p className="text-purple-700 text-sm mb-3">
                  Get access to advanced elements like digital signatures, payment fields, and conditional logic.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Upgrade to Pro
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedFormElementLibrary;
