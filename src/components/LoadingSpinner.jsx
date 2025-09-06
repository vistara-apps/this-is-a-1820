/**
 * Loading Spinner Component
 * Reusable loading indicator with different sizes and variants
 */

import React from 'react'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  text = '',
  fullScreen = false,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-text-secondary',
    white: 'text-white',
    accent: 'text-accent',
  }

  const spinnerElement = (
    <div className={clsx('flex items-center justify-center', className)} {...props}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 
          className={clsx(
            'animate-spin',
            sizeClasses[size],
            variantClasses[variant]
          )} 
        />
        {text && (
          <p className={clsx(
            'text-sm',
            variantClasses[variant] === 'text-white' ? 'text-white' : 'text-text-secondary'
          )}>
            {text}
          </p>
        )}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {spinnerElement}
      </div>
    )
  }

  return spinnerElement
}

// Preset loading components for common use cases
export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="min-h-screen bg-bg flex items-center justify-center">
    <LoadingSpinner size="xl" text={text} />
  </div>
)

export const CardLoader = ({ text = '' }) => (
  <div className="bg-white rounded-lg shadow-card p-8 flex items-center justify-center min-h-32">
    <LoadingSpinner size="lg" text={text} />
  </div>
)

export const ButtonLoader = ({ size = 'sm' }) => (
  <LoadingSpinner size={size} variant="white" />
)

export const InlineLoader = ({ text = 'Loading...' }) => (
  <div className="flex items-center space-x-2 py-2">
    <LoadingSpinner size="sm" />
    <span className="text-sm text-text-secondary">{text}</span>
  </div>
)

export const TableLoader = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
)

export const SkeletonLoader = ({ 
  lines = 3, 
  className = '',
  showAvatar = false 
}) => (
  <div className={clsx('animate-pulse space-y-3', className)}>
    {showAvatar && (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )}
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        {index === lines - 1 && (
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        )}
      </div>
    ))}
  </div>
)

export default LoadingSpinner
