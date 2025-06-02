
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Settings, Palette, Eye, HelpCircle, 
  Code, Play, Wand2, Zap, Plus, ChevronUp, ChevronDown,
  Save, Download, Upload, Sparkles, Target, Activity
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
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/25'
    },
    {
      id: 'configuration' as const,
      label: 'Configuration',
      icon: Settings,
      gradient: 'from-emerald-500 to-emerald-600',
      shadow: 'shadow-emerald-500/25'
    },
    {
      id: 'designer' as const,
      label: 'Designer Studio',
      icon: Palette,
      gradient: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/25'
    }
  ];

  const primaryActions = [
    {
      id: 'save',
      label: 'Save Form',
      icon: Save,
      action: onSave,
      gradient: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/25'
    },
    {
      id: 'preview',
      label: 'Live Preview',
      icon: Eye,
      action: onPreview,
      gradient: 'from-orange-500 to-orange-600',
      shadow: 'shadow-orange-500/25'
    }
  ];

  const secondaryActions = [
    {
      id: 'view-code',
      label: 'View Code',
      icon: Code,
      action: () => onQuickAction('view-code'),
      gradient: 'from-slate-500 to-slate-600',
      shadow: 'shadow-slate-500/25'
    },
    {
      id: 'test-form',
      label: 'Test Form',
      icon: Play,
      action: () => onQuickAction('test-form'),
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/25'
    },
    {
      id: 'ai-enhance',
      label: 'AI Enhancement',
      icon: Sparkles,
      action: () => onQuickAction('ai-enhance'),
      gradient: 'from-pink-500 to-pink-600',
      shadow: 'shadow-pink-500/25'
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      action: onExport,
      gradient: 'from-indigo-500 to-indigo-600',
      shadow: 'shadow-indigo-500/25'
    },
    {
      id: 'import',
      label: 'Import',
      icon: Upload,
      action: onImport,
      gradient: 'from-teal-500 to-teal-600',
      shadow: 'shadow-teal-500/25'
    }
  ];

  const ActionButton = ({ action, index, type = 'secondary' }: any) => {
    const isActive = type === 'panel' && activePanel === action.id;
    
    return (
      <motion.div
        initial={{ x: 100, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 100, opacity: 0, scale: 0.8 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="relative group"
        onMouseEnter={() => setHoveredAction(action.id)}
        onMouseLeave={() => setHoveredAction(null)}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={type === 'panel' ? () => onPanelChange(action.id) : action.action}
          disabled={isLoading}
          className={`
            relative w-14 h-14 rounded-2xl flex items-center justify-center
            bg-gradient-to-br ${action.gradient} text-white
            shadow-lg ${action.shadow} hover:shadow-xl
            transition-all duration-300 transform
            ${isActive ? 'ring-4 ring-white ring-opacity-50 scale-110' : ''}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
            backdrop-blur-sm border border-white/20
          `}
        >
          <action.icon className="h-6 w-6" />
          
          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute inset-0 bg-white bg-opacity-20 rounded-2xl"
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Loading spinner */}
          {isLoading && action.id === 'save' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-white/30 border-t-white rounded-2xl"
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
              className="absolute right-16 top-1/2 transform -translate-y-1/2 z-50"
            >
              <div className="bg-gray-900/95 backdrop-blur-md text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-white/10">
                {action.label}
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
        className="flex flex-col items-center gap-4"
      >
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col items-center gap-4"
            >
              {/* Panel Buttons */}
              <div className="flex flex-col gap-3">
                {panels.map((panel, index) => (
                  <ActionButton key={panel.id} action={panel} index={index} type="panel" />
                ))}
              </div>

              {/* Animated Separator */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"
              />

              {/* Primary Actions */}
              <div className="flex flex-col gap-3">
                {primaryActions.map((action, index) => (
                  <ActionButton key={action.id} action={action} index={panels.length + index} />
                ))}
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-col gap-2">
                {secondaryActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ x: 100, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 100, opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: (panels.length + primaryActions.length + index) * 0.1,
                      type: "spring"
                    }}
                    className="relative group"
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={action.action}
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        bg-gradient-to-br ${action.gradient} text-white
                        shadow-lg ${action.shadow} hover:shadow-xl
                        transition-all duration-300 backdrop-blur-sm
                        border border-white/20
                      `}
                    >
                      <action.icon className="h-5 w-5" />
                    </motion.button>
                    
                    {/* Tooltip for secondary actions */}
                    <AnimatePresence>
                      {hoveredAction === action.id && (
                        <motion.div
                          initial={{ opacity: 0, x: 20, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 20, scale: 0.8 }}
                          className="absolute right-14 top-1/2 transform -translate-y-1/2 z-50"
                        >
                          <div className="bg-gray-900/95 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                            {action.label}
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                              <div className="border-4 border-transparent border-l-gray-900/95"></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Toggle Button */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-violet-500/25"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <Plus className="h-6 w-6" />
            )}
          </motion.div>
        </motion.button>

        {/* Enhanced Pro Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.05 }}
        >
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-orange-500/25 px-3 py-1">
            <Zap className="h-3 w-3 mr-1" />
            B2C Pro
          </Badge>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernFloatingActions;
