
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppSelector,useAppDispatch } from '@/hooks/redux';
import { ArrowLeft, ExternalLink, Smartphone, Tablet, Monitor, Play } from 'lucide-react';
import { FormConfig } from '@/components/FormBuilder/types';
import { fetchFormPrvById } from '@/store/slices/formsSlice';

const FormPreview: React.FC = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [loading, setLoading] = useState(true);
  // Redux state
  const { forms, currentForm, error ,preview_form} = useAppSelector((state) => state.forms);
    const dispatch = useAppDispatch();


  const loadForm = () => {
      try {
      
       dispatch(fetchFormPrvById(formId))
       
      } catch (error) {
        console.error('Failed to load form for preview:', error);
      } finally {
        setLoading(false);
      }
    };

   
  useEffect(() => {
   loadForm()
  }, [formId]);

  console.log('form_pre',preview_form)

  useEffect(() => {
    setFormConfig(preview_form)
  
  }, [formId]);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-4xl';
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return url;
  };

  const renderFormElement = (element: any) => {
    switch (element.type) {
      case 'youtube':
        const embedUrl = getYouTubeEmbedUrl(element.url || '');
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {element.url ? (
              <div className="space-y-3">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={element.label || "YouTube video player"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Play className="h-4 w-4" />
                  <span>Video plays in preview</span>
                  <a 
                    href={element.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    YouTube
                  </a>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2" />
                  <p>No video URL provided</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'text':
      case 'email':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select an option</option>
              {element.options?.map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!formConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Not Found</h1>
          <p className="text-gray-600 mb-6">The form you're looking for doesn't exist or has been deleted.</p>
          <Button onClick={() => navigate('/create')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/create')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{formConfig.name}</h1>
                <p className="text-sm text-gray-600">Form Preview</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'tablet' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
              
              <Button onClick={() => window.open(`/form/${formId}`, '_blank')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Live Form
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6">
        <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
          <Card className="overflow-hidden shadow-xl">
            <div 
              className="p-8"
              style={{
                background: formConfig.settings.canvasStyles?.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '600px'
              }}
            >
              <div 
                className="bg-white rounded-lg shadow-lg p-6"
                style={{
                  backgroundColor: formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff',
                  color: formConfig.settings.canvasStyles?.fontColor || '#1a1a1a',
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: `${formConfig.settings.canvasStyles?.fontSize || 16}px`,
                  borderRadius: formConfig.settings.canvasStyles?.borderRadius || '12px'
                }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{formConfig.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{formConfig.elements.length} fields</Badge>
                    <Badge variant="outline">
                      {formConfig.elements.filter(el => el.required).length} required
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  {formConfig.elements.map((element) => (
                    <div key={element.id}>
                      {renderFormElement(element)}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button 
                    className="w-full"
                    style={{ 
                      backgroundColor: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6' 
                    }}
                  >
                    {formConfig.settings.submitButton?.text || 'Submit Form'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
