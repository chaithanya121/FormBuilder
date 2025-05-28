import { DragEvent, useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FormElement, FormConfig, FormElementType } from "./types";
import FormElementLibrary from "./FormElementLibrary";
import FormCanvas from "./FormCanvas";
import FormPreview from "./FormPreview";
import ElementSettings from "./ElementSettings";
import { Button } from "@/components/ui/button";
import { Eye, Code, Layers, ArrowLeft, Globe, Link, Palette, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import JsonViewer from "../ui/json-viewer";
import { formsApi, FormData } from "@/services/forms";
import SaveSuccessDialog from "./SaveSuccessDialog";
import PublishSuccessDialog from "./PublishSuccessDialog";
import { useEnhancedTheme } from "@/components/ui/enhanced-theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const DEFAULT_CONFIG: FormConfig = {
  name: "Create account",
  elements: [],
  settings: {
    termsAndConditions: {
      enabled: true,
      required: true,
      text: "I accept the Terms & Conditions & Privacy Policy",
    },
    submitButton: {
      enabled: true,
      text: "Submit",
    },
    preview: {
      width: "Full",
      nesting: true,
    },
    validation: {
      liveValidation: "Default",
    },
    layout: {
      size: "Default",
      columns: {
        default: true,
        tablet: false,
        desktop: false,
      },
      labels: "Default",
      placeholders: "Default",
      errors: "Default",
      messages: "Default",
    },
  },
};

const PRESET_STYLES = {
  "Light Theme": {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    backgroundImage: "",
  },
  "Dark Theme": {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    backgroundImage: "",
  },
  "Gradient Background": {
    backgroundColor: "",
    backgroundImage: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#ffffff",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
  },
};

