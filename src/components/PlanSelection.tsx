
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { plansApi, Plan } from '@/services/api/plans';
import { toast } from 'sonner';

const PlanSelection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPlans = await plansApi.getPlans();
        setPlans(fetchedPlans);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load plans. Please try again later.');
        toast.error('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (planId: string) => {
    navigate('/payment', { state: { selectedPlan: planId, billingPeriod } });
  };

  const formatPrice = (plan: Plan) => {
    const price = billingPeriod === 'monthly' ? plan.price_monthly : plan.price_yearly;
    const period = billingPeriod === 'monthly' ? '/month' : '/year';
    return { price: parseFloat(price), period };
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
        : 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
      } flex items-center justify-center p-4`}>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Loading plans...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
        : 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
      } flex items-center justify-center p-4`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Unable to Load Plans
          </h2>
          <p className={`text-lg mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
            Choose Your Plan
          </h1>
          <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Sign up in less than 30 seconds. Try out 7 days free trial<br />
            Upgrade at anytime, no question, no hassle.
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

        <div className={`grid gap-8 max-w-5xl mx-auto ${
          plans.length === 1 ? 'grid-cols-1 max-w-md' :
          plans.length === 2 ? 'md:grid-cols-2 max-w-4xl' :
          'md:grid-cols-3'
        }`}>
          {plans.map((plan, index) => {
            const { price, period } = formatPrice(plan);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.is_popular && (
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
                      ${price}
                      <span className={`text-lg font-normal ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {period}
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
                      plan.is_popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                        : theme === 'light'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Choose Plan
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
