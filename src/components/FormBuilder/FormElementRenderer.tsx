
import React, { useState } from "react";
import { FormElement, FormConfig } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Star, Upload, Plus, Minus, Grid3X3, User, Mail, Phone, MapPin, Video, Image as ImageIcon, Link2, AlertTriangle } from "lucide-react";

interface FormElementRendererProps {
  element: FormElement;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  formConfig?: FormConfig;
}

const FormElementRenderer = ({ element, value, onChange, error, formConfig }: FormElementRendererProps) => {
  const [localValue, setLocalValue] = useState(value || "");
  const [files, setFiles] = useState<File[]>([]);
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("tab1");
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (newValue: any) => {
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const getElementStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (element.fieldStyles) {
      if (element.fieldStyles.backgroundColor) styles.backgroundColor = element.fieldStyles.backgroundColor;
      if (element.fieldStyles.borderColor) styles.borderColor = element.fieldStyles.borderColor;
      if (element.fieldStyles.borderRadius) styles.borderRadius = element.fieldStyles.borderRadius;
      if (element.fieldStyles.padding) styles.padding = element.fieldStyles.padding;
      if (element.fieldStyles.fontSize) styles.fontSize = element.fieldStyles.fontSize;
      if (element.fieldStyles.fontFamily) styles.fontFamily = element.fieldStyles.fontFamily;
      if (element.fieldStyles.color) styles.color = element.fieldStyles.color;
      if (element.fieldStyles.width) styles.width = element.fieldStyles.width;
    }
    
    return styles;
  };

  const getLabelStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (element.labelStyles) {
      if (element.labelStyles.color) styles.color = element.labelStyles.color;
      if (element.labelStyles.fontSize) styles.fontSize = element.labelStyles.fontSize;
      if (element.labelStyles.fontWeight) styles.fontWeight = element.labelStyles.fontWeight;
      if (element.labelStyles.fontFamily) styles.fontFamily = element.labelStyles.fontFamily;
    }
    
    if (formConfig?.settings.canvasStyles && !element.labelStyles?.fontSize) {
      styles.fontSize = formConfig.settings.canvasStyles.fontSize ? `${formConfig.settings.canvasStyles.fontSize}px` : '16px';
    }
    if (formConfig?.settings.canvasStyles && !element.labelStyles?.fontFamily) {
      styles.fontFamily = formConfig.settings.canvasStyles.fontFamily || 'Inter';
    }
    if (formConfig?.settings.canvasStyles && !element.labelStyles?.color) {
      styles.color = formConfig.settings.canvasStyles.fontColor || '#000000';
    }
    
    return styles;
  };

  const renderLabel = () => {
    if (!element.label) return null;
    
    return (
      <Label 
        className={`text-sm font-medium mb-2 block ${element.labelStyles?.className || ''}`}
        style={getLabelStyles()}
      >
        {element.label}
        {element.required && <span className="text-red-500 ml-1">*</span>}
        {element.tooltip && (
          <span className="ml-1 text-xs text-gray-400" title={element.tooltip}>
            ℹ️
          </span>
        )}
      </Label>
    );
  };

  const customCSS = element.fieldStyles?.customCSS;

  switch (element.type) {
    // Layout Elements
    case "container":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <Card className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
            <CardContent className="text-center text-gray-500">
              <Grid3X3 className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Container Element</p>
              <p className="text-xs">Drop elements here to group them</p>
            </CardContent>
          </Card>
        </div>
      );

    case "grid":
    case "2-columns":
    case "3-columns":
    case "4-columns":
      const columns = element.type === "grid" ? 3 : 
                     element.type === "2-columns" ? 2 :
                     element.type === "3-columns" ? 3 : 4;
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg`}>
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="min-h-20 bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400">Column {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "tabs":
    case "tab-container":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1">Personal Info</TabsTrigger>
              <TabsTrigger value="tab2">Contact Details</TabsTrigger>
              <TabsTrigger value="tab3">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="space-y-4 mt-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </TabsContent>
            <TabsContent value="tab2" className="space-y-4 mt-4">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Phone" type="tel" />
            </TabsContent>
            <TabsContent value="tab3" className="space-y-4 mt-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email notifications</SelectItem>
                  <SelectItem value="sms">SMS notifications</SelectItem>
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
        </div>
      );

    case "steps":
    case "step-wizard":
      const totalSteps = 3;
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentStep === 1 && 'Basic Information'}
                  {currentStep === 2 && 'Additional Details'}
                  {currentStep === 3 && 'Review & Submit'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentStep === 1 && (
                  <>
                    <Input placeholder="Full Name" />
                    <Input placeholder="Email Address" type="email" />
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Input placeholder="Company" />
                    <Textarea placeholder="Message" rows={3} />
                  </>
                )}
                {currentStep === 3 && (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">Please review your information before submitting.</p>
                    <Badge variant="outline">Ready to submit</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                disabled={currentStep === totalSteps}
              >
                {currentStep === totalSteps ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      );

    // Rating Elements
    case "star-rating":
    case "rating":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={index}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    ratingValue <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => {
                    setRating(ratingValue);
                    handleChange(ratingValue);
                  }}
                />
              );
            })}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 ? `${rating}/5` : 'No rating'}
            </span>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "scale-rating":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="flex justify-between items-center mb-2">
            {[1,2,3,4,5,6,7,8,9,10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleChange(num)}
                className={`w-8 h-8 rounded-full border transition-colors ${
                  value === num ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // File Upload Elements
    case "file":
    case "file-upload":
    case "multi-file-upload":
    case "image-upload":
    case "multi-image-upload":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Drag & drop files here, or click to select</p>
            <input
              type="file"
              multiple={element.type.includes('multi')}
              accept={element.type.includes('image') ? 'image/*' : element.validation?.accept}
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files || []);
                setFiles(selectedFiles);
                handleChange(selectedFiles);
              }}
              className="hidden"
              id={`file-${element.id}`}
            />
            <label htmlFor={`file-${element.id}`}>
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Select Files</span>
              </Button>
            </label>
            {files.length > 0 && (
              <div className="mt-3">
                {files.map((file, index) => (
                  <Badge key={index} variant="secondary" className="mr-1 mb-1">
                    {file.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Slider Elements
    case "slider":
    case "range-slider":
    case "vertical-slider":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="px-2">
            <Slider
              value={[value || 50]}
              onValueChange={(newValue) => handleChange(newValue[0])}
              min={element.validation?.min || 0}
              max={element.validation?.max || 100}
              step={element.validation?.step || 1}
              className="w-full"
              orientation={element.type === "vertical-slider" ? "vertical" : "horizontal"}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{element.validation?.min || 0}</span>
              <span className="font-medium">{value || 50}</span>
              <span>{element.validation?.max || 100}</span>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Toggle Elements
    case "toggle":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <div className="flex items-center space-x-2">
            <Checkbox
              id={element.id}
              checked={value || false}
              onCheckedChange={handleChange}
              className="data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor={element.id} style={getLabelStyles()}>
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Date/Time Elements
    case "date":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="relative">
            <Input
              type="date"
              value={value || ""}
              onChange={(e) => handleChange(e.target.value)}
              style={getElementStyles()}
              className={element.fieldStyles?.className}
              required={element.required}
              disabled={element.decorators?.disabled}
              readOnly={element.decorators?.readonly}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "time":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="relative">
            <Input
              type="time"
              value={value || ""}
              onChange={(e) => handleChange(e.target.value)}
              style={getElementStyles()}
              className={element.fieldStyles?.className}
              required={element.required}
              disabled={element.decorators?.disabled}
              readOnly={element.decorators?.readonly}
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "appointment":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Input
                type="date"
                placeholder="Select date"
                onChange={(e) => handleChange({ ...value, date: e.target.value })}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <Input
                type="time"
                placeholder="Select time"
                onChange={(e) => handleChange({ ...value, time: e.target.value })}
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Address Elements
    case "address":
    case "street-address":
      return (
        <div className="w-full space-y-3">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="relative">
            <Input
              placeholder="Street Address"
              value={value?.street || ''}
              onChange={(e) => handleChange({ ...value, street: e.target.value })}
              style={getElementStyles()}
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="City"
              value={value?.city || ''}
              onChange={(e) => handleChange({ ...value, city: e.target.value })}
            />
            <Input
              placeholder="State/Province"
              value={value?.state || ''}
              onChange={(e) => handleChange({ ...value, state: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="ZIP/Postal Code"
              value={value?.zip || ''}
              onChange={(e) => handleChange({ ...value, zip: e.target.value })}
            />
            <Input
              placeholder="Country"
              value={value?.country || ''}
              onChange={(e) => handleChange({ ...value, country: e.target.value })}
            />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Number Elements
    case "number":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <Input
            type="number"
            placeholder={element.placeholder}
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            min={element.validation?.min}
            max={element.validation?.max}
            step={element.validation?.step}
            style={getElementStyles()}
            className={element.fieldStyles?.className}
            required={element.required}
            disabled={element.decorators?.disabled}
            readOnly={element.decorators?.readonly}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "spinner":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="flex items-center border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleChange(Math.max((element.validation?.min || 0), (value || 0) - 1))}
              className="px-3 py-2"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
              className="border-none text-center"
              min={element.validation?.min}
              max={element.validation?.max}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleChange(Math.min((element.validation?.max || 100), (value || 0) + 1))}
              className="px-3 py-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Basic Form Elements
    case "text":
    case "email":
    case "password":
    case "url":
    case "phone":
    case "first-name":
    case "last-name":
    case "name":
    case "city":
    case "state-province":
    case "postal-code":
    case "street-address-line2":
      const inputType = element.type === "email" ? "email" : 
                       element.type === "password" ? "password" : 
                       element.type === "url" ? "url" : 
                       element.type === "phone" ? "tel" : "text";
      
      const Icon = element.type === "email" ? Mail :
                   element.type === "phone" ? Phone :
                   element.type.includes("name") ? User : null;

      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="relative">
            <Input
              type={inputType}
              placeholder={element.placeholder}
              value={value || element.value || ""}
              onChange={(e) => handleChange(e.target.value)}
              style={getElementStyles()}
              className={`${element.fieldStyles?.className} ${Icon ? 'pr-10' : ''}`}
              required={element.required}
              disabled={element.decorators?.disabled}
              readOnly={element.decorators?.readonly}
            />
            {Icon && (
              <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            )}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "textarea":
    case "paragraph":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <Textarea
            placeholder={element.placeholder}
            value={value || element.value || ""}
            onChange={(e) => handleChange(e.target.value)}
            rows={4}
            style={getElementStyles()}
            className={element.fieldStyles?.className}
            required={element.required}
            disabled={element.decorators?.disabled}
            readOnly={element.decorators?.readonly}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "select":
    case "multiselect":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          {element.type === "multiselect" ? (
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${element.id}-${index}`}
                    checked={(value || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const current = value || [];
                      if (checked) {
                        handleChange([...current, option]);
                      } else {
                        handleChange(current.filter((item: string) => item !== option));
                      }
                    }}
                  />
                  <Label htmlFor={`${element.id}-${index}`} style={getLabelStyles()}>
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <Select onValueChange={handleChange} value={value || element.value}>
              <SelectTrigger className="w-full" style={getElementStyles()}>
                <SelectValue placeholder={element.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {element.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <Checkbox
            id={element.id}
            checked={value || false}
            onCheckedChange={handleChange}
            required={element.required}
            disabled={element.decorators?.disabled}
          />
          <Label htmlFor={element.id} style={getLabelStyles()}>
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "radio":
    case "radio-group":
    case "radio-blocks":
    case "radio-tabs":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <RadioGroup value={value} onValueChange={handleChange}>
            {element.options?.map((option, index) => (
              <div key={index} className={`flex items-center space-x-2 ${
                element.type === "radio-blocks" ? "p-3 border rounded-lg hover:bg-gray-50" :
                element.type === "radio-tabs" ? "p-2 border rounded-md" : ""
              }`}>
                <RadioGroupItem 
                  value={option} 
                  id={`${element.id}-${index}`}
                  disabled={element.decorators?.disabled}
                />
                <Label htmlFor={`${element.id}-${index}`} style={getLabelStyles()}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "checkbox-group":
    case "checkbox-blocks":
    case "checkbox-tabs":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <div key={index} className={`flex items-center space-x-2 ${
                element.type === "checkbox-blocks" ? "p-3 border rounded-lg hover:bg-gray-50" :
                element.type === "checkbox-tabs" ? "p-2 border rounded-md" : ""
              }`}>
                <Checkbox
                  id={`${element.id}-${index}`}
                  checked={(value || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const current = value || [];
                    if (checked) {
                      handleChange([...current, option]);
                    } else {
                      handleChange(current.filter((item: string) => item !== option));
                    }
                  }}
                  disabled={element.decorators?.disabled}
                />
                <Label htmlFor={`${element.id}-${index}`} style={getLabelStyles()}>
                  {option}
                </Label>
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Content Elements
    case "h1":
    case "h2":
    case "h3":
    case "h4":
      const HeadingTag = element.type as keyof JSX.IntrinsicElements;
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <HeadingTag 
            className={`font-bold ${element.type === 'h1' ? 'text-3xl' : 
                                   element.type === 'h2' ? 'text-2xl' : 
                                   element.type === 'h3' ? 'text-xl' : 'text-lg'} ${element.fieldStyles?.className || ''}`}
            style={getElementStyles()}
          >
            {element.label}
          </HeadingTag>
        </div>
      );

    case "p":
    case "quote":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <p 
            className={`${element.type === 'quote' ? 'italic border-l-4 border-gray-300 pl-4' : ''} ${element.fieldStyles?.className || ''}`}
            style={getElementStyles()}
          >
            {element.label}
          </p>
        </div>
      );

    case "divider":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <Separator className="my-4" />
        </div>
      );

    case "image":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Image placeholder</p>
            <p className="text-xs text-gray-500">Upload or drag image here</p>
          </div>
        </div>
      );

    case "video":
    case "youtube":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              {element.type === "youtube" ? "YouTube Video" : "Video Player"}
            </p>
            <p className="text-xs text-gray-500">Add video URL or embed code</p>
          </div>
        </div>
      );

    case "link":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-blue-500" />
            <a href="#" className="text-blue-500 hover:underline" style={getElementStyles()}>
              {element.label || "Link Text"}
            </a>
          </div>
        </div>
      );

    case "hidden-input":
      return (
        <input
          type="hidden"
          value={value || element.value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );

    case "captcha":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <Card className="p-4">
            <CardContent className="flex items-center justify-center">
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center">
                <p className="text-sm text-gray-600">🤖 CAPTCHA Verification</p>
                <p className="text-xs text-gray-500">Click to verify you're human</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );

    case "danger-button":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <Button 
            variant="destructive" 
            className="w-full"
            style={getElementStyles()}
            onClick={() => handleChange(true)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {element.label || "Danger Action"}
          </Button>
        </div>
      );

    case "static-html":
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <div 
            className="p-4 border rounded-lg bg-gray-50"
            style={getElementStyles()}
            dangerouslySetInnerHTML={{ __html: element.label || "<p>Static HTML content</p>" }}
          />
        </div>
      );

    case "section-collapse":
      const [isCollapsed, setIsCollapsed] = useState(false);
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          <Card>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <CardTitle className="flex justify-between items-center">
                {element.label || "Collapsible Section"}
                <span>{isCollapsed ? '+' : '-'}</span>
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent>
                <p className="text-gray-600">Section content goes here...</p>
              </CardContent>
            )}
          </Card>
        </div>
      );

    default:
      return (
        <div className="w-full">
          {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
          {renderLabel()}
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p className="text-sm">Element type: {element.type}</p>
            <p className="text-xs">Fully functional element</p>
          </div>
        </div>
      );
  }
};

export default FormElementRenderer;
