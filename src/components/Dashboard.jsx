import React from 'react'
import { Rocket, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import ProjectCard from './ProjectCard'
import DeploymentStatusIndicator from './DeploymentStatusIndicator'
import { useProjectStore } from '../store/projectStore'
import { useDeploymentStore } from '../store/deploymentStore'

const Dashboard = () => {
  const { projects } = useProjectStore()
  const { deployments } = useDeploymentStore()

  const stats = {
    totalProjects: projects.length,
    successfulDeployments: deployments.filter(d => d.status === 'success').length,
    failedDeployments: deployments.filter(d => d.status === 'failed').length,
    activeProjects: projects.filter(p => p.status === 'deployed').length,
  }

  const recentDeployments = deployments.slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Monitor your deployments and project health
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Total Projects</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Successful Deploys</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.successfulDeployments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Failed Deploys</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.failedDeployments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-secondary">Active Projects</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.activeProjects}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} variant="compact" />
            ))}
          </div>
        </div>

        {/* Recent Deployments */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Deployments</h2>
          <div className="space-y-4">
            {recentDeployments.map((deployment) => {
              const project = projects.find(p => p.id === deployment.projectId)
              return (
                <div key={deployment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    <DeploymentStatusIndicator status={deployment.status} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {project?.name || 'Unknown Project'}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {deployment.commitMessage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">
                      {new Date(deployment.timestamp).toLocaleDateString()}
                    </p>
                    {deployment.duration && (
                      <p className="text-xs text-text-secondary">
                        {deployment.duration}s
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard