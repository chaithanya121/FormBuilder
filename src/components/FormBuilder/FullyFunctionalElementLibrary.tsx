import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { 
  Search, Type, FileText, AtSign, Phone, Hash, Lock, Link2,
  List, Radio, CheckSquare, ToggleLeft, Calendar, Clock,
  Sliders, Palette, Star, ThumbsUp, BarChart3, Upload, Camera,
  Edit, Filter, Plus, Grid, Heart, Share, MapPin, Globe,
  DollarSign, CreditCard, Shield, MessageSquare, Layers,
  Container, Minus
} from 'lucide-react';
import { DragStartProps, FormElement, FormConfig } from './types';

interface FormElementLibraryProps extends DragStartProps {
  onElementAdd: (element: FormElement) => void;
  formConfig: FormConfig;
}

// Comprehensive element definitions based on user requirements
const ELEMENT_CATEGORIES = {
  basic: {
    name: 'Basic Elements',
    icon: Type,
    elements: [
      { type: 'text', label: 'Text Input', icon: Type, description: 'Single line text input for names, titles, etc.', popularity: 95, difficulty: 'easy' },
      { type: 'textarea', label: 'Textarea', icon: FileText, description: 'Multi-line text input for longer content', popularity: 88, difficulty: 'easy' },
      { type: 'email', label: 'Email Input', icon: AtSign, description: 'Email input with built-in validation', popularity: 92, difficulty: 'easy' },
      { type: 'phone', label: 'Phone Input', icon: Phone, description: 'Phone number input with format validation', popularity: 78, difficulty: 'easy' },
      { type: 'number', label: 'Number Input', icon: Hash, description: 'Numeric input with increment/decrement controls', popularity: 76, difficulty: 'easy' },
      { type: 'password', label: 'Password Input', icon: Lock, description: 'Secure password input with visibility toggle', popularity: 85, difficulty: 'easy' },
      { type: 'url', label: 'URL Input', icon: Link2, description: 'Website URL input with validation', popularity: 67, difficulty: 'easy' },
      { type: 'search', label: 'Search Input', icon: Search, description: 'Search input with autocomplete functionality', popularity: 71, difficulty: 'easy' },
      { type: 'price', label: 'Price Input', icon: DollarSign, description: 'Currency-formatted price input', popularity: 58, difficulty: 'easy' },
    ]
  },
  selection: {
    name: 'Selection Elements',
    icon: List,
    elements: [
      { type: 'select', label: 'Dropdown Select', icon: List, description: 'Single selection from dropdown list', popularity: 85, difficulty: 'easy' },
      { type: 'multiselect', label: 'Multi Select', icon: List, description: 'Multiple selection dropdown with tags', popularity: 68, difficulty: 'medium' },
      { type: 'radio', label: 'Radio Buttons', icon: Radio, description: 'Single selection from visible options', popularity: 82, difficulty: 'easy' },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Single checkbox for yes/no questions', popularity: 89, difficulty: 'easy' },
      { type: 'checkbox-group', label: 'Checkbox Group', icon: CheckSquare, description: 'Multiple selection checkboxes', popularity: 84, difficulty: 'easy' },
      { type: 'toggle', label: 'Toggle Switch', icon: ToggleLeft, description: 'Modern on/off toggle switch', popularity: 69, difficulty: 'easy' },
      { type: 'country', label: 'Country Select', icon: Globe, description: 'Country dropdown with flags', popularity: 64, difficulty: 'easy' },
    ]
  },
  datetime: {
    name: 'Date & Time',
    icon: Calendar,
    elements: [
      { type: 'date', label: 'Date Picker', icon: Calendar, description: 'Calendar-based date selection', popularity: 74, difficulty: 'medium' },
      { type: 'time', label: 'Time Picker', icon: Clock, description: 'Time selection with hour/minute controls', popularity: 65, difficulty: 'medium' },
      { type: 'datetime', label: 'DateTime Picker', icon: Calendar, description: 'Combined date and time selection', popularity: 61, difficulty: 'medium' },
      { type: 'daterange', label: 'Date Range', icon: Calendar, description: 'Select start and end dates', popularity: 55, difficulty: 'hard', isPro: true },
    ]
  },
  advanced: {
    name: 'Advanced Inputs',
    icon: Sliders,
    elements: [
      { type: 'slider', label: 'Range Slider', icon: Sliders, description: 'Numeric range selection slider', popularity: 63, difficulty: 'medium' },
      { type: 'color', label: 'Color Picker', icon: Palette, description: 'Visual color selection tool', popularity: 52, difficulty: 'medium', isNew: true },
      { type: 'rating', label: 'Star Rating', icon: Star, description: '5-star rating input component', popularity: 71, difficulty: 'medium' },
      { type: 'thumbs', label: 'Thumbs Rating', icon: ThumbsUp, description: 'Thumbs up/down rating system', popularity: 56, difficulty: 'easy' },
      { type: 'scale', label: 'Scale Rating', icon: BarChart3, description: 'Numeric scale rating (1-10)', popularity: 58, difficulty: 'medium' },
      { type: 'nps', label: 'NPS Score', icon: BarChart3, description: 'Net Promoter Score rating', popularity: 45, difficulty: 'medium', isPro: true },
      { type: 'location', label: 'Location Picker', icon: MapPin, description: 'Interactive map-based location selection', popularity: 58, difficulty: 'hard', isPro: true },
      { type: 'address', label: 'Address Input', icon: MapPin, description: 'Complete address form with autocomplete', popularity: 71, difficulty: 'medium' },
      { type: 'signature', label: 'Digital Signature', icon: Edit, description: 'Capture digital signatures with stylus support', popularity: 61, difficulty: 'hard', isPro: true },
      { type: 'otp', label: 'OTP Input', icon: Lock, description: 'One-time password verification', popularity: 41, difficulty: 'medium', isPro: true },
    ]
  },
  media: {
    name: 'Media & Files',
    icon: Upload,
    elements: [
      { type: 'file', label: 'File Upload', icon: Upload, description: 'Single file upload with drag & drop', popularity: 77, difficulty: 'medium' },
      { type: 'multi-file', label: 'Multi File Upload', icon: Upload, description: 'Multiple file upload with progress', popularity: 72, difficulty: 'medium' },
      { type: 'image-upload', label: 'Image Upload', icon: Camera, description: 'Image upload with preview and cropping', popularity: 74, difficulty: 'medium' },
      { type: 'youtube', label: 'YouTube Video', icon: FileText, description: 'YouTube video embed', popularity: 65, difficulty: 'medium' },
    ]
  },
  layout: {
    name: 'Layout Elements',
    icon: Grid,
    elements: [
      { type: 'heading', label: 'Heading', icon: Type, description: 'Section headings and titles (H1-H6)', popularity: 91, difficulty: 'easy' },
      { type: 'paragraph', label: 'Paragraph', icon: FileText, description: 'Text content and descriptions', popularity: 87, difficulty: 'easy' },
      { type: 'divider', label: 'Divider', icon: Filter, description: 'Visual separator between sections', popularity: 75, difficulty: 'easy' },
      { type: 'spacer', label: 'Spacer', icon: Minus, description: 'Add vertical spacing between elements', popularity: 68, difficulty: 'easy' },
      { type: 'container', label: 'Container', icon: Container, description: 'Group elements with custom styling', popularity: 73, difficulty: 'medium' },
    ]
  },
  interactive: {
    name: 'Interactive',
    icon: Heart,
    elements: [
      { type: 'button', label: 'Button', icon: Plus, description: 'Interactive button with custom actions', popularity: 88, difficulty: 'easy' },
      { type: 'like', label: 'Like Button', icon: Heart, description: 'Interactive like/heart button with counter', popularity: 48, difficulty: 'easy', isNew: true },
      { type: 'social-share', label: 'Social Share', icon: Share, description: 'Share buttons for social platforms', popularity: 54, difficulty: 'medium' },
      { type: 'comments', label: 'Comment Box', icon: MessageSquare, description: 'Rich text comment with replies', popularity: 54, difficulty: 'medium', isPro: true },
      { type: 'feedback', label: 'Feedback Widget', icon: MessageSquare, description: 'Structured feedback collection', popularity: 62, difficulty: 'medium' },
    ]
  },
  data: {
    name: 'Data & Analytics',
    icon: BarChart3,
    elements: [
      { type: 'progress', label: 'Progress Bar', icon: BarChart3, description: 'Visual progress indicator', popularity: 59, difficulty: 'medium' },
      { type: 'counter', label: 'Counter', icon: Hash, description: 'Numeric counter with increment/decrement', popularity: 52, difficulty: 'easy' },
      { type: 'calculation', label: 'Auto Calculate', icon: BarChart3, description: 'Automatic calculations based on other fields', popularity: 55, difficulty: 'hard', isPro: true },
      { type: 'conditional', label: 'Conditional Logic', icon: Edit, description: 'Show/hide fields based on conditions', popularity: 67, difficulty: 'hard', isPro: true },
    ]
  },
  security: {
    name: 'Security & Payment',
    icon: Shield,
    elements: [
      { type: 'payment', label: 'Payment Field', icon: CreditCard, description: 'Secure payment collection with Stripe', popularity: 49, difficulty: 'hard', isPro: true },
      { type: 'captcha', label: 'CAPTCHA', icon: Shield, description: 'Bot protection with reCAPTCHA', popularity: 46, difficulty: 'hard', isPro: true },
    ]
  }
};

