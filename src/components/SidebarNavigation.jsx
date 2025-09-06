import React from 'react'
import clsx from 'clsx'

const SidebarNavigation = ({ items, activeItem, onItemClick }) => {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = activeItem === item.id
        const Icon = item.icon

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={clsx(
              'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
            )}
          >
            <Icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}

export default SidebarNavigation