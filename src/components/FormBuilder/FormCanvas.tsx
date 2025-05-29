
import React from 'react';
import { FormCanvasProps } from './types';
import FormElementRenderer from './FormElementRenderer';
import { useEnhancedTheme } from '@/components/ui/enhanced-theme';
import { motion } from 'framer-motion';

const FormCanvas: React.FC<FormCanvasProps> = ({ 
  elements, 
  setFormConfig, 
  onSelectElement, 
  selectedElement,
  formConfig,
  onUpdate 
}) => {
  const { themeClasses } = useEnhancedTheme();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('application/json');
    
    if (elementType) {
      const newElement = {
        id: Date.now().toString(),
        type: elementType as any,
        label: `New ${elementType}`,
        required: false,
        placeholder: `Enter ${elementType}`,
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

  // Apply canvas styles from formConfig
  const getCanvasStyles = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    const layoutSettings = formConfig.settings.layout || {};
    
    return {
      backgroundColor: canvasStyles.backgroundColor || '#ffffff',
      backgroundImage: canvasStyles.backgroundImage || 'none',
      padding: canvasStyles.padding || '20px',
      margin: canvasStyles.margin || '10px',
      borderRadius: canvasStyles.borderRadius || '8px',
      fontFamily: canvasStyles.fontFamily || 'Inter',
      fontSize: canvasStyles.fontSize ? `${canvasStyles.fontSize}px` : '16px',
      color: canvasStyles.fontColor || '#000000',
      width: canvasStyles.formWidth ? `${canvasStyles.formWidth}px` : '100%',
      maxWidth: '100%',
      minHeight: '400px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  };

  const getFormStyles = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    
    return {
      backgroundColor: canvasStyles.formBackgroundColor || '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
    };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div 
          className="min-h-full flex items-center justify-center transition-all duration-300"
          style={getCanvasStyles()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div 
            className="w-full max-w-2xl transition-all duration-300"
            style={getFormStyles()}
          >
            {/* Custom CSS Injection */}
            {formConfig.settings.canvasStyles?.customCSS && (
              <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
            )}
            
            {elements.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
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
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Start building your form
                </h3>
                <p className="text-gray-400">
                  Drag elements from the sidebar to begin creating your form
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {elements.map((element, index) => (
                  <motion.div
                    key={element.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedElement?.id === element.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-transparent hover:border-gray-200'
                    }`}
                    onClick={() => onSelectElement(element)}
                    style={{
                      marginBottom: formConfig.settings.layout?.questionSpacing ? 
                        `${formConfig.settings.layout.questionSpacing}px` : '12px'
                    }}
                  >
                    <FormElementRenderer
                      element={element}
                      value=""
                      onChange={() => {}}
                      formConfig={formConfig}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCanvas;
