/**
 * Integration Service
 * Handles third-party integrations with Vercel, GitHub, and Stripe
 */

import { apiClient } from './api.js'

export class IntegrationService {
  /**
   * GitHub Integration Methods
   */
  
  /**
   * Connect GitHub account
   */
  async connectGitHub(code) {
    try {
      const response = await apiClient.post('/integrations/github/connect', { code })
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get GitHub repositories
   */
  async getGitHubRepos() {
    try {
      const response = await apiClient.get('/integrations/github/repos')
      return {
        success: true,
        repos: response.repos,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        repos: [],
      }
    }
  }

  /**
   * Get repository branches
   */
  async getRepoBranches(owner, repo) {
    try {
      const response = await apiClient.get(`/integrations/github/repos/${owner}/${repo}/branches`)
      return {
        success: true,
        branches: response.branches,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        branches: [],
      }
    }
  }

  /**
   * Setup webhook for repository
   */
  async setupGitHubWebhook(owner, repo, projectId) {
    try {
      const response = await apiClient.post('/integrations/github/webhook', {
        owner,
        repo,
        projectId,
      })
      return {
        success: true,
        webhook: response.webhook,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Vercel Integration Methods
   */
  
  /**
   * Connect Vercel account
   */
  async connectVercel(token) {
    try {
      const response = await apiClient.post('/integrations/vercel/connect', { token })
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Create Vercel project
   */
  async createVercelProject(projectData) {
    try {
      const response = await apiClient.post('/integrations/vercel/projects', projectData)
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
   * Deploy to Vercel
   */
  async deployToVercel(projectId, deploymentData) {
    try {
      const response = await apiClient.post(`/integrations/vercel/projects/${projectId}/deploy`, deploymentData)
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
   * Get Vercel deployment status
   */
  async getVercelDeploymentStatus(deploymentId) {
    try {
      const response = await apiClient.get(`/integrations/vercel/deployments/${deploymentId}`)
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
   * Get Vercel project domains
   */
  async getVercelDomains(projectId) {
    try {
      const response = await apiClient.get(`/integrations/vercel/projects/${projectId}/domains`)
      return {
        success: true,
        domains: response.domains,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        domains: [],
      }
    }
  }

  /**
   * Stripe Integration Methods
   */
  
  /**
   * Create Stripe customer
   */
  async createStripeCustomer(customerData) {
    try {
      const response = await apiClient.post('/integrations/stripe/customers', customerData)
      return {
        success: true,
        customer: response.customer,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Create subscription
   */
  async createSubscription(customerId, priceId) {
    try {
      const response = await apiClient.post('/integrations/stripe/subscriptions', {
        customerId,
        priceId,
      })
      return {
        success: true,
        subscription: response.subscription,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update subscription
   */
  async updateSubscription(subscriptionId, updates) {
    try {
      const response = await apiClient.put(`/integrations/stripe/subscriptions/${subscriptionId}`, updates)
      return {
        success: true,
        subscription: response.subscription,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId) {
    try {
      const response = await apiClient.delete(`/integrations/stripe/subscriptions/${subscriptionId}`)
      return {
        success: true,
        subscription: response.subscription,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId) {
    try {
      const response = await apiClient.get(`/integrations/stripe/subscriptions/${subscriptionId}`)
      return {
        success: true,
        subscription: response.subscription,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Create payment method setup intent
   */
  async createSetupIntent(customerId) {
    try {
      const response = await apiClient.post('/integrations/stripe/setup-intent', { customerId })
      return {
        success: true,
        setupIntent: response.setupIntent,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get customer payment methods
   */
  async getPaymentMethods(customerId) {
    try {
      const response = await apiClient.get(`/integrations/stripe/customers/${customerId}/payment-methods`)
      return {
        success: true,
        paymentMethods: response.paymentMethods,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        paymentMethods: [],
      }
    }
  }

  /**
   * Get billing history
   */
  async getBillingHistory(customerId) {
    try {
      const response = await apiClient.get(`/integrations/stripe/customers/${customerId}/invoices`)
      return {
        success: true,
        invoices: response.invoices,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        invoices: [],
      }
    }
  }

  /**
   * General Integration Methods
   */
  
  /**
   * Get all connected integrations
   */
  async getConnectedIntegrations() {
    try {
      const response = await apiClient.get('/integrations')
      return {
        success: true,
        integrations: response.integrations,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        integrations: {},
      }
    }
  }

  /**
   * Disconnect an integration
   */
  async disconnectIntegration(provider) {
    try {
      await apiClient.delete(`/integrations/${provider}`)
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
export const integrationService = new IntegrationService()
