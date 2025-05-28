
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormConfig } from '@/components/FormBuilder/types';
import FormPreview from '@/components/FormBuilder/FormPreview';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { formsApi, FormData } from '@/services/api/forms';
import { useTheme } from '@/components/theme-provider';

const FormSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [form, setForm] = useState<FormData | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForm = async () => {
      if (!id) return;
      
      try {
        const formData = await formsApi.getPreviewData(id);
        
        if (!formData || typeof formData !== 'object' || !('primary_id' in formData)) {
          toast({
            title: "Form Not Found",
            description: "The requested form could not be found.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        if (formData.published === false) {
          toast({
            title: "Form Not Available",
            description: "This form is not published and cannot be submitted.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        setForm(formData as FormData);
      } catch (error) {
        console.error('Error loading form:', error);
        toast({
          title: "Error",
          description: "Failed to load form data",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    loadForm();
  }, [id, navigate, toast]);

  const handleFormSubmit = async () => {
    if (!form || !id) return;
    
    try {
      await formsApi.submitFormResponse(JSON.parse(id), formValues);
      
      setSubmitted(true);
      toast({
        title: "Success",
        description: "Form submitted successfully"
      });
      
      console.log('Form submitted with values:', formValues);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      } text-${theme === 'light' ? 'gray-900' : 'white'} flex items-center justify-center`}>
        <Card className={`${theme === 'light' 
          ? 'bg-white/80 border-gray-200 shadow-xl' 
          : 'bg-gray-800 border-gray-700 shadow-2xl'
        } p-8 max-w-md w-full rounded-2xl backdrop-blur-sm`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Loading Form...
            </h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Please wait while we load the form.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={`min-h-screen ${theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      } text-${theme === 'light' ? 'gray-900' : 'white'} flex items-center justify-center`}>
        <Card className={`${theme === 'light' 
          ? 'bg-white/80 border-gray-200 shadow-xl' 
          : 'bg-gray-800 border-gray-700 shadow-2xl'
        } p-8 max-w-md w-full rounded-2xl backdrop-blur-sm`}>
          <div className="text-center">
            <div className={`mx-auto mb-4 ${theme === 'light' 
              ? 'bg-green-100' 
              : 'bg-green-500/20'
            } p-3 rounded-full w-16 h-16 flex items-center justify-center`}>
              <CheckCircle className={`h-8 w-8 ${theme === 'light' ? 'text-green-600' : 'text-green-500'}`} />
            </div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Form Submitted Successfully!
            </h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6`}>
              Thank you for your submission.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full rounded-lg"
            >
              Return Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Apply canvas styles from form config if available
  const canvasStyles = form?.config?.settings?.canvasStyles || {};
  const canvasStylesObj = {
    backgroundColor: canvasStyles.backgroundColor || '',
    backgroundImage: canvasStyles.backgroundImage || '',
    padding: canvasStyles.padding || '',
    margin: canvasStyles.margin || '',
    borderRadius: canvasStyles.borderRadius || '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } text-${theme === 'light' ? 'gray-900' : 'white'}`}>
      <div className="container mx-auto p-4" style={{width: '38%'}}>
        <Card className={`${theme === 'light' 
          ? 'bg-white/80 border-gray-200 shadow-lg' 
          : 'bg-gray-800 border-gray-700 shadow-xl'
        } p-6 mb-6 rounded-2xl backdrop-blur-sm`}>
          <h1 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {form?.config?.name}
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Please fill out the form below
          </p>
        </Card>

        <Card 
          className={`${theme === 'light' 
            ? 'bg-white/80 border-gray-200 shadow-lg' 
            : 'bg-gray-800 border-gray-700 shadow-xl'
          } p-6 min-h-[calc(72vh-16rem)] rounded-2xl backdrop-blur-sm`}
          style={canvasStylesObj}
        >
          <FormPreview 
            formConfig={form?.config} 
            onChange={setFormValues}
            values={formValues}
            onSubmit={handleFormSubmit}
            isSubmission={true}
          />
        </Card>
      </div>
    </div>
  );
};

export default FormSubmission;
