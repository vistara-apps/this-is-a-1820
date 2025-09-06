/**
 * Application Constants
 * Centralized configuration and constant values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
}

// Application Information
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'DeployMate',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Launch your web app in minutes, not days.',
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'support@deploymate.dev',
  DOCS_URL: import.meta.env.VITE_DOCS_URL || 'https://docs.deploymate.dev',
}

// OAuth Configuration
export const OAUTH_CONFIG = {
  GITHUB: {
    CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
    REDIRECT_URI: import.meta.env.VITE_GITHUB_REDIRECT_URI || `${window.location.origin}/auth/github/callback`,
    SCOPE: 'repo,user:email',
  },
  VERCEL: {
    CLIENT_ID: import.meta.env.VITE_VERCEL_CLIENT_ID,
    REDIRECT_URI: import.meta.env.VITE_VERCEL_REDIRECT_URI || `${window.location.origin}/auth/vercel/callback`,
  },
}

// Stripe Configuration
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
}

// Feature Flags
export const FEATURES = {
  MONITORING: import.meta.env.VITE_ENABLE_MONITORING === 'true',
  ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
}

// Deployment Targets
export const DEPLOYMENT_TARGETS = {
  VERCEL: {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy to Vercel with automatic CI/CD',
    icon: '▲',
    features: ['Auto-scaling', 'Edge Functions', 'Analytics'],
  },
  NETLIFY: {
    id: 'netlify',
    name: 'Netlify',
    description: 'Deploy to Netlify with JAMstack optimization',
    icon: '🌐',
    features: ['Forms', 'Functions', 'Split Testing'],
  },
  AWS: {
    id: 'aws',
    name: 'AWS',
    description: 'Deploy to AWS with full control',
    icon: '☁️',
    features: ['S3', 'CloudFront', 'Lambda'],
  },
}

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '3 projects',
      'Basic monitoring',
      'Community support',
      '100 deployments/month',
    ],
    limits: {
      projects: 3,
      deployments: 100,
      monitoring: 'basic',
    },
  },
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 19,
    interval: 'month',
    features: [
      '10 projects',
      'Advanced monitoring',
      'Email support',
      'Unlimited deployments',
      'Custom domains',
    ],
    limits: {
      projects: 10,
      deployments: -1, // unlimited
      monitoring: 'advanced',
    },
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 49,
    interval: 'month',
    features: [
      'Unlimited projects',
      'Premium monitoring',
      'Priority support',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations',
    ],
    limits: {
      projects: -1, // unlimited
      deployments: -1, // unlimited
      monitoring: 'premium',
    },
  },
}

// Monitoring Configuration
export const MONITORING_CONFIG = {
  DEFAULT_CHECK_INTERVAL: 60000, // 1 minute
  UPTIME_THRESHOLDS: {
    EXCELLENT: 99.9,
    GOOD: 99.5,
    FAIR: 99.0,
    POOR: 95.0,
  },
  RESPONSE_TIME_THRESHOLDS: {
    FAST: 200,
    AVERAGE: 500,
    SLOW: 1000,
    VERY_SLOW: 2000,
  },
  ALERT_TYPES: {
    DOWNTIME: 'downtime',
    SLOW_RESPONSE: 'slow_response',
    ERROR_RATE: 'error_rate',
    SSL_EXPIRY: 'ssl_expiry',
  },
}

// Time Ranges for Analytics
export const TIME_RANGES = {
  '1h': { label: '1 Hour', value: '1h' },
  '24h': { label: '24 Hours', value: '24h' },
  '7d': { label: '7 Days', value: '7d' },
  '30d': { label: '30 Days', value: '30d' },
  '90d': { label: '90 Days', value: '90d' },
}

// Status Types
export const STATUS_TYPES = {
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  BUILDING: 'building',
  DEPLOYED: 'deployed',
}

// Notification Types
export const NOTIFICATION_TYPES = {
  EMAIL: 'email',
  SLACK: 'slack',
  WEBHOOK: 'webhook',
  SMS: 'sms',
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. Please check your permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait and try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  DEPLOYMENT_STARTED: 'Deployment started successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  INTEGRATION_CONNECTED: 'Integration connected successfully!',
  SUBSCRIPTION_UPDATED: 'Subscription updated successfully!',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'deploymate_token',
  USER_PREFERENCES: 'deploymate_preferences',
  THEME: 'deploymate_theme',
  SIDEBAR_COLLAPSED: 'deploymate_sidebar_collapsed',
}

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  DEPLOYMENTS: '/deployments',
  MONITORING: '/monitoring',
  SETTINGS: '/settings',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GITHUB_CALLBACK: '/auth/github/callback',
    VERCEL_CALLBACK: '/auth/vercel/callback',
  },
}

// File Extensions for Project Detection
export const PROJECT_TYPES = {
  REACT: {
    extensions: ['.jsx', '.tsx'],
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    framework: 'React',
  },
  VUE: {
    extensions: ['.vue'],
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    framework: 'Vue.js',
  },
  ANGULAR: {
    extensions: ['angular.json'],
    buildCommand: 'ng build',
    outputDirectory: 'dist',
    framework: 'Angular',
  },
  NEXT: {
    extensions: ['next.config.js'],
    buildCommand: 'npm run build',
    outputDirectory: '.next',
    framework: 'Next.js',
  },
  NUXT: {
    extensions: ['nuxt.config.js'],
    buildCommand: 'npm run build',
    outputDirectory: '.nuxt',
    framework: 'Nuxt.js',
  },
  STATIC: {
    extensions: ['.html'],
    buildCommand: null,
    outputDirectory: '.',
    framework: 'Static HTML',
  },
}
