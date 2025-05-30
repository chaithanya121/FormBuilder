
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Upload, Copy, Expand, Shrink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import FormPreview from '@/components/FormBuilder/FormPreview';
import { useToast } from '@/hooks/use-toast';
import { FormConfig } from '@/components/FormBuilder/types';

const FormPreviewPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load form configuration from localStorage
    const loadFormConfig = () => {
      try {
        // First try to get from preview storage
        let savedForm = localStorage.getItem('previewFormConfig');
        
        // If not found, try to get from form builder storage
        if (!savedForm && formId) {
          savedForm = localStorage.getItem(`formBuilder_${formId}`);
        }
        
        // If still not found, try current form ID
        if (!savedForm) {
          const currentFormId = localStorage.getItem('currentFormId');
          if (currentFormId) {
            savedForm = localStorage.getItem(`formBuilder_${currentFormId}`);
          }
        }

        if (savedForm) {
          const parsedForm = JSON.parse(savedForm);
          setFormConfig(parsedForm);
          console.log('Loaded form config for preview:', parsedForm);
        } else {
          // Fallback to demo config if no saved form
          setFormConfig({
            name: "Demo Form",
            elements: [
              {
                id: "1",
                type: "text",
                label: "Full Name",
                placeholder: "Enter your full name",
                required: true,
              },
              {
                id: "2", 
                type: "email",
                label: "Email Address",
                placeholder: "Enter your email",
                required: true,
              }
            ],
            settings: {
              preview: { width: "Full", nesting: false },
              validation: { liveValidation: "Default" },
              layout: {
                size: "Default",
                columns: { default: true, tablet: true, desktop: true },
                labels: "Default",
                placeholders: "Default",
                errors: "Default",
                messages: "Default"
              },
              canvasStyles: {
                backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                formBackgroundColor: "#ffffff",
                fontColor: "#321f16",
                primaryColor: "#3b82f6",
                fontFamily: "Inter",
                fontSize: 16,
                formWidth: 752,
                borderRadius: "12px",
                padding: "32px"
              }
            }
          });
        }
      } catch (error) {
        console.error('Failed to load form config:', error);
        toast({
          title: "Error",
          description: "Failed to load form configuration",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadFormConfig();
  }, [formId, toast]);

  const handleExport = () => {
    if (formConfig) {
      const dataStr = JSON.stringify(formConfig, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formConfig.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast({
        title: "Exported Successfully",
        description: "Form configuration has been exported.",
      });
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedConfig = JSON.parse(event.target?.result as string);
            setFormConfig(importedConfig);
            localStorage.setItem('previewFormConfig', JSON.stringify(importedConfig));
            toast({
              title: "Import Successful",
              description: "Form configuration has been imported.",
            });
          } catch (error) {
            toast({
              title: "Import Failed",
              description: "Invalid JSON file format.",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleCopy = () => {
    if (formConfig) {
      navigator.clipboard.writeText(JSON.stringify(formConfig, null, 2));
      toast({
        title: "Copied to Clipboard",
        description: "Form configuration copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form preview...</p>
        </div>
      </div>
    );
  }

  if (!formConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Form Found</h2>
          <p className="text-gray-600 mb-6">The form configuration could not be loaded.</p>
          <Button onClick={() => navigate('/create')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 px-6 py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formConfig.name}
                </h1>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {formConfig.elements.length} elements
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Preview and test your form functionality
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExport}
              className="bg-white/70 hover:bg-white/90 border-white/30"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleImport}
              className="bg-white/70 hover:bg-white/90 border-white/30"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Preview */}
          <div className="lg:col-span-2">
            <FormPreview 
              formConfig={formConfig}
              isSubmission={true}
            />
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Form Configuration */}
            <Card className="p-6 shadow-xl bg-white/95 backdrop-blur-sm border-0 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Copy className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Form Configuration</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Live JSON preview of your form</p>
              
              <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono overflow-auto max-h-96">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-700">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-6 px-2">
                      Viewer
                    </Button>
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 h-6 px-2">
                      JSON
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-6 px-2">
                      <Expand className="h-3 w-3 mr-1" />
                      Expand All
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-6 px-2">
                      <Shrink className="h-3 w-3 mr-1" />
                      Collapse All
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-6 px-2" onClick={handleCopy}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="text-cyan-400">
                  <span className="text-gray-500">&#123;</span>
                  <div className="ml-4">
                    <div><span className="text-cyan-400">"name"</span>: <span className="text-green-400">"{formConfig.name}"</span>,</div>
                    <div><span className="text-cyan-400">"elements"</span>: <span className="text-blue-400">[] ({formConfig.elements.length} items)</span>,</div>
                    <div><span className="text-cyan-400">"settings"</span>: <span className="text-blue-400">&#123;...&#125; (6 keys)</span></div>
                  </div>
                  <span className="text-gray-500">&#125;</span>
                </div>
              </div>
            </Card>

            {/* Form Statistics */}
            <Card className="p-6 shadow-xl bg-white/95 backdrop-blur-sm border-0 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Form Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Elements</span>
                  <Badge variant="outline">{formConfig.elements.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Required Fields</span>
                  <Badge variant="outline">
                    {formConfig.elements.filter(el => el.required).length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Form Width</span>
                  <Badge variant="outline">{formConfig.settings.canvasStyles?.formWidth || 800}px</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Font Family</span>
                  <Badge variant="outline">{formConfig.settings.canvasStyles?.fontFamily || 'Inter'}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPreviewPage;
