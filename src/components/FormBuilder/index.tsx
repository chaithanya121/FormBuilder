import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FullyFunctionalElementLibrary from './FullyFunctionalElementLibrary';
import ToolsPanel from './ToolsPanel';
import EnhancedFormCanvas from './EnhancedFormCanvas';
import EnhancedFormPropertiesPanel from './EnhancedFormPropertiesPanel';
import EnhancedRightSidebar from './EnhancedRightSidebar';
import FormStylesPanel from './FormStylesPanel';
import HeaderLayoutControls from './HeaderLayoutControls';
import IntegrationsHub from './Integrations/IntegrationsHub';
import FormDesigner from './FormDesigner';
import SaveSuccessDialog from './SaveSuccessDialog';
import B2CInsights from './B2CInsights';
import ViewCodeModal from './QuickActions/ViewCodeModal';
import TestFormModal from './QuickActions/TestFormModal';
import AIEnhanceModal from './QuickActions/AIEnhanceModal';
import LogoConfiguration from './LogoConfiguration';
import EnhancedFormConfigurationPanel from './EnhancedFormConfigurationPanel';
import { FormConfig, FormElement } from './types';
import { CalculationEngine } from '@/services/calculation-engine';
import { NotificationService } from '@/services/notification-service';
import { CloudStorageManager } from '@/services/cloud-storage';
// import ToolsPanel from './ToolsPanel';
import { 
  Settings, Eye, Save, Upload, Download, Play, 
  Palette, Layers, Grid, Code, Sparkles, Wand2,
  HelpCircle, Info, Lightbulb, Zap, Target, Search, Filter,
  CircleArrowLeft, TrendingUp, Users, Activity, Calculator,
  Bell, Cloud, Database, Smartphone, Accessibility, MessageSquare,
  Image
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
        labelAlignment: "top",
        gridColumns: 1,
        elementWidth: 'full',
        customWidth: 100
      },
      canvasStyles: {
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        formBackgroundColor: "#ffffff",
        fontColor: "#321f16",
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
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
      },
      logo: {
        enabled: false,
        url: '',
        width: 100,
        height: 100,
        position: { top: 20, left: 20 },
        opacity: 1,
        borderRadius: 0
      },
      calculations: {
        enabled: false,
        fields: []
      },
      notifications: {
        enabled: false,
        rules: []
      },
      integrations: {
        api: false,
        cloudStorage: {
          enabled: false,
          providers: []
        },
        database: {
          enabled: false,
          type: "",
          connectionString: ""
        },
        realTimeTracking: true
      },
      accessibility: {
        screenReader: true,
        wcagCompliant: true,
        highContrast: false
      },
      collaboration: {
        comments: true,
        assignments: true,
        workflow: false
      },
      mobileLayout: {
        responsive: true,
        customBreakpoints: {
          mobile: 768,
          tablet: 1024,
          desktop: 1200
        },
        mobileSpecificElements: []
      }
    }
  });

  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [activePanel, setActivePanel] = useState<'elements' | 'configuration' | 'designer' | 'advanced' | 'logo' | 'form-config'>('elements');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [currentView, setCurrentView] = useState<'builder' | 'integrations' | 'designer' | 'advanced'>('builder');

  // Enhanced modal states
  const [showViewCode, setShowViewCode] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);
  const [showAIEnhance, setShowAIEnhance] = useState(false);
  const [showCalculationBuilder, setShowCalculationBuilder] = useState(false);
  const [showNotificationBuilder, setShowNotificationBuilder] = useState(false);

  // Services
  const [calculationEngine] = useState(new CalculationEngine());
  const [cloudStorageManager] = useState(new CloudStorageManager());

  // Memoized form config update to prevent unnecessary re-renders
  const handleFormConfigUpdate = useCallback((newConfig: FormConfig | ((prev: FormConfig) => FormConfig)) => {
    setFormConfig(prev => {
      const updated = typeof newConfig === 'function' ? newConfig(prev) : newConfig;
      return updated;
    });
  }, []);

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

  // Show error toast if there's an error (but prevent multiple toasts)
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleElementSelect = useCallback((element: FormElement) => {
    setSelectedElement(element);
    setActivePanel('configuration');
  }, []);

  const handleElementUpdate = useCallback((updatedElement: FormElement) => {
    handleFormConfigUpdate(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === updatedElement.id ? updatedElement : el
      )
    }));
    setSelectedElement(updatedElement);
  }, [handleFormConfigUpdate]);

  const onElementAdd = useCallback((element: FormElement) => {
    handleFormConfigUpdate(prev => ({
      ...prev,
      elements: [...prev.elements, element]
    }));
  }, [handleFormConfigUpdate]);

  // Enhanced calculation handling
  const handleAddCalculation = useCallback(() => {
    setShowCalculationBuilder(true);
  }, []);
  
  const handleSaveCalculation = useCallback((calculation: any) => {
    handleFormConfigUpdate(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        calculations: {
          ...prev.settings.calculations,
          enabled: true,
          fields: [...(prev.settings.calculations?.fields || []), calculation]
        }
      }
    }));
    setShowCalculationBuilder(false);
  }, [handleFormConfigUpdate]);
  
  // Enhanced notification handling
  const handleAddNotification = useCallback(() => {
    setShowNotificationBuilder(true);
  }, []);
  
  const handleSaveNotification = useCallback((rule: any) => {
    handleFormConfigUpdate(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        notifications: {
          ...prev.settings.notifications,
          enabled: true,
          rules: [...(prev.settings.notifications?.rules || []), rule]
        }
      }
    }));
    setShowNotificationBuilder(false);
  }, [handleFormConfigUpdate]);

  const handleDeleteElement = useCallback(() => {
    if (selectedElement) {
      handleFormConfigUpdate(prev => ({
        ...prev,
        elements: prev.elements.filter(el => el.id !== selectedElement.id)
      }));
      setSelectedElement(null);
    }
  }, [selectedElement, handleFormConfigUpdate]);

  const handleDuplicateElement = useCallback(() => {
    if (selectedElement) {
      const duplicatedElement = {
        ...selectedElement,
        id: Date.now().toString(),
        label: `${selectedElement.label} (Copy)`
      };
      handleFormConfigUpdate(prev => ({
        ...prev,
        elements: [...prev.elements, duplicatedElement]
      }));
    }
  }, [selectedElement, handleFormConfigUpdate]);

  const handlePreview = useCallback(() => {
    window.open(`/form-preview/${id || 'current'}`, '_blank');
  }, [id]);

  const handleSave = useCallback(async () => {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form. Please try again.",
        variant: "destructive"
      });
    }
  }, [currentForm, formConfig, dispatch, toast]);

  const handlePublish = useCallback(() => {
    toast({
      title: "Form Published!",
      description: "Your form is now live and ready to receive submissions.",
    });
  }, [toast]);

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(formConfig, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formConfig.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [formConfig]);

  const handleImport = useCallback(() => {
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
  }, [toast]);

  const handleNavigateToIntegrations = useCallback(() => {
    setCurrentView('integrations');
  }, []);

  const handleNavigateToDesigner = useCallback(() => {
    setActivePanel('designer');
  }, []);

  const handleNavigateToAdvanced = useCallback(() => {
    setCurrentView('advanced');
  }, []);

  const handleNavigateToLogo = useCallback(() => {
    setActivePanel('logo');
  }, []);

  const handleBackToBuilder = useCallback(() => {
    setCurrentView('builder');
  }, []);

  const handleQuickAction = useCallback((action: string) => {
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
      case 'admin-dashboard':
        navigate('/admin/dashboard');
        break;
      case 'realtime-tracker':
        navigate('/realtime-tracker');
        break;
      case 'form-wizard':
        navigate('/form-wizard');
        break;
      case 'help':
        toast({
          title: "FormCraft Pro Help",
          description: "Use the enhanced floating buttons to access all powerful features including calculations, notifications, and real-time tracking.",
        });
        break;
      default:
        break;
    }
  }, [handlePreview, navigate, toast]);

  const handleThemeStudio = useCallback(() => {
    navigate('/tools/theme-studio');
  }, [navigate]);

  const handleDesigner = useCallback(() => {
    setActivePanel('designer');
  }, []);

  const handleAIEnhance = useCallback((enhancedConfig: FormConfig) => {
    setFormConfig(enhancedConfig);
    setShowAIEnhance(false);
  }, []);

  const handlePanelChange = useCallback((panel: 'elements' | 'configuration' | 'designer' | 'advanced' | 'logo' | 'form-config') => {
    setActivePanel(panel);
  }, []);

  const handleSaveDialogClose = useCallback(() => {
    setShowSaveDialog(false);
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, elementType: string) => {
    console.log('Setting drag data for element type:', elementType);
    e.dataTransfer.setData('text/plain', elementType);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  // Memoized side panel to prevent unnecessary re-renders
  const renderEnhancedSidePanel = useMemo(() => {
    switch (activePanel) {
      case 'elements':
        return (
          <FullyFunctionalElementLibrary 
            onElementAdd={onElementAdd}
            formConfig={formConfig}
            onDragStart={handleDragStart}
          />
        );
      case 'configuration':
        return (
          <EnhancedFormPropertiesPanel
            formConfig={formConfig}
            selectedElement={selectedElement}
            onFormConfigUpdate={handleFormConfigUpdate}
            onElementUpdate={handleElementUpdate}
            onElementDelete={handleDeleteElement}
            onElementDuplicate={handleDuplicateElement}
            onClose={() => setActivePanel('elements')}
          />
        );
      case 'form-config':
        return (
          <EnhancedFormConfigurationPanel
            formConfig={formConfig}
            onUpdate={handleFormConfigUpdate}
            onElementAdd={onElementAdd}
            onDragStart={handleDragStart}
          />
        );
      case 'designer':
        return (
          <FormStylesPanel
            formConfig={formConfig}
            onUpdate={handleFormConfigUpdate}
            onClose={() => setActivePanel('elements')}
          />
        );
      case 'logo':
        return (
          <LogoConfiguration
            formConfig={formConfig}
            onUpdate={handleFormConfigUpdate}
          />
        );
      case 'advanced':
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Advanced Features</h3>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span className="font-medium">Calculations</span>
                </div>
                <Button size="sm" onClick={handleAddCalculation}>
                  Add
                </Button>
              </div>
              <p className="text-sm text-gray-600">Auto-calculate totals and scores</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="font-medium">Notifications</span>
                </div>
                <Button size="sm" onClick={handleAddNotification}>
                  Add
                </Button>
              </div>
              <p className="text-sm text-gray-600">Email/SMS alerts on submission</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  <span className="font-medium">Cloud Storage</span>
                </div>
                <Button size="sm">
                  Configure
                </Button>
              </div>
              <p className="text-sm text-gray-600">Google Drive, Dropbox integration</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Database</span>
                </div>
                <Button size="sm">
                  Setup
                </Button>
              </div>
              <p className="text-sm text-gray-600">Advanced data storage & search</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Accessibility className="h-4 w-4" />
                  <span className="font-medium">Accessibility</span>
                </div>
                <Button size="sm">
                  Enable
                </Button>
              </div>
              <p className="text-sm text-gray-600">WCAG compliance & screen readers</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">Collaboration</span>
                </div>
                <Button size="sm">
                  Configure
                </Button>
              </div>
              <p className="text-sm text-gray-600">Comments & team assignments</p>
            </Card>
          </div>
        );
      default:
        return null;
    }
  }, [activePanel, formConfig, selectedElement, onElementAdd, handleDragStart, handleFormConfigUpdate, handleElementUpdate, handleDeleteElement, handleDuplicateElement, handleAddCalculation, handleAddNotification]);

  // Render different views based on currentView state
  if (currentView === 'integrations') {
    return (
      <IntegrationsHub 
        onBack={handleBackToBuilder}
        formConfig={formConfig}
        onUpdate={handleFormConfigUpdate}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
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
                  className="h-6 w-6 xl:h-8 xl:w-8 mr-1 xl:mr-2 stroke-blue-500 cursor-pointer flex-shrink-0" 
                  onClick={() => navigate('/platform/forms')}
                />
                <div className="p-1.5 xl:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                  <Grid className="h-4 w-4 xl:h-6 xl:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                    FormCraft Pro Enhanced
                  </h1>
                  <p className="text-xs xl:text-sm text-gray-600 hidden sm:block">
                    {formConfig.elements.length} elements • AI-Powered • Real-time
                  </p>
                </div>
              </motion.div>
              
              <div className="flex gap-1">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                  v4.0 Enterprise
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  AI Enhanced
                </Badge>
              </div>

              {/* Form Name Input */}
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <Input
                  value={formConfig.name}
                  onChange={(e) => handleFormConfigUpdate(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full h-8 xl:h-9 text-sm"
                  placeholder="Form name"
                />
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center gap-1 xl:gap-3 flex-shrink-0">
              {/* Header Layout Controls */}
              <HeaderLayoutControls
                formConfig={formConfig}
                onUpdate={handleFormConfigUpdate}
              />

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActivePanel('form-config')}
                className="hidden lg:flex border-green-200 text-green-700 hover:bg-green-50"
              >
                <Settings className="h-4 w-4 mr-1 xl:mr-2" />
                <span className="hidden xl:inline">Config</span>
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNavigateToIntegrations}
                className="hidden lg:flex border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Zap className="h-4 w-4 mr-1 xl:mr-2" />
                <span className="hidden xl:inline">Integrations</span>
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/admin/dashboard')}
                className="hidden lg:flex border-green-200 text-green-700 hover:bg-green-50"
              >
                <Activity className="h-4 w-4 mr-1 xl:mr-2" />
                <span className="hidden xl:inline">Admin</span>
              </Button>

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

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Enhanced Left Sidebar */}
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
              {renderEnhancedSidePanel}
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
            setFormConfig={handleFormConfigUpdate}
            onSelectElement={handleElementSelect}
            selectedElement={selectedElement}
            formConfig={formConfig}
            onUpdate={handleFormConfigUpdate}
          />
        </motion.div>

        {/* Enhanced Right Info Panel */}
        {/* <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-72 xl:w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-md overflow-y-auto shadow-lg hidden xl:flex flex-col"
        >
          <EnhancedRightSidebar
            formConfig={formConfig}
            onNavigateToIntegrations={handleNavigateToIntegrations}
            onNavigateToDesigner={handleNavigateToDesigner}
            onNavigateToAdvanced={handleNavigateToAdvanced}
            onNavigateToLogo={handleNavigateToLogo}
          />
        </motion.div> */}
         <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-72 xl:w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-md overflow-y-auto shadow-lg hidden xl:flex flex-col"
        >
          <ToolsPanel
            onToolAction={handleQuickAction}
            onPreview={handlePreview}
            onSave={handleSave}
            onExport={handleExport}
            onImport={handleImport}
            onPanelChange={handlePanelChange}
          />
        </motion.div>
      </div>

      {/* Enhanced Modals */}
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
