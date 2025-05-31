
import React, { useEffect, useCallback } from 'react';
import { FormCanvasProps } from './types';
import FormElementRenderer from './FormElementRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

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
    
    console.log('Drop event triggered'); // Debug log
    
    const elementType = e.dataTransfer.getData('application/json');
    console.log('Element type from dataTransfer:', elementType); // Debug log
    
    if (elementType) {
      const newElement = {
        id: Date.now().toString(),
        type: elementType as any,
        label: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
        required: false,
        placeholder: `Enter ${elementType}`,
        options: elementType === 'select' || elementType === 'radio' || elementType === 'checkbox-group' ? 
          ['Option 1', 'Option 2', 'Option 3'] : undefined,
        containerId: containerId,
      };

      console.log('Creating new element:', newElement); // Debug log

      setFormConfig(prev => {
        const updatedConfig = {
          ...prev,
          elements: [...prev.elements, newElement]
        };
        console.log('Updated form config:', updatedConfig); // Debug log
        return updatedConfig;
      });
    }
  }, [setFormConfig]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

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
    
    return {
      backgroundColor: canvasStyles.formBackgroundColor || '#ffffff',
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

  // Render nested elements for containers
  const renderNestedElements = (containerId: string) => {
    const nestedElements = elements.filter(el => el.containerId === containerId);
    return nestedElements.map((element, index) => (
      <motion.div
        key={element.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`mb-4 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
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
        <FormElementRenderer
          element={element}
          value=""
          onChange={() => {}}
          formConfig={formConfig}
        />
      </motion.div>
    ));
  };

  // Log configuration changes for debugging
  useEffect(() => {
    console.log('FormCanvas: Configuration updated', {
      width: formConfig.settings.preview?.width,
      liveValidation: formConfig.settings.validation?.liveValidation,
      canvasStyles: formConfig.settings.canvasStyles,
      elementsCount: elements.length
    });
  }, [formConfig.settings, elements.length]);

  // Get root level elements (not in containers)
  const rootElements = elements.filter(el => !el.containerId);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 relative">
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}
      
      {/* Enhanced Drop Zone */}
      <motion.div 
        className={`w-full relative ${formConfig.settings.canvasStyles?.containerClass || ''}`}
        style={getFormStyles()}
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
                  className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
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
                      
                      {/* Enhanced Container Layouts */}
                      {element.type === 'container' && (
                        <div
                          className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:border-blue-300"
                          onDrop={(e) => handleDrop(e, element.id)}
                          onDragOver={handleDragOver}
                        >
                          <div className="text-center text-gray-500 mb-4">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Plus className="mx-auto h-8 w-8 mb-2" />
                            </motion.div>
                            Drop elements here to group them
                          </div>
                          {renderNestedElements(element.id)}
                        </div>
                      )}
                      
                      {element.type === '2-columns' && (
                        <div className="grid grid-cols-2 gap-4">
                          {[1, 2].map(col => (
                            <div
                              key={col}
                              className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:border-blue-300"
                              onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                              onDragOver={handleDragOver}
                            >
                              <div className="text-center text-gray-500 text-sm mb-2">Column {col}</div>
                              {renderNestedElements(`${element.id}-col${col}`)}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {element.type === '3-columns' && (
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map(col => (
                            <div
                              key={col}
                              className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:border-blue-300"
                              onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                              onDragOver={handleDragOver}
                            >
                              <div className="text-center text-gray-500 text-sm mb-2">Column {col}</div>
                              {renderNestedElements(`${element.id}-col${col}`)}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {element.type === '4-columns' && (
                        <div className="grid grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(col => (
                            <div
                              key={col}
                              className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:border-blue-300"
                              onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                              onDragOver={handleDragOver}
                            >
                              <div className="text-center text-gray-500 text-sm mb-2">Column {col}</div>
                              {renderNestedElements(`${element.id}-col${col}`)}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* Enhanced Regular Form Elements */
                    <motion.div
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500 bg-blue-50/50 shadow-xl scale-105'
                          : 'border-transparent hover:border-blue-200 hover:bg-blue-50/30'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement(element);
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
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
            
            {/* Enhanced Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rootElements.length * 0.1 + 0.2 }}
              className="pt-6"
            >
              <motion.button
                type="submit"
                className="w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}, ${formConfig.settings.canvasStyles?.secondaryColor || '#8b5cf6'})`,
                  color: 'white',
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize}px` : '16px'
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {formConfig.settings.submitButton?.text || 'Submit Form'} ✨
              </motion.button>
            </motion.div>

            {/* Enhanced Terms & Conditions */}
            {formConfig.settings.termsAndConditions?.enabled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rootElements.length * 0.1 + 0.3 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  id="terms"
                  required={formConfig.settings.termsAndConditions.required}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-gray-700 text-sm" style={{
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize - 2}px` : '14px'
                }}>
                  {formConfig.settings.termsAndConditions.text || 'I accept the Terms & Conditions'}
                </label>
              </motion.div>
            )}
          </div>
        )}

        {/* Drop Zone Indicator */}
        <motion.div
          className="absolute inset-0 pointer-events-none border-2 border-dashed border-blue-400 rounded-xl bg-blue-50/10 opacity-0"
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default FormCanvas;
