
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Bell, Cloud, Database, Smartphone, Users, 
  BarChart, Shield, Zap, Settings, ChevronDown, ChevronRight,
  Plus, Trash2, Edit, Copy, Save, Info, Star, CheckCircle,
  Brain, Eye, Globe, Lock, Palette, Code, Image, Video
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface CapabilityConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  settings: Record<string, any>;
  status: 'available' | 'premium' | 'beta' | 'enterprise';
  color: string;
  category: 'core' | 'advanced' | 'ai' | 'integration';
  usageCount?: number;
  maxUsage?: number;
}

interface EnhancedCapabilitiesPanelProps {
  onConfigUpdate: (config: any) => void;
}

const EnhancedCapabilitiesPanel: React.FC<EnhancedCapabilitiesPanelProps> = ({
  onConfigUpdate
}) => {
  const { toast } = useToast();
  const [expandedCapability, setExpandedCapability] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityConfig | null>(null);

  const [capabilities, setCapabilities] = useState<CapabilityConfig[]>([
    // Core Capabilities
    {
      id: 'calculations',
      name: 'Smart Calculations',
      description: 'Auto-calculate totals, scores, and complex formulas with real-time updates',
      icon: Calculator,
      enabled: true,
      settings: {
        autoCalculate: true,
        precision: 2,
        currency: 'USD',
        formulas: [],
        realTimeUpdate: true,
        allowCustomFormulas: true
      },
      status: 'available',
      color: 'from-blue-500 to-cyan-400',
      category: 'core',
      usageCount: 12,
      maxUsage: 50
    },
    {
      id: 'conditional-logic',
      name: 'Conditional Logic',
      description: 'Show/hide fields based on user responses with advanced branching',
      icon: Eye,
      enabled: true,
      settings: {
        maxConditions: 10,
        allowNestedConditions: true,
        animateTransitions: true
      },
      status: 'available',
      color: 'from-emerald-500 to-green-400',
      category: 'core',
      usageCount: 8,
      maxUsage: 25
    },
    {
      id: 'validation-rules',
      name: 'Advanced Validation',
      description: 'Custom validation rules with real-time feedback and error handling',
      icon: Shield,
      enabled: true,
      settings: {
        customRegex: true,
        realTimeValidation: true,
        customErrorMessages: true,
        fieldDependency: true
      },
      status: 'available',
      color: 'from-red-500 to-pink-400',
      category: 'core',
      usageCount: 15,
      maxUsage: 100
    },

    // Advanced Capabilities
    {
      id: 'notifications',
      name: 'Smart Notifications',
      description: 'Email/SMS alerts with custom templates, conditions, and automation',
      icon: Bell,
      enabled: false,
      settings: {
        emailEnabled: true,
        smsEnabled: false,
        templates: [],
        triggers: [],
        autoResponders: true,
        scheduledNotifications: true,
        webhooks: []
      },
      status: 'available',
      color: 'from-orange-500 to-red-400',
      category: 'advanced',
      usageCount: 5,
      maxUsage: 100
    },
    {
      id: 'cloudStorage',
      name: 'Cloud Storage',
      description: 'Google Drive, Dropbox, OneDrive integration with auto-sync',
      icon: Cloud,
      enabled: false,
      settings: {
        providers: [],
        autoSync: false,
        maxSize: '10MB',
        encryptFiles: true,
        versionControl: true,
        shareLinks: true
      },
      status: 'premium',
      color: 'from-purple-500 to-pink-400',
      category: 'integration',
      usageCount: 3,
      maxUsage: 10
    },
    {
      id: 'database',
      name: 'Advanced Database',
      description: 'Search, filter, export, analytics with real-time synchronization',
      icon: Database,
      enabled: true,
      settings: {
        searchEnabled: true,
        exportFormats: ['CSV', 'JSON', 'PDF', 'Excel'],
        retention: '1 year',
        realTimeSync: true,
        backupFrequency: 'daily',
        encryptData: true
      },
      status: 'available',
      color: 'from-green-500 to-emerald-400',
      category: 'advanced',
      usageCount: 1,
      maxUsage: 5
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      description: 'Real-time dashboards, custom reports, and data visualization',
      icon: BarChart,
      enabled: true,
      settings: {
        realTimeTracking: true,
        customReports: true,
        dataVisualization: true,
        heatmaps: true,
        conversionTracking: true,
        exportReports: true
      },
      status: 'available',
      color: 'from-yellow-500 to-orange-400',
      category: 'advanced',
      usageCount: 4,
      maxUsage: 20
    },

    // AI Capabilities
    {
      id: 'ai-assistant',
      name: 'AI Form Assistant',
      description: 'AI-powered form building suggestions and optimization',
      icon: Brain,
      enabled: false,
      settings: {
        autoSuggestions: true,
        smartValidation: true,
        responseAnalysis: true,
        formOptimization: true
      },
      status: 'beta',
      color: 'from-violet-500 to-purple-400',
      category: 'ai',
      usageCount: 0,
      maxUsage: 50
    },
    {
      id: 'smart-autofill',
      name: 'Smart Autofill',
      description: 'AI-powered field suggestions based on user behavior patterns',
      icon: Zap,
      enabled: false,
      settings: {
        userBehaviorAnalysis: true,
        contextualSuggestions: true,
        learningEnabled: true
      },
      status: 'enterprise',
      color: 'from-indigo-500 to-blue-400',
      category: 'ai',
      usageCount: 0,
      maxUsage: 25
    },

    // Integration Capabilities
    {
      id: 'mobileOptimization',
      name: 'Mobile Optimization',
      description: 'Progressive Web App with offline support and touch optimization',
      icon: Smartphone,
      enabled: true,
      settings: {
        pwaEnabled: true,
        offlineMode: true,
        touchOptimized: true,
        responsiveDesign: true,
        mobileFirstApproach: true
      },
      status: 'available',
      color: 'from-indigo-500 to-blue-400',
      category: 'core',
      usageCount: 24,
      maxUsage: 100
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      description: 'Comments, assignments, workflow automation, and real-time editing',
      icon: Users,
      enabled: false,
      settings: {
        comments: true,
        assignments: false,
        workflow: false,
        roles: [],
        realTimeEditing: true,
        versionHistory: true
      },
      status: 'premium',
      color: 'from-teal-500 to-green-400',
      category: 'advanced',
      usageCount: 6,
      maxUsage: 15
    },
    {
      id: 'api-integrations',
      name: 'API Integrations',
      description: 'Connect with 1000+ apps via webhooks, Zapier, and custom APIs',
      icon: Globe,
      enabled: false,
      settings: {
        webhooks: [],
        zapierEnabled: false,
        customEndpoints: [],
        rateLimiting: true,
        authentication: 'api_key'
      },
      status: 'premium',
      color: 'from-cyan-500 to-blue-400',
      category: 'integration',
      usageCount: 2,
      maxUsage: 10
    },
    {
      id: 'security-advanced',
      name: 'Advanced Security',
      description: 'End-to-end encryption, GDPR compliance, and advanced access controls',
      icon: Lock,
      enabled: true,
      settings: {
        encryption: 'AES-256',
        gdprCompliant: true,
        accessControls: true,
        auditLogs: true,
        dataRetention: '2 years',
        anonymization: true
      },
      status: 'enterprise',
      color: 'from-gray-500 to-slate-400',
      category: 'advanced',
      usageCount: 1,
      maxUsage: 5
    },
    {
      id: 'custom-branding',
      name: 'Custom Branding',
      description: 'White-label forms with custom CSS, themes, and brand elements',
      icon: Palette,
      enabled: false,
      settings: {
        customCSS: true,
        customThemes: [],
        logoUpload: true,
        colorSchemes: [],
        fontCustomization: true,
        removeWatermark: true
      },
      status: 'premium',
      color: 'from-pink-500 to-rose-400',
      category: 'advanced',
      usageCount: 0,
      maxUsage: 10
    },
    {
      id: 'custom-code',
      name: 'Custom Code',
      description: 'Add custom JavaScript, CSS, and HTML for advanced functionality',
      icon: Code,
      enabled: false,
      settings: {
        customJS: true,
        customHTML: true,
        externalLibraries: [],
        sandboxed: true,
        codeValidation: true
      },
      status: 'enterprise',
      color: 'from-slate-500 to-gray-400',
      category: 'advanced',
      usageCount: 0,
      maxUsage: 5
    },
    {
      id: 'media-advanced',
      name: 'Advanced Media',
      description: 'Video backgrounds, image galleries, and multimedia integration',
      icon: Video,
      enabled: false,
      settings: {
        videoBackgrounds: true,
        imageGalleries: true,
        audioSupport: true,
        cloudinaryIntegration: false,
        mediaOptimization: true
      },
      status: 'premium',
      color: 'from-purple-500 to-indigo-400',
      category: 'advanced',
      usageCount: 0,
      maxUsage: 15
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Capabilities', count: capabilities.length },
    { id: 'core', name: 'Core Features', count: capabilities.filter(c => c.category === 'core').length },
    { id: 'advanced', name: 'Advanced', count: capabilities.filter(c => c.category === 'advanced').length },
    { id: 'ai', name: 'AI Powered', count: capabilities.filter(c => c.category === 'ai').length },
    { id: 'integration', name: 'Integrations', count: capabilities.filter(c => c.category === 'integration').length }
  ];

  const filteredCapabilities = activeCategory === 'all' 
    ? capabilities 
    : capabilities.filter(cap => cap.category === activeCategory);

  const toggleCapability = (id: string) => {
    setCapabilities(prev => prev.map(cap => {
      if (cap.id === id) {
        const newEnabled = !cap.enabled;
        toast({
          title: newEnabled ? "Capability Enabled" : "Capability Disabled",
          description: `${cap.name} has been ${newEnabled ? 'enabled' : 'disabled'}.`,
        });
        return { ...cap, enabled: newEnabled };
      }
      return cap;
    }));
  };

  const updateCapabilitySetting = (capabilityId: string, setting: string, value: any) => {
    setCapabilities(prev => prev.map(cap => 
      cap.id === capabilityId 
        ? { 
            ...cap, 
            settings: { ...cap.settings, [setting]: value }
          } 
        : cap
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'premium': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'beta': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'enterprise': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const openConfiguration = (capability: CapabilityConfig) => {
    setSelectedCapability(capability);
    setConfigDialogOpen(true);
  };

  const saveConfiguration = () => {
    if (selectedCapability) {
      toast({
        title: "Configuration Saved",
        description: `Settings for ${selectedCapability.name} have been saved.`,
      });
      setConfigDialogOpen(false);
      onConfigUpdate(capabilities);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enhanced Capabilities
          </h2>
          <p className="text-gray-600 text-sm">Configure advanced features and integrations for your forms</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-purple-100 text-purple-700">
            {capabilities.filter(cap => cap.enabled).length} Active
          </Badge>
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Bulk Configure
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className={activeCategory === category.id ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredCapabilities.map((capability, index) => {
          const CapabilityIcon = capability.icon;
          const isExpanded = expandedCapability === capability.id;
          const usagePercentage = capability.usageCount && capability.maxUsage 
            ? (capability.usageCount / capability.maxUsage) * 100 
            : 0;
          
          return (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`transition-all duration-300 ${
                capability.enabled 
                  ? 'bg-white border-blue-200 shadow-lg' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center shadow-lg ${
                        !capability.enabled ? 'opacity-50' : ''
                      }`}>
                        <CapabilityIcon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${capability.enabled ? 'text-gray-900' : 'text-gray-600'}`}>
                            {capability.name}
                          </h3>
                          <Badge className={getStatusColor(capability.status)}>
                            {capability.status}
                          </Badge>
                          {capability.enabled && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${capability.enabled ? 'text-gray-600' : 'text-gray-500'}`}>
                          {capability.description}
                        </p>
                        
                        {/* Usage Bar */}
                        {capability.usageCount !== undefined && capability.maxUsage && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Usage: {capability.usageCount}/{capability.maxUsage}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-20">
                              <div 
                                className={`h-1.5 rounded-full bg-gradient-to-r ${capability.color}`}
                                style={{ width: `${usagePercentage}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {capability.enabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openConfiguration(capability)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Switch
                        checked={capability.enabled}
                        onCheckedChange={() => toggleCapability(capability.id)}
                        disabled={capability.status === 'premium' || capability.status === 'enterprise'}
                      />
                      
                      {capability.enabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedCapability(isExpanded ? null : capability.id)}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      
                      {(capability.status === 'premium' || capability.status === 'enterprise') && (
                        <Button variant="outline" size="sm" className="border-purple-200 text-purple-600">
                          <Star className="h-4 w-4 mr-1" />
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && capability.enabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100 pt-4 mt-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(capability.settings).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              {typeof value === 'boolean' ? (
                                <Switch
                                  checked={value}
                                  onCheckedChange={(checked) => 
                                    updateCapabilitySetting(capability.id, key, checked)
                                  }
                                />
                              ) : (
                                <span className="text-sm text-gray-600">{String(value)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-4 mt-4 border-t border-gray-100">
                          <Button size="sm" onClick={() => openConfiguration(capability)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Advanced Settings
                          </Button>
                          <Button size="sm" variant="outline">
                            <Info className="h-4 w-4 mr-2" />
                            Learn More
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCapability?.icon && <selectedCapability.icon className="h-5 w-5" />}
              Configure {selectedCapability?.name}
            </DialogTitle>
            <DialogDescription>
              Customize the settings for this capability to match your needs
            </DialogDescription>
          </DialogHeader>
          
          {selectedCapability && (
            <div className="space-y-6">
              {Object.entries(selectedCapability.settings).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {typeof value === 'boolean' ? (
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        updateCapabilitySetting(selectedCapability.id, key, checked)
                      }
                    />
                  ) : typeof value === 'number' ? (
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => 
                        updateCapabilitySetting(selectedCapability.id, key, Number(e.target.value))
                      }
                    />
                  ) : Array.isArray(value) ? (
                    <div className="text-sm text-gray-600">
                      {value.length > 0 ? value.join(', ') : 'No items configured'}
                    </div>
                  ) : (
                    <Input
                      value={String(value)}
                      onChange={(e) => 
                        updateCapabilitySetting(selectedCapability.id, key, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
              
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveConfiguration}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock All Premium Features</h3>
          <p className="text-gray-600 mb-4">
            Get access to advanced AI capabilities, enterprise security, unlimited integrations, and priority support
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Star className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
            <Button variant="outline">
              <Info className="h-4 w-4 mr-2" />
              Compare Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCapabilitiesPanel;
