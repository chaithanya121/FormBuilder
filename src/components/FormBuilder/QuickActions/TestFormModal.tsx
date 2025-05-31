
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, AlertCircle, BarChart3, Timer } from 'lucide-react';
import { FormConfig } from '../types';
import { motion } from 'framer-motion';
import FormElementRenderer from '../FormElementRenderer';

interface TestFormModalProps {
  formConfig: FormConfig;
  onClose: () => void;
}

const TestFormModal: React.FC<TestFormModalProps> = ({ formConfig, onClose }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [testStartTime] = useState(Date.now());

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    formConfig.elements.forEach(element => {
      if (element.required && (!formData[element.id] || formData[element.id] === '')) {
        errors[element.id] = `${element.label} is required`;
      }
      
      if (element.type === 'email' && formData[element.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[element.id])) {
          errors[element.id] = 'Please enter a valid email address';
        }
      }
      
      if (element.validation?.minLength && formData[element.id]?.length < element.validation.minLength) {
        errors[element.id] = `Must be at least ${element.validation.minLength} characters`;
      }
    });
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (elementId: string, value: any) => {
    setFormData(prev => ({ ...prev, [elementId]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[elementId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[elementId];
        return newErrors;
      });
    }
  };

  const getTestStats = () => {
    const totalFields = formConfig.elements.length;
    const filledFields = Object.keys(formData).filter(key => formData[key] && formData[key] !== '').length;
    const requiredFields = formConfig.elements.filter(el => el.required).length;
    const filledRequiredFields = formConfig.elements
      .filter(el => el.required && formData[el.id] && formData[el.id] !== '').length;
    
    return {
      totalFields,
      filledFields,
      requiredFields,
      filledRequiredFields,
      completionRate: Math.round((filledFields / totalFields) * 100),
      requiredCompletionRate: requiredFields > 0 ? Math.round((filledRequiredFields / requiredFields) * 100) : 100
    };
  };

  const stats = getTestStats();

  if (isSubmitted) {
    const testDuration = Math.round((Date.now() - testStartTime) / 1000);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl max-w-2xl w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Completed Successfully!</h2>
              <p className="text-gray-600">Your form is working perfectly</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm font-medium">Test Duration</span>
                </div>
                <div className="text-2xl font-bold text-green-900">{testDuration}s</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm font-medium">Completion</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{stats.completionRate}%</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Form Data Collected:</h3>
              <pre className="text-sm text-left bg-white p-3 rounded border overflow-auto max-h-32">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>

            <Button onClick={onClose} className="w-full">
              Close Test Results
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Test Form
              <div className="ml-auto flex gap-2">
                <Badge variant="secondary">
                  {stats.filledFields}/{stats.totalFields} filled
                </Badge>
                <Badge variant="secondary">
                  {stats.requiredCompletionRate}% required
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Test Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.completionRate}%</div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.filledRequiredFields}/{stats.requiredFields}</div>
                  <div className="text-sm text-gray-600">Required Fields</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{Object.keys(validationErrors).length}</div>
                  <div className="text-sm text-gray-600">Validation Errors</div>
                </div>
              </div>
            </div>

            {/* Form Test */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="max-h-96 overflow-y-auto space-y-4">
                {formConfig.elements.map(element => (
                  <motion.div
                    key={element.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg ${
                      validationErrors[element.id] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <FormElementRenderer
                      element={element}
                      value={formData[element.id] || ''}
                      onChange={(value) => handleInputChange(element.id, value)}
                      formConfig={formConfig}
                    />
                    {validationErrors[element.id] && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {validationErrors[element.id]}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Submit Test
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel Test
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TestFormModal;
