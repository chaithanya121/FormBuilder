
import { v4 as uuidv4 } from 'uuid';
import { formsApi, FormSubmission } from '@/services/api/forms';

// Save a new form submission
export const saveFormSubmission = async (formId: string, submissionData: Record<string, any>): Promise<void> => {
  try {
    await formsApi.submitFormResponse(formId, submissionData);
    updateFormSubmissionCount(formId);
  } catch (error) {
    console.error('Error saving form submission:', error);
    throw error;
  }
};

// Update the submission count for a form
const updateFormSubmissionCount = async (formId: string): Promise<void> => {
  try {
    const form = await formsApi.getFormById(formId);
    if (form) {
      await formsApi.updateForm({
        ...form,
        submissions: (form.submissions || 0) + 1
      });
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
