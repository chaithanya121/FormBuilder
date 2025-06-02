
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormConfig } from '@/components/FormBuilder/types';
import { formsApi, FormData} from '@/services/api/forms';
import { platformApi } from '@/services/api/platform';


export interface PlatForm {
  
    id: string,
    name:string,
    description: string,
    icon_content_type:string,
    icon:string,
    gradient: string,
    bg_gradient_light: string,
    bg_gradient_dark: string,
    projects_count: number,
    submissions_count: number,
    is_active: boolean,
    growth_percentage: string,
    revenue: string,
    link: string,
    features: [],
    popularity: number
}
interface PlatFormState {
  platform: PlatForm[];
  loading: boolean,
  error: any,
 
}

const initialState: PlatFormState = {
  platform: [],
    loading: false,
  error: null,
};

export const getPlatform = createAsyncThunk(
  'platform/getPlatform',
  async (_, { rejectWithValue }) => {
    try {
      const platform = await platformApi.getPlatForm();
      return platform;
    } catch (error) {
      console.error('Failed to update resume:', error);
      return error; // Return the data as-is for mock functionality
    }
  }
);



export const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    setCurrentPlatform: (state, action: PayloadAction<PlatFormState['platform']>) => {
      state.platform = action.payload;
    },
    resetFormsState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all forms
    builder
      
          // Update resume
          .addCase(getPlatform.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getPlatform.fulfilled, (state, action) => {
            state.loading = false;
          
              state.platform = action.payload;
          
          })
          .addCase(getPlatform.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update resume';
          })
   

  },
});

export const { setCurrentPlatform } = platformSlice.actions;

export default platformSlice.reducer;
