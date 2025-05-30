
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormConfig } from './types';
import { useEnhancedTheme } from '@/components/ui/enhanced-theme';
import { Palette, Settings, Code, Layout, Upload } from 'lucide-react';

interface FormStylesPanelProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const PRESET_THEMES = {
  "Ocean Breeze": {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    formBackgroundColor: "#ffffff",
    fontColor: "#2d3748",
    primaryColor: "#3182ce",
    secondaryColor: "#4299e1",
    fontFamily: "Inter",
    fontSize: 16,
    padding: "32px",
    margin: "10px",
    borderRadius: "16px",
  },
  "Sunset Glow": {
    backgroundColor: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    formBackgroundColor: "rgba(255,255,255,0.95)",
    fontColor: "#742a2a",
    primaryColor: "#e53e3e",
    secondaryColor: "#fc8181",
    fontFamily: "Inter",
    fontSize: 16,
    padding: "32px",
    margin: "10px",
    borderRadius: "16px",
  },
  "Forest Green": {
    backgroundColor: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    formBackgroundColor: "#ffffff",
    fontColor: "#1a202c",
    primaryColor: "#38a169",
    secondaryColor: "#68d391",
    fontFamily: "Inter",
    fontSize: 16,
    padding: "32px",
    margin: "10px",
    borderRadius: "16px",
  },
  "Purple Rain": {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    formBackgroundColor: "rgba(255,255,255,0.95)",
    fontColor: "#2d3748",
    primaryColor: "#805ad5",
    secondaryColor: "#b794f6",
    fontFamily: "Inter",
    fontSize: 16,
    padding: "32px",
    margin: "10px",
    borderRadius: "16px",
  },
  "Warm Gradient": {
    backgroundColor: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    formBackgroundColor: "#ffffff",
    fontColor: "#2d3748",
    primaryColor: "#ed8936",
    secondaryColor: "#fbb040",
    fontFamily: "Inter",
    fontSize: 16,
    padding: "32px",
    margin: "10px",
    borderRadius: "16px",
  }
};

const FormStylesPanel: React.FC<FormStylesPanelProps> = ({ formConfig, onUpdate }) => {
  const { themeClasses } = useEnhancedTheme();

  const handleCanvasStyleChange = (field: string, value: string | number) => {
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

  const applyPresetTheme = (themeName: string) => {
    const themeStyles = PRESET_THEMES[themeName];
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          ...themeStyles,
        },
      },
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleCanvasStyleChange('backgroundImage', `url(${result})`);
        handleCanvasStyleChange('backgroundColor', 'transparent');
      };
      reader.readAsDataURL(file);
    }
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
      <Tabs defaultValue="themes" className="w-full">
        <TabsList className={`${themeClasses.card} mb-6 p-1 rounded-xl border grid grid-cols-4 w-full`}>
          <TabsTrigger 
            value="themes" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Themes
          </TabsTrigger>
          <TabsTrigger 
            value="colors" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger 
            value="typography" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Layout className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger 
            value="layout" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className={`${themeClasses.text} font-medium mb-3 block`}>Preset Themes</Label>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(PRESET_THEMES).map(([themeName, themeStyles]) => (
                  <div 
                    key={themeName}
                    className="relative cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors"
                    onClick={() => applyPresetTheme(themeName)}
                  >
                    <div 
                      className="h-16 w-full flex items-center justify-center text-white font-medium"
                      style={{ background: themeStyles.backgroundColor }}
                    >
                      <div 
                        className="px-4 py-2 rounded-lg text-sm"
                        style={{ 
                          backgroundColor: themeStyles.formBackgroundColor, 
                          color: themeStyles.fontColor 
                        }}
                      >
                        {themeName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Custom Background</Label>
              <div className="space-y-2">
                <Input
                  value={formConfig.settings.canvasStyles?.backgroundColor || ""}
                  onChange={(e) => handleCanvasStyleChange("backgroundColor", e.target.value)}
                  placeholder="e.g., #ffffff or linear-gradient(...)"
                  className={`${themeClasses.input} rounded-xl border-2`}
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={`${themeClasses.input} rounded-xl border-2`}
                    id="background-upload"
                  />
                  <Label htmlFor="background-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={formConfig.settings.canvasStyles?.primaryColor || "#3b82f6"}
                  onChange={(e) => handleCanvasStyleChange("primaryColor", e.target.value)}
                  className="w-16 h-10 rounded-lg border-2"
                />
                <Input
                  value={formConfig.settings.canvasStyles?.primaryColor || "#3b82f6"}
                  onChange={(e) => handleCanvasStyleChange("primaryColor", e.target.value)}
                  className={`${themeClasses.input} rounded-xl border-2 flex-1`}
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Secondary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={formConfig.settings.canvasStyles?.secondaryColor || "#64748b"}
                  onChange={(e) => handleCanvasStyleChange("secondaryColor", e.target.value)}
                  className="w-16 h-10 rounded-lg border-2"
                />
                <Input
                  value={formConfig.settings.canvasStyles?.secondaryColor || "#64748b"}
                  onChange={(e) => handleCanvasStyleChange("secondaryColor", e.target.value)}
                  className={`${themeClasses.input} rounded-xl border-2 flex-1`}
                  placeholder="#64748b"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={formConfig.settings.canvasStyles?.fontColor || "#000000"}
                  onChange={(e) => handleCanvasStyleChange("fontColor", e.target.value)}
                  className="w-16 h-10 rounded-lg border-2"
                />
                <Input
                  value={formConfig.settings.canvasStyles?.fontColor || "#000000"}
                  onChange={(e) => handleCanvasStyleChange("fontColor", e.target.value)}
                  className={`${themeClasses.input} rounded-xl border-2 flex-1`}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Form Background</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={formConfig.settings.canvasStyles?.formBackgroundColor || "#ffffff"}
                  onChange={(e) => handleCanvasStyleChange("formBackgroundColor", e.target.value)}
                  className="w-16 h-10 rounded-lg border-2"
                />
                <Input
                  value={formConfig.settings.canvasStyles?.formBackgroundColor || "#ffffff"}
                  onChange={(e) => handleCanvasStyleChange("formBackgroundColor", e.target.value)}
                  className={`${themeClasses.input} rounded-xl border-2 flex-1`}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Input Background</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={formConfig.settings.canvasStyles?.inputBackground || "#ffffff"}
                  onChange={(e) => handleCanvasStyleChange("inputBackground", e.target.value)}
                  className="w-16 h-10 rounded-lg border-2"
                />
                <Input
                  value={formConfig.settings.canvasStyles?.inputBackground || "#ffffff"}
                  onChange={(e) => handleCanvasStyleChange("inputBackground", e.target.value)}
                  className={`${themeClasses.input} rounded-xl border-2 flex-1`}
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
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
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Font Size</Label>
              <Input
                type="number"
                value={formConfig.settings.canvasStyles?.fontSize || 16}
                onChange={(e) => handleCanvasStyleChange('fontSize', parseInt(e.target.value))}
                placeholder="16"
                min="8"
                max="72"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>Font size in pixels</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Form Width</Label>
              <Input
                type="number"
                value={formConfig.settings.canvasStyles?.formWidth || 752}
                onChange={(e) => handleCanvasStyleChange("formWidth", parseInt(e.target.value))}
                placeholder="752"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
              <p className={`text-sm ${themeClasses.textMuted}`}>Width in pixels</p>
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
              <p className={`text-sm ${themeClasses.textMuted}`}>Spacing between elements</p>
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Padding</Label>
              <Input
                type="number"
                value={getStyleStringValue(formConfig.settings.canvasStyles?.padding)}
                onChange={(e) => handleCanvasStyleChange("padding", `${e.target.value}px`)}
                placeholder="32"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
            </div>

            <div className="space-y-3">
              <Label className={`${themeClasses.text} font-medium`}>Border Radius</Label>
              <Input
                type="number"
                value={getStyleStringValue(formConfig.settings.canvasStyles?.borderRadius)}
                onChange={(e) => handleCanvasStyleChange("borderRadius", `${e.target.value}px`)}
                placeholder="16"
                className={`${themeClasses.input} rounded-xl border-2`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className={`${themeClasses.text} font-medium`}>Custom CSS</Label>
            <Textarea
              value={formConfig.settings.canvasStyles?.customCSS || ""}
              onChange={(e) => handleCanvasStyleChange("customCSS", e.target.value)}
              placeholder="/* Add your custom CSS here */&#10;.form-container {&#10;  /* Custom styles */&#10;}"
              className={`${themeClasses.input} rounded-xl border-2 min-h-[120px] font-mono text-sm`}
            />
            <p className={`text-sm ${themeClasses.textMuted}`}>
              Add custom CSS to override default styles
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormStylesPanel;
