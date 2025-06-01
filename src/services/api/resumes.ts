
// Resume API service with complete flow examples
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance with interceptors
const resumeApi = axios.create({
  baseURL: `${API_BASE_URL}/resumes`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
resumeApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Resume API Request:', config);
    return config;
  },
  (error) => {
    console.error('Resume API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
resumeApi.interceptors.response.use(
  (response) => {
    console.log('Resume API Response:', response);
    return response;
  },
  (error) => {
    console.error('Resume API Response Error:', error);
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

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

// API Methods with proper error handling and logging
export const resumeApiService = {
  // GET /api/resumes - Fetch all resumes
  async getAllResumes(): Promise<ResumeData[]> {
    try {
      console.log('Fetching all resumes...');
      const response = await resumeApi.get('/');
      console.log('Successfully fetched resumes:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
      throw new Error('Failed to fetch resumes');
    }
  },

  // GET /api/resumes/:id - Fetch resume by ID
  async getResumeById(id: string): Promise<ResumeData> {
    try {
      console.log(`Fetching resume with ID: ${id}...`);
      const response = await resumeApi.get(`/${id}`);
      console.log('Successfully fetched resume:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch resume ${id}:`, error);
      throw new Error(`Failed to fetch resume ${id}`);
    }
  },

  // POST /api/resumes - Create new resume
  async createResume(resumeData: Omit<ResumeData, 'id' | 'downloads' | 'views' | 'lastUpdated'>): Promise<ResumeData> {
    try {
      console.log('Creating new resume...', resumeData);
      const response = await resumeApi.post('/', resumeData);
      console.log('Successfully created resume:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to create resume:', error);
      throw new Error('Failed to create resume');
    }
  },

  // PUT /api/resumes/:id - Update existing resume
  async updateResume(resumeData: ResumeData): Promise<ResumeData> {
    try {
      console.log(`Updating resume ${resumeData.id}...`, resumeData);
      const response = await resumeApi.put(`/${resumeData.id}`, resumeData);
      console.log('Successfully updated resume:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update resume ${resumeData.id}:`, error);
      throw new Error(`Failed to update resume ${resumeData.id}`);
    }
  },

  // DELETE /api/resumes/:id - Delete resume
  async deleteResume(id: string): Promise<void> {
    try {
      console.log(`Deleting resume ${id}...`);
      await resumeApi.delete(`/${id}`);
      console.log('Successfully deleted resume');
    } catch (error) {
      console.error(`Failed to delete resume ${id}:`, error);
      throw new Error(`Failed to delete resume ${id}`);
    }
  },

  // POST /api/resumes/:id/download - Track download
  async trackDownload(id: string): Promise<void> {
    try {
      console.log(`Tracking download for resume ${id}...`);
      await resumeApi.post(`/${id}/download`);
      console.log('Successfully tracked download');
    } catch (error) {
      console.error(`Failed to track download for resume ${id}:`, error);
      throw new Error(`Failed to track download for resume ${id}`);
    }
  },

  // POST /api/resumes/:id/view - Track view
  async trackView(id: string): Promise<void> {
    try {
      console.log(`Tracking view for resume ${id}...`);
      await resumeApi.post(`/${id}/view`);
      console.log('Successfully tracked view');
    } catch (error) {
      console.error(`Failed to track view for resume ${id}:`, error);
      throw new Error(`Failed to track view for resume ${id}`);
    }
  },

  // GET /api/resumes/:id/analytics - Get resume analytics
  async getResumeAnalytics(id: string): Promise<any> {
    try {
      console.log(`Fetching analytics for resume ${id}...`);
      const response = await resumeApi.get(`/${id}/analytics`);
      console.log('Successfully fetched resume analytics:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch analytics for resume ${id}:`, error);
      throw new Error(`Failed to fetch analytics for resume ${id}`);
    }
  }
};

// Export default
export default resumeApiService;

// Example usage in components:
/*
import { resumeApiService } from '@/services/api/resumes';
import { useAppDispatch } from '@/hooks/redux';
import { createResume, fetchResumes } from '@/store/slices/resumeSlice';

// In component:
const dispatch = useAppDispatch();

// Create resume example
const handleCreateResume = async () => {
  try {
    const newResume = await resumeApiService.createResume({
      name: 'My New Resume',
      template: 'modern',
      status: 'draft',
      content: { ... }
    });
    
    // Update Redux state
    dispatch(createResume(newResume));
  } catch (error) {
    console.error('Failed to create resume:', error);
  }
};

// Fetch resumes example
useEffect(() => {
  dispatch(fetchResumes());
}, [dispatch]);
*/
