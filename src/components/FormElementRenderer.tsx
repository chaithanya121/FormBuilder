
import React from "react";
import { FormElement, FormConfig } from "./FormBuilder/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, Play, ExternalLink, Star, ThumbsUp, ThumbsDown, 
  Heart, Share, MapPin, Camera, Lock, Shield, MessageSquare,
  Plus, Minus, Upload, DollarSign, CreditCard, Globe
} from "lucide-react";

interface FormElementRendererProps {
  element: FormElement;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  formConfig?: FormConfig;
  labelAlignment?: 'top' | 'left' | 'right';
}

const FormElementRenderer = ({ 
  element, 
  value, 
  onChange, 
  error, 
  formConfig, 
  labelAlignment = 'top' 
}: FormElementRendererProps) => {
  const renderLabel = () => (
    <div className="flex items-center gap-2 mb-2">
      <Label className="text-sm font-medium">{element.label}</Label>
      {element.required && <span className="text-red-500">*</span>}
      {element.tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{element.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );

  const renderDescription = () => {
    if (!element.description) return null;
    return <p className="text-sm text-gray-600 mb-2">{element.description}</p>;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
    }
    
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return url;
  };

  const renderBasicInput = (type: string) => (
    <div className="w-full">
      {renderLabel()}
      {renderDescription()}
      <Input
        type={type}
        placeholder={element.placeholder}
        value={value || element.value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={element.required}
        disabled={element.disabled}
        readOnly={element.readOnly}
        autoFocus={element.autoFocus}
        spellCheck={element.spellCheck}
        tabIndex={element.tabIndex}
      />
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );

  switch (element.type) {
    // Basic Elements
    case "text":
    case "email":
    case "password":
    case "tel":
    case "phone":
    case "url":
    case "search":
      return renderBasicInput(element.type === 'phone' ? 'tel' : element.type);

    case "textarea":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Textarea
            placeholder={element.placeholder}
            value={value || element.value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            required={element.required}
            disabled={element.disabled}
            readOnly={element.readOnly}
            rows={element.rows || 4}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "number":
    case "range":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Input
            type={element.type}
            placeholder={element.placeholder}
            value={value || element.value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            required={element.required}
            disabled={element.disabled}
            min={element.validation?.min}
            max={element.validation?.max}
            step={element.validation?.step}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Selection Elements
    case "select":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Select onValueChange={onChange} value={value || element.value}>
            <SelectTrigger className="w-full">
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
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "multiselect":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${element.id}-${index}`}
                  checked={Array.isArray(value) && value.includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (checked) {
                      onChange?.([...currentValues, option]);
                    } else {
                      onChange?.(currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <Label htmlFor={`${element.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "radio":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <RadioGroup value={value} onValueChange={onChange}>
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${element.id}-${index}`} />
                <Label htmlFor={`${element.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={element.id}
            checked={value || false}
            onCheckedChange={onChange}
            disabled={element.disabled}
          />
          <Label htmlFor={element.id}>{element.label}</Label>
          {element.required && <span className="text-red-500">*</span>}
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "checkbox-group":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-2">
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${element.id}-${index}`}
                  checked={Array.isArray(value) && value.includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (checked) {
                      onChange?.([...currentValues, option]);
                    } else {
                      onChange?.(currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <Label htmlFor={`${element.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "toggle":
      return (
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">{element.label}</Label>
            {element.description && (
              <p className="text-sm text-gray-600">{element.description}</p>
            )}
          </div>
          <Switch
            checked={value || false}
            onCheckedChange={onChange}
            disabled={element.disabled}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Date & Time Elements
    case "date":
    case "time":
    case "datetime":
    case "datetime-local":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Input
            type={element.type === 'datetime' ? 'datetime-local' : element.type}
            value={value || element.value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            required={element.required}
            disabled={element.disabled}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "daterange":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              placeholder="Start date"
              value={value?.start || ""}
              onChange={(e) => onChange?.({ ...value, start: e.target.value })}
            />
            <Input
              type="date"
              placeholder="End date"
              value={value?.end || ""}
              onChange={(e) => onChange?.({ ...value, end: e.target.value })}
            />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Advanced Input Elements
    case "slider":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Slider
            value={[value || 0]}
            onValueChange={(val) => onChange?.(val[0])}
            max={element.validation?.max || 100}
            min={element.validation?.min || 0}
            step={element.validation?.step || 1}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-2">
            Value: {value || 0}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "color":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={value || "#000000"}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "rating":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onChange?.(star)}
                className="text-2xl focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (value || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {value ? `${value}/5` : 'No rating'}
            </span>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "thumbs":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onChange?.('up')}
              className={`p-2 rounded-full transition-colors ${
                value === 'up' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ThumbsUp className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => onChange?.('down')}
              className={`p-2 rounded-full transition-colors ${
                value === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ThumbsDown className="h-6 w-6" />
            </button>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "scale":
    case "scale-rating":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="flex items-center gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChange?.(num)}
                className={`w-8 h-8 rounded-full border ${
                  value === num
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "nps":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 11 }, (_, i) => i).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => onChange?.(num)}
                  className={`w-8 h-8 rounded border text-sm ${
                    value === num
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // File & Media Elements
    case "file":
    case "multi-file":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              {element.type === 'multi-file' ? 'Drop files here or click to browse' : 'Drop file here or click to browse'}
            </p>
            <Input
              type="file"
              onChange={(e) => onChange?.(e.target.files)}
              required={element.required}
              disabled={element.disabled}
              accept={element.validation?.accept}
              multiple={element.type === 'multi-file'}
              className="hidden"
              id={element.id}
            />
            <Button type="button" variant="outline" onClick={() => document.getElementById(element.id)?.click()}>
              Browse Files
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "image-upload":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Drop images here or click to browse</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onChange?.(e.target.files)}
              className="hidden"
              id={element.id}
            />
            <Button type="button" variant="outline" onClick={() => document.getElementById(element.id)?.click()}>
              <Camera className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "signature":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="h-32 bg-white border border-gray-200 rounded flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Edit className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Click to sign</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <Button type="button" variant="outline" size="sm">Clear</Button>
              <Button type="button" size="sm">Save</Button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Layout Elements
    case "heading":
      return (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">{element.label}</h3>
          {renderDescription()}
        </div>
      );

    case "paragraph":
      return (
        <div className="w-full">
          <p className="text-gray-700">{element.label}</p>
          {renderDescription()}
        </div>
      );

    case "divider":
      return <Separator className="my-4" />;

    case "spacer":
      return <div className="h-4" />;

    case "container":
      return (
        <Card className="w-full">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">{element.label}</h4>
            {element.description && (
              <p className="text-sm text-gray-600">{element.description}</p>
            )}
          </CardContent>
        </Card>
      );

    // Interactive Elements
    case "button":
      return (
        <div className="w-full">
          <Button 
            type="button" 
            className="w-full"
            disabled={element.disabled}
          >
            {element.label || 'Click Me'}
          </Button>
        </div>
      );

    case "like":
      return (
        <div className="w-full">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange?.(!value)}
              className={`p-2 rounded-full transition-colors ${
                value ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${value ? 'fill-current' : ''}`} />
            </button>
            <span className="text-sm text-gray-600">
              {value ? 'Liked' : 'Like this'}
            </span>
          </div>
        </div>
      );

    // Data & Analytics
    case "progress":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Progress value={value || 0} className="w-full" />
          <div className="text-center text-sm text-gray-600 mt-1">
            {value || 0}%
          </div>
        </div>
      );

    case "counter":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange?.((value || 0) - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
              className="text-center"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange?.((value || 0) + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Location & Maps
    case "location":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter location..."
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
              />
            </div>
            <div className="h-32 bg-gray-100 rounded border flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Map will appear here</p>
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "address":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-2">
            <Input placeholder="Street Address" />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="City" />
              <Input placeholder="State/Province" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="ZIP/Postal Code" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "country":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">🇺🇸 United States</SelectItem>
              <SelectItem value="ca">🇨🇦 Canada</SelectItem>
              <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              <SelectItem value="de">🇩🇪 Germany</SelectItem>
              <SelectItem value="fr">🇫🇷 France</SelectItem>
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Payment & Commerce
    case "payment":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Payment Information</span>
            </div>
            <Input placeholder="Card Number" />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVC" />
            </div>
            <Input placeholder="Cardholder Name" />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "price":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              placeholder="0.00"
              value={value || ""}
              onChange={(e) => onChange?.(e.target.value)}
              className="pl-10"
              step="0.01"
            />
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Security & Verification
    case "captcha":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Security Verification</span>
            </div>
            <div className="h-20 bg-white border rounded flex items-center justify-center">
              <p className="text-sm text-gray-600">reCAPTCHA will appear here</p>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "otp":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="flex gap-2 justify-center">
            {Array.from({ length: 6 }, (_, i) => (
              <Input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center"
                value={value?.[i] || ""}
                onChange={(e) => {
                  const newValue = (value || "").split("");
                  newValue[i] = e.target.value;
                  onChange?.(newValue.join(""));
                }}
              />
            ))}
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    // Communication
    case "comments":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <div className="space-y-4">
            <Textarea
              placeholder="Write your comment..."
              value={value || ""}
              onChange={(e) => onChange?.(e.target.value)}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Comments are public</span>
              </div>
              <Button type="button" size="sm">Post Comment</Button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "feedback":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label className="text-sm">How was your experience?</Label>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 cursor-pointer ${
                        i < (value?.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => onChange?.({ ...value, rating: i + 1 })}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm">Additional comments</Label>
                <Textarea
                  placeholder="Tell us more about your experience..."
                  value={value?.comment || ""}
                  onChange={(e) => onChange?.({ ...value, comment: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "youtube":
      const embedUrl = getYouTubeEmbedUrl(element.url || '');
      
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          {element.url ? (
            <div className="space-y-3">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={element.label || "YouTube video player"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Play className="h-4 w-4" />
                <span>Video will play in canvas and preview</span>
                <a 
                  href={element.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open in YouTube
                </a>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Play className="h-8 w-8 mx-auto mb-2" />
                <p>No video URL provided</p>
              </div>
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Badge variant="outline" className="text-xs">
            {element.type} (Coming Soon)
          </Badge>
        </div>
      );
  }
};

export default FormElementRenderer;
