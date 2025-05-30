import React, { useState } from 'react';
import { DragStartProps } from './types';
import { 
  Type, Mail, Lock, Calendar, Clock, Upload, FileText, CheckSquare, 
  Circle, ChevronDown, Heading1, Heading2, Heading3, Heading4, 
  Minus, Square, Columns2, Columns3, Grid3X3, Table, List, 
  Link, Phone, Hash, Sliders, Star, MapPin, User, CreditCard,
  Image, Video, Quote, Code, Layers, Layout, LayoutGrid,
  AlignLeft, BarChart3, Radio, ToggleLeft, FileImage,
  MessageSquare, Users, Timer, Award, Search, Filter,
  Zap, Target, Palette, Settings
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const FORM_ELEMENTS = {
  fields: [
    { type: 'text', label: 'Text Input', icon: Type, category: 'basic', description: 'Single line text input' },
    { type: 'email', label: 'Email', icon: Mail, category: 'basic', description: 'Email input with validation' },
    { type: 'password', label: 'Password', icon: Lock, category: 'basic', description: 'Password input field' },
    { type: 'textarea', label: 'Textarea', icon: FileText, category: 'basic', description: 'Multi-line text input' },
    { type: 'number', label: 'Number', icon: Hash, category: 'basic', description: 'Numeric input field' },
    { type: 'phone', label: 'Phone', icon: Phone, category: 'basic', description: 'Phone number input' },
    { type: 'url', label: 'URL', icon: Link, category: 'basic', description: 'Website URL input' },
    { type: 'date', label: 'Date', icon: Calendar, category: 'basic', description: 'Date picker' },
    { type: 'time', label: 'Time', icon: Clock, category: 'basic', description: 'Time picker' },
    { type: 'file', label: 'File Upload', icon: Upload, category: 'advanced', description: 'Single file upload' },
    { type: 'multi-file-upload', label: 'Multi-File Upload', icon: Upload, category: 'advanced', description: 'Multiple file upload' },
    { type: 'image-upload', label: 'Image Upload', icon: FileImage, category: 'advanced', description: 'Image file upload' },
  ],
  selection: [
    { type: 'select', label: 'Dropdown', icon: ChevronDown, category: 'basic', description: 'Dropdown selection' },
    { type: 'radio', label: 'Radio Buttons', icon: Circle, category: 'basic', description: 'Single choice selection' },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, category: 'basic', description: 'Single checkbox' },
    { type: 'checkbox-group', label: 'Checkbox Group', icon: CheckSquare, category: 'basic', description: 'Multiple checkboxes' },
    { type: 'multiselect', label: 'Multi-Select', icon: List, category: 'advanced', description: 'Multiple selection dropdown' },
    { type: 'radio-blocks', label: 'Radio Blocks', icon: LayoutGrid, category: 'advanced', description: 'Radio buttons as blocks' },
    { type: 'checkbox-blocks', label: 'Checkbox Blocks', icon: LayoutGrid, category: 'advanced', description: 'Checkboxes as blocks' },
    { type: 'toggle', label: 'Toggle Switch', icon: ToggleLeft, category: 'advanced', description: 'On/off toggle switch' },
    { type: 'slider', label: 'Slider', icon: Sliders, category: 'advanced', description: 'Range slider input' },
    { type: 'star-rating', label: 'Star Rating', icon: Star, category: 'advanced', description: 'Star rating system' },
    { type: 'scale-rating', label: 'Scale Rating', icon: BarChart3, category: 'advanced', description: 'Numeric scale rating' },
  ],
  layout: [
    { type: 'container', label: 'Container', icon: Square, category: 'layout', description: 'Group elements together' },
    { type: '2-columns', label: '2 Columns', icon: Columns2, category: 'layout', description: 'Two column layout' },
    { type: '3-columns', label: '3 Columns', icon: Columns3, category: 'layout', description: 'Three column layout' },
    { type: '4-columns', label: '4 Columns', icon: Grid3X3, category: 'layout', description: 'Four column layout' },
    { type: 'tabs', label: 'Tabs', icon: Layers, category: 'layout', description: 'Tabbed content sections' },
    { type: 'steps', label: 'Step Wizard', icon: Target, category: 'layout', description: 'Multi-step form wizard' },
    { type: 'section-collapse', label: 'Collapsible Section', icon: Layout, category: 'layout', description: 'Expandable content section' },
    { type: 'divider', label: 'Divider', icon: Minus, category: 'layout', description: 'Visual separator line' },
  ],
  content: [
    { type: 'h1', label: 'Heading 1', icon: Heading1, category: 'content', description: 'Large heading text' },
    { type: 'h2', label: 'Heading 2', icon: Heading2, category: 'content', description: 'Medium heading text' },
    { type: 'h3', label: 'Heading 3', icon: Heading3, category: 'content', description: 'Small heading text' },
    { type: 'p', label: 'Paragraph', icon: AlignLeft, category: 'content', description: 'Paragraph text block' },
    { type: 'quote', label: 'Quote', icon: Quote, category: 'content', description: 'Blockquote text' },
    { type: 'image', label: 'Image', icon: Image, category: 'content', description: 'Display image' },
    { type: 'video', label: 'Video', icon: Video, category: 'content', description: 'Embedded video' },
    { type: 'static-html', label: 'Custom HTML', icon: Code, category: 'content', description: 'Custom HTML content' },
    { type: 'link', label: 'Link', icon: Link, category: 'content', description: 'Clickable link' },
  ],
  specialized: [
    { type: 'name', label: 'Full Name', icon: User, category: 'specialized', description: 'Name input fields' },
    { type: 'first-name', label: 'First Name', icon: User, category: 'specialized', description: 'First name field' },
    { type: 'last-name', label: 'Last Name', icon: User, category: 'specialized', description: 'Last name field' },
    { type: 'address', label: 'Address', icon: MapPin, category: 'specialized', description: 'Full address input' },
    { type: 'street-address', label: 'Street Address', icon: MapPin, category: 'specialized', description: 'Street address field' },
    { type: 'city', label: 'City', icon: MapPin, category: 'specialized', description: 'City input field' },
    { type: 'state-province', label: 'State/Province', icon: MapPin, category: 'specialized', description: 'State or province field' },
    { type: 'postal-code', label: 'Postal Code', icon: MapPin, category: 'specialized', description: 'ZIP/postal code field' },
    { type: 'appointment', label: 'Appointment', icon: Calendar, category: 'specialized', description: 'Appointment booking' },
    { type: 'captcha', label: 'CAPTCHA', icon: Settings, category: 'specialized', description: 'CAPTCHA verification' },
    { type: 'matrix', label: 'Matrix', icon: Table, category: 'specialized', description: 'Matrix question grid' },
    { type: 'input-table', label: 'Input Table', icon: Table, category: 'specialized', description: 'Editable data table' },
  ],
  advanced: [
    { type: 'gallery', label: 'Image Gallery', icon: Image, category: 'advanced', description: 'Image gallery display' },
    { type: 'spinner', label: 'Number Spinner', icon: Hash, category: 'advanced', description: 'Number input with +/- buttons' },
    { type: 'range-slider', label: 'Range Slider', icon: Sliders, category: 'advanced', description: 'Min/max range slider' },
    { type: 'vertical-slider', label: 'Vertical Slider', icon: Sliders, category: 'advanced', description: 'Vertical orientation slider' },
    { type: 'hidden-input', label: 'Hidden Field', icon: Settings, category: 'advanced', description: 'Hidden form field' },
    { type: 'form_submit', label: 'Submit Button', icon: Zap, category: 'advanced', description: 'Custom submit button' },
    { type: 'danger-button', label: 'Danger Button', icon: Zap, category: 'advanced', description: 'Warning/danger action button' },
  ]
};

