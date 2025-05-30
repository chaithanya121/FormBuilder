
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  Layout, ArrowLeft, Search, Filter, Eye, Download, 
  Star, Heart, Share2, Copy, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const templates = [
  {
    id: 1,
    title: 'Contact Form',
    category: 'Business',
    description: 'Professional contact form with validation',
    image: '/api/placeholder/300/200',
    downloads: 1234,
    rating: 4.8,
    isPro: false,
    tags: ['contact', 'business', 'professional']
  },
  {
    id: 2,
    title: 'Survey Form',
    category: 'Research',
    description: 'Multi-step survey with analytics',
    image: '/api/placeholder/300/200',
    downloads: 856,
    rating: 4.6,
    isPro: true,
    tags: ['survey', 'research', 'analytics']
  },
  {
    id: 3,
    title: 'Registration Form',
    category: 'Events',
    description: 'Event registration with payment integration',
    image: '/api/placeholder/300/200',
    downloads: 2341,
    rating: 4.9,
    isPro: true,
    tags: ['registration', 'events', 'payment']
  }
];

export const TemplatesGallery = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Business', 'Research', 'Events', 'E-commerce', 'Education'];

  const useTemplate = (template: any) => {
    toast({
      title: "Template Applied",
      description: `${template.title} has been added to your workspace`,
    });
  };

  const previewTemplate = (template: any) => {
    toast({
      title: "Opening Preview",
      description: `Opening preview for ${template.title}`,
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
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
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Layout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Templates Gallery
              </h1>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Professional pre-made form templates
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${theme === 'light' 
                ? 'bg-white/80 border-gray-300' 
                : 'bg-gray-800/50 border-gray-600'
              }`}
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 hover:shadow-2xl' 
                : 'bg-gray-800/50 border-gray-700 hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-300 overflow-hidden group`}>
                <div className="relative">
                  <div className={`h-48 ${theme === 'light' ? 'bg-gradient-to-br from-blue-100 to-indigo-200' : 'bg-gradient-to-br from-gray-700 to-gray-800'} flex items-center justify-center`}>
                    <Layout className="h-16 w-16 text-gray-400" />
                  </div>
                  {template.isPro && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                      PRO
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => previewTemplate(template)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {template.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {template.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {template.downloads.toLocaleString()} downloads
                    </span>
                    <div className="flex gap-1">
                      {template.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => useTemplate(template)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
