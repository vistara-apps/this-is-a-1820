/**
 * Monitoring Service
 * Handles application monitoring, health checks, and alerting
 */

import { apiClient } from './api.js'

export class MonitoringService {
  /**
   * Get monitoring dashboard data
   */
  async getDashboardData(timeRange = '24h') {
    try {
      const response = await apiClient.get(`/monitoring/dashboard?range=${timeRange}`)
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
   * Get project health status
   */
  async getProjectHealth(projectId) {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/health`)
      return {
        success: true,
        health: response.health,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        health: null,
      }
    }
  }

  /**
   * Get uptime statistics
   */
  async getUptimeStats(projectId, timeRange = '30d') {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/uptime?range=${timeRange}`)
      return {
        success: true,
        uptime: response.uptime,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        uptime: null,
      }
    }
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(projectId, timeRange = '24h') {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/performance?range=${timeRange}`)
      return {
        success: true,
        metrics: response.metrics,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        metrics: null,
      }
    }
  }

  /**
   * Get error logs
   */
  async getErrorLogs(projectId, limit = 50, offset = 0) {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/errors?limit=${limit}&offset=${offset}`)
      return {
        success: true,
        errors: response.errors,
        total: response.total,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        errors: [],
        total: 0,
      }
    }
  }

  /**
   * Get incident history
   */
  async getIncidents(projectId, limit = 20) {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/incidents?limit=${limit}`)
      return {
        success: true,
        incidents: response.incidents,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        incidents: [],
      }
    }
  }

  /**
   * Create a new incident
   */
  async createIncident(projectId, incidentData) {
    try {
      const response = await apiClient.post(`/monitoring/projects/${projectId}/incidents`, incidentData)
      return {
        success: true,
        incident: response.incident,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update incident status
   */
  async updateIncident(incidentId, updates) {
    try {
      const response = await apiClient.put(`/monitoring/incidents/${incidentId}`, updates)
      return {
        success: true,
        incident: response.incident,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get alert rules for a project
   */
  async getAlertRules(projectId) {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/alerts`)
      return {
        success: true,
        rules: response.rules,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rules: [],
      }
    }
  }

  /**
   * Create alert rule
   */
  async createAlertRule(projectId, ruleData) {
    try {
      const response = await apiClient.post(`/monitoring/projects/${projectId}/alerts`, ruleData)
      return {
        success: true,
        rule: response.rule,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update alert rule
   */
  async updateAlertRule(ruleId, updates) {
    try {
      const response = await apiClient.put(`/monitoring/alerts/${ruleId}`, updates)
      return {
        success: true,
        rule: response.rule,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Delete alert rule
   */
  async deleteAlertRule(ruleId) {
    try {
      await apiClient.delete(`/monitoring/alerts/${ruleId}`)
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
   * Test alert rule
   */
  async testAlertRule(ruleId) {
    try {
      const response = await apiClient.post(`/monitoring/alerts/${ruleId}/test`)
      return {
        success: true,
        result: response.result,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get notification channels
   */
  async getNotificationChannels() {
    try {
      const response = await apiClient.get('/monitoring/notifications/channels')
      return {
        success: true,
        channels: response.channels,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        channels: [],
      }
    }
  }

  /**
   * Create notification channel
   */
  async createNotificationChannel(channelData) {
    try {
      const response = await apiClient.post('/monitoring/notifications/channels', channelData)
      return {
        success: true,
        channel: response.channel,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update notification channel
   */
  async updateNotificationChannel(channelId, updates) {
    try {
      const response = await apiClient.put(`/monitoring/notifications/channels/${channelId}`, updates)
      return {
        success: true,
        channel: response.channel,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Delete notification channel
   */
  async deleteNotificationChannel(channelId) {
    try {
      await apiClient.delete(`/monitoring/notifications/channels/${channelId}`)
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
   * Test notification channel
   */
  async testNotificationChannel(channelId) {
    try {
      const response = await apiClient.post(`/monitoring/notifications/channels/${channelId}/test`)
      return {
        success: true,
        result: response.result,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get status page data
   */
  async getStatusPage(projectId) {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/status`)
      return {
        success: true,
        status: response.status,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: null,
      }
    }
  }

  /**
   * Update status page
   */
  async updateStatusPage(projectId, statusData) {
    try {
      const response = await apiClient.put(`/monitoring/projects/${projectId}/status`, statusData)
      return {
        success: true,
        status: response.status,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get synthetic monitoring checks
   */
  async getSyntheticChecks(projectId) {
    try {
      const response = await apiClient.get(`/monitoring/projects/${projectId}/synthetic`)
      return {
        success: true,
        checks: response.checks,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        checks: [],
      }
    }
  }

  /**
   * Create synthetic monitoring check
   */
  async createSyntheticCheck(projectId, checkData) {
    try {
      const response = await apiClient.post(`/monitoring/projects/${projectId}/synthetic`, checkData)
      return {
        success: true,
        check: response.check,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update synthetic monitoring check
   */
  async updateSyntheticCheck(checkId, updates) {
    try {
      const response = await apiClient.put(`/monitoring/synthetic/${checkId}`, updates)
      return {
        success: true,
        check: response.check,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Delete synthetic monitoring check
   */
  async deleteSyntheticCheck(checkId) {
    try {
      await apiClient.delete(`/monitoring/synthetic/${checkId}`)
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
}

// Create singleton instance
export const monitoringService = new MonitoringService()
