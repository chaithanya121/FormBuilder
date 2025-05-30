import { ElementSettingsProps, FormElement } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Settings, Layers, LayoutGrid, CheckSquare, Palette, Trash2 } from "lucide-react";
import FormElementRenderer from "@/components/FormElementRenderer";

const ElementSettings = ({ element, onUpdate, onClose, onDelete }: ElementSettingsProps & { onDelete: () => void }) => {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ ...element, [field]: value });
  };

  const handleStyleChange = (styleType: 'fieldStyles' | 'labelStyles', field: string, value: any) => {
    const updatedElement = {
      ...element,
      [styleType]: {
        ...element[styleType],
        [field]: value
      }
    };
    onUpdate(updatedElement);
  };

  const handleOptionsChange = (options: string[]) => {
    const updatedElement = { 
      ...element, 
      options,
      value: element.value || (options.length > 0 ? options[0] : undefined)
    };
    onUpdate(updatedElement);
  };

  const addOption = () => {
    const currentOptions = Array.isArray(element.options) ? element.options : [];
    const newOptionIndex = currentOptions.length + 1;
    const newOption = `Option ${newOptionIndex}`;
    handleOptionsChange([...currentOptions, newOption]);
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = Array.isArray(element.options) ? [...element.options] : [];
    currentOptions[index] = value.trim() || `Option ${index + 1}`;
    handleOptionsChange(currentOptions);
  };

  const removeOption = (index: number) => {
    if (!Array.isArray(element.options)) return;
    const currentOptions = [...element.options];
    currentOptions.splice(index, 1);
    handleOptionsChange(currentOptions);
  };

  const hasOptions = ["select", "multiselect", "radio-group", "checkbox-group", "radio-blocks", "checkbox-tabs"].includes(element.type);
  const isFieldElement = ["text", "email", "password", "textarea", "select", "checkbox", "radio"].includes(element.type);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs Navigation */}
      <Tabs defaultValue="general" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-1 text-xs">
              <Layers className="h-3 w-3" />
              General
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-1 text-xs">
              <CheckSquare className="h-3 w-3" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center gap-1 text-xs">
              <Palette className="h-3 w-3" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-1 text-xs">
              <LayoutGrid className="h-3 w-3" />
              Layout
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="general" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Element Name</Label>
                <Input
                  value={element.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                  placeholder="Enter element name"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Display Label</Label>
                <Input
                  value={element.label}
                  onChange={(e) => handleInputChange("label", e.target.value)}
                  className="mt-1"
                  placeholder="Enter display label"
                />
              </div>

              {isFieldElement && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Placeholder Text</Label>
                  <Input
                    value={element.placeholder || ""}
                    onChange={(e) => handleInputChange("placeholder", e.target.value)}
                    className="mt-1"
                    placeholder="Enter placeholder text"
                  />
                </div>
              )}

              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  value={element.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-1"
                  placeholder="Enter description"
                />
              </div>

              {hasOptions && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Options</Label>
                    <Button onClick={addOption} size="sm">Add Option</Button>
                  </div>
                  
                  <div className="space-y-2">
                    {Array.isArray(element.options) && element.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeOption(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Preview</Label>
                    <FormElementRenderer element={element} />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={onDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Element
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="validation" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">Required Field</Label>
                <Switch
                  checked={element.required}
                  onCheckedChange={(checked) => handleInputChange("required", checked)}
                />
              </div>

              {["text", "email", "password"].includes(element.type) && (
                <>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Minimum Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.minLength || ""}
                      onChange={(e) =>
                        handleInputChange("validation", {
                          ...element.validation,
                          minLength: parseInt(e.target.value) || undefined,
                        })
                      }
                      className="mt-1"
                      placeholder="Enter minimum length"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Maximum Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.maxLength || ""}
                      onChange={(e) =>
                        handleInputChange("validation", {
                          ...element.validation,
                          maxLength: parseInt(e.target.value) || undefined,
                        })
                      }
                      className="mt-1"
                      placeholder="Enter maximum length"
                    />
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4 mt-0">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Element Styling</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">CSS Class</Label>
                    <Input
                      value={element.fieldStyles?.className || ""}
                      onChange={(e) => handleStyleChange("fieldStyles", "className", e.target.value)}
                      className="mt-1"
                      placeholder="custom-class"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Custom CSS</Label>
                    <Textarea
                      value={element.fieldStyles?.customCSS || ""}
                      onChange={(e) => handleStyleChange("fieldStyles", "customCSS", e.target.value)}
                      className="mt-1 font-mono text-sm"
                      placeholder="color: red; font-weight: bold;"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Width</Label>
                    <Select 
                      value={element.fieldStyles?.width || "full"}
                      onValueChange={(value) => handleStyleChange("fieldStyles", "width", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quarter">Quarter Width</SelectItem>
                        <SelectItem value="half">Half Width</SelectItem>
                        <SelectItem value="three-quarter">Three Quarter Width</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Label Styling</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Label CSS Class</Label>
                    <Input
                      value={element.labelStyles?.className || ""}
                      onChange={(e) => handleStyleChange("labelStyles", "className", e.target.value)}
                      className="mt-1"
                      placeholder="custom-label-class"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Label Custom CSS</Label>
                    <Textarea
                      value={element.labelStyles?.customCSS || ""}
                      onChange={(e) => handleStyleChange("labelStyles", "customCSS", e.target.value)}
                      className="mt-1 font-mono text-sm"
                      placeholder="font-size: 18px; color: blue;"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">Auto Float</Label>
                <Select
                  value={element.autoFloat || "Default"}
                  onValueChange={(value) => handleInputChange("autoFloat", value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="Off">Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">In Row Layout</Label>
                <Switch
                  checked={element.layout?.inRow || false}
                  onCheckedChange={(checked) => 
                    handleInputChange("layout", { ...element.layout, inRow: checked })
                  }
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
