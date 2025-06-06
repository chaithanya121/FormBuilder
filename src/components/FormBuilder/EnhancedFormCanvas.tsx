import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormElement, FormConfig } from './types';
import FormElementRenderer from './FormElementRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Copy, MoveUp, MoveDown, Eye, 
  Smartphone, Tablet, Monitor, Layers, Settings
} from 'lucide-react';

interface EnhancedFormCanvasProps {
  elements: FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
  onSelectElement: (element: FormElement) => void;
  selectedElement: FormElement | null;
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const EnhancedFormCanvas: React.FC<EnhancedFormCanvasProps> = ({
  elements,
  setFormConfig,
  onSelectElement,
  selectedElement,
  formConfig,
  onUpdate
}) => {
  const [draggedOver, setDraggedOver] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index?: number) => {
    e.preventDefault();
    if (typeof index === 'number') {
      setDraggedOver(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const { clientX, clientY } = e;
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        setDraggedOver(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex?: number) => {
    e.preventDefault();
    setDraggedOver(null);
    
    // Get the drag data - try multiple formats
    let elementData = null;
    let elementType = '';
    
    // Try to get JSON data first
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        elementData = JSON.parse(jsonData);
        elementType = elementData.type;
        console.log('Parsed JSON data:', elementData);
      }
    } catch (error) {
      console.log('No valid JSON data found');
    }
    
    // Fallback to text data
    if (!elementType) {
      elementType = e.dataTransfer.getData('text/plain') || 
                   e.dataTransfer.getData('text') || 
                   e.dataTransfer.getData('element-type');
      
      // If elementType is a JSON string, parse it
      try {
        const parsed = JSON.parse(elementType);
        if (parsed.type) {
          elementType = parsed.type;
        }
      } catch (error) {
        // elementType is already a simple string
      }
    }
    
    console.log('Final element type:', elementType);
    console.log('Available data types:', e.dataTransfer.types);
    
    if (elementType) {
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

      console.log('Creating new element:', newElement);

      const newElements = [...elements];
      const insertIndex = dropIndex !== undefined ? dropIndex : newElements.length;
      newElements.splice(insertIndex, 0, newElement);

      const updatedConfig = {
        ...formConfig,
        elements: newElements
      };

      setFormConfig(updatedConfig);
      onUpdate(updatedConfig);
      onSelectElement(newElement);
      
      console.log('Element added successfully, total elements:', newElements.length);
    } else {
      console.error('No element type found in drag data');
    }
  };

  const getDefaultLabel = (elementType: string): string => {
    const labels: { [key: string]: string } = {
      'text': 'Text Input',
      'email': 'Email Address',
      'tel': 'Phone Number',
      'password': 'Password',
      'search': 'Search',
      'url': 'Website URL',
      'number': 'Number',
      'range': 'Range',
      'date': 'Date',
      'time': 'Time',
      'datetime-local': 'Date & Time',
      'textarea': 'Message',
      'select': 'Select Option',
      'checkbox': 'Checkbox Options',
      'radio': 'Radio Options',
      'file': 'File Upload',
      'image': 'Image Upload',
      'youtube': 'YouTube Video',
      'rating': 'Rating',
      'scale-rating': 'Scale Rating',
      'location': 'Location',
      'signature': 'Signature',
      'payment': 'Payment Information',
      'color': 'Color',
      'toggle': 'Toggle',
      'multi-select': 'Multi Select',
      'multiselect': 'Multi Select',
      'rich-text': 'Rich Text',
      'section': 'Section',
      'heading': 'Heading',
      'paragraph': 'Paragraph',
      'divider': 'Divider'
    };
    return labels[elementType] || 'Form Field';
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
    if (['select', 'checkbox', 'radio', 'multi-select', 'multiselect'].includes(elementType)) {
      return ['Option 1', 'Option 2', 'Option 3'];
    }
    return [];
  };

  const getDefaultSettings = (elementType: string): any => {
    const settings: { [key: string]: any } = {
      'youtube': { url: '', autoplay: false, controls: true },
      'rating': { maxStars: 5 },
      'scale-rating': { minValue: 1, maxValue: 10 },
      'range': { min: 0, max: 100, step: 1 },
      'file': { accept: '*', multiple: false },
      'image': { accept: 'image/*', multiple: false },
      'rich-text': { toolbar: ['bold', 'italic', 'underline'] },
      'section': { collapsible: false },
      'heading': { level: 2, text: 'Section Heading' },
      'paragraph': { text: 'This is a paragraph of descriptive text.' }
    };
    return settings[elementType] || {};
  };

  const duplicateElement = (element: FormElement) => {
    const newElement = {
      ...element,
      id: Date.now().toString(),
      label: `${element.label} (Copy)`
    };
    
    const elementIndex = elements.findIndex(el => el.id === element.id);
    const newElements = [...elements];
    newElements.splice(elementIndex + 1, 0, newElement);
    
    const updatedConfig = {
      ...formConfig,
      elements: newElements
    };
    
    setFormConfig(updatedConfig);
    onUpdate(updatedConfig);
  };

  const deleteElement = (elementId: string) => {
    const newElements = elements.filter(el => el.id !== elementId);
    const updatedConfig = {
      ...formConfig,
      elements: newElements
    };
    
    setFormConfig(updatedConfig);
    onUpdate(updatedConfig);
    
    if (selectedElement?.id === elementId) {
      onSelectElement(null as any);
    }
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const currentIndex = elements.findIndex(el => el.id === elementId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= elements.length) return;
    
    const newElements = [...elements];
    const [movedElement] = newElements.splice(currentIndex, 1);
    newElements.splice(newIndex, 0, movedElement);
    
    const updatedConfig = {
      ...formConfig,
      elements: newElements
    };
    
    setFormConfig(updatedConfig);
    onUpdate(updatedConfig);
  };

  const getCanvasWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      case 'desktop': return 'w-full max-w-4xl';
      default: return 'w-full max-w-4xl';
    }
  };

  const canvasStyles = formConfig.settings?.canvasStyles || {};
  const logoSettings = formConfig.settings?.logo || {};

  return (
    <div className="h-full flex flex-col">
      {/* Canvas Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Layers className="h-3 w-3" />
            {elements.length} Elements
          </Badge>
          
          {selectedElement && (
            <Badge className="bg-blue-100 text-blue-700">
              <Settings className="h-3 w-3 mr-1" />
              {selectedElement.label}
            </Badge>
          )}
        </div>

        {/* Preview Mode Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={previewMode === 'mobile' ? 'default' : 'outline'}
            onClick={() => setPreviewMode('mobile')}
            className="w-9 h-9 p-0"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={previewMode === 'tablet' ? 'default' : 'outline'}
            onClick={() => setPreviewMode('tablet')}
            className="w-9 h-9 p-0"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={previewMode === 'desktop' ? 'default' : 'outline'}
            onClick={() => setPreviewMode('desktop')}
            className="w-9 h-9 p-0"
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        className="flex-1 overflow-auto p-8"
        style={{ 
          background: canvasStyles.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundImage: canvasStyles.backgroundImage ? `url(${canvasStyles.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`mx-auto transition-all duration-300 ${getCanvasWidth()}`}>
          <Card 
            ref={canvasRef}
            className="min-h-96 shadow-xl relative"
            style={{
              backgroundColor: canvasStyles.formBackgroundColor || '#ffffff',
              borderRadius: canvasStyles.borderRadius || '12px',
              padding: canvasStyles.padding || '32px',
              fontFamily: canvasStyles.fontFamily || 'Inter',
              fontSize: `${canvasStyles.fontSize || 16}px`,
              color: canvasStyles.fontColor || '#1f2937',
              width: previewMode === 'desktop' ? `${canvasStyles.formWidth || 752}px` : 'auto'
            }}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e)}
          >
            {/* Logo Display */}
            {logoSettings.enabled && logoSettings.url && (
              <div 
                className="absolute z-10"
                style={{
                  top: `${logoSettings.position?.top || 20}px`,
                  left: `${logoSettings.position?.left || 20}px`,
                  opacity: logoSettings.opacity || 1
                }}
              >
                <img
                  src={logoSettings.url}
                  alt="Form Logo"
                  style={{
                    width: `${logoSettings.width || 100}px`,
                    height: `${logoSettings.height || 100}px`,
                    borderRadius: `${logoSettings.borderRadius || 0}px`,
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}

            {elements.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Plus className="h-12 w-12 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Start Building Your Form
                </h3>
                <p className="text-gray-400 text-sm">
                  Drag and drop elements from the sidebar to create your form
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {elements.map((element, index) => (
                    <motion.div
                      key={element.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="group relative"
                    >
                      {/* Drop Zone Above */}
                      <div
                        className={`h-2 transition-all duration-200 ${
                          draggedOver === index 
                            ? 'bg-blue-400 rounded' 
                            : 'bg-transparent'
                        }`}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      />

                      {/* Element Container */}
                      <div
                        className={`relative transition-all duration-200 ${
                          selectedElement?.id === element.id
                            ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50/30'
                            : 'hover:bg-gray-50/50'
                        } rounded-lg`}
                        onClick={() => onSelectElement(element)}
                      >
                        {/* Element Controls */}
                        <div className={`absolute -top-2 -right-2 z-10 flex gap-1 transition-opacity ${
                          selectedElement?.id === element.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 bg-white shadow-md hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveElement(element.id, 'up');
                            }}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 bg-white shadow-md hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveElement(element.id, 'down');
                            }}
                            disabled={index === elements.length - 1}
                          >
                            <MoveDown className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 bg-white shadow-md hover:bg-green-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateElement(element);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 bg-white shadow-md hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(element.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>

                        {/* Element Renderer */}
                        <div className="p-2">
                          <FormElementRenderer element={element} formConfig={formConfig} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Drop Zone at Bottom */}
                <div
                  className={`h-4 transition-all duration-200 ${
                    draggedOver === elements.length 
                      ? 'bg-blue-400 rounded' 
                      : 'bg-transparent'
                  }`}
                  onDragEnter={(e) => handleDragEnter(e, elements.length)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, elements.length)}
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFormCanvas;
