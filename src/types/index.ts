
export type FormElementType = 
  | "text" | "email" | "password" | "date" | "file" | "textarea" | "checkbox" 
  | "radio" | "select" | "h1" | "h2" | "h3" | "h4" | "p" | "divider" | "container"
  | "matrix" | "matrix-table" | "tabs" | "steps" | "grid" | "2-columns" | "3-columns"
  | "4-columns" | "table" | "list" | "nested-list" | "url" | "phone" | "hidden-input"
  | "multiselect" | "checkbox-group" | "checkbox-blocks" | "checkbox-tabs"
  | "radio-group" | "radio-blocks" | "radio-tabs" | "toggle" | "slider"
  | "range-slider" | "vertical-slider" | "file-upload" | "multi-file-upload"
  | "image-upload" | "multi-image-upload" | "gallery" | "paragraph" | "quote"
  | "image" | "link" | "danger-button" | "static-html"
  | "address" | "street-address" | "street-address-line2" | "city" | "state-province"
  | "postal-code" | "name" | "first-name" | "last-name" | "appointment" | "rating"
  | "captcha" | "form_submit";

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
    rowPosition?: number;
    rowId?: string;
  };
}

export interface FormConfig {
  title: string;
  description: string;
  elements: FormElement[];
  settings: {
    termsAndConditions?: {
      enabled: boolean;
      required: boolean;
      text: string;
    };
    submitButton?: {
      enabled: boolean;
      text: string;
    };
    submitButtonText?: string;
    successMessage?: string;
    redirectUrl?: string;
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

export interface FormElementRendererProps {
  element: FormElement;
  value?: any;
  onChange?: (elementId: string, value: any) => void;
  error?: string;
}
