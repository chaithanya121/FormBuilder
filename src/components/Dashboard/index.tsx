import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit, Copy, Trash2, Eye, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteFormAction, fetchForms, duplicateFormAction } from '@/store/slices/formsSlice';
import { FormConfig } from '@/types';
import { useTheme } from '@/components/theme-provider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formIdToDelete, setFormIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { theme } = useTheme();
  const forms = useSelector((state: any) => state.forms.forms);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedFormData, setImportedFormData] = useState<string>('');

  useEffect(() => {
    dispatch(fetchForms() as any);
  }, [dispatch]);

  const filteredForms = forms?.filter((form: any) =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateForm = () => {
    const newFormConfig: FormConfig = {
      title: 'Untitled Form',
      description: 'Form description',
      elements: [],
      settings: {
        submitButton: {
          enabled: true,
          text: 'Submit'
        },
        termsAndConditions: {
          enabled: false,
          required: false,
          text: 'I agree to the terms and conditions'
        },
        preview: {
          width: "Full",
          nesting: false
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

  const editForm = (id: string) => {
    navigate(`/form-builder/${id}`);
  };

  const viewForm = (id: string) => {
    window.open(`/${id}`, '_blank');
  };

  const confirmDeleteForm = (id: string) => {
    setFormIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const cancelDeleteForm = () => {
    setFormIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const deleteForm = async () => {
    if (formIdToDelete) {
      try {
        await dispatch(deleteFormAction(formIdToDelete) as any);
        toast({
          title: "Success",
          description: "Form deleted successfully!"
        });
      } catch (error) {
        console.error('Delete form error:', error);
        toast({
          title: "Error",
          description: "Failed to delete form",
          variant: "destructive"
        });
      } finally {
        setIsDeleteModalOpen(false);
        setFormIdToDelete(null);
      }
    }
  };

  const duplicateForm = async (id: string) => {
    try {
      await dispatch(duplicateFormAction(id) as any);
      toast({
        title: "Success",
        description: "Form duplicated successfully!"
      });
    } catch (error) {
      console.error('Duplicate form error:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate form",
        variant: "destructive"
      });
    }
  };

  const handleImportForm = async () => {
    try {
      const formData = JSON.parse(importedFormData);
      if (!formData.name || !formData.config) {
        toast({
          title: "Error",
          description: "Invalid form data. Ensure 'name' and 'config' are present.",
          variant: "destructive"
        });
        return;
      }

      // Dispatch create form action
      // await dispatch(createForm(formData) as any);

      toast({
        title: "Success",
        description: "Form imported successfully!"
      });
      setIsImportModalOpen(false);
      setImportedFormData('');
    } catch (error) {
      console.error('Import form error:', error);
      toast({
        title: "Error",
        description: "Failed to import form. Invalid JSON format.",
        variant: "destructive"
      });
    }
  };

  const createNewForm = async () => {
    const newFormConfig: FormConfig = {
      title: 'Untitled Form',
      description: 'Form description',
      elements: [],
      settings: {
        submitButton: {
          enabled: true,
          text: 'Submit'
        },
        termsAndConditions: {
          enabled: false,
          required: false,
          text: 'I agree to the terms and conditions'
        },
        preview: {
          width: "Full",
          nesting: false
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
  };

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
            Manage your forms with ease
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
          <Input
            type="text"
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${theme === 'light'
              ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500'
              : 'bg-gray-700/70 border-gray-600 text-white'
              } w-full md:w-auto`}
          />
          <div className="flex gap-2">
            <Button onClick={handleCreateForm} className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>Create Form</span>
            </Button>
            <Button onClick={() => setIsImportModalOpen(true)} variant="outline" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Import Form</span>
            </Button>
          </div>
        </div>

        <Card className={`${theme === 'light'
          ? 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl'
          : 'bg-gray-800/70 border border-gray-700/50'
          }`}>
          <CardHeader>
            <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Form List</CardTitle>
            <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
              Manage and edit your existing forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms?.map((form: any) => (
                  <TableRow key={form.primary_id}>
                    <TableCell className="font-medium">{form.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => viewForm(form.primary_id)} variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => editForm(form.primary_id)} variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => duplicateForm(form.primary_id)} variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the form and all of its data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={cancelDeleteForm}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={deleteForm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Delete Confirmation Modal */}
        <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <AlertDialogContent className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border border-gray-200`}>
            <AlertDialogHeader>
              <AlertDialogTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                This action cannot be undone. This will permanently delete the form and all of its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDeleteForm}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteForm} className="bg-red-600 text-white hover:bg-red-500">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Import Form Modal */}
        <AlertDialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
          <AlertDialogContent className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border border-gray-200`}>
            <AlertDialogHeader>
              <AlertDialogTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Import Form</AlertDialogTitle>
              <AlertDialogDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                Paste the JSON data of the form to import.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogContent>
              <Input
                type="textarea"
                placeholder="Paste form JSON here..."
                value={importedFormData}
                onChange={(e) => setImportedFormData(e.target.value)}
                className={`${theme === 'light'
                  ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500'
                  : 'bg-gray-700/70 border-gray-600 text-white'
                  } w-full`}
              />
            </AlertDialogContent>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsImportModalOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleImportForm}>Import</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Dashboard;
