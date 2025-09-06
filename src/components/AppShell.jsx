import React from 'react'
import { 
  LayoutDashboard, 
  FolderOpen, 
  Rocket, 
  Activity, 
  Settings, 
  LogOut 
} from 'lucide-react'
import SidebarNavigation from './SidebarNavigation'
import { useAuthStore } from '../store/authStore'

const AppShell = ({ children, activeView, onViewChange }) => {
  const { user, logout } = useAuthStore()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'deployments', label: 'Deployments', icon: Rocket },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-bg">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-card flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">DeployMate</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <SidebarNavigation 
            items={navigationItems}
            activeItem={activeView}
            onItemClick={onViewChange}
          />
        </div>

        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell