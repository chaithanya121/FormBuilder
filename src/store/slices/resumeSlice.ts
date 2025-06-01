
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ResumeData {
  id: string;
  name: string;
  template: string;
  downloads: number;
  views: number;
  status: 'published' | 'draft';
  lastUpdated: string;
  content: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
      summary: string;
    };
    experience: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      startDate: string;
      endDate: string;
    }>;
    skills: string[];
  };
}

interface ResumeState {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  loading: boolean;
  error: string | null;
  templates: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
  }>;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  templates: [
    {
      id: '1',
      name: 'Modern Professional',
      description: 'Clean and minimalist design',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop',
      category: 'Professional'
    },
    {
      id: '2',
      name: 'Creative Designer',
      description: 'Colorful and creative layout',
      image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&h=400&fit=crop',
      category: 'Creative'
    },
    {
      id: '3',
      name: 'Executive Style',
      description: 'Traditional corporate format',
      image: 'https://images.unsplash.com/photo-1586281380923-84c3-4bb3-8b46-e4c9956d77ac?w=300&h=400&fit=crop',
      category: 'Executive'
    }
  ]
};

// Async thunks for API calls
export const fetchResumes = createAsyncThunk(
  'resumes/fetchResumes',
  async (_, { rejectWithValue }) => {
    try {
      // Example API call structure
      const response = await fetch('/api/resumes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      
      const data = await response.json();
      console.log('Fetched resumes:', data);
      return data;
    } catch (error) {
      console.error('fetchResumes error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createResume = createAsyncThunk(
  'resumes/createResume',
  async (resumeData: Omit<ResumeData, 'id' | 'downloads' | 'views' | 'lastUpdated'>, { rejectWithValue }) => {
    try {
      // Example API call structure
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(resumeData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create resume');
      }
      
      const data = await response.json();
      console.log('Created resume:', data);
      return data;
    } catch (error) {
      console.error('createResume error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumes/updateResume',
  async (resumeData: ResumeData, { rejectWithValue }) => {
    try {
      // Example API call structure
      const response = await fetch(`/api/resumes/${resumeData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(resumeData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update resume');
      }
      
      const data = await response.json();
      console.log('Updated resume:', data);
      return data;
    } catch (error) {
      console.error('updateResume error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/deleteResume',
  async (resumeId: string, { rejectWithValue }) => {
    try {
      // Example API call structure
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }
      
      console.log('Deleted resume:', resumeId);
      return resumeId;
    } catch (error) {
      console.error('deleteResume error:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setCurrentResume: (state, action: PayloadAction<ResumeData | null>) => {
      state.currentResume = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetResumeState: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch resumes
    builder.addCase(fetchResumes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchResumes.fulfilled, (state, action) => {
      state.loading = false;
      state.resumes = action.payload;
      state.error = null;
    });
    builder.addCase(fetchResumes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to fetch resumes';
    });

    // Create resume
    builder.addCase(createResume.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createResume.fulfilled, (state, action) => {
      state.loading = false;
      state.resumes.push(action.payload);
      state.currentResume = action.payload;
      state.error = null;
    });
    builder.addCase(createResume.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to create resume';
    });

    // Update resume
    builder.addCase(updateResume.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateResume.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.resumes.findIndex(resume => resume.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
      if (state.currentResume && state.currentResume.id === action.payload.id) {
        state.currentResume = action.payload;
      }
      state.error = null;
    });
    builder.addCase(updateResume.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to update resume';
    });

    // Delete resume
    builder.addCase(deleteResume.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteResume.fulfilled, (state, action) => {
      state.loading = false;
      state.resumes = state.resumes.filter(resume => resume.id !== action.payload);
      if (state.currentResume && state.currentResume.id === action.payload) {
        state.currentResume = null;
      }
      state.error = null;
    });
    builder.addCase(deleteResume.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to delete resume';
    });
  },
});

export const { setCurrentResume, clearError, resetResumeState } = resumeSlice.actions;
export default resumeSlice.reducer;
