
import React from 'react';
import PersonalizedDashboard from '@/components/PersonalizedDashboard';
import EnhancedFloatingButtons from '@/components/FloatingActions/EnhancedFloatingButtons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { FileText, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DashboardTabs = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } py-8 px-4 relative overflow-hidden`}>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-10 right-10 w-64 h-64 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-10 left-10 w-80 h-80 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            x: [-10, 10, -10],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/3 right-1/3 w-60 h-60 ${theme === 'light' ? 'bg-emerald-200/15' : 'bg-emerald-500/5'} rounded-full blur-3xl`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Personalized Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <PersonalizedDashboard />
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="forms" className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
              <TabsList className={`${theme === 'light' 
                ? 'bg-white/90 border border-gray-200/50 shadow-xl backdrop-blur-sm' 
                : 'bg-gray-800/70 border border-gray-700/50 backdrop-blur-sm'
              } p-1.5 rounded-2xl`}>
                <TabsTrigger 
                  value="forms" 
                  className={`${theme === 'light'
                    ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900'
                    : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-700 data-[state=active]:text-white text-gray-400 hover:text-white'
                  } px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2`}
                >
                  <FileText className="h-4 w-4" />
                  Forms Library
                  <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">24</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="submissions" 
                  className={`${theme === 'light'
                    ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900'
                    : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-700 data-[state=active]:text-white text-gray-400 hover:text-white'
                  } px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2`}
                >
                  <Database className="h-4 w-4" />
                  Submissions & Analytics
                  <Badge className="ml-2 bg-green-100 text-green-700 text-xs">1.2K</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="forms" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${theme === 'light' 
                  ? 'bg-white/90 border-white/50 shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-2xl'
                } backdrop-blur-sm rounded-2xl border overflow-hidden`}
              >
                <FormList />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="submissions" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${theme === 'light' 
                  ? 'bg-white/90 border-white/50 shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-2xl'
                } backdrop-blur-sm rounded-2xl border overflow-hidden`}
              >
                <Submissions />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Enhanced Floating Action Buttons */}
      <EnhancedFloatingButtons />
    </div>
  );
};

export default DashboardTabs;
