
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Target, 
  ShoppingCart, 
  Eye, 
  MousePointer,
  Calendar,
  Activity,
  Zap,
  DollarSign,
  ArrowUpRight,
  Star,
  ThumbsUp
} from 'lucide-react';
import { FormConfig } from './types';

interface B2CInsightsProps {
  formConfig: FormConfig;
  className?: string;
}

const B2CInsights: React.FC<B2CInsightsProps> = ({ formConfig, className }) => {
  // B2C specific metrics and insights
  const b2cMetrics = {
    conversionRate: 87,
    customerSatisfaction: 4.8,
    averageCompletionTime: 2.3,
    mobileUsers: 72,
    returnUsers: 45,
    leadQuality: 85,
    engagementScore: 93,
    abandonment: 13
  };

  const b2cInsights = [
    {
      title: "Customer Journey",
      description: "Optimize for mobile-first experience",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      metric: `${b2cMetrics.mobileUsers}%`,
      trend: "up"
    },
    {
      title: "Conversion Rate",
      description: "Above industry average",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-50",
      metric: `${b2cMetrics.conversionRate}%`,
      trend: "up"
    },
    {
      title: "Customer Satisfaction",
      description: "Excellent user feedback",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      metric: `${b2cMetrics.customerSatisfaction}/5`,
      trend: "up"
    },
    {
      title: "Lead Quality",
      description: "High-intent prospects",
      icon: ThumbsUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      metric: `${b2cMetrics.leadQuality}%`,
      trend: "up"
    }
  ];

  const b2cRecommendations = [
    "Add social proof elements to increase trust",
    "Implement progressive disclosure for complex forms",
    "Use micro-animations for better engagement",
    "Add exit-intent popup for abandonment recovery",
    "Include customer testimonials or reviews"
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* B2C Performance Dashboard */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-blue-900">B2C Performance</h3>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Live</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {b2cInsights.map((insight, index) => (
            <div key={index} className={`p-3 rounded-lg ${insight.bgColor} border border-opacity-20`}>
              <div className="flex items-center justify-between mb-2">
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">{insight.metric}</span>
                  {insight.trend === 'up' && (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  )}
                </div>
              </div>
              <h4 className="font-medium text-sm text-gray-800">{insight.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Customer Behavior Analytics */}
      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-500 rounded-lg">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-green-900">Customer Behavior</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <Eye className="h-3 w-3" />
              Avg. Completion Time:
            </span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {b2cMetrics.averageCompletionTime} min
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <MousePointer className="h-3 w-3" />
              Return Visitors:
            </span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {b2cMetrics.returnUsers}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Engagement Score:
            </span>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {b2cMetrics.engagementScore}/100
            </Badge>
          </div>
        </div>
      </Card>

      {/* B2C Optimization Tips */}
      <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-orange-900">B2C Optimization</h3>
        </div>
        
        <div className="space-y-2">
          {b2cRecommendations.slice(0, 3).map((tip, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-gray-700">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
              <span>{tip}</span>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-3 text-orange-700 border-orange-200 hover:bg-orange-50">
            View All Recommendations
          </Button>
        </div>
      </Card>

      {/* Revenue Impact */}
      <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-500 rounded-lg">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-purple-900">Revenue Impact</h3>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700 mb-1">+23%</div>
          <div className="text-xs text-gray-600 mb-3">Projected conversion increase</div>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            Est. $2,340/month additional revenue
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default B2CInsights;
