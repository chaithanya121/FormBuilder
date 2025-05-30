
export type FormElementType = 
  | "text" | "email" | "password" | "number" | "textarea" | "select" | "radio" | "checkbox" 
  | "date" | "time" | "file" | "checkbox-group" | "heading" | "paragraph" | "divider" | "container"
  | "2-columns" | "3-columns" | "4-columns" | "image" | "video" | "button" | "spacer" | "html" | "url" | "tel" 
  | "color" | "range" | "rating" | "signature" | "location" | "payment" | "toggle" | "slider" | "star-rating" 
  | "scale-rating" | "radio-blocks" | "checkbox-blocks" | "gallery" | "spinner" | "range-slider" | "vertical-slider" 
  | "hidden-input" | "form_submit" | "danger-button" | "info-button" | "code-block" | "table" | "list" | "tabs" 
  | "accordion" | "progress" | "timer" | "calendar" | "map" | "chart" | "social-share" | "embed" | "markdown"
  | "matrix" | "matrix-table" | "steps" | "grid" | "nested-list" | "phone" | "multiselect" | "checkbox-tabs"
  | "radio-tabs" | "range-slider" | "vertical-slider" | "multi-file-upload" | "image-upload" | "multi-image-upload"
  | "gallery" | "quote" | "link" | "static-html";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  value?: string;
  description?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    step?: number;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
  };
  tooltip?: string;
  nestedData?: boolean;
  name?: string;
  submitData?: boolean;
  autoFloat?: "Default" | "Off";
  decorators?: {
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
  };
  inputType?: string;
  fieldStyles?: Record<string, any>;
  labelStyles?: Record<string, any>;
  layout?: {
    inRow?: boolean;
    rowId?: string;
    rowPosition?: number;
  };
}

export interface FormConfig {
  name: string;
  elements: FormElement[];
  settings: {
    preview: {
      width: "Full" | number;
      nesting: boolean;
    };
    validation: {
      liveValidation: "Default" | "On" | "Off";
    };
    layout: {
      size: "Default" | "Small" | "Medium" | "Large";
      columns: {
        default: boolean;
        tablet: boolean;
        desktop: boolean;
      };
      labels: "Default" | "On" | "Off";
      placeholders: "Default" | "On" | "Off";
      errors: "Default" | "On" | "Off";
      messages: "Default" | "On" | "Off";
    };
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      padding?: string;
      margin?: string;
      borderRadius?: string;
    };
  };
}

export interface DragStartProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

export interface FormCanvasProps {
  elements: FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
  onSelectElement: (element: FormElement) => void;
  selectedElement?: FormElement;
}

export interface FormPreviewProps {
  formConfig: FormConfig;
}

export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
}
