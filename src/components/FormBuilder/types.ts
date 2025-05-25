
// Re-export everything from the main types file for backward compatibility
export * from "@/types";

// Additional props for FormCanvas that aren't in the main types
export interface FormCanvasProps {
  elements: import("@/types").FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<import("@/types").FormConfig>>;
  onSelectElement: (element: import("@/types").FormElement) => void;
  selectedElement?: import("@/types").FormElement;
  formConfig: import("@/types").FormConfig;
  onUpdate: (element: import("@/types").FormElement) => void;
}
