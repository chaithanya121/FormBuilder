
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    // Auto redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-green-900 to-blue-900'
    } flex items-center justify-center p-4`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <Card className={`${theme === 'light' 
          ? 'bg-white/90 border-gray-200 shadow-2xl' 
          : 'bg-gray-800/50 border-gray-700 shadow-2xl'
        } backdrop-blur-sm p-12 text-center max-w-md`}>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
          >
            Thank you for your subscription! Your account has been activated and you can now access all premium features.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Go to Dashboard
            </Button>
            
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Redirecting automatically in 5 seconds...
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
