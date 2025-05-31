
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, Zap, Brain, Magic, Loader2 } from 'lucide-react';
import { FormConfig, FormElement } from '../types';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface AIEnhanceModalProps {
  formConfig: FormConfig;
  onEnhance: (enhancedConfig: FormConfig) => void;
  onClose: () => void;
}

const AIEnhanceModal: React.FC<AIEnhanceModalProps> = ({ formConfig, onEnhance, onClose }) => {
  const { toast } = useToast();
  const [enhanceType, setEnhanceType] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const enhanceOptions = [
    {
      id: 'validation',
      title: 'Smart Validation',
      description: 'Add intelligent validation rules and error messages',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      id: 'accessibility',
      title: 'Accessibility Boost',
      description: 'Enhance form accessibility and ARIA attributes',
      icon: Brain,
      color: 'bg-green-500'
    },
    {
      id: 'styling',
      title: 'Modern Styling',
      description: 'Apply modern design patterns and animations',
      icon: Magic,
      color: 'bg-purple-500'
    },
    {
      id: 'ux',
      title: 'UX Optimization',
      description: 'Improve user experience with smart field ordering',
      icon: Sparkles,
      color: 'bg-orange-500'
    },
    {
      id: 'custom',
      title: 'Custom Enhancement',
      description: 'Describe your specific enhancement needs',
      icon: Wand2,
      color: 'bg-pink-500'
    }
  ];

  const handleEnhance = async () => {
    if (!enhanceType) {
      toast({
        title: "Please select an enhancement type",
        variant: "destructive"
      });
      return;
    }

    if (enhanceType === 'custom' && !customPrompt.trim()) {
      toast({
        title: "Please describe your custom enhancement",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const enhancedConfig = { ...formConfig };

    switch (enhanceType) {
      case 'validation':
        enhancedConfig.elements = enhancedConfig.elements.map(element => ({
          ...element,
          validation: {
            ...element.validation,
            ...(element.type === 'email' && {
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
            }),
            ...(element.type === 'password' && {
              minLength: 8,
              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
            }),
            ...(element.type === 'text' && element.label.toLowerCase().includes('phone') && {
              pattern: '^[\\+]?[1-9][\\d]{0,15}$'
            })
          },
          helpText: element.type === 'password' ? 
            'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character' :
            element.helpText
        }));
        break;

      case 'accessibility':
        enhancedConfig.elements = enhancedConfig.elements.map(element => ({
          ...element,
          ariaLabel: element.ariaLabel || element.label,
          ariaDescription: element.ariaDescription || element.description,
          role: element.type === 'button' ? 'button' : 'textbox'
        }));
        break;

      case 'styling':
        enhancedConfig.settings.canvasStyles = {
          ...enhancedConfig.settings.canvasStyles,
          backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          padding: "40px",
          customCSS: `
            .form-element {
              transition: all 0.3s ease;
              transform: scale(1);
            }
            .form-element:hover {
              transform: scale(1.02);
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .form-element:focus-within {
              transform: scale(1.02);
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
            }
          `
        };
        break;

      case 'ux':
        // Reorder elements for better UX (basic fields first, complex later)
        const elementOrder = ['text', 'email', 'password', 'tel', 'number', 'select', 'radio', 'checkbox', 'textarea'];
        enhancedConfig.elements = enhancedConfig.elements.sort((a, b) => {
          const aIndex = elementOrder.indexOf(a.type) === -1 ? 999 : elementOrder.indexOf(a.type);
          const bIndex = elementOrder.indexOf(b.type) === -1 ? 999 : elementOrder.indexOf(b.type);
          return aIndex - bIndex;
        });
        break;

      case 'custom':
        // For custom enhancements, we'll add some general improvements
        enhancedConfig.elements = enhancedConfig.elements.map(element => ({
          ...element,
          tooltip: element.tooltip || `Enhanced: ${element.label}`,
          customClasses: element.customClasses ? 
            `${element.customClasses} enhanced-element` : 
            'enhanced-element'
        }));
        break;
    }

    setIsProcessing(false);
    onEnhance(enhancedConfig);
    
    toast({
      title: "Form Enhanced Successfully!",
      description: `Applied ${enhanceOptions.find(opt => opt.id === enhanceType)?.title} enhancements.`,
    });
  };

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
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Form Enhancement
              <Badge variant="secondary" className="ml-auto">
                Powered by AI
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Enhancement Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhanceOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        enhanceType === option.id
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                      onClick={() => setEnhanceType(option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${option.color} text-white`}>
                          <option.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{option.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {enhanceType === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Describe your enhancement needs:
                  </label>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Add conditional logic, improve mobile responsiveness, add progress indicators..."
                    rows={4}
                    className="w-full"
                  />
                </motion.div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Current Form Stats:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600">{formConfig.elements.length}</div>
                    <div className="text-xs text-gray-600">Elements</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {formConfig.elements.filter(el => el.required).length}
                    </div>
                    <div className="text-xs text-gray-600">Required</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600">
                      {formConfig.elements.filter(el => el.validation).length}
                    </div>
                    <div className="text-xs text-gray-600">With Validation</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleEnhance}
                  disabled={!enhanceType || isProcessing}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Enhance Form
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AIEnhanceModal;
