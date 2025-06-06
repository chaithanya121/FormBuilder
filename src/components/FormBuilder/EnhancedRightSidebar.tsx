
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, Bell, Cloud, Database, Smartphone, 
  Accessibility, MessageSquare, Save, Eye, Settings,
  Grid, Layers, Palette, Zap, BarChart3, TrendingUp,
  Users, Activity, Shield, Target, Lightbulb, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FormConfig } from './types';

interface EnhancedRightSidebarProps {
  formConfig: FormConfig;
  onNavigateToIntegrations: () => void;
  onNavigateToDesigner: () => void;
  onNavigateToAdvanced: () => void;
}

const EnhancedRightSidebar: React.FC<EnhancedRightSidebarProps> = ({
  formConfig,
  onNavigateToIntegrations,
  onNavigateToDesigner,
  onNavigateToAdvanced
}) => {
  const [activeTab, setActiveTab] = useState('capabilities');

  const capabilities = [
    {
      id: 'calculations',
      name: 'Calculations',
      description: 'Auto-calculate totals and scores',
      icon: Calculator,
      color: 'green',
      enabled: formConfig.settings?.calculations?.enabled || false,
      count: formConfig.settings?.calculations?.fields?.length || 0
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Email/SMS alerts on submission',
      icon: Bell,
      color: 'blue',
      enabled: formConfig.settings?.notifications?.enabled || false,
      count: formConfig.settings?.notifications?.rules?.length || 0
    },
    {
      id: 'cloud-storage',
      name: 'Cloud Storage',
      description: 'Google Drive, Dropbox integration',
      icon: Cloud,
      color: 'purple',
      enabled: formConfig.settings?.integrations?.cloudStorage?.length > 0,
      count: formConfig.settings?.integrations?.cloudStorage?.length || 0
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Advanced data storage & search',
      icon: Database,
      color: 'orange',
      enabled: formConfig.settings?.integrations?.database || false,
      count: 0
    },
    {
      id: 'mobile',
      name: 'Mobile',
      description: 'Mobile optimization settings',
      icon: Smartphone,
      color: 'green',
      enabled: formConfig.settings?.mobileLayout?.responsive || false,
      count: formConfig.settings?.mobileLayout?.mobileSpecificElements?.length || 0
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      description: 'WCAG compliance & screen readers',
      icon: Accessibility,
      color: 'blue',
      enabled: formConfig.settings?.accessibility?.wcagCompliant || false,
      count: 0
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      description: 'Comments & team assignments',
      icon: MessageSquare,
      color: 'purple',
      enabled: formConfig.settings?.collaboration?.comments || false,
      count: 0
    }
  ];

  const quickActions = [
    { id: 'save', name: 'Save', icon: Save, color: 'green' },
    { id: 'preview', name: 'Preview', icon: Eye, color: 'blue' }
  ];

  const formStats = {
    elements: formConfig.elements?.length || 0,
    submissions: 0,
    conversionRate: '87%',
    avgCompletionTime: '3.2 min'
  };

  const renderCapabilityCard = (capability: any) => (
    <motion.div
      key={capability.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`cursor-pointer transition-all duration-300 border-2 hover:border-${capability.color}-300 hover:shadow-lg group`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-${capability.color}-50 group-hover:bg-${capability.color}-100 transition-colors relative`}>
              <capability.icon className={`h-5 w-5 text-${capability.color}-600`} />
              {capability.enabled && (
                <CheckCircle className="h-3 w-3 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900">{capability.name}</h4>
                {capability.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {capability.count}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={capability.enabled ? "default" : "secondary"} 
                  className={`text-xs ${capability.enabled ? `bg-${capability.color}-100 text-${capability.color}-700` : ''}`}
                >
                  {capability.enabled ? 'Enabled' : 'Available'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Form Configuration
        </h3>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="capabilities" className="text-xs">
                <Grid className="h-3 w-3 mr-1" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Stats
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <TabsContent value="capabilities" className="mt-4 space-y-3">
              {/* Main Capability Cards */}
              <div className="grid grid-cols-1 gap-3">
                <Card 
                  className="cursor-pointer transition-all duration-300 border-2 hover:border-blue-300 hover:shadow-lg group bg-gradient-to-r from-blue-50 to-purple-50"
                  onClick={onNavigateToDesigner}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                        <Palette className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900">Form Designer</h4>
                        <p className="text-sm text-blue-700">Visual styling and theming</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                 <Card 
                  className="cursor-pointer transition-all duration-300 border-2 hover:border-red-300 hover:shadow-lg group bg-gradient-to-r from-green-50 to-red-50"
                  onClick={onNavigateToDesigner}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100 group-hover:bg-pink-200 transition-colors">
                        <Palette className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900">Elements</h4>
                        <p className="text-sm text-green-700">All Type Form Elements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer transition-all duration-300 border-2 hover:border-purple-300 hover:shadow-lg group bg-gradient-to-r from-purple-50 to-pink-50"
                  onClick={onNavigateToIntegrations}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                        <Zap className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-purple-900">Integrations</h4>
                        <p className="text-sm text-purple-700">Connect external services</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer transition-all duration-300 border-2 hover:border-green-300 hover:shadow-lg group bg-gradient-to-r from-green-50 to-emerald-50"
                  onClick={onNavigateToAdvanced}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                        <Settings className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900">Advanced</h4>
                        <p className="text-sm text-green-700">Pro features & automation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Capability Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Active Capabilities
                </h4>
                {capabilities.map(renderCapabilityCard)}
              </div>

              {/* Quick Actions */}
              {/* <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      className={`flex items-center gap-2 hover:bg-${action.color}-50 hover:border-${action.color}-300`}
                    >
                      <action.icon className={`h-4 w-4 text-${action.color}-600`} />
                      {action.name}
                    </Button>
                  ))}
                </div>
              </div> */}
            </TabsContent>

            <TabsContent value="performance" className="mt-4 space-y-4">
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    Form Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formStats.elements}</div>
                      <div className="text-xs text-blue-700">Elements</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formStats.submissions}</div>
                      <div className="text-xs text-green-700">Submissions</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion Rate:</span>
                      <Badge className="bg-green-100 text-green-700">{formStats.conversionRate}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Completion:</span>
                      <Badge variant="outline">{formStats.avgCompletionTime}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>WCAG Compliance</span>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Encryption</span>
                    <Badge className="bg-green-100 text-green-700">SSL/TLS</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GDPR Ready</span>
                    <Badge className="bg-green-100 text-green-700">Compliant</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedRightSidebar;