const FormBuilder = () => {
  const { theme, themeClasses } = useEnhancedTheme();
  const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_CONFIG);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [savedFormId, setSavedFormId] = useState<string | undefined>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formId, setFormId] = useState<string | undefined>(undefined);
  const formInitialized = useRef(false);

  useEffect(() => {
    if (id && !formInitialized.current) {
      formInitialized.current = true;
      const loadForm = async () => {
        try {
          console.log('Attempting to load form with primary_id:', id);
          const formToEdit = await formsApi.getFormById(id);
          if (formToEdit && 'config' in formToEdit && formToEdit.config) {
            setFormConfig(formToEdit.config);
            setIsPublished(formToEdit.published || false);
            setFormId(formToEdit.primary_id);
            toast({
              title: "Form Loaded",
              description: `Editing form: ${formToEdit.name}`,
            });
          } else {
            console.log('Form not found, creating new form');
            toast({
              title: "Form Not Found",
              description: "Creating a new form instead",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Error loading form:', error);
          toast({
            title: "Error Loading Form",
            description: "Creating a new form instead",
            variant: "destructive"
          });
        }
      };
      loadForm();
    }
  }, [id, toast]);

  const [isPublished, setIsPublished] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, elementType: string) => {
    e.dataTransfer.setData("elementType", elementType);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("elementType");
    const newElement: FormElement = {
      id: `element-${Date.now()}`,
      type: elementType as FormElementType,
      label: `New ${elementType}`,
      required: false,
      placeholder: `Enter ${elementType}`,
      nestedData: false,
      description: "",
      name: elementType.toLowerCase(),
      options: [],
    };

    setFormConfig((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));

    toast({
      title: "Element Added",
      description: `Added new ${elementType} element to the form`,
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleElementSelect = (element: FormElement) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (updatedElement: FormElement) => {
    setFormConfig((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === updatedElement.id ? updatedElement : el
      ),
    }));

    setSelectedElement(updatedElement);
  };

  const handleCanvasStyleChange = (field: string, value: string) => {
    const updatedCanvasStyles = { ...formConfig.settings.canvasStyles, [field]: value };
    setFormConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        canvasStyles: updatedCanvasStyles,
      },
    }));
  };

  const getStyleStringValue = (style: string | number | undefined): string => {
    if (style === undefined) return '';
    
    if (typeof style === 'string') {
      return style.replace('px', '');
    }
    
    return String(style);
  };

  const applyPresetStyle = (presetName: string) => {
    const presetStyles = PRESET_STYLES[presetName];
    setFormConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        canvasStyles: {
          ...prev.settings.canvasStyles,
          ...presetStyles,
        },
      },
    }));
    
    toast({
      title: "Style Applied",
      description: `Applied ${presetName} style to the form`,
    });
  };

  const handleSaveAndPublish = async () => {
    try {
      let currentFormId = id;
      
      if (id) {
        // Update existing form
        const currentForm = await formsApi.getFormById(id);
        if (currentForm && 'primary_id' in currentForm && currentForm.primary_id) {
          const formToUpdate: FormData = {
            primary_id: currentForm.primary_id,
            name: formConfig.name,
            createdAt: currentForm.createdAt,
            last_modified: new Date().toISOString(),
            submissions: currentForm.submissions || 0,
            published: false,
            config: formConfig
          };
          await formsApi.updateForm(formToUpdate);
        }
      } else {
        // Create new form
        const formObject = {
          name: formConfig.name,
          published: false,
          config: formConfig
        };
        const newForm = await formsApi.createForm(formObject);
        currentFormId = newForm.primary_id;
        setFormId(newForm.primary_id);
      }
      
      setSavedFormId(currentFormId);
      setShowSaveDialog(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form. " + (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handlePublishForm = async () => {
    try {
      const formIdToPublish = savedFormId || id;
      if (!formIdToPublish) return;

      const currentForm = await formsApi.getFormById(formIdToPublish);
      if (currentForm && 'primary_id' in currentForm && currentForm.primary_id) {
        const formToUpdate: FormData = {
          primary_id: currentForm.primary_id,
          name: currentForm.name,
          createdAt: currentForm.createdAt,
          last_modified: new Date().toISOString(),
          submissions: currentForm.submissions || 0,
          published: true,
          config: formConfig
        };
        await formsApi.updateForm(formToUpdate);
      }
      
      setShowSaveDialog(false);
      setShowPublishDialog(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish form. " + (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handleCloseDialogs = () => {
    setShowSaveDialog(false);
    setShowPublishDialog(false);
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-96 h-96 ${themeClasses.decorationSecondary} rounded-full blur-3xl opacity-30`}></div>
        <div className={`absolute bottom-20 left-20 w-80 h-80 ${themeClasses.decoration} rounded-full blur-3xl opacity-20`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${themeClasses.decorationSecondary} rounded-full blur-3xl opacity-10`}></div>
      </div>

      {/* Enhanced Header */}
      <header className={`${themeClasses.card} border-b backdrop-blur-xl sticky top-0 z-50 shadow-2xl transition-all duration-300`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <motion.button 
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${themeClasses.text} hover:text-blue-500 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10`}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <motion.div 
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl"
                  >
                    <Layers className="h-7 w-7 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30"></div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold ${themeClasses.heading} tracking-tight`}>
                    Form Builder Pro
                  </span>
                  <span className={`text-sm ${themeClasses.textMuted} -mt-1`}>
                    Advanced Form Creation Studio
                  </span>
                </div>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm">
                <Palette className={`h-4 w-4 ${themeClasses.text}`} />
                <span className={`text-sm font-medium ${themeClasses.text}`}>Theme</span>
                <ThemeToggle variant="switch" />
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  onClick={() => setPreviewMode(!previewMode)} 
                  className={`gap-2 ${themeClasses.button} border-2 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {previewMode ? <Code className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {previewMode ? "Edit Mode" : "Preview Mode"}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleSaveAndPublish} 
                  className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-3 font-semibold"
                >
                  <Globe className="h-4 w-4" />
                  Save & Publish
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 relative z-10">
        {/* Form Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className={`text-4xl font-bold ${themeClasses.heading}`}>
                {formConfig.name}
              </h1>
              <div className={`px-4 py-2 rounded-full ${themeClasses.decoration} backdrop-blur-sm`}>
                <span className={`text-sm font-medium ${themeClasses.text}`}>
                  {formConfig.elements.length} elements
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className={`gap-2 ${themeClasses.button} rounded-xl`}>
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className={`gap-2 ${themeClasses.button} rounded-xl`}>
                <Upload className="h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
          <p className={`mt-2 ${themeClasses.textMuted} text-lg`}>
            Create beautiful, interactive forms with our advanced drag-and-drop builder
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-12 gap-6"
        >
          {!previewMode ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-3"
              >
                <Card className={`${themeClasses.card} ${themeClasses.cardHover} backdrop-blur-xl border-2 p-6 h-[calc(100vh-12rem)] overflow-hidden transition-all duration-300`}>
                  <div className="h-full flex flex-col">
                    <div className="mb-6">
                      <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                        Element Library
                      </h3>
                      <p className={`text-sm ${themeClasses.textMuted}`}>
                        Drag elements to build your form
                      </p>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <FormElementLibrary onDragStart={handleDragStart} />
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="col-span-6"
              >
                <Card
                  className={`${themeClasses.card} ${themeClasses.cardHover} backdrop-blur-xl border-2 p-6 h-[calc(100vh-12rem)] transition-all duration-300 relative overflow-hidden`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10">
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                      Form Canvas
                    </h3>
                    <div className={`px-3 py-1 rounded-full ${themeClasses.decoration} backdrop-blur-sm`}>
                      <span className={`text-xs font-medium ${themeClasses.text}`}>
                        Live Preview
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-12 h-full overflow-y-auto">
                    <FormCanvas
                      elements={formConfig.elements}
                      setFormConfig={setFormConfig}
                      onSelectElement={handleElementSelect}
                      selectedElement={selectedElement}
                      formConfig={formConfig}
                      onUpdate={handleElementUpdate}
                    />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="col-span-3"
              >
                <Card className={`${themeClasses.card} ${themeClasses.cardHover} backdrop-blur-xl border-2 p-6 h-[calc(100vh-12rem)] overflow-hidden transition-all duration-300`}>
                  {selectedElement ? (
                    <div className="h-full">
                      <div className="mb-4 pb-4 border-b border-opacity-20">
                        <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                          Element Settings
                        </h3>
                        <p className={`text-sm ${themeClasses.textMuted}`}>
                          Customize {selectedElement.type}
                        </p>
                      </div>
                      <div className="overflow-y-auto flex-1">
                        <ElementSettings
                          key={selectedElement.id}
                          element={selectedElement}
                          onUpdate={handleElementUpdate}
                          onClose={() => setSelectedElement(undefined)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="mb-6">
                        <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                          Form Settings
                        </h3>
                        <p className={`text-sm ${themeClasses.textMuted}`}>
                          Customize your form appearance
                        </p>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto">
                        <Tabs defaultValue="canvas-styling" className="w-full">
                          <TabsList className={`${themeClasses.card} mb-6 p-1 rounded-xl border`}>
                            <TabsTrigger 
                              value="canvas-styling" 
                              className={`data-[state=active]:${themeClasses.accent} data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200`}
                            >
                              Styling
                            </TabsTrigger>
                            <TabsTrigger 
                              value="import" 
                              className={`data-[state=active]:${themeClasses.accent} data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200`}
                            >
                              Import/Export
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="canvas-styling" className="space-y-6">
                            {/* ... keep existing canvas styling content with enhanced styling */}
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <Label className={`${themeClasses.text} font-medium`}>Preset Styles</Label>
                                <Select onValueChange={(value) => applyPresetStyle(value)}>
                                  <SelectTrigger className={`${themeClasses.input} rounded-xl border-2`}>
                                    <SelectValue placeholder="Select a preset style" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.keys(PRESET_STYLES).map((presetName) => (
                                      <SelectItem key={presetName} value={presetName}>
                                        {presetName}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <Label className={`${themeClasses.text} font-medium`}>Background Color</Label>
                                  <Input
                                    value={formConfig.settings.canvasStyles?.backgroundColor || ""}
                                    onChange={(e) => handleCanvasStyleChange("backgroundColor", e.target.value)}
                                    placeholder="e.g., #ffffff"
                                    className={`${themeClasses.input} rounded-xl border-2`}
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label className={`${themeClasses.text} font-medium`}>Background Image</Label>
                                  <Input
                                    value={formConfig.settings.canvasStyles?.backgroundImage || ""}
                                    onChange={(e) => handleCanvasStyleChange("backgroundImage", e.target.value)}
                                    placeholder="e.g., https://example.com/image.jpg"
                                    className={`${themeClasses.input} rounded-xl border-2`}
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label className={`${themeClasses.text} font-medium`}>Padding</Label>
                                  <Input
                                    type="number"
                                    value={getStyleStringValue(formConfig.settings.canvasStyles?.padding)}
                                    onChange={(e) => handleCanvasStyleChange("padding", `${e.target.value}px`)}
                                    placeholder="e.g., 10"
                                    className={`${themeClasses.input} rounded-xl border-2`}
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label className={`${themeClasses.text} font-medium`}>Margin</Label>
                                  <Input
                                    type="number"
                                    value={getStyleStringValue(formConfig.settings.canvasStyles?.margin)}
                                    onChange={(e) => handleCanvasStyleChange("margin", `${e.target.value}px`)}
                                    placeholder="e.g., 10"
                                    className={`${themeClasses.input} rounded-xl border-2`}
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label className={`${themeClasses.text} font-medium`}>Border Radius</Label>
                                  <Input
                                    type="number"
                                    value={getStyleStringValue(formConfig.settings.canvasStyles?.borderRadius)}
                                    onChange={(e) => handleCanvasStyleChange("borderRadius", `${e.target.value}px`)}
                                    placeholder="e.g., 5"
                                    className={`${themeClasses.input} rounded-xl border-2`}
                                  />
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="import" className="space-y-6">
                            {/* ... keep existing import/export content with enhanced styling */}
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <Label className={`${themeClasses.text} font-medium`}>Import JSON</Label>
                                <Input
                                  type="file"
                                  accept=".json"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
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
                                            description: "Invalid JSON file.",
                                            variant: "destructive",
                                          });
                                        }
                                      };
                                      reader.readAsText(file);
                                    }
                                  }}
                                  className={`${themeClasses.input} rounded-xl border-2`}
                                />
                              </div>
                              <div className="space-y-3">
                                <Label className={`${themeClasses.text} font-medium`}>Export JSON</Label>
                                <Button
                                  variant="outline"
                                  className={`w-full ${themeClasses.button} rounded-xl border-2`}
                                  onClick={() => {
                                    const jsonString = JSON.stringify(formConfig, null, 2);
                                    const blob = new Blob([jsonString], { type: "application/json" });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = "form-config.json";
                                    a.click();
                                    URL.revokeObjectURL(url);
                                  }}
                                >
                                  Export Configuration
                                </Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-8"
              >
                <Card 
                  className={`${themeClasses.card} backdrop-blur-xl border-2 p-6 transition-all duration-300`}
                  style={{
                    backgroundColor: formConfig.settings.canvasStyles?.backgroundColor || '',
                    backgroundImage: formConfig.settings.canvasStyles?.backgroundImage || '',
                    padding: formConfig.settings.canvasStyles?.padding || '',
                    margin: formConfig.settings.canvasStyles?.margin || '',
                    borderRadius: formConfig.settings.canvasStyles?.borderRadius || '',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 'auto',
                  }}
                >
                  <FormPreview formConfig={formConfig} />
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-4"
              >
                <Card className={`${themeClasses.card} backdrop-blur-xl border-2 p-6 transition-all duration-300`}>
                  <div className="mb-4">
                    <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                      Form Configuration
                    </h3>
                    <p className={`text-sm ${themeClasses.textMuted}`}>
                      Live JSON preview of your form
                    </p>
                  </div>
                  <JsonViewer initialJson={JSON.stringify(formConfig, null, 2)} editJson={false}/>
                </Card>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      <SaveSuccessDialog 
        open={showSaveDialog}
        onPublish={handlePublishForm}
        onClose={handleCloseDialogs}
      />

      <PublishSuccessDialog 
        open={showPublishDialog}
        formId={savedFormId || id || ''}
        onClose={handleCloseDialogs}
      />
    </div>
  );
};

export default FormBuilder;
