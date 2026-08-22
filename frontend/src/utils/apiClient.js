// ============================================
// API Client - Frontend Helper
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// AUTHENTICATION HELPERS
// ============================================

export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

// ============================================
// BASE API FETCH
// ============================================

const apiFetch = async (endpoint, options = {}) => {
  const url = API_BASE_URL + endpoint;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (response.status === 401 && data.message && data.message.includes('token')) {
      removeToken();
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// ============================================
// PUBLIC API FUNCTIONS (No Auth)
// ============================================

export const getCourses = () => {
  return apiFetch('/courses');
};

export const getCoursesByTrack = (track) => {
  return apiFetch('/courses/' + track);
};

export const getCourseById = (id) => {
  return apiFetch('/courses/id/' + id);
};

export const register = (name, email, password) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = (email, password) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const verifyCertificate = (hash) => {
  return apiFetch('/certificates/verify/' + hash);
};

// ============================================
// PROTECTED API FUNCTIONS (Auth Required)
// ============================================

export const enrollInCourse = (courseId) => {
  return apiFetch('/enrollments', {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
};

export const getMyEnrollments = () => {
  return apiFetch('/enrollments/me');
};

export const updateEnrollmentProgress = (enrollmentId, progress, status) => {
  return apiFetch('/enrollments/' + enrollmentId, {
    method: 'PUT',
    body: JSON.stringify({ progress, status }),
  });
};

export const generateCertificate = (enrollmentId) => {
  return apiFetch('/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId }),
  });
};

export const getMyCertificates = () => {
  return apiFetch('/certificates/me');
};

// ============================================
// ADMIN API FUNCTIONS
// ============================================

export const adminGetAllEnrollments = () => {
  return apiFetch('/admin/enrollments');
};

export const adminUpdateEnrollmentStatus = (enrollmentId, status) => {
  return apiFetch('/admin/enrollments/' + enrollmentId, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};

export const adminGetAllCourses = () => {
  return apiFetch('/admin/courses');
};

export const adminCreateCourse = (courseData) => {
  return apiFetch('/admin/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  });
};

export const adminUpdateCourse = (courseId, courseData) => {
  return apiFetch('/admin/courses/' + courseId, {
    method: 'PUT',
    body: JSON.stringify(courseData),
  });
};

export const adminDeleteCourse = (courseId) => {
  return apiFetch('/admin/courses/' + courseId, {
    method: 'DELETE',
  });
};

// ============================================
// EXPORT DEFAULT
// ============================================

const apiClient = {
  register,
  login,
  setToken,
  getToken,
  removeToken,
  isAuthenticated,
  getCourses,
  getCoursesByTrack,
  getCourseById,
  enrollInCourse,
  getMyEnrollments,
  updateEnrollmentProgress,
  generateCertificate,
  getMyCertificates,
  verifyCertificate,
  adminGetAllEnrollments,
  adminUpdateEnrollmentStatus,
  adminGetAllCourses,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
};

export default apiClient;