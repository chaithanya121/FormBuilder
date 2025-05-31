
export type FormElementType = 
  | "text" | "email" | "password" | "number" | "textarea" | "select" | "radio" | "checkbox" 
  | "date" | "time" | "file" | "checkbox-group" | "heading" | "paragraph" | "divider" | "container"
  | "2-columns" | "3-columns" | "4-columns" | "image" | "video" | "button" | "spacer" | "html" | "url" | "tel" 
  | "color" | "range" | "rating" | "signature" | "location" | "payment" | "toggle" | "slider" | "star-rating" 
  | "scale-rating" | "radio-blocks" | "checkbox-blocks" | "gallery" | "spinner" | "range-slider" | "vertical-slider" 
  | "hidden-input" | "form_submit" | "danger-button" | "info-button" | "code-block" | "table" | "list" | "tabs" 
  | "accordion" | "progress" | "timer" | "calendar" | "map" | "chart" | "social-share" | "embed" | "markdown"
  | "matrix" | "matrix-table" | "steps" | "grid" | "nested-list" | "phone" | "multiselect" | "checkbox-tabs"
  | "radio-tabs" | "multi-file-upload" | "image-upload" | "multi-image-upload" | "quote" | "link" | "static-html"
  | "file-upload" | "tab-container" | "step-wizard" | "appointment" | "address" | "street-address" | "captcha"
  | "section-collapse" | "first-name" | "last-name" | "name" | "city" | "state-province" | "postal-code" 
  | "street-address-line2" | "youtube" | "h1" | "h2" | "h3" | "h4" | "p";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  value?: any;
  containerId?: string;
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
  customCSS?: string;
  customClasses?: string;
  customAttributes?: Record<string, any>;
  helpText?: string;
  defaultValue?: any;
  disabled?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  spellCheck?: boolean;
  tabIndex?: number;
  conditionalLogic?: string;
  ariaLabel?: string;
  ariaDescription?: string;
  role?: string;
  dataAttributes?: string;
  customScript?: string;
  stylePreset?: string;
  width?: string;
  animation?: string;
  name?: string;
  description?: string;
  tooltip?: string;
  fieldStyles?: Record<string, any>;
  labelStyles?: Record<string, any>;
  decorators?: {
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
  };
  autoFloat?: "Default" | "Off";
  layout?: {
    inRow?: boolean;
    rowId?: string;
    rowPosition?: number;
  };
}

export interface ValidationRule {
  [key: string]: {
    enabled: boolean;
    value?: any;
    message?: string;
  };
}

export interface CustomTheme {
  id: string;
  name: string;
  category: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    form: string;
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
  };
  layout: {
    borderRadius: number;
    padding: number;
    spacing: number;
    shadow: string;
  };
  effects: {
    animations: boolean;
    gradients: boolean;
    blurEffects: boolean;
    darkMode: boolean;
  };
  created: string;
  rating?: number;
  popular?: boolean;
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
      labelAlignment?: "top" | "left" | "right";
      questionSpacing?: number;
      labelWidth?: number;
      type?: "classic" | "card";
    };
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      padding?: string;
      margin?: string;
      borderRadius?: string;
      formBackgroundColor?: string;
      fontColor?: string;
      primaryColor?: string;
      secondaryColor?: string;
      fontFamily?: string;
      fontSize?: number;
      formWidth?: number;
      customCSS?: string;
      containerClass?: string;
      inputBackground?: string;
    };
    termsAndConditions?: {
      enabled: boolean;
      required: boolean;
      text: string;
    };
    submitButton?: {
      text: string;
      position?: string;
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
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

export interface FormPreviewProps {
  formConfig: FormConfig;
}

export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
  onDelete: () => void;
}
