
import React, { useEffect } from 'react';
import { FormCanvasProps } from './types';
import FormElementRenderer from './FormElementRenderer';
import { motion } from 'framer-motion';

const FormCanvas: React.FC<FormCanvasProps> = ({ 
  elements, 
  setFormConfig, 
  onSelectElement, 
  selectedElement,
  formConfig,
  onUpdate 
}) => {
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
        containerId: containerId, // Add container reference for nested elements
      };

      setFormConfig(prev => ({
        ...prev,
        elements: [...prev.elements, newElement]
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
        className={`mb-4 p-2 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
          selectedElement?.id === element.id
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-transparent hover:border-gray-200'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectElement(element);
        }}
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
      canvasStyles: formConfig.settings.canvasStyles
    });
  }, [formConfig.settings]);

  // Get root level elements (not in containers)
  const rootElements = elements.filter(el => !el.containerId);

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}
      
      <motion.div 
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
                className="mx-auto h-16 w-16"
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
            <h3 className="text-xl font-semibold text-gray-600 mb-3" style={{
              fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
              fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize}px` : '20px',
              color: formConfig.settings.canvasStyles?.fontColor || '#6b7280'
            }}>
              Start building your form
            </h3>
            <p className="text-gray-500" style={{
              fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
              fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize - 2}px` : '14px',
              color: formConfig.settings.canvasStyles?.fontColor || '#9ca3af'
            }}>
              Drag elements from the sidebar to begin creating your form
            </p>
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
                {/* Container/Layout Elements with Drop Zones */}
                {(element.type === 'container' || element.type === '2-columns' || element.type === '3-columns' || element.type === '4-columns') ? (
                  <div
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[200px] ${
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
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {element.type}
                      </span>
                    </div>
                    
                    {/* Render based on layout type */}
                    {element.type === 'container' && (
                      <div
                        className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
                        onDrop={(e) => handleDrop(e, element.id)}
                        onDragOver={handleDragOver}
                      >
                        <div className="text-center text-gray-500 mb-4">
                          <svg className="mx-auto h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                          </svg>
                          Drop elements here to group them
                        </div>
                        {renderNestedElements(element.id)}
                      </div>
                    )}
                    
                    {element.type === '2-columns' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
                          onDrop={(e) => handleDrop(e, `${element.id}-col1`)}
                          onDragOver={handleDragOver}
                        >
                          <div className="text-center text-gray-500 text-sm mb-2">Column 1</div>
                          {renderNestedElements(`${element.id}-col1`)}
                        </div>
                        <div
                          className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
                          onDrop={(e) => handleDrop(e, `${element.id}-col2`)}
                          onDragOver={handleDragOver}
                        >
                          <div className="text-center text-gray-500 text-sm mb-2">Column 2</div>
                          {renderNestedElements(`${element.id}-col2`)}
                        </div>
                      </div>
                    )}
                    
                    {element.type === '3-columns' && (
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(col => (
                          <div
                            key={col}
                            className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
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
                            className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50"
                            onDrop={(e) => handleDrop(e, `${element.id}-col${col}`)}
                            onDragOver={handleDragOver}
                          >
                            <div className="text-center text-gray-500 text-sm mb-2">Column {col}</div>
                            {renderNestedElements(`${element.id}-col${col}`)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Regular Form Elements */
                  <motion.div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
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
            
            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rootElements.length * 0.1 + 0.2 }}
              className="pt-4"
            >
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-medium transition-colors hover:shadow-lg"
                style={{
                  backgroundColor: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6',
                  color: 'white',
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize}px` : '16px'
                }}
              >
                {formConfig.settings.submitButton?.text || 'Submit'}
              </button>
            </motion.div>

            {/* Terms & Conditions */}
            {formConfig.settings.termsAndConditions?.enabled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rootElements.length * 0.1 + 0.3 }}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  id="terms"
                  required={formConfig.settings.termsAndConditions.required}
                  className="rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-gray-600" style={{
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
  );
};

export default FormCanvas;
