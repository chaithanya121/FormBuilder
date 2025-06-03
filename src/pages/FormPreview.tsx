
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { ArrowLeft, ExternalLink, Smartphone, Tablet, Monitor, Play, Share2, Eye, Heart, Star, Users, Clock, Zap, Shield, CheckCircle } from 'lucide-react';
import { FormConfig } from '@/components/FormBuilder/types';
import { fetchFormPrvById } from '@/store/slices/formsSlice';
import { motion, AnimatePresence } from 'framer-motion';

const FormPreview: React.FC = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState({
    views: 1247,
    submissions: 89,
    conversionRate: 7.1,
    avgTime: '2m 34s',
    satisfaction: 4.8
  });

  // Redux state
  const { forms, currentForm, error, preview_form } = useAppSelector((state) => state.forms);
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

  useEffect(() => {
    // Fix: Handle the array type properly
    if (preview_form && Array.isArray(preview_form) && preview_form.length > 0) {
      setFormConfig(preview_form[0]);
    } else if (preview_form && !Array.isArray(preview_form)) {
      setFormConfig(preview_form as FormConfig);
    }
  }, [preview_form]);

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        views: prev.views + Math.floor(Math.random() * 3),
        submissions: prev.submissions + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-4xl';
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
    }
    
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {element.url ? (
              <div className="space-y-3">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-xl border border-gray-200/50">
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
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Play className="h-4 w-4 text-green-500" />
                  <span>Video plays in preview</span>
                  <a 
                    href={element.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors ml-auto"
                  >
                    <ExternalLink className="h-3 w-3" />
                    YouTube
                  </a>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No video URL provided</p>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 'text':
      case 'email':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
          </motion.div>
        );

      case 'textarea':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md resize-none"
            />
          </motion.div>
        );

      case 'select':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md">
              <option value="">Select an option</option>
              {element.options?.map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </motion.div>
        );

      default:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
          </motion.div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  if (!formConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 text-center shadow-2xl border-0 bg-white/80 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Not Found</h1>
            <p className="text-gray-600 mb-6">The form you're looking for doesn't exist or has been deleted.</p>
            <Button onClick={() => navigate('/create')} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-xl"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/create')}
                className="bg-white/80 border-gray-200 hover:bg-white shadow-md"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {formConfig.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Eye className="h-3 w-3 mr-1" />
                    {liveStats.views} views
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {liveStats.submissions} submissions
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Star className="h-3 w-3 mr-1" />
                    {liveStats.satisfaction}/5
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Live Stats Panel */}
              <div className="hidden lg:flex items-center gap-4 bg-white/80 rounded-xl p-3 shadow-md border border-gray-200/50">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Conversion</div>
                  <div className="font-semibold text-green-600">{liveStats.conversionRate}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Avg. Time</div>
                  <div className="font-semibold text-blue-600">{liveStats.avgTime}</div>
                </div>
              </div>

              {/* Device Preview Buttons */}
              <div className="flex items-center gap-1 bg-white/80 rounded-xl p-1 shadow-md border border-gray-200/50">
                <Button
                  size="sm"
                  variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('mobile')}
                  className={previewMode === 'mobile' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('tablet')}
                  className={previewMode === 'tablet' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('desktop')}
                  className={previewMode === 'desktop' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={() => window.open(`/form/${formId}`, '_blank')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Live Form
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Preview Content */}
      <div className="flex-1 p-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`mx-auto transition-all duration-500 ${getPreviewWidth()}`}
        >
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-md">
            <div 
              className="p-8 relative overflow-hidden"
              style={{
                background: formConfig.settings.canvasStyles?.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '600px'
              }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-24 -translate-x-24" />
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative border border-white/20"
                style={{
                  backgroundColor: formConfig.settings.canvasStyles?.formBackgroundColor || '#ffffff',
                  color: formConfig.settings.canvasStyles?.fontColor || '#1a1a1a',
                  fontFamily: formConfig.settings.canvasStyles?.fontFamily || 'Inter',
                  fontSize: `${formConfig.settings.canvasStyles?.fontSize || 16}px`,
                  borderRadius: formConfig.settings.canvasStyles?.borderRadius || '16px'
                }}
              >
                {/* Trust Indicators */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-3 mb-8"
                >
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <Shield className="h-3 w-3 mr-1" />
                    SSL Secured
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    <Users className="h-3 w-3 mr-1" />
                    {liveStats.views}+ Users
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    <Zap className="h-3 w-3 mr-1" />
                    {liveStats.avgTime} to Complete
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    <Star className="h-3 w-3 mr-1" />
                    {liveStats.satisfaction}/5 Rating
                  </Badge>
                </motion.div>

                <div className="mb-8 text-center">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  >
                    {formConfig.name}
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-4 text-sm text-gray-600"
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formConfig.elements.length} fields</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{formConfig.elements.filter(el => el.required).length} required</span>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                    {formConfig.elements.map((element, index) => (
                      <motion.div 
                        key={element.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {renderFormElement(element)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + formConfig.elements.length * 0.1 }}
                  className="mt-8"
                >
                  <Button 
                    className="w-full py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: formConfig.settings.canvasStyles?.primaryColor || '#3b82f6',
                      background: `linear-gradient(135deg, ${formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}, ${formConfig.settings.canvasStyles?.primaryColor || '#3b82f6'}dd)`
                    }}
                  >
                    {formConfig.settings.submitButton?.text || 'Submit Form'}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      →
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FormPreview;
