import React, { useState } from 'react'
import { Activity, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useProjectStore } from '../store/projectStore'

const Monitoring = () => {
  const { projects } = useProjectStore()
  const [selectedProject, setSelectedProject] = useState('all')

  // Mock monitoring data
  const uptime = 99.2
  const responseTime = 145
  const errorRate = 0.3

  const performanceData = [
    { time: '00:00', responseTime: 120, uptime: 100 },
    { time: '04:00', responseTime: 135, uptime: 99.9 },
    { time: '08:00', responseTime: 145, uptime: 99.8 },
    { time: '12:00', responseTime: 160, uptime: 99.5 },
    { time: '16:00', responseTime: 155, uptime: 99.7 },
    { time: '20:00', responseTime: 140, uptime: 99.9 },
  ]

  const monitoredProjects = projects.filter(p => p.monitoringEnabled)

  const alerts = [
    {
      id: '1',
      type: 'warning',
      message: 'High response time detected on My Portfolio',
      timestamp: '2024-01-15T10:30:00Z',
      resolved: false,
    },
    {
      id: '2',
      type: 'error',
      message: 'Deployment failed for E-commerce App',
      timestamp: '2024-01-14T16:45:00Z',
      resolved: true,
    },
    {
      id: '3',
      type: 'info',
      message: 'Successful deployment for Blog Platform',
      timestamp: '2024-01-14T14:20:00Z',
      resolved: true,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Monitoring</h1>
        <p className="text-text-secondary mt-1">
          Monitor your application performance and health
        </p>
      </div>

      {/* Project Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-text-primary">Project:</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Projects</option>
          {monitoredProjects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Uptime</p>
              <p className="text-2xl font-semibold text-text-primary">{uptime}%</p>
              <p className="text-xs text-green-600">Last 30 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Avg Response Time</p>
              <p className="text-2xl font-semibold text-text-primary">{responseTime}ms</p>
              <p className="text-xs text-blue-600">Last 24 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Error Rate</p>
              <p className="text-2xl font-semibold text-text-primary">{errorRate}%</p>
              <p className="text-xs text-yellow-600">Last 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Response Time Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="hsl(220, 85%, 55%)" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(220, 85%, 55%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  alert.type === 'error' ? 'bg-red-100' :
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <AlertCircle className={`w-4 h-4 ${
                    alert.type === 'error' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">{alert.message}</p>
                  <p className="text-xs text-text-secondary">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    alert.resolved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monitored Projects */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Monitored Projects</h2>
        {monitoredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monitoredProjects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-text-primary">{project.name}</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-sm text-text-secondary">
                  {project.deploymentUrl || 'No deployment URL'}
                </p>
                <div className="mt-2 flex items-center space-x-4 text-xs text-text-secondary">
                  <span>Uptime: 99.9%</span>
                  <span>Response: 120ms</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="mx-auto h-12 w-12 text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No monitored projects</h3>
            <p className="text-text-secondary">
              Enable monitoring for your projects to see performance metrics here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Monitoring