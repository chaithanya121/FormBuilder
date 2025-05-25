import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  OverEvent,
  SensorContext,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { generate } from 'randomstring';
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { PlusCircle, Save, Eye, Upload, GripVertical, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setCurrentForm, updateFormAction, createForm, fetchFormById } from '@/store/slices/formsSlice';
import { togglePreviewMode, setPreviewMode } from '@/store/slices/uiSlice';
import { FormElement, FormConfig } from './types';
import { ElementSelect } from './element-select';
import { RenderElement } from './render-element';
import { SettingsPanel } from './settings-panel';
import { PublishButton } from './publish-button';
import { useTheme } from '@/components/theme-provider';

const FormBuilder = () => {
  const { formId } = useParams<{ formId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const currentForm = useSelector((state: any) => state.forms.currentForm);
  const previewMode = useSelector((state: any) => state.ui.previewMode);

  const [formName, setFormName] = useState('Untitled Form');
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: 'Untitled Form',
    description: 'Form description',
    elements: [],
    settings: {
      submitButtonText: 'Submit',
      successMessage: 'Thank you for your submission!',
      redirectUrl: '',
      allowMultipleSubmissions: true,
      showProgressBar: false,
    }
  });
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (formId && formId !== 'new') {
      dispatch(fetchFormById(formId));
    } else {
      // Initialize with a new form for 'new' route
      setFormName('Untitled Form');
      setFormConfig({
        title: 'Untitled Form',
        description: 'Form description',
        elements: [],
        settings: {
          submitButtonText: 'Submit',
          successMessage: 'Thank you for your submission!',
          redirectUrl: '',
          allowMultipleSubmissions: true,
          showProgressBar: false,
        }
      });
    }
  }, [formId, dispatch]);

  useEffect(() => {
    if (currentForm && 'config' in currentForm && currentForm.config) {
      setFormConfig(currentForm.config);
      setIsPublished(currentForm.published || false);
      setFormName(currentForm.name || 'Untitled Form');
    }
  }, [currentForm]);

  const addElement = (element: Omit<FormElement, 'id'>) => {
    const newElement: FormElement = { ...element, id: generate(7) };
    setFormConfig(prevConfig => ({
      ...prevConfig,
      elements: [...prevConfig.elements, newElement],
    }));
  };

  const handleSelectElement = (element: FormElement) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (id: string, updatedElement: Partial<FormElement>) => {
    setFormConfig(prevConfig => ({
      ...prevConfig,
      elements: prevConfig.elements.map(element =>
        element.id === id ? { ...element, ...updatedElement } : element
      ),
    }));
    setSelectedElement(null);
  };

  const handleDeleteElement = (id: string) => {
    setFormConfig(prevConfig => ({
      ...prevConfig,
      elements: prevConfig.elements.filter(element => element.id !== id),
    }));
    setSelectedElement(null);
  };

  const handleUpdateFormConfig = (updatedConfig: Partial<FormConfig>) => {
    setFormConfig(prevConfig => ({ ...prevConfig, ...updatedConfig }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setFormConfig(prevConfig => {
        const activeIndex = prevConfig.elements.findIndex(element => element.id === active.id);
        const overIndex = prevConfig.elements.findIndex(element => element.id === over.id);

        if (activeIndex === -1 || overIndex === -1) {
          return prevConfig;
        }

        return {
          ...prevConfig,
          elements: arrayMove(prevConfig.elements, activeIndex, overIndex),
        };
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTogglePreviewMode = () => {
    dispatch(togglePreviewMode());
  };

  const handleSaveForm = async () => {
    if (!formConfig || !formName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a form name and ensure the form has content",
        variant: "destructive"
      });
      return;
    }

    try {
      const formData = {
        name: formName,
        last_modified: new Date().toISOString(),
        config: formConfig,
        primary_id: formId && formId !== 'new' ? formId : undefined,
        createdAt: formId && formId !== 'new' ? undefined : new Date().toISOString(),
        submissions: 0,
        published: isPublished
      };

      if (formId && formId !== 'new') {
        // Ensure all required fields are present for update
        const updateData = {
          ...formData,
          primary_id: formId,
          name: formName,
          createdAt: new Date().toISOString() // Add required field
        };
        await dispatch(updateFormAction(updateData as any));
      } else {
        const result = await dispatch(createForm(formData));
        if (createForm.fulfilled.match(result)) {
          navigate(`/form-builder/${result.payload.primary_id}`);
        }
      }

      toast({
        title: "Success",
        description: `Form ${formId && formId !== 'new' ? 'updated' : 'created'} successfully`
      });
    } catch (error) {
      console.error('Save form error:', error);
      toast({
        title: "Error",
        description: "Failed to save form",
        variant: "destructive"
      });
    }
  };

  const handlePublishForm = async () => {
    if (!formConfig || !formName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a form name and ensure the form has content",
        variant: "destructive"
      });
      return;
    }

    try {
      const formData = {
        published: !isPublished,
        last_modified: new Date().toISOString(),
        config: formConfig,
        primary_id: formId && formId !== 'new' ? formId : undefined,
        name: formName,
        createdAt: new Date().toISOString(),
        submissions: 0
      };

      await dispatch(updateFormAction(formData as any));
      setIsPublished(!isPublished);

      toast({
        title: "Success",
        description: `Form ${!isPublished ? 'published' : 'unpublished'} successfully`
      });
    } catch (error) {
      console.error('Publish form error:', error);
      toast({
        title: "Error",
        description: "Failed to publish form",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' : 'bg-gray-900'} text-${theme === 'light' ? 'gray-800' : 'white'}`}>
      <div className="container mx-auto p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 mt-6"
        >
          <h1 className={`text-3xl font-bold tracking-tight mb-3 md:text-4xl lg:text-5xl ${theme === 'light'
            ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            : 'text-white'
          }`}>
            Form Builder
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-blue-100/80'}`}>
            Design and customize your form with ease
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Panel - Element Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/4"
          >
            <Card className={`${theme === 'light' ? 'bg-white/80 backdrop-blur-sm border border-white/20' : 'bg-gray-800/70 border border-gray-700/50'} shadow-lg`}>
              <CardHeader>
                <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Add Elements</CardTitle>
                <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Choose elements to add to your form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ElementSelect onSelect={addElement} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Center Panel - Form Preview and Drag & Drop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-2/4"
          >
            <Card className={`${theme === 'light' ? 'bg-white/80 backdrop-blur-sm border border-white/20' : 'bg-gray-800/70 border border-gray-700/50'} shadow-lg`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Form Preview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleTogglePreviewMode}
                      className={`${theme === 'light' ? 'bg-white/50 border-gray-300 text-gray-600 hover:bg-gray-100' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600'} transition-colors duration-200`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {previewMode ? 'Edit Mode' : 'Preview Mode'}
                    </Button>
                  </div>
                </div>
                <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Drag and drop elements to reorder</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Form Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className={`${theme === 'light' ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500' : 'bg-gray-700/70 border-gray-600 text-white'} mb-4`}
                />
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={formConfig.elements.map(element => element.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {formConfig.elements.map((element) => (
                        <RenderElement
                          key={element.id}
                          element={element}
                          onSelect={handleSelectElement}
                          previewMode={previewMode}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - Element Settings */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/4"
          >
            <Card className={`${theme === 'light' ? 'bg-white/80 backdrop-blur-sm border border-white/20' : 'bg-gray-800/70 border border-gray-700/50'} shadow-lg`}>
              <CardHeader>
                <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Element Settings</CardTitle>
                <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Customize the selected element</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedElement ? (
                  <SettingsPanel
                    element={selectedElement}
                    onUpdate={(updatedElement) => handleUpdateElement(selectedElement.id, updatedElement)}
                    onDelete={() => handleDeleteElement(selectedElement.id)}
                  />
                ) : (
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>Select an element to customize it.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Panel - Form Settings and Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4"
        >
          <Card className={`${theme === 'light' ? 'bg-white/80 backdrop-blur-sm border border-white/20' : 'bg-gray-800/70 border border-gray-700/50'} shadow-lg`}>
            <CardHeader>
              <CardTitle className={theme === 'light' ? 'text-gray-800' : 'text-white'}>Form Settings</CardTitle>
              <CardDescription className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Manage form-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="formTitle" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Form Title</Label>
                <Input
                  type="text"
                  id="formTitle"
                  placeholder="Form Title"
                  value={formConfig.title}
                  onChange={(e) => handleUpdateFormConfig({ title: e.target.value })}
                  className={`${theme === 'light' ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500' : 'bg-gray-700/70 border-gray-600 text-white'}`}
                />
              </div>
              <div>
                <Label htmlFor="formDescription" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Description</Label>
                <Input
                  type="text"
                  id="formDescription"
                  placeholder="Form Description"
                  value={formConfig.description}
                  onChange={(e) => handleUpdateFormConfig({ description: e.target.value })}
                  className={`${theme === 'light' ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500' : 'bg-gray-700/70 border-gray-600 text-white'}`}
                />
              </div>
              <div className="flex justify-between items-center">
                <Button 
                  onClick={handleSaveForm}
                  className={`${theme === 'light'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                  } text-white shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Form
                </Button>
                <PublishButton isPublished={isPublished} onPublish={handlePublishForm} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FormBuilder;
