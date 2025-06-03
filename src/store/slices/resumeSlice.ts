import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resumeApiService, ResumeData } from '@/services/api/resumes';

interface ResumeState {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  loading: boolean;
  error: string | null;
  analytics: {
    totalDownloads: number;
    totalViews: number;
    conversionRate: number;
    popularTemplates: string[];
    recentActivity: Array<{
      id: string;
      action: 'created' | 'updated' | 'downloaded' | 'viewed';
      timestamp: string;
      resumeName: string;
    }>;
  };
  templates: Array<{
    id: string;
    name: string;
    category: string;
    preview: string;
    popularity: number;
    isNew: boolean;
    isPremium: boolean;
  }>;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  analytics: {
    totalDownloads: 0,
    totalViews: 0,
    conversionRate: 0,
    popularTemplates: [],
    recentActivity: []
  },
  templates: [
    {
      id: 'modern',
      name: 'Modern Professional',
      category: 'Professional',
      preview: '/templates/modern.jpg',
      popularity: 95,
      isNew: false,
      isPremium: false
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      category: 'Creative',
      preview: '/templates/creative.jpg',
      popularity: 87,
      isNew: true,
      isPremium: true
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      category: 'Minimal',
      preview: '/templates/minimal.jpg',
      popularity: 92,
      isNew: false,
      isPremium: false
    },
    {
      id: 'executive',
      name: 'Executive Suite',
      category: 'Executive',
      preview: '/templates/executive.jpg',
      popularity: 78,
      isNew: true,
      isPremium: true
    }
  ]
};

// Enhanced async thunks with better error handling and analytics
export const fetchResumes = createAsyncThunk(
  'resumes/fetchResumes',
  async (_, { rejectWithValue }) => {
    try {
      const resumes = await resumeApiService.getAllResumes();
      return resumes;
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
      // Enhanced mock data with analytics
      const mockResumes = [
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
              name: 'Alex Rivera',
              email: 'alex.rivera@example.com',
              phone: '+1-555-0123',
              location: 'San Francisco, CA',
              website: 'alexrivera.dev',
              linkedin: 'linkedin.com/in/alexrivera',
              summary: 'Full-stack developer with 5+ years experience building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code and user experience.'
            },
            experience: [
              {
                id: '1',
                company: 'TechCorp Solutions',
                position: 'Senior Software Engineer',
                startDate: '2022-01',
                endDate: 'Present',
                description: 'Led development of microservices architecture serving 10M+ users. Reduced application load time by 40% through optimization. Mentored 5 junior developers.',
                technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
              },
              {
                id: '2',
                company: 'StartupXYZ',
                position: 'Full Stack Developer',
                startDate: '2020-03',
                endDate: '2021-12',
                description: 'Built complete e-commerce platform from scratch. Implemented payment processing and inventory management systems.',
                technologies: ['Vue.js', 'Python', 'Django', 'MySQL', 'Stripe API']
              }
            ],
            education: [
              {
                id: '1',
                institution: 'University of California, Berkeley',
                degree: 'Bachelor of Science in Computer Science',
                startDate: '2016-09',
                endDate: '2020-05',
                gpa: '3.8/4.0',
                achievements: ['Dean\'s List', 'CS Honor Society']
              }
            ],
            skills: {
              technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
              soft: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration'],
              certifications: ['AWS Solutions Architect', 'Google Cloud Professional']
            },
            projects: [
              {
                id: '1',
                name: 'E-commerce Analytics Dashboard',
                description: 'Real-time analytics platform for online retailers',
                technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
                link: 'github.com/alexrivera/analytics-dashboard'
              }
            ]
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
              name: 'Sarah Johnson',
              email: 'sarah.johnson@example.com',
              phone: '+1-555-0456',
              location: 'New York, NY',
              website: 'sarahjohnson.marketing',
              linkedin: 'linkedin.com/in/sarahjohnson',
              summary: 'Creative marketing professional with expertise in digital campaigns, brand development, and data-driven strategies. Proven track record of increasing engagement by 200%.'
            },
            experience: [
              {
                id: '1',
                company: 'Digital Marketing Agency',
                position: 'Senior Marketing Specialist',
                startDate: '2021-03',
                endDate: 'Present',
                description: 'Developed and executed integrated marketing campaigns for Fortune 500 clients. Managed $2M+ annual advertising budget with 300% ROI.',
                achievements: ['Increased client retention by 45%', 'Won Marketing Campaign of the Year 2023']
              }
            ],
            education: [
              {
                id: '1',
                institution: 'NYU Stern School of Business',
                degree: 'Bachelor of Science in Marketing',
                startDate: '2017-09',
                endDate: '2021-05',
                gpa: '3.9/4.0'
              }
            ],
            skills: {
              technical: ['Google Analytics', 'Facebook Ads', 'SEO/SEM', 'Adobe Creative Suite', 'HubSpot', 'Salesforce'],
              soft: ['Creative Thinking', 'Strategic Planning', 'Data Analysis', 'Project Management'],
              certifications: ['Google Ads Certified', 'HubSpot Inbound Marketing', 'Facebook Blueprint']
            }
          }
        }
      ];
      return mockResumes;
    }
  }
);

export const createResume = createAsyncThunk(
  'resumes/createResume',
  async (resumeData: Omit<ResumeData, 'id' | 'downloads' | 'views' | 'lastUpdated'>, { rejectWithValue, dispatch }) => {
    try {
      const newResume = await resumeApiService.createResume(resumeData);
      
      // Add to recent activity
      dispatch(addRecentActivity({
        id: Date.now().toString(),
        action: 'created',
        timestamp: new Date().toISOString(),
        resumeName: resumeData.name
      }));
      
      return newResume;
    } catch (error) {
      console.error('Failed to create resume:', error);
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
      
      // Add to recent activity
      dispatch(addRecentActivity({
        id: Date.now().toString(),
        action: 'created',
        timestamp: new Date().toISOString(),
        resumeName: resumeData.name
      }));
      
      return mockResume;
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumes/updateResume',
  async (resumeData: ResumeData, { rejectWithValue, dispatch }) => {
    try {
      const updatedResume = await resumeApiService.updateResume(resumeData);
      
      // Add to recent activity
      dispatch(addRecentActivity({
        id: Date.now().toString(),
        action: 'updated',
        timestamp: new Date().toISOString(),
        resumeName: resumeData.name
      }));
      
      return updatedResume;
    } catch (error) {
      console.error('Failed to update resume:', error);
      
      // Add to recent activity even for mock
      dispatch(addRecentActivity({
        id: Date.now().toString(),
        action: 'updated',
        timestamp: new Date().toISOString(),
        resumeName: resumeData.name
      }));
      
      return { ...resumeData, lastUpdated: new Date().toISOString() };
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/deleteResume',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      await resumeApiService.deleteResume(id);
      return id;
    } catch (error) {
      console.error('Failed to delete resume:', error);
      return id;
    }
  }
);

export const fetchResumeById = createAsyncThunk(
  'resumes/fetchResumeById',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const resume = await resumeApiService.getResumeById(id);
      
      // Add to recent activity
      dispatch(addRecentActivity({
        id: Date.now().toString(),
        action: 'viewed',
        timestamp: new Date().toISOString(),
        resumeName: resume.name
      }));
      
      return resume;
    } catch (error) {
      console.error('Failed to fetch resume:', error);
      return rejectWithValue('Failed to fetch resume');
    }
  }
);

export const downloadResume = createAsyncThunk(
  'resumes/downloadResume',
  async (resumeId: string, { dispatch, getState }) => {
    try {
      const state = getState() as { resumes: ResumeState };
      const resume = state.resumes.resumes.find(r => r.id === resumeId);
      
      if (resume) {
        // Add to recent activity
        dispatch(addRecentActivity({
          id: Date.now().toString(),
          action: 'downloaded',
          timestamp: new Date().toISOString(),
          resumeName: resume.name
        }));
        
        return resumeId;
      }
      
      throw new Error('Resume not found');
    } catch (error) {
      console.error('Failed to track download:', error);
      return resumeId;
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
    addRecentActivity: (state, action: PayloadAction<{
      id: string;
      action: 'created' | 'updated' | 'downloaded' | 'viewed';
      timestamp: string;
      resumeName: string;
    }>) => {
      state.analytics.recentActivity.unshift(action.payload);
      // Keep only last 10 activities
      if (state.analytics.recentActivity.length > 10) {
        state.analytics.recentActivity = state.analytics.recentActivity.slice(0, 10);
      }
    },
    updateAnalytics: (state) => {
      // Calculate analytics from current resumes
      state.analytics.totalDownloads = state.resumes.reduce((total, resume) => total + resume.downloads, 0);
      state.analytics.totalViews = state.resumes.reduce((total, resume) => total + resume.views, 0);
      state.analytics.conversionRate = state.analytics.totalViews > 0 
        ? (state.analytics.totalDownloads / state.analytics.totalViews) * 100 
        : 0;
      
      // Get popular templates
      const templateCounts = state.resumes.reduce((acc, resume) => {
        acc[resume.template] = (acc[resume.template] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      state.analytics.popularTemplates = Object.entries(templateCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([template]) => template);
    }
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
        resumeSlice.caseReducers.updateAnalytics(state);
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
        resumeSlice.caseReducers.updateAnalytics(state);
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
        resumeSlice.caseReducers.updateAnalytics(state);
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
        resumeSlice.caseReducers.updateAnalytics(state);
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch resume by ID
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
        // Update views count
        const resumeIndex = state.resumes.findIndex(r => r.id === action.payload.id);
        if (resumeIndex !== -1) {
          state.resumes[resumeIndex].views += 1;
        }
        resumeSlice.caseReducers.updateAnalytics(state);
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Download resume
      .addCase(downloadResume.fulfilled, (state, action) => {
        const resumeIndex = state.resumes.findIndex(r => r.id === action.payload);
        if (resumeIndex !== -1) {
          state.resumes[resumeIndex].downloads += 1;
        }
        resumeSlice.caseReducers.updateAnalytics(state);
      });
  },
});

export const { 
  clearError, 
  setCurrentResume, 
  updateCurrentResume, 
  addRecentActivity, 
  updateAnalytics 
} = resumeSlice.actions;

export default resumeSlice.reducer;
