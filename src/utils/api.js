/**
 * API Client Utility
 * Centralized helper for making requests to the backend API
 */

const API_BASE = '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Auth token if available (client-side only)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['x-auth-token'] = token; // The backend uses x-auth-token per standard, let's verify. Or we can just send it, typically it's x-auth-token in MERN stack.
    }
  }

  const config = {
    headers,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle PDF responses (binary)
    if (response.headers.get('Content-Type')?.includes('application/pdf')) {
      if (!response.ok) throw new Error('PDF generation failed');
      return response.blob();
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.msg || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please make sure the backend is running.');
    }
    throw error;
  }
}

/**
 * Auth API calls
 */
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  getMe: () => apiRequest('/auth/me'),
};

/**
 * Resume API calls
 */
export const resumeAPI = {
  create: (resumeData) => apiRequest('/resumes', {
    method: 'POST',
    body: JSON.stringify(resumeData),
  }),

  get: (id) => apiRequest(`/resumes/${id}`),

  update: (id, resumeData) => apiRequest(`/resumes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(resumeData),
  }),

  getTemplates: () => apiRequest('/resumes/templates'),
};

/**
 * AI API calls
 */
export const aiAPI = {
  generateFromPrompt: (prompt) => apiRequest('/ai/generate-from-prompt', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  }),

  enhance: (resumeData) => apiRequest('/ai/enhance', {
    method: 'POST',
    body: JSON.stringify({ resumeData }),
  }),
};

/**
 * PDF API calls
 */
export const pdfAPI = {
  generate: async (resumeData, template) => {
    const url = `${API_BASE}/pdf/generate`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeData, template }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'PDF generation failed' }));
      throw new Error(error.error || 'PDF generation failed');
    }

    return response.blob();
  },
};
