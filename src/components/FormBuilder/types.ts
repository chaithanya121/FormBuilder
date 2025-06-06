
export interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
    accept?: string;
    maxFiles?: number;
    maxSize?: number;
    step?: number;
  };
  settings?: any;
  containerId?: string;
  value?: any;
  url?: string;
  name?: string;
  helpText?: string;
  description?: string;
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
  customCSS?: string;
  customClasses?: string;
  customAttributes?: Record<string, any>;
  dataAttributes?: string;
  customScript?: string;
  stylePreset?: string;
  width?: string;
  animation?: string;
  fieldStyles?: {
    className?: string;
    customCSS?: string;
  };
  decorators?: {
    readonly?: boolean;
    disabled?: boolean;
  };
}

export interface FormConfig {
  name?: string;
  title?: string;
  description?: string;
  elements: FormElement[];
  settings: {
    theme?: string;
    layout?: {
      style?: string;
      questionSpacing?: number;
      size?: string;
      columns?: {
        default?: boolean;
        tablet?: boolean;
        desktop?: boolean;
      };
      labels?: string;
      placeholders?: string;
      errors?: string;
      messages?: string;
      labelAlignment?: string;
    };
    submitButton?: {
      text?: string;
      style?: string;
      position?: string;
    };
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      formBackgroundColor?: string;
      borderRadius?: string;
      padding?: string;
      fontFamily?: string;
      fontSize?: number;
      fontColor?: string;
      primaryColor?: string;
      formWidth?: number;
      containerClass?: string;
      customCSS?: string;
    };
    logo?: {
      enabled?: boolean;
      url?: string;
      width?: number;
      height?: number;
      position?: {
        top?: number;
        left?: number;
      };
      opacity?: number;
      borderRadius?: number;
    };
    preview?: {
      width?: string | number;
      nesting?: boolean;
    };
    validation?: {
      liveValidation?: string;
    };
    termsAndConditions?: {
      enabled?: boolean;
      required?: boolean;
      text?: string;
    };
    calculations?: {
      enabled?: boolean;
      fields?: any[];
    };
    notifications?: {
      enabled?: boolean;
      rules?: any[];
    };
    integrations?: {
      api?: boolean;
      cloudStorage?: string[];
      database?: boolean;
      realTimeTracking?: boolean;
    };
    accessibility?: {
      screenReader?: boolean;
      wcagCompliant?: boolean;
      highContrast?: boolean;
    };
    collaboration?: {
      comments?: boolean;
      assignments?: boolean;
      workflow?: boolean;
    };
    mobileLayout?: {
      responsive?: boolean;
      customBreakpoints?: Record<string, number>;
      mobileSpecificElements?: string[];
    };
  };
}

export interface FormCanvasProps {
  elements: FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
  onSelectElement: (element: FormElement) => void;
  selectedElement: FormElement | null;
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

export interface DragStartProps {
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
  onDelete: () => void;
}
