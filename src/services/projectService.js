/**
 * Project Service
 * Handles project management, deployment, and monitoring operations
 */

import { apiClient } from './api.js'

export class ProjectService {
  /**
   * Get all projects for the current user
   */
  async getProjects() {
    try {
      const response = await apiClient.get('/projects')
      return {
        success: true,
        projects: response.projects,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        projects: [],
      }
    }
  }

  /**
   * Get a specific project by ID
   */
  async getProject(projectId) {
    try {
      const response = await apiClient.get(`/projects/${projectId}`)
      return {
        success: true,
        project: response.project,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Create a new project
   */
  async createProject(projectData) {
    try {
      const response = await apiClient.post('/projects', projectData)
      return {
        success: true,
        project: response.project,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update an existing project
   */
  async updateProject(projectId, updates) {
    try {
      const response = await apiClient.put(`/projects/${projectId}`, updates)
      return {
        success: true,
        project: response.project,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId) {
    try {
      await apiClient.delete(`/projects/${projectId}`)
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Trigger a manual deployment
   */
  async deployProject(projectId, options = {}) {
    try {
      const response = await apiClient.post(`/projects/${projectId}/deploy`, options)
      return {
        success: true,
        deployment: response.deployment,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get deployment history for a project
   */
  async getDeployments(projectId, limit = 10) {
    try {
      const response = await apiClient.get(`/projects/${projectId}/deployments?limit=${limit}`)
      return {
        success: true,
        deployments: response.deployments,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        deployments: [],
      }
    }
  }

  /**
   * Get project monitoring data
   */
  async getMonitoringData(projectId, timeRange = '24h') {
    try {
      const response = await apiClient.get(`/projects/${projectId}/monitoring?range=${timeRange}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      }
    }
  }

  /**
   * Update monitoring configuration
   */
  async updateMonitoringConfig(projectId, config) {
    try {
      const response = await apiClient.put(`/projects/${projectId}/monitoring`, config)
      return {
        success: true,
        config: response.config,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get deployment logs
   */
  async getDeploymentLogs(deploymentId) {
    try {
      const response = await apiClient.get(`/deployments/${deploymentId}/logs`)
      return {
        success: true,
        logs: response.logs,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        logs: [],
      }
    }
  }

  /**
   * Cancel a running deployment
   */
  async cancelDeployment(deploymentId) {
    try {
      await apiClient.post(`/deployments/${deploymentId}/cancel`)
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Generate deployment plan
   */
  async generateDeploymentPlan(projectData) {
    try {
      const response = await apiClient.post('/deployment-plan', projectData)
      return {
        success: true,
        plan: response.plan,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }
}

// Create singleton instance
export const projectService = new ProjectService()
