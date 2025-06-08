import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, LayoutDashboard, Mail, MessageSquare, 
  Settings, ShoppingCart, Users, ChevronRight, Sparkles
} from "lucide-react";
import { formsApi } from "@/services/api/forms";

interface FormData {
  name: string;
  description: string;
  category: string;
}

const categories = [
  { id: 'general', name: 'General', icon: LayoutDashboard },
  { id: 'contact', name: 'Contact', icon: Users },
  { id: 'feedback', name: 'Feedback', icon: MessageSquare },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart },
  { id: 'settings', name: 'Settings', icon: Settings },
  { id: 'other', name: 'Other', icon: FileText },
  { id: 'email', name: 'Email', icon: Mail },
];

const FormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    category: 'general',
  });
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 3;

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name.trim() !== '';
    }
    return true;
  };

  const handleCreateForm = async () => {
    setIsCreating(true);
    try {
      const newForm = await formsApi.createForm({
        name: formData.name,
        published: false,
        config: {
          name: formData.name,
          elements: [],
          settings: {
            preview: {
              width: "Full",
              nesting: false
            },
            validation: {
              liveValidation: "Default"
            },
            layout: {
              size: "Default",
              columns: {
                default: true,
                tablet: true,
                desktop: true
              },
              labels: "Default",
              placeholders: "Default",
              errors: "Default",
              messages: "Default"
            },
            submitButton: {
              text: 'Submit',
              style: 'default',
              position: 'bottom'
            }
          }
        }
      });
      toast({
        title: "Form Created",
        description: "Your new form has been successfully created!",
      });
      navigate(`/form-builder/${newForm.primary_id}`);
    } catch (error) {
      console.error("Form creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Form Builder
          </h1>
          <p className="text-gray-600 text-lg">
            Create professional forms in minutes with AI assistance
          </p>
        </motion.div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Information</h2>
                    <p className="text-gray-600">Let's start with the basics about your form</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="formName" className="text-base font-medium">
                        Form Name *
                      </Label>
                      <Input
                        id="formName"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g., Customer Feedback Survey"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="formDescription" className="text-base font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="formDescription"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Brief description of your form's purpose"
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Form Category
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => setFormData({...formData, category: category.id})}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.category === category.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <category.icon className={`w-6 h-6 mx-auto mb-2 ${
                                formData.category === category.id ? 'text-blue-600' : 'text-gray-400'
                              }`} />
                              <span className="text-sm font-medium">{category.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Content Generation</h2>
                    <p className="text-gray-600">Let our AI suggest the best content for your form</p>
                  </div>

                  <div>
                    <Label htmlFor="aiSuggestions" className="text-base font-medium">
                      AI Suggestions
                    </Label>
                    <Textarea
                      id="aiSuggestions"
                      placeholder="Generating AI suggestions..."
                      className="mt-1"
                      rows={5}
                      readOnly
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirmation</h2>
                    <p className="text-gray-600">Review and confirm your form details</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Form Name</Label>
                      <p className="text-gray-700">{formData.name}</p>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Description</Label>
                      <p className="text-gray-700">{formData.description}</p>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Category</Label>
                      <p className="text-gray-700">{categories.find(cat => cat.id === formData.category)?.name}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Continue
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleCreateForm}
                  disabled={isCreating || !canProceed()}
                  className="px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-4 h-4" />
                      Create Form
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormWizard;
