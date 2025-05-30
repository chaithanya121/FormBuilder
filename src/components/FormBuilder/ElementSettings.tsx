
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, Settings, Palette, Layout } from 'lucide-react';
import { FormElement, ElementSettingsProps } from './types';

const ElementSettings: React.FC<ElementSettingsProps> = ({ element, onUpdate, onClose, onDelete }) => {
  const [options, setOptions] = useState<string[]>(element.options || []);
  const [newOption, setNewOption] = useState('');

  const handleUpdate = (field: string, value: any) => {
    const updatedElement = {
      ...element,
      [field]: value
    };
    onUpdate(updatedElement);
  };

  const handleValidationUpdate = (field: string, value: any) => {
    const updatedElement = {
      ...element,
      validation: {
        ...element.validation,
        [field]: value
      }
    };
    onUpdate(updatedElement);
  };

  const addOption = () => {
    if (newOption.trim()) {
      const updatedOptions = [...options, newOption.trim()];
      setOptions(updatedOptions);
      handleUpdate('options', updatedOptions);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    handleUpdate('options', updatedOptions);
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    handleUpdate('options', updatedOptions);
  };

  const hasOptions = ['select', 'radio-group', 'checkbox-group', 'multiselect'].includes(element.type);
  const hasValidation = ['text', 'email', 'number', 'textarea', 'phone', 'url'].includes(element.type);
  const hasFileValidation = ['file-upload', 'image-upload', 'multi-file-upload', 'multi-image-upload'].includes(element.type);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Element Info */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {element.type}
            </Badge>
            <h4 className="font-medium text-slate-900">Element Settings</h4>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-4 border-b border-slate-200 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100">
            <TabsTrigger value="general" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              General
            </TabsTrigger>
            <TabsTrigger value="validation" className="text-xs">
              <Layout className="h-3 w-3 mr-1" />
              Rules
            </TabsTrigger>
            <TabsTrigger value="style" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Style
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* General Settings */}
          <TabsContent value="general" className="p-4 space-y-4 mt-0">
            <div>
              <Label className="text-sm font-medium text-slate-700">Label</Label>
              <Input
                value={element.label}
                onChange={(e) => handleUpdate('label', e.target.value)}
                className="mt-1"
                placeholder="Enter label"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">Placeholder</Label>
              <Input
                value={element.placeholder || ''}
                onChange={(e) => handleUpdate('placeholder', e.target.value)}
                className="mt-1"
                placeholder="Enter placeholder text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">Description</Label>
              <Textarea
                value={element.description || ''}
                onChange={(e) => handleUpdate('description', e.target.value)}
                className="mt-1"
                placeholder="Help text for this field"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-700">Required Field</Label>
              <Switch
                checked={element.required}
                onCheckedChange={(checked) => handleUpdate('required', checked)}
              />
            </div>

            {/* Options for select/radio/checkbox elements */}
            {hasOptions && (
              <div className="space-y-3">
                <Separator />
                <Label className="text-sm font-medium text-slate-700">Options</Label>
                
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add new option"
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addOption()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Validation Settings */}
          <TabsContent value="validation" className="p-4 space-y-4 mt-0">
            {hasValidation && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Min Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.minLength || ''}
                      onChange={(e) => handleValidationUpdate('minLength', parseInt(e.target.value) || undefined)}
                      className="mt-1"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Max Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.maxLength || ''}
                      onChange={(e) => handleValidationUpdate('maxLength', parseInt(e.target.value) || undefined)}
                      className="mt-1"
                      placeholder="100"
                    />
                  </div>
                </div>

                {element.type === 'number' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Min Value</Label>
                      <Input
                        type="number"
                        value={element.validation?.min || ''}
                        onChange={(e) => handleValidationUpdate('min', parseInt(e.target.value) || undefined)}
                        className="mt-1"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Max Value</Label>
                      <Input
                        type="number"
                        value={element.validation?.max || ''}
                        onChange={(e) => handleValidationUpdate('max', parseInt(e.target.value) || undefined)}
                        className="mt-1"
                        placeholder="100"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-slate-700">Pattern (Regex)</Label>
                  <Input
                    value={element.validation?.pattern || ''}
                    onChange={(e) => handleValidationUpdate('pattern', e.target.value)}
                    className="mt-1"
                    placeholder="^[a-zA-Z]+$"
                  />
                  <p className="text-xs text-slate-500 mt-1">Regular expression for validation</p>
                </div>
              </>
            )}

            {hasFileValidation && (
              <>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Accepted File Types</Label>
                  <Input
                    value={element.validation?.accept || ''}
                    onChange={(e) => handleValidationUpdate('accept', e.target.value)}
                    className="mt-1"
                    placeholder=".pdf,.doc,.jpg,.png"
                  />
                  <p className="text-xs text-slate-500 mt-1">Comma-separated file extensions</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">Max File Size (MB)</Label>
                  <Input
                    type="number"
                    value={element.validation?.maxSize || ''}
                    onChange={(e) => handleValidationUpdate('maxSize', parseInt(e.target.value) || undefined)}
                    className="mt-1"
                    placeholder="10"
                  />
                </div>

                {element.type.includes('multi') && (
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Max Files</Label>
                    <Input
                      type="number"
                      value={element.validation?.maxFiles || ''}
                      onChange={(e) => handleValidationUpdate('maxFiles', parseInt(e.target.value) || undefined)}
                      className="mt-1"
                      placeholder="5"
                    />
                  </div>
                )}
              </>
            )}

            {!hasValidation && !hasFileValidation && (
              <div className="text-center py-8">
                <p className="text-slate-500">No validation options available for this element type.</p>
              </div>
            )}
          </TabsContent>

          {/* Style Settings */}
          <TabsContent value="style" className="p-4 space-y-4 mt-0">
            <div>
              <Label className="text-sm font-medium text-slate-700">Field Width</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Auto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">CSS Classes</Label>
              <Input
                value={element.fieldStyles?.className || ''}
                onChange={(e) => handleUpdate('fieldStyles', { 
                  ...element.fieldStyles, 
                  className: e.target.value 
                })}
                className="mt-1"
                placeholder="custom-class another-class"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">Custom CSS</Label>
              <Textarea
                value={element.fieldStyles?.customCSS || ''}
                onChange={(e) => handleUpdate('fieldStyles', { 
                  ...element.fieldStyles, 
                  customCSS: e.target.value 
                })}
                className="mt-1 font-mono text-sm"
                placeholder="color: red; font-weight: bold;"
                rows={4}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-slate-900">Layout Options</h4>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Hide Label</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Read Only</Label>
                <Switch
                  checked={element.decorators?.readonly || false}
                  onCheckedChange={(checked) => handleUpdate('decorators', {
                    ...element.decorators,
                    readonly: checked
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Disabled</Label>
                <Switch
                  checked={element.decorators?.disabled || false}
                  onCheckedChange={(checked) => handleUpdate('decorators', {
                    ...element.decorators,
                    disabled: checked
                  })}
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ElementSettings;
