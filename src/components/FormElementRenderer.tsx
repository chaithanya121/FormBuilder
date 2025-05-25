
import React from "react";
import { FormElement } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface FormElementRendererProps {
  element: FormElement;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
}

const FormElementRenderer = ({ element, value, onChange, error }: FormElementRendererProps) => {
  switch (element.type) {
    case "select":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
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
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <Input
            type={element.type}
            placeholder={element.placeholder}
            value={value || element.value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            required={element.required}
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
          />
          <Label htmlFor={element.id}>{element.label}</Label>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      );

    case "radio":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
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

    default:
      return null;
  }
};

export default FormElementRenderer;
