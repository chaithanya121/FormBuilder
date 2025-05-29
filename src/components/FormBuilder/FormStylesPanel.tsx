
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormConfig } from './types';
import { useEnhancedTheme } from '@/components/ui/enhanced-theme';
import { Palette, Settings, Code, Layout } from 'lucide-react';

interface FormStylesPanelProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const PRESET_STYLES = {
  "Light Theme": {
    backgroundColor: "#ffffff",
    formBackgroundColor: "#ffffff",
    fontColor: "#000000",
    primaryColor: "#3b82f6",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    backgroundImage: "",
  },
  "Dark Theme": {
    backgroundColor: "#1a1a1a",
    formBackgroundColor: "#2d2d2d",
    fontColor: "#ffffff",
    primaryColor: "#3b82f6",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    backgroundImage: "",
  },
  "Gradient Background": {
    backgroundColor: "",
    backgroundImage: "linear-gradient(135deg, #6a11cb, #2575fc)",
    formBackgroundColor: "rgba(255,255,255,0.9)",
    fontColor: "#000000",
    primaryColor: "#6a11cb",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
  },
};

const FormStylesPanel: React.FC<FormStylesPanelProps> = ({ formConfig, onUpdate }) => {
  const { themeClasses } = useEnhancedTheme();

  const handleCanvasStyleChange = (field: string, value: string) => {
    const updatedCanvasStyles = { 
      ...formConfig.settings.canvasStyles, 
      [field]: value 
    };
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: updatedCanvasStyles,
      },
    });
  };

  const handleLayoutChange = (field: string, value: any) => {
    const updatedLayout = { 
      ...formConfig.settings.layout, 
      [field]: value 
    };
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        layout: updatedLayout,
      },
    });
  };

  const applyPresetStyle = (presetName: string) => {
    const presetStyles = PRESET_STYLES[presetName];
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          ...presetStyles,
        },
      },
    });
  };

  const getStyleStringValue = (style: string | number | undefined): string => {
    if (style === undefined) return '';
    if (typeof style === 'string') {
      return style.replace('px', '');
    }
    return String(style);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="canvas-styling" className="w-full">
        <TabsList className={`${themeClasses.card} mb-6 p-1 rounded-xl border grid grid-cols-4 w-full`}>
          <TabsTrigger 
            value="canvas-styling" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Styling
          </TabsTrigger>
          <TabsTrigger 
            value="layout-settings" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Layout className="h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Advanced
          </TabsTrigger>
          <TabsTrigger 
            value="import" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            Import/Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="canvas-styling" className="space-y-6">
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

            <div className="grid grid-cols-2 gap-4">
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
                <Label className={`${themeClasses.text} font-medium`}>Form Background</Label>
                <Input
                  value={formConfig.settings.canvasStyles?.formBackgroundColor || ""}
                  onChange={(e) => handleCanvasStyleChange("formBackgroundColor", e.target.value)}
                  placeholder="e.g., #f8fafc"
                  className={`${themeClasses.input} rounded-xl border-2`}
                />
              </div>

              <div className="space-y-3">
                <Label className={`${themeClasses.text} font-medium`}>Font Color</Label>
                <Input
                  value={formConfig.settings.canvasStyles?.fontColor || ""}
                  onChange={(e) => handleCanvasStyleChange("fontColor", e.target.value)}
                  placeholder="e.g., #000000"
                  className={`${themeClasses.input} rounded-xl border-2`}
                />
              </div>

              <div className="space-y-3">
                <Label className={`${themeClasses.text} font-medium`}>Primary Color</Label>
                <Input
                  value={formConfig.settings.canvasStyles?.primaryColor || ""}
                  onChange={(e) => handleCanvasStyleChange("primaryColor", e.target.value)}
                  placeholder="e.g., #3b82f6"
                  className={`${themeClasses.input} rounded-xl border-2`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Background Image</Label>
              <Input
                value={formConfig.settings.canvasStyles?.backgroundImage || ""}
                onChange={(e) => handleCanvasStyleChange("backgroundImage", e.target.value)}
                placeholder="e.g., https://example.com/image.jpg or linear-gradient(...)"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label className={`${themeClasses.text} font-medium`}>Padding</Label>
                <Input
                  type="number"
                  value={getStyleStringValue(formConfig.settings.canvasStyles?.padding)}
                  onChange={(e) => handleCanvasStyleChange("padding", `${e.target.value}px`)}
                  placeholder="e.g., 20"
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
                  placeholder="e.g., 8"
                  className={`${themeClasses.input} rounded-xl border-2`}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout-settings" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Form Width</Label>
              <Input
                type="number"
                value={formConfig.settings.canvasStyles?.formWidth || 752}
                onChange={(e) => handleCanvasStyleChange("formWidth", e.target.value)}
                placeholder="752"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>Resize form width in pixels</p>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Label Alignment</Label>
              <Select 
                value={formConfig.settings.layout?.labelAlignment || 'top'}
                onValueChange={(value) => handleLayoutChange('labelAlignment', value)}
              >
                <SelectTrigger className={`${themeClasses.input} rounded-xl border-2`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Question Spacing</Label>
              <Input
                type="number"
                value={formConfig.settings.layout?.questionSpacing || 12}
                onChange={(e) => handleLayoutChange('questionSpacing', parseInt(e.target.value))}
                placeholder="12"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>Distance between questions in pixels</p>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Label Width</Label>
              <Input
                type="number"
                value={formConfig.settings.layout?.labelWidth || 230}
                onChange={(e) => handleLayoutChange('labelWidth', parseInt(e.target.value))}
                placeholder="230"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>Resize label width in pixels</p>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Font Family</Label>
              <Select 
                value={formConfig.settings.canvasStyles?.fontFamily || 'Inter'}
                onValueChange={(value) => handleCanvasStyleChange('fontFamily', value)}
              >
                <SelectTrigger className={`${themeClasses.input} rounded-xl border-2`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Font Size</Label>
              <Input
                type="number"
                value={formConfig.settings.canvasStyles?.fontSize || 16}
                onChange={(e) => handleCanvasStyleChange('fontSize', e.target.value)}
                placeholder="16"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>Change font size in pixels</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Custom CSS</Label>
              <Textarea
                value={formConfig.settings.canvasStyles?.customCSS || ""}
                onChange={(e) => handleCanvasStyleChange("customCSS", e.target.value)}
                placeholder="/* Add your custom CSS here */&#10;.form-container {&#10;  /* Custom styles */&#10;}"
                className={`${themeClasses.input} rounded-xl border-2 min-h-[120px] font-mono text-sm`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Add custom CSS to override default styles and create unique designs.
              </p>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Form Container Class</Label>
              <Input
                value={formConfig.settings.canvasStyles?.containerClass || ""}
                onChange={(e) => handleCanvasStyleChange("containerClass", e.target.value)}
                placeholder="e.g., custom-form-container"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Add custom CSS class to the form container.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Import Configuration</Label>
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
                        onUpdate(importedConfig);
                      } catch (error) {
                        console.error('Import failed:', error);
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
                className={`${themeClasses.input} rounded-xl border-2`}
              />
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Export Configuration</Label>
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
                <Code className="h-4 w-4 mr-2" />
                Export Configuration
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormStylesPanel;
