
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Paintbrush, ArrowLeft, Pen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StyleEditor = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <Paintbrush className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Style Editor
              </h1>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Advanced styling and CSS editor
              </p>
            </div>
          </div>
        </motion.div>

        <Card className={`${theme === 'light' 
          ? 'bg-white/90 border-white/50 shadow-xl' 
          : 'bg-gray-800/50 border-gray-700 shadow-2xl'
        } backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pen className="h-5 w-5 text-orange-500" />
              Style Editor Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              This tool provides advanced styling capabilities for your forms. Coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
