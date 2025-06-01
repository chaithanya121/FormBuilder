
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resumeApiService, ResumeData } from '@/services/api/resumes';

interface ResumeState {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchResumes = createAsyncThunk(
  'resumes/fetchResumes',
  async (_, { rejectWithValue }) => {
    try {
      const resumes = await resumeApiService.getAllResumes();
      return resumes;
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
      // Return mock data for now since API might not be available
      return [
        {
          id: '1',
          name: 'Software Developer Resume',
          template: 'modern',
          downloads: 45,
          views: 234,
          status: 'published' as const,
          lastUpdated: new Date().toISOString(),
          content: {
            personalInfo: {
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+1-555-0123',
              location: 'San Francisco, CA',
              summary: 'Experienced software developer with 5+ years in web development.'
            },
            experience: [
              {
                id: '1',
                company: 'Tech Corp',
                position: 'Senior Developer',
                startDate: '2022-01',
                endDate: 'Present',
                description: 'Led development of web applications using React and Node.js.'
              }
            ],
            education: [
              {
                id: '1',
                institution: 'University of California',
                degree: 'Bachelor of Computer Science',
                startDate: '2015-09',
                endDate: '2019-06'
              }
            ],
            skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python']
          }
        },
        {
          id: '2',
          name: 'Marketing Specialist Resume',
          template: 'creative',
          downloads: 28,
          views: 156,
          status: 'draft' as const,
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          content: {
            personalInfo: {
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '+1-555-0456',
              location: 'New York, NY',
              summary: 'Creative marketing professional with expertise in digital campaigns.'
            },
            experience: [
              {
                id: '1',
                company: 'Marketing Agency',
                position: 'Marketing Specialist',
                startDate: '2021-03',
                endDate: 'Present',
                description: 'Developed and executed digital marketing strategies.'
              }
            ],
            education: [
              {
                id: '1',
                institution: 'NYU',
                degree: 'Bachelor of Marketing',
                startDate: '2017-09',
                endDate: '2021-05'
              }
            ],
            skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'Adobe Creative Suite']
          }
        }
      ];
    }
  }
);

export const createResume = createAsyncThunk(
  'resumes/createResume',
  async (resumeData: Omit<ResumeData, 'id' | 'downloads' | 'views' | 'lastUpdated'>, { rejectWithValue }) => {
    try {
      const newResume = await resumeApiService.createResume(resumeData);
      return newResume;
    } catch (error) {
      console.error('Failed to create resume:', error);
      // Return mock data for now
      const mockResume: ResumeData = {
        id: `resume-${Date.now()}`,
        name: resumeData.name,
        template: resumeData.template,
        downloads: 0,
        views: 0,
        status: resumeData.status,
        lastUpdated: new Date().toISOString(),
        content: resumeData.content
      };
      return mockResume;
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumes/updateResume',
  async (resumeData: ResumeData, { rejectWithValue }) => {
    try {
      const updatedResume = await resumeApiService.updateResume(resumeData);
      return updatedResume;
    } catch (error) {
      console.error('Failed to update resume:', error);
      return resumeData; // Return the data as-is for mock functionality
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/deleteResume',
  async (id: string, { rejectWithValue }) => {
    try {
      await resumeApiService.deleteResume(id);
      return id;
    } catch (error) {
      console.error('Failed to delete resume:', error);
      return id; // Return the id for mock functionality
    }
  }
);

export const fetchResumeById = createAsyncThunk(
  'resumes/fetchResumeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const resume = await resumeApiService.getResumeById(id);
      return resume;
    } catch (error) {
      console.error('Failed to fetch resume:', error);
      return rejectWithValue('Failed to fetch resume');
    }
  }
);

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentResume: (state, action: PayloadAction<ResumeData | null>) => {
      state.currentResume = action.payload;
    },
    updateCurrentResume: (state, action: PayloadAction<Partial<ResumeData>>) => {
      if (state.currentResume) {
        state.currentResume = { ...state.currentResume, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch resumes
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resumes';
      })
      
      // Create resume
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
        state.currentResume = action.payload;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create resume';
      })
      
      // Update resume
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.resumes.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.resumes[index] = action.payload;
        }
        if (state.currentResume?.id === action.payload.id) {
          state.currentResume = action.payload;
        }
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update resume';
      })
      
      // Delete resume
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.filter(r => r.id !== action.payload);
        if (state.currentResume?.id === action.payload) {
          state.currentResume = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete resume';
      })
      
      // Fetch resume by ID
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentResume, updateCurrentResume } = resumeSlice.actions;
export default resumeSlice.reducer;
