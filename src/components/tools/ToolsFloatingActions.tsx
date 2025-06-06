
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Palette, Code, Eye, Save, Share2, Download, 
  Settings, Zap, Activity, Calculator, Bell, Cloud, 
  Database, Smartphone, Accessibility, MessageSquare,
  HelpCircle, Plus, Minus
} from 'lucide-react';

interface ToolsFloatingActionsProps {
  onAction: (action: string) => void;
}

const ToolsFloatingActions: React.FC<ToolsFloatingActionsProps> = ({ onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryActions = [
    { id: 'save', icon: Save, label: 'Save Tool', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'preview', icon: Eye, label: 'Preview', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'share', icon: Share2, label: 'Share Tool', color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const secondaryActions = [
    { id: 'theme-studio', icon: Palette, label: 'Theme Studio', color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'code-export', icon: Code, label: 'Export Code', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { id: 'download', icon: Download, label: 'Download', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'settings', icon: Settings, label: 'Tool Settings', color: 'bg-gray-500 hover:bg-gray-600' },
    { id: 'ai-enhance', icon: Sparkles, label: 'AI Enhance', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'integrations', icon: Zap, label: 'Integrations', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 'analytics', icon: Activity, label: 'Analytics', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { id: 'calculations', icon: Calculator, label: 'Calculations', color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'notifications', icon: Bell, label: 'Notifications', color: 'bg-red-500 hover:bg-red-600' },
    { id: 'cloud-storage', icon: Cloud, label: 'Cloud Storage', color: 'bg-sky-500 hover:bg-sky-600' },
    { id: 'database', icon: Database, label: 'Database', color: 'bg-slate-500 hover:bg-slate-600' },
    { id: 'mobile-preview', icon: Smartphone, label: 'Mobile Preview', color: 'bg-teal-500 hover:bg-teal-600' },
    { id: 'accessibility', icon: Accessibility, label: 'Accessibility', color: 'bg-violet-500 hover:bg-violet-600' },
    { id: 'collaboration', icon: MessageSquare, label: 'Collaboration', color: 'bg-cyan-500 hover:bg-cyan-600' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', color: 'bg-amber-500 hover:bg-amber-600' },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Secondary Actions */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-20 right-0 flex flex-col gap-3 mb-4"
              >
                {secondaryActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 50, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 50, y: 10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => onAction(action.id)}
                          className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12 rounded-full p-0`}
                        >
                          <action.icon className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="bg-gray-900 text-white">
                        {action.label}
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </motion.div>

              {/* Primary Actions */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-20 right-0 flex gap-3 mb-4"
              >
                {primaryActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => onAction(action.id)}
                          className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-4`}
                        >
                          <action.icon className="h-5 w-5 mr-2" />
                          {action.label}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-gray-900 text-white">
                        {action.label}
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded ? <Minus className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 text-white">
              {isExpanded ? 'Hide Tools' : 'Show Tools'}
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default ToolsFloatingActions;
