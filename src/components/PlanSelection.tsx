
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PlanSelection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingPeriod === 'monthly' ? 19 : 190,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Unleash the power of automation.',
      features: [
        'Multi-step Zap',
        '3 Premium Apps',
        '2 Users Team'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingPeriod === 'monthly' ? 54 : 540,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Automation tools to take your work to the next level.',
      features: [
        'Multi-step Zap',
        'Unlimited Premium',
        '50 Users team',
        'Shared Workspace'
      ],
      popular: true
    },
    {
      id: 'company',
      name: 'Company',
      price: billingPeriod === 'monthly' ? 89 : 890,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Automation plus enterprise-grade features.',
      features: [
        'Multi-step Zaps',
        'Unlimited Premium',
        'Unlimited user Team',
        'Advanced Admin',
        'Custom Data Retention'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    // Navigate to payment with selected plan
    navigate('/payment', { state: { selectedPlan: planId, billingPeriod } });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
    } flex items-center justify-center p-4`}>
      <div className="w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Choose your Plans
          </h1>
          <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Sign up in less than 30 seconds . Try out 7 days free trial<br />
            Upgrade at anytime, no question, no hastle.
          </p>
          
          <div className={`inline-flex rounded-full p-1 ${theme === 'light' 
            ? 'bg-white/80 border border-gray-200' 
            : 'bg-gray-800/50 border border-gray-700'
          } backdrop-blur-sm`}>
            <Button
              variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setBillingPeriod('monthly')}
              className={`rounded-full px-6 py-2 ${billingPeriod === 'monthly' 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
            >
              MONTHLY
            </Button>
            <Button
              variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
              onClick={() => setBillingPeriod('yearly')}
              className={`rounded-full px-6 py-2 ${billingPeriod === 'yearly' 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
            >
              YEARLY
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-gray-200 shadow-xl hover:shadow-2xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-300 hover:scale-105 p-8 h-full flex flex-col`}>
                
                <div className="text-center mb-6">
                  <div className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    ${plan.price}
                    <span className={`text-lg font-normal ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      : theme === 'light'
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Choose plan
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
