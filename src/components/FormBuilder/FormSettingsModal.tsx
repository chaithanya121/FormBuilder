
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Settings, Globe, Shield, Palette } from 'lucide-react';
import { FormConfig } from './types';

interface FormSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const FormSettingsModal: React.FC<FormSettingsModalProps> = ({ isOpen, onClose, formConfig, onUpdate }) => {
  const handleSettingChange = (category: string, field: string, value: any) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Form Settings</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <Tabs defaultValue="general" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Form Name</Label>
                  <Input
                    value={formConfig.name}
                    onChange={(e) => onUpdate({ ...formConfig, name: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Form Width</Label>
                  <Select 
                    value={formConfig.settings.preview?.width?.toString() || "Full"}
                    onValueChange={(value) => handleSettingChange('preview', 'width', value === "Full" ? "Full" : parseInt(value))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full">Full Width</SelectItem>
                      <SelectItem value="400">400px</SelectItem>
                      <SelectItem value="600">600px</SelectItem>
                      <SelectItem value="800">800px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Enable Nesting</Label>
                  <Switch
                    checked={formConfig.settings.preview?.nesting || false}
                    onCheckedChange={(checked) => handleSettingChange('preview', 'nesting', checked)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="validation" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Live Validation</Label>
                  <Select 
                    value={formConfig.settings.validation?.liveValidation || "Default"}
                    onValueChange={(value) => handleSettingChange('validation', 'liveValidation', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="On">On</SelectItem>
                      <SelectItem value="Off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Form Size</Label>
                  <Select 
                    value={formConfig.settings.layout?.size || "Default"}
                    onValueChange={(value) => handleSettingChange('layout', 'size', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="Small">Small</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Labels</Label>
                    <Switch
                      checked={formConfig.settings.layout?.labels !== "Off"}
                      onCheckedChange={(checked) => handleSettingChange('layout', 'labels', checked ? "Default" : "Off")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Placeholders</Label>
                    <Switch
                      checked={formConfig.settings.layout?.placeholders !== "Off"}
                      onCheckedChange={(checked) => handleSettingChange('layout', 'placeholders', checked ? "Default" : "Off")}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Default Columns</Label>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.default || false}
                      onCheckedChange={(checked) => handleSettingChange('layout', 'columns', { ...formConfig.settings.layout?.columns, default: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Tablet Columns</Label>
                    <Switch
                      checked={formConfig.settings.layout?.columns?.tablet || false}
                      onCheckedChange={(checked) => handleSettingChange('layout', 'columns', { ...formConfig.settings.layout?.columns, tablet: checked })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FormSettingsModal;
