
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';

const DashboardTabs = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="forms" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className={`${theme === 'light' 
              ? 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg' 
              : 'bg-gray-800/70 border border-gray-700/50'
            } p-1`}>
              <TabsTrigger 
                value="forms" 
                className={`data-[state=active]:${theme === 'light' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                  : 'bg-gray-700 text-white'
                } ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} px-8 transition-all duration-200`}
              >
                Forms
              </TabsTrigger>
              <TabsTrigger 
                value="submissions" 
                className={`data-[state=active]:${theme === 'light' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                  : 'bg-gray-700 text-white'
                } ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} px-8 transition-all duration-200`}
              >
                Submissions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="forms" className="mt-0">
            <FormList />
          </TabsContent>
          
          <TabsContent value="submissions" className="mt-0">
            <Submissions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardTabs;
