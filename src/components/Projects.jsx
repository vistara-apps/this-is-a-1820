import React, { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import ProjectCard from './ProjectCard'
import Button from './Button'
import InputWithLabel from './InputWithLabel'
import CreateProjectModal from './CreateProjectModal'
import { useProjectStore } from '../store/projectStore'

const Projects = () => {
  const { projects } = useProjectStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.gitRepoUrl.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Projects</h1>
          <p className="text-text-secondary mt-1">
            Manage your deployed applications
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-text-secondary" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="deployed">Deployed</option>
            <option value="building">Building</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(project) => console.log('Edit project:', project)}
              onView={(project) => console.log('View project:', project)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No projects found</h3>
          <p className="text-text-secondary mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'No projects match your current filters.'
              : 'Get started by creating your first project.'
            }
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Project
            </Button>
          )}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}

export default Projects