
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Layout, Grid, Smartphone, Tablet, Monitor, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { FormConfig } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderLayoutControlsProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const HeaderLayoutControls: React.FC<HeaderLayoutControlsProps> = ({ formConfig, onUpdate }) => {
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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50 flex items-center gap-2"
        >
          <Layout className="h-4 w-4" />
          <span className="hidden xl:inline">Layout Controls</span>
          {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 p-0"
        align="start"
        side="bottom"
        sideOffset={8}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 space-y-4">
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
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderLayoutControls;
