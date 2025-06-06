
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Type, Mail, Hash, Calendar, FileText, 
  List, CheckSquare, ToggleLeft, Image, Video,
  Columns, Container, Heading, AlignLeft, Minus,
  Upload, Palette, Star, Heart, MessageSquare,
  Phone, MapPin, CreditCard, Code, Table,
  Grid, Layers, Sparkles, Info, Layout
} from 'lucide-react';
import { DragStartProps } from './types';

interface FormElementLibraryProps extends DragStartProps {}

const ELEMENT_CATEGORIES = {
  basic: {
    name: 'Basic Inputs',
    icon: Type,
    elements: [
      { type: 'text', label: 'Text Input', icon: Type, description: 'Single line text input field' },
      { type: 'email', label: 'Email', icon: Mail, description: 'Email input with validation' },
      { type: 'password', label: 'Password', icon: Type, description: 'Password input field' },
      { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input field' },
      { type: 'tel', label: 'Phone', icon: Phone, description: 'Phone number input' },
      { type: 'url', label: 'URL', icon: Code, description: 'Website URL input' },
      { type: 'textarea', label: 'Textarea', icon: FileText, description: 'Multi-line text input' },
    ]
  },
  selection: {
    name: 'Selection',
    icon: List,
    elements: [
      { type: 'select', label: 'Dropdown', icon: List, description: 'Dropdown selection menu' },
      { type: 'radio', label: 'Radio Group', icon: CheckSquare, description: 'Single choice radio buttons' },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Single checkbox' },
      { type: 'checkbox-group', label: 'Checkbox Group', icon: CheckSquare, description: 'Multiple checkboxes' },
      { type: 'multiselect', label: 'Multi Select', icon: List, description: 'Multiple selection dropdown' },
      { type: 'toggle', label: 'Toggle Switch', icon: ToggleLeft, description: 'On/off toggle switch' },
    ]
  },
  datetime: {
    name: 'Date & Time',
    icon: Calendar,
    elements: [
      { type: 'date', label: 'Date Picker', icon: Calendar, description: 'Date selection input' },
      { type: 'time', label: 'Time Picker', icon: Calendar, description: 'Time selection input' },
      { type: 'calendar', label: 'Calendar', icon: Calendar, description: 'Full calendar widget' },
    ]
  },
  media: {
    name: 'Media & Files',
    icon: Upload,
    elements: [
      { type: 'file', label: 'File Upload', icon: Upload, description: 'Single file upload' },
      { type: 'multi-file-upload', label: 'Multi File Upload', icon: Upload, description: 'Multiple file upload' },
      { type: 'image-upload', label: 'Image Upload', icon: Image, description: 'Image file upload' },
      { type: 'multi-image-upload', label: 'Multi Image Upload', icon: Image, description: 'Multiple image upload' },
      { type: 'image', label: 'Image', icon: Image, description: 'Display image' },
      { type: 'video', label: 'Video', icon: Video, description: 'Video embed' },
      { type: 'youtube', label: 'YouTube', icon: Video, description: 'YouTube video embed' },
    ]
  },
  layout: {
    name: 'Layout',
    icon: Columns,
    elements: [
      { type: 'container', label: 'Container', icon: Container, description: 'Group elements together' },
      { type: '2-columns', label: '2 Columns', icon: Columns, description: 'Two column layout' },
      { type: '3-columns', label: '3 Columns', icon: Columns, description: 'Three column layout' },
      { type: '4-columns', label: '4 Columns', icon: Columns, description: 'Four column layout' },
      { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line separator' },
      { type: 'spacer', label: 'Spacer', icon: Minus, description: 'Add vertical spacing' },
    ]
  },
  content: {
    name: 'Content',
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
  advanced: {
    name: 'Advanced',
    icon: Sparkles,
    elements: [
      { type: 'rating', label: 'Rating', icon: Star, description: 'Star rating input' },
      { type: 'star-rating', label: 'Star Rating', icon: Star, description: 'Star rating widget' },
      { type: 'scale-rating', label: 'Scale Rating', icon: Star, description: 'Numeric scale rating' },
      { type: 'range', label: 'Range Slider', icon: ToggleLeft, description: 'Range input slider' },
      { type: 'color', label: 'Color Picker', icon: Palette, description: 'Color selection input' },
      { type: 'signature', label: 'Signature', icon: Type, description: 'Digital signature pad' },
      { type: 'location', label: 'Location', icon: MapPin, description: 'Location picker' },
      { type: 'map', label: 'Map', icon: MapPin, description: 'Interactive map' },
      { type: 'payment', label: 'Payment', icon: CreditCard, description: 'Payment form fields' },
      { type: 'captcha', label: 'Captcha', icon: CheckSquare, description: 'Bot protection' },
    ]
  },
  data: {
    name: 'Data Display',
    icon: Table,
    elements: [
      { type: 'table', label: 'Table', icon: Table, description: 'Data table' },
      { type: 'chart', label: 'Chart', icon: Grid, description: 'Data visualization' },
      { type: 'list', label: 'List', icon: List, description: 'Bulleted list' },
      { type: 'code-block', label: 'Code Block', icon: Code, description: 'Code display' },
      { type: 'html', label: 'HTML Block', icon: Code, description: 'Custom HTML' },
      { type: 'static-html', label: 'Static HTML', icon: Code, description: 'Static HTML content' },
      { type: 'markdown', label: 'Markdown', icon: FileText, description: 'Markdown content' },
    ]
  }
};

const FormElementLibrary: React.FC<FormElementLibraryProps> = ({ onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'dropdown'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('basic');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, elementType: string) => {
    console.log('Drag started for element:', elementType);
    e.dataTransfer.setData('application/x-form-element', elementType);
    e.dataTransfer.effectAllowed = 'copy';
    if (onDragStart) {
      onDragStart(e, elementType);
    }
  };

  const handleElementClick = (elementType: string) => {
    if (onDragStart) {
      // Create a proper mock drag event or use a different approach
      console.log('Element clicked:', elementType);
      // For now, we'll just call onDragStart with null event to indicate it's a click
      onDragStart(null as any, elementType);
    }
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
          {/* Search and View Mode */}
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
                Grid
              </Button>
              <Button
                variant={viewMode === 'dropdown' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('dropdown')}
                className="flex-1"
              >
                <Layout className="h-4 w-4 mr-2" />
                Dropdown
              </Button>
            </div>
          </div>

          {/* Dropdown View */}
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
                  {currentCategory.elements.map((element, index) => (
                    <div
                      key={element.type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, element.type)}
                      onClick={() => handleElementClick(element.type)}
                      className="group p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:cursor-grabbing hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-95"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <element.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {element.label}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {element.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Grid View with Tabs */}
          {viewMode === 'grid' && (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
                <TabsTrigger value="selection" className="text-xs">Select</TabsTrigger>
                <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
                <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
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
                        {category.elements.map((element, index) => (
                          <Tooltip key={element.type}>
                            <TooltipTrigger asChild>
                              <div
                                draggable
                                onDragStart={(e) => handleDragStart(e, element.type)}
                                onClick={() => handleElementClick(element.type)}
                                className="group p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:cursor-grabbing hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-95"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <element.icon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm truncate">
                                      {element.label}
                                    </p>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                      {element.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-white border shadow-lg">
                              <div className="max-w-xs">
                                <p className="font-semibold">{element.label}</p>
                                <p className="text-sm text-gray-600">{element.description}</p>
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

          {/* Usage Stats */}
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
