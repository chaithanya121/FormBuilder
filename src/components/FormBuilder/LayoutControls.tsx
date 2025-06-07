
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Layout, Grid, Smartphone, Tablet, Monitor, Settings, ChevronDown, ChevronUp, X } from 'lucide-react';
import { FormConfig } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutControlsProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({ formConfig, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const layoutSettings = formConfig.settings?.layout || {};

  const updateLayoutSetting = (key: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        layout: {
          ...layoutSettings,
          [key]: value
        }
      }
    };
    onUpdate(updatedConfig);
  };

  const updateCanvasStyle = (key: string, value: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        canvasStyles: {
          ...formConfig.settings?.canvasStyles,
          [key]: value
        }
      }
    };
    onUpdate(updatedConfig);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <Card className="w-80 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl">
        <CardHeader className="pb-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-blue-500" />
              Layout Controls
            </div>
            <div className="flex items-center gap-2">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="space-y-4">
                {/* Form Width Control */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Form Width</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[formConfig.settings?.canvasStyles?.formWidth || 752]}
                      onValueChange={(value) => updateCanvasStyle('formWidth', value[0])}
                      max={1200}
                      min={320}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={formConfig.settings?.canvasStyles?.formWidth || 752}
                      onChange={(e) => updateCanvasStyle('formWidth', parseInt(e.target.value))}
                      className="w-16 h-7 text-xs"
                    />
                  </div>
                </div>

                {/* Element Width Control */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Element Width</Label>
                  <Select
                    value={layoutSettings.elementWidth || 'full'}
                    onValueChange={(value) => updateLayoutSetting('elementWidth', value)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="full">Full Width (100%)</SelectItem>
                      <SelectItem value="half">Half Width (50%)</SelectItem>
                      <SelectItem value="third">One Third (33%)</SelectItem>
                      <SelectItem value="quarter">Quarter (25%)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {layoutSettings.elementWidth === 'custom' && (
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[layoutSettings.customWidth || 100]}
                        onValueChange={(value) => updateLayoutSetting('customWidth', value[0])}
                        max={100}
                        min={10}
                        step={5}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Width %"
                        value={layoutSettings.customWidth || 100}
                        onChange={(e) => updateLayoutSetting('customWidth', parseInt(e.target.value))}
                        className="w-16 h-7 text-xs"
                      />
                    </div>
                  )}
                </div>

                {/* Grid Columns */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Grid Columns</Label>
                  <Select
                    value={layoutSettings.gridColumns?.toString() || '1'}
                    onValueChange={(value) => updateLayoutSetting('gridColumns', parseInt(value))}
                  >
                    <SelectTrigger className="h-8 text-xs">
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

                {/* Question Spacing */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Question Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[layoutSettings.questionSpacing || 24]}
                      onValueChange={(value) => updateLayoutSetting('questionSpacing', value[0])}
                      max={60}
                      min={8}
                      step={4}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 w-12">
                      {layoutSettings.questionSpacing || 24}px
                    </span>
                  </div>
                </div>

                {/* Label Alignment */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Label Alignment</Label>
                  <Select
                    value={layoutSettings.labelAlignment || 'top'}
                    onValueChange={(value) => updateLayoutSetting('labelAlignment', value)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Responsive Breakpoints */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium flex items-center gap-1">
                    <Grid className="h-3 w-3" />
                    Responsive Layout
                  </Label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1">
                      <Smartphone className="h-3 w-3 text-gray-500" />
                      <Switch
                        checked={layoutSettings.columns?.default || true}
                        onCheckedChange={(checked) => updateLayoutSetting('columns', {
                          ...layoutSettings.columns,
                          default: checked
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Tablet className="h-3 w-3 text-gray-500" />
                      <Switch
                        checked={layoutSettings.columns?.tablet || true}
                        onCheckedChange={(checked) => updateLayoutSetting('columns', {
                          ...layoutSettings.columns,
                          tablet: checked
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Monitor className="h-3 w-3 text-gray-500" />
                      <Switch
                        checked={layoutSettings.columns?.desktop || true}
                        onCheckedChange={(checked) => updateLayoutSetting('columns', {
                          ...layoutSettings.columns,
                          desktop: checked
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Reset */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateLayoutSetting('questionSpacing', 24);
                    updateLayoutSetting('labelAlignment', 'top');
                    updateLayoutSetting('gridColumns', 1);
                    updateLayoutSetting('elementWidth', 'full');
                    updateCanvasStyle('formWidth', 752);
                  }}
                  className="w-full h-7 text-xs"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Reset Layout
                </Button>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default LayoutControls;
