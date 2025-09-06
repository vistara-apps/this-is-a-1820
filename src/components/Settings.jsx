import React, { useState } from 'react'
import { User, CreditCard, Bell, Key, Github } from 'lucide-react'
import Button from './Button'
import InputWithLabel from './InputWithLabel'
import { useAuthStore } from '../store/authStore'

const Settings = () => {
  const { user, subscriptionTier, updateSubscription } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    deploymentSuccess: true,
    deploymentFailure: true,
    monitoring: false,
    weeklyReport: true,
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Key },
  ]

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      features: ['5 projects', 'Basic monitoring', 'Community support'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      features: ['Unlimited projects', 'Advanced monitoring', 'Priority support', 'Custom domains'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      features: ['Everything in Pro', 'Team collaboration', 'SLA guarantee', 'Dedicated support'],
    },
  ]

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            label="Name"
            id="name"
            defaultValue={user?.name || ''}
          />
          <InputWithLabel
            label="Email"
            id="email"
            type="email"
            defaultValue={user?.email || ''}
          />
        </div>
      </div>
      <div className="pt-4">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  )

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Current Plan</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary capitalize">{subscriptionTier} Plan</p>
              <p className="text-sm text-text-secondary">
                {subscriptionPlans.find(p => p.id === subscriptionTier)?.price}/month
              </p>
            </div>
            {subscriptionTier !== 'enterprise' && (
              <Button variant="primary" size="sm">Upgrade</Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-lg border-2 ${
                plan.id === subscriptionTier
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-center">
                <h4 className="text-lg font-semibold text-text-primary">{plan.name}</h4>
                <p className="text-2xl font-bold text-text-primary mt-2">
                  {plan.price}<span className="text-sm font-normal">/month</span>
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-text-secondary">
                    • {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.id === subscriptionTier ? (
                  <Button variant="secondary" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={() => updateSubscription(plan.id)}
                  >
                    {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {key === 'deploymentSuccess' && 'Deployment Success'}
                  {key === 'deploymentFailure' && 'Deployment Failure'}
                  {key === 'monitoring' && 'Monitoring Alerts'}
                  {key === 'weeklyReport' && 'Weekly Reports'}
                </p>
                <p className="text-sm text-text-secondary">
                  {key === 'deploymentSuccess' && 'Get notified when deployments complete successfully'}
                  {key === 'deploymentFailure' && 'Get notified when deployments fail'}
                  {key === 'monitoring' && 'Get notified about performance issues'}
                  {key === 'weeklyReport' && 'Receive weekly summary reports'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    [key]: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Connected Services</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center space-x-3">
              <Github className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium text-text-primary">GitHub</p>
                <p className="text-sm text-text-secondary">Connected as {user?.email}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Disconnect</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">V</span>
              </div>
              <div>
                <p className="font-medium text-text-primary">Vercel</p>
                <p className="text-sm text-text-secondary">Not connected</p>
              </div>
            </div>
            <Button variant="primary" size="sm">Connect</Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">API Keys</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-text-primary">Personal Access Token</p>
            <Button variant="secondary" size="sm">Generate New</Button>
          </div>
          <p className="text-sm text-text-secondary mb-2">
            Use this token to access the DeployMate API programmatically.
          </p>
          <div className="font-mono text-sm bg-white p-2 rounded border">
            dm_****************************
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'billing':
        return renderBillingTab()
      case 'notifications':
        return renderNotificationsTab()
      case 'integrations':
        return renderIntegrationsTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-text-primary">Settings</h1>
          <p className="text-text-secondary mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tab Navigation */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-card p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings