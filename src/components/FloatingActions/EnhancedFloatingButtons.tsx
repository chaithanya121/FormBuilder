
import React, { useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  MessageCircle, 
  Settings, 
  Download, 
  Share2, 
  Save,
  Eye,
  Wand2,
  Palette,
  Code,
  Lightbulb,
  Rocket,
  Zap,
  X,
  ChevronUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface FloatingAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
  badge?: string;
  shortcut?: string;
}

const EnhancedFloatingButtons = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const primaryActions: FloatingAction[] = [
    {
      id: 'create',
      label: 'Create New',
      icon: Plus,
      color: 'from-blue-500 to-cyan-400',
      action: () => {
        toast({ title: 'Creating new form...', description: 'Redirecting to form builder' });
        console.log('Create new form');
      },
      shortcut: 'Ctrl+N'
    },
    {
      id: 'ai-assist',
      label: 'AI Assistant',
      icon: Wand2,
      color: 'from-purple-500 to-pink-400',
      action: () => {
        toast({ title: 'AI Assistant activated', description: 'How can I help you today?' });
        console.log('AI Assistant');
      },
      badge: 'NEW',
      shortcut: 'Ctrl+A'
    },
    {
      id: 'quick-save',
      label: 'Quick Save',
      icon: Save,
      color: 'from-green-500 to-emerald-400',
      action: () => {
        toast({ title: 'Saved successfully!', description: 'Your changes have been saved' });
        console.log('Quick save');
      },
      shortcut: 'Ctrl+S'
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: Eye,
      color: 'from-orange-500 to-red-400',
      action: () => {
        toast({ title: 'Opening preview...', description: 'Loading form preview' });
        console.log('Preview');
      },
      shortcut: 'Ctrl+P'
    }
  ];

  const secondaryActions: FloatingAction[] = [
    {
      id: 'share',
      label: 'Share',
      icon: Share2,
      color: 'from-indigo-500 to-purple-600',
      action: () => {
        toast({ title: 'Share options', description: 'Choose how to share your form' });
        console.log('Share');
      }
    },
    {
      id: 'download',
      label: 'Download',
      icon: Download,
      color: 'from-teal-500 to-cyan-400',
      action: () => {
        toast({ title: 'Downloading...', description: 'Preparing your files' });
        console.log('Download');
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      action: () => {
        toast({ title: 'Settings', description: 'Opening configuration panel' });
        console.log('Settings');
      }
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: MessageCircle,
      color: 'from-pink-500 to-rose-400',
      action: () => {
        toast({ title: 'Help Center', description: 'Getting help and support options' });
        console.log('Help');
      }
    }
  ];

  const quickTools: FloatingAction[] = [
    {
      id: 'theme',
      label: 'Theme Editor',
      icon: Palette,
      color: 'from-violet-500 to-purple-500',
      action: () => {
        toast({ title: 'Theme Editor', description: 'Customize your workspace theme' });
        console.log('Theme editor');
      }
    },
    {
      id: 'code',
      label: 'View Code',
      icon: Code,
      color: 'from-slate-500 to-gray-600',
      action: () => {
        toast({ title: 'Code View', description: 'Viewing generated code' });
        console.log('View code');
      }
    },
    {
      id: 'insights',
      label: 'Smart Insights',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-400',
      action: () => {
        toast({ title: 'Smart Insights', description: 'Analyzing your form performance' });
        console.log('Smart insights');
      }
    },
    {
      id: 'optimize',
      label: 'Auto Optimize',
      icon: Zap,
      color: 'from-emerald-500 to-teal-400',
      action: () => {
        toast({ title: 'Auto Optimize', description: 'Optimizing your form for better performance' });
        console.log('Auto optimize');
      }
    }
  ];

  const handleActionClick = (action: FloatingAction) => {
    setActiveAction(action.id);
    action.action();
    setTimeout(() => setActiveAction(null), 500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Secondary Actions */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="absolute bottom-20 right-0 space-y-3 mb-4"
            >
              {secondaryActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  variants={itemVariants}
                  style={{ originY: 1, originX: 1 }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleActionClick(action)}
                    className={`
                      h-12 px-4 bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl
                      backdrop-blur-sm border-0 group relative overflow-hidden
                      ${activeAction === action.id ? 'animate-pulse' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <action.icon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{action.label}</span>
                    {action.badge && (
                      <Badge className="ml-2 bg-white/20 text-white text-xs border-0">
                        {action.badge}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Tools */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="absolute bottom-20 right-16 space-y-2"
            >
              {quickTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  style={{ originY: 1, originX: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="icon"
                    onClick={() => handleActionClick(tool)}
                    className={`
                      h-10 w-10 bg-gradient-to-r ${tool.color} text-white shadow-lg hover:shadow-xl
                      rounded-full border-0 relative overflow-hidden group
                      ${activeAction === tool.id ? 'animate-spin' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <tool.icon className="h-4 w-4" />
                  </Button>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className={`
                      absolute right-12 top-1/2 transform -translate-y-1/2
                      ${theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
                      px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none
                      shadow-lg backdrop-blur-sm
                    `}
                  >
                    {tool.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Primary Actions */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="absolute bottom-20 right-0 grid grid-cols-2 gap-2 mb-2"
            >
              {primaryActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleActionClick(action)}
                    className={`
                      h-16 w-16 bg-gradient-to-r ${action.color} text-white shadow-xl hover:shadow-2xl
                      rounded-2xl border-0 flex flex-col items-center justify-center
                      backdrop-blur-sm relative overflow-hidden group transition-all duration-300
                      ${activeAction === action.id ? 'animate-bounce' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {action.badge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                      >
                        !
                      </motion.div>
                    )}
                    
                    <action.icon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium text-center leading-tight">
                      {action.label.split(' ')[0]}
                    </span>
                    
                    {action.shortcut && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute bottom-1 text-xs opacity-70"
                      >
                        {action.shortcut.replace('Ctrl+', '⌘')}
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsExpanded(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
            text-white shadow-2xl hover:shadow-3xl rounded-full border-0
            relative overflow-hidden group transition-all duration-300
          `}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: isExpanded ? 2 : 0, opacity: isExpanded ? 0 : 0.5 }}
            transition={{ duration: 0.6 }}
          />
          
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-8 w-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <Plus className="h-8 w-8" />
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-1"
                >
                  <ChevronUp className="h-4 w-4 opacity-60" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Notification Indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
          >
            3
          </motion.div>
        </Button>
      </motion.div>

      {/* Quick Access Hint */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`
              absolute -top-12 right-0 
              ${theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
              px-3 py-1 rounded-lg text-sm shadow-lg pointer-events-none
              whitespace-nowrap backdrop-blur-sm
            `}
          >
            Quick Actions
            <div className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${theme === 'light' ? 'border-t-gray-900' : 'border-t-white'}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedFloatingButtons;
