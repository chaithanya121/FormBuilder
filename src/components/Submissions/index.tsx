
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormSubmissions } from '@/lib/submission-utils';
import { formsApi, FormData, FormSubmission } from '@/services/api/forms';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';

const Submissions = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load all forms
        const allForms = await formsApi.getAllForms();
        if (Array.isArray(allForms)) {
          setForms(allForms);
          
          // Load submissions for all forms
          const allSubmissions: FormSubmission[] = [];
          for (const form of allForms) {
            if (form.primary_id) {
              const formSubmissions = await getFormSubmissions(form.primary_id);
              allSubmissions.push(...formSubmissions);
            }
          }
          setSubmissions(allSubmissions);
        }
      } catch (error) {
        console.error('Error loading submissions:', error);
        toast({
          title: "Error",
          description: "Failed to load submissions",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  const getFormName = (formId: string) => {
    const form = forms.find(f => f.primary_id === formId);
    return form?.name || 'Unknown Form';
  };

  const totalSubmissions = submissions.length;

  return (
    <div className={`space-y-8 min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 mt-6"
      >
        <h1 className={`text-3xl font-bold tracking-tight mb-3 md:text-4xl lg:text-5xl ${theme === 'light'
          ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
          : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200'
        }`}>
          Form Submissions
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' 
          ? 'text-gray-600' 
          : 'text-blue-100/80'
        }`}>
          View and manage all form submissions
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4"
      >
        <Card className={`${theme === 'light' 
          ? 'bg-white/80 backdrop-blur-sm border-white/20 shadow-xl' 
          : 'bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-lg'
        }`}>
          <CardHeader>
            <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
              Submissions Overview
            </CardTitle>
            <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              Total submissions: {totalSubmissions}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>Loading submissions...</p>
              </div>
            ) : submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={`${submission.formId}-${submission.id}`} className={`${theme === 'light' 
                    ? 'bg-gray-50/80 border-gray-200/50' 
                    : 'bg-gray-700/50 border-gray-600/50'
                  }`}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                          {getFormName(submission.formId)}
                        </h4>
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {submission.submissions || 0} submissions
                        </span>
                      </div>
                      <pre className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} whitespace-pre-wrap`}>
                        {JSON.stringify(submission, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  No submissions found
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Submissions;
