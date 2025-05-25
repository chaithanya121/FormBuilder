// apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define types for our API client
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
  status: number | null;
}

interface ApiError {
  message: string;
  code: number;
  details?: any;
  isAxiosError: boolean;
}

interface ApiConfig extends AxiosRequestConfig {
  method?: HttpMethod;
  withAuth?: boolean; // Flag to indicate if auth token should be included
}

class ApiClient {
  private instance: AxiosInstance;
  private authToken: string | null = null;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // Set the authentication token
  public setAuthToken(token: string | null): void {
    this.authToken = token;
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }

  // Get the current authentication token
  public getAuthToken(): string | null {
    return this.authToken;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // You can add additional request logging here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle global errors like token expiration here
        if (error.response?.status === 401) {
          // You might want to trigger a token refresh or logout here
          console.error('Authentication error - token may be invalid or expired');
        }
        return Promise.reject(error);
      }
    );
  }

  private normalizeError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || error.message,
        code: error.response?.status || 0,
        details: error.response?.data,
        isAxiosError: true
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        code: 0, // 0 indicates a non-HTTP error
        isAxiosError: false
      };
    }

    return {
      message: 'Unknown error occurred',
      code: 0,
      isAxiosError: false
    };
  }

  public async request<T>(config: ApiConfig): Promise<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      data: null,
      error: null,
      loading: true,
      status: null
    };

    // Prepare the request config
    const requestConfig: AxiosRequestConfig = {
      method: config.method || 'GET',
      url: config.url,
      data: config.data,
      params: config.params,
      ...config,
    };

    // Add auth header if withAuth is true (defaults to true)
    if (config.withAuth !== false && this.authToken) {
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${this.authToken}`
      };
    }

    try {
      const result: AxiosResponse<T> = await this.instance(requestConfig);
      response.data = result.data;
      response.status = result.status;
    } catch (error) {
      response.error = this.normalizeError(error);
      response.status = (error as AxiosError)?.response?.status || null;
    } finally {
      response.loading = false;
    }

    return response;
  }

  // Convenience methods with auth option
  public get<T>(url: string, params?: any, withAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', url, params, withAuth });
  }

  public post<T>(url: string, data?: any, withAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', url, data, withAuth });
  }

  public put<T>(url: string, data?: any, withAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', url, data, withAuth });
  }

  public patch<T>(url: string, data?: any, withAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PATCH', url, data, withAuth });
  }

  public delete<T>(url: string, withAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', url, withAuth });
  }
}

// Example usage:
export const apiClient = new ApiClient('http://localhost:8000/');

// Set token when user logs in (typically after login)
// apiClient.setAuthToken('your-auth-token-here');

// Clear token when user logs out
// apiClient.setAuthToken(null);