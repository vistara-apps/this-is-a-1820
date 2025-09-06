/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { apiClient } from './api.js'

export class AuthService {
  /**
   * Authenticate user with email and password
   */
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      })

      if (response.token) {
        apiClient.setToken(response.token)
      }

      return {
        success: true,
        user: response.user,
        token: response.token,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData)

      if (response.token) {
        apiClient.setToken(response.token)
      }

      return {
        success: true,
        user: response.user,
        token: response.token,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * OAuth login with GitHub
   */
  async loginWithGitHub(code) {
    try {
      const response = await apiClient.post('/auth/github', { code })

      if (response.token) {
        apiClient.setToken(response.token)
      }

      return {
        success: true,
        user: response.user,
        token: response.token,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.warn('Logout API call failed:', error.message)
    } finally {
      apiClient.setToken(null)
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me')
      return {
        success: true,
        user: response.user,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates) {
    try {
      const response = await apiClient.put('/auth/profile', updates)
      return {
        success: true,
        user: response.user,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    try {
      await apiClient.post('/auth/password-reset', { email })
      return {
        success: true,
        message: 'Password reset email sent',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      await apiClient.post('/auth/password-reset/confirm', {
        token,
        password: newPassword,
      })
      return {
        success: true,
        message: 'Password reset successfully',
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
export const authService = new AuthService()
