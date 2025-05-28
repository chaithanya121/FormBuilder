import { ElementSettingsProps, FormElement } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Type, Mail, Lock, Calendar, CheckSquare, Check, List, Upload, Radio, Grid, Table2, 
  ToggleLeft, Sliders, Image, Images, FileWarning, AlertTriangle, Heading1, Heading2, Heading3, 
  Heading4, AlignLeft, Quote, Link2, SeparatorHorizontal, Code, Rows, LayoutGrid, Container, 
  Columns2, Columns3, Columns4, ListTree, Settings, Palette, Layers } from "lucide-react";
import FormElementRenderer from "@/components/FormElementRenderer";
import { useEnhancedTheme } from "@/components/ui/enhanced-theme";
import { motion } from "framer-motion";

const ElementSettings = ({ element, onUpdate, onClose }: ElementSettingsProps) => {
  const { theme, themeClasses } = useEnhancedTheme();

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ ...element, [field]: value });
  };

  const handleOptionsChange = (options: string[]) => {
    const updatedElement = { 
      ...element, 
      options,
      // Initialize the value to the first option if it's a new element
      value: element.value || (options.length > 0 ? options[0] : undefined)
    };
    onUpdate(updatedElement);
  };

  const addOption = () => {
    const currentOptions = Array.isArray(element.options) ? element.options : [];
    const newOptionIndex = currentOptions.length + 1;
    const newOption = `Option ${newOptionIndex}`;
    handleOptionsChange([...currentOptions, newOption]);
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = Array.isArray(element.options) ? [...element.options] : [];
    currentOptions[index] = value.trim() || `Option ${index + 1}`;
    handleOptionsChange(currentOptions);
  };

  const removeOption = (index: number) => {
    if (!Array.isArray(element.options)) return;
    const currentOptions = [...element.options];
    currentOptions.splice(index, 1);
    handleOptionsChange(currentOptions);
  };

  const isFieldElement = FIELD_ELEMENTS.some(item => item.type === element.type);
  const isStaticElement = STATIC_ELEMENTS.some(item => item.type === element.type);
  const isStructureElement = STRUCTURE_ELEMENTS.some(item => item.type === element.type);
  const hasOptions = ["select", "multiselect", "radio-group", "checkbox-group", "radio-blocks", "checkbox-tabs"].includes(element.type);
  const isSlider = ["slider", "range-slider", "vertical-slider"].includes(element.type);
  const isFileUpload = ["file-upload", "multi-file-upload", "image-upload", "multi-image-upload", "gallery"].includes(element.type);

  console.log("Current element:", element);
  console.log("Has options:", hasOptions);
  console.log("Current options:", element.options);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-6 p-6 ${themeClasses.card} rounded-2xl border-2 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${themeClasses.accent} rounded-xl`}>
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${themeClasses.text} capitalize`}>
              {element.type.replace('-', ' ')} Settings
            </h3>
            <p className={`text-sm ${themeClasses.textMuted}`}>
              Customize this element's properties
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className={`${themeClasses.button} hover:bg-red-500/10 hover:text-red-500 rounded-xl`}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className={`${themeClasses.card} p-1 rounded-xl border grid w-full ${isFieldElement ? 'grid-cols-4' : 'grid-cols-2'}`}>
          <TabsTrigger 
            value="properties" 
            className={`data-[state=active]:${themeClasses.accent} data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2`}
          >
            <Layers className="h-4 w-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger 
            value="layout" 
            className={`data-[state=active]:${themeClasses.accent} data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2`}
          >
            <LayoutGrid className="h-4 w-4" />
            Layout
          </TabsTrigger>
          {isFieldElement && (
            <TabsTrigger 
              value="validation" 
              className={`data-[state=active]:${themeClasses.accent} data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2`}
            >
              <CheckSquare className="h-4 w-4" />
              Validation
            </TabsTrigger>
          )}
          {(isSlider || isFileUpload) && (
            <TabsTrigger 
              value={isSlider ? "range" : "upload"} 
              className={`data-[state=active]:${themeClasses.accent} data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2`}
            >
              {isSlider ? <Sliders className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              {isSlider ? "Range" : "Upload"}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="properties" className="space-y-6 mt-6">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <Label className={`${themeClasses.text} font-semibold flex items-center gap-2`}>
                <Type className="h-4 w-4" />
                Element Name
              </Label>
              <Input
                value={element.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`${themeClasses.input} rounded-xl border-2 transition-all duration-200 focus:scale-[1.02]`}
                placeholder="Enter element name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <Label className={`${themeClasses.text} font-semibold`}>Display Label</Label>
              <Input
                value={element.label}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className={`${themeClasses.input} rounded-xl border-2 transition-all duration-200 focus:scale-[1.02]`}
                placeholder="Enter display label"
              />
            </motion.div>

            {isFieldElement && (
              <>
                {["text", "email", "password"].includes(element.type) && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <Label className={`${themeClasses.text} font-semibold`}>Input Type</Label>
                    <Select 
                      value={element.inputType || element.type}
                      onValueChange={(value) => handleInputChange("inputType", value)}
                    >
                      <SelectTrigger className={`${themeClasses.input} rounded-xl border-2`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="password">Password</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="tel">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Label className={`${themeClasses.text} font-semibold`}>Placeholder Text</Label>
                  <Input
                    value={element.placeholder || ""}
                    onChange={(e) => handleInputChange("placeholder", e.target.value)}
                    className={`${themeClasses.input} rounded-xl border-2 transition-all duration-200 focus:scale-[1.02]`}
                    placeholder="Enter placeholder text"
                  />
                </motion.div>
              </>
            )}

            {(isFieldElement || isStaticElement) && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Label className={`${themeClasses.text} font-semibold`}>Tooltip</Label>
                  <Input
                    value={element.tooltip || ""}
                    onChange={(e) => handleInputChange("tooltip", e.target.value)}
                    className={`${themeClasses.input} rounded-xl border-2 transition-all duration-200 focus:scale-[1.02]`}
                    placeholder="Enter tooltip text"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Label className={`${themeClasses.text} font-semibold`}>Description</Label>
                  <Textarea
                    value={element.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`${themeClasses.input} rounded-xl border-2 transition-all duration-200 focus:scale-[1.02] min-h-[80px]`}
                    placeholder="Enter description"
                  />
                </motion.div>
              </>
            )}

            {hasOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`space-y-6 mt-8 pt-6 border-t ${themeClasses.card} rounded-xl p-4`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-blue-500" />
                  <Label className={`text-xl font-bold ${themeClasses.text}`}>Options Configuration</Label>
                </div>
                
                {/* Add preview of the element */}
                <div className={`mb-6 p-4 ${themeClasses.decoration} rounded-xl`}>
                  <Label className={`${themeClasses.text} font-medium mb-3 block`}>Live Preview</Label>
                  <FormElementRenderer element={element} />
                </div>
                
                <Button 
                  onClick={addOption} 
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <List className="h-4 w-4 mr-2" />
                  Add New Option
                </Button>
                
                <div className="space-y-3">
                  {Array.isArray(element.options) && element.options.map((option, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm"
                    >
                      <div className="flex-1">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className={`${themeClasses.input} border-0 bg-transparent focus:bg-white/10 transition-all duration-200`}
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {isStructureElement && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <Label className={`${themeClasses.text} font-semibold`}>Container Type</Label>
                <Select 
                  value={element.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className={`${themeClasses.input} rounded-xl border-2`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STRUCTURE_ELEMENTS.map((item) => (
                      <SelectItem key={item.type} value={item.type}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <Label className={`${themeClasses.text} font-semibold`}>Auto Float</Label>
              <Select
                value={element.autoFloat || "Default"}
                onValueChange={(value) => handleInputChange("autoFloat", value)}
              >
                <SelectTrigger className={`w-[120px] ${themeClasses.input} rounded-xl border-2`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">Default</SelectItem>
                  <SelectItem value="Off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </TabsContent>

        {isFieldElement && (
          <TabsContent value="validation" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <Label className={`${themeClasses.text} font-semibold`}>Required Field</Label>
                <Switch
                  checked={element.required}
                  onCheckedChange={(checked) => handleInputChange("required", checked)}
                />
              </div>

              {["text", "email", "password"].includes(element.type) && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className={`${themeClasses.text} font-semibold`}>Minimum Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.minLength || ""}
                      onChange={(e) =>
                        handleInputChange("validation", {
                          ...element.validation,
                          minLength: parseInt(e.target.value) || undefined,
                        })
                      }
                      className={`${themeClasses.input} rounded-xl border-2`}
                      placeholder="Enter minimum length"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className={`${themeClasses.text} font-semibold`}>Maximum Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.maxLength || ""}
                      onChange={(e) =>
                        handleInputChange("validation", {
                          ...element.validation,
                          maxLength: parseInt(e.target.value) || undefined,
                        })
                      }
                      className={`${themeClasses.input} rounded-xl border-2`}
                      placeholder="Enter maximum length"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>
        )}

        {isSlider && (
          <TabsContent value="range" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label className={`${themeClasses.text} font-semibold`}>Min Value</Label>
                <Input
                  type="number"
                  value={element.validation?.min || 0}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      min: parseInt(e.target.value),
                    })
                  }
                  className={`${themeClasses.input} rounded-xl border-2`}
                  placeholder="Enter minimum value"
                />
              </div>
              <div className="space-y-2">
                <Label className={`${themeClasses.text} font-semibold`}>Max Value</Label>
                <Input
                  type="number"
                  value={element.validation?.max || 100}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      max: parseInt(e.target.value),
                    })
                  }
                  className={`${themeClasses.input} rounded-xl border-2`}
                  placeholder="Enter maximum value"
                />
              </div>
              <div className="space-y-2">
                <Label className={`${themeClasses.text} font-semibold`}>Step</Label>
                <Input
                  type="number"
                  value={element.validation?.step || 1}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      step: parseInt(e.target.value),
                    })
                  }
                  className={`${themeClasses.input} rounded-xl border-2`}
                  placeholder="Enter step value"
                />
              </div>
            </motion.div>
          </TabsContent>
        )}

        {isFileUpload && (
          <TabsContent value="upload" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label className={`${themeClasses.text} font-semibold`}>Accepted File Types</Label>
                <Input
                  value={element.validation?.accept || ""}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      accept: e.target.value,
                    })
                  }
                  placeholder=".jpg,.png,.pdf"
                  className={`${themeClasses.input} rounded-xl border-2`}
                  placeholder="Enter accepted file types"
                />
              </div>
              <div className="space-y-2">
                <Label className={`${themeClasses.text} font-semibold`}>Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={element.validation?.maxSize || ""}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      maxSize: parseInt(e.target.value),
                    })
                  }
                  className={`${themeClasses.input} rounded-xl border-2`}
                  placeholder="Enter max file size"
                />
              </div>
              {["multi-file-upload", "multi-image-upload", "gallery"].includes(element.type) && (
                <div className="space-y-2">
                  <Label className={`${themeClasses.text} font-semibold`}>Max Number of Files</Label>
                  <Input
                    type="number"
                    value={element.validation?.maxFiles || ""}
                    onChange={(e) =>
                      handleInputChange("validation", {
                        ...element.validation,
                        maxFiles: parseInt(e.target.value),
                      })
                    }
                    className={`${themeClasses.input} rounded-xl border-2`}
                    placeholder="Enter max files"
                  />
                </div>
              )}
            </motion.div>
          </TabsContent>
        )}
      </Tabs>
    </motion.div>
  );
};

