/**
 * API Configuration
 * 
 * In development, we use localhost:5000.
 * In production, we use the VITE_API_URL environment variable from Vercel/Render.
 */
const isProd = import.meta.env.PROD;
const VITE_API_URL = import.meta.env.VITE_API_URL;

// If VITE_API_URL is provided in env, use it. Otherwise, fallback to localhost for dev.
export const API_BASE_URL = VITE_API_URL || 'http://localhost:5000';

console.log(`🚀 API Base URL: ${API_BASE_URL} (${isProd ? 'Production' : 'Development'})`);

export default API_BASE_URL;
