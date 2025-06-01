import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Share2, 
  Download, 
  Trash2,
  ArrowLeft,
  BarChart3,
  Users,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  MousePointer,
  CheckCircle,
  Grid,
  List,
  Zap,
  Copy,
  Settings,
  Play,
  Pause,
  ExternalLink,
  BookOpen,
  Sparkles,
  FileText,
  Award,
  Target,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/store';
import { fetchResumes, createResume, deleteResume } from '@/store/slices/resumeSlice';

const ResumePage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { resumes, loading, error } = useSelector((state: RootState) => state.resumes);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  const handleCreateResume = async () => {
    try {
      const newResume = await dispatch(createResume({
        name: 'My Resume',
        template: 'modern',
        status: 'draft',
        content: {
          personalInfo: {
            name: '',
            email: '',
            phone: '',
            location: '',
            summary: ''
          },
          experience: [],
          education: [],
          skills: []
        }
      })).unwrap();
      
      navigate(`/resume-builder/${newResume.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await dispatch(deleteResume(resumeId)).unwrap();
      } catch (error) {
        console.error('Failed to delete resume:', error);
      }
    }
  };

  const handleDuplicateResume = async (resume: any) => {
    try {
      const duplicatedResume = await dispatch(createResume({
        name: `${resume.name} (Copy)`,
        template: resume.template,
        status: 'draft',
        content: resume.content
      })).unwrap();
      
      console.log('Resume duplicated successfully');
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
  };

  const handlePreviewResume = (resumeId: string) => {
    window.open(`/resume-preview/${resumeId}`, '_blank');
  };

  const handleDownloadResume = (resumeId: string) => {
    console.log('Downloading resume:', resumeId);
    // This would trigger a PDF download
  };

  const handleShareResume = (resumeId: string) => {
    const shareUrl = `${window.location.origin}/resume-preview/${resumeId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Share URL copied to clipboard');
  };

  const handleCreateFromTemplate = (templateId: number) => {
    console.log('Creating resume from template:', templateId);
    handleCreateResume();
  };

  const stats = [
    {
      title: 'Total Resumes',
      value: resumes.length.toString(),
      change: '+12%',
      icon: Briefcase,
      color: 'from-emerald-500 to-green-400',
      bgColor: theme === 'light' ? 'from-emerald-50 to-green-50' : 'from-emerald-900/20 to-green-900/20'
    },
    {
      title: 'Downloads',
      value: '1,247',
      change: '+28%',
      icon: Download,
      color: 'from-blue-500 to-cyan-400',
      bgColor: theme === 'light' ? 'from-blue-50 to-cyan-50' : 'from-blue-900/20 to-cyan-900/20'
    },
    {
      title: 'Job Applications',
      value: '89',
      change: '+15%',
      icon: Target,
      color: 'from-purple-500 to-pink-400',
      bgColor: theme === 'light' ? 'from-purple-50 to-pink-50' : 'from-purple-900/20 to-pink-900/20'
    },
    {
      title: 'Success Rate',
      value: '67%',
      change: '+5%',
      icon: Award,
      color: 'from-amber-500 to-orange-400',
      bgColor: theme === 'light' ? 'from-amber-50 to-orange-50' : 'from-amber-900/20 to-orange-900/20'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      description: 'Clean and contemporary design for modern professionals',
      category: 'Professional',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
      downloads: '5.2k',
      rating: 4.9,
      featured: true,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'Creative Designer',
      description: 'Perfect for creative professionals and designers',
      category: 'Creative',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      downloads: '3.8k',
      rating: 4.8,
      featured: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      name: 'Executive',
      description: 'Sophisticated template for senior executives',
      category: 'Executive',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      downloads: '2.1k',
      rating: 4.7,
      featured: false,
      color: 'from-gray-700 to-gray-900'
    },
    {
      id: 4,
      name: 'Tech Professional',
      description: 'Optimized for software developers and tech roles',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      downloads: '4.3k',
      rating: 4.8,
      featured: false,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'completed' && resume.status === 'published') ||
      (filterStatus === 'draft' && resume.status === 'draft');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-72 h-72 ${theme === 'light' ? 'bg-emerald-200/20' : 'bg-emerald-500/10'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 ${theme === 'light' ? 'bg-green-200/20' : 'bg-green-500/10'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Platform
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Resume Builder
                </h1>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Create professional resumes that get you hired
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/ai-resume-writer')}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Writer
            </Button>
            <Button
              onClick={handleCreateResume}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-white shadow-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Resume
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className={`${theme === 'light' 
              ? `bg-gradient-to-br ${stat.bgColor} border-white/50 shadow-xl` 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-white/50">
                    {stat.change}
                  </Badge>
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {stat.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${theme === 'light' ? 'bg-white/80' : 'bg-gray-800/50'} backdrop-blur-sm`}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${theme === 'light' 
                ? 'bg-white/80 border-gray-200' 
                : 'bg-gray-800/50 border-gray-600 text-white'
              } backdrop-blur-sm`}
            >
              <option value="all">All Resumes</option>
              <option value="completed">Published</option>
              <option value="draft">Drafts</option>
            </select>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' 
                  ? 'bg-emerald-500 text-white' 
                  : theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-800 text-gray-400'
                } transition-colors`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' 
                  ? 'bg-emerald-500 text-white' 
                  : theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-800 text-gray-400'
                } transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Resumes List */}
          <div className="lg:col-span-3">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex items-center gap-2`}>
                    <Briefcase className="h-5 w-5" />
                    Your Resumes ({filteredResumes.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading resumes...</p>
                  </div>
                ) : filteredResumes.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className={`h-12 w-12 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      No resumes found
                    </h3>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6`}>
                      Create your first professional resume!
                    </p>
                    <Button
                      onClick={handleCreateResume}
                      className="bg-gradient-to-r from-emerald-500 to-green-400 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Resume
                    </Button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {filteredResumes.map((resume) => (
                      <motion.div
                        key={resume.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`${theme === 'light' 
                          ? 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-emerald-300' 
                          : 'bg-gray-700/50 border-gray-600 hover:border-emerald-500'
                        } border rounded-xl p-6 transition-all duration-300 hover:shadow-lg group cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className={`font-semibold text-lg mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'} group-hover:text-emerald-600 transition-colors`}>
                              {resume.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                {resume.template}
                              </Badge>
                              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                Updated {new Date(resume.lastUpdated).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center mb-4">
                          <div>
                            <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              {resume.downloads}
                            </div>
                            <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                              Downloads
                            </div>
                          </div>
                          <div>
                            <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              {resume.views}
                            </div>
                            <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                              Views
                            </div>
                          </div>
                          <div>
                            <div className={`text-lg font-bold text-emerald-600`}>
                              {Math.floor(Math.random() * 40 + 60)}%
                            </div>
                            <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                              Match Rate
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link to={`/resume-builder/${resume.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white hover:from-emerald-600 hover:to-green-500">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePreviewResume(resume.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadResume(resume.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShareResume(resume.id)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDuplicateResume(resume)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteResume(resume.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Templates Sidebar */}
          <div className="lg:col-span-1">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex items-center gap-2`}>
                  <Star className="h-5 w-5" />
                  Resume Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleCreateFromTemplate(template.id)}
                      className={`${theme === 'light' 
                        ? 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-emerald-300' 
                        : 'bg-gray-700/30 border-gray-600 hover:border-emerald-500'
                      } border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="relative h-24 overflow-hidden">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${template.color} opacity-80`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                        <Badge className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs">
                          {template.category}
                        </Badge>
                        {template.featured && (
                          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className={`font-semibold text-sm mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {template.name}
                        </h4>
                        <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
                              {template.downloads}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
                              {template.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <Link to="/resume-templates">
                    <Button variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse All Templates
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
