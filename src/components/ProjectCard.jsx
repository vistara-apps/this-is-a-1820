import React from 'react'
import { ExternalLink, Github, Settings } from 'lucide-react'
import DeploymentStatusIndicator from './DeploymentStatusIndicator'
import clsx from 'clsx'

const ProjectCard = ({ project, variant = 'default', onEdit, onView }) => {
  const isCompact = variant === 'compact'

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isCompact) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
        <div className="flex items-center space-x-3">
          <DeploymentStatusIndicator status={project.status} />
          <div>
            <p className="text-sm font-medium text-text-primary">{project.name}</p>
            <p className="text-xs text-text-secondary">
              Last deployed {formatDate(project.lastDeployment)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {project.deploymentUrl && (
            <button
              onClick={() => window.open(project.deploymentUrl, '_blank')}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="View deployment"
            >
              <ExternalLink className="w-4 h-4 text-text-secondary" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-card p-6 transition-all duration-200',
      'hover:shadow-lg hover:-translate-y-1'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{project.name}</h3>
          <p className="text-sm text-text-secondary">{project.deploymentTarget}</p>
        </div>
        <div className="flex items-center space-x-2">
          <DeploymentStatusIndicator status={project.status} />
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Project settings"
            >
              <Settings className="w-4 h-4 text-text-secondary" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Github className="w-4 h-4" />
          <span className="truncate">{project.gitRepoUrl}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last deployed:</span>
          <span className="text-text-primary">{formatDate(project.lastDeployment)}</span>
        </div>

        {project.monitoringEnabled && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Monitoring:</span>
            <span className="text-green-600 font-medium">Enabled</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
        {project.deploymentUrl && (
          <button
            onClick={() => window.open(project.deploymentUrl, '_blank')}
            className="flex items-center space-x-2 text-sm text-primary hover:text-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live</span>
          </button>
        )}
        {onView && (
          <button
            onClick={() => onView(project)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectCard