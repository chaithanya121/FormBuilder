import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, Code, Palette, Layout, Eye, EyeOff, 
  Lock, AlertCircle, Info, HelpCircle, Plus, Trash2,
  Copy, Move, Archive, Star, Heart, Zap
} from 'lucide-react';
import { FormElement } from './types';

interface AdvancedElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
}

const VALIDATION_RULES = [
  { id: 'required', label: 'Required Field', description: 'Field must be filled' },
  { id: 'minLength', label: 'Minimum Length', description: 'Minimum number of characters' },
  { id: 'maxLength', label: 'Maximum Length', description: 'Maximum number of characters' },
  { id: 'pattern', label: 'Pattern Validation', description: 'Regular expression validation' },
  { id: 'email', label: 'Email Format', description: 'Valid email address required' },
  { id: 'url', label: 'URL Format', description: 'Valid URL required' },
  { id: 'numeric', label: 'Numeric Only', description: 'Only numbers allowed' },
  { id: 'alphanumeric', label: 'Alphanumeric', description: 'Letters and numbers only' },
];

const STYLE_PRESETS = [
  { name: 'Default', className: '' },
  { name: 'Rounded', className: 'rounded-lg' },
  { name: 'Sharp', className: 'rounded-none' },
  { name: 'Pill', className: 'rounded-full' },
  { name: 'Shadow', className: 'shadow-md' },
  { name: 'Border', className: 'border-2' },
  { name: 'Gradient', className: 'bg-gradient-to-r' },
];

const ANIMATION_EFFECTS = [
  { name: 'None', value: 'none' },
  { name: 'Fade In', value: 'fadeIn' },
  { name: 'Slide Up', value: 'slideUp' },
  { name: 'Scale', value: 'scale' },
  { name: 'Bounce', value: 'bounce' },
  { name: 'Pulse', value: 'pulse' },
];

