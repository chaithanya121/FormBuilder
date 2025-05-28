
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';

const DashboardTabs = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } text-${theme === 'light' ? 'gray-900' : 'white'}`}>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="forms" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className={`${theme === 'light' 
              ? 'bg-white/80 border border-gray-200 shadow-lg' 
              : 'bg-gray-800/70 border border-gray-700/50'
            } p-1 rounded-xl backdrop-blur-sm`}>
              <TabsTrigger 
                value="forms" 
                className={`data-[state=active]:${theme === 'light' 
                  ? 'bg-blue-500 data-[state=active]:text-white' 
                  : 'bg-gray-700 data-[state=active]:text-white'
                } text-${theme === 'light' ? 'gray-600' : 'gray-400'} px-8 py-3 rounded-lg font-medium transition-all duration-200`}
              >
                Forms
              </TabsTrigger>
              <TabsTrigger 
                value="submissions" 
                className={`data-[state=active]:${theme === 'light' 
                  ? 'bg-blue-500 data-[state=active]:text-white' 
                  : 'bg-gray-700 data-[state=active]:text-white'
                } text-${theme === 'light' ? 'gray-600' : 'gray-400'} px-8 py-3 rounded-lg font-medium transition-all duration-200`}
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
