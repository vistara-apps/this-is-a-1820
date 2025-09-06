/**
 * Custom React Hooks for API Operations
 * Provides reusable hooks for common API patterns
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { parseErrorMessage } from '../utils/helpers.js'

/**
 * Generic API hook for handling async operations
 */
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await apiFunction(...args)
      
      if (mountedRef.current) {
        if (result.success) {
          setData(result.data || result)
        } else {
          setError(result.error || 'An error occurred')
        }
      }
      
      return result
    } catch (err) {
      const errorMessage = parseErrorMessage(err)
      if (mountedRef.current) {
        setError(errorMessage)
      }
      return { success: false, error: errorMessage }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, dependencies)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}

/**
 * Hook for automatic API calls on mount
 */
export const useApiCall = (apiFunction, dependencies = [], options = {}) => {
  const { immediate = true, ...apiOptions } = options
  const { data, loading, error, execute, reset } = useApi(apiFunction, dependencies)

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, dependencies)

  return {
    data,
    loading,
    error,
    refetch: execute,
    reset,
  }
}

/**
 * Hook for paginated API calls
 */
export const usePaginatedApi = (apiFunction, initialPage = 1, pageSize = 10) => {
  const [page, setPage] = useState(initialPage)
  const [allData, setAllData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const { data, loading, error, execute } = useApi(apiFunction, [page, pageSize])

  const loadMore = useCallback(async () => {
    const result = await execute(page, pageSize)
    if (result.success && result.data) {
      setAllData(prev => [...prev, ...result.data])
      setHasMore(result.data.length === pageSize)
      setPage(prev => prev + 1)
    }
    return result
  }, [execute, page, pageSize])

  const reset = useCallback(() => {
    setPage(initialPage)
    setAllData([])
    setHasMore(true)
  }, [initialPage])

  useEffect(() => {
    if (data) {
      if (page === initialPage) {
        setAllData(data)
      }
      setHasMore(data.length === pageSize)
    }
  }, [data, page, initialPage, pageSize])

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    page,
  }
}

/**
 * Hook for optimistic updates
 */
export const useOptimisticApi = (apiFunction, updateFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (optimisticData, ...args) => {
    try {
      setLoading(true)
      setError(null)
      
      // Apply optimistic update
      const previousData = data
      if (updateFunction && optimisticData) {
        setData(updateFunction(data, optimisticData))
      }
      
      const result = await apiFunction(...args)
      
      if (result.success) {
        setData(result.data || result)
      } else {
        // Revert optimistic update on error
        setData(previousData)
        setError(result.error || 'An error occurred')
      }
      
      return result
    } catch (err) {
      const errorMessage = parseErrorMessage(err)
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [apiFunction, updateFunction, data])

  return {
    data,
    loading,
    error,
    execute,
    setData,
  }
}

/**
 * Hook for polling API calls
 */
export const usePolling = (apiFunction, interval = 5000, dependencies = []) => {
  const [isPolling, setIsPolling] = useState(false)
  const { data, loading, error, execute } = useApi(apiFunction, dependencies)
  const intervalRef = useRef(null)

  const startPolling = useCallback(() => {
    if (!isPolling) {
      setIsPolling(true)
      execute() // Initial call
      intervalRef.current = setInterval(() => {
        execute()
      }, interval)
    }
  }, [isPolling, execute, interval])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPolling(false)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    data,
    loading,
    error,
    isPolling,
    startPolling,
    stopPolling,
    execute,
  }
}

/**
 * Hook for debounced API calls
 */
export const useDebouncedApi = (apiFunction, delay = 300, dependencies = []) => {
  const [debouncedValue, setDebouncedValue] = useState('')
  const { data, loading, error, execute } = useApi(apiFunction, dependencies)
  const timeoutRef = useRef(null)

  const debouncedExecute = useCallback((value, ...args) => {
    setDebouncedValue(value)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      execute(value, ...args)
    }, delay)
  }, [execute, delay])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute: debouncedExecute,
    debouncedValue,
  }
}

/**
 * Hook for caching API responses
 */
export const useCachedApi = (apiFunction, cacheKey, ttl = 300000, dependencies = []) => {
  const [cache, setCache] = useState(new Map())
  const { data, loading, error, execute } = useApi(apiFunction, dependencies)

  const cachedExecute = useCallback(async (...args) => {
    const key = `${cacheKey}_${JSON.stringify(args)}`
    const cached = cache.get(key)
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return { success: true, data: cached.data }
    }
    
    const result = await execute(...args)
    
    if (result.success) {
      setCache(prev => new Map(prev).set(key, {
        data: result.data || result,
        timestamp: Date.now(),
      }))
    }
    
    return result
  }, [execute, cacheKey, cache, ttl])

  const clearCache = useCallback(() => {
    setCache(new Map())
  }, [])

  return {
    data,
    loading,
    error,
    execute: cachedExecute,
    clearCache,
  }
}

/**
 * Hook for handling form submissions with API calls
 */
export const useFormApi = (apiFunction, options = {}) => {
  const { onSuccess, onError, resetOnSuccess = true } = options
  const [formData, setFormData] = useState({})
  const [touched, setTouched] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const { data, loading, error, execute } = useApi(apiFunction)

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault()
    
    const result = await execute(formData)
    
    if (result.success) {
      if (resetOnSuccess) {
        setFormData({})
        setTouched({})
        setValidationErrors({})
      }
      onSuccess?.(result)
    } else {
      onError?.(result.error)
    }
    
    return result
  }, [execute, formData, resetOnSuccess, onSuccess, onError])

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [validationErrors])

  const setFieldError = useCallback((field, error) => {
    setValidationErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const reset = useCallback(() => {
    setFormData({})
    setTouched({})
    setValidationErrors({})
  }, [])

  return {
    formData,
    touched,
    validationErrors,
    loading,
    error,
    data,
    handleSubmit,
    updateField,
    setFieldError,
    reset,
  }
}
