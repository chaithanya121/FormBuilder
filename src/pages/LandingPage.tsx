
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Layers, 
  CheckCircle2, 
  Play, 
  LogIn, 
  UserPlus 
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

  const builderFeatures = [
    {
      title: "Drag & Drop Builder",
      description: "Create forms effortlessly with our intuitive drag-and-drop interface",
      icon: <Layers className="h-6 w-6" />,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Professional Templates",
      description: "Start with pre-designed templates for common use cases",
      icon: <CheckCircle2 className="h-6 w-6" />,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Real-time Analytics",
      description: "Track form performance and submission analytics in real-time",
      icon: <Play className="h-6 w-6" />,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const formTemplates = [
    {
      name: "Contact Form",
      description: "Perfect for customer inquiries and support requests",
      image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      name: "Event Registration",
      description: "Streamline event signups and attendee management",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      name: "Survey Form",
      description: "Collect feedback and insights from your audience",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
    }
  ];

  // Show Dashboard if user is authenticated
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Show landing page if user is not authenticated
  return (
    <div className={`min-h-screen ${theme === 'light'
      ? 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      } text-${theme === 'light' ? 'gray-900' : 'white'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-4xl"
          >
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Layers className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -right-4 -bottom-2 bg-green-500 rounded-full p-2 border-4 border-white dark:border-gray-900 shadow-lg">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Form Builder Pro
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-blue-100/80'}`}
            >
              Create stunning forms with our intuitive drag-and-drop builder.
              No coding required. Perfect for surveys, registration forms,
              lead generation, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-12 pt-8"
            >
              <Button
                onClick={() => setGetStarted(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-6 rounded-xl text-lg font-semibold border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`${theme === 'light' 
                  ? 'bg-white/80 text-gray-700 border-gray-300 hover:bg-white hover:text-gray-900' 
                  : 'bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700/50'
                } px-8 py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm`}
                onClick={() => setIsVideoOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Form Preview Image */}
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className={`relative ${theme === 'light' 
                  ? 'bg-white/70 border-gray-200' 
                  : 'bg-gray-800/70 border-gray-700/50'
                } backdrop-blur-sm border rounded-2xl overflow-hidden shadow-2xl`}
              >
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80"
                  alt="Form Builder Dashboard"
                  className="w-full h-auto opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
                  <div className="p-8 text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Beautiful Form Builder
                    </h3>
                    <p className="text-gray-200 text-lg">
                      Create forms with our intuitive drag-and-drop interface.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className={`w-full max-w-md ${theme === 'light' 
            ? 'bg-white/80 border-gray-200' 
            : 'bg-gray-800/80 border-gray-700/50'
          } backdrop-blur-sm p-8 rounded-2xl border shadow-2xl my-16`}>
            <div className="flex mb-6 rounded-lg overflow-hidden">
              <button
                className={`flex-1 py-3 px-4 text-center transition-all duration-200 ${
                  authTab === "signin"
                    ? "bg-blue-600 text-white shadow-lg"
                    : `${theme === 'light' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                }`}
                onClick={() => setAuthTab("signin")}
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="font-medium">Sign In</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center transition-all duration-200 ${
                  authTab === "signup"
                    ? "bg-blue-600 text-white shadow-lg"
                    : `${theme === 'light' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
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
              <SignInForm
                onSuccess={() => {
                  navigate("/");
                }}
              />
            ) : (
              <SignUpForm
                onSuccess={() => {
                  navigate("/");
                }}
              />
            )}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full py-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg mb-12 max-w-2xl mx-auto`}>
              All the tools you need to create and manage forms with professional results
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {builderFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className={`${theme === 'light' 
                    ? 'bg-white/70 border-gray-200/50 hover:bg-white' 
                    : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
                  } backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group transform hover:scale-105`}
                >
                  <div className={`p-4 ${feature.bgColor} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Templates Section */}
          <div className="w-full py-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready-to-Use Templates
            </h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg mb-12 max-w-2xl mx-auto`}>
              Jump start your form creation with our professionally-designed templates
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {formTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 * index }}
                  className={`${theme === 'light' 
                    ? 'bg-white border-gray-200' 
                    : 'bg-gray-800/30 border-gray-700/50'
                  } backdrop-blur-sm border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:scale-105`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-semibold text-white">
                        {template.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6 leading-relaxed`}>
                      {template.description}
                    </p>
                    <Button
                      onClick={() => setAuthTab("signup")}
                      variant="secondary"
                      className="w-full rounded-lg font-medium"
                    >
                      Use Template
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo Video Modal */}
          <DemoVideo open={isVideoOpen} onOpenChange={setIsVideoOpen} />
          {getStarted && (
            <GetStarted
              onClose={() => setGetStarted(false)}
              onSignUp={handleOpenSignUp}
            />
          )}

          {/* Testimonials */}
          <div className={`w-full py-20 ${theme === 'light' 
            ? 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50' 
            : 'bg-gradient-to-br from-gray-800/30 to-gray-900/30'
          } rounded-3xl my-16`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              Trusted by Businesses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Alex Johnson",
                  role: "Marketing Director",
                  avatar: "A",
                  color: "bg-blue-600",
                  quote: "Form Builder Pro transformed how we collect lead information. Our conversion rate increased by 40% in just one month!"
                },
                {
                  name: "Sarah Miller",
                  role: "Event Manager",
                  avatar: "S",
                  color: "bg-purple-600",
                  quote: "The event registration templates saved us countless hours. Setting up our conference registration was a breeze."
                },
                {
                  name: "Michael Chen",
                  role: "Product Owner",
                  avatar: "M",
                  color: "bg-green-600",
                  quote: "The analytics dashboard gives us incredible insights into our customer feedback. It's become an essential tool for our product team."
                }
              ].map((testimonial, index) => (
                <div key={index} className={`${theme === 'light' 
                  ? 'bg-white/80 border-gray-200' 
                  : 'bg-gray-800/50 border-gray-700/50'
                } backdrop-blur-sm border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <div className="flex items-center mb-6">
                    <div className={`h-14 w-14 rounded-full ${testimonial.color} flex items-center justify-center mr-4 shadow-lg`}>
                      <span className="text-xl font-bold text-white">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} italic leading-relaxed`}>
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
