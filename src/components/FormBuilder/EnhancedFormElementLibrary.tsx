
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { 
  Search, Type, Mail, Hash, Calendar, FileText, 
  List, CheckSquare, ToggleLeft, Image, Video,
  Columns, Container, Heading, AlignLeft, Minus,
  Upload, Palette, Star, Heart, MessageSquare,
  Phone, MapPin, CreditCard, Code, Table,
  Grid, Layers, Sparkles, Layout, Plus
} from 'lucide-react';
import { FormConfig, FormElement } from './types';

interface EnhancedFormElementLibraryProps {
  onElementAdd: (element: FormElement) => void;
  formConfig: FormConfig;
}

const ELEMENT_CATEGORIES = {
  'basic-inputs': {
    name: 'Basic Inputs',
    icon: Type,
    elements: [
      { type: 'text', label: 'Text Input', icon: Type, description: 'Single line text input field' },
      { type: 'email', label: 'Email', icon: Mail, description: 'Email input with validation' },
      { type: 'password', label: 'Password', icon: Type, description: 'Password input field' },
      { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input field' },
      { type: 'tel', label: 'Phone', icon: Phone, description: 'Phone number input' },
      { type: 'url', label: 'URL', icon: Code, description: 'Website URL input' },
      { type: 'search', label: 'Search', icon: Search, description: 'Search input field' },
      { type: 'textarea', label: 'Textarea', icon: FileText, description: 'Multi-line text input' },
    ]
  },
  'selection': {
    name: 'Selection & Choice',
    icon: List,
    elements: [
      { type: 'select', label: 'Dropdown', icon: List, description: 'Dropdown selection menu' },
      { type: 'multiselect', label: 'Multi Select', icon: List, description: 'Multiple selection dropdown' },
      { type: 'radio', label: 'Radio Group', icon: CheckSquare, description: 'Single choice radio buttons' },
      { type: 'radio-group', label: 'Radio Buttons', icon: CheckSquare, description: 'Radio button group' },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Single checkbox' },
      { type: 'checkbox-group', label: 'Checkbox Group', icon: CheckSquare, description: 'Multiple checkboxes' },
      { type: 'toggle', label: 'Toggle Switch', icon: ToggleLeft, description: 'On/off toggle switch' },
    ]
  },
  'date-time': {
    name: 'Date & Time',
    icon: Calendar,
    elements: [
      { type: 'date', label: 'Date Picker', icon: Calendar, description: 'Date selection input' },
      { type: 'time', label: 'Time Picker', icon: Calendar, description: 'Time selection input' },
      { type: 'datetime-local', label: 'Date & Time', icon: Calendar, description: 'Date and time picker' },
      { type: 'calendar', label: 'Calendar Widget', icon: Calendar, description: 'Full calendar widget' },
    ]
  },
  'file-media': {
    name: 'Files & Media',
    icon: Upload,
    elements: [
      { type: 'file', label: 'File Upload', icon: Upload, description: 'Single file upload' },
      { type: 'multi-file-upload', label: 'Multi File Upload', icon: Upload, description: 'Multiple file upload' },
      { type: 'image-upload', label: 'Image Upload', icon: Image, description: 'Image file upload' },
      { type: 'multi-image-upload', label: 'Multi Image Upload', icon: Image, description: 'Multiple image upload' },
      { type: 'image', label: 'Image Display', icon: Image, description: 'Display image' },
      { type: 'video', label: 'Video Player', icon: Video, description: 'Video embed' },
      { type: 'youtube', label: 'YouTube Video', icon: Video, description: 'YouTube video embed' },
    ]
  },
  'layout': {
    name: 'Layout & Structure',
    icon: Layout,
    elements: [
      { type: 'container', label: 'Container', icon: Container, description: 'Group elements together' },
      { type: '2-columns', label: '2 Columns', icon: Columns, description: 'Two column layout' },
      { type: '3-columns', label: '3 Columns', icon: Columns, description: 'Three column layout' },
      { type: '4-columns', label: '4 Columns', icon: Columns, description: 'Four column layout' },
      { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line separator' },
      { type: 'spacer', label: 'Spacer', icon: Minus, description: 'Add vertical spacing' },
    ]
  },
  'content': {
    name: 'Content & Text',
    icon: Heading,
    elements: [
      { type: 'heading', label: 'Heading', icon: Heading, description: 'Section heading text' },
      { type: 'h1', label: 'H1 Heading', icon: Heading, description: 'Large heading' },
      { type: 'h2', label: 'H2 Heading', icon: Heading, description: 'Medium heading' },
      { type: 'h3', label: 'H3 Heading', icon: Heading, description: 'Small heading' },
      { type: 'paragraph', label: 'Paragraph', icon: AlignLeft, description: 'Paragraph text' },
      { type: 'p', label: 'Text Block', icon: AlignLeft, description: 'Text content block' },
      { type: 'quote', label: 'Quote', icon: MessageSquare, description: 'Blockquote text' },
      { type: 'link', label: 'Link', icon: Code, description: 'Hyperlink element' },
    ]
  },
  'advanced': {
    name: 'Advanced Elements',
    icon: Sparkles,
    elements: [
      { type: 'rating', label: 'Star Rating', icon: Star, description: 'Star rating input' },
      { type: 'star-rating', label: 'Rating Widget', icon: Star, description: 'Star rating widget' },
      { type: 'scale-rating', label: 'Scale Rating', icon: Star, description: 'Numeric scale rating' },
      { type: 'range', label: 'Range Slider', icon: ToggleLeft, description: 'Range input slider' },
      { type: 'color', label: 'Color Picker', icon: Palette, description: 'Color selection input' },
      { type: 'signature', label: 'Signature Pad', icon: Type, description: 'Digital signature pad' },
      { type: 'location', label: 'Location Picker', icon: MapPin, description: 'Location picker' },
      { type: 'map', label: 'Map Widget', icon: MapPin, description: 'Interactive map' },
      { type: 'payment', label: 'Payment Form', icon: CreditCard, description: 'Payment form fields' },
      { type: 'captcha', label: 'Captcha', icon: CheckSquare, description: 'Bot protection' },
    ]
  },
  'data-display': {
    name: 'Data & Display',
    icon: Table,
    elements: [
      { type: 'table', label: 'Data Table', icon: Table, description: 'Data table' },
      { type: 'chart', label: 'Chart Widget', icon: Grid, description: 'Data visualization' },
      { type: 'list', label: 'Bullet List', icon: List, description: 'Bulleted list' },
      { type: 'code-block', label: 'Code Block', icon: Code, description: 'Code display' },
      { type: 'html', label: 'HTML Block', icon: Code, description: 'Custom HTML' },
      { type: 'static-html', label: 'Static HTML', icon: Code, description: 'Static HTML content' },
      { type: 'markdown', label: 'Markdown', icon: FileText, description: 'Markdown content' },
    ]
  }
};

const EnhancedFormElementLibrary: React.FC<EnhancedFormElementLibraryProps> = ({ 
  onElementAdd, 
  formConfig 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('basic-inputs');

  const handleElementAdd = (elementType: string) => {
    const newElement: FormElement = {
      id: Date.now().toString(),
      type: elementType as any,
      label: getDefaultLabel(elementType),
      placeholder: getDefaultPlaceholder(elementType),
      required: false,
      validation: {},
      options: getDefaultOptions(elementType),
      settings: getDefaultSettings(elementType)
    };

    onElementAdd(newElement);
  };

  const getDefaultLabel = (elementType: string): string => {
    const element = Object.values(ELEMENT_CATEGORIES)
      .flatMap(cat => cat.elements)
      .find(el => el.type === elementType);
    return element?.label || 'Form Field';
  };

  const getDefaultPlaceholder = (elementType: string): string => {
    const placeholders: { [key: string]: string } = {
      'text': 'Enter text...',
      'email': 'Enter your email address',
      'tel': 'Enter phone number',
      'password': 'Enter password',
      'search': 'Search...',
      'url': 'https://example.com',
      'number': 'Enter number',
      'textarea': 'Enter your message...',
      'location': 'Enter address or location'
    };
    return placeholders[elementType] || '';
  };

  const getDefaultOptions = (elementType: string): string[] => {
    if (['select', 'checkbox-group', 'radio', 'radio-group', 'multiselect'].includes(elementType)) {
      return ['Option 1', 'Option 2', 'Option 3'];
    }
    return [];
  };

  const getDefaultSettings = (elementType: string): any => {
    const settings: { [key: string]: any } = {
      'youtube': { url: '', autoplay: false, controls: true },
      'rating': { maxStars: 5 },
      'star-rating': { maxStars: 5 },
      'scale-rating': { minValue: 1, maxValue: 10 },
      'range': { min: 0, max: 100, step: 1 },
      'file': { accept: '*', multiple: false },
      'image': { accept: 'image/*', multiple: false },
      'heading': { level: 2, text: 'Section Heading' },
      'h1': { text: 'Main Heading' },
      'h2': { text: 'Section Heading' },
      'h3': { text: 'Subsection Heading' },
      'paragraph': { text: 'This is a paragraph of descriptive text.' },
      'p': { text: 'This is a text block.' },
      'quote': { text: 'This is a quote.' }
    };
    return settings[elementType] || {};
  };

  const currentCategory = ELEMENT_CATEGORIES[selectedCategory as keyof typeof ELEMENT_CATEGORIES];
  const filteredElements = currentCategory ? 
    currentCategory.elements.filter(element =>
      element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col bg-white/95 backdrop-blur-md border-gray-200/50">
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-bold">Form Elements</h3>
              <p className="text-blue-100 text-sm">Click to add elements</p>
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
                      <Badge variant="outline" className="ml-auto text-xs">
                        {category.elements.length}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentCategory && (
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <currentCategory.icon className="h-4 w-4 text-blue-500" />
                <span className="font-semibold text-gray-700">{currentCategory.name}</span>
                <Badge variant="outline" className="text-xs">
                  {filteredElements.length}
                </Badge>
              </div>
            </div>
          )}

          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {filteredElements.map((element) => (
                <Tooltip key={element.type}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => handleElementAdd(element.type)}
                        className="w-full p-3 h-auto justify-start hover:shadow-md hover:border-blue-300 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <element.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {element.label}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {element.description}
                            </p>
                          </div>
                          <Plus className="h-4 w-4 text-gray-400" />
                        </div>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white border shadow-lg">
                    <div className="max-w-xs">
                      <p className="font-semibold">{element.label}</p>
                      <p className="text-sm text-gray-600">{element.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click to add to form
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ScrollArea>

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

export default EnhancedFormElementLibrary;
