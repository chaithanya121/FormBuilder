import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Type, Mail, Phone, Calendar, CheckSquare, Radio, 
  List, Upload, Star, Hash, Link, MapPin, Clock,
  User, Building, CreditCard, Palette, Image,
  FileText, ToggleLeft, Sliders, MessageSquare,
  Eye, EyeOff, Search, Filter, Play, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormElementLibraryProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
  onClose: () => void;
}

const EnhancedFormElementLibrary: React.FC<FormElementLibraryProps> = ({ onDragStart, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formElements = [
    // Basic Input Elements
    {
      type: 'text',
      name: 'Text Input',
      icon: Type,
      category: 'input',
      description: 'Single line text input',
      popular: true
    },
    {
      type: 'email',
      name: 'Email',
      icon: Mail,
      category: 'input',
      description: 'Email address input with validation',
      popular: true
    },
    {
      type: 'tel',
      name: 'Phone',
      icon: Phone,
      category: 'input',
      description: 'Phone number input'
    },
    {
      type: 'password',
      name: 'Password',
      icon: EyeOff,
      category: 'input',
      description: 'Password input with masking'
    },
    {
      type: 'search',
      name: 'Search',
      icon: Search,
      category: 'input',
      description: 'Search input field'
    },
    {
      type: 'url',
      name: 'Website URL',
      icon: Link,
      category: 'input',
      description: 'URL input with validation'
    },
    
    // Selection Elements
    {
      type: 'select',
      name: 'Dropdown',
      icon: List,
      category: 'selection',
      description: 'Single selection dropdown',
      popular: true
    },
    {
      type: 'checkbox',
      name: 'Checkbox',
      icon: CheckSquare,
      category: 'selection',
      description: 'Multiple selection checkboxes',
      popular: true
    },
    {
      type: 'radio',
      name: 'Radio Button',
      icon: Radio,
      category: 'selection',
      description: 'Single selection radio buttons'
    },
    {
      type: 'multi-select',
      name: 'Multi Select',
      icon: List,
      category: 'selection',
      description: 'Multiple selection dropdown'
    },
    {
      type: 'toggle',
      name: 'Toggle Switch',
      icon: ToggleLeft,
      category: 'selection',
      description: 'On/off toggle switch'
    },
    
    // Number & Date Elements
    {
      type: 'number',
      name: 'Number',
      icon: Hash,
      category: 'number',
      description: 'Numeric input with validation'
    },
    {
      type: 'range',
      name: 'Range Slider',
      icon: Sliders,
      category: 'number',
      description: 'Number selection with slider'
    },
    {
      type: 'date',
      name: 'Date Picker',
      icon: Calendar,
      category: 'date',
      description: 'Date selection input',
      popular: true
    },
    {
      type: 'time',
      name: 'Time Picker',
      icon: Clock,
      category: 'date',
      description: 'Time selection input'
    },
    {
      type: 'datetime-local',
      name: 'Date & Time',
      icon: Calendar,
      category: 'date',
      description: 'Combined date and time picker'
    },
    
    // Text Areas
    {
      type: 'textarea',
      name: 'Text Area',
      icon: MessageSquare,
      category: 'text',
      description: 'Multi-line text input',
      popular: true
    },
    {
      type: 'rich-text',
      name: 'Rich Text Editor',
      icon: FileText,
      category: 'text',
      description: 'WYSIWYG text editor'
    },
    
    // Media Elements
    {
      type: 'file',
      name: 'File Upload',
      icon: Upload,
      category: 'media',
      description: 'File upload input',
      popular: true
    },
    {
      type: 'image',
      name: 'Image Upload',
      icon: Image,
      category: 'media',
      description: 'Image-specific upload'
    },
    {
      type: 'youtube',
      name: 'YouTube Video',
      icon: Play,
      category: 'media',
      description: 'Embed YouTube video',
      new: true
    },
    
    // Advanced Elements
    {
      type: 'rating',
      name: 'Star Rating',
      icon: Star,
      category: 'advanced',
      description: 'Star-based rating system'
    },
    {
      type: 'scale-rating',
      name: 'Scale Rating',
      icon: Sliders,
      category: 'advanced',
      description: 'Numeric scale rating (1-10)',
      new: true
    },
    {
      type: 'location',
      name: 'Location',
      icon: MapPin,
      category: 'advanced',
      description: 'Address or location input'
    },
    {
      type: 'signature',
      name: 'Digital Signature',
      icon: User,
      category: 'advanced',
      description: 'Digital signature pad'
    },
    {
      type: 'payment',
      name: 'Payment',
      icon: CreditCard,
      category: 'advanced',
      description: 'Credit card payment form'
    },
    {
      type: 'color',
      name: 'Color Picker',
      icon: Palette,
      category: 'advanced',
      description: 'Color selection input'
    },
    
    // Layout Elements
    {
      type: 'section',
      name: 'Section',
      icon: Building,
      category: 'layout',
      description: 'Group related fields'
    },
    {
      type: 'divider',
      name: 'Divider',
      icon: Type,
      category: 'layout',
      description: 'Visual separator line'
    },
    {
      type: 'heading',
      name: 'Heading',
      icon: Type,
      category: 'layout',
      description: 'Section heading text'
    },
    {
      type: 'paragraph',
      name: 'Paragraph',
      icon: FileText,
      category: 'layout',
      description: 'Descriptive text block'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Elements', count: formElements.length },
    { value: 'input', label: 'Input Fields', count: formElements.filter(e => e.category === 'input').length },
    { value: 'selection', label: 'Selection', count: formElements.filter(e => e.category === 'selection').length },
    { value: 'number', label: 'Numbers', count: formElements.filter(e => e.category === 'number').length },
    { value: 'date', label: 'Date & Time', count: formElements.filter(e => e.category === 'date').length },
    { value: 'text', label: 'Text Areas', count: formElements.filter(e => e.category === 'text').length },
    { value: 'media', label: 'Media', count: formElements.filter(e => e.category === 'media').length },
    { value: 'advanced', label: 'Advanced', count: formElements.filter(e => e.category === 'advanced').length },
    { value: 'layout', label: 'Layout', count: formElements.filter(e => e.category === 'layout').length }
  ];

  const filteredElements = formElements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || element.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularElements = formElements.filter(element => element.popular);
  const newElements = formElements.filter(element => element.new);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, elementType: string) => {
    onDragStart(e, elementType);
  };

  return (
    <Card className="h-full flex flex-col bg-white border-r border-slate-200">
      {/* Header */}
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-bold">Form Elements</h3>
              <p className="text-blue-100 text-sm">Drag & drop to add elements</p>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 w-8 h-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="p-4 border-b border-slate-200 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search elements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-y-auto h-screen pb-[calc(43vh-100px)]">
          {/* Popular Elements */}
          {selectedCategory === 'all' && searchTerm === '' && (
            <div className="p-4 border-b border-slate-200">
              <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Popular Elements
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {popularElements.slice(0, 6).map((element, index) => (
                  <div
                    key={`popular-${element.type}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element.type)}
                    className="p-3 border border-slate-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <element.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                      <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
                        {element.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Elements */}
          {selectedCategory === 'all' && searchTerm === '' && newElements.length > 0 && (
            <div className="p-4 border-b border-slate-200">
              <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 text-xs">NEW</Badge>
                Latest Elements
              </h4>
              <div className="space-y-2">
                {newElements.map((element, index) => (
                  <div
                    key={`new-${element.type}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element.type)}
                    className="p-3 border border-slate-200 rounded-lg cursor-move hover:border-green-300 hover:bg-green-50/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <element.icon className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 group-hover:text-green-700">
                              {element.name}
                            </span>
                            <Badge className="bg-green-100 text-green-700 text-xs">NEW</Badge>
                          </div>
                          <p className="text-xs text-gray-500">{element.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Elements */}
          <div className="p-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">
              {selectedCategory === 'all' ? 'All Elements' : categories.find(c => c.value === selectedCategory)?.label}
              <Badge variant="outline" className="ml-2 text-xs">
                {filteredElements.length}
              </Badge>
            </h4>
            
            <AnimatePresence>
              <div className="space-y-2">
                {filteredElements.map((element, index) => (
                  <div
                    key={element.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element.type)}
                    className="p-4 border border-slate-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                          <element.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 group-hover:text-blue-700">
                              {element.name}
                            </span>
                            {element.popular && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                            {element.new && (
                              <Badge className="bg-green-100 text-green-700 text-xs">NEW</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{element.description}</p>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs capitalize">
                        {element.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatePresence>

            {filteredElements.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Search className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-gray-500 text-sm">No elements found</p>
                <p className="text-gray-400 text-xs">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFormElementLibrary;
