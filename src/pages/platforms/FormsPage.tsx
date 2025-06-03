import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Share2,
  Download,
  Trash2,
  ArrowLeft,
  BarChart3,
  Users,
  Star,
  Grid,
  List,
  Copy,
  BookOpen,
  Sparkles,
  Target,
  Activity,
  ChevronRight,
  Home,
  Database,
  Play,
  Pause,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/store";
import {
  fetchForms,
  createForm,
  deleteFormAction,
} from "@/store/slices/formsSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ITEMS_PER_PAGE = 6;

const FormsPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { forms, loading, error } = useSelector(
    (state: RootState) => state.forms
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  const handleCreateForm = async () => {
    try {
      const newForm = await dispatch(
        createForm({
          name: "Untitled Form",
          published: false,
          config: {
            name: "Untitled Form",
            elements: [],
            settings: {
              preview: { width: "Full", nesting: false },
              validation: { liveValidation: "Default" },
              layout: {
                size: "Default",
                columns: { default: true, tablet: true, desktop: true },
                labels: "Default",
                placeholders: "Default",
                errors: "Default",
                messages: "Default",
                questionSpacing: 24,
                labelAlignment: "top",
              },
              canvasStyles: {
                backgroundColor:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                formBackgroundColor: "#ffffff",
                fontColor: "#321f16",
                primaryColor: "#3b82f6",
                fontFamily: "Inter",
                fontSize: 16,
                formWidth: 752,
                borderRadius: "12px",
                padding: "32px",
                backgroundImage: "",
                customCSS: "",
              },
              submitButton: {
                text: "Submit Form",
                position: "bottom",
              },
              termsAndConditions: {
                enabled: false,
                required: false,
                text: "I accept the Terms & Conditions",
              },
            },
          },
        })
      ).unwrap();

      navigate(`/form-builder/${newForm.primary_id}`);
    } catch (error) {
      console.error("Failed to create form:", error);
    }
  };

  const handleDeleteForm = async (formId: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await dispatch(deleteFormAction(formId)).unwrap();
      } catch (error) {
        console.error("Failed to delete form:", error);
      }
    }
  };

  const handleDuplicateForm = async (form: any) => {
    try {
      const duplicatedForm = await dispatch(
        createForm({
          name: `${form.name} (Copy)`,
          published: false,
          config: form.config,
        })
      ).unwrap();

      console.log("Form duplicated successfully");
    } catch (error) {
      console.error("Failed to duplicate form:", error);
    }
  };

  const handlePreviewForm = (formId: string) => {
    window.open(`/form-preview/${formId}`, "_blank");
  };

  const handleShareForm = (formId: string) => {
    const shareUrl = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log("Share URL copied to clipboard");
  };

  const handleTogglePublish = async (
    formId: string,
    currentPublished: boolean
  ) => {
    console.log(
      `Toggling form ${formId} published status from ${currentPublished} to ${!currentPublished}`
    );
    // This would update the form's published status in the backend
  };

  const handleViewSubmissions = (formId: string) => {
    navigate(`/form-submissions/${formId}`);
  };

  const handleCreateFromTemplate = (templateId: number) => {
    console.log("Creating form from template:", templateId);
    handleCreateForm();
  };

  const stats = [
    {
      title: "Total Forms",
      value: forms.length.toString(),
      change: "+12%",
      icon: FileText,
      color: "from-blue-500 to-cyan-400",
      bgColor:
        theme === "light"
          ? "from-blue-50 to-cyan-50"
          : "from-blue-900/20 to-cyan-900/20",
    },
    {
      title: "Total Submissions",
      value: "2,847",
      change: "+28%",
      icon: Users,
      color: "from-emerald-500 to-green-400",
      bgColor:
        theme === "light"
          ? "from-emerald-50 to-green-50"
          : "from-emerald-900/20 to-green-900/20",
    },
    {
      title: "Conversion Rate",
      value: "24.5%",
      change: "+5.2%",
      icon: Target,
      color: "from-purple-500 to-pink-400",
      bgColor:
        theme === "light"
          ? "from-purple-50 to-pink-50"
          : "from-purple-900/20 to-pink-900/20",
    },
    {
      title: "Active Forms",
      value: "18",
      change: "+3",
      icon: Activity,
      color: "from-amber-500 to-orange-400",
      bgColor:
        theme === "light"
          ? "from-amber-50 to-orange-50"
          : "from-amber-900/20 to-orange-900/20",
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Contact Form",
      description: "Simple contact form with name, email, and message fields",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
      submissions: "1.2k",
      rating: 4.9,
      featured: true,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Survey Form",
      description: "Multi-step survey with rating scales and feedback",
      category: "Research",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      submissions: "856",
      rating: 4.8,
      featured: true,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      name: "Registration Form",
      description: "Event registration with payment integration",
      category: "Events",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      submissions: "423",
      rating: 4.7,
      featured: false,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      name: "Feedback Form",
      description: "Customer feedback collection with NPS scoring",
      category: "Customer Service",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      submissions: "234",
      rating: 4.6,
      featured: false,
      color: "from-orange-500 to-red-600",
    },
  ];

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "published" && form.published === true) ||
      (filterStatus === "draft" && form.published === false);
    return matchesSearch && matchesFilter;
  });

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredForms.length / ITEMS_PER_PAGE);

  const paginatedForms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredForms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredForms, currentPage]);

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      } p-6`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-20 w-72 h-72 ${
            theme === "light" ? "bg-blue-200/20" : "bg-blue-500/10"
          } rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-20 left-20 w-96 h-96 ${
            theme === "light" ? "bg-purple-200/20" : "bg-purple-500/10"
          } rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Forms
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1
                className={`text-3xl font-bold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                Form Builder Studio
              </h1>
              <p
                className={`${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Create and manage dynamic forms with AI assistance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/ai-form-generator")}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Generator
            </Button>
            <Button
              onClick={handleCreateForm}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Form
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
            <Card
              key={index}
              className={`${
                theme === "light"
                  ? `bg-gradient-to-br ${stat.bgColor} border-white/50 shadow-xl`
                  : "bg-gray-800/50 border-gray-700 shadow-2xl"
              } backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-white/50">
                    {stat.change}
                  </Badge>
                </div>
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                >
                  {stat.value}
                </div>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
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
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${
                theme === "light" ? "bg-white/80" : "bg-gray-800/50"
              } backdrop-blur-sm`}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                theme === "light"
                  ? "bg-white/80 border-gray-200"
                  : "bg-gray-800/50 border-gray-600 text-white"
              } backdrop-blur-sm`}
            >
              <option value="all">All Forms</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>

            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : theme === "light"
                    ? "bg-white text-gray-600"
                    : "bg-gray-800 text-gray-400"
                } transition-colors`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : theme === "light"
                    ? "bg-white text-gray-600"
                    : "bg-gray-800 text-gray-400"
                } transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Forms List */}
          <div className="lg:col-span-3">
            <Card
              className={`${
                theme === "light"
                  ? "bg-white/90 border-white/50 shadow-xl"
                  : "bg-gray-800/50 border-gray-700 shadow-2xl"
              } backdrop-blur-sm`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={`text-xl ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    } flex items-center gap-2`}
                  >
                    <FileText className="h-5 w-5" />
                    Your Forms ({paginatedForms.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      Loading forms...
                    </p>
                  </div>
                ) : paginatedForms.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText
                      className={`h-12 w-12 mx-auto mb-4 ${
                        theme === "light" ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      No forms found
                    </h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      } mb-6`}
                    >
                      Create your first form to get started!
                    </p>
                    <Button
                      onClick={handleCreateForm}
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Form
                    </Button>
                  </div>
                ) : (
                  /** card table startes here. */
                  <>
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid md:grid-cols-2 lg:grid-cols-2 gap-6"
                          : "space-y-4"
                      }
                    >
                      {paginatedForms.map((form) => (
                        <TooltipProvider>
                          <motion.div
                            key={form.primary_id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`${
                              theme === "light"
                                ? "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-blue-300"
                                : "bg-gray-700/50 border-gray-600 hover:border-blue-500"
                            } border rounded-xl p-6 transition-all duration-300 hover:shadow-lg group cursor-pointer`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3
                                  className={`font-semibold text-lg mb-2 ${
                                    theme === "light"
                                      ? "text-gray-900"
                                      : "text-white"
                                  } group-hover:text-blue-600 transition-colors`}
                                >
                                  {form.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge
                                    className={`${
                                      form.published
                                        ? "bg-green-100 text-green-700 border-green-200"
                                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                                    }`}
                                  >
                                    {form.published ? "published" : "draft"}
                                  </Badge>
                                  <span
                                    className={`text-xs ${
                                      theme === "light"
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    Updated{" "}
                                    {new Date(
                                      form.last_modified
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center mb-4">
                              <div
                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                                onClick={() =>
                                  handleViewSubmissions(form.primary_id)
                                }
                              >
                                <div
                                  className={`text-lg font-bold ${
                                    theme === "light"
                                      ? "text-gray-900"
                                      : "text-white"
                                  }`}
                                >
                                  {form.submissions}
                                </div>
                                <div
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-gray-500"
                                      : "text-gray-400"
                                  }`}
                                >
                                  Submissions
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`text-lg font-bold ${
                                    theme === "light"
                                      ? "text-gray-900"
                                      : "text-white"
                                  }`}
                                >
                                  {Math.floor(Math.random() * 200 + 100)}
                                </div>
                                <div
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-gray-500"
                                      : "text-gray-400"
                                  }`}
                                >
                                  Views
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`text-lg font-bold text-blue-600`}
                                >
                                  {Math.floor(Math.random() * 40 + 60)}%
                                </div>
                                <div
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-gray-500"
                                      : "text-gray-400"
                                  }`}
                                >
                                  Conversion
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <Button
                                onClick={() =>
                                  handleTogglePublish(
                                    form.primary_id,
                                    form.published
                                  )
                                }
                                size="sm"
                                variant={form.published ? "outline" : "default"}
                                className={`flex items-center gap-1 ${
                                  form.published
                                    ? "text-red-600 hover:text-red-700"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                              >
                                {form.published ? (
                                  <Pause className="h-3 w-3" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                                {form.published ? "Unpublish" : "Publish"}
                              </Button>
                            </div>

                            {/* <div className="flex items-center gap-2">
                            <Link
                              to={`/form-builder/${form.primary_id}`}
                              className="flex-1"
                            >
                              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </Link>
                            <TooltipProvider
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePreviewForm(form.primary_id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleViewSubmissions(form.primary_id)
                              }
                            >
                              <Database className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareForm(form.primary_id)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDuplicateForm(form)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteForm(form.primary_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div> */}
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/form-builder/${form.primary_id}`}
                                className="flex-1"
                              >
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </Link>

                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handlePreviewForm(form.primary_id)
                                    }
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  Preview Form
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleViewSubmissions(form.primary_id)
                                    }
                                  >
                                    <Database className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  View Submissions
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleShareForm(form.primary_id)
                                    }
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Share</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDuplicateForm(form)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Duplicate</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteForm(form.primary_id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </div>
                          </motion.div>
                        </TooltipProvider>
                      ))}
                    </div>
                    <div className="flex items-center justify-center mt-6 space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <ChevronLeftIcon className="w-4 h-4 mr-1" />
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-3 py-1.5 border text-sm rounded ${
                            currentPage === index + 1
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        Next
                        <ChevronRightIcon className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Templates Sidebar */}
          <div className="lg:col-span-1">
            <Card
              className={`${
                theme === "light"
                  ? "bg-white/90 border-white/50 shadow-xl"
                  : "bg-gray-800/50 border-gray-700 shadow-2xl"
              } backdrop-blur-sm`}
            >
              <CardHeader>
                <CardTitle
                  className={`text-lg ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } flex items-center gap-2`}
                >
                  <Star className="h-5 w-5" />
                  Quick Start Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleCreateFromTemplate(template.id)}
                      className={`${
                        theme === "light"
                          ? "bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-blue-300"
                          : "bg-gray-700/30 border-gray-600 hover:border-blue-500"
                      } border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="relative h-24 overflow-hidden">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${template.color} opacity-80`}
                        ></div>
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
                        <h4
                          className={`font-semibold text-sm mb-1 ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}
                        >
                          {template.name}
                        </h4>
                        <p
                          className={`text-xs ${
                            theme === "light"
                              ? "text-gray-600"
                              : "text-gray-400"
                          } mb-2`}
                        >
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span
                              className={
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }
                            >
                              {template.submissions}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span
                              className={
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }
                            >
                              {template.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <Link to="/form-templates">
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

export default FormsPage;