const FormElementLibrary: React.FC<FormElementLibraryProps> = ({ onDragStart, onElementAdd, formConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'dropdown'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('basic');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, elementType: string) => {
    console.log('Drag started for element:', elementType);
    e.dataTransfer.setData('application/x-form-element', elementType);
    e.dataTransfer.setData('text/plain', elementType);
    e.dataTransfer.effectAllowed = 'copy';
    
    e.dataTransfer.setDragImage(e.currentTarget, 50, 50);
    
    if (onDragStart) {
      onDragStart(e, elementType);
    }
  };

  const handleElementClick = (elementType: string) => {
    console.log('Element clicked:', elementType);
    
    // Create a new form element and add it directly
    const newElement: FormElement = {
      id: Date.now().toString(),
      type: elementType,
      label: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
      placeholder: `Enter ${elementType}...`,
      required: false,
      settings: {},
      fieldStyles: {
        className: 'w-full',
        backgroundColor: '#ffffff',
        borderColor: '#d1d5db',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '16px',
        fontFamily: 'Inter',
        color: '#374151'
      },
      labelStyles: {
        color: '#374151',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Inter'
      }
    };
    
    onElementAdd(newElement);
  };

  const allElements = Object.values(ELEMENT_CATEGORIES).flatMap(category => 
    category.elements.map(element => ({ ...element, category: category.name }))
  );

  const filteredElements = allElements.filter(element =>
    element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCategory = ELEMENT_CATEGORIES[selectedCategory as keyof typeof ELEMENT_CATEGORIES];

  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col bg-white/95 backdrop-blur-md border-gray-200/50">
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-bold">Elements Library</h3>
              <p className="text-blue-100 text-sm">Drag elements to canvas</p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="space-y-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search elements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex-1"
              >
                <Grid className="h-4 w-4 mr-2" />
                Categories
              </Button>
              <Button
                variant={viewMode === 'dropdown' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('dropdown')}
                className="flex-1"
              >
                <List className="h-4 w-4 mr-2" />
                Dropdown
              </Button>
            </div>
          </div>

          {viewMode === 'dropdown' && (
            <div className="space-y-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {Object.entries(ELEMENT_CATEGORIES).map(([key, category]) => (
                    <SelectItem key={key} value={key} className="cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {currentCategory.elements.map((element) => (
                    <motion.div
                      key={element.type}
                      draggable
                      onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, element.type)}
                      onClick={() => handleElementClick(element.type)}
                      className="group p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:cursor-grabbing hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-95"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <element.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {element.label}
                            </p>
                            {element.isPro && <Badge variant="secondary" className="text-xs">Pro</Badge>}
                            {element.isNew && <Badge variant="outline" className="text-xs text-green-600">New</Badge>}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {element.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">
                              Popularity: {element.popularity}%
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {element.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {viewMode === 'grid' && (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
                <TabsTrigger value="selection" className="text-xs">Select</TabsTrigger>
                <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
                <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1">
                {Object.entries(ELEMENT_CATEGORIES).map(([key, category]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <category.icon className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold text-gray-700">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.elements.length}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {category.elements.map((element) => (
                          <Tooltip key={element.type}>
                            <TooltipTrigger asChild>
                              <motion.div
                                draggable
                                onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, element.type)}
                                onClick={() => handleElementClick(element.type)}
                                className="group p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:cursor-grabbing hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-95"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <element.icon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium text-gray-900 text-sm truncate">
                                        {element.label}
                                      </p>
                                      {element.isPro && <Badge variant="secondary" className="text-xs">Pro</Badge>}
                                      {element.isNew && <Badge variant="outline" className="text-xs text-green-600">New</Badge>}
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                      {element.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-white border shadow-lg">
                              <div className="max-w-xs">
                                <p className="font-semibold">{element.label}</p>
                                <p className="text-sm text-gray-600">{element.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {element.difficulty}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {element.popularity}% popularity
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Drag to canvas to add
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          )}

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 text-center">
              {Object.values(ELEMENT_CATEGORIES).reduce((acc, cat) => acc + cat.elements.length, 0)} elements available
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FormElementLibrary;
