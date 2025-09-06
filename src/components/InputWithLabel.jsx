import React from 'react'
import clsx from 'clsx'

const InputWithLabel = ({ 
  label, 
  id, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          error ? 'border-red-500' : 'border-gray-300'
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default InputWithLabel