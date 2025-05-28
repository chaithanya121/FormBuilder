import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  BarChart2,
  FileText,
  Users,
  Settings,
  Trash2,
  Edit3,
  Copy,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Layers,
  Layout,
  Code,
  Palette,
  Sliders,
  Globe,
  Link,
  LogIn,
  UserPlus,
  FileImage,
  Heading,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormConfig } from "@/components/FormBuilder/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { SignInForm } from "./auth/SignInForm";
import { SignUpForm } from "./auth/SignUpForm";
import DemoVideo from "./DemoVideo";
import GetStarted from "./GetStarted";
import { AuthDialog } from "./auth/AuthDialog";
import { UserSettings } from "./settings/UserSettings";
import {
  isMobile,
  isDesktop,
  isAndroid,
  isBrowser,
  isChrome,
} from "react-device-detect";
import { useDeviceType } from "../hooks/device";
import { createForm } from "@/store/slices/formsSlice";
import { formsApi } from "@/services/api/forms";
import { useTheme } from '@/components/theme-provider';

interface FormData {
  primary_id: string;
  name: string;
  createdAt: string | Date;
  last_modified: string | Date;
  submissions: number;
  published: boolean;
  config: FormConfig;
}

// Featured form templates for inspiration
const formTemplates = [
  {
    name: "Contact Form",
    description: "Collect user inquiries and contact information",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
  },
  {
    name: "Event Registration",
    description: "Register attendees for your next event",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
  },
  {
    name: "Customer Survey",
    description: "Gather feedback from your customers",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
  },
];

