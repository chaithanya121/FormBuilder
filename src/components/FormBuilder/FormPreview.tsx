import React, { useState, useEffect } from 'react';
import { FormConfig, FormElement } from "./types";
import FormElementRenderer from "./FormElementRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Send, Download, Eye, Code, Star, Shield, Clock, Users, ArrowLeft, Share2, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from '@/hooks/redux';
import { formsApi } from '@/services/api/forms';

interface FormPreviewProps {
  formConfig: FormConfig;
  values?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
  onSubmit?: (values: Record<string, any>) => void;
  isSubmission?: boolean;
  isPreviewMode?: boolean;
}

const FormPreview = ({ 
  formConfig, 
  values, 
  onChange, 
  onSubmit, 
  isSubmission = false,
  isPreviewMode = false 
}: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(values || {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showJsonView, setShowJsonView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // B2C specific metrics for trust building
  const trustIndicators = {
    totalSubmissions: 15847,
    averageRating: 4.8,
    completionTime: '2 min',
    securityLevel: 'Enterprise'
  };

  // Form validation
  const validateField = (element: FormElement, value: any) => {
    const errors: string[] = [];

    if (element.required && (!value || value.toString().trim() === '')) {
      errors.push(`${element.label} is required`);
    }

    if (value && element.validation) {
      const validation = element.validation;

      // Length validation
      if (validation.minLength && value.toString().length < validation.minLength) {
        errors.push(`${element.label} must be at least ${validation.minLength} characters`);
      }
      if (validation.maxLength && value.toString().length > validation.maxLength) {
        errors.push(`${element.label} must be no more than ${validation.maxLength} characters`);
      }

      // Number validation
      if (element.type === 'number') {
        const numValue = Number(value);
        if (validation.min !== undefined && numValue < validation.min) {
          errors.push(`${element.label} must be at least ${validation.min}`);
        }
        if (validation.max !== undefined && numValue > validation.max) {
          errors.push(`${element.label} must be no more than ${validation.max}`);
        }
      }

      // Email validation
      if (element.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push(`${element.label} must be a valid email address`);
        }
      }

      // Pattern validation
      if (validation.pattern) {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          errors.push(validation.message || `${element.label} format is invalid`);
        }
      }
    }

    return errors;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    formConfig.elements.forEach(element => {
      const value = formData[element.label];
      const fieldErrors = validateField(element, value);
      
      if (fieldErrors.length > 0) {
        errors[element.id] = fieldErrors[0]; // Show first error
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (elementId: string, value: any) => {
    const element = formConfig.elements.find(item => item.id === elementId);
    const label = element ? element.label : elementId;
    
    const updatedData = {
      ...formData,
      [label]: value,
    };
    
    setFormData(updatedData);
    
    // Clear validation error for this field
    if (validationErrors[elementId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[elementId];
        return newErrors;
      });
    }
    
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!termsAccepted && formConfig.settings.termsAndConditions?.required) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Submit to API if we have an ID
        if (id) {
          await formsApi.submitFormResponse(parseInt(id), formData);
        }
        
        setShowSuccessMessage(true);
        
        // Show success animation
        setTimeout(() => {
          toast({
            title: "🎉 Thank you for your submission!",
            description: "We've received your information and will get back to you soon.",
          });
        }, 500);
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  const printForm = () => {
    window.print();
  };

  const shareForm = () => {
    if (navigator.share) {
      navigator.share({
        title: formConfig.name,
        text: 'Check out this form',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Form link has been copied to your clipboard.",
      });
    }
  };

  const getFormStyles = () => {
    const canvasStyles = formConfig.settings.canvasStyles || {};
    
    return {
      backgroundColor: canvasStyles.formBackgroundColor || '#ffffff',
      padding: canvasStyles.padding || '32px',
      borderRadius: canvasStyles.borderRadius || '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      maxWidth: canvasStyles.formWidth ? `${canvasStyles.formWidth}px` : '800px',
      margin: '0 auto',
      fontFamily: canvasStyles.fontFamily || 'Inter',
      fontSize: canvasStyles.fontSize ? `${canvasStyles.fontSize}px` : '16px',
      color: canvasStyles.fontColor || '#000000',
      position: 'relative' as const,
      overflow: 'hidden' as const,
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

  // Progressive form steps (if form has many elements)
  const elementsPerStep = 5;
  const totalSteps = Math.ceil(formConfig.elements.length / elementsPerStep);
  const currentStepElements = formConfig.elements.slice(
    currentStep * elementsPerStep,
    (currentStep + 1) * elementsPerStep
  );

  const isMultiStep = formConfig.elements.length > elementsPerStep;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={getScreenBackground()}>
      {/* Global Custom CSS Injection */}
      {formConfig.settings.canvasStyles?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: formConfig.settings.canvasStyles.customCSS }} />
      )}

      {/* Header with Actions */}
      {isPreviewMode && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center p-4 md:p-6 relative z-10"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={shareForm}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              onClick={printForm}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowJsonView(true)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
            >
              <Code className="h-4 w-4 mr-2" />
              View Data
            </Button>
            <Button 
              variant="outline" 
              onClick={exportFormData}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>
      )}

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
          style={getFormStyles()}
          className="w-full relative"
        >
          {/* Logo Display */}
          {formConfig.settings?.logo?.enabled && formConfig.settings.logo.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 -left-4 z-20"
              style={{
                opacity: formConfig.settings.logo.opacity || 1
              }}
            >
              <img
                src={formConfig.settings.logo.url}
                alt="Form Logo"
                style={{
                  width: `${formConfig.settings.logo.width || 60}px`,
                  height: `${formConfig.settings.logo.height || 60}px`,
                  borderRadius: `${formConfig.settings.logo.borderRadius || 0}px`,
                  objectFit: 'contain'
                }}
                className="shadow-lg"
              />
            </motion.div>
          )}

          {/* Success Animation Overlay */}
          <AnimatePresence>
            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-center p-8"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Success!</h2>
                  <p className="text-green-600">Your form has been submitted successfully.</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200">
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              {trustIndicators.averageRating}/5 Rating
            </Badge>
            <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200">
              <Users className="h-3 w-3 mr-1 text-blue-500" />
              {trustIndicators.totalSubmissions.toLocaleString()}+ Submissions
            </Badge>
            <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200">
              <Clock className="h-3 w-3 mr-1 text-green-500" />
              {trustIndicators.completionTime} avg
            </Badge>
            <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200">
              <Shield className="h-3 w-3 mr-1 text-purple-500" />
              {trustIndicators.securityLevel} Security
            </Badge>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h1 
                className="text-2xl md:text-3xl font-bold mb-4" 
                style={{
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize + 8}px` : '28px',
                  color: formConfig.settings.canvasStyles?.fontColor || '#000000'
                }}
              >
                {formConfig.name}
              </h1>
              {formConfig.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {formConfig.description}
                </p>
              )}
            </motion.div>

            {/* Progress indicator for multi-step forms */}
            {isMultiStep && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </motion.div>
            )}

            <div className="space-y-6">
              {(isMultiStep ? currentStepElements : formConfig.elements).map((element, index) => (
                <motion.div 
                  key={element.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="space-y-2"
                >
                  <FormElementRenderer
                    element={element}
                    value={formData[element.label] || ""}
                    onChange={(value) => handleChange(element.id, value)}
                    formConfig={formConfig}
                  />
                  {validationErrors[element.id] && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {validationErrors[element.id]}
                    </motion.p>
                  )}
                </motion.div>
              ))}

              {/* Multi-step navigation */}
              {isMultiStep && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-between items-center pt-6"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps - 1 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
                    >
                      Next
                    </Button>
                  ) : null}
                </motion.div>
              )}

              {/* Terms & Conditions */}
              {formConfig.settings.termsAndConditions?.enabled && (!isMultiStep || currentStep === totalSteps - 1) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 text-sm p-4 bg-gray-50 rounded-lg"
                >
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    required={formConfig.settings.termsAndConditions.required}
                  />
                  <label htmlFor="terms" className="flex-1" style={{
                    fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                    fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize - 2}px` : '14px',
                    color: formConfig.settings.canvasStyles?.fontColor || '#6b7280'
                  }}>
                    {formConfig.settings.termsAndConditions.text || 'I accept the Terms & Conditions'}
                  </label>
                </motion.div>
              )}

              {/* Enhanced Submit Button (only show on last step or single step) */}
              {(!isMultiStep || currentStep === totalSteps - 1) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 font-medium transition-all duration-300 relative overflow-hidden group"
                    style={{
                      backgroundColor: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6',
                      color: 'white',
                      fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                      fontSize: formConfig.settings.canvasStyles?.fontSize ? `${formConfig.settings.canvasStyles.fontSize + 2}px` : '18px'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={false}
                      animate={{ scale: isSubmitting ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2" />
                        Submitting...
                      </motion.div>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        {formConfig.settings.submitButton?.text || 'Submit Form'}
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
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
