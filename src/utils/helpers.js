/**
 * Utility Helper Functions
 * Common utility functions used throughout the application
 */

import { ERROR_MESSAGES, STATUS_TYPES, TIME_RANGES } from './constants.js'

/**
 * Format date to human readable string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return 'N/A'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  
  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(dateObj, { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Format duration in milliseconds to human readable string
 */
export const formatDuration = (milliseconds) => {
  if (!milliseconds || milliseconds < 0) return '0s'
  
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  
  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

/**
 * Format file size in bytes to human readable string
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B'
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

/**
 * Format percentage with specified decimal places
 */
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number') return '0%'
  return `${value.toFixed(decimals)}%`
}

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Generate a random ID
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `${prefix}${timestamp}${randomStr}`
}

/**
 * Debounce function to limit function calls
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit function calls
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Deep clone an object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  return Object.keys(obj).length === 0
}

/**
 * Capitalize first letter of string
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert camelCase to kebab-case
 */
export const camelToKebab = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Convert kebab-case to camelCase
 */
export const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Extract domain from URL
 */
export const extractDomain = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

/**
 * Get status color based on status type
 */
export const getStatusColor = (status) => {
  const colors = {
    [STATUS_TYPES.SUCCESS]: 'text-green-600 bg-green-100',
    [STATUS_TYPES.PENDING]: 'text-yellow-600 bg-yellow-100',
    [STATUS_TYPES.FAILED]: 'text-red-600 bg-red-100',
    [STATUS_TYPES.CANCELLED]: 'text-gray-600 bg-gray-100',
    [STATUS_TYPES.BUILDING]: 'text-blue-600 bg-blue-100',
    [STATUS_TYPES.DEPLOYED]: 'text-green-600 bg-green-100',
  }
  return colors[status] || 'text-gray-600 bg-gray-100'
}

/**
 * Get uptime color based on percentage
 */
export const getUptimeColor = (uptime) => {
  if (uptime >= 99.9) return 'text-green-600'
  if (uptime >= 99.5) return 'text-yellow-600'
  if (uptime >= 99.0) return 'text-orange-600'
  return 'text-red-600'
}

/**
 * Get response time color based on milliseconds
 */
export const getResponseTimeColor = (responseTime) => {
  if (responseTime <= 200) return 'text-green-600'
  if (responseTime <= 500) return 'text-yellow-600'
  if (responseTime <= 1000) return 'text-orange-600'
  return 'text-red-600'
}

/**
 * Parse error message from API response
 */
export const parseErrorMessage = (error) => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.data?.message) return error.data.message
  if (error?.status) {
    const statusMessages = {
      400: ERROR_MESSAGES.VALIDATION_ERROR,
      401: ERROR_MESSAGES.UNAUTHORIZED,
      403: ERROR_MESSAGES.FORBIDDEN,
      404: ERROR_MESSAGES.NOT_FOUND,
      429: ERROR_MESSAGES.RATE_LIMITED,
      500: ERROR_MESSAGES.SERVER_ERROR,
    }
    return statusMessages[error.status] || ERROR_MESSAGES.SERVER_ERROR
  }
  return ERROR_MESSAGES.NETWORK_ERROR
}

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      return true
    } catch (err) {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

/**
 * Download data as file
 */
export const downloadFile = (data, filename, type = 'application/json') => {
  const blob = new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0'
  return num.toLocaleString()
}

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0
  return ((current - previous) / previous) * 100
}

/**
 * Sort array of objects by key
 */
export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Group array of objects by key
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

/**
 * Get time range label
 */
export const getTimeRangeLabel = (range) => {
  return TIME_RANGES[range]?.label || range
}

/**
 * Check if user agent is mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    })
  }
}

/**
 * Generate color from string (for avatars, etc.)
 */
export const generateColorFromString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const hue = hash % 360
  return `hsl(${hue}, 70%, 50%)`
}
