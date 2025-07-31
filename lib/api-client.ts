interface ApiClientOptions {
  baseUrl?: string
  headers?: Record<string, string>
  timeout?: number
}

interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
  status: number
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private timeout: number

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || ''
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    this.timeout = options.timeout || 10000
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = { ...this.defaultHeaders, ...options.headers }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      let data: T | undefined
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      }

      return {
        data,
        success: response.ok,
        status: response.status,
        error: !response.ok ? (data as any)?.error || response.statusText : undefined,
        message: (data as any)?.message,
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            status: 0,
            error: 'Request timeout',
          }
        }
        return {
          success: false,
          status: 0,
          error: error.message,
        }
      }
      
      return {
        success: false,
        status: 0,
        error: 'Unknown error occurred',
      }
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value
  }

  removeHeader(key: string): void {
    delete this.defaultHeaders[key]
  }

  setTimeout(timeout: number): void {
    this.timeout = timeout
  }
}

// Create default client instance
export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
})

// Authentication helpers
export const authApi = {
  signIn: (credentials: { email: string; password: string }) =>
    apiClient.post('/api/auth/signin', credentials),

  signUp: (userData: any) =>
    apiClient.post('/api/auth/signup', userData),

  signOut: () =>
    apiClient.post('/api/auth/signout'),

  forgotPassword: (email: string) =>
    apiClient.post('/api/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post('/api/auth/reset-password', { token, password }),

  verifyEmail: (token: string) =>
    apiClient.post('/api/auth/verify-email', { token }),

  getSession: () =>
    apiClient.get('/api/auth/session'),

  getMe: () =>
    apiClient.get('/api/auth/me'),
}

// User management helpers
export const userApi = {
  getUsers: () =>
    apiClient.get('/api/users'),

  getUser: (id: string) =>
    apiClient.get(`/api/users/${id}`),

  updateUser: (id: string, data: any) =>
    apiClient.put(`/api/users/${id}`, data),

  deleteUser: (id: string) =>
    apiClient.delete(`/api/users/${id}`),

  createUser: (data: any) =>
    apiClient.post('/api/users', data),
}

// Error handling utilities
export function isApiError(response: ApiResponse): boolean {
  return !response.success
}

export function getApiErrorMessage(response: ApiResponse): string {
  return response.error || 'An unexpected error occurred'
}

export function handleApiError(response: ApiResponse): never {
  throw new Error(getApiErrorMessage(response))
}

export default apiClient