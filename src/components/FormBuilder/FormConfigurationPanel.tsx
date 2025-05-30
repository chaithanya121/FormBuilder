
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Upload, Download, Eye, Code, Settings, Expand, Minus } from 'lucide-react';
import { FormConfig } from './types';
import { useToast } from '@/hooks/use-toast';

interface FormConfigurationPanelProps {
  formConfig: FormConfig;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (config: FormConfig) => void;
}

const FormConfigurationPanel: React.FC<FormConfigurationPanelProps> = ({ 
  formConfig, 
  isExpanded, 
  onToggleExpand,
  onUpdate 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('viewer');

  const handleCopy = () => {
    const configJson = JSON.stringify(formConfig, null, 2);
    navigator.clipboard.writeText(configJson);
    toast({
      title: "Copied!",
      description: "Form configuration copied to clipboard.",
    });
  };

  const handleExport = () => {
    const configJson = JSON.stringify(formConfig, null, 2);
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formConfig.name.replace(/\s+/g, '-').toLowerCase()}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFormUpdate = (field: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      [field]: value
    };
    onUpdate(updatedConfig);
  };

  const handleSettingsUpdate = (category: string, field: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        [category]: {
          ...formConfig.settings[category as keyof typeof formConfig.settings],
          [field]: value
        }
      }
    };
    onUpdate(updatedConfig);
  };

  const formatJson = (obj: any, indent = 0) => {
    const spaces = '  '.repeat(indent);
    if (typeof obj !== 'object' || obj === null) {
      return JSON.stringify(obj);
    }
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return `[\n${obj.map(item => `${spaces}  ${formatJson(item, indent + 1)}`).join(',\n')}\n${spaces}]`;
    }
    
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    
    return `{\n${entries.map(([key, value]) => 
      `${spaces}  "${key}": ${formatJson(value, indent + 1)}`
    ).join(',\n')}\n${spaces}}`;
  };

  // Convert width value to string for Select component
  const getWidthValue = () => {
    const width = formConfig.settings.preview?.width;
    return typeof width === 'number' ? width.toString() : (width || 'Full');
  };

  // Handle width change from Select
  const handleWidthChange = (value: string) => {
    const widthValue = value === 'Full' ? 'Full' : parseInt(value);
    handleSettingsUpdate('preview', 'width', widthValue);
  };

  return (
    <Card className="h-full flex flex-col bg-white border-l border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-600 rounded-lg">
            <Code className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Configuration</h3>
            <p className="text-xs text-slate-500">Form settings & preview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {formConfig.elements.length} elements
          </Badge>
          <Button variant="ghost" size="icon" onClick={onToggleExpand}>
            {isExpanded ? <Minus className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-4 border-b border-slate-200 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100">
            <TabsTrigger value="viewer" className="flex items-center gap-2 text-xs">
              <Eye className="h-3 w-3" />
              Viewer
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 text-xs">
              <Settings className="h-3 w-3" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2 text-xs">
              <Code className="h-3 w-3" />
              JSON
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="viewer" className="h-full m-0">
            <div className="h-full overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Form Info */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-2">Form Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium text-slate-900">{formConfig.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Elements:</span>
                      <span className="font-medium text-slate-900">{formConfig.elements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Width:</span>
                      <span className="font-medium text-slate-900">{getWidthValue()}</span>
                    </div>
                  </div>
                </div>

                {/* Elements List */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">Elements</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {formConfig.elements.map((element, index) => (
                      <div key={element.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium text-slate-900">{element.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {element.type}
                        </Badge>
                      </div>
                    ))}
                    {formConfig.elements.length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-4">No elements added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0">
            <div className="h-full overflow-y-auto p-4">
              <div className="space-y-6">
                {/* General Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">General</h4>
                  
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Form Name</Label>
                    <Input
                      value={formConfig.name}
                      onChange={(e) => handleFormUpdate('name', e.target.value)}
                      className="mt-1"
                      placeholder="Enter form name"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">Form Width</Label>
                    <Select 
                      value={getWidthValue()}
                      onValueChange={handleWidthChange}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="400">Small (400px)</SelectItem>
                        <SelectItem value="600">Medium (600px)</SelectItem>
                        <SelectItem value="800">Large (800px)</SelectItem>
                        <SelectItem value="Full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Enable Nesting</Label>
                    <Switch
                      checked={formConfig.settings.preview?.nesting || false}
                      onCheckedChange={(checked) => handleSettingsUpdate('preview', 'nesting', checked)}
                    />
                  </div>
                </div>

                {/* Validation Settings */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900">Validation</h4>
                  
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Live Validation</Label>
                    <Select 
                      value={formConfig.settings.validation?.liveValidation || 'Default'}
                      onValueChange={(value) => handleSettingsUpdate('validation', 'liveValidation', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Default">Default</SelectItem>
                        <SelectItem value="On">Enabled</SelectItem>
                        <SelectItem value="Off">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Layout Settings */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900">Layout</h4>
                  
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Label Alignment</Label>
                    <Select 
                      value={formConfig.settings.layout?.labelAlignment || 'top'}
                      onValueChange={(value) => handleSettingsUpdate('layout', 'labelAlignment', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">Question Spacing (px)</Label>
                    <Input
                      type="number"
                      value={formConfig.settings.layout?.questionSpacing || 12}
                      onChange={(e) => handleSettingsUpdate('layout', 'questionSpacing', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900">Terms & Conditions</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Enable Terms</Label>
                    <Switch
                      checked={formConfig.settings.termsAndConditions?.enabled || false}
                      onCheckedChange={(checked) => handleSettingsUpdate('termsAndConditions', 'enabled', checked)}
                    />
                  </div>

                  {formConfig.settings.termsAndConditions?.enabled && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-slate-700">Required</Label>
                        <Switch
                          checked={formConfig.settings.termsAndConditions?.required || false}
                          onCheckedChange={(checked) => handleSettingsUpdate('termsAndConditions', 'required', checked)}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700">Terms Text</Label>
                        <Textarea
                          value={formConfig.settings.termsAndConditions?.text || ''}
                          onChange={(e) => handleSettingsUpdate('termsAndConditions', 'text', e.target.value)}
                          className="mt-1"
                          placeholder="I accept the Terms & Conditions"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Submit Button */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900">Submit Button</h4>
                  
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Button Text</Label>
                    <Input
                      value={formConfig.settings.submitButton?.text || 'Submit'}
                      onChange={(e) => handleSettingsUpdate('submitButton', 'text', e.target.value)}
                      className="mt-1"
                      placeholder="Submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="json" className="h-full m-0">
            <div className="h-full overflow-y-auto p-4">
              <div className="bg-slate-900 rounded-lg p-4 h-fit">
                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                  {formatJson(formConfig)}
                </pre>
              </div>
            </div>
          </TabsContent>
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} size="sm" variant="outline" className="flex-1">
              <Copy className="h-3 w-3 mr-2" />
              Copy
            </Button>
            <Button onClick={handleExport} size="sm" variant="outline" className="flex-1">
              <Download className="h-3 w-3 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Tabs>
    </Card>
  );
};

export default FormConfigurationPanel;
