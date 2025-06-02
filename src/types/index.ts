import { 
  FileText, 
  Users, 
  BarChart3, 
  Plus, 
  Briefcase,
  Globe,
  ShoppingCart,
  Book,
  Camera,
  Layers,
  Rocket,
  TrendingUp,
  Award,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Download,
  Star,
  CheckCircle,
  Eye,
  MousePointer,
  Calendar,
  Target,
  Sparkles,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Wrench
} from 'lucide-react';

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
  | "street-address-line2" | "youtube" | "h1" | "h2" | "h3" | "h4" | "p" | "radio-group";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  value?: string;
  description?: string;
  tooltip?: string;
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
  // Advanced properties
  helpText?: string;
  defaultValue?: any;
  disabled?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  spellCheck?: boolean;
  tabIndex?: number;
  customCSS?: string;
  customClasses?: string;
  customAttributes?: Record<string, any>;
  dataAttributes?: string;
  customScript?: string;
  stylePreset?: string;
  width?: string;
  animation?: string;
  conditionalLogic?: string;
  ariaLabel?: string;
  ariaDescription?: string;
  role?: string;
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
      labelAlignment?: string;
    };
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      padding?: string;
      margin?: string;
      borderRadius?: string;
    };
    submitButton?: {
      text?: string;
      backgroundColor?: string;
      textColor?: string;
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
}

export interface FormPreviewProps {
  formConfig: FormConfig;
}

export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
}


export const icon_map = {
    "FileText":FileText, 
  "Users":Users, 
  "BarChart3":BarChart3, 
  "Plus":Plus, 
  "Briefcase":Briefcase,
  "Globe":Globe,
  ShoppingCart:ShoppingCart,
  Book:Book,
  Camera:Camera,
  Layers:Layers,
  Rocket:Rocket,
  TrendingUp:TrendingUp,
  Award:Award,
  Activity:Activity,
  Zap:Zap,
  ArrowUpRight : ArrowUpRight,
  ArrowDownRight:ArrowDownRight,
  DollarSign:DollarSign,
  Download:Download,
  Star:Star,
  CheckCircle:CheckCircle,
  Eye:Eye,
  MousePointer:MousePointer,
  Calendar:Calendar,
  Target:Target,
  Sparkles:Sparkles,
  PlayCircle:PlayCircle,
  PauseCircle:PauseCircle,
  RefreshCw:RefreshCw,
  Wrench:Wrench
}