const FormElementLibrary: React.FC<DragStartProps> = ({ onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getAllElements = () => {
    return Object.values(FORM_ELEMENTS).flat();
  };

  const filterElements = (elements: any[]) => {
    return elements.filter(element => {
      const matchesSearch = element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          element.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || element.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const renderElementCard = (element: any, isCompact = false) => {
    const IconComponent = element.icon;
    
    return (
      <div
        key={element.type}
        draggable
        onDragStart={(e) => onDragStart(e, element.type)}
        className={`group bg-white border-2 border-gray-200 rounded-xl transition-all duration-200 cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-lg hover:scale-[1.02] ${
          isCompact ? 'p-3' : 'p-4'
        }`}
      >
        <div className={`flex ${viewMode === 'list' ? 'items-center gap-3' : 'flex-col items-center text-center'}`}>
          <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-3'}`}>
            <div className={`${isCompact ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-200`}>
              <IconComponent className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            </div>
          </div>
          
          <div className={viewMode === 'list' ? 'flex-1' : ''}>
            <h4 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors ${
              isCompact ? 'text-sm' : 'text-sm'
            }`}>
              {element.label}
            </h4>
            {!isCompact && (
              <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-700 transition-colors">
                {element.description}
              </p>
            )}
            
            <Badge 
              variant="secondary" 
              className={`${isCompact ? 'text-xs px-2 py-0' : 'text-xs'} ${viewMode === 'list' ? 'ml-0 mt-1' : 'mt-2'} bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-200`}
            >
              {element.category}
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Search and Filters */}
      <div className="p-4 space-y-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
            <option value="layout">Layout</option>
            <option value="content">Content</option>
            <option value="specialized">Specialized</option>
          </select>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className="w-8 h-8 p-0"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="w-8 h-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Elements */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="all" className="h-full flex flex-col">
          <div className="px-4 pt-3 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 h-9">
              <TabsTrigger value="all" className="text-xs data-[state=active]:bg-blue-600">All</TabsTrigger>
              <TabsTrigger value="popular" className="text-xs data-[state=active]:bg-blue-600">Popular</TabsTrigger>
              <TabsTrigger value="recent" className="text-xs data-[state=active]:bg-blue-600">Recent</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="all" className="p-4 mt-0">
              {selectedCategory === 'all' ? (
                <div className="space-y-6">
                  {Object.entries(FORM_ELEMENTS).map(([category, elements]) => {
                    const filteredElements = filterElements(elements);
                    if (filteredElements.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                          {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </h3>
                        <div className={`grid gap-3 ${
                          viewMode === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
                        }`}>
                          {filteredElements.map(element => renderElementCard(element, true))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`grid gap-3 ${
                  viewMode === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
                }`}>
                  {filterElements(getAllElements()).map(element => renderElementCard(element))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="popular" className="p-4 mt-0">
              <div className={`grid gap-3 ${
                viewMode === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
              }`}>
                {filterElements([
                  ...FORM_ELEMENTS.fields.slice(0, 6),
                  ...FORM_ELEMENTS.selection.slice(0, 4),
                  ...FORM_ELEMENTS.layout.slice(0, 3)
                ]).map(element => renderElementCard(element))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="p-4 mt-0">
              <div className={`grid gap-3 ${
                viewMode === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
              }`}>
                {filterElements([
                  ...FORM_ELEMENTS.advanced,
                  ...FORM_ELEMENTS.specialized.slice(0, 4)
                ]).map(element => renderElementCard(element))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default FormElementLibrary;
