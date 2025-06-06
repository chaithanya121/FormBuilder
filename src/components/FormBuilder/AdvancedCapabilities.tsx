
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Calculator, Smartphone, Activity, Database, Cloud, Bell, 
  Users, Eye, FileText, BarChart, Settings, Zap, Shield,
  CheckCircle, Star, Sparkles, ArrowRight, Plus
} from 'lucide-react';

interface CapabilityCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  capabilities: Capability[];
}

interface Capability {
  name: string;
  description: string;
  status: 'available' | 'premium' | 'coming-soon';
  icon: React.ComponentType<any>;
  benefits: string[];
}

const capabilityCategories: CapabilityCategory[] = [
  {
    title: 'Smart Calculations',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-400',
    capabilities: [
      {
        name: 'Dynamic Calculations',
        description: 'Real-time calculations for totals, scores, and complex formulas',
        status: 'available',
        icon: Calculator,
        benefits: ['Auto-calculate totals', 'Score evaluation', 'Formula validation']
      },
      {
        name: 'Conditional Logic',
        description: 'Smart form flows based on user responses',
        status: 'available',
        icon: Zap,
        benefits: ['Show/hide fields', 'Dynamic pricing', 'Smart routing']
      }
    ]
  },
  {
    title: 'Mobile Experience',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-400',
    capabilities: [
      {
        name: 'Responsive Design',
        description: 'Optimized layouts for all screen sizes',
        status: 'available',
        icon: Smartphone,
        benefits: ['Touch-friendly', 'Fast loading', 'Offline support']
      },
      {
        name: 'Progressive Web App',
        description: 'Native app-like experience on mobile',
        status: 'premium',
        icon: Activity,
        benefits: ['Install on home screen', 'Push notifications', 'Offline mode']
      }
    ]
  },
  {
    title: 'Data & Storage',
    icon: Database,
    color: 'from-purple-500 to-pink-400',
    capabilities: [
      {
        name: 'Cloud Storage',
        description: 'Integration with Google Drive, Dropbox, and more',
        status: 'available',
        icon: Cloud,
        benefits: ['Auto backup', 'File sync', 'Collaboration']
      },
      {
        name: 'Advanced Database',
        description: 'Search, filter, and organize submissions',
        status: 'available',
        icon: Database,
        benefits: ['Full-text search', 'Custom filters', 'Data export']
      }
    ]
  },
  {
    title: 'Notifications',
    icon: Bell,
    color: 'from-orange-500 to-red-400',
    capabilities: [
      {
        name: 'Smart Notifications',
        description: 'Email/SMS notifications with custom templates',
        status: 'available',
        icon: Bell,
        benefits: ['Custom templates', 'Conditional triggers', 'Multi-channel']
      },
      {
        name: 'Real-time Tracking',
        description: 'Live submission monitoring and alerts',
        status: 'premium',
        icon: Activity,
        benefits: ['Live dashboard', 'Instant alerts', 'Analytics']
      }
    ]
  },
  {
    title: 'Team Collaboration',
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    capabilities: [
      {
        name: 'Team Management',
        description: 'Collaborate with team members on forms',
        status: 'premium',
        icon: Users,
        benefits: ['Role-based access', 'Comments', 'Task assignments']
      },
      {
        name: 'Workflow Automation',
        description: 'Automate business processes based on submissions',
        status: 'coming-soon',
        icon: Settings,
        benefits: ['Auto-routing', 'Approval flows', 'Integration APIs']
      }
    ]
  },
  {
    title: 'Analytics & Reports',
    icon: BarChart,
    color: 'from-teal-500 to-green-400',
    capabilities: [
      {
        name: 'Advanced Analytics',
        description: 'Data visualization and custom reports',
        status: 'available',
        icon: BarChart,
        benefits: ['Visual charts', 'Export reports', 'Trend analysis']
      },
      {
        name: 'Admin Dashboard',
        description: 'Comprehensive monitoring and management',
        status: 'premium',
        icon: Eye,
        benefits: ['Real-time metrics', 'User insights', 'Performance tracking']
      }
    ]
  }
];

const AdvancedCapabilities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'premium': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'coming-soon': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'premium': return 'Premium';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/50 shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Advanced Capabilities</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            FormCraft Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock powerful features for professional form building, data management, and team collaboration
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {capabilityCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden cursor-pointer ${
                  selectedCategory === index 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : ''
                }`}
                onClick={() => setSelectedCategory(index)}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.capabilities.map((capability, capIndex) => (
                        <div key={capability.name} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{capability.name}</span>
                          <Badge className={`text-xs ${getStatusColor(capability.status)}`}>
                            {getStatusText(capability.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Category Details */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${capabilityCategories[selectedCategory].color} flex items-center justify-center`}>
                  {React.createElement(capabilityCategories[selectedCategory].icon, { 
                    className: "h-8 w-8 text-white" 
                  })}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {capabilityCategories[selectedCategory].title}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    Explore the capabilities in this category
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {capabilityCategories[selectedCategory].capabilities.map((capability, index) => {
                  const CapabilityIcon = capability.icon;
                  return (
                    <motion.div
                      key={capability.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <CapabilityIcon className="h-6 w-6 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{capability.name}</h3>
                            <Badge className={`text-xs ${getStatusColor(capability.status)}`}>
                              {getStatusText(capability.status)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{capability.description}</p>
                          
                          <div className="space-y-2">
                            {capability.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDetails(capability.name)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          Learn More
                        </Button>
                        
                        {capability.status === 'available' && (
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            <Plus className="h-4 w-4 mr-1" />
                            Add to Form
                          </Button>
                        )}
                        
                        {capability.status === 'premium' && (
                          <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                            <Star className="h-4 w-4 mr-1" />
                            Upgrade
                          </Button>
                        )}
                        
                        {capability.status === 'coming-soon' && (
                          <Button size="sm" variant="outline" disabled>
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedCapabilities;
