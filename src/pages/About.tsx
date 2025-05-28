
import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Users, Zap, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const stats = [
    { number: "1M+", label: "Active Users" },
    { number: "50M+", label: "Zaps Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with automation technology."
    },
    {
      icon: Users,
      title: "Community",
      description: "Our success is built on the success of our users and their amazing automations."
    },
    {
      icon: Settings,
      title: "Reliability",
      description: "We provide enterprise-grade reliability that you can count on for your critical workflows."
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
    } py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            About Our Platform
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            We're on a mission to make automation accessible to everyone. Our platform empowers businesses 
            of all sizes to streamline their workflows and focus on what matters most.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className={`${theme === 'light' 
              ? 'bg-white/90 border-gray-200 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm p-6 text-center`}>
              <div className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
                {stat.number}
              </div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {stat.label}
              </div>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`${theme === 'light' 
                ? 'bg-white/90 border-gray-200 shadow-xl hover:shadow-2xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-300 hover:scale-105 p-8 text-center`}>
                <value.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {value.title}
                </h3>
                <p className={`text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-gray-200 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm p-12 max-w-2xl mx-auto`}>
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Join Our Community
            </h2>
            <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Start your automation journey today and join millions of users who trust our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/select-plan')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className={`${theme === 'light' 
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                } px-8 py-3`}
              >
                Contact Us
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
