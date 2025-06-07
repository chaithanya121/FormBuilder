
export interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
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
  tooltip?: string;
  fieldStyles?: {
    className?: string;
    customCSS?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    width?: string;
  };
  labelStyles?: {
    className?: string;
    customCSS?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
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
      gridColumns?: number;
      elementWidth?: 'auto' | 'full' | 'half' | 'third' | 'quarter' | 'custom';
      customWidth?: number;
    };
    submitButton?: {
      text?: string;
      style?: string;
      position?: string;
    };
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      backgroundPattern?: string;
      formBackgroundColor?: string;
      borderRadius?: string;
      padding?: string;
      margin?: string;
      fontFamily?: string;
      fontSize?: number;
      fontColor?: string;
      primaryColor?: string;
      secondaryColor?: string;
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
        alignment?: 'left' | 'center' | 'right' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
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
      cloudStorage?: {
        enabled?: boolean;
        providers?: string[];
      };
      database?: {
        enabled?: boolean;
        type?: string;
        connectionString?: string;
      };
      realTimeTracking?: boolean;
      email?: {
        enabled?: boolean;
        from?: string;
        fromName?: string;
        recipients?: string;
        subject?: string;
        template?: string;
      };
      webhook?: {
        enabled?: boolean;
        url?: string;
        method?: string;
        headers?: string;
        retryOnFailure?: boolean;
      };
      zapier?: {
        enabled?: boolean;
        webhookUrl?: string;
      };
      slack?: {
        enabled?: boolean;
        webhookUrl?: string;
        channel?: string;
        botToken?: string;
      };
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

export interface CustomTheme {
  id: string;
  name: string;
  category?: string;
  preview?: string;
  backgroundColor?: string;
  formBackgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontColor?: string;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  created?: string;
  rating?: number;
  popular?: boolean;
  formWidth?: number;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
    form?: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    lineHeight?: number;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadiusStyles: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  layout?: {
    borderRadius?: number;
    padding?: number;
    spacing?: number;
    shadow?: string;
  };
  effects?: {
    animations?: boolean;
    gradients?: boolean;
    blurEffects?: boolean;
    darkMode?: boolean;
  };
}
