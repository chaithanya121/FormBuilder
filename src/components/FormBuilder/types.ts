
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
    pattern?: string;
    message?: string;
  };
  settings?: any;
  containerId?: string;
  value?: any;
  url?: string;
}

export interface FormConfig {
  title: string;
  description: string;
  elements: FormElement[];
  settings: {
    theme?: string;
    layout?: {
      style?: string;
      questionSpacing?: number;
    };
    submitButton?: {
      text?: string;
      style?: string;
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