const FIELD_ELEMENTS = [
  { type: "text", icon: Type, label: "Text Input", description: "Single line text input" },
  { type: "email", icon: Mail, label: "Email Input", description: "Text field that expects an email" },
  { type: "password", icon: Lock, label: "Password", description: "Text field that expects a password" },
  { type: "date", icon: Calendar, label: "Date Picker", description: "Date picker input" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox", description: "Plain checkbox input" },
  { type: "radio", icon: Check, label: "Radio Button", description: "Plain radio input" },
  { type: "select", icon: List, label: "Select", description: "Select input" },
  { type: "file", icon: Upload, label: "File Upload", description: "File upload input" },
  { type: "textarea", icon: Type, label: "Textarea", description: "Single line or multiline text area" },
  { type: 'checkbox-group', icon: CheckSquare, label: 'Checkbox group', description: 'Plain checkbox options' },
  { type: 'checkbox-blocks', icon: CheckSquare, label: 'Checkbox blocks', description: 'Checkbox options as blocks' },
  { type: 'checkbox-tabs', icon: CheckSquare, label: 'Checkbox tabs', description: 'Checkbox options masked as tabs' },
  { type: 'radio-group', icon: Radio, label: 'Radio group', description: 'Plain radio options' },
  { type: 'radio-blocks', icon: Radio, label: 'Radio blocks', description: 'Radio options as blocks' },
  { type: 'radio-tabs', icon: Radio, label: 'Radio tabs', description: 'Radio options masked as tabs' },
  { type: 'matrix', icon: Grid, label: 'Matrix', description: 'A matrix of input fields' },
  { type: 'matrix-table', icon: Table2, label: 'Matrix table', description: 'Spreadsheet like table of text inputs' },
  { type: 'toggle', icon: ToggleLeft, label: 'Toggle', description: 'Toggle / switch button' },
  { type: 'file-upload', icon: Upload, label: 'File upload', description: 'File upload input' },
  { type: 'multi-file-upload', icon: Upload, label: 'Multi-file upload', description: 'Multi-file upload input' },
  { type: 'image-upload', icon: Image, label: 'Image upload', description: 'File upload with image only' },
  { type: 'multi-image-upload', icon: Images, label: 'Multi-image upload', description: 'Multi-file upload with images only' },
  { type: 'gallery', icon: Images, label: 'Gallery', description: 'Multi-image upload with gallery view' },
  { type: 'captcha', icon: FileWarning, label: 'Captcha', description: 'Prevents submission by robots' },
  { type: 'hidden-input', icon: Lock, label: 'Hidden input', description: 'Single line or multiline text area' },
];

const STATIC_ELEMENTS = [
  { type: 'danger-button', icon: AlertTriangle, label: 'Danger button', description: 'Button with danger color' },
  { type: 'h1', icon: Heading1, label: 'H1 header', description: 'HTML <h1> tag' },
  { type: 'h2', icon: Heading2, label: 'H2 header', description: 'HTML <h2> tag' },
  { type: 'h3', icon: Heading3, label: 'H3 header', description: 'HTML <h3> tag' },
  { type: 'h4', icon: Heading4, label: 'H4 header', description: 'HTML <h4> tag' },
  { type: 'paragraph', icon: AlignLeft, label: 'Paragraph', description: 'HTML <p> tag' },
  { type: 'quote', icon: Quote, label: 'Quote', description: 'HTML <quote> tag' },
  { type: 'image', icon: Image, label: 'Image', description: 'HTML <img> tag' },
  { type: 'link', icon: Link2, label: 'Link', description: 'HTML <a> tag' },
  { type: 'divider', icon: SeparatorHorizontal, label: 'Divider', description: 'HTML <hr> tag' },
  { type: 'static-html', icon: Code, label: 'Static HTML', description: 'Plain HTML element' },
];

const STRUCTURE_ELEMENTS = [
  { type: 'tabs', icon: Rows, label: 'Tabs', description: 'Break forms into tabs' },
  { type: 'steps', icon: List, label: 'Steps', description: 'Break forms into steps' },
  { type: 'grid', icon: LayoutGrid, label: 'Grid', description: 'Create complex layouts' },
  { type: 'table', icon: Table2, label: 'Table', description: 'Organize data in rows and columns' },
  { type: 'container', icon: Container, label: 'Container', description: 'A container to group elements' },
  { type: '2-columns', icon: Columns2, label: '2 columns', description: 'Two columns next to each other' },
  { type: '3-columns', icon: Columns3, label: '3 columns', description: 'Three columns next to each other' },
  { type: '4-columns', icon: Columns4, label: '4 columns', description: 'Four columns next to each other' },
  { type: 'list', icon: List, label: 'List', description: 'Repeatable single element' },
  { type: 'nested-list', icon: ListTree, label: 'Nested list', description: 'Repeatable elements in an object' },
];

export default ElementSettings;
