import api, { API_CONFIG, formatUrl, getApiUrl } from './index';
import { v4 as uuidv4 } from 'uuid';
import { FormConfig } from '@/components/FormBuilder/types';

export interface FormData {
  primary_id: string;
  name: string;
  createdAt: string;
  last_modified: string;
  submissions: number;
  published: boolean;
  config: FormConfig;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
  submissions?: number;
}

// Helper function to map API response to FormData interface
const mapApiResponseToFormData = (apiResponse: any): FormData => {
  return {
    primary_id: apiResponse.primary_id || apiResponse.id || apiResponse.created_at || uuidv4(),
    name: apiResponse.name,
    createdAt: apiResponse.created_at,
    last_modified: apiResponse.last_modified,
    submissions: apiResponse.submissions || 0,
    published: apiResponse.published || false,
    config: apiResponse.config
  };
};

// In-memory storage for forms (since backend doesn't support individual form retrieval)
let cachedForms: FormData[] = [];

// Forms API services
export const formsApi = {
  // Get all forms
  getAllForms: async (): Promise<FormData[]> => {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.GET_ALL);
      console.log("Fetching forms from URL:", url);
      const response = await api.get(url);
      console.log("getAllForms response:", response);
      console.log("getAllForms response status:", response.status);
      console.log("getAllForms response data:", response.data);
      
      if (response.status >= 200 && response.status < 300) {
        // Handle different response structures
        let formsData = response.data;
        
        // If response.data is not an array, try to extract the array
        if (!Array.isArray(formsData)) {
          console.log("Response data is not an array, checking for nested array...");
          if (formsData.forms && Array.isArray(formsData.forms)) {
            formsData = formsData.forms;
          } else if (formsData.data && Array.isArray(formsData.data)) {
            formsData = formsData.data;
          } else {
            console.warn("No array found in response, returning empty array");
            return [];
          }
        }
        
        console.log("Processing forms data:", formsData);
        const forms = formsData.map(mapApiResponseToFormData);
        cachedForms = forms; // Cache the forms
        console.log("Mapped forms:", forms);
        return forms;
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        throw new Error(`Failed to fetch forms: ${error.response.data?.message || error.response.status}`);
      }
      throw new Error("Failed to fetch forms: " + (error as Error).message);
    }
  },

  // Get a form by primary_id (using cached data since backend doesn't support this)
  getFormById: async (primary_id: string): Promise<FormData | {}> => {
    try {
      // First try to get from cache

         const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.GET_BY_ID);
      console.log("Fetching forms from URL:111111", url+primary_id);
      const response = await api.get( url+primary_id);
      console.log("Fetching forms from URL:111111", response);
      console.log("getAllForms response status:", response.status);
      console.log("getAllForms response data:", response.data);

      if (response.status >= 200 && response.status < 300) {
        // Handle different response structures
        let formsData = response.data;
        
        // If response.data is not an array, try to extract the array
        if (!Array.isArray(formsData)) {
          console.log("Response data is not an array, checking for nested array...");
          if (formsData.forms && Array.isArray(formsData.forms)) {
            formsData = formsData.forms;
          } else if (formsData.data && Array.isArray(formsData.data)) {
            formsData = formsData.data;
          } else {
            console.warn("No array found in response, returning empty array");
            return {};
          }
        }

        console.log(formsData[0])

      
        return formsData[0];
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
      
    } catch (error) {
      console.error(`Error fetching form ${primary_id}:`, error);
      throw new Error("Failed to fetch form: " + (error as Error).message);
    }
  },

  // Create a new form
  createForm: async (formData: Omit<FormData, 'primary_id' | 'createdAt' | 'last_modified' | 'submissions'>): Promise<FormData> => {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.CREATE);

      const response = await api.post(url, formData);
      if (response.status >= 200 && response.status < 300) {
        const mappedForm = mapApiResponseToFormData(response.data);
        console.log("Mapped form data:", mappedForm);
        
        // Add to cache
        // cachedForms.push(mappedForm);
        
        return mappedForm;
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating form:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        throw new Error(`Failed to create form: ${error.response.data?.message || error.response.status}`);
      }
      throw new Error("Failed to create form: " + (error as Error).message);
    }
  },

  // Update an existing form (using create endpoint since update doesn't exist)
  updateForm: async (formData: FormData): Promise<FormData> => {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.UPDATE);
      console.log("Updating form with URL:", url);
      console.log("Form data being sent:", formData);
      
      const response = await api.post(url, formData);
      console.log("updateForm response:", response);
      
      if (response.status >= 200 && response.status < 300) {
        const mappedForm = mapApiResponseToFormData(response.data);
        
        // Update cache
        const index = cachedForms.findIndex(form => form.primary_id === formData.primary_id);
        if (index !== -1) {
          cachedForms[index] = mappedForm;
        } else {
          cachedForms.push(mappedForm);
        }
        
        return mappedForm;
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error updating form ${formData.primary_id}:`, error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        throw new Error(`Failed to update form: ${error.response.data?.message || error.response.status}`);
      }
      throw new Error("Failed to update form: " + (error as Error).message);
    }
  },

  // Delete a form (placeholder since backend doesn't support this)
  deleteForm: async (formId: string): Promise<void> => {
    try {
      // Remove from cache
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.DELETE);
      
      const response = await api.delete(url+formId);
      console.log("updateForm response:", response);
      
      if (response.status >= 200 && response.status < 300) {
        const mappedForm = response.data
        
        return mappedForm;
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
     
    } catch (error) {
      console.error(`Error deleting form ${formId}:`, error);
      throw new Error("Failed to delete form: " + (error as Error).message);
    }
  },

  // Get all submissions for a form (placeholder)
  getFormSubmissions: async (formId: string): Promise<FormSubmission[] | []> => {
    try {
       const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.SUBMISSIONS.GET_ALL);

      const response = await api.get(url+formId);
      if (response.status >= 200 && response.status < 300) {
        
    let formsData = response.data;
        
        // If response.data is not an array, try to extract the array
        if (!Array.isArray(formsData)) {
          console.log("Response data is not an array, checking for nested array...");
          if (formsData.forms && Array.isArray(formsData.forms)) {
            formsData = formsData.forms;
          } else if (formsData.data && Array.isArray(formsData.data)) {
            formsData = formsData.data;
          } else {
            console.warn("No array found in response, returning empty array");
            return [];
          }
        }
    
      
      
        return formsData;
    
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error getting submissions for form ${formId}:`, error);
      return [];
    }
  },

  // Submit a form response (placeholder)
  submitFormResponse: async (formId: number, submissionData: Record<string, any>): Promise<FormSubmission> => {
    try {

      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.SUBMISSIONS.SUBMIT);

      const response = await api.post(url,  {form_id: formId,data: submissionData });
      if (response.status >= 200 && response.status < 300) {
        
        let submission = response.data
          return submission;
        
    
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
     
    } catch (error) {
      console.error(`Error submitting form ${formId}:`, error);
      throw new Error("Failed to submit form: " + (error as Error).message);
    }
  },
  getPreviewData: async (formId: string): Promise<FormData  | {}> => {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.PREVIEW);
      const response = await api.get( url+formId);
   
      if (response.status >= 200 && response.status < 300) {
        // Handle different response structures
        let formsData = response.data;
        
        // If response.data is not an array, try to extract the array
        if (!Array.isArray(formsData)) {
          console.log("Response data is not an array, checking for nested array...");
          if (formsData.forms && Array.isArray(formsData.forms)) {
            formsData = formsData.forms;
          } else if (formsData.data && Array.isArray(formsData.data)) {
            formsData = formsData.data;
          } else {
            console.warn("No array found in response, returning empty array");
            return {};
          }
        }
    
      
      
        return formsData[0];
      }
    } catch (error) {
      console.error(`Error submitting form ${formId}:`, error);
      throw new Error("Failed to submit form: " + (error as Error).message);
    }
  },
  getFormNameID: async (): Promise<FormData  | []> => {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.GET_FORM_NAME);
      const response = await api.get( url);
   
      if (response.status >= 200 && response.status < 300) {
        // Handle different response structures
        let formsData = response.data;
        
        // If response.data is not an array, try to extract the array
        if (!Array.isArray(formsData)) {
          console.log("Response data is not an array, checking for nested array...");
          if (formsData.forms && Array.isArray(formsData.forms)) {
            formsData = formsData.forms;
          } else if (formsData.data && Array.isArray(formsData.data)) {
            formsData = formsData.data;
          } else {
            console.warn("No array found in response, returning empty array");
            return [];
          }
        }

        console.log('form_data',formsData)
    
      
      
        return formsData;
      }
    } catch (error) {
      console.error(`Get submittion forms :`, error);
      throw new Error("Get submittion forms : " + (error as Error).message);
    }
  },
    deleteSubmittionData: async (formId: string): Promise<void> => {
    try {
      // Remove from cache
      const url = getApiUrl(API_CONFIG.ENDPOINTS.FORMS.SUBMISSIONS.DELETE);
      
      const response = await api.delete(url+formId);
      console.log("updateForm response:", response);
      
      if (response.status >= 200 && response.status < 300) {
        const mappedForm = response.data
        
        return mappedForm;
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
     
    } catch (error) {
      console.error(`Error deleting form ${formId}:`, error);
      throw new Error("Failed to delete form: " + (error as Error).message);
    }
  },
};
