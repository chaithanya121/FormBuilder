
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FormConfig, FormElement } from './types';
import { 
  Settings, Trash2, Copy, Edit3, X, Wand2, Shield, Eye, 
  Palette, Type, Layout, Globe, CheckCircle, AlertTriangle,
  Plus, Minus, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedFormPropertiesPanelProps {
  formConfig: FormConfig;
  selectedElement: FormElement | null;
  onFormConfigUpdate: (config: FormConfig) => void;
  onElementUpdate: (element: FormElement) => void;
  onElementDelete: () => void;
  onElementDuplicate: () => void;
  onClose: () => void;
}

const EnhancedFormPropertiesPanel: React.FC<EnhancedFormPropertiesPanelProps> = ({
  formConfig,
  selectedElement,
  onFormConfigUpdate,
  onElementUpdate,
  onElementDelete,
  onElementDuplicate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('form');

  const handleFormSettingChange = (category: string, field: string, value: any) => {
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
    onFormConfigUpdate(updatedConfig);
  };

  const handleElementChange = (field: keyof FormElement, value: any) => {
    if (selectedElement) {
      onElementUpdate({
        ...selectedElement,
        [field]: value
      });
    }
  };

  const handleValidationChange = (rule: string, enabled: boolean, value?: any) => {
    if (selectedElement) {
      const updatedValidation = {
        ...selectedElement.validation,
        [rule]: enabled ? (value !== undefined ? value : true) : undefined
      };
      onElementUpdate({
        ...selectedElement,
        validation: updatedValidation
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Configuration Panel</h3>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Pro</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-4 border-b border-gray-200 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 h-10">
            <TabsTrigger value="form" className="text-xs data-[state=active]:bg-white">
              <Settings className="h-3 w-3 mr-1" />
              Form Settings
            </TabsTrigger>
            <TabsTrigger value="element" className="text-xs data-[state=active]:bg-white">
              <Edit3 className="h-3 w-3 mr-1" />
              Selected Element
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Form Settings Tab */}
          <TabsContent value="form" className="p-4 space-y-6 mt-0 h-full">
            <Tabs defaultValue="general" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 h-8">
                <TabsTrigger value="general" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  General
                </TabsTrigger>
                <TabsTrigger value="validation" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Validation
                </TabsTrigger>
                <TabsTrigger value="layout" className="text-xs">
                  <Layout className="h-3 w-3 mr-1" />
                  Layout
                </TabsTrigger>
                <TabsTrigger value="styling" className="text-xs">
                  <Palette className="h-3 w-3 mr-1" />
                  Styling
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Form Name</Label>
                      <Input
                        value={formConfig.name}
                        onChange={(e) => onFormConfigUpdate({ ...formConfig, name: e.target.value })}
                        className="mt-1 h-8"
                        placeholder="Enter form name"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Form Description</Label>
                      <Textarea
                        placeholder="Describe your form purpose and instructions"
                        className="mt-1 text-xs"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Enable Auto-save</Label>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Allow Draft Saving</Label>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Submit Button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Button Text</Label>
                      <Input
                        value={formConfig.settings.submitButton?.text || 'Submit Form'}
                        onChange={(e) => handleFormSettingChange('submitButton', 'text', e.target.value)}
                        className="mt-1 h-8"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Button Position</Label>
                      <Select 
                        value={formConfig.settings.submitButton?.position || 'bottom'}
                        onValueChange={(value) => handleFormSettingChange('submitButton', 'position', value)}
                      >
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="validation" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      Form Validation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Live Validation</Label>
                      <Select 
                        value={formConfig.settings.validation?.liveValidation || "Default"}
                        onValueChange={(value) => handleFormSettingChange('validation', 'liveValidation', value)}
                      >
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Default">Default</SelectItem>
                          <SelectItem value="On">Always On</SelectItem>
                          <SelectItem value="Off">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Show Error Messages</Label>
                      <Switch 
                        checked={formConfig.settings.layout?.errors !== "Off"}
                        onCheckedChange={(checked) => handleFormSettingChange('layout', 'errors', checked ? "Default" : "Off")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Required Field Indicators</Label>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Form Layout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Form Size</Label>
                      <Select 
                        value={formConfig.settings.layout?.size || "Default"}
                        onValueChange={(value) => handleFormSettingChange('layout', 'size', value)}
                      >
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Small">Small</SelectItem>
                          <SelectItem value="Default">Default</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs">Label Alignment</Label>
                      <Select 
                        value={formConfig.settings.layout?.labelAlignment || 'top'}
                        onValueChange={(value) => handleFormSettingChange('layout', 'labelAlignment', value)}
                      >
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Labels</Label>
                        <Switch 
                          checked={formConfig.settings.layout?.labels !== "Off"}
                          onCheckedChange={(checked) => handleFormSettingChange('layout', 'labels', checked ? "Default" : "Off")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Placeholders</Label>
                        <Switch 
                          checked={formConfig.settings.layout?.placeholders !== "Off"}
                          onCheckedChange={(checked) => handleFormSettingChange('layout', 'placeholders', checked ? "Default" : "Off")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="styling" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Visual Styling</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Theme Type</Label>
                      <Select defaultValue="modern">
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Animations</Label>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Shadows</Label>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Element Settings Tab */}
          <TabsContent value="element" className="p-4 space-y-6 mt-0 h-full">
            {selectedElement ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Element Header */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Edit3 className="h-4 w-4 text-blue-600" />
                        {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Element
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={onElementDuplicate}>
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={onElementDelete} className="text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={selectedElement.label}
                        onChange={(e) => handleElementChange('label', e.target.value)}
                        className="mt-1 h-8"
                        placeholder="Enter element label"
                      />
                    </div>

                    {selectedElement.type !== 'heading' && selectedElement.type !== 'paragraph' && (
                      <div>
                        <Label className="text-xs">Placeholder</Label>
                        <Input
                          value={selectedElement.placeholder || ''}
                          onChange={(e) => handleElementChange('placeholder', e.target.value)}
                          className="mt-1 h-8"
                          placeholder="Enter placeholder text"
                        />
                      </div>
                    )}

                    <div>
                      <Label className="text-xs">Help Text</Label>
                      <Textarea
                        value={selectedElement.helpText || ''}
                        onChange={(e) => handleElementChange('helpText', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Add helpful instructions"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Required</Label>
                        <Switch
                          checked={selectedElement.required || false}
                          onCheckedChange={(checked) => handleElementChange('required', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Disabled</Label>
                        <Switch
                          checked={selectedElement.disabled || false}
                          onCheckedChange={(checked) => handleElementChange('disabled', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Validation Rules */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      Validation Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedElement.type === 'text' && (
                      <>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Min Length</Label>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={!!selectedElement.validation?.minLength}
                              onCheckedChange={(checked) => handleValidationChange('minLength', checked, checked ? 1 : undefined)}
                            />
                            {selectedElement.validation?.minLength && (
                              <Input
                                type="number"
                                value={selectedElement.validation.minLength || 1}
                                onChange={(e) => handleValidationChange('minLength', true, parseInt(e.target.value))}
                                className="w-16 h-6 text-xs"
                                min="1"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Max Length</Label>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={!!selectedElement.validation?.maxLength}
                              onCheckedChange={(checked) => handleValidationChange('maxLength', checked, checked ? 100 : undefined)}
                            />
                            {selectedElement.validation?.maxLength && (
                              <Input
                                type="number"
                                value={selectedElement.validation.maxLength || 100}
                                onChange={(e) => handleValidationChange('maxLength', true, parseInt(e.target.value))}
                                className="w-16 h-6 text-xs"
                                min="1"
                              />
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">Pattern (Regex)</Label>
                          <Input
                            value={selectedElement.validation?.pattern || ''}
                            onChange={(e) => handleValidationChange('pattern', !!e.target.value, e.target.value)}
                            className="mt-1 h-8 font-mono text-xs"
                            placeholder="^[a-zA-Z]+$"
                          />
                        </div>
                      </>
                    )}

                    {selectedElement.type === 'number' && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Min Value</Label>
                          <Input
                            type="number"
                            value={selectedElement.validation?.min || ''}
                            onChange={(e) => handleValidationChange('min', !!e.target.value, parseFloat(e.target.value))}
                            className="mt-1 h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Max Value</Label>
                          <Input
                            type="number"
                            value={selectedElement.validation?.max || ''}
                            onChange={(e) => handleValidationChange('max', !!e.target.value, parseFloat(e.target.value))}
                            className="mt-1 h-8"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Options for select/radio/checkbox */}
                {(selectedElement.type === 'select' || selectedElement.type === 'radio' || selectedElement.type === 'checkbox-group') && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {(selectedElement.options || []).map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(selectedElement.options || [])];
                              newOptions[index] = e.target.value;
                              handleElementChange('options', newOptions);
                            }}
                            className="flex-1 h-8"
                            placeholder={`Option ${index + 1}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newOptions = (selectedElement.options || []).filter((_, i) => i !== index);
                              handleElementChange('options', newOptions);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newOptions = [...(selectedElement.options || []), ''];
                          handleElementChange('options', newOptions);
                        }}
                        className="w-full h-8"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Option
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Edit3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Select an element to configure its properties</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EnhancedFormPropertiesPanel;
