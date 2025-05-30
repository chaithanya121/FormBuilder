
import React, { useState, useEffect } from 'react';
import { FormConfig, FormElement } from "./types";
import FormElementRenderer from "./FormElementRenderer";
import { Button } from "@/components/ui/button";
import { Send, Download, Eye, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface FormPreviewProps {
  formConfig: FormConfig;
  values?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
  onSubmit?: (values: Record<string, any>) => void;
  isSubmission?: boolean;
}

const FormPreview = ({ formConfig, values, onChange, onSubmit, isSubmission = false }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(values || {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showJsonView, setShowJsonView] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (elementId: string, value: any) => {
    const element = formConfig.elements.find(item => item.id === elementId);
    const label = element ? element.label : elementId;
    
    const updatedData = {
      ...formData,
      [label]: value,
    };
    
    setFormData(updatedData);
    
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted && formConfig.settings.termsAndConditions?.required) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    } else {
      toast({
        title: "Form Submitted Successfully! 🎉",
        description: "Your form has been submitted and data has been captured.",
      });
      console.log("Form data:", formData);
    }
  };

  const exportFormData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFormStyles = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    
    return {
      backgroundColor: canvasStyles.formBackgroundColor || '#ffffff',
      padding: canvasStyles.padding || '32px',
      borderRadius: canvasStyles.borderRadius || '16px',
      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 8px 24px -8px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      maxWidth: canvasStyles.formWidth ? `${canvasStyles.formWidth}px` : '800px',
      margin: '0 auto',
      fontFamily: canvasStyles.fontFamily || 'Inter',
      fontSize: canvasStyles.fontSize ? `${canvasStyles.fontSize}px` : '16px',
      color: canvasStyles.fontColor || '#000000',
    };
  };

  const getScreenBackground = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    
    if (canvasStyles.backgroundImage && canvasStyles.backgroundImage !== '') {
      return {
        backgroundImage: canvasStyles.backgroundImage,
        backgroundColor: 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      };
    } else if (canvasStyles.backgroundColor) {
      return {
        background: canvasStyles.backgroundColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
    
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  };

  return (
    <div className="min-h-screen flex flex-col" style={getScreenBackground()}>
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}

      {/* Header with Actions */}
      <div className="flex justify-between items-center p-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          Back to Builder
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowJsonView(true)}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Code className="h-4 w-4 mr-2" />
            View JSON
          </Button>
          <Button 
            variant="outline" 
            onClick={exportFormData}
            className="bg-white/90 backdrop-blur-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} style={getFormStyles()} className="w-full">
          <h1 className="text-2xl font-bold mb-6" style={{
            fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
            fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize + 8}px` : '24px',
            color: formConfig.settings.canvasStyles?.fontColor || '#000000'
          }}>
            {formConfig.name}
          </h1>

          <div className="space-y-6">
            {formConfig.elements.map((element) => (
              <div key={element.id} className="space-y-2">
                <FormElementRenderer
                  element={element}
                  value={formData[element.label] || ""}
                  onChange={(value) => handleChange(element.id, value)}
                  formConfig={formConfig}
                />
              </div>
            ))}

            {/* Terms & Conditions */}
            {formConfig.settings.termsAndConditions?.enabled && (
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  required={formConfig.settings.termsAndConditions.required}
                />
                <label htmlFor="terms" style={{
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize - 2}px` : '14px',
                  color: formConfig.settings.canvasStyles?.fontColor || '#6b7280'
                }}>
                  {formConfig.settings.termsAndConditions.text || 'I accept the Terms & Conditions'}
                </label>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3 px-6 font-medium transition-colors"
              style={{
                backgroundColor: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6',
                color: 'white',
                fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize}px` : '16px'
              }}
            >
              <Send className="h-4 w-4 mr-2" />
              {formConfig.settings.submitButton?.text || 'Submit'}
            </Button>
          </div>
        </form>
      </div>

      {/* JSON View Dialog */}
      <Dialog open={showJsonView} onOpenChange={setShowJsonView}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Form Configuration & Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Form Configuration:</h4>
              <Textarea
                readOnly
                value={JSON.stringify(formConfig, null, 2)}
                className="font-mono text-xs h-40"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Current Form Data:</h4>
              <Textarea
                readOnly
                value={JSON.stringify(formData, null, 2)}
                className="font-mono text-xs h-32"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormPreview;
