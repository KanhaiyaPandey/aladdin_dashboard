import axios from 'axios';
import toast from 'react-hot-toast';

// Input sanitization helper
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    // Remove potentially dangerous characters and scripts
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  }
  if (typeof input === 'object' && input !== null) {
    if (Array.isArray(input)) {
      return input.map(sanitizeInput);
    }
    const sanitized = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  return input;
};

// Deep sanitize request data
const sanitizeRequestData = (data) => {
  if (!data) return data;
  return sanitizeInput(data);
};

// Request interceptor for security headers and sanitization
const setupRequestInterceptor = (instance, instanceName) => {
instance.interceptors.request.use(
  (config) => {
    const isFormData = config.data instanceof FormData;

    // Sanitize JSON only
    if (config.data && !isFormData) {
      config.data = sanitizeRequestData(config.data);
    }

    // ❌ DO NOT add ANY custom headers for FormData
    if (!isFormData) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';

      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json';

      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      )?.content;

      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
};

// Response interceptor for error handling and security
const setupResponseInterceptor = (instance, instanceName) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle authentication errors
      if (error.response?.status === 401) {
        // Clear user data and redirect to login
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        toast.error('Session expired. Please login again.');
        return Promise.reject(error);
      }

      // Handle forbidden errors
      if (error.response?.status === 403) {
        toast.error('You do not have permission to perform this action.');
        return Promise.reject(error);
      }

      // Handle server errors
      if (error.response?.status >= 500) {
        toast.error('Server error. Please try again later.');
        return Promise.reject(error);
      }

      // Handle network errors
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};

export const customFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/aladdin/admin`,
    withCredentials: true, // Ensures cookies are sent
    timeout: 30000, // 30 seconds timeout
});

export const userFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/aladdin/user`,
    withCredentials: true, // Ensures cookies are sent
    timeout: 30000,
});

export const publicFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/aladdin/public`,
    withCredentials: true, // Ensures cookies are sent
    timeout: 30000,
});

export const authFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/auth/user`,
    withCredentials: true, // Ensures cookies are sent
    timeout: 30000,
});

// Setup interceptors for all axios instances
setupRequestInterceptor(customFetch, 'customFetch');
setupResponseInterceptor(customFetch, 'customFetch');

setupRequestInterceptor(userFetch, 'userFetch');
setupResponseInterceptor(userFetch, 'userFetch');

setupRequestInterceptor(publicFetch, 'publicFetch');
setupResponseInterceptor(publicFetch, 'publicFetch');

setupRequestInterceptor(authFetch, 'authFetch');
setupResponseInterceptor(authFetch, 'authFetch');


export const generateCombinations = (arrays) => {
    if (arrays.length === 0) return [];
    return arrays.reduce((acc, curr) =>
      acc.flatMap((a) => curr.map((b) => [...a, b]))
    , [[]]);
  };

// Rate limiting helper (simple in-memory cache)
const requestCache = new Map();
const CACHE_DURATION = 1000; // 1 second

export const rateLimitedRequest = async (key, requestFn) => {
  const now = Date.now();
  const cached = requestCache.get(key);
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.promise;
  }
  
  const promise = requestFn();
  requestCache.set(key, { promise, timestamp: now });
  
  // Clean up old cache entries
  setTimeout(() => {
    requestCache.delete(key);
  }, CACHE_DURATION * 2);
  
  return promise;
};






