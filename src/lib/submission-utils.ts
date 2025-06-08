
import { formsApi, FormSubmission } from '@/services/api/forms';
import { triggerIntegrations } from '@/services/integrations';

// Save a new form submission
export const saveFormSubmission = async (formId: string, submissionData: Record<string, any>): Promise<void> => {
  try {
    // Convert string to number for API call
    const numericFormId = parseInt(formId, 10);
    if (isNaN(numericFormId)) {
      throw new Error('Invalid form ID');
    }
    
    // Save the submission to the database
    await formsApi.submitFormResponse(numericFormId, submissionData);
    
    // Update form submission count
    await updateFormSubmissionCount(formId);
    
    // Trigger integrations for this form submission
    console.log('Triggering integrations for form submission:', { formId, submissionData });
    await triggerIntegrations(formId, submissionData);
    
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
      const formToUpdate = {
        primary_id: form.primary_id,
        name: form.name,
        createdAt: form.createdAt,
        last_modified: new Date().toISOString(),
        published: form.published || false,
        config: form.config,
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
