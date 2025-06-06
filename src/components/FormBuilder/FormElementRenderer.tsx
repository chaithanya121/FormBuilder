
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Upload, Star, Palette, MapPin, CreditCard, Image, Video, Container, Columns, Grid } from 'lucide-react';
import { FormElement, FormConfig } from './types';

interface FormElementRendererProps {
  element: FormElement;
  formConfig: FormConfig;
}

const FormElementRenderer: React.FC<FormElementRendererProps> = ({ element, formConfig }) => {
  const renderElement = () => {
    switch (element.type) {
      // Basic Input Elements
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
      case 'url':
      case 'search':
        return (
          <div className="space-y-2">
            <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Input
              id={element.id}
              type={element.type}
              placeholder={element.placeholder}
              required={element.required}
              disabled={element.disabled}
              readOnly={element.readOnly}
              className={element.fieldStyles?.className}
              style={element.fieldStyles}
            />
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'number':
      case 'range':
        return (
          <div className="space-y-2">
            <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            {element.type === 'range' ? (
              <div className="space-y-2">
                <Slider
                  min={element.validation?.min || 0}
                  max={element.validation?.max || 100}
                  step={element.validation?.step || 1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{element.validation?.min || 0}</span>
                  <span>{element.validation?.max || 100}</span>
                </div>
              </div>
            ) : (
              <Input
                id={element.id}
                type="number"
                placeholder={element.placeholder}
                required={element.required}
                min={element.validation?.min}
                max={element.validation?.max}
                step={element.validation?.step}
                className={element.fieldStyles?.className}
              />
            )}
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Textarea
              id={element.id}
              placeholder={element.placeholder}
              required={element.required}
              rows={4}
              className={element.fieldStyles?.className}
            />
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      // Date & Time Elements
      case 'date':
      case 'time':
      case 'datetime-local':
        return (
          <div className="space-y-2">
            <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Input
              id={element.id}
              type={element.type}
              required={element.required}
              className={element.fieldStyles?.className}
            />
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Card className="p-4">
              <div className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p>Calendar Widget</p>
                </div>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      // Selection Elements
      case 'select':
      case 'multiselect':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Select>
              <SelectTrigger className={element.fieldStyles?.className}>
                <SelectValue placeholder={element.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {element.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'radio':
      case 'radio-group':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <RadioGroup className="space-y-2">
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${element.id}-${index}`} />
                  <Label htmlFor={`${element.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id={element.id} />
              <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            </div>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'checkbox-group':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`${element.id}-${index}`} />
                  <Label htmlFor={`${element.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </div>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'toggle':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <Switch id={element.id} />
            </div>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      // File Upload Elements
      case 'file':
      case 'file-upload':
      case 'multi-file-upload':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Card className="border-dashed border-2 border-gray-300 p-6">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">
                  {element.validation?.accept || 'All file types'}
                  {element.validation?.maxSize && ` • Max ${element.validation.maxSize}MB`}
                </p>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'image':
      case 'image-upload':
      case 'multi-image-upload':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Card className="border-dashed border-2 border-gray-300 p-6">
              <div className="text-center">
                <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Upload images</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      // Media Elements
      case 'video':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4">
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Video Player</p>
                </div>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'youtube':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4">
              <div className="flex items-center justify-center h-48 bg-red-100 rounded">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto mb-2 text-red-500" />
                  <p className="text-sm text-red-600">YouTube Video</p>
                  <p className="text-xs text-gray-500">{element.settings?.url || 'No URL set'}</p>
                </div>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      // Content Elements
      case 'heading':
      case 'h1':
      case 'h2':
      case 'h3':
        const HeadingTag = element.type === 'heading' ? 'h2' : element.type as keyof JSX.IntrinsicElements;
        return (
          <div className="space-y-2">
            <HeadingTag className={`font-bold ${
              element.type === 'h1' ? 'text-3xl' : 
              element.type === 'h2' ? 'text-2xl' : 
              element.type === 'h3' ? 'text-xl' : 'text-lg'
            }`} style={element.fieldStyles}>
              {element.settings?.text || element.label}
            </HeadingTag>
          </div>
        );

      case 'paragraph':
      case 'p':
        return (
          <div className="space-y-2">
            <p className="text-gray-700" style={element.fieldStyles}>
              {element.settings?.text || element.description || "This is a paragraph of text."}
            </p>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-2">
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              {element.settings?.text || "This is a quote."}
            </blockquote>
          </div>
        );

      case 'link':
        return (
          <div className="space-y-2">
            <a href={element.url || "#"} className="text-blue-600 hover:underline">
              {element.label}
            </a>
          </div>
        );

      // Layout Elements
      case 'container':
        return (
          <Card className="p-4 border-dashed border-gray-300">
            <div className="flex items-center justify-center h-24 text-gray-500">
              <div className="text-center">
                <Container className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm">Container</p>
              </div>
            </div>
          </Card>
        );

      case '2-columns':
      case '3-columns':
      case '4-columns':
        const cols = parseInt(element.type.charAt(0));
        return (
          <Card className="p-4 border-dashed border-gray-300">
            <div className={`grid grid-cols-${cols} gap-4 h-24`}>
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="border border-gray-200 rounded flex items-center justify-center">
                  <Columns className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </Card>
        );

      case 'divider':
        return <Separator className="my-4" />;

      case 'spacer':
        return <div className="h-8" />;

      // Advanced Elements
      case 'rating':
      case 'star-rating':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <div className="flex space-x-1">
              {Array.from({ length: element.settings?.maxStars || 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
              ))}
            </div>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'scale-rating':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <div className="flex space-x-2">
              {Array.from({ 
                length: (element.settings?.maxValue || 10) - (element.settings?.minValue || 1) + 1 
              }).map((_, i) => {
                const value = (element.settings?.minValue || 1) + i;
                return (
                  <Button key={i} variant="outline" size="sm" className="w-10 h-10">
                    {value}
                  </Button>
                );
              })}
            </div>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'color':
        return (
          <div className="space-y-2">
            <Label htmlFor={element.id}>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <div className="flex items-center space-x-2">
              <Input
                id={element.id}
                type="color"
                className="w-16 h-10 border rounded cursor-pointer"
              />
              <Input
                type="text"
                placeholder="#000000"
                className="flex-1"
              />
            </div>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'signature':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Card className="border-2 border-dashed border-gray-300 p-4">
              <div className="h-32 flex items-center justify-center text-gray-500">
                <p>Signature Pad</p>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'location':
      case 'map':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Card className="p-4">
              <div className="flex items-center justify-center h-48 bg-green-100 rounded">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-green-700">Map / Location Picker</p>
                </div>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-2">
            <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
            <Card className="p-4">
              <div className="flex items-center justify-center h-32 bg-blue-100 rounded">
                <div className="text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-blue-700">Payment Form</p>
                </div>
              </div>
            </Card>
            {element.helpText && <p className="text-sm text-gray-600">{element.helpText}</p>}
          </div>
        );

      case 'captcha':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4 bg-gray-100">
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>I'm not a robot</Label>
              </div>
            </Card>
          </div>
        );

      // Data Display Elements
      case 'table':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Column 1</th>
                      <th className="border border-gray-300 p-2">Column 2</th>
                      <th className="border border-gray-300 p-2">Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Data 1</td>
                      <td className="border border-gray-300 p-2">Data 2</td>
                      <td className="border border-gray-300 p-2">Data 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );

      case 'chart':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4">
              <div className="flex items-center justify-center h-48 bg-purple-100 rounded">
                <div className="text-center">
                  <Grid className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-purple-700">Chart Widget</p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <ul className="list-disc list-inside space-y-1">
              <li>List item 1</li>
              <li>List item 2</li>
              <li>List item 3</li>
            </ul>
          </div>
        );

      case 'code-block':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4 bg-gray-900 text-green-400 font-mono text-sm">
              <pre>{`// Code block example
function hello() {
  console.log("Hello World");
}`}</pre>
            </Card>
          </div>
        );

      case 'html':
      case 'static-html':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4 border-dashed border-gray-300">
              <div className="text-gray-500 text-center">
                <p>Custom HTML Content</p>
                <p className="text-xs mt-1">Static HTML will be rendered here</p>
              </div>
            </Card>
          </div>
        );

      case 'markdown':
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Card className="p-4">
              <div className="prose prose-sm">
                <h3>Markdown Content</h3>
                <p>This is <strong>bold</strong> and this is <em>italic</em>.</p>
                <ul>
                  <li>List item 1</li>
                  <li>List item 2</li>
                </ul>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="p-4 border-dashed border-gray-300">
            <div className="flex items-center justify-center h-16 text-gray-500">
              <div className="text-center">
                <Badge variant="outline">{element.type}</Badge>
                <p className="text-sm mt-1">{element.label}</p>
              </div>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="w-full" style={element.customCSS ? { ...JSON.parse(element.customCSS) } : undefined}>
      {renderElement()}
    </div>
  );
};

export default FormElementRenderer;
