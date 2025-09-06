import React from 'react'
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react'
import clsx from 'clsx'

const DeploymentStatusIndicator = ({ status, size = 'sm' }) => {
  const variants = {
    success: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: 'Deployed',
    },
    pending: {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      label: 'Building',
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      label: 'Failed',
    },
    building: {
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      label: 'Building',
    },
    deployed: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: 'Deployed',
    },
  }

  const variant = variants[status] || variants.pending
  const Icon = variant.icon

  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  const containerSize = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'

  return (
    <div className="flex items-center space-x-2">
      <div className={clsx(
        'rounded-full flex items-center justify-center',
        variant.bg,
        containerSize
      )}>
        <Icon className={clsx(variant.color, iconSize)} />
      </div>
      <span className={clsx(
        'font-medium',
        variant.color,
        size === 'lg' ? 'text-sm' : 'text-xs'
      )}>
        {variant.label}
      </span>
    </div>
  )
}

export default DeploymentStatusIndicator