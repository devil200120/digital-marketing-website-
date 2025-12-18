// Centralized configuration for the application
// Uses environment variables for production-ready setup

const config = {
  // API base URL for all API calls
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Backend URL for static assets (uploads, images)
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  
  // Helper function to get full image URL
  getImageUrl: (path) => {
    if (!path) return '';
    // If already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // If it's a local asset (starts with /), return as is
    if (path.startsWith('/images/') || path.startsWith('/assets/')) {
      return path;
    }
    // For uploaded files, prepend backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    return `${backendUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
};

export default config;