const AdvancedElementSettings: React.FC<AdvancedElementSettingsProps> = ({
  element,
  onUpdate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [customCSS, setCustomCSS] = useState(element.customCSS || '');
  const [validationRules, setValidationRules] = useState(element.validation || {});

  const updateElement = (field: string, value: any) => {
    const updatedElement = { ...element, [field]: value };
    onUpdate(updatedElement);
  };

  const updateValidation = (rule: string, value: any) => {
    const updatedValidation = { ...validationRules, [rule]: value };
    setValidationRules(updatedValidation);
    updateElement('validation', updatedValidation);
  };

  const addCustomAttribute = () => {
    const customAttributes = element.customAttributes || {};
    const newKey = `attr${Object.keys(customAttributes).length + 1}`;
    updateElement('customAttributes', { ...customAttributes, [newKey]: '' });
  };

  const removeCustomAttribute = (key: string) => {
    const customAttributes = { ...element.customAttributes };
    delete customAttributes[key];
    updateElement('customAttributes', customAttributes);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            Advanced Element Settings
          </h2>
          <p className="text-gray-600 mt-1">
            Configure advanced properties for <Badge variant="outline">{element.type}</Badge> element
          </p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="accessibility">A11y</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Basic Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Element ID</Label>
                  <Input
                    value={element.id}
                    onChange={(e) => updateElement('id', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Element Name</Label>
                  <Input
                    value={element.name || ''}
                    onChange={(e) => updateElement('name', e.target.value)}
                    placeholder="Enter field name"
                  />
                </div>
              </div>

              <div>
                <Label>Label</Label>
                <Input
                  value={element.label}
                  onChange={(e) => updateElement('label', e.target.value)}
                />
              </div>

              <div>
                <Label>Placeholder</Label>
                <Input
                  value={element.placeholder || ''}
                  onChange={(e) => updateElement('placeholder', e.target.value)}
                />
              </div>

              <div>
                <Label>Help Text</Label>
                <Textarea
                  value={element.helpText || ''}
                  onChange={(e) => updateElement('helpText', e.target.value)}
                  placeholder="Provide additional guidance for users"
                  rows={2}
                />
              </div>

              <div>
                <Label>Default Value</Label>
                <Input
                  value={element.defaultValue || ''}
                  onChange={(e) => updateElement('defaultValue', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={element.required || false}
                  onCheckedChange={(checked) => updateElement('required', checked)}
                />
                <Label>Required Field</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={element.disabled || false}
                  onCheckedChange={(checked) => updateElement('disabled', checked)}
                />
                <Label>Disabled</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={element.hidden || false}
                  onCheckedChange={(checked) => updateElement('hidden', checked)}
                />
                <Label>Hidden</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Validation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {VALIDATION_RULES.map((rule) => (
                <div key={rule.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{rule.label}</Label>
                      <p className="text-sm text-gray-500">{rule.description}</p>
                    </div>
                    <Switch
                      checked={!!validationRules[rule.id as keyof typeof validationRules]}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateValidation(rule.id, rule.id === 'minLength' || rule.id === 'maxLength' ? 0 : '');
                        } else {
                          const newValidation = { ...validationRules };
                          delete newValidation[rule.id as keyof typeof validationRules];
                          updateValidation(rule.id, undefined);
                        }
                      }}
                    />
                  </div>
                  
                  {!!validationRules[rule.id as keyof typeof validationRules] && (
                    <div className="ml-4 space-y-2">
                      {(rule.id === 'minLength' || rule.id === 'maxLength') && (
                        <Input
                          type="number"
                          placeholder="Enter length"
                          value={validationRules[rule.id as keyof typeof validationRules] || ''}
                          onChange={(e) => updateValidation(rule.id, parseInt(e.target.value) || 0)}
                        />
                      )}
                      
                      {rule.id === 'pattern' && (
                        <Input
                          placeholder="Enter regex pattern"
                          value={validationRules[rule.id as keyof typeof validationRules] || ''}
                          onChange={(e) => updateValidation(rule.id, e.target.value)}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Styling & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Style Preset</Label>
                <Select
                  value={element.stylePreset || 'default'}
                  onValueChange={(value) => updateElement('stylePreset', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLE_PRESETS.map((preset) => (
                      <SelectItem key={preset.name} value={preset.name.toLowerCase()}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Custom CSS Classes</Label>
                <Input
                  value={element.customClasses || ''}
                  onChange={(e) => updateElement('customClasses', e.target.value)}
                  placeholder="Enter CSS classes separated by spaces"
                />
              </div>

              <div>
                <Label>Inline Styles (CSS)</Label>
                <Textarea
                  value={customCSS}
                  onChange={(e) => {
                    setCustomCSS(e.target.value);
                    updateElement('customCSS', e.target.value);
                  }}
                  placeholder="color: red; font-weight: bold;"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Width</Label>
                  <Select
                    value={element.width || 'full'}
                    onValueChange={(value) => updateElement('width', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="full">Full Width</SelectItem>
                      <SelectItem value="1/2">Half Width</SelectItem>
                      <SelectItem value="1/3">One Third</SelectItem>
                      <SelectItem value="2/3">Two Thirds</SelectItem>
                      <SelectItem value="1/4">Quarter Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Animation</Label>
                  <Select
                    value={element.animation || 'none'}
                    onValueChange={(value) => updateElement('animation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ANIMATION_EFFECTS.map((effect) => (
                        <SelectItem key={effect.value} value={effect.value}>
                          {effect.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Behavior & Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={element.readOnly || false}
                  onCheckedChange={(checked) => updateElement('readOnly', checked)}
                />
                <Label>Read Only</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={element.autoFocus || false}
                  onCheckedChange={(checked) => updateElement('autoFocus', checked)}
                />
                <Label>Auto Focus</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={element.spellCheck || false}
                  onCheckedChange={(checked) => updateElement('spellCheck', checked)}
                />
                <Label>Spell Check</Label>
              </div>

              <div>
                <Label>Tab Index</Label>
                <Input
                  type="number"
                  value={element.tabIndex || ''}
                  onChange={(e) => updateElement('tabIndex', parseInt(e.target.value))}
                  placeholder="Tab order index"
                />
              </div>

              <div>
                <Label>Conditional Logic</Label>
                <Textarea
                  value={element.conditionalLogic || ''}
                  onChange={(e) => updateElement('conditionalLogic', e.target.value)}
                  placeholder="Show this element when..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ARIA Label</Label>
                <Input
                  value={element.ariaLabel || ''}
                  onChange={(e) => updateElement('ariaLabel', e.target.value)}
                  placeholder="Accessible label for screen readers"
                />
              </div>

              <div>
                <Label>ARIA Description</Label>
                <Textarea
                  value={element.ariaDescription || ''}
                  onChange={(e) => updateElement('ariaDescription', e.target.value)}
                  placeholder="Additional description for accessibility"
                  rows={2}
                />
              </div>

              <div>
                <Label>Role</Label>
                <Select
                  value={element.role || ''}
                  onValueChange={(value) => updateElement('role', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ARIA role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textbox">Textbox</SelectItem>
                    <SelectItem value="button">Button</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="listbox">Listbox</SelectItem>
                    <SelectItem value="slider">Slider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Custom Attributes</Label>
                  <Button size="sm" variant="outline" onClick={addCustomAttribute}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Attribute
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(element.customAttributes || {}).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <Input
                        placeholder="Attribute name"
                        value={key}
                        onChange={(e) => {
                          const newAttrs = { ...element.customAttributes };
                          delete newAttrs[key];
                          newAttrs[e.target.value] = value;
                          updateElement('customAttributes', newAttrs);
                        }}
                      />
                      <Input
                        placeholder="Attribute value"
                        value={value as string}
                        onChange={(e) => {
                          const newAttrs = { ...element.customAttributes };
                          newAttrs[key] = e.target.value;
                          updateElement('customAttributes', newAttrs);
                        }}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeCustomAttribute(key)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label>Data Attributes</Label>
                <Textarea
                  value={element.dataAttributes || ''}
                  onChange={(e) => updateElement('dataAttributes', e.target.value)}
                  placeholder='{"data-testid": "form-input", "data-tracking": "click"}'
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Enter as JSON object</p>
              </div>

              <div>
                <Label>Custom JavaScript</Label>
                <Textarea
                  value={element.customScript || ''}
                  onChange={(e) => updateElement('customScript', e.target.value)}
                  placeholder="// Custom JavaScript code for this element"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdvancedElementSettings;
