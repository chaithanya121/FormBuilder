
import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Users, Settings, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Multi-step Zaps",
      description: "Create complex automation workflows with multiple steps and conditions",
      benefits: ["Unlimited Premium Apps", "Advanced Logic", "Custom Triggers"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team on automation projects",
      benefits: ["Unlimited Users", "Shared Workspace", "Team Management"]
    },
    {
      icon: Settings,
      title: "Advanced Admin",
      description: "Full administrative control over your automation environment",
      benefits: ["Custom Data Retention", "Advanced Security", "Priority Support"]
    },
    {
      icon: Share2,
      title: "Premium Integration",
      description: "Access to all premium apps and unlimited integrations",
      benefits: ["50+ Premium Apps", "API Access", "Custom Connectors"]
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
            Powerful Features
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Everything you need to automate your workflows and scale your business with advanced features and unlimited possibilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-gray-200 shadow-xl hover:shadow-2xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-300 hover:scale-105 p-8 h-full`}>
                <div className="flex items-center mb-4">
                  <feature.icon className="h-8 w-8 text-purple-600 mr-4" />
                  <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`text-base mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                      <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-gray-200 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm p-12 max-w-2xl mx-auto`}>
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Ready to Get Started?
            </h2>
            <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Choose the perfect plan for your needs and start automating today.
            </p>
            <Button
              onClick={() => navigate('/select-plan')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            >
              View Pricing
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
