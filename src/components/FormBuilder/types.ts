
export interface FormElement {
  id: string;
  type: string;
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  spellCheck?: boolean;
  tabIndex?: number;
  helpText?: string;
  defaultValue?: any;
  description?: string;
  tooltip?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
    step?: number;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
  };
  options?: string[];
  settings?: {
    [key: string]: any;
  };
  containerId?: string;
  value?: any;
  url?: string;
  // Advanced properties
  customCSS?: string;
  customClasses?: string;
  customAttributes?: Record<string, any>;
  dataAttributes?: string;
  customScript?: string;
  stylePreset?: string;
  width?: string;
  animation?: string;
  conditionalLogic?: string;
  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
  role?: string;
  // Layout
  layout?: {
    inRow?: boolean;
    rowId?: string;
    rowPosition?: number;
  };
  // Field styles
  fieldStyles?: Record<string, any>;
  labelStyles?: Record<string, any>;
  // Form submission
  nestedData?: boolean;
  submitData?: boolean;
  autoFloat?: "Default" | "Off";
  decorators?: {
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
  };
  inputType?: string;
}

export interface FormConfig {
  name: string;
  elements: FormElement[];
  settings: {
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      formBackgroundColor?: string;
      primaryColor?: string;
      secondaryColor?: string;
      fontColor?: string;
      fontFamily?: string;
      fontSize?: number;
      borderRadius?: string;
      padding?: string;
      margin?: string;
      formWidth?: number;
      customCSS?: string;
      containerClass?: string;
    };
    submitButton?: {
      text?: string;
      backgroundColor?: string;
      textColor?: string;
      position?: string;
    };
    layout?: {
      questionSpacing?: number;
      size?: string;
      columns?: {
        default: boolean;
        tablet: boolean;
        desktop: boolean;
      };
      labels?: string;
      placeholders?: string;
      errors?: string;
      messages?: string;
      labelAlignment?: string;
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
  };
}

export interface CustomTheme {
  id?: string | number;
  name: string;
  backgroundColor: string;
  formBackgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  fontColor: string;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: string;
  padding?: string;
  formWidth?: number;
  category?: string;
  popular?: boolean;
  rating?: number;
  created?: string;
  preview?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    form?: string;
    text?: string;
    accent?: string;
    [key: string]: string | undefined;
  };
  typography?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string | number;
    lineHeight?: string | number;
  };
  layout?: {
    borderRadius?: number;
    padding?: number;
    spacing?: number;
    shadow?: string;
  };
  effects?: {
    [key: string]: boolean;
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
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
  onDelete?: () => void;
}
