
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { FormConfig } from './types';
import FullyFunctionalElementLibrary from './FullyFunctionalElementLibrary';
import { 
  Settings, Palette, Layout, Grid, Type, 
  Sparkles, Layers, Eye, Image, Monitor 
} from 'lucide-react';

interface EnhancedFormConfigurationPanelProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
  onElementAdd?: (element: any) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

const EnhancedFormConfigurationPanel: React.FC<EnhancedFormConfigurationPanelProps> = ({
  formConfig,
  onUpdate,
  onElementAdd,
  onDragStart
}) => {
  const [activeTab, setActiveTab] = useState('layout');

  const updateFormSetting = useCallback((key: string, value: any) => {
    onUpdate({
      ...formConfig,
      [key]: value
    });
  }, [formConfig, onUpdate]);

  const updateLayoutSetting = useCallback((key: string, value: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        layout: {
          ...formConfig.settings.layout,
          [key]: value
        }
      }
    });
  }, [formConfig, onUpdate]);

  const updateCanvasStyle = useCallback((key: string, value: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings.canvasStyles,
          [key]: value
        }
      }
    });
  }, [formConfig, onUpdate]);

  const updateVisualSetting = useCallback((key: string, value: any) => {
    onUpdate({
      ...formConfig,
      settings: {
        ...formConfig.settings,
        visual: {
          ...formConfig.settings.visual,
          [key]: value
        }
      }
    });
  }, [formConfig, onUpdate]);

  const layoutSettings = formConfig.settings?.layout || {};
  const canvasStyles = formConfig.settings?.canvasStyles || {};
  const visualSettings = formConfig.settings?.visual || {};

  return (
    <div className="h-full overflow-auto">
      <div className="p-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5" />
              Form Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 text-xs">
                <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
                <TabsTrigger value="styling" className="text-xs">Styling</TabsTrigger>
                <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
                <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
              </TabsList>

              {/* Form Layout Tab */}
              <TabsContent value="layout" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Form Size</Label>
                    <Select
                      value={layoutSettings.size || 'Default'}
                      onValueChange={(value) => updateLayoutSetting('size', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small (600px)</SelectItem>
                        <SelectItem value="Default">Default (800px)</SelectItem>
                        <SelectItem value="Large">Large (1000px)</SelectItem>
                        <SelectItem value="Full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Label Alignment</Label>
                    <Select
                      value={layoutSettings.labelAlignment || 'top'}
                      onValueChange={(value) => updateLayoutSetting('labelAlignment', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="floating">Floating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Grid Columns</Label>
                    <Select
                      value={layoutSettings.gridColumns?.toString() || '1'}
                      onValueChange={(value) => updateLayoutSetting('gridColumns', parseInt(value))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Column</SelectItem>
                        <SelectItem value="2">2 Columns</SelectItem>
                        <SelectItem value="3">3 Columns</SelectItem>
                        <SelectItem value="4">4 Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Question Spacing</Label>
                    <div className="mt-2">
                      <Slider
                        value={[layoutSettings.questionSpacing || 24]}
                        onValueChange={(value) => updateLayoutSetting('questionSpacing', value[0])}
                        max={60}
                        min={8}
                        step={4}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {layoutSettings.questionSpacing || 24}px
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Placeholders & Labels</Label>
                    <Select
                      value={layoutSettings.placeholders || 'Default'}
                      onValueChange={(value) => updateLayoutSetting('placeholders', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Default">Default Style</SelectItem>
                        <SelectItem value="Modern">Modern Style</SelectItem>
                        <SelectItem value="Minimal">Minimal Style</SelectItem>
                        <SelectItem value="Bold">Bold Style</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Labels Style</Label>
                    <Select
                      value={layoutSettings.labels || 'Default'}
                      onValueChange={(value) => updateLayoutSetting('labels', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Default">Default Labels</SelectItem>
                        <SelectItem value="Floating">Floating Labels</SelectItem>
                        <SelectItem value="Inside">Inside Labels</SelectItem>
                        <SelectItem value="Hidden">Hidden Labels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Visual Styling Tab */}
              <TabsContent value="styling" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Theme Type</Label>
                    <Select
                      value={visualSettings.themeType || 'Modern'}
                      onValueChange={(value) => updateVisualSetting('themeType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Modern">Modern</SelectItem>
                        <SelectItem value="Classic">Classic</SelectItem>
                        <SelectItem value="Minimal">Minimal</SelectItem>
                        <SelectItem value="Gradient">Gradient</SelectItem>
                        <SelectItem value="Dark">Dark Mode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Animations</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Animations</span>
                        <Switch
                          checked={visualSettings.animations?.enabled || false}
                          onCheckedChange={(checked) => updateVisualSetting('animations', {
                            ...visualSettings.animations,
                            enabled: checked
                          })}
                        />
                      </div>
                      <Select
                        value={visualSettings.animations?.type || 'fade'}
                        onValueChange={(value) => updateVisualSetting('animations', {
                          ...visualSettings.animations,
                          type: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fade">Fade In</SelectItem>
                          <SelectItem value="slide">Slide Up</SelectItem>
                          <SelectItem value="scale">Scale In</SelectItem>
                          <SelectItem value="bounce">Bounce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Shadows</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Shadows</span>
                        <Switch
                          checked={visualSettings.shadows?.enabled || false}
                          onCheckedChange={(checked) => updateVisualSetting('shadows', {
                            ...visualSettings.shadows,
                            enabled: checked
                          })}
                        />
                      </div>
                      <Select
                        value={visualSettings.shadows?.intensity || 'medium'}
                        onValueChange={(value) => updateVisualSetting('shadows', {
                          ...visualSettings.shadows,
                          intensity: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="strong">Strong</SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Font Family</Label>
                    <Select
                      value={canvasStyles.fontFamily || 'Inter'}
                      onValueChange={(value) => updateCanvasStyle('fontFamily', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Font Size</Label>
                    <div className="mt-2">
                      <Slider
                        value={[canvasStyles.fontSize || 16]}
                        onValueChange={(value) => updateCanvasStyle('fontSize', value[0])}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {canvasStyles.fontSize || 16}px
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Background Color</Label>
                    <div className="mt-2 flex gap-2">
                      <Input
                        type="color"
                        value={canvasStyles.backgroundColor || '#667eea'}
                        onChange={(e) => updateCanvasStyle('backgroundColor', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={canvasStyles.backgroundColor || '#667eea'}
                        onChange={(e) => updateCanvasStyle('backgroundColor', e.target.value)}
                        placeholder="#667eea"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Elements Tab */}
              <TabsContent value="elements" className="mt-4">
                <div className="h-[400px] overflow-auto">
                  <FullyFunctionalElementLibrary
                    onElementAdd={onElementAdd}
                    formConfig={formConfig}
                    onDragStart={onDragStart}
                  />
                </div>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Preview Mode</Label>
                    <Select
                      value={formConfig.settings?.preview?.mode || 'desktop'}
                      onValueChange={(value) => onUpdate({
                        ...formConfig,
                        settings: {
                          ...formConfig.settings,
                          preview: {
                            ...formConfig.settings?.preview,
                            mode: value
                          }
                        }
                      })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="auto">Auto Responsive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Grid Lines</Label>
                    <Switch
                      checked={formConfig.settings?.preview?.showGrid || false}
                      onCheckedChange={(checked) => onUpdate({
                        ...formConfig,
                        settings: {
                          ...formConfig.settings,
                          preview: {
                            ...formConfig.settings?.preview,
                            showGrid: checked
                          }
                        }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Element Outlines</Label>
                    <Switch
                      checked={formConfig.settings?.preview?.showOutlines || false}
                      onCheckedChange={(checked) => onUpdate({
                        ...formConfig,
                        settings: {
                          ...formConfig.settings,
                          preview: {
                            ...formConfig.settings?.preview,
                            showOutlines: checked
                          }
                        }
                      })}
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium">Form Width</Label>
                    <div className="mt-2">
                      <Slider
                        value={[canvasStyles.formWidth || 800]}
                        onValueChange={(value) => updateCanvasStyle('formWidth', value[0])}
                        max={1200}
                        min={320}
                        step={10}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {canvasStyles.formWidth || 800}px
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedFormConfigurationPanel;
