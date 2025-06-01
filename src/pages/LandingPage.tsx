
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Layers, 
  CheckCircle2, 
  Play, 
  LogIn, 
  UserPlus,
  ArrowRight,
  Star,
  Briefcase,
  Globe,
  ShoppingCart,
  Book,
  Camera,
  FileText,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import Dashboard from '@/components/Dashboard';
import DemoVideo from '@/components/DemoVideo';
import GetStarted from '@/components/GetStarted';

const LandingPage = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [getStarted, setGetStarted] = useState(false);

  const handleOpenSignUp = () => {
    setAuthTab("signup");
  };

  // Show Dashboard if user is authenticated
  if (isAuthenticated) {
    return <Dashboard />;
  }

  const platforms = [
    {
      name: "Form Builder",
      description: "Create dynamic forms with AI assistance",
      icon: FileText,
      color: "from-blue-500 to-cyan-400",
      stats: "2.5M+ forms created"
    },
    {
      name: "Resume Builder", 
      description: "Professional CV creation with templates",
      icon: Briefcase,
      color: "from-emerald-500 to-green-400",
      stats: "500K+ resumes built"
    },
    {
      name: "Website Builder",
      description: "Stunning websites and landing pages",
      icon: Globe,
      color: "from-purple-500 to-pink-400",
      stats: "100K+ websites launched"
    },
    {
      name: "E-Commerce",
      description: "Online stores with payment integration",
      icon: ShoppingCart,
      color: "from-orange-500 to-red-400",
      stats: "50K+ stores created"
    },
    {
      name: "Presentations",
      description: "Interactive presentation builder",
      icon: Book,
      color: "from-indigo-500 to-blue-400",
      stats: "1M+ slides designed"
    },
    {
      name: "Portfolio",
      description: "Showcase your work professionally",
      icon: Camera,
      color: "from-pink-500 to-rose-400",
      stats: "250K+ portfolios"
    }
  ];

  const features = [
    {
      title: "AI-Powered Creation",
      description: "Generate content, designs, and layouts using advanced AI technology",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      title: "Drag & Drop Builder",
      description: "Intuitive visual editor with professional templates and components",
      icon: Layers,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time with advanced sharing features",
      icon: Users,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights and performance tracking across all your projects",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security with SSL encryption and data protection",
      icon: Shield,
      gradient: "from-gray-700 to-gray-900"
    },
    {
      title: "Premium Support",
      description: "24/7 priority support with dedicated success managers",
      icon: Award,
      gradient: "from-amber-500 to-orange-600"
    }
  ];

  const stats = [
    { value: "5M+", label: "Active Users", icon: Users },
    { value: "50M+", label: "Projects Created", icon: Layers },
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "150+", label: "Countries", icon: Globe }
  ];

  return (
    <div className={`min-h-screen overflow-hidden ${theme === 'light'
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${theme === 'light' ? 'bg-blue-400/20' : 'bg-blue-500/10'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute top-40 -left-40 w-80 h-80 ${theme === 'light' ? 'bg-purple-400/20' : 'bg-purple-500/10'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-40 right-1/3 w-80 h-80 ${theme === 'light' ? 'bg-emerald-400/20' : 'bg-emerald-500/10'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-3xl shadow-2xl">
                <Layers className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                BuildCraft
              </h1>
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                Platform
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className={`text-2xl md:text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              The Ultimate Multi-Platform SaaS Solution
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Create, design, and deploy anything with our comprehensive suite of AI-powered builders. 
              From forms to websites, resumes to e-commerce stores - all in one unified platform.
            </p>
          </motion.div>

          {/* Platform Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className={`${theme === 'light' 
                ? 'bg-white/80 border-white/50' 
                : 'bg-gray-800/50 border-gray-700/50'
              } backdrop-blur-sm border rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <Button
              onClick={() => setGetStarted(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
            >
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`${theme === 'light' 
                ? 'bg-white/90 text-gray-700 border-gray-200 hover:bg-white' 
                : 'bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700/50'
              } px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105`}
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Platforms Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Six Platforms, One Solution
            </h3>
            <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
              Everything you need to create, design, and deploy your digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`${theme === 'light' 
                  ? 'bg-white/80 border-white/50 hover:bg-white' 
                  : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80'
                } backdrop-blur-sm border rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group cursor-pointer transform hover:scale-105`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <platform.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {platform.name}
                    </h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {platform.stats}
                    </p>
                  </div>
                </div>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>
                  {platform.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Enterprise-Grade Features
            </h3>
            <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
              Built for scale with cutting-edge technology and security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`${theme === 'light' 
                  ? 'bg-white/80 border-white/50 hover:bg-white' 
                  : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80'
                } backdrop-blur-sm border rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {feature.title}
                </h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Auth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className={`${theme === 'light' 
            ? 'bg-white/90 border-white/50' 
            : 'bg-gray-800/90 border-gray-700/50'
          } backdrop-blur-sm p-8 rounded-3xl border shadow-2xl`}>
            <div className="flex mb-6 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-1">
              <button
                className={`flex-1 py-3 px-4 text-center transition-all duration-300 rounded-xl ${
                  authTab === "signin"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : `${theme === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300 hover:text-white'}`
                }`}
                onClick={() => setAuthTab("signin")}
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="font-medium">Sign In</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center transition-all duration-300 rounded-xl ${
                  authTab === "signup"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : `${theme === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300 hover:text-white'}`
                }`}
                onClick={() => setAuthTab("signup")}
              >
                <div className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span className="font-medium">Sign Up</span>
                </div>
              </button>
            </div>

            {authTab === "signin" ? (
              <SignInForm onSuccess={() => navigate("/")} />
            ) : (
              <SignUpForm onSuccess={() => navigate("/")} />
            )}
          </div>
        </motion.div>

        {/* Demo Video Modal */}
        <DemoVideo open={isVideoOpen} onOpenChange={setIsVideoOpen} />
        {getStarted && (
          <GetStarted
            onClose={() => setGetStarted(false)}
            onSignUp={handleOpenSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
