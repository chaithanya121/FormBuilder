
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Grid, Settings, Palette, Eye, Save, Download, Upload,
  Code, Sparkles, HelpCircle, Layers, Activity, Calculator,
  Bell, Cloud, Database, Smartphone, Accessibility, MessageSquare,
  TrendingUp, Users, Brain, Zap, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernFloatingActionsProps {
  activePanel: string;
  onPanelChange: (panel: 'elements' | 'configuration' | 'designer' | 'advanced') => void;
  onQuickAction: (action: string) => void;
  onPreview: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  isLoading?: boolean;
}

const ModernFloatingActions: React.FC<ModernFloatingActionsProps> = ({
  activePanel,
  onPanelChange,
  onQuickAction,
  onPreview,
  onSave,
  onExport,
  onImport,
  isLoading
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const panelButtons = [
    {
      id: 'elements',
      label: 'Elements',
      icon: <Grid className="h-4 w-4" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Drag & drop form elements'
    },
    {
      id: 'configuration',
      label: 'Configure',
      icon: <Settings className="h-4 w-4" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Element properties & settings'
    },
    {
      id: 'designer',
      label: 'Designer',
      icon: <Palette className="h-4 w-4" />,
      color: 'from-pink-500 to-pink-600',
      description: 'Visual design & themes'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: <Zap className="h-4 w-4" />,
      color: 'from-orange-500 to-orange-600',
      description: 'Enhanced capabilities'
    }
  ];

  const quickActions = [
    {
      id: 'view-code',
      label: 'View Code',
      icon: <Code className="h-4 w-4" />,
      color: 'bg-gray-600'
    },
    {
      id: 'ai-enhance',
      label: 'AI Enhance',
      icon: <Brain className="h-4 w-4" />,
      color: 'bg-purple-600'
    },
    {
      id: 'test-form',
      label: 'Test Form',
      icon: <Target className="h-4 w-4" />,
      color: 'bg-green-600'
    },
    {
      id: 'admin-dashboard',
      label: 'Admin',
      icon: <Activity className="h-4 w-4" />,
      color: 'bg-indigo-600'
    },
    {
      id: 'realtime-tracker',
      label: 'Live Tracker',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'bg-orange-600'
    },
    {
      id: 'form-wizard',
      label: 'Wizard',
      icon: <Sparkles className="h-4 w-4" />,
      color: 'bg-pink-600'
    }
  ];

  const enhancedFeatures = [
    {
      id: 'calculations',
      label: 'Calculations',
      icon: <Calculator className="h-3 w-3" />,
      enabled: true
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-3 w-3" />,
      enabled: true
    },
    {
      id: 'cloud-storage',
      label: 'Cloud Storage',
      icon: <Cloud className="h-3 w-3" />,
      enabled: false
    },
    {
      id: 'database',
      label: 'Database',
      icon: <Database className="h-3 w-3" />,
      enabled: false
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: <Smartphone className="h-3 w-3" />,
      enabled: true
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: <Accessibility className="h-3 w-3" />,
      enabled: true
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      icon: <MessageSquare className="h-3 w-3" />,
      enabled: true
    }
  ];

  return (
    <>
      {/* Main Floating Panel */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl">
          <div className="p-3">
            {/* Panel Selector */}
            <div className="flex items-center gap-2 mb-3">
              {panelButtons.map((panel) => (
                <motion.div
                  key={panel.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    variant={activePanel === panel.id ? 'default' : 'outline'}
                    onClick={() => onPanelChange(panel.id as any)}
                    className={`relative ${
                      activePanel === panel.id 
                        ? `bg-gradient-to-r ${panel.color} text-white border-0` 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {panel.icon}
                    <span className="ml-1 hidden md:inline">{panel.label}</span>
                    {activePanel === panel.id && (
                      <motion.div
                        layoutId="activePanel"
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-md"
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Features Status */}
            <div className="flex items-center gap-1 mb-3 overflow-x-auto">
              {enhancedFeatures.map((feature) => (
                <Badge
                  key={feature.id}
                  variant="secondary"
                  className={`text-xs whitespace-nowrap ${
                    feature.enabled 
                      ? 'bg-green-100 text-green-700 border-green-200' 
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}
                >
                  {feature.icon}
                  <span className="ml-1">{feature.label}</span>
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="hover:bg-blue-50"
              >
                <Layers className="h-4 w-4" />
                <span className="ml-1 hidden lg:inline">Quick Actions</span>
              </Button>

              <Button
                size="sm"
                onClick={onSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Save className="h-4 w-4" />
                <span className="ml-1 hidden md:inline">Save</span>
              </Button>

              <Button
                size="sm"
                onClick={onPreview}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Eye className="h-4 w-4" />
                <span className="ml-1 hidden md:inline">Preview</span>
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onQuickAction('help')}
                className="hover:bg-gray-50"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions Panel */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40"
          >
            <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl">
              <div className="p-4">
                <h3 className="font-semibold mb-3 text-center">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2 max-w-sm">
                  {quickActions.map((action) => (
                    <motion.div
                      key={action.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          onQuickAction(action.id);
                          setShowQuickActions(false);
                        }}
                        className="w-full flex flex-col items-center gap-1 h-16 text-xs hover:bg-gray-50"
                      >
                        <div className={`p-1.5 rounded ${action.color} text-white`}>
                          {action.icon}
                        </div>
                        {action.label}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onImport}
                    className="flex-1 text-xs"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Import
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onExport}
                    className="flex-1 text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showQuickActions && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowQuickActions(false)}
        />
      )}
    </>
  );
};

export default ModernFloatingActions;
