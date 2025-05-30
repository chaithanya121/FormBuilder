
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import FormElementLibrary from './FormElementLibrary';
import EnhancedFormCanvas from './EnhancedFormCanvas';
import FormPropertiesPanel from './FormPropertiesPanel';
import FormDesigner from './FormDesigner';
import ThemeCreator from './ThemeCreator';
import AdvancedElementSettings from './AdvancedElementSettings';
import TooltipWrapper from './TooltipWrapper';
import { FormConfig, FormElement } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, Eye, Save, Upload, Download, Play, 
  Palette, Layers, Grid, Code, Sparkles, Wand2,
  HelpCircle, Info, Lightbulb, Zap, Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const FormBuilder: React.FC = () => {
  const { toast } = useToast();
  
  const [formConfig, setFormConfig] = useState<FormConfig>({
    name: "Untitled Form",
    elements: [],
    settings: {
      preview: { width: "Full", nesting: false },
      validation: { liveValidation: "Default" },
      layout: {
        size: "Default",
        columns: { default: true, tablet: true, desktop: true },
        labels: "Default",
        placeholders: "Default", 
        errors: "Default",
        messages: "Default",
        questionSpacing: 24
      },
      canvasStyles: {
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        formBackgroundColor: "#ffffff",
        fontColor: "#321f16",
        primaryColor: "#3b82f6",
        fontFamily: "Inter",
        fontSize: 16,
        formWidth: 752,
        borderRadius: "12px",
        padding: "32px"
      },
      submitButton: {
        text: "Submit Form",
        position: "bottom"
      },
      termsAndConditions: {
        enabled: false,
        required: false,
        text: "I accept the Terms & Conditions"
      }
    }
  });

  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [activePanel, setActivePanel] = useState<'elements' | 'configuration' | 'designer'>('elements');
  const [isDesignerOpen, setIsDesignerOpen] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showThemeCreator, setShowThemeCreator] = useState(false);
  const [customThemes, setCustomThemes] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Save form to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('formBuilder_current', JSON.stringify(formConfig));
      localStorage.setItem('currentFormId', 'current');
    }, 500);
    return () => clearTimeout(timer);
  }, [formConfig]);

  // Load saved form
  useEffect(() => {
    const saved = localStorage.getItem('formBuilder_current');
    if (saved) {
      try {
        const parsedConfig = JSON.parse(saved);
        setFormConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load saved form:', error);
      }
    }

    // Load custom themes
    const savedThemes = localStorage.getItem('formBuilder_customThemes');
    if (savedThemes) {
      try {
        setCustomThemes(JSON.parse(savedThemes));
      } catch (error) {
        console.error('Failed to load custom themes:', error);
      }
    }
  }, []);

  const handleElementSelect = (element: FormElement) => {
    setSelectedElement(element);
    setActivePanel('configuration');
  };

  const handleElementUpdate = (updatedElement: FormElement) => {
    setFormConfig(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === updatedElement.id ? updatedElement : el
      )
    }));
    setSelectedElement(updatedElement);
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      setFormConfig(prev => ({
        ...prev,
        elements: prev.elements.filter(el => el.id !== selectedElement.id)
      }));
      setSelectedElement(null);
    }
  };

  const handleDuplicateElement = () => {
    if (selectedElement) {
      const duplicatedElement = {
        ...selectedElement,
        id: Date.now().toString(),
        label: `${selectedElement.label} (Copy)`
      };
      setFormConfig(prev => ({
        ...prev,
        elements: [...prev.elements, duplicatedElement]
      }));
    }
  };

  const handlePreview = () => {
    localStorage.setItem('previewFormConfig', JSON.stringify(formConfig));
    window.open('/preview', '_blank');
  };

  const handleSave = () => {
    const formId = `form_${Date.now()}`;
    localStorage.setItem(`formBuilder_${formId}`, JSON.stringify(formConfig));
    toast({
      title: "Form Saved Successfully!",
      description: `Your form "${formConfig.name}" has been saved.`,
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formConfig, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formConfig.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedConfig = JSON.parse(event.target?.result as string);
            setFormConfig(importedConfig);
            toast({
              title: "Import Successful",
              description: "Form configuration has been imported.",
            });
          } catch (error) {
            toast({
              title: "Import Failed", 
              description: "Invalid JSON file format.",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSaveCustomTheme = (theme: any) => {
    const updatedThemes = [...customThemes, theme];
    setCustomThemes(updatedThemes);
    localStorage.setItem('formBuilder_customThemes', JSON.stringify(updatedThemes));
    setShowThemeCreator(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          backgroundColor: !isDarkMode 
            ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          formBackgroundColor: !isDarkMode ? "#374151" : "#ffffff",
          fontColor: !isDarkMode ? "#f9fafb" : "#1a1a1a"
        }
      }
    };
    setFormConfig(updatedConfig);
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Grid className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Form Builder Pro
                  </h1>
                  <p className="text-sm text-gray-600">
                    {formConfig.elements.length} elements • Advanced Builder
                  </p>
                </div>
              </div>
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                v2.0 Pro
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <TooltipWrapper content="Save your form to local storage">
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </TooltipWrapper>

              <TooltipWrapper content="Import form configuration from JSON">
                <Button variant="outline" size="sm" onClick={handleImport}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </TooltipWrapper>

              <TooltipWrapper content="Export form configuration as JSON">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </TooltipWrapper>

              <TooltipWrapper content="Preview your form in a new tab">
                <Button onClick={handlePreview} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </TooltipWrapper>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="flex items-center justify-between mt-4">
            <Tabs value={activePanel} onValueChange={(value: any) => setActivePanel(value)}>
              <TabsList className="bg-gray-100">
                <TooltipWrapper content="Drag and drop form elements">
                  <TabsTrigger value="elements" className="data-[state=active]:bg-white">
                    <Layers className="h-4 w-4 mr-2" />
                    Elements
                  </TabsTrigger>
                </TooltipWrapper>
                <TooltipWrapper content="Configure form and element settings">
                  <TabsTrigger value="configuration" className="data-[state=active]:bg-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Configuration
                  </TabsTrigger>
                </TooltipWrapper>
                <TooltipWrapper content="Advanced form designer with themes">
                  <TabsTrigger value="designer" className="data-[state=active]:bg-white">
                    <Palette className="h-4 w-4 mr-2" />
                    Designer
                  </TabsTrigger>
                </TooltipWrapper>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <TooltipWrapper content="Create custom themes for your forms">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowThemeCreator(true)}
                >
                  <Wand2 className="h-4 w-4 mr-1" />
                  Theme Creator
                </Button>
              </TooltipWrapper>

              <TooltipWrapper content={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </Button>
              </TooltipWrapper>

              {selectedElement && (
                <TooltipWrapper content="Advanced element configuration">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAdvancedSettings(true)}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Advanced
                  </Button>
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              {activePanel === 'elements' && (
                <FormElementLibrary 
                  onDragStart={() => {}}
                />
              )}
              
              {activePanel === 'configuration' && (
                <FormPropertiesPanel
                  formConfig={formConfig}
                  selectedElement={selectedElement}
                  onFormConfigUpdate={setFormConfig}
                  onElementUpdate={handleElementUpdate}
                  onElementDelete={handleDeleteElement}
                  onElementDuplicate={handleDuplicateElement}
                />
              )}
              
              {activePanel === 'designer' && (
                <FormDesigner
                  isOpen={true}
                  onClose={() => {}}
                  formConfig={formConfig}
                  onUpdate={setFormConfig}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EnhancedFormCanvas
            elements={formConfig.elements}
            setFormConfig={setFormConfig}
            onSelectElement={handleElementSelect}
            selectedElement={selectedElement}
            formConfig={formConfig}
            onUpdate={setFormConfig}
          />
        </div>

        {/* Right Info Panel */}
        <div className="w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Form Info */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Form Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Elements:</span>
                  <Badge variant="outline">{formConfig.elements.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required:</span>
                  <Badge variant="outline">
                    {formConfig.elements.filter(el => el.required).length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Form Width:</span>
                  <Badge variant="outline">
                    {formConfig.settings.canvasStyles?.formWidth || 752}px
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Code className="h-3 w-3 mr-2" />
                  View Code
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Play className="h-3 w-3 mr-2" />
                  Test Form
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Sparkles className="h-3 w-3 mr-2" />
                  AI Enhance
                </Button>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <h3 className="font-semibold">Pro Tips</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>💡 Use containers to organize related fields</p>
                <p>🎨 Try the Theme Creator for custom designs</p>
                <p>⚡ Advanced settings unlock more features</p>
                <p>👀 Preview your form before publishing</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showThemeCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowThemeCreator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ThemeCreator
                onSaveTheme={handleSaveCustomTheme}
                existingThemes={customThemes}
              />
            </motion.div>
          </motion.div>
        )}

        {showAdvancedSettings && selectedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAdvancedSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AdvancedElementSettings
                element={selectedElement}
                onUpdate={handleElementUpdate}
                onClose={() => setShowAdvancedSettings(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormBuilder;
