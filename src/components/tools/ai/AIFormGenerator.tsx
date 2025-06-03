
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  Zap, ArrowLeft, Wand, Sparkles, Copy, Download, 
  Eye, Settings, RefreshCw, Save, Share2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const AIFormGenerator = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<any>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const generateForm = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a description for your form",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockGeneratedForm = {
        title: formTitle || "AI Generated Form",
        description: formDescription || "Generated using AI prompts",
        fields: [
          {
            id: '1',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
          },
          {
            id: '2',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
          },
          {
            id: '3',
            type: 'textarea',
            label: 'Message',
            placeholder: 'Enter your message',
            required: false
          }
        ]
      };
      
      setGeneratedForm(mockGeneratedForm);
      setIsGenerating(false);
      
      toast({
        title: "Form Generated!",
        description: "Your AI-powered form has been created successfully",
      });
    }, 3000);
  };

  const saveForm = () => {
    toast({
      title: "Form Saved",
      description: "Your form has been saved to your dashboard",
    });
  };

  const copyFormCode = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedForm, null, 2));
    toast({
      title: "Code Copied",
      description: "Form code copied to clipboard",
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                AI Form Generator
              </h1>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Generate forms using advanced AI prompts
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
            NEW
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand className="h-5 w-5 text-violet-500" />
                  AI Prompt Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Form Title
                  </label>
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Contact Form, Survey, Registration"
                    className={theme === 'light' 
                      ? 'bg-white border-gray-300' 
                      : 'bg-gray-700 border-gray-600'
                    }
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Form Description
                  </label>
                  <Input
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Brief description of the form purpose"
                    className={theme === 'light' 
                      ? 'bg-white border-gray-300' 
                      : 'bg-gray-700 border-gray-600'
                    }
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    AI Prompt
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the form you want to create. Be specific about fields, validation, and styling..."
                    rows={6}
                    className={theme === 'light' 
                      ? 'bg-white border-gray-300' 
                      : 'bg-gray-700 border-gray-600'
                    }
                  />
                </div>

                <Button 
                  onClick={generateForm}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Form
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm h-full`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Form Preview
                  </CardTitle>
                  {generatedForm && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyFormCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={saveForm}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedForm ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {generatedForm.title}
                      </h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {generatedForm.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {generatedForm.fields.map((field: any) => (
                        <div key={field.id}>
                          <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.type === 'textarea' ? (
                            <Textarea
                              placeholder={field.placeholder}
                              className={theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              }
                              disabled
                            />
                          ) : (
                            <Input
                              type={field.type}
                              placeholder={field.placeholder}
                              className={theme === 'light' 
                                ? 'bg-gray-50 border-gray-300' 
                                : 'bg-gray-700 border-gray-600'
                              }
                              disabled
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600" disabled>
                      Submit Form
                    </Button>
                  </div>
                ) : (
                  <div className={`text-center py-12 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Generated form will appear here</p>
                    <p className="text-sm">Enter a prompt and click generate to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
