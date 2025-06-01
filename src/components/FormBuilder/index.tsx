
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import EnhancedFormElementLibrary from './EnhancedFormElementLibrary';
import EnhancedFormCanvas from './EnhancedFormCanvas';
import EnhancedFormPropertiesPanel from './EnhancedFormPropertiesPanel';
import FormDesigner from './FormDesigner';
import SaveSuccessDialog from './SaveSuccessDialog';
import FloatingActionButtons from './FloatingActionButtons';
import ViewCodeModal from './QuickActions/ViewCodeModal';
import TestFormModal from './QuickActions/TestFormModal';
import AIEnhanceModal from './QuickActions/AIEnhanceModal';
import { FormConfig, FormElement } from './types';
import { 
  Settings, Eye, Save, Upload, Download, Play, 
  Palette, Layers, Grid, Code, Sparkles, Wand2,
  HelpCircle, Info, Lightbulb, Zap, Target, Search, Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FormBuilder: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
        questionSpacing: 24,
        labelAlignment: "top"
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
        padding: "32px",
        backgroundImage: "",
        customCSS: ""
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
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [elementFilter, setElementFilter] = useState('all');

  // Quick Action Modals
  const [showViewCode, setShowViewCode] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);
  const [showAIEnhance, setShowAIEnhance] = useState(false);

  // Auto-save functionality
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
    const formId = 'current';
    localStorage.setItem('previewFormConfig', JSON.stringify(formConfig));
    navigate(`/form-preview/${formId}`);
  };

  const handleSave = () => {
    const formId = `form_${Date.now()}`;
    localStorage.setItem(`formBuilder_${formId}`, JSON.stringify(formConfig));
    setShowSaveDialog(true);
  };

  const handlePublish = () => {
    // Simulate publishing process
    const formId = 'current';
    localStorage.setItem(`published_${formId}`, JSON.stringify({
      ...formConfig,
      published: true,
      publishedAt: new Date().toISOString()
    }));
    
    toast({
      title: "Form Published!",
      description: "Your form is now live and ready to receive submissions.",
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

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'view-code':
        setShowViewCode(true);
        break;
      case 'test-form':
        setShowTestForm(true);
        break;
      case 'ai-enhance':
        setShowAIEnhance(true);
        break;
      case 'preview':
        handlePreview();
        break;
      case 'help':
        toast({
          title: "FormCraft Pro Help",
          description: "Use the floating buttons to switch between Elements, Configuration, and Designer panels. Drag elements from the library to build your form.",
        });
        break;
      default:
        break;
    }
  };

  const handleThemeStudio = () => {
    navigate('/tools/theme-studio');
  };

  const handleDesigner = () => {
    setActivePanel('designer');
  };

  const handleAIEnhance = (enhancedConfig: FormConfig) => {
    setFormConfig(enhancedConfig);
    setShowAIEnhance(false);
  };

  const handlePanelChange = (panel: 'elements' | 'configuration' | 'designer') => {
    setActivePanel(panel);
  };

  const handleSaveDialogClose = () => {
    setShowSaveDialog(false);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, elementType: string) => {
    console.log('Setting drag data for element type:', elementType);
    e.dataTransfer.setData('text/plain', elementType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const renderSidePanel = () => {
    switch (activePanel) {
      case 'elements':
        return (
          <EnhancedFormElementLibrary 
            onDragStart={handleDragStart} 
            onClose={() => setActivePanel('configuration')}
          />
        );
      case 'configuration':
        return (
          <EnhancedFormPropertiesPanel
            formConfig={formConfig}
            selectedElement={selectedElement}
            onFormConfigUpdate={setFormConfig}
            onElementUpdate={handleElementUpdate}
            onElementDelete={handleDeleteElement}
            onElementDuplicate={handleDuplicateElement}
            onClose={() => setActivePanel('elements')}
          />
        );
      case 'designer':
        return (
          <FormDesigner
            isOpen={true}
            onClose={() => setActivePanel('elements')}
            formConfig={formConfig}
            onUpdate={setFormConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header with Search and Filters */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Grid className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FormCraft Pro
                  </h1>
                  <p className="text-sm text-gray-600">
                    {formConfig.elements.length} elements • Advanced Builder
                  </p>
                </div>
              </motion.div>
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                v3.0 Pro
              </Badge>

              {/* Form Name Input */}
              <div className="flex items-center gap-2">
                <Input
                  value={formConfig.name}
                  onChange={(e) => setFormConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-48 h-9"
                  placeholder="Form name"
                />
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search elements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-48 h-9"
                  />
                </div>
                
                <Select value={elementFilter} onValueChange={setElementFilter}>
                  <SelectTrigger className="w-40 h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Elements</SelectItem>
                    <SelectItem value="input">Input Fields</SelectItem>
                    <SelectItem value="selection">Selection</SelectItem>
                    <SelectItem value="layout">Layout</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>

              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>

              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleThemeStudio}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Palette className="h-4 w-4 mr-2" />
                Theme Studio
              </Button>

              <Button 
                onClick={handlePreview} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar with Animation */}
        <motion.div 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-80 border-r border-gray-200 bg-white/95 backdrop-blur-md flex flex-col shadow-lg"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-hidden"
            >
              {renderSidePanel()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Center Canvas Area */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex flex-col overflow-hidden relative"
        >
          <EnhancedFormCanvas
            elements={formConfig.elements}
            setFormConfig={setFormConfig}
            onSelectElement={handleElementSelect}
            selectedElement={selectedElement}
            formConfig={formConfig}
            onUpdate={setFormConfig}
          />
        </motion.div>

        {/* Right Info Panel */}
        <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-md overflow-y-auto shadow-lg"
        >
          <div className="p-6 space-y-6">
            {/* Form Info */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Form Analytics</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Elements:</span>
                  <Badge variant="outline">{formConfig.elements.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required Fields:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {formConfig.elements.filter(el => el.required).length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Form Width:</span>
                  <Badge variant="outline">
                    {formConfig.settings.canvasStyles?.formWidth || 752}px
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Est. 87%
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Element Breakdown */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Element Breakdown</h3>
              </div>
              <div className="space-y-2 text-sm">
                {['text', 'email', 'select', 'textarea', 'checkbox'].map(type => {
                  const count = formConfig.elements.filter(el => el.type === type).length;
                  return count > 0 ? (
                    <div key={type} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{type}:</span>
                      <Badge variant="outline" className="text-xs">{count}</Badge>
                    </div>
                  ) : null;
                })}
              </div>
            </Card>

            {/* Pro Tips */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <h3 className="font-semibold">Pro Tips</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Use the floating buttons to quickly switch between panels</p>
                <p>• Drag elements from the library to build your form</p>
                <p>• Preview your form before publishing</p>
                <p>• Use validation rules to ensure data quality</p>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Floating Action Buttons */}
      <FloatingActionButtons
        activePanel={activePanel}
        onPanelChange={handlePanelChange}
        onQuickAction={handleQuickAction}
        onPreview={handlePreview}
        onThemeStudio={handleThemeStudio}
        onDesigner={handleDesigner}
      />

      {/* Modals */}
      <SaveSuccessDialog 
        open={showSaveDialog} 
        onOpenChange={setShowSaveDialog}
        formName={formConfig.name}
        onPublish={handlePublish}
        onClose={handleSaveDialogClose}
      />

      {showViewCode && (
        <ViewCodeModal 
          formConfig={formConfig}
          onClose={() => setShowViewCode(false)}
        />
      )}

      {showTestForm && (
        <TestFormModal 
          formConfig={formConfig}
          onClose={() => setShowTestForm(false)}
        />
      )}

      {showAIEnhance && (
        <AIEnhanceModal 
          formConfig={formConfig}
          onEnhance={handleAIEnhance}
          onClose={() => setShowAIEnhance(false)}
        />
      )}
    </div>
  );
};

export default FormBuilder;
