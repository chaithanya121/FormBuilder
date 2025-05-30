
import React, { useState } from 'react';
import { FormElement, FormConfig } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Upload, Calendar, Clock, MapPin, Plus, Minus } from 'lucide-react';

interface AdvancedElementProps {
  element: FormElement;
  value?: any;
  onChange?: (value: any) => void;
  formConfig?: FormConfig;
}

export const GridLayoutElement: React.FC<AdvancedElementProps> = ({ element, formConfig }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="text-center text-gray-500">
        <div className="grid-icon mb-2">⊞</div>
        <p className="text-sm">Grid Layout Container</p>
        <p className="text-xs">Drop elements here for grid arrangement</p>
      </div>
    </div>
  );
};

export const TabContainerElement: React.FC<AdvancedElementProps> = ({ element, value, onChange }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
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
};

export const StepWizardElement: React.FC<AdvancedElementProps> = ({ element, value, onChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-4 block">{element.label}</Label>
      
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div>
      
      {/* Step Content */}
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
      
      {/* Navigation */}
      <div className="flex justify-between mt-4">
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
  );
};

export const StarRatingElement: React.FC<AdvancedElementProps> = ({ element, value = 0, onChange }) => {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);
  
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Star
              key={index}
              className={`h-6 w-6 cursor-pointer transition-colors ${
                ratingValue <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                setRating(ratingValue);
                onChange?.(ratingValue);
              }}
            />
          );
        })}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating}/5` : 'No rating'}
        </span>
      </div>
    </div>
  );
};

export const FileUploadElement: React.FC<AdvancedElementProps> = ({ element, value, onChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    onChange?.(selectedFiles);
  };
  
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">Drag & drop files here, or click to select</p>
        <input
          type="file"
          multiple={element.validation?.maxFiles !== 1}
          accept={element.validation?.accept}
          onChange={handleFileChange}
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
    </div>
  );
};

export const SliderElement: React.FC<AdvancedElementProps> = ({ element, value = [50], onChange }) => {
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
      <div className="px-2">
        <Slider
          value={value}
          onValueChange={onChange}
          min={element.validation?.min || 0}
          max={element.validation?.max || 100}
          step={element.validation?.step || 1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{element.validation?.min || 0}</span>
          <span className="font-medium">{value[0]}</span>
          <span>{element.validation?.max || 100}</span>
        </div>
      </div>
    </div>
  );
};

export const DateTimeElement: React.FC<AdvancedElementProps> = ({ element, value, onChange }) => {
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="date"
            value={value?.date || ''}
            onChange={(e) => onChange?.({ ...value, date: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Input
            type="time"
            value={value?.time || ''}
            onChange={(e) => onChange?.({ ...value, time: e.target.value })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export const AddressElement: React.FC<AdvancedElementProps> = ({ element, value = {}, onChange }) => {
  const updateAddress = (field: string, val: string) => {
    const newValue = { ...value, [field]: val };
    onChange?.(newValue);
  };
  
  return (
    <div className="w-full space-y-3">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
      <Input
        placeholder="Street Address"
        value={value.street || ''}
        onChange={(e) => updateAddress('street', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="City"
          value={value.city || ''}
          onChange={(e) => updateAddress('city', e.target.value)}
        />
        <Input
          placeholder="State/Province"
          value={value.state || ''}
          onChange={(e) => updateAddress('state', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="ZIP/Postal Code"
          value={value.zip || ''}
          onChange={(e) => updateAddress('zip', e.target.value)}
        />
        <Input
          placeholder="Country"
          value={value.country || ''}
          onChange={(e) => updateAddress('country', e.target.value)}
        />
      </div>
    </div>
  );
};

export const NumberSpinnerElement: React.FC<AdvancedElementProps> = ({ element, value = 0, onChange }) => {
  return (
    <div className="w-full">
      <Label className="text-sm font-medium mb-2 block">{element.label}</Label>
      <div className="flex items-center border rounded-md">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange?.(Math.max((element.validation?.min || 0), value - 1))}
          className="px-3 py-2"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
          className="border-none text-center"
          min={element.validation?.min}
          max={element.validation?.max}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange?.(Math.min((element.validation?.max || 100), value + 1))}
          className="px-3 py-2"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