// Features list
const builderFeatures = [
  {
    icon: <Layout className={`h-6 w-6`} />,
    title: "Drag & Drop Builder",
    description: "Intuitive form building with no coding required",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: <Palette className={`h-6 w-6`} />,
    title: "Custom Themes",
    description: "Brand your forms with custom colors and styles",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: <FileImage className={`h-6 w-6`} />,
    title: "Media Support",
    description: "Add images and videos to your forms",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: <Code className={`h-6 w-6`} />,
    title: "Logic Rules",
    description: "Create conditional logic for dynamic forms",
    iconColor: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: <Globe className={`h-6 w-6`} />,
    title: "Instant Publishing",
    description: "Share your forms with a single click",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    icon: <BarChart2 className={`h-6 w-6`} />,
    title: "Advanced Analytics",
    description: "Track submissions and analyze responses",
    iconColor: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
];

const MainDashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    activeUsers: 0,
    completionRate: 0,
  });
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "date" | "submissions">("date");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "archived" | "published" | "draft"
  >("all");
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [isVideoOpen, setIsVideoOpen] = useState<true | false>(false);
  const [getStarted, setGetStarted] = useState<true | false>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();
  const deviceType = useDeviceType();

  const handleOpenSignUp = () => {
    setAuthTab("signup");
    setGetStarted(false);
    setAuthDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const loadForms = async () => {
    try {
      const response = await formsApi.getAllForms();
      console.log("API response:", response);

      // Handle different possible response structures with proper typing
      let storedForms: FormData[] = [];

      if (Array.isArray(response)) {
        storedForms = response;
      } else if (response && typeof response === "object") {
        // Check if response has a forms property
        if ("forms" in response && Array.isArray((response as any).forms)) {
          storedForms = (response as any).forms;
        }
        // Check if response has a data property
        else if ("data" in response && Array.isArray((response as any).data)) {
          storedForms = (response as any).data;
        }
        // If response itself looks like it has form data properties
        else if (
          "data" in response &&
          (response as any).data &&
          typeof (response as any).data === "object" &&
          Array.isArray((response as any).data.forms)
        ) {
          storedForms = (response as any).data.forms;
        }
      }

      // Ensure storedForms is always an array before using reduce
      if (!Array.isArray(storedForms)) {
        console.warn("Expected array of forms, got:", storedForms);
        storedForms = [];
      }

      setForms(storedForms);

      setStats({
        totalForms: storedForms.length,
        totalSubmissions: storedForms.reduce(
          (acc, form) => acc + (form.submissions || 0),
          0
        ),
        activeUsers: Math.floor(Math.random() * 100),
        completionRate:
          storedForms.length > 0
            ? Math.round(
                (storedForms.filter((f) => f.published).length /
                  storedForms.length) *
                  100
              )
            : 0,
      });

      return 200;
    } catch (error) {
      console.error("Error loading forms:", error);
      // Set empty array on error to prevent reduce errors
      setForms([]);
      setStats({
        totalForms: 0,
        totalSubmissions: 0,
        activeUsers: 0,
        completionRate: 0,
      });
      toast({
        title: "Error",
        description: "Failed to load saved forms",
        variant: "destructive",
      });
      return 400;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadForms();
    }
  }, [toast, isAuthenticated]);

  const handleCreateForm = async (e) => {
    try {
      // 1. Validate input
      if (!newFormName.trim()) {
        toast({
          title: "Error",
          description: "Please enter a form name",
          variant: "destructive",
        });
        return;
      }

      const newFormData = {
        name: newFormName,
        published: false,
        config: {
          name: newFormName,
          elements: [],
          settings: {
            termsAndConditions: {
              enabled: true,
              required: true,
              text: "I accept the Terms & Conditions & Privacy Policy",
            },
            submitButton: {
              enabled: true,
              text: "Submit",
            },
            preview: {
              width: "Full" as const,
              nesting: true,
            },
            validation: {
              liveValidation: "Default" as const,
            },
            layout: {
              size: "Default" as const,
              columns: {
                default: true,
                tablet: false,
                desktop: false,
              },
              labels: "Default" as const,
              placeholders: "Default" as const,
              errors: "Default" as const,
              messages: "Default" as const,
            },
          },
        } as FormConfig,
      };

      console.log("Attempting to create form...", newFormData);

      // 3. Make API call
      const createdForm = await formsApi.createForm(newFormData);
      console.log("Form created successfully:", createdForm);

      if (!createdForm?.primary_id) {
        throw new Error("Created form doesn't have an ID");
      }

      // Update local state with the new form
      setForms((prevForms) => [createdForm, ...prevForms]);

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalForms: prev.totalForms + 1,
      }));

      // 4. Reset state
      setIsCreateFormOpen(false);
      setNewFormName("");

      // 5. Navigate - with explicit path
      const newPath = `/form-builder/${createdForm.primary_id}`;
      console.log("Navigating to:", newPath);
      navigate(newPath);

      toast({
        title: "Success",
        description: "Form created successfully",
      });
    } catch (error) {
      console.error("Form creation failed:", error);
      toast({
        title: "Error",
        description: "Failed to create form",
        variant: "destructive",
      });
    }
  };

  const handleDeleteForm = async (formId: string) => {
    try {
      const response = await formsApi.deleteForm(formId);

      toast({
        title: "Success",
        description: "Form deleted successfully",
      });
    } catch (error) {
      console.error("Form creation failed:", error);
      toast({
        title: "Error",
        description: "Failed to create form",
        variant: "destructive",
      });
    }

    const updatedForms = forms.filter((form) => form.primary_id !== formId);
    setForms(updatedForms);

    localStorage.setItem("nifty-forms", JSON.stringify(updatedForms));

    setStats((prev) => ({
      ...prev,
      totalForms: prev.totalForms - 1,
    }));
    toast({
      title: "Success",
      description: "Form deleted successfully",
    });
  };

  const handleDuplicateForm = (form: FormData) => {
    const duplicatedForm: FormData = {
      ...form,
      primary_id: `form-${Date.now()}`,
      name: `${form.name} (Copy)`,
      createdAt: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      submissions: 0,
      published: false,
    };

    const updatedForms = [duplicatedForm, ...forms];
    setForms(updatedForms);

    localStorage.setItem("nifty-forms", JSON.stringify(updatedForms));

    setStats((prev) => ({
      ...prev,
      totalForms: prev.totalForms + 1,
    }));
    toast({
      title: "Success",
      description: "Form duplicated successfully",
    });
  };

  const formatDate = (dateValue: string | Date): string => {
    if (!dateValue) return "Unknown date";

    if (typeof dateValue === "string") {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString();
    }

    return dateValue.toLocaleDateString();
  };

  const sortForms = (formsToSort: FormData[]) => {
    switch (sortBy) {
      case "name":
        return [...formsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case "date":
        return [...formsToSort].sort(
          (a, b) =>
            new Date(b.last_modified).getTime() -
            new Date(a.last_modified).getTime()
        );
      case "submissions":
        return [...formsToSort].sort((a, b) => b.submissions - a.submissions);
      default:
        return formsToSort;
    }
  };

  const getStatusColor = (submissions: number) => {
    if (submissions > 50) return "text-green-500";
    if (submissions > 20) return "text-yellow-500";
    return "text-gray-500";
  };

  const filteredAndSortedForms = sortForms(
    forms.filter((form) => {
      const matchesSearch = form.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      let matchesStatus = true;
      if (filterStatus === "published") {
        matchesStatus = form.published === true;
      } else if (filterStatus === "draft") {
        matchesStatus = form.published === false;
      }

      return matchesSearch && matchesStatus;
    })
  );

  console.log(authTab);

  // Unauthenticated view
  if (!isAuthenticated) {
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
  }

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } text-${theme === 'light' ? 'gray-900' : 'white'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with User Profile */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-10 p-8 ${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700/50 shadow-xl'
            } backdrop-blur-sm rounded-2xl border`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "User"}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Welcome back,{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    {user.name || "User"}
                  </span>
                  !
                </h1>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg`}>
                  Create and manage your forms with our powerful builder
                </p>
              </div>
              <div className="ml-auto hidden md:flex">
                <Button
                  onClick={() => setIsCreateFormOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-6 rounded-xl text-lg font-semibold border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create New Form
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          {[
            {
              icon: <FileText className="h-6 w-6 text-white" />,
              title: "Total Forms",
              value: stats.totalForms,
              color: "from-blue-500 to-blue-600",
              bgColor: theme === 'light' ? 'bg-blue-50' : 'bg-blue-500/10'
            },
            {
              icon: <CheckCircle2 className="h-6 w-6 text-white" />,
              title: "Submissions",
              value: stats.totalSubmissions,
              color: "from-green-500 to-green-600",
              bgColor: theme === 'light' ? 'bg-green-50' : 'bg-green-500/10'
            },
            {
              icon: <Users className="h-6 w-6 text-white" />,
              title: "Active Users",
              value: stats.activeUsers,
              color: "from-purple-500 to-purple-600",
              bgColor: theme === 'light' ? 'bg-purple-50' : 'bg-purple-500/10'
            },
            {
              icon: <BarChart2 className="h-6 w-6 text-white" />,
              title: "Completion Rate",
              value: `${stats.completionRate}%`,
              color: "from-orange-500 to-orange-600",
              bgColor: theme === 'light' ? 'bg-orange-50' : 'bg-orange-500/10'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`p-6 ${theme === 'light' 
                ? 'bg-white border-gray-200 shadow-lg hover:shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-2xl'
              } backdrop-blur-sm rounded-2xl overflow-hidden relative transition-all duration-300`}>
                <div className={`absolute inset-0 ${stat.bgColor} opacity-30 rounded-2xl`}></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {stat.title}
                    </p>
                    <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Builder Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mb-10 ${theme === 'light' 
            ? 'bg-white/80 border-gray-200 shadow-lg' 
            : 'bg-gray-800/50 border-gray-700/50 shadow-xl'
          } backdrop-blur-sm p-8 rounded-2xl border`}
        >
          <h2 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Heading className="h-5 w-5 text-blue-500" />
            </div>
            Form Builder Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: PlusCircle, title: "New Form", color: "blue", action: () => setIsCreateFormOpen(true) },
              { icon: Layout, title: "Templates", color: "purple", action: () => {} },
              { icon: Sliders, title: "Form Settings", color: "green", action: () => {} },
              { icon: Palette, title: "Themes", color: "orange", action: () => {} }
            ].map((tool, index) => (
              <motion.button
                key={tool.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={tool.action}
                className={`${theme === 'light' 
                  ? 'bg-gray-50 hover:bg-gray-100 border-gray-200' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700'
                } border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 group`}
              >
                <div className={`p-4 bg-${tool.color}-500/10 rounded-2xl group-hover:bg-${tool.color}-500/20 transition-colors`}>
                  <tool.icon className={`h-6 w-6 text-${tool.color}-500`} />
                </div>
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {tool.title}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mb-10 ${theme === 'light' 
            ? 'bg-white/80 border-gray-200 shadow-lg' 
            : 'bg-gray-800/50 border-gray-700/50 shadow-xl'
          } backdrop-blur-sm p-8 rounded-2xl border`}
        >
          <h2 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { icon: Edit3, title: "You edited Contact Form", time: "2 hours ago", color: "blue" },
              { icon: PlusCircle, title: "You created Feedback Survey", time: "Yesterday", color: "green" },
              { icon: CheckCircle2, title: "New submission on Registration Form", time: "2 days ago", color: "purple" }
            ].map((activity, index) => (
              <div key={index} className={`flex items-start gap-4 p-4 ${theme === 'light' 
                ? 'bg-gray-50/70' 
                : 'bg-gray-800/70'
              } rounded-xl`}>
                <div className={`p-2 bg-${activity.color}-500/10 rounded-full`}>
                  <activity.icon className={`h-4 w-4 text-${activity.color}-500`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {activity.title}
                  </p>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${theme === 'light' 
            ? 'bg-white/80 border-gray-200 shadow-lg' 
            : 'bg-gray-800/50 border-gray-700/50 shadow-xl'
          } backdrop-blur-sm p-8 rounded-2xl border`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Dialog
                open={isCreateFormOpen}
                onOpenChange={setIsCreateFormOpen}
              >
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Form
                  </motion.button>
                </DialogTrigger>
                <DialogContent className={`${theme === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gray-800 border-gray-700'
                } rounded-2xl shadow-2xl backdrop-blur-sm`}>
                  <DialogHeader>
                    <DialogTitle className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} text-xl`}>
                      Create New Form
                    </DialogTitle>
                    <DialogDescription className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Give your form a name to get started
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Form Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter form name..."
                        value={newFormName}
                        onChange={(e) => setNewFormName(e.target.value)}
                        className={`${theme === 'light' 
                          ? 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                        } transition-all rounded-lg`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleCreateForm(e)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium"
                    >
                      Create Form
                    </motion.button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <Input
                    placeholder="Search forms..."
                    className={`pl-10 ${theme === 'light' 
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-700/70 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    } rounded-lg transition-all`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className={`w-48 ${theme === 'light' 
                  ? 'bg-gray-50 border-gray-300 text-gray-900' 
                  : 'bg-gray-700/70 border-gray-600 text-white'
                } rounded-lg`}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className={`${theme === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gray-800 border-gray-700'
                } rounded-lg shadow-xl`}>
                  <SelectItem
                    value="name"
                    className={`${theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}
                  >
                    Name
                  </SelectItem>
                  <SelectItem
                    value="date"
                    className={`${theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}
                  >
                    Last Modified
                  </SelectItem>
                  <SelectItem
                    value="submissions"
                    className={`${theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}
                  >
                    Submissions
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterStatus}
                onValueChange={(value: any) => setFilterStatus(value)}
              >
                <SelectTrigger className={`w-48 ${theme === 'light' 
                  ? 'bg-gray-50 border-gray-300 text-gray-900' 
                  : 'bg-gray-700/70 border-gray-600 text-white'
                } rounded-lg`}>
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className={`${theme === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gray-800 border-gray-700'
                } rounded-lg shadow-xl`}>
                  <SelectItem
                    value="all"
                    className={`${theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}
                  >
                    All Forms
                  </SelectItem>
                  <SelectItem
                    value="published"
                    className={`${theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}
                  >
                    Published
                  </SelectItem>
                  <SelectItem
                    value="draft"
                    className={`${theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}
                  >
                    Draft
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Forms Grid */}
        <div className="mb-6">
          <h2 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            Your Forms
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedForms.map((form, index) => (
              <motion.div
                key={form.primary_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className={`${theme === 'light' 
                  ? 'bg-white border-gray-200 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-2xl'
                } rounded-2xl overflow-hidden transition-all duration-300`}>
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-lg font-semibold truncate flex items-center gap-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {form.name}
                        {form.published ? (
                          <span className="text-xs bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                            Published
                          </span>
                        ) : (
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${theme === 'light' 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            Draft
                          </span>
                        )}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`${theme === 'light' 
                              ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100' 
                              : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            } rounded-lg`}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className={`${theme === 'light' 
                            ? 'bg-white border-gray-200' 
                            : 'bg-gray-800 border-gray-700'
                          } rounded-lg shadow-xl`}
                        >
                          <DropdownMenuLabel className="text-gray-400">
                            Form Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() =>
                              navigate(`/form-builder/${form.primary_id}`)
                            }
                          >
                            <Edit3 className="h-4 w-4 mr-2 text-blue-500" />
                            Edit Form
                          </DropdownMenuItem>
                          {form.published && (
                            <>
                              <DropdownMenuItem
                                className="hover:bg-gray-700 cursor-pointer"
                                onClick={() =>
                                  navigate(`/form/${form.primary_id}`)
                                }
                              >
                                <Eye className="h-4 w-4 mr-2 text-green-400" />
                                View Form
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-gray-700 cursor-pointer"
                                onClick={() => {
                                  const shareableLink = `${window.location.origin}/form/${form.primary_id}`;
                                  navigator.clipboard.writeText(shareableLink);
                                  toast({
                                    title: "Link Copied",
                                    description:
                                      "Shareable form link copied to clipboard",
                                  });
                                }}
                              >
                                <Link className="h-4 w-4 mr-2 text-blue-400" />
                                Copy Shareable Link
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleDuplicateForm(form)}
                          >
                            <Copy className="h-4 w-4 mr-2 text-green-500" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              const updatedForms = forms.map((f) => {
                                if (f.primary_id === form.primary_id) {
                                  return {
                                    ...f,
                                    published: !f.published,
                                    last_modified: new Date().toISOString(),
                                  };
                                }
                                return f;
                              });
                              setForms(updatedForms);
                              localStorage.setItem(
                                "nifty-forms",
                                JSON.stringify(updatedForms)
                              );
                              toast({
                                title: form.published
                                  ? "Form Unpublished"
                                  : "Form Published",
                                description: form.published
                                  ? "The form is now in draft mode"
                                  : "The form is now available for submissions",
                              });
                            }}
                          >
                            <Globe className="h-4 w-4 mr-2 text-purple-500" />
                            {form.published ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem
                            className="hover:bg-red-900/30 text-red-400 hover:text-red-300 cursor-pointer"
                            onClick={() => handleDeleteForm(form.primary_id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-4">
                      <div className={`flex items-center gap-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        <Clock className="h-4 w-4" />
                        Last modified {formatDate(form.last_modified)}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(
                              form.submissions
                            )}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{form.submissions} submissions</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            navigate(`/form-builder/${form.primary_id}`)
                          }
                          className={`${theme === 'light' 
                            ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700' 
                            : 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white'
                          } border px-4 py-2 rounded-lg flex items-center gap-1 text-sm transition-colors font-medium`}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Empty State */}
        {filteredAndSortedForms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-center py-20 px-6 ${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700/50 shadow-xl'
            } backdrop-blur-sm rounded-2xl border`}
          >
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className={`absolute inset-2 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} rounded-full flex items-center justify-center`}>
                <FileText className={`h-8 w-8 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            <h3 className={`text-xl font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              No forms found
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6 max-w-md mx-auto`}>
              {searchTerm
                ? "Try adjusting your search terms or clear filters to see all forms"
                : "Get started by creating your first form and begin collecting submissions"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto font-medium shadow-lg transition-all duration-300"
            >
              <PlusCircle className="h-4 w-4" />
              Create Form
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
