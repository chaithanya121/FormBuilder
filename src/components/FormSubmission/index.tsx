
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormConfig } from '@/components/FormBuilder/types';
import FormPreview from '@/components/FormBuilder/FormPreview';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { formsApi } from '@/services/api/forms';

const FormSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<any>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForm = async () => {
      if (!id) return;
      
      try {
        const formData = await formsApi.getPreviewData(id);
        
        if (!formData) {
          toast({
            title: "Form Not Found",
            description: "The requested form could not be found.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        if (!formData.published) {
          toast({
            title: "Form Not Available",
            description: "This form is not published and cannot be submitted.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        setForm(formData);
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
    // if (!form || !id) return;
    
    try {
      // Submit form using the API
      // debugger;
      await formsApi.submitFormResponse(JSON.parse(id), formValues);
      
      // Show success message
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading Form...</h2>
            <p className="text-gray-400">Please wait while we load the form.</p>
          </div>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto mb-4 bg-green-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Form Submitted Successfully!</h2>
            <p className="text-gray-400 mb-6">Thank you for your submission.</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-4" style={{width: '38%'}}>
        <Card className="bg-gray-800 border-gray-700 p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{form?.config?.name}</h1>
          <p className="text-gray-400">Please fill out the form below</p>
        </Card>

        <Card 
          className="bg-gray-800 border-gray-700 p-6 min-h-[calc(72vh -16rem)]"
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
