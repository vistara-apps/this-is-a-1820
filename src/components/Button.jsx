import React from 'react'
import clsx from 'clsx'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-primary disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-text-primary hover:bg-gray-200 focus:ring-gray-300 disabled:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button