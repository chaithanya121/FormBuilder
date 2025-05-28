
import axios from 'axios';
import process from 'process'

// API Configuration
export const API_CONFIG = {
  // Base URL for all API requests - can be overridden by environment variables
  BASE_URL: process?.env?.REACT_APP_API_URL || 'https://localhost:8000',
  
  // Optional API version path segment
  API_VERSION: process?.env?.REACT_APP_API_VERSION|| 'v2',
  
  // Flag to determine if we should use API versioning in URLs
  USE_VERSION_IN_URL: process.env.REACT_APP_USE_API_VERSION !== 'false',
  
  // Environment-specific configurations
  ENVIRONMENTS: {
    development: {
      BASE_URL: process?.env?.REACT_APP_DEV_API_URL || 'http://localhost:8000',
    },
    staging: {
      BASE_URL: process?.env?.REACT_APP_STAGING_API_URL || 'https://api-staging.yourdomain.com',
    },
    production: {
      BASE_URL: process?.env?.REACT_APP_PROD_API_URL || 'https://api.yourdomain.com',
    }
  },
  
  // Endpoints for different services
  ENDPOINTS: {
    AUTH: {
      SIGN_IN: '/auth/login/',
      SIGN_UP: '/auth/register/',
      VERIFY_EMAIL: '/auth/verify-email/',
      RESEND_CODE: '/auth/resend-verification/',
      LOGOUT: '/auth/logout/',
      CURRENT_USER: '/auth/me/',
      UPDATE_PROFILE: '/auth/profile/',
      CHANGE_PASSWORD: '/auth/change-password/',
    },
    FORMS: {
      GET_ALL: '/form_list/',
      GET_BY_ID: '/form_list/?primary_id=', // Use the same endpoint as GET_ALL and filter client-side
      CREATE: '/create_form/',
      UPDATE: '/create_form/', // Use create endpoint for updates as well
      DELETE: '/delete_form/?form_id=', // Use create endpoint for deletes as well,
      GET_FORM_NAME:'/form_list_names/',
      PREVIEW:'/form_list_data/?form_id=',
      SUBMISSIONS: {
        GET_ALL: '/submit_form/?form_id=',
        SUBMIT: '/submit_form/',
        DELETE:'/submissions/?submission_id='
      },
    },
    // Add other API sections as needed
  },
};

// Helper function to replace URL parameters
export const formatUrl = (url: string, params?: Record<string, string>): string => {
  if (!params) return url;
  
  let formattedUrl = url;
  Object.keys(params).forEach(key => {
    formattedUrl = formattedUrl.replace(`:${key}`, params[key]);
  });
  
  return formattedUrl;
};

// Get the environment-specific configuration
export const getEnvironmentConfig = () => {
  // Determine current environment, defaulting to development
  const environment = process?.env?.NODE_ENV || 'development';
  
  // Get environment-specific configuration, defaulting to development
  const envConfig = API_CONFIG.ENVIRONMENTS[environment as keyof typeof API_CONFIG.ENVIRONMENTS] 
    || API_CONFIG.ENVIRONMENTS.development;
    
  return envConfig;
};

// Get the complete API URL for an endpoint
export const getApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const envConfig = getEnvironmentConfig();
  const baseUrl = envConfig?.BASE_URL || API_CONFIG.BASE_URL;
  
  // Format the base part of the URL
  let apiUrl = baseUrl;
  
  // Add API version if configured
  if (API_CONFIG.USE_VERSION_IN_URL && API_CONFIG.API_VERSION) {
    apiUrl = `${apiUrl}/${API_CONFIG.API_VERSION}`;
  }
  
  // Add the endpoint (with parameters replaced if any)
  apiUrl = `${apiUrl}${formatUrl(endpoint, params)}`;
  
  return apiUrl;
};

// Create a base API instance
export const createApiInstance = (customConfig = {}) => {
  const envConfig = getEnvironmentConfig();
  
  return axios.create({
    baseURL: envConfig?.BASE_URL || API_CONFIG.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    ...customConfig
  });
};

// Default API instance
export const api = createApiInstance();

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('auth_token');
      // Force reload to trigger re-auth
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
