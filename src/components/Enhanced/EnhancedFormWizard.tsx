
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, Check, Wand2, Sparkles,
  FileText, Settings, Palette, Send, Users, Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

const EnhancedFormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    audience: '',
    style: 'modern',
    features: [] as string[]
  });

  const steps: WizardStep[] = [
    {
      id: 'basics',
      title: 'Form Basics',
      description: 'Set up your form name and purpose',
      icon: <FileText className="h-5 w-5" />,
      completed: formData.name && formData.purpose ? true : false
    },
    {
      id: 'audience',
      title: 'Target Audience',
      description: 'Define who will use your form',
      icon: <Users className="h-5 w-5" />,
      completed: formData.audience ? true : false
    },
    {
      id: 'ai-suggestions',
      title: 'AI Suggestions',
      description: 'Get intelligent recommendations',
      icon: <Brain className="h-5 w-5" />,
      completed: false
    },
    {
      id: 'design',
      title: 'Design & Style',
      description: 'Choose your form appearance',
      icon: <Palette className="h-5 w-5" />,
      completed: formData.style ? true : false
    },
    {
      id: 'features',
      title: 'Advanced Features',
      description: 'Enable powerful capabilities',
      icon: <Settings className="h-5 w-5" />,
      completed: formData.features.length > 0
    },
    {
      id: 'finish',
      title: 'Review & Create',
      description: 'Finalize your form',
      icon: <Check className="h-5 w-5" />,
      completed: false
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basics':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="form-name">Form Name</Label>
              <Input
                id="form-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Customer Feedback Form"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="form-purpose">Purpose</Label>
              <Input
                id="form-purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                placeholder="e.g., Collect customer feedback and suggestions"
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-6">
            <div>
              <Label>Who is your target audience?</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {['Customers', 'Employees', 'Students', 'General Public', 'Partners', 'Vendors'].map((audience) => (
                  <Button
                    key={audience}
                    variant={formData.audience === audience ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, audience })}
                    className="justify-start"
                  >
                    {audience}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ai-suggestions':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Brain className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">AI is analyzing your requirements...</h3>
              <p className="text-gray-600">Getting intelligent suggestions for your form</p>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Recommended Fields</span>
                </div>
                <p className="text-sm text-gray-600">
                  Based on your purpose, we suggest: Name, Email, Rating, Comments, Contact Preference
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Design Suggestion</span>
                </div>
                <p className="text-sm text-gray-600">
                  For customer feedback, we recommend a clean, professional design with progress indicators
                </p>
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="space-y-6">
            <div>
              <Label>Choose a design style</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {[
                  { id: 'modern', name: 'Modern', color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
                  { id: 'classic', name: 'Classic', color: 'bg-gradient-to-r from-gray-600 to-gray-800' },
                  { id: 'colorful', name: 'Colorful', color: 'bg-gradient-to-r from-pink-500 to-yellow-500' },
                  { id: 'minimal', name: 'Minimal', color: 'bg-gradient-to-r from-gray-300 to-gray-500' }
                ].map((style) => (
                  <Card
                    key={style.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                      formData.style === style.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setFormData({ ...formData, style: style.id })}
                  >
                    <div className={`h-20 rounded-lg ${style.color} mb-2`}></div>
                    <p className="font-medium text-center">{style.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div>
              <Label>Select advanced features</Label>
              <div className="space-y-3 mt-3">
                {[
                  { id: 'calculations', name: 'Calculation Fields', desc: 'Auto-calculate totals and scores' },
                  { id: 'notifications', name: 'Email Notifications', desc: 'Send alerts on form submission' },
                  { id: 'analytics', name: 'Advanced Analytics', desc: 'Detailed submission insights' },
                  { id: 'collaboration', name: 'Team Collaboration', desc: 'Comments and assignments' },
                  { id: 'mobile', name: 'Mobile Optimization', desc: 'Enhanced mobile experience' },
                  { id: 'accessibility', name: 'Accessibility Features', desc: 'WCAG compliant design' }
                ].map((feature) => (
                  <Card
                    key={feature.id}
                    className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.features.includes(feature.id) ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => {
                      const newFeatures = formData.features.includes(feature.id)
                        ? formData.features.filter(f => f !== feature.id)
                        : [...formData.features, feature.id];
                      setFormData({ ...formData, features: newFeatures });
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                      {formData.features.includes(feature.id) && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'finish':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Create!</h3>
              <p className="text-gray-600">Review your form configuration below</p>
            </div>
            
            <Card className="p-4">
              <h4 className="font-medium mb-3">Form Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span>{formData.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Audience:</span>
                  <span>{formData.audience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="capitalize">{formData.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Features:</span>
                  <span>{formData.features.length} selected</span>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Form Creation Wizard
        </h1>
        <p className="text-gray-600">Let's create your perfect form step by step</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  index < currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : index === currentStep
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : step.icon}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button
            className="bg-gradient-to-r from-green-500 to-green-600 flex items-center gap-2"
            onClick={() => {
              // Create form logic here
              console.log('Creating form with data:', formData);
            }}
          >
            <Wand2 className="h-4 w-4" />
            Create Form
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default EnhancedFormWizard;
