
import React, { useEffect, useRef } from 'react';
import { FormCanvasProps } from './types';
import FormElementRenderer from './FormElementRenderer';
import { motion } from 'framer-motion';

const EnhancedFormCanvas: React.FC<FormCanvasProps> = ({ 
  elements, 
  setFormConfig, 
  onSelectElement, 
  selectedElement,
  formConfig,
  onUpdate 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent, containerId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    const elementType = e.dataTransfer.getData('application/json');
    
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

      setFormConfig(prev => ({
        ...prev,
        elements: [...prev.elements, newElement]
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
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
      minHeight: '500px',
      margin: '0 auto',
    };
  };

  const renderNestedElements = (containerId: string) => {
    const nestedElements = elements.filter(el => el.containerId === containerId);
    return nestedElements.map((element, index) => (
      <motion.div
        key={element.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`mb-4 p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer relative group ${
          selectedElement?.id === element.id
            ? 'border-blue-500 bg-blue-50/50 shadow-md'
            : 'border-transparent hover:border-gray-300 hover:bg-gray-50/50'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectElement(element);
        }}
      >
        {/* Element Badge */}
        {selectedElement?.id === element.id && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            {element.type}
          </div>
        )}
        
        <FormElementRenderer
          element={element}
          value=""
          onChange={() => {}}
          formConfig={formConfig}
        />
      </motion.div>
    ));
  };

  const rootElements = elements.filter(el => !el.containerId);

  // Handle auto-scroll to center
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const container = canvas.closest('.overflow-auto');
      if (container) {
        const scrollTop = Math.max(0, (canvas.scrollHeight - container.clientHeight) / 2);
        container.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }
  }, [rootElements.length]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}
      
      {/* Canvas Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Form Canvas</h3>
          <p className="text-sm text-gray-600">
            {rootElements.length} element{rootElements.length !== 1 ? 's' : ''} on canvas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">
            Drag elements here to build your form
          </div>
        </div>
      </div>

      {/* Scrollable Canvas Area */}
      <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <motion.div 
          ref={canvasRef}
          className={`w-full relative ${formConfig.settings.canvasStyles?.containerClass || ''}`}
          style={getFormStyles()}
          onDrop={(e) => handleDrop(e)}
          onDragOver={handleDragOver}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {rootElements.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-gray-400 mb-6">
                <svg
                  className="mx-auto h-20 w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-3" style={{
                fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize + 4}px` : '24px',
                color: formConfig.settings.canvasStyles?.fontColor || '#6b7280'
              }}>
                Start building your form
              </h3>
              <p className="text-gray-500 mb-6" style={{
                fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize - 2}px` : '14px',
                color: formConfig.settings.canvasStyles?.fontColor || '#9ca3af'
              }}>
                Drag elements from the sidebar to begin creating your form
              </p>
              
              {/* Drop Zone Indicator */}
              <div className="mt-8 border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white/50 backdrop-blur-sm">
                <div className="text-gray-400 text-sm">
                  Drop zone - Drag elements here
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {rootElements.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group ${
                    selectedElement?.id === element.id
                      ? 'ring-2 ring-blue-500 rounded-xl'
                      : ''
                  }`}
                  style={{
                    marginBottom: formConfig.settings.layout?.questionSpacing ? 
                      `${formConfig.settings.layout.questionSpacing}px` : '24px'
                  }}
                >
                  {/* Container/Layout Elements with Enhanced Drop Zones */}
                  {(element.type === 'container' || element.type === '2-columns' || element.type === '3-columns' || element.type === '4-columns') ? (
                    <div
                      className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[250px] relative ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500 bg-blue-50/50 shadow-lg'
                          : 'border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement(element);
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-700">{element.label}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                            {element.type}
                          </span>
                        </div>
                      </div>
                      
                      {/* Enhanced Layout Rendering */}
                      {element.type === 'container' && (
                        <div
                          className="min-h-[150px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50 relative group"
                          onDrop={(e) => handleDrop(e, element.id)}
                          onDragOver={handleDragOver}
                        >
                          <div className="text-center text-gray-500 mb-4">
                            <svg className="mx-auto h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                            </svg>
                            <div className="text-sm font-medium">Container Drop Zone</div>
                            <div className="text-xs">Drop elements here to group them</div>
                          </div>
                          {renderNestedElements(element.id)}
                        </div>
                      )}
                      
                      {element.type === '2-columns' && (
                        <div className="grid grid-cols-2 gap-4">
                          {[1, 2].map(col => (
                            <div
                              key={col}
                              className="min-h-[150px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50 relative"
                              onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                              onDragOver={handleDragOver}
                            >
                              <div className="text-center text-gray-500 text-sm mb-3">
                                <div className="font-medium">Column {col}</div>
                                <div className="text-xs">Drop zone</div>
                              </div>
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
                              className="min-h-[150px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
                              onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                              onDragOver={handleDragOver}
                            >
                              <div className="text-center text-gray-500 text-sm mb-3">
                                <div className="font-medium">Column {col}</div>
                                <div className="text-xs">Drop zone</div>
                              </div>
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
                              className="min-h-[150px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
                              onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                              onDragOver={handleDragOver}
                            >
                              <div className="text-center text-gray-500 text-sm mb-3">
                                <div className="font-medium">Col {col}</div>
                                <div className="text-xs">Drop</div>
                              </div>
                              {renderNestedElements(`${element.id}-col${col}`)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Regular Form Elements with Enhanced Styling */
                    <motion.div
                      className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg relative group ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500 bg-blue-50/50 shadow-lg'
                          : 'border-transparent hover:border-gray-200 hover:bg-gray-50/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectElement(element);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* Element Type Badge */}
                      {selectedElement?.id === element.id && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                          {element.type}
                        </div>
                      )}
                      
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
              
              {/* Enhanced Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rootElements.length * 0.1 + 0.2 }}
                className="pt-6"
              >
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6',
                    color: 'white',
                    fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                    fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize}px` : '16px',
                    borderRadius: formConfig.settings.canvasStyles?.borderRadius || '12px'
                  }}
                >
                  {formConfig.settings.submitButton?.text || 'Submit Form'}
                </button>
              </motion.div>

              {/* Terms & Conditions */}
              {formConfig.settings.termsAndConditions?.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rootElements.length * 0.1 + 0.3 }}
                  className="flex items-center gap-3 text-sm p-4 bg-gray-50/50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    id="terms"
                    required={formConfig.settings.termsAndConditions.required}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-gray-600 cursor-pointer" style={{
                    fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                    fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize - 2}px` : '14px',
                    color: formConfig.settings.canvasStyles?.fontColor || '#6b7280'
                  }}>
                    {formConfig.settings.termsAndConditions.text || 'I accept the Terms & Conditions'}
                  </label>
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
