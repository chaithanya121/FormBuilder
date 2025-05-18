
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';

const DashboardTabs = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'} text-${theme === 'light' ? 'gray-800' : 'white'}`}>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="forms" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className={`${theme === 'light' ? 'bg-gray-100/70 border border-gray-200/50' : 'bg-gray-800/70 border border-gray-700/50'} p-1`}>
              <TabsTrigger 
                value="forms" 
                className={`data-[state=active]:${theme === 'light' ? 'bg-white' : 'bg-gray-700'} data-[state=active]:text-${theme === 'light' ? 'gray-800' : 'white'} text-gray-400 px-8`}
              >
                Forms
              </TabsTrigger>
              <TabsTrigger 
                value="submissions" 
                className={`data-[state=active]:${theme === 'light' ? 'bg-white' : 'bg-gray-700'} data-[state=active]:text-${theme === 'light' ? 'gray-800' : 'white'} text-gray-400 px-8`}
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
