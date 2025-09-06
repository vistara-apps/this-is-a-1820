import React, { useState } from 'react'
import AppShell from './components/AppShell'
import Dashboard from './components/Dashboard'
import Projects from './components/Projects'
import Deployments from './components/Deployments'
import Monitoring from './components/Monitoring'
import Settings from './components/Settings'
import { useAuthStore } from './store/authStore'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const { user, login } = useAuthStore()

  // Simple auth check - in real app this would be more sophisticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-card">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to DeployMate</h1>
            <p className="text-gray-600">Launch your web app in minutes, not days.</p>
          </div>
          <button
            onClick={() => login({ email: 'demo@deploymate.dev', name: 'Demo User' })}
            className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue with Demo Account
          </button>
        </div>
      </div>
    )
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'projects':
        return <Projects />
      case 'deployments':
        return <Deployments />
      case 'monitoring':
        return <Monitoring />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </AppShell>
  )
}

export default App