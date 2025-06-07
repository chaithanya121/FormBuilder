
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Circle, 
  Sparkles, Wand2, FileText, Palette, Settings,
  Users, Target, Calendar, MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FormWizardData {
  name: string;
  description: string;
  type: string;
  purpose: string;
  targetAudience: string;
  fields: string[];
  styling: {
    theme: string;
    primaryColor: string;
  };
}

const FormWizard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormWizardData>({
    name: '',
    description: '',
    type: '',
    purpose: '',
    targetAudience: '',
    fields: [],
    styling: {
      theme: 'modern',
      primaryColor: '#3b82f6'
    }
  });

  const steps = [
    {
      id: 'basic',
      title: 'Basic Information',
      description: 'Tell us about your form',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'purpose',
      title: 'Purpose & Audience',
      description: 'Define your form\'s goal',
      icon: Target,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'fields',
      title: 'Form Fields',
      description: 'Choose what data to collect',
      icon: MessageSquare,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'styling',
      title: 'Design & Style',
      description: 'Make it look amazing',
      icon: Palette,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'review',
      title: 'Review & Create',
      description: 'Final review before creation',
      icon: CheckCircle,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const formTypes = [
    { value: 'contact', label: 'Contact Form', description: 'Simple contact information collection' },
    { value: 'survey', label: 'Survey Form', description: 'Gather feedback and opinions' },
    { value: 'registration', label: 'Registration Form', description: 'Event or service registration' },
    { value: 'feedback', label: 'Feedback Form', description: 'Customer feedback collection' },
    { value: 'application', label: 'Application Form', description: 'Job or program applications' },
    { value: 'order', label: 'Order Form', description: 'Product or service orders' }
  ];

  const fieldSuggestions = [
    'Name', 'Email', 'Phone', 'Address', 'Message', 
    'Company', 'Job Title', 'Age', 'Gender', 'Country',
    'Rating', 'Comments', 'File Upload', 'Date', 'Time'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFieldToggle = (field: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.includes(field)
        ? prev.fields.filter(f => f !== field)
        : [...prev.fields, field]
    }));
  };

  const handleComplete = () => {
    toast({
      title: "Form Created Successfully!",
      description: `"${formData.name}" has been created with AI assistance.`,
    });
    navigate('/form-builder/new');
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Form Name</label>
                <Input
                  placeholder="e.g., Customer Feedback Form"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                <Textarea
                  placeholder="Briefly describe what this form is for..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Form Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formTypes.map((type) => (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-all duration-200 ${
                        formData.type === type.value 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm">{type.label}</h3>
                        <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'purpose':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">What&apos;s the purpose of this form?</label>
                <Textarea
                  placeholder="e.g., Collect customer feedback to improve our services..."
                  value={formData.purpose}
                  onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Who is your target audience?</label>
                <Textarea
                  placeholder="e.g., Existing customers, potential clients, event attendees..."
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 'fields':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select the fields you need</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {fieldSuggestions.map((field) => (
                  <Button
                    key={field}
                    variant={formData.fields.includes(field) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFieldToggle(field)}
                    className="justify-start h-auto py-3"
                  >
                    {field}
                  </Button>
                ))}
              </div>
              <div className="mt-4">
                <Badge variant="secondary" className="text-sm">
                  {formData.fields.length} fields selected
                </Badge>
              </div>
            </div>
          </div>
        );

      case 'styling':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Theme Style</label>
                <Select 
                  value={formData.styling.theme} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    styling: { ...prev.styling, theme: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern & Clean</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Color</label>
                <div className="grid grid-cols-6 gap-2">
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'].map((color) => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-lg border-2 ${
                        formData.styling.primaryColor === color ? 'border-gray-900' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        styling: { ...prev.styling, primaryColor: color }
                      }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Form Summary</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2">{formData.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2">{formTypes.find(t => t.value === formData.type)?.label}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fields:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.fields.map((field) => (
                      <Badge key={field} variant="secondary">{field}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Theme:</span>
                  <span className="ml-2">{formData.styling.theme}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
              <Wand2 className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Form Wizard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create beautiful forms in minutes with AI assistance
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  index <= currentStep 
                    ? `bg-gradient-to-r ${step.gradient} text-white border-transparent` 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                    index < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${steps[currentStep].gradient} flex items-center justify-center text-white`}>
                  <steps[currentStep].icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                <p className="text-gray-600">{steps[currentStep].description}</p>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                {renderStepContent()}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mt-8"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Create Form
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FormWizard;
