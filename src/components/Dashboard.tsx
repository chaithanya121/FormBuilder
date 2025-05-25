import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Copy, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { deleteFormAction, fetchForms } from '@/store/slices/formsSlice';
import { FormConfig } from '@/types';
import { useTheme } from '@/components/theme-provider';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { theme } = useTheme();
  const forms = useSelector((state: any) => state.forms.forms);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    dispatch(fetchForms() as any);
  }, [dispatch]);

  const filteredForms = forms ? forms.filter((form: any) =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleCreateForm = () => {
    const newFormConfig: FormConfig = {
      title: 'New Form',
      description: 'Form description',
      elements: [],
      settings: {
        termsAndConditions: {
          enabled: true,
          required: true,
          text: 'I agree to the terms and conditions'
        },
        submitButton: {
          enabled: true,
          text: 'Submit'
        },
        preview: {
          width: "Full",
          nesting: true
        },
        validation: {
          liveValidation: "Default"
        },
        layout: {
          size: "Default",
          columns: {
            default: false,
            tablet: false,
            desktop: false
          },
          labels: "Default",
          placeholders: "Default",
          errors: "Default",
          messages: "Default"
        }
      }
    };

    navigate('/form-builder/new');
  };

  const handleEditForm = (formId: string) => {
    navigate(`/form-builder/${formId}`);
  };

  const handleViewSubmissions = (formId: string) => {
    navigate(`/form-submissions/${formId}`);
  };

  const handleDeleteForm = async (formId: string) => {
    try {
      await dispatch(deleteFormAction(formId) as any);
      toast({
        title: "Success",
        description: "Form deleted successfully."
      });
    } catch (error) {
      console.error("Error deleting form:", error);
      toast({
        title: "Error",
        description: "Failed to delete form.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateForm = (form: any) => {
    // Logic to duplicate the form
    toast({
      title: "Feature Incomplete",
      description: "This feature is under development."
    });
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'light'
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      : 'bg-gray-900'
      } text-${theme === 'light' ? 'gray-800' : 'white'}`}>
      <div className="container mx-auto p-4">
        <div className="text-center mb-8 mt-6">
          <h1 className={`text-3xl font-bold tracking-tight mb-3 md:text-4xl lg:text-5xl ${theme === 'light'
            ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            : 'text-white'
            }`}>
            Dashboard
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-blue-100/80'}`}>
            Manage your forms and submissions
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Input
            type="search"
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${theme === 'light'
              ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500'
              : 'bg-gray-700/70 border-gray-600 text-white'
              } w-full md:w-auto`}
          />
          <Button onClick={handleCreateForm} className={`${theme === 'light'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
            } text-white shadow-lg hover:shadow-xl transition-all duration-200`}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>

        <Card className={`${theme === 'light'
          ? 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl'
          : 'bg-gray-800/70 border border-gray-700/50'
          }`}>
          <CardHeader>
            <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
              Your Forms
            </CardTitle>
            <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
              Manage, edit, and view submissions for your forms
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.map((form: any) => (
                  <TableRow key={form.primary_id}>
                    <TableCell className="font-medium">{form.name}</TableCell>
                    <TableCell>{new Date(form.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(form.last_modified).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditForm(form.primary_id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewSubmissions(form.primary_id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            View Submissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateForm(form)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteForm(form.primary_id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredForms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No forms found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
