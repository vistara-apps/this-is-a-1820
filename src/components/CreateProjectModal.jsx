import React, { useState } from 'react'
import { X, Github } from 'lucide-react'
import Button from './Button'
import InputWithLabel from './InputWithLabel'
import { useProjectStore } from '../store/projectStore'

const CreateProjectModal = ({ onClose, onSuccess }) => {
  const { addProject } = useProjectStore()
  const [formData, setFormData] = useState({
    name: '',
    gitRepoUrl: '',
    deploymentTarget: 'vercel',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newProject = {
      ...formData,
      status: 'building',
      lastDeployment: new Date().toISOString(),
      deploymentUrl: null,
      monitoringEnabled: false,
    }

    addProject(newProject)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-card max-w-md w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-text-primary">Create New Project</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputWithLabel
            label="Project Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="My Awesome App"
            required
          />

          <InputWithLabel
            label="Git Repository URL"
            id="gitRepoUrl"
            name="gitRepoUrl"
            value={formData.gitRepoUrl}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            required
          />

          <div>
            <label htmlFor="deploymentTarget" className="block text-sm font-medium text-text-primary mb-2">
              Deployment Target
            </label>
            <select
              id="deploymentTarget"
              name="deploymentTarget"
              value={formData.deploymentTarget}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="vercel">Vercel</option>
              <option value="netlify">Netlify</option>
              <option value="aws">AWS</option>
            </select>
          </div>

          <InputWithLabel
            label="Build Command"
            id="buildCommand"
            name="buildCommand"
            value={formData.buildCommand}
            onChange={handleChange}
            placeholder="npm run build"
          />

          <InputWithLabel
            label="Output Directory"
            id="outputDirectory"
            name="outputDirectory"
            value={formData.outputDirectory}
            onChange={handleChange}
            placeholder="dist"
          />

          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !formData.name || !formData.gitRepoUrl}
              className="flex-1"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectModal