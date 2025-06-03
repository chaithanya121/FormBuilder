
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Settings, Palette, Eye, HelpCircle, 
  Code, Play, Wand2, Zap, Plus, ChevronUp, ChevronDown,
  Save, Download, Upload, Sparkles, Target, Activity,
  Grid, Compass, Lightbulb, Rocket
} from 'lucide-react';

interface ModernFloatingActionsProps {
  activePanel: 'elements' | 'configuration' | 'designer';
  onPanelChange: (panel: 'elements' | 'configuration' | 'designer') => void;
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
  isLoading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const panels = [
    {
      id: 'elements' as const,
      label: 'Elements Library',
      icon: Layers,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      shadow: 'shadow-blue-500/30',
      description: 'Drag & drop form elements'
    },
    {
      id: 'configuration' as const,
      label: 'Configuration',
      icon: Settings,
      gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      shadow: 'shadow-emerald-500/30',
      description: 'Configure form settings'
    },
    {
      id: 'designer' as const,
      label: 'Designer Studio',
      icon: Palette,
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      shadow: 'shadow-purple-500/30',
      description: 'Customize form appearance'
    }
  ];

  const primaryActions = [
    {
      id: 'save',
      label: 'Save Form',
      icon: Save,
      action: onSave,
      gradient: 'from-green-500 via-green-600 to-emerald-600',
      shadow: 'shadow-green-500/30',
      description: 'Save your progress'
    },
    {
      id: 'preview',
      label: 'Live Preview',
      icon: Eye,
      action: onPreview,
      gradient: 'from-orange-500 via-orange-600 to-red-600',
      shadow: 'shadow-orange-500/30',
      description: 'Preview your form'
    }
  ];

  const secondaryActions = [
    {
      id: 'view-code',
      label: 'View Code',
      icon: Code,
      action: () => onQuickAction('view-code'),
      gradient: 'from-slate-500 via-slate-600 to-gray-600',
      shadow: 'shadow-slate-500/30'
    },
    {
      id: 'test-form',
      label: 'Test Form',
      icon: Play,
      action: () => onQuickAction('test-form'),
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      shadow: 'shadow-blue-500/30'
    },
    {
      id: 'ai-enhance',
      label: 'AI Enhancement',
      icon: Sparkles,
      action: () => onQuickAction('ai-enhance'),
      gradient: 'from-pink-500 via-rose-600 to-purple-600',
      shadow: 'shadow-pink-500/30'
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      action: onExport,
      gradient: 'from-indigo-500 via-indigo-600 to-purple-600',
      shadow: 'shadow-indigo-500/30'
    },
    {
      id: 'import',
      label: 'Import',
      icon: Upload,
      action: onImport,
      gradient: 'from-teal-500 via-teal-600 to-cyan-600',
      shadow: 'shadow-teal-500/30'
    }
  ];

  const ActionButton = ({ action, index, type = 'secondary', size = 'large' }: any) => {
    const isActive = type === 'panel' && activePanel === action.id;
    const buttonSize = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';
    const iconSize = size === 'large' ? 'h-6 w-6' : 'h-5 w-5';
    
    return (
      <motion.div
        initial={{ x: 100, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 100, opacity: 0, scale: 0.8 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.08,
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
        className="relative group"
        onMouseEnter={() => setHoveredAction(action.id)}
        onMouseLeave={() => setHoveredAction(null)}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: isActive ? 0 : 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={type === 'panel' ? () => onPanelChange(action.id) : action.action}
          disabled={isLoading}
          className={`
            relative ${buttonSize} rounded-2xl flex items-center justify-center
            bg-gradient-to-br ${action.gradient} text-white
            shadow-xl ${action.shadow} hover:shadow-2xl
            transition-all duration-300 transform
            ${isActive ? 'ring-4 ring-white/40 scale-110 shadow-2xl' : ''}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
            backdrop-blur-sm border border-white/20
            overflow-hidden group
          `}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={false}
            animate={{ 
              scale: isActive ? [1, 1.2, 1] : 1,
              opacity: isActive ? [0.1, 0.3, 0.1] : 0.1
            }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          />
          
          {/* Hover ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            animate={isLoading && action.id === 'save' ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isLoading && action.id === 'save' ? Infinity : 0, ease: "linear" }}
          >
            <action.icon className={iconSize} />
          </motion.div>
          
          {/* Active indicator pulse */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-white/50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Loading spinner overlay */}
          {isLoading && action.id === 'save' && (
            <motion.div
              className="absolute inset-0 border-2 border-white/30 border-t-white rounded-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.button>
        
        {/* Enhanced Tooltip */}
        <AnimatePresence>
          {hoveredAction === action.id && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 z-50"
            >
              <div className="bg-gray-900/95 backdrop-blur-md text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-white/10 max-w-xs">
                <div className="font-medium">{action.label}</div>
                {action.description && (
                  <div className="text-xs text-gray-300 mt-1">{action.description}</div>
                )}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                  <div className="border-8 border-transparent border-l-gray-900/95"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-5"
      >
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col items-center gap-5"
            >
              {/* Panel Navigation Section */}
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-300 to-transparent mx-auto mb-3" />
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1">
                    <Grid className="h-3 w-3 mr-1" />
                    Panels
                  </Badge>
                </motion.div>
                
                {panels.map((panel, index) => (
                  <ActionButton key={panel.id} action={panel} index={index} type="panel" />
                ))}
              </div>

              {/* Animated Separator */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-0.5 h-6 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 rounded-full" />
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Actions
                </Badge>
              </motion.div>

              {/* Primary Actions */}
              <div className="flex flex-col gap-4">
                {primaryActions.map((action, index) => (
                  <ActionButton key={action.id} action={action} index={panels.length + index} />
                ))}
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-2"
                >
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs px-2 py-1">
                    <Compass className="h-3 w-3 mr-1" />
                    Tools
                  </Badge>
                </motion.div>
                
                {secondaryActions.map((action, index) => (
                  <ActionButton 
                    key={action.id} 
                    action={action} 
                    index={panels.length + primaryActions.length + index}
                    size="small"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Toggle Button */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-violet-500/30 relative overflow-hidden group"
        >
          {/* Background animation */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {isExpanded ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <Rocket className="h-6 w-6" />
            )}
          </motion.div>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Enhanced Status Indicators */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex flex-col items-center gap-2"
        >
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-orange-500/25 px-3 py-1">
            <Zap className="h-3 w-3 mr-1" />
            B2C Pro
          </Badge>
          
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-600 font-medium">Online</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernFloatingActions;
