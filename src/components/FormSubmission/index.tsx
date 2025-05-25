
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormElementRenderer from '@/components/FormElementRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { saveFormSubmission } from '@/lib/submission-utils';
import { formsApi, FormData } from '@/services/api/forms';
import { FormConfig } from '@/components/FormBuilder/types';
import { useTheme } from '@/components/theme-provider';

const FormSubmission = () => {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const loadForm = async () => {
      if (!formId) return;
      
      try {
        const loadedForm = await formsApi.getFormById(formId);
        if (loadedForm && 'config' in loadedForm) {
          setForm(loadedForm);
        }
      } catch (error) {
        console.error('Error loading form:', error);
        toast({
          title: "Error",
          description: "Failed to load form",
          variant: "destructive"
        });
      }
    };

    loadForm();
  }, [formId, toast]);

  const isFormPublished = form && 'published' in form ? form.published : false;

  if (!form || !isFormPublished) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}>
        <Card className={`w-full max-w-md mx-4 ${theme === 'light' 
          ? 'bg-white/80 backdrop-blur-sm border-white/20 shadow-xl' 
          : 'bg-gray-800/80 backdrop-blur-sm border-gray-700/50'
        }`}>
          <CardContent className="pt-6 text-center">
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              {!form ? 'Loading...' : 'This form is not available'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (elementId: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [elementId]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formId) return;

    setIsSubmitting(true);
    try {
      await saveFormSubmission(formId, formData);
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Form submitted successfully!"
      });

      // Handle redirect if specified
      if (form && form.config && form.config.settings && form.config.settings.redirectUrl) {
        window.location.href = form.config.settings.redirectUrl;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formConfig: FormConfig | undefined = form && 'config' in form ? form.config : undefined;

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <Card className={`w-full max-w-2xl mx-4 ${theme === 'light' 
        ? 'bg-white/80 backdrop-blur-sm border-white/20 shadow-xl' 
        : 'bg-gray-800/80 backdrop-blur-sm border-gray-700/50'
      }`}>
        <CardHeader>
          <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
            {formConfig?.title || 'Form'}
          </CardTitle>
          <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
            {formConfig?.description || 'Fill out the form below'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center">
              <h2 className={theme === 'light' ? 'text-gray-800 text-2xl font-semibold mb-4' : 'text-white text-2xl font-semibold mb-4'}>
                {formConfig?.settings?.successMessage || 'Thank you for your submission!'}
              </h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formConfig?.elements && formConfig.elements.map((element) => (
                <FormElementRenderer
                  key={element.id}
                  element={element}
                  onChange={handleInputChange}
                  value={formData[element.id]}
                />
              ))}
              <Button 
                type="submit" 
                className={`${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                } text-white shadow-lg hover:shadow-xl transition-all duration-200`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : formConfig?.settings?.submitButtonText || formConfig?.settings?.submitButton?.text || 'Submit'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSubmission;
