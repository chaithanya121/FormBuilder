
import { formsApi, FormSubmission, FormData } from '@/services/api/forms';

// Save a new form submission
export const saveFormSubmission = async (formId: string, submissionData: Record<string, any>): Promise<void> => {
  try {
    // Convert string to number for API call
    const numericFormId = parseInt(formId, 10);
    if (isNaN(numericFormId)) {
      throw new Error('Invalid form ID');
    }
    
    await formsApi.submitFormResponse(numericFormId, submissionData);
    await updateFormSubmissionCount(formId);
  } catch (error) {
    console.error('Error saving form submission:', error);
    throw error;
  }
};

// Update the submission count for a form
const updateFormSubmissionCount = async (formId: string): Promise<void> => {
  try {
    const form = await formsApi.getFormById(formId);
    if (form && 'primary_id' in form && form.primary_id) {
      const formToUpdate: FormData = {
        primary_id: form.primary_id,
        name: form.name || 'Untitled Form',
        createdAt: form.createdAt || new Date().toISOString(),
        last_modified: new Date().toISOString(),
        published: form.published || false,
        config: form.config || {
          title: 'Untitled Form',
          description: 'Form description',
          elements: [],
          settings: {
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
        },
        submissions: (form.submissions || 0) + 1
      };
      await formsApi.updateForm(formToUpdate);
    }
  } catch (error) {
    console.error('Error updating form submission count:', error);
  }
};

// Get submissions for a specific form
export const getFormSubmissions = async (formId: string): Promise<FormSubmission[]> => {
  try {
    return await formsApi.getFormSubmissions(formId);
  } catch (error) {
    console.error('Error getting form submissions:', error);
    return [];
  }
};
