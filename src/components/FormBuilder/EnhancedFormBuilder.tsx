
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Smartphone, Tablet, Monitor, Calculator, Database, 
  Bell, Cloud, Users, Zap, Settings, Activity, Eye,
  FileText, BarChart, Shield, CheckCircle, Star, Plus
} from 'lucide-react';
import MobileOptimization from './MobileOptimization';
import AdvancedCapabilities from './AdvancedCapabilities';
import { FormConfig } from './types';

interface EnhancedFormBuilderProps {
  formConfig: FormConfig;
  onConfigUpdate: (config: FormConfig) => void;
}

const EnhancedFormBuilder: React.FC<EnhancedFormBuilderProps> = ({
  formConfig,
  onConfigUpdate
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [enhancedFeatures, setEnhancedFeatures] = useState({
    calculations: false,
    mobileOptimization: true,
    cloudStorage: false,
    notifications: false,
    analytics: true,
    collaboration: false,
    realTimeTracking: true,
    aiPowered: true
  });

  const devices = [
    { id: 'mobile', name: 'Mobile', icon: Smartphone, usage: '68%', color: 'text-green-600' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, usage: '22%', color: 'text-blue-600' },
    { id: 'desktop', name: 'Desktop', icon: Monitor, usage: '10%', color: 'text-purple-600' }
  ];

  const enhancedStats = [
    { 
      label: 'Mobile Optimization', 
      value: '98%', 
      icon: Smartphone, 
      color: 'text-green-600',
      enabled: enhancedFeatures.mobileOptimization 
    },
    { 
      label: 'Real-time Tracking', 
      value: 'Active', 
      icon: Activity, 
      color: 'text-blue-600',
      enabled: enhancedFeatures.realTimeTracking 
    },
    { 
      label: 'AI Enhancement', 
      value: 'Ready', 
      icon: Zap, 
      color: 'text-purple-600',
      enabled: enhancedFeatures.aiPowered 
    },
    { 
      label: 'Cloud Storage', 
      value: 'Connected', 
      icon: Cloud, 
      color: 'text-orange-600',
      enabled: enhancedFeatures.cloudStorage 
    }
  ];

  const capabilities = [
    {
      name: 'Smart Calculations',
      description: 'Auto-calculate totals, scores, and complex formulas',
      icon: Calculator,
      enabled: enhancedFeatures.calculations,
      status: 'available'
    },
    {
      name: 'Cloud Storage',
      description: 'Google Drive, Dropbox integration',
      icon: Cloud,
      enabled: enhancedFeatures.cloudStorage,
      status: 'premium'
    },
    {
      name: 'Smart Notifications',
      description: 'Email/SMS alerts with custom templates',
      icon: Bell,
      enabled: enhancedFeatures.notifications,
      status: 'available'
    },
    {
      name: 'Team Collaboration',
      description: 'Comments, assignments, and workflows',
      icon: Users,
      enabled: enhancedFeatures.collaboration,
      status: 'premium'
    },
    {
      name: 'Advanced Analytics',
      description: 'Real-time insights and custom reports',
      icon: BarChart,
      enabled: enhancedFeatures.analytics,
      status: 'available'
    },
    {
      name: 'Database Integration',
      description: 'Advanced search and data management',
      icon: Database,
      enabled: true,
      status: 'available'
    }
  ];

  const toggleFeature = (feature: string) => {
    setEnhancedFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enhanced Form Builder
            </h2>
            <p className="text-gray-600">Advanced features for professional forms</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {enhancedStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <StatIcon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-gray-600">{stat.label}</span>
                </div>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                {stat.enabled && (
                  <Badge className="mt-1 bg-green-100 text-green-700 text-xs">Active</Badge>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-xl p-1">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="mobile"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg"
          >
            Mobile
          </TabsTrigger>
          <TabsTrigger 
            value="capabilities"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg"
          >
            Capabilities
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state-active]:to-purple-600 data-[state=active]:text-white rounded-lg"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Device Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Device Usage Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {devices.map((device) => {
                  const DeviceIcon = device.icon;
                  return (
                    <div key={device.id} className="text-center p-4 bg-gray-50 rounded-xl">
                      <DeviceIcon className={`h-8 w-8 mx-auto mb-2 ${device.color}`} />
                      <h3 className="font-medium">{device.name}</h3>
                      <p className={`text-2xl font-bold ${device.color}`}>{device.usage}</p>
                      <p className="text-xs text-gray-500">of your users</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability, index) => {
              const CapabilityIcon = capability.icon;
              return (
                <motion.div
                  key={capability.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CapabilityIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{capability.name}</h3>
                            {capability.enabled && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{capability.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <Badge 
                              className={
                                capability.status === 'available' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-purple-100 text-purple-700'
                              }
                            >
                              {capability.status === 'available' ? 'Available' : 'Premium'}
                            </Badge>
                            
                            {capability.status === 'available' ? (
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                <Plus className="h-3 w-3 mr-1" />
                                Enable
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-7 text-xs border-purple-200 text-purple-600">
                                <Star className="h-3 w-3 mr-1" />
                                Upgrade
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <MobileOptimization 
            formConfig={formConfig}
            onConfigUpdate={onConfigUpdate}
          />
        </TabsContent>

        <TabsContent value="capabilities" className="mt-6">
          <AdvancedCapabilities />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Form Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Submissions</h3>
                  <p className="text-3xl font-bold text-green-600">1,247</p>
                  <p className="text-sm text-green-600">+12% this week</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Views</h3>
                  <p className="text-3xl font-bold text-blue-600">3,891</p>
                  <p className="text-sm text-blue-600">+8% this week</p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Conversion</h3>
                  <p className="text-3xl font-bold text-purple-600">32%</p>
                  <p className="text-sm text-purple-600">+3% this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedFormBuilder;
