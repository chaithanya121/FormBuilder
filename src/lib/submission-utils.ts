
import { formsApi, FormSubmission } from '@/services/api/forms';
import { triggerIntegrations } from '@/services/integrations';

// Save a new form submission
export const saveFormSubmission = async (formId: string, submissionData: Record<string, any>): Promise<void> => {
  try {
    console.log('Saving form submission:', { formId, submissionData });
    
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
    
    console.log('Form submission saved and integrations triggered successfully');
    
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
      console.log('Form submission count updated:', formToUpdate.submissions);
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

// Test integrations for a form
export const testFormIntegrations = async (formId: string): Promise<void> => {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test submission to verify integrations are working correctly.',
      timestamp: new Date().toISOString(),
      source: 'integration_test'
    };

    console.log('Testing integrations for form:', formId);
    await triggerIntegrations(formId, testData);
    console.log('Integration test completed successfully');
  } catch (error) {
    console.error('Error testing integrations:', error);
    throw error;
  }
};
