
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FormConfig, FormElement } from './types';
import { Settings, Trash2, Copy, Edit3 } from 'lucide-react';

interface FormPropertiesPanelProps {
  formConfig: FormConfig;
  selectedElement: FormElement | null;
  onFormConfigUpdate: (config: FormConfig) => void;
  onElementUpdate: (element: FormElement) => void;
  onElementDelete: () => void;
  onElementDuplicate: () => void;
}

const FormPropertiesPanel: React.FC<FormPropertiesPanelProps> = ({
  formConfig,
  selectedElement,
  onFormConfigUpdate,
  onElementUpdate,
  onElementDelete,
  onElementDuplicate
}) => {
  const handleFormNameChange = (value: string) => {
    onFormConfigUpdate({
      ...formConfig,
      name: value
    });
  };

  const handleElementChange = (field: keyof FormElement, value: any) => {
    if (selectedElement) {
      onElementUpdate({
        ...selectedElement,
        [field]: value
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Configuration</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Form Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Form Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="form-name">Form Name</Label>
              <Input
                id="form-name"
                value={formConfig.name}
                onChange={(e) => handleFormNameChange(e.target.value)}
                placeholder="Enter form name"
              />
            </div>
          </CardContent>
        </Card>

        {/* Element Settings */}
        {selectedElement ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Element Settings</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onElementDuplicate}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onElementDelete}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="element-label">Label</Label>
                <Input
                  id="element-label"
                  value={selectedElement.label}
                  onChange={(e) => handleElementChange('label', e.target.value)}
                  placeholder="Enter element label"
                />
              </div>

              {selectedElement.type !== 'heading' && selectedElement.type !== 'paragraph' && (
                <div>
                  <Label htmlFor="element-placeholder">Placeholder</Label>
                  <Input
                    id="element-placeholder"
                    value={selectedElement.placeholder || ''}
                    onChange={(e) => handleElementChange('placeholder', e.target.value)}
                    placeholder="Enter placeholder text"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="element-required">Required</Label>
                <input
                  type="checkbox"
                  id="element-required"
                  checked={selectedElement.required || false}
                  onChange={(e) => handleElementChange('required', e.target.checked)}
                  className="rounded border-gray-300"
                />
              </div>

              {(selectedElement.type === 'select' || selectedElement.type === 'radio' || selectedElement.type === 'checkbox-group') && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {(selectedElement.options || []).map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(selectedElement.options || [])];
                            newOptions[index] = e.target.value;
                            handleElementChange('options', newOptions);
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newOptions = (selectedElement.options || []).filter((_, i) => i !== index);
                            handleElementChange('options', newOptions);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
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
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <Edit3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Select an element to configure its properties</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FormPropertiesPanel;
