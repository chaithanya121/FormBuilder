
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { 
  Smartphone, Tablet, Monitor, Zap, Eye, Settings,
  Layout, Type, Hand, Wifi, Battery
} from 'lucide-react';
import { FormConfig } from './types';

interface MobileOptimizationProps {
  formConfig: FormConfig;
  onConfigUpdate: (config: FormConfig) => void;
}

const MobileOptimization: React.FC<MobileOptimizationProps> = ({
  formConfig,
  onConfigUpdate
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [optimizations, setOptimizations] = useState({
    touchFriendly: true,
    autoZoom: true,
    offlineMode: false,
    progressiveForms: true,
    gestureNavigation: true,
    voiceInput: false,
    adaptiveKeyboard: true,
    batteryOptimization: true
  });

  const devices = [
    { id: 'mobile', name: 'Mobile', icon: Smartphone, width: '375px', users: '68%' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, width: '768px', users: '22%' },
    { id: 'desktop', name: 'Desktop', icon: Monitor, width: '1200px', users: '10%' }
  ];

  const mobileFeatures = [
    {
      title: 'Touch-Friendly Interface',
      description: 'Optimized button sizes and touch targets',
      icon: Hand,
      enabled: optimizations.touchFriendly,
      key: 'touchFriendly'
    },
    {
      title: 'Auto-Zoom Prevention',
      description: 'Prevents unwanted zooming on input focus',
      icon: Eye,
      enabled: optimizations.autoZoom,
      key: 'autoZoom'
    },
    {
      title: 'Offline Mode',
      description: 'Form works without internet connection',
      icon: Wifi,
      enabled: optimizations.offlineMode,
      key: 'offlineMode'
    },
    {
      title: 'Progressive Forms',
      description: 'Step-by-step form completion',
      icon: Layout,
      enabled: optimizations.progressiveForms,
      key: 'progressiveForms'
    },
    {
      title: 'Gesture Navigation',
      description: 'Swipe gestures for form navigation',
      icon: Hand,
      enabled: optimizations.gestureNavigation,
      key: 'gestureNavigation'
    },
    {
      title: 'Battery Optimization',
      description: 'Reduced animations for battery saving',
      icon: Battery,
      enabled: optimizations.batteryOptimization,
      key: 'batteryOptimization'
    }
  ];

  const toggleOptimization = (key: string) => {
    setOptimizations(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const getDevicePreview = () => {
    const device = devices.find(d => d.id === selectedDevice);
    if (!device) return null;

    const DeviceIcon = device.icon;
    
    return (
      <div className="flex justify-center">
        <motion.div
          key={selectedDevice}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
          style={{ width: device.width, maxWidth: '100%' }}
        >
          <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-xl overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <DeviceIcon className="h-4 w-4" />
                <span className="font-medium text-sm">{device.name} Preview</span>
                <Badge variant="outline" className="text-xs">{device.users} users</Badge>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-96">
              <h3 className="font-semibold">Sample Form Preview</h3>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full p-3 border rounded-lg ${
                      optimizations.touchFriendly ? 'h-12' : 'h-10'
                    }`}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full p-3 border rounded-lg ${
                      optimizations.touchFriendly ? 'h-12' : 'h-10'
                    }`}
                  />
                </div>
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full p-3 border rounded-lg resize-none"
                />
                <button className={`w-full bg-blue-500 text-white rounded-lg font-medium ${
                  optimizations.touchFriendly ? 'h-12' : 'h-10'
                }`}>
                  Submit Form
                </button>
              </div>
              
              {optimizations.progressiveForms && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Step 1 of 3</span>
                    <span className="text-sm text-gray-600">33%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Device Preview</TabsTrigger>
              <TabsTrigger value="features">Mobile Features</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              {/* Device Selector */}
              <div className="flex justify-center">
                <div className="flex rounded-xl bg-gray-100 p-1">
                  {devices.map((device) => {
                    const DeviceIcon = device.icon;
                    return (
                      <Button
                        key={device.id}
                        variant={selectedDevice === device.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedDevice(device.id as any)}
                        className={`${selectedDevice === device.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : ''
                        } rounded-lg flex items-center gap-2`}
                      >
                        <DeviceIcon className="h-4 w-4" />
                        {device.name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Device Preview */}
              {getDevicePreview()}
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mobileFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={feature.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FeatureIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => toggleOptimization(feature.key)}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Load Time</h3>
                    <p className="text-2xl font-bold text-green-600">1.2s</p>
                    <p className="text-xs text-gray-500">Mobile optimized</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Battery className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Battery Usage</h3>
                    <p className="text-2xl font-bold text-blue-600">Low</p>
                    <p className="text-xs text-gray-500">Optimized animations</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Settings className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Accessibility</h3>
                    <p className="text-2xl font-bold text-purple-600">AAA</p>
                    <p className="text-xs text-gray-500">WCAG compliant</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileOptimization;
