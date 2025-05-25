import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormConfig } from '@/components/FormBuilder/types';
import { formsApi, FormData } from '@/services/api/forms';

interface FormsState {
  forms: FormData[];
  currentForm: {
    primary_id: string;
    config: FormConfig;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormsState = {
  forms: [],
  currentForm: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchForms = createAsyncThunk(
  'forms/fetchForms',
  async (_, { rejectWithValue }) => {
    try {
      const forms = await formsApi.getAllForms();
      console.log('Redux fetchForms result:', forms);
      return forms;
    } catch (error) {
      console.error('fetchForms error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchFormById = createAsyncThunk(
  'forms/fetchFormById',
  async (formId: string, { rejectWithValue }) => {
    try {
      const form = await formsApi.getFormById(formId);
      console.log('Redux fetchFormById result:', form);
      return form;
    } catch (error) {
      console.error('fetchFormById error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createForm = createAsyncThunk(
  'forms/createForm',
  async (formData: Omit<FormData, 'primary_id' | 'createdAt' | 'last_modified' | 'submissions'>, { rejectWithValue }) => {
    try {
      console.log('Redux createForm called with:', formData);
      const result = await formsApi.createForm(formData);
      console.log('Redux createForm result:', result);
      
      // Validate that the result has a primary_id
      if (!result.primary_id) {
        console.error('Created form missing primary_id:', result);
        return rejectWithValue('Created form is missing required primary_id field');
      }
      
      return result;
    } catch (error) {
      console.error('Redux createForm error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateFormAction = createAsyncThunk(
  'forms/updateForm',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      console.log('Redux updateForm called with:', formData);
      const result = await formsApi.updateForm(formData);
      console.log('Redux updateForm result:', result);
      return result;
    } catch (error) {
      console.error('Redux updateForm error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteFormAction = createAsyncThunk(
  'forms/deleteForm',
  async (formId: string, { rejectWithValue }) => {
    try {
      await formsApi.deleteForm(formId);
      return formId;
    } catch (error) {
      console.error('Redux deleteForm error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const duplicateFormAction = createAsyncThunk(
  'forms/duplicateForm',
  async (formId: string, { rejectWithValue }) => {
    try {
      const form = await formsApi.getFormById(formId);
      
      // Check if form exists and has the required properties
      if (!form || typeof form !== 'object' || !('name' in form) || !('config' in form)) {
        return rejectWithValue('Form not found or invalid');
      }
      
      const formData = form as FormData;
      
      // Create a copy with a new name and ensure all required properties are present
      const duplicatedForm: Omit<FormData, 'primary_id' | 'createdAt' | 'last_modified' | 'submissions'> = {
        name: `${formData.name} (Copy)`,
        published: formData.published || false,
        config: formData.config
      };
      
      const result = await formsApi.createForm(duplicatedForm);
      console.log('Redux duplicateForm result:', result);
      return result;
    } catch (error) {
      console.error('Redux duplicateForm error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setCurrentForm: (state, action: PayloadAction<FormsState['currentForm']>) => {
      state.currentForm = action.payload;
    },
    resetFormsState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all forms
    builder.addCase(fetchForms.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      state.loading = false;
      state.forms = action.payload;
      state.error = null;
    });
    builder.addCase(fetchForms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to fetch forms';
    });

    // Fetch form by primary_id
    builder.addCase(fetchFormById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFormById.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && typeof action.payload === 'object' && 'primary_id' in action.payload) {
        const form = action.payload as FormData;
        state.currentForm = {
          primary_id: form.primary_id,
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
          }
        };
      }
      state.error = null;
    });
    builder.addCase(fetchFormById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to fetch form';
    });

    // Create form
    builder.addCase(createForm.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createForm.fulfilled, (state, action) => {
      state.loading = false;
      console.log('Redux createForm fulfilled with:', action.payload);
      state.forms.push(action.payload);
      state.currentForm = {
        primary_id: action.payload.primary_id,
        config: action.payload.config
      };
      state.error = null;
    });
    builder.addCase(createForm.rejected, (state, action) => {
      state.loading = false;
      console.log('Redux createForm rejected with:', action.payload);
      state.error = action.payload as string || 'Failed to create form';
    });

    // Update form
    builder.addCase(updateFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateFormAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.forms.findIndex(form => form.primary_id === action.payload.primary_id);
      if (index !== -1) {
        state.forms[index] = action.payload;
      }
      if (state.currentForm && state.currentForm.primary_id === action.payload.primary_id) {
        state.currentForm.config = action.payload.config;
      }
      state.error = null;
    });
    builder.addCase(updateFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to update form';
    });

    builder.addCase(deleteFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFormAction.fulfilled, (state, action) => {
      state.loading = false;
      state.forms = state.forms.filter(form => form.primary_id !== action.payload);
      if (state.currentForm && state.currentForm.primary_id === action.payload) {
        state.currentForm = null;
      }
      state.error = null;
    });
    builder.addCase(deleteFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to delete form';
    });

    // Duplicate form
    builder.addCase(duplicateFormAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(duplicateFormAction.fulfilled, (state, action) => {
      state.loading = false;
      state.forms.push(action.payload);
      state.error = null;
    });
    builder.addCase(duplicateFormAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to duplicate form';
    });
  },
});

export const { setCurrentForm, resetFormsState, clearError } = formsSlice.actions;

export default formsSlice.reducer;
