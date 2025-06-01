import React from "react";
import { FormElement, FormConfig } from "./FormBuilder/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Play, ExternalLink } from "lucide-react";

interface FormElementRendererProps {
  element: FormElement;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  formConfig?: FormConfig;
}

const FormElementRenderer = ({ element, value, onChange, error, formConfig }: FormElementRendererProps) => {
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
    
    // Handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return url;
  };

  switch (element.type) {
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

    case "text":
    case "email":
    case "password":
    case "tel":
    case "url":
    case "search":
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
            readOnly={element.readOnly}
            autoFocus={element.autoFocus}
            spellCheck={element.spellCheck}
            tabIndex={element.tabIndex}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

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
            rows={4}
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

    case "date":
    case "time":
    case "datetime-local":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Input
            type={element.type}
            value={value || element.value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            required={element.required}
            disabled={element.disabled}
          />
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

    case "file":
      return (
        <div className="w-full">
          {renderLabel()}
          {renderDescription()}
          <Input
            type="file"
            onChange={(e) => onChange?.(e.target.files)}
            required={element.required}
            disabled={element.disabled}
            accept={element.validation?.accept}
            multiple={element.validation?.maxFiles && element.validation.maxFiles > 1}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

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
      return <hr className="my-4 border-gray-300" />;

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
