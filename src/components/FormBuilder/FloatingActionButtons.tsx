
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Settings, Palette, Eye, HelpCircle, 
  Code, Play, Wand2, Zap, X, Plus, ChevronUp, ChevronDown
} from 'lucide-react';

interface FloatingActionButtonsProps {
  activePanel: 'elements' | 'configuration' | 'designer';
  onPanelChange: (panel: 'elements' | 'configuration' | 'designer') => void;
  onQuickAction: (action: string) => void;
  onPreview: () => void;
  onThemeStudio: () => void;
  onDesigner: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  activePanel,
  onPanelChange,
  onQuickAction,
  onPreview,
  onThemeStudio,
  onDesigner
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const panels = [
    {
      id: 'elements' as const,
      label: 'Elements',
      icon: Layers,
      color: '#3b82f6'
    },
    {
      id: 'configuration' as const,
      label: 'Config',
      icon: Settings,
      color: '#10b981'
    },
    {
      id: 'designer' as const,
      label: 'Designer',
      icon: Palette,
      color: '#8b5cf6'
    }
  ];

  const quickActions = [
    {
      id: 'preview',
      label: 'Preview',
      icon: Eye,
      action: onPreview,
      color: '#f59e0b'
    },
    {
      id: 'view-code',
      label: 'Code',
      icon: Code,
      action: () => onQuickAction('view-code'),
      color: '#64748b'
    },
    {
      id: 'test-form',
      label: 'Test',
      icon: Play,
      action: () => onQuickAction('test-form'),
      color: '#059669'
    },
    {
      id: 'ai-enhance',
      label: 'AI Enhance',
      icon: Wand2,
      action: () => onQuickAction('ai-enhance'),
      color: '#dc2626'
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      action: () => onQuickAction('help'),
      color: '#7c3aed'
    }
  ];

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Panel Buttons */}
              {panels.map((panel, index) => {
                const isActive = activePanel === panel.id;
                return (
                  <motion.div
                    key={panel.id}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onPanelChange(panel.id)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isActive 
                          ? 'shadow-xl ring-4 ring-white ring-opacity-50' 
                          : 'hover:shadow-xl'
                      }`}
                      style={{ 
                        backgroundColor: panel.color,
                        color: 'white'
                      }}
                    >
                      <panel.icon className="h-6 w-6" />
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-white bg-opacity-20 rounded-full"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                    
                    {/* Tooltip */}
                    <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                        {panel.label}
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Separator */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                className="w-0.5 h-6 bg-gray-300"
              />

              {/* Quick Action Buttons */}
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3, delay: (panels.length + index) * 0.1 }}
                  className="relative group"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ 
                      backgroundColor: action.color,
                      color: 'white'
                    }}
                  >
                    <action.icon className="h-5 w-5" />
                  </motion.button>
                  
                  {/* Tooltip */}
                  <div className="absolute right-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                      {action.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Fixed Bottom Section - Always Visible */}
      <div className="flex flex-col items-center gap-3 mt-4">
        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </motion.button>

        {/* Pro Badge - Always Visible */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
            <Zap className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingActionButtons;
