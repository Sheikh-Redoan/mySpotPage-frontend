import axios from 'axios';

// ✅ Use import.meta.env for Vite (not process.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Create a reusable axios instance
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/auth/`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('accessToken', access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Group your authentication API calls together
export const authAPI = {
  /**
   * Sends a request to the signup endpoint to get an OTP.
   * @param {FormData} formData - Should contain the 'number'.
   * @returns {Promise} Response from the signup endpoint
   */
  signup: (formData) => {
    return apiClient.post('signup/', formData);
  },

  /**
   * Sends the OTP and number to the verification endpoint.
   * @param {FormData} formData - Should contain 'otp' and 'number'.
   * @returns {Promise} Response containing tokens and user data
   */
  verifyOtp: (formData) => {
    return apiClient.post('verify-otp/', formData);
  },

  /**
   * Seller login with password
   * @param {FormData} formData - Should contain 'number' and 'password'.
   * @returns {Promise} Response containing access and refresh tokens
   */
  sellerSignin: (formData) => {
    return apiClient.post('seller/signin/', formData);
  },

  /**
   * Client login (OTP-based, no password)
   * @param {FormData} formData - Should contain 'number'.
   * @returns {Promise} Response indicating OTP was sent
   */
  clientSignin: (formData) => {
    return apiClient.post('signin/', formData);
  },

  /**
   * Update account information
   * @param {FormData} formData - Should contain account update fields
   * @returns {Promise} Response with updated account data
   */
  accountUpdate: (formData) => {
    return apiClient.post('account/', formData);
  },

  /**
   * Forgot password
   * @param {FormData} formData - Should contain 'number'
   * @returns {Promise} Response indicating reset OTP was sent
   */
  forgotPassword: (formData) => {
    return apiClient.post('forgot-password/', formData);
  },

  /**
   * Reset password with OTP
   * @param {FormData} formData - Should contain 'number', 'otp', 'new_password'
   * @returns {Promise} Response indicating password was reset
   */
  resetPassword: (formData) => {
    return apiClient.post('reset-password/', formData);
  },
};

export default apiClient;