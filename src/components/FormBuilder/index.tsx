
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
import ModernFloatingActions from './ModernFloatingActions';
import B2CInsights from './B2CInsights';
import ViewCodeModal from './QuickActions/ViewCodeModal';
import TestFormModal from './QuickActions/TestFormModal';
import AIEnhanceModal from './QuickActions/AIEnhanceModal';
import { FormConfig, FormElement } from './types';
import { 
  Settings, Eye, Save, Upload, Download, Play, 
  Palette, Layers, Grid, Code, Sparkles, Wand2,
  HelpCircle, Info, Lightbulb, Zap, Target, Search, Filter,
  CircleArrowLeft, TrendingUp, Users, Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createForm, fetchFormById, updateFormAction } from '@/store/slices/formsSlice';
import { useParams } from 'react-router-dom';

const FormBuilder: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  
  // Redux state
  const { forms, currentForm, loading, error } = useAppSelector((state) => state.forms);
  
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

  // Load form data from Redux on component mount
  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(fetchFormById(id));
    }
  }, [dispatch, id]);

  // Update local state when Redux state changes
  useEffect(() => {
    if (currentForm && currentForm.config) {
      setFormConfig(currentForm.config);
    }
  }, [currentForm]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

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
    const formId = currentForm?.primary_id || 'current';
    navigate(`/form-preview/${formId}`);
  };

  const handleSave = async () => {
    console.log(currentForm)
    try {
      if (currentForm?.primary_id) {
        // Update existing form
        await dispatch(updateFormAction({
          primary_id: currentForm.primary_id,
          name: formConfig.name,
          config: formConfig,
          createdAt: '',
          last_modified: new Date().toISOString(),
          submissions: 0,
          published: false
        }));
      } else {
        // Create new form
        await dispatch(createForm({
          name: formConfig.name,
          config: formConfig,
          published: false
        }));
      }
      setShowSaveDialog(true);
      toast({
        title: "Success",
        description: "Form saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePublish = () => {
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
        <div className="px-4 xl:px-6 py-3 xl:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 xl:gap-4 flex-1 min-w-0">
              <motion.div 
                className="flex items-center gap-2 xl:gap-3 min-w-0"
                whileHover={{ scale: 1.02 }}
              >
                <CircleArrowLeft 
                  className="h-6 w-6 xl:h-8 xl:w-8 mr-1 xl:mr-2 stroke-blue-500 dark:stroke-rose-200 cursor-pointer flex-shrink-0" 
                  onClick={() => navigate('/platform/forms')}
                />
                <div className="p-1.5 xl:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                  <Grid className="h-4 w-4 xl:h-6 xl:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                    FormCraft Pro
                  </h1>
                  <p className="text-xs xl:text-sm text-gray-600 hidden sm:block">
                    {formConfig.elements.length} elements • B2C Optimized
                  </p>
                </div>
              </motion.div>
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs hidden md:inline-flex">
                v3.0 B2C
              </Badge>

              {/* Form Name Input - Responsive */}
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <Input
                  value={formConfig.name}
                  onChange={(e) => setFormConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full h-8 xl:h-9 text-sm"
                  placeholder="Form name"
                />
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex items-center gap-1 xl:gap-3 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                disabled={loading}
                className="hidden sm:flex"
              >
                <Save className="h-4 w-4 mr-1 xl:mr-2" />
                <span className="hidden md:inline">Save</span>
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleThemeStudio}
                className="border-purple-200 text-purple-700 hover:bg-purple-50 hidden lg:flex"
              >
                <Palette className="h-4 w-4 mr-1 xl:mr-2" />
                <span className="hidden xl:inline">Theme Studio</span>
              </Button>

              <Button 
                onClick={handlePreview} 
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Eye className="h-4 w-4 mr-1 xl:mr-2" />
                <span className="hidden sm:inline">Preview</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area - Responsive */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar with Animation - Responsive */}
        <motion.div 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-72 xl:w-80 border-r border-gray-200 bg-white/95 backdrop-blur-md flex flex-col shadow-lg hidden lg:flex"
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

        {/* Center Canvas Area - Responsive */}
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

        {/* Right Info Panel - Enhanced with B2C Insights */}
        <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-72 xl:w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-md overflow-y-auto shadow-lg hidden xl:flex flex-col"
        >
          <div className="p-4 xl:p-6 space-y-4 xl:space-y-6">
            {/* B2C Insights Component */}
            <B2CInsights formConfig={formConfig} />

            {/* Form Analytics */}
            <Card className="p-3 xl:p-4 bg-white/80 backdrop-blur-sm border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold text-sm xl:text-base">Form Analytics</h3>
              </div>
              <div className="space-y-2 xl:space-y-3 text-xs xl:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Elements:</span>
                  <Badge variant="outline" className="text-xs">{formConfig.elements.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required Fields:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                    {formConfig.elements.filter(el => el.required).length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile Optimized:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    Yes
                  </Badge>
                </div>
              </div>
            </Card>

            {/* B2C Pro Tips */}
            <Card className="p-3 xl:p-4 bg-white/80 backdrop-blur-sm border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <h3 className="font-semibold text-sm xl:text-base">B2C Pro Tips</h3>
              </div>
              <div className="space-y-1 xl:space-y-2 text-xs text-gray-600">
                <p>• Keep forms short for mobile users</p>
                <p>• Use progressive disclosure for complex flows</p>
                <p>• Add social proof to increase conversions</p>
                <p>• Test with real customer data</p>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modern Floating Action Buttons */}
      <ModernFloatingActions
        activePanel={activePanel}
        onPanelChange={handlePanelChange}
        onQuickAction={handleQuickAction}
        onPreview={handlePreview}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        isLoading={loading}
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
