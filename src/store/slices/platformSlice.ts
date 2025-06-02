import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormConfig } from '@/components/FormBuilder/types';
import { formsApi, FormData} from '@/services/api/forms';
import { platformApi } from '@/services/api/platform';


interface Icon {
  data: string;
  content_type: string;
}


interface PlatformStats {
  projects: number;
  submissions: number;
  active: boolean;
  growth: string;
  revenue: string;
}


export interface PlatForm {
    id: string;
    name: string;
    description: string;
    icon: Icon; // Changed to use the Icon interface
    gradient: string;
    bgGradient: string; // Changed from bg_gradient_light/dark to a single bgGradient
    stats: PlatformStats; // Nested object for statistics
    link: string;
    features: string[]; // Explicitly typed as string array
    popularity: number;
}

export interface PlatFormState {
    platform: PlatForm[];
    loading: boolean;
    error: any;
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
            // Assuming platformApi.getPlatForm() now returns data conforming to the PlatForm[] structure
            const platform = await platformApi.getPlatForm();
            return platform;
        } catch (error) {
            console.error('Failed to fetch platform:', error);
            // It's generally better to reject with a serializable error message
            // or an object containing error details.
            return rejectWithValue(error.message || 'An unknown error occurred');
        }
    }
);

export const platformSlice = createSlice({
    name: 'platform',
    initialState,
    reducers: {
        setCurrentPlatform: (state, action: PayloadAction<PlatForm[]>) => {
            state.platform = action.payload;
        },
        resetFormsState: () => initialState, // Consider renaming this if it's specific to forms
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlatform.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPlatform.fulfilled, (state, action) => {
                state.loading = false;
                // Ensure action.payload is an array, defaulting to an empty array if not.
                state.platform = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getPlatform.rejected, (state, action) => {
                state.loading = false;
                // action.payload will contain the rejected value from rejectWithValue
                state.error = action.payload || action.error.message || 'Failed to fetch platform';
            });
    },
});

export const { setCurrentPlatform, resetFormsState, clearError } = platformSlice.actions;

export default platformSlice.reducer;
