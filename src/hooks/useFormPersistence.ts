
import { useState, useEffect } from 'react';
import { FormConfig } from '@/components/FormBuilder/types';

export const useFormPersistence = (formId: string) => {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveForm = (config: FormConfig) => {
    try {
      localStorage.setItem(`formBuilder_${formId}`, JSON.stringify(config));
      setFormConfig(config);
    } catch (error) {
      console.error('Failed to save form:', error);
    }
  };

  const loadForm = () => {
    try {
      const saved = localStorage.getItem(`formBuilder_${formId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormConfig(parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Failed to load form:', error);
    }
    return null;
  };

  const deleteForm = () => {
    try {
      localStorage.removeItem(`formBuilder_${formId}`);
      setFormConfig(null);
    } catch (error) {
      console.error('Failed to delete form:', error);
    }
  };

  const getAllForms = () => {
    const forms: { id: string; config: FormConfig }[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('formBuilder_')) {
          const id = key.replace('formBuilder_', '');
          const config = JSON.parse(localStorage.getItem(key) || '{}');
          forms.push({ id, config });
        }
      }
    } catch (error) {
      console.error('Failed to get all forms:', error);
    }
    return forms;
  };

  useEffect(() => {
    loadForm();
    setIsLoading(false);
  }, [formId]);

  return {
    formConfig,
    setFormConfig,
    saveForm,
    loadForm,
    deleteForm,
    getAllForms,
    isLoading
  };
};
