
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { FormConfig } from './types';
import {
  Grid, Settings, Palette, Eye, Code, Wand2, 
  Play, Activity, TrendingUp, Sparkles, 
  HelpCircle, Save, Download, Upload,
  Zap, Target, Users, Brain, BarChart3,
  Bell, Database, Cloud, Smartphone,
  MessageSquare, Calculator, Layers,
  FileText, Monitor, PenTool, Star,
  Heart, Award, Flame, ChevronRight
} from 'lucide-react';

interface ToolsPanelProps {
  onToolAction: (action: string) => void;
  onPreview: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onPanelChange: (panel: 'elements' | 'configuration' | 'designer' | 'advanced' | 'logo') => void;
  formConfig: FormConfig;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  onToolAction,
  onPreview,
  onSave,
  onExport,
  onImport,
  onPanelChange
}) => {
  const [selectedPanel, setSelectedPanel] = useState<'elements' | 'configuration' | 'designer' | 'advanced'>('elements');
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const handlePanelChange = (panel: 'elements' | 'configuration' | 'designer' | 'advanced') => {
    setSelectedPanel(panel);
    onPanelChange(panel);
  };

  const formConfigurationTools = [
    {
      id: 'elements',
      label: 'Elements',
      description: 'All Type Form Elements',
      icon: Grid,
      gradient: 'from-emerald-400 via-teal-500 to-green-600',
      action: () => handlePanelChange('elements'),
      isSelected: selectedPanel === 'elements',
      badge: 'Popular'
    },
    {
      id: 'form-designer',
      label: 'Form Designer',
      description: 'Visual styling and theming',
      icon: Palette,
      gradient: 'from-pink-400 via-rose-500 to-red-600',
      action: () => handlePanelChange('designer'),
      isSelected: selectedPanel === 'designer',
      badge: 'New'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      description: 'Connect external services',
      icon: Zap,
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      action: () => onToolAction('integrations'),
      badge: 'Pro'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      description: 'Pro features & automation',
      icon: Settings,
      gradient: 'from-orange-400 via-amber-500 to-yellow-600',
      action: () => handlePanelChange('advanced'),
      isSelected: selectedPanel === 'advanced',
      badge: 'Enterprise'
    }
  ];

  const activeCapabilities = [
    {
      id: 'calculations',
      label: 'Smart Calculations',
      description: 'Auto-calculate totals and dynamic scores',
      icon: Calculator,
      status: 'Active',
      statusColor: 'bg-green-500',
      action: () => onToolAction('calculations')
    },
    {
      id: 'notifications',
      label: 'Real-time Alerts',
      description: 'Instant email/SMS notifications',
      icon: Bell,
      status: 'Active',
      statusColor: 'bg-blue-500',
      action: () => onToolAction('notifications')
    },
    {
      id: 'collaboration',
      label: 'Team Collaboration',
      description: 'Comments, assignments & workflows',
      icon: Users,
      status: 'Active',
      statusColor: 'bg-purple-500',
      action: () => onToolAction('collaboration')
    },
    {
      id: 'cloud-storage',
      label: 'Cloud Integration',
      description: 'Google Drive, Dropbox & more',
      icon: Cloud,
      status: 'Ready',
      statusColor: 'bg-gray-500',
      action: () => onToolAction('cloud-storage')
    }
  ];

  const quickActions = [
    {
      id: 'preview',
      label: 'Live Preview',
      icon: Eye,
      gradient: 'from-blue-500 to-cyan-600',
      action: onPreview
    },
    {
      id: 'save',
      label: 'Save Form',
      icon: Save,
      gradient: 'from-green-500 to-emerald-600',
      action: onSave
    },
    {
      id: 'view-code',
      label: 'Export Code',
      icon: Code,
      gradient: 'from-gray-500 to-slate-600',
      action: () => onToolAction('view-code')
    },
    {
      id: 'ai-enhance',
      label: 'AI Magic',
      icon: Brain,
      gradient: 'from-purple-500 to-violet-600',
      action: () => onToolAction('ai-enhance')
    },
    {
      id: 'test-form',
      label: 'Test & Debug',
      icon: Target,
      gradient: 'from-teal-500 to-cyan-600',
      action: () => onToolAction('test-form')
    },
    {
      id: 'export',
      label: 'Export All',
      icon: Download,
      gradient: 'from-indigo-500 to-purple-600',
      action: onExport
    }
  ];

  const ConfigurationCard = ({ tool }: { tool: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="w-full relative overflow-hidden"
    >
      <Button
        onClick={tool.action}
        variant="ghost"
        className={`w-full h-auto p-0 hover:bg-transparent relative ${
          tool.isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
      >
        <Card className={`w-full border-2 transition-all duration-500 relative overflow-hidden ${
          tool.isSelected 
            ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200' 
            : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
        }`}>
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-5`} />
          
          <CardContent className="p-4 relative">
            <div className="flex items-center gap-3">
              <motion.div 
                className={`p-3 rounded-xl bg-gradient-to-r ${tool.gradient} text-white shadow-lg`}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <tool.icon className="h-5 w-5" />
              </motion.div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm ${
                    tool.isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {tool.label}
                  </h4>
                  {tool.badge && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-0.5 ${
                        tool.badge === 'Popular' ? 'bg-green-100 text-green-700' :
                        tool.badge === 'New' ? 'bg-blue-100 text-blue-700' :
                        tool.badge === 'Pro' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <p className={`text-xs mt-1 ${
                  tool.isSelected ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {tool.description}
                </p>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
                tool.isSelected ? 'text-blue-600 transform rotate-90' : 'text-gray-400'
              }`} />
            </div>
          </CardContent>
          
          {/* Selection Indicator */}
          {tool.isSelected && (
            <motion.div
              layoutId="selectedTool"
              className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"
              transition={{ duration: 0.3 }}
            />
          )}
        </Card>
      </Button>
    </motion.div>
  );

  const CapabilityCard = ({ capability }: { capability: any }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={capability.action}
        variant="ghost"
        className="w-full h-auto p-0 hover:bg-transparent"
      >
        <Card className="w-full border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2.5 bg-gray-100 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <capability.icon className="h-4 w-4 text-gray-700" />
                </motion.div>
                <div className="text-left">
                  <h4 className="font-semibold text-sm text-gray-900">{capability.label}</h4>
                  <p className="text-xs text-gray-600 mt-0.5">{capability.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${capability.statusColor}`} />
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    capability.status === 'Active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {capability.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </Button>
    </motion.div>
  );

  const ActionButton = ({ action }: { action: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHoveredAction(action.id)}
      onHoverEnd={() => setHoveredAction(null)}
    >
      <Button
        onClick={action.action}
        className={`w-full bg-gradient-to-r ${action.gradient} hover:opacity-90 text-white shadow-lg relative overflow-hidden group`}
      >
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        />
        <action.icon className="h-4 w-4 mr-2" />
        <span className="font-medium">{action.label}</span>
        {hoveredAction === action.id && (
          <motion.div
            className="absolute inset-0 bg-white opacity-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Button>
    </motion.div>
  );

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-md border-gray-200/50 shadow-xl">
      {/* Enhanced Header */}
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        <CardTitle className="flex items-center gap-3 relative z-10">
          <motion.div
            className="p-2 bg-white/20 rounded-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Settings className="h-6 w-6" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold">Tools & Actions</h3>
            <p className="text-blue-100 text-sm font-medium">Enhanced form builder suite</p>
          </div>
          <div className="ml-auto flex gap-1">
            <Star className="h-4 w-4 text-yellow-300" />
            <Heart className="h-4 w-4 text-pink-300" />
            <Award className="h-4 w-4 text-orange-300" />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-6 overflow-y-auto space-y-8">
        {/* Form Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Form Configuration</h4>
              <p className="text-sm text-gray-600">Choose your builder mode</p>
            </div>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {formConfigurationTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConfigurationCard tool={tool} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Active Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Enhanced Capabilities</h4>
              <p className="text-sm text-gray-600">Powerful features at your fingertips</p>
            </div>
          </div>
          <div className="space-y-3">
            {activeCapabilities.map((capability, index) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <CapabilityCard capability={capability} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Quick Actions</h4>
              <p className="text-sm text-gray-600">One-click powerful tools</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ActionButton action={action} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-xl border border-blue-200 relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-blue-900 text-lg">Live Statistics</span>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center relative z-10">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold text-blue-900">24+</div>
              <div className="text-xs text-blue-700 font-medium">Active Tools</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold text-purple-900">Real-time</div>
              <div className="text-xs text-purple-700 font-medium">Updates</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold text-pink-900">Pro</div>
              <div className="text-xs text-pink-700 font-medium">Features</div>
            </div>
          </div>
        </motion.div>

        {/* Pro Features Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 rounded-xl text-white relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-200%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            <span className="font-bold text-xl">FormCraft Pro Enhanced</span>
            <Badge className="bg-yellow-400 text-yellow-900 font-bold">PREMIUM</Badge>
          </div>
          <p className="text-purple-100 text-sm relative z-10">
            Experience the full power of AI-enhanced form building with unlimited features and premium support.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ToolsPanel;
