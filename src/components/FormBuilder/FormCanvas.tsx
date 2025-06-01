
import React, { useEffect, useCallback } from 'react';
import { FormCanvasProps } from './types';
import FormElementRenderer from './FormElementRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Layers, Trash2, Copy, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FormCanvas: React.FC<FormCanvasProps> = ({ 
  elements, 
  setFormConfig, 
  onSelectElement, 
  selectedElement,
  formConfig,
  onUpdate 
}) => {
  const handleDrop = useCallback((e: React.DragEvent, containerId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Drop event triggered');
    
    // Try both data transfer methods
    let elementType = e.dataTransfer.getData('text/plain');
    if (!elementType) {
      elementType = e.dataTransfer.getData('application/json');
    }
    
    console.log('Element type from dataTransfer:', elementType);
    
    if (elementType) {
      const newElement = {
        id: Date.now().toString(),
        type: elementType as any,
        label: `${elementType.charAt(0).toUpperCase() + elementType.slice(1)} Field`,
        required: false,
        placeholder: `Enter ${elementType}`,
        options: ['select', 'radio', 'checkbox-group'].includes(elementType) ? 
          ['Option 1', 'Option 2', 'Option 3'] : undefined,
        containerId: containerId,
        value: elementType === 'youtube' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : '',
        url: elementType === 'youtube' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : undefined,
      };

      console.log('Creating new element:', newElement);

      setFormConfig(prev => {
        const updatedConfig = {
          ...prev,
          elements: [...prev.elements, newElement]
        };
        console.log('Updated form config:', updatedConfig);
        return updatedConfig;
      });
    }
  }, [setFormConfig]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleElementDelete = (elementId: string) => {
    setFormConfig(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  };

  const handleElementDuplicate = (element: any) => {
    const duplicatedElement = {
      ...element,
      id: Date.now().toString(),
      label: `${element.label} (Copy)`
    };
    setFormConfig(prev => ({
      ...prev,
      elements: [...prev.elements, duplicatedElement]
    }));
  };

  const getFormStyles = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    const previewSettings = formConfig.settings.preview;
    
    let width = '100%';
    if (previewSettings?.width && previewSettings.width !== 'Full') {
      if (typeof previewSettings.width === 'number') {
        width = `${previewSettings.width}px`;
      } else {
        const numericWidth = parseInt(previewSettings.width);
        if (!isNaN(numericWidth)) {
          width = `${numericWidth}px`;
        }
      }
    }

    const backgroundStyle = canvasStyles.backgroundImage 
      ? {
          backgroundImage: `url(${canvasStyles.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
      : {
          background: canvasStyles.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
    
    return {
      ...backgroundStyle,
      padding: canvasStyles.padding || '32px',
      borderRadius: canvasStyles.borderRadius || '16px',
      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 8px 24px -8px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      width: width,
      maxWidth: canvasStyles.formWidth ? `${canvasStyles.formWidth}px` : '800px',
      fontFamily: canvasStyles.fontFamily || 'Inter',
      fontSize: canvasStyles.fontSize ? `${canvasStyles.fontSize}px` : '16px',
      color: canvasStyles.fontColor || '#000000',
      transition: 'all 0.3s ease-in-out',
      minHeight: '400px',
    };
  };

  const getFormBackgroundStyle = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    return {
      backgroundColor: canvasStyles.formBackgroundColor || '#ffffff',
      borderRadius: canvasStyles.borderRadius || '16px',
      padding: canvasStyles.padding || '32px',
      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    };
  };

  // Get background style for the entire canvas area
  const getCanvasBackgroundStyle = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    
    if (canvasStyles.backgroundImage) {
      return {
        backgroundImage: `url(${canvasStyles.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    return {
      background: canvasStyles.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
  };

  // Render nested elements for containers
  const renderNestedElements = (containerId: string) => {
    const nestedElements = elements.filter(el => el.containerId === containerId);
    return nestedElements.map((element, index) => (
      <motion.div
        key={element.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`relative group mb-4 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
          selectedElement?.id === element.id
            ? 'border-blue-500 bg-blue-50/50 shadow-lg scale-105'
            : 'border-transparent hover:border-blue-200 hover:bg-blue-50/30'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectElement(element);
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Element Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement(element);
            }}
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              handleElementDuplicate(element);
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 hover:bg-red-50 hover:border-red-200"
            onClick={(e) => {
              e.stopPropagation();
              handleElementDelete(element.id);
            }}
          >
            <Trash2 className="h-3 w-3 text-red-500" />
          </Button>
        </div>

        <FormElementRenderer
          element={element}
          value=""
          onChange={() => {}}
          formConfig={formConfig}
        />
      </motion.div>
    ));
  };

  // Get root level elements (not in containers)
  const rootElements = elements.filter(el => !el.containerId);

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-8 relative"
      style={getCanvasBackgroundStyle()}
    >
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}
      
      {/* Enhanced Drop Zone */}
      <motion.div 
        className={`w-full relative ${formConfig.settings.canvasStyles?.containerClass || ''}`}
        style={getFormBackgroundStyle()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {rootElements.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="mb-8"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Plus className="h-10 w-10 text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-800" />
                </motion.div>
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Start Building Your Amazing Form
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Drag elements from the floating sidebar to begin creating your beautiful, interactive form
            </p>
            
            <motion.div
              className="grid grid-cols-3 gap-4 max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['📝', '📧', '📞'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-200"
                  whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="text-xs text-gray-500">Drop here</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {rootElements.map((element, index) => (
                <motion.div
                  key={element.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className={`relative group ${
                    selectedElement?.id === element.id
                      ? 'ring-2 ring-blue-500 rounded-xl shadow-xl'
                      : ''
                  }`}
                  style={{
                    marginBottom: formConfig.settings.layout?.questionSpacing ? 
                      `${formConfig.settings.layout.questionSpacing}px` : '24px'
                  }}
                >
                  {/* Element Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement(element);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleElementDuplicate(element);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:border-red-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleElementDelete(element.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* Container/Layout Elements with Enhanced Drop Zones */}
                  {(element.type === 'container' || element.type === '2-columns' || element.type === '3-columns' || element.type === '4-columns') ? (
                    <motion.div
                      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer min-h-[200px] ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500 bg-blue-50/50 shadow-xl'
                          : 'border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement(element);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onDrop={(e) => handleDrop(e, element.id)}
                      onDragOver={handleDragOver}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">{element.label}</h4>
                        <motion.span 
                          className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full"
                          whileHover={{ scale: 1.1 }}
                        >
                          {element.type}
                        </motion.span>
                      </div>
                      
                      <div className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
                        {renderNestedElements(element.id)}
                        {elements.filter(el => el.containerId === element.id).length === 0 && (
                          <div className="text-center text-gray-400">
                            <Layers className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">Drop elements here</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    /* Regular Form Elements */
                    <motion.div
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500 bg-blue-50/50 shadow-xl'
                          : 'border-transparent hover:border-blue-200 hover:bg-blue-50/30'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement(element);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FormElementRenderer
                        element={element}
                        value=""
                        onChange={() => {}}
                        formConfig={formConfig}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Submit Button */}
            {rootElements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rootElements.length * 0.1 + 0.2 }}
                className="pt-6 border-t border-gray-200"
              >
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  {formConfig.settings.submitButton?.text || 'Submit Form'}
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FormCanvas;
