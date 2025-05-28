
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { FileText, Database } from 'lucide-react';

const DashboardTabs = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } py-8 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${theme === 'light' 
            ? 'from-gray-900 via-blue-800 to-indigo-900' 
            : 'from-white via-blue-200 to-indigo-200'
          } bg-clip-text text-transparent`}>
            Manage Your Forms
          </h1>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            View your forms and submissions in one place
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs defaultValue="forms" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className={`${theme === 'light' 
                ? 'bg-white/80 border border-gray-200/50 shadow-xl backdrop-blur-sm' 
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
                  Forms
                </TabsTrigger>
                <TabsTrigger 
                  value="submissions" 
                  className={`${theme === 'light'
                    ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900'
                    : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-700 data-[state=active]:text-white text-gray-400 hover:text-white'
                  } px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2`}
                >
                  <Database className="h-4 w-4" />
                  Submissions
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="forms" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FormList />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="submissions" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Submissions />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardTabs;
