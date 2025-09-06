import React, { useState } from 'react'
import { RefreshCw, Calendar, Filter } from 'lucide-react'
import DeploymentStatusIndicator from './DeploymentStatusIndicator'
import Button from './Button'
import { useDeploymentStore } from '../store/deploymentStore'
import { useProjectStore } from '../store/projectStore'

const Deployments = () => {
  const { deployments } = useDeploymentStore()
  const { projects } = useProjectStore()
  const [statusFilter, setStatusFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')

  const filteredDeployments = deployments.filter(deployment => {
    const matchesStatus = statusFilter === 'all' || deployment.status === statusFilter
    const matchesProject = projectFilter === 'all' || deployment.projectId === projectFilter
    return matchesStatus && matchesProject
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project?.name || 'Unknown Project'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Deployments</h1>
          <p className="text-text-secondary mt-1">
            Track all your deployment history and status
          </p>
        </div>
        <Button
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-text-secondary" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Deployments List */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        {filteredDeployments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Commit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Deployed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDeployments.map((deployment) => (
                  <tr key={deployment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DeploymentStatusIndicator status={deployment.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {getProjectName(deployment.projectId)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-text-primary font-mono">
                          {deployment.commitHash}
                        </div>
                        <div className="text-sm text-text-secondary truncate max-w-xs">
                          {deployment.commitMessage}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {deployment.duration ? `${deployment.duration}s` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {formatDate(deployment.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {deployment.deploymentUrl && (
                        <button
                          onClick={() => window.open(deployment.deploymentUrl, '_blank')}
                          className="text-primary hover:text-blue-700"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No deployments found</h3>
            <p className="text-text-secondary">
              No deployments match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Deployments