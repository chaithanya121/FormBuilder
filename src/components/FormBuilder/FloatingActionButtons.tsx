
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Layers, Settings, Palette, Plus, Minus,
  Sparkles, Code, Play, Eye
} from 'lucide-react';

interface FloatingActionButtonsProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
  onQuickAction: (action: string) => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ 
  activePanel, 
  onPanelChange,
  onQuickAction 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainButtons = [
    {
      id: 'elements',
      label: 'Elements Library',
      icon: Layers,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700'
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: Settings,
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700'
    },
    {
      id: 'designer',
      label: 'Theme Designer',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700'
    }
  ];

  const quickActions = [
    {
      id: 'view-code',
      label: 'View Code',
      icon: Code,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'test-form',
      label: 'Test Form',
      icon: Play,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'ai-enhance',
      label: 'AI Enhance',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: Eye,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <TooltipProvider>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col items-center space-y-4">
          {/* Main Panel Buttons */}
          <div className="flex flex-col space-y-3">
            {mainButtons.map((button, index) => (
              <Tooltip key={button.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => onPanelChange(button.id)}
                      className={`
                        w-14 h-14 rounded-full shadow-lg transition-all duration-300
                        bg-gradient-to-r ${button.color} hover:${button.hoverColor}
                        ${activePanel === button.id ? 'ring-4 ring-white ring-opacity-50 scale-110' : ''}
                      `}
                      size="icon"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button.icon className="h-6 w-6 text-white" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{button.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 }}
            className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"
          />

          {/* Quick Actions Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`
                    w-12 h-12 rounded-full shadow-lg transition-all duration-300
                    bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                  `}
                  size="icon"
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? (
                      <Minus className="h-5 w-5 text-white" />
                    ) : (
                      <Plus className="h-5 w-5 text-white" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isExpanded ? 'Hide Quick Actions' : 'Show Quick Actions'}</p>
            </TooltipContent>
          </Tooltip>

          {/* Quick Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col space-y-2"
              >
                {quickActions.map((action, index) => (
                  <Tooltip key={action.id}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          onClick={() => onQuickAction(action.id)}
                          className={`
                            w-10 h-10 rounded-full shadow-md transition-all duration-200
                            bg-gradient-to-r ${action.color} hover:scale-110
                          `}
                          size="icon"
                        >
                          <action.icon className="h-4 w-4 text-white" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FloatingActionButtons;
