
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FormConfig, FormElement, FormCanvasProps } from './types';
import FormElementRenderer from './FormElementRenderer';
import { 
  Plus, Trash2, Copy, Settings, GripVertical, 
  ChevronUp, ChevronDown, Grid, Layout, 
  Sparkles, Layers, Eye, Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnhancedFormCanvas: React.FC<FormCanvasProps> = ({
  elements,
  setFormConfig,
  onSelectElement,
  selectedElement,
  formConfig,
  onUpdate
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gridMode, setGridMode] = useState<'single' | 'two' | 'three'>('single');
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragOverIndex(null);

    try {
      const elementType = e.dataTransfer.getData('text/plain');
      
      if (!elementType) {
        console.warn('No element type found in drag data');
        return;
      }

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

      const insertIndex = dragOverIndex !== null ? dragOverIndex : elements.length;
      
      setFormConfig(prev => ({
        ...prev,
        elements: [
          ...prev.elements.slice(0, insertIndex),
          newElement,
          ...prev.elements.slice(insertIndex)
        ]
      }));

      onSelectElement(newElement);
      
      toast({
        title: "Element Added",
        description: `${elementType} element has been added to your form.`,
      });

    } catch (error) {
      console.error('Error handling drop:', error);
      toast({
        title: "Error",
        description: "Failed to add element. Please try again.",
        variant: "destructive"
      });
    }
  }, [dragOverIndex, elements.length, setFormConfig, onSelectElement, toast]);

  const handleDragOver = useCallback((e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIndex(index ?? null);
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only reset if we're leaving the canvas entirely
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
      setIsDragging(false);
    }
  }, []);

  const handleElementDelete = useCallback((elementId: string) => {
    setFormConfig(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    
    if (selectedElement?.id === elementId) {
      onSelectElement(null as any);
    }
    
    toast({
      title: "Element Deleted",
      description: "The element has been removed from your form.",
    });
  }, [setFormConfig, selectedElement, onSelectElement, toast]);

  const handleElementDuplicate = useCallback((element: FormElement) => {
    const duplicatedElement = {
      ...element,
      id: Date.now().toString(),
      label: `${element.label} (Copy)`
    };
    
    const elementIndex = elements.findIndex(el => el.id === element.id);
    const insertIndex = elementIndex + 1;
    
    setFormConfig(prev => ({
      ...prev,
      elements: [
        ...prev.elements.slice(0, insertIndex),
        duplicatedElement,
        ...prev.elements.slice(insertIndex)
      ]
    }));
    
    toast({
      title: "Element Duplicated",
      description: "A copy of the element has been created.",
    });
  }, [elements, setFormConfig, toast]);

  const handleElementMove = useCallback((elementId: string, direction: 'up' | 'down') => {
    const currentIndex = elements.findIndex(el => el.id === elementId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= elements.length) return;

    const newElements = [...elements];
    const [movedElement] = newElements.splice(currentIndex, 1);
    newElements.splice(newIndex, 0, movedElement);

    setFormConfig(prev => ({
      ...prev,
      elements: newElements
    }));
  }, [elements, setFormConfig]);

  const getCanvasStyles = () => {
    const styles = formConfig.settings.canvasStyles || {};
    
    return {
      background: styles.backgroundImage && styles.backgroundImage !== '' 
        ? `url(${styles.backgroundImage})`
        : styles.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      fontFamily: styles.fontFamily || 'Inter',
      fontSize: `${styles.fontSize || 16}px`,
      color: styles.fontColor || '#000000'
    };
  };

  const getFormStyles = () => {
    const styles = formConfig.settings.canvasStyles || {};
    
    return {
      backgroundColor: styles.formBackgroundColor || '#ffffff',
      borderRadius: styles.borderRadius || '16px',
      padding: styles.padding || '32px',
      margin: '20px auto',
      maxWidth: `${styles.formWidth || 800}px`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      position: 'relative' as const,
      overflow: 'hidden' as const
    };
  };

  const gridColumns = {
    single: 'grid-cols-1',
    two: 'grid-cols-1 md:grid-cols-2',
    three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  const renderGridModeToggle = () => (
    <div className="flex items-center gap-2 mb-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
      <span className="text-sm font-medium text-gray-700">Layout:</span>
      <div className="flex rounded-md border border-gray-200 overflow-hidden">
        <Button
          size="sm"
          variant={gridMode === 'single' ? 'default' : 'outline'}
          onClick={() => setGridMode('single')}
          className="rounded-none border-0 px-3 py-1"
        >
          <Layout className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant={gridMode === 'two' ? 'default' : 'outline'}
          onClick={() => setGridMode('two')}
          className="rounded-none border-0 px-3 py-1"
        >
          <Grid className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant={gridMode === 'three' ? 'default' : 'outline'}
          onClick={() => setGridMode('three')}
          className="rounded-none border-0 px-3 py-1"
        >
          <Layers className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  const renderElement = (element: FormElement, index: number) => (
    <motion.div
      key={element.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group relative bg-white/90 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
        selectedElement?.id === element.id 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => onSelectElement(element)}
      onDragOver={(e) => handleDragOver(e, index)}
    >
      {/* Element Controls */}
      <div className="absolute -top-2 -right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleElementMove(element.id, 'up');
          }}
          disabled={index === 0}
          className="h-6 w-6 p-0 bg-white/95 backdrop-blur-sm hover:bg-blue-50"
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleElementMove(element.id, 'down');
          }}
          disabled={index === elements.length - 1}
          className="h-6 w-6 p-0 bg-white/95 backdrop-blur-sm hover:bg-blue-50"
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleElementDuplicate(element);
          }}
          className="h-6 w-6 p-0 bg-white/95 backdrop-blur-sm hover:bg-green-50"
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement(element);
          }}
          className="h-6 w-6 p-0 bg-white/95 backdrop-blur-sm hover:bg-purple-50"
        >
          <Settings className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleElementDelete(element.id);
          }}
          className="h-6 w-6 p-0 bg-white/95 backdrop-blur-sm hover:bg-red-50 text-red-600"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Element Badge */}
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
          {element.type}
        </Badge>
      </div>

      {/* Element Content */}
      <div className="p-4 pt-8">
        <FormElementRenderer
          element={element}
          value=""
          onChange={() => {}}
          formConfig={formConfig}
        />
      </div>

      {/* Drop Zone Indicators */}
      {dragOverIndex === index && isDragging && (
        <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
            Drop element here
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-8"
    >
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Building Your Form</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Drag and drop elements from the library to create your perfect form. 
          Start with basic inputs or choose from advanced components.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        <Badge variant="outline" className="bg-white/80">
          <Plus className="h-3 w-3 mr-1" />
          50+ Elements
        </Badge>
        <Badge variant="outline" className="bg-white/80">
          <Eye className="h-3 w-3 mr-1" />
          Live Preview
        </Badge>
        <Badge variant="outline" className="bg-white/80">
          <Zap className="h-3 w-3 mr-1" />
          AI Enhanced
        </Badge>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 relative overflow-auto" style={getCanvasStyles()}>
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Logo Display */}
      {formConfig.settings?.logo?.enabled && formConfig.settings.logo.url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-20"
          style={{
            top: `${formConfig.settings.logo.position?.top || 20}px`,
            left: `${formConfig.settings.logo.position?.left || 20}px`,
            opacity: formConfig.settings.logo.opacity || 1
          }}
        >
          <img
            src={formConfig.settings.logo.url}
            alt="Form Logo"
            style={{
              width: `${formConfig.settings.logo.width || 100}px`,
              height: `${formConfig.settings.logo.height || 100}px`,
              borderRadius: `${formConfig.settings.logo.borderRadius || 0}px`,
              objectFit: 'contain'
            }}
            className="shadow-lg"
          />
        </motion.div>
      )}

      {/* Main Form Container */}
      <div className="relative z-10 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={getFormStyles()}
          ref={canvasRef}
          onDrop={handleDrop}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={handleDragLeave}
          className="relative"
        >
          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formConfig.name || 'Untitled Form'}
            </h1>
            {formConfig.description && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {formConfig.description}
              </p>
            )}
          </motion.div>

          {/* Grid Mode Toggle */}
          {elements.length > 0 && renderGridModeToggle()}

          {/* Form Elements */}
          {elements.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${gridColumns[gridMode]}`}
            >
              <AnimatePresence>
                {elements.map((element, index) => renderElement(element, index))}
              </AnimatePresence>
            </motion.div>
          ) : (
            renderEmptyState()
          )}

          {/* Drop Zone at the end */}
          {elements.length > 0 && (
            <motion.div
              className={`mt-6 p-4 border-2 border-dashed rounded-xl transition-all duration-300 ${
                dragOverIndex === elements.length && isDragging
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragOver={(e) => handleDragOver(e, elements.length)}
            >
              <div className="text-center text-gray-500 text-sm">
                {dragOverIndex === elements.length && isDragging
                  ? 'Drop element here'
                  : 'Drop new elements here'}
              </div>
            </motion.div>
          )}

          {/* Global drop zone when no elements */}
          {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                >
                  Drop element anywhere to start
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedFormCanvas;
