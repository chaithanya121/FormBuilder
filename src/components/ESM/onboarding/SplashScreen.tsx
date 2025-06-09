
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Sparkles, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/platform/esm/onboarding/role-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <Card className="max-w-md w-full mx-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: isLoaded ? 1 : 0, rotate: isLoaded ? 0 : -180 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="h-3 w-3 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">EduSmart</h1>
            <p className="text-lg text-white/80 mb-8">
              Smart Teaching, Smarter Learning
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="text-center">
              <Users className="h-6 w-6 text-blue-300 mx-auto mb-2" />
              <p className="text-xs text-white/60">Collaborative</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-6 w-6 text-green-300 mx-auto mb-2" />
              <p className="text-xs text-white/60">Interactive</p>
            </div>
            <div className="text-center">
              <Sparkles className="h-6 w-6 text-purple-300 mx-auto mb-2" />
              <p className="text-xs text-white/60">AI-Powered</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <Button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Get Started
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SplashScreen;
