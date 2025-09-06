/**
 * Deployment Plan Generator Component
 * Generates customized deployment plans based on project configuration
 */

import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Circle, 
  Download, 
  Copy, 
  FileText,
  GitBranch,
  Settings,
  Monitor,
  Shield,
  Zap
} from 'lucide-react'
import Button from './Button'
import { copyToClipboard, downloadFile } from '../utils/helpers'
import { PROJECT_TYPES, DEPLOYMENT_TARGETS } from '../utils/constants'

const DeploymentPlanGenerator = ({ 
  projectData, 
  onPlanGenerated,
  className = '' 
}) => {
  const [plan, setPlan] = useState(null)
  const [checkedItems, setCheckedItems] = useState(new Set())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (projectData) {
      generatePlan(projectData)
    }
  }, [projectData])

  const generatePlan = async (data) => {
    setLoading(true)
    
    try {
      // Simulate API call to generate deployment plan
      const generatedPlan = createDeploymentPlan(data)
      setPlan(generatedPlan)
      onPlanGenerated?.(generatedPlan)
    } catch (error) {
      console.error('Failed to generate deployment plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const createDeploymentPlan = (data) => {
    const { 
      name, 
      gitRepoUrl, 
      deploymentTarget, 
      buildCommand, 
      outputDirectory,
      framework 
    } = data

    const target = DEPLOYMENT_TARGETS[deploymentTarget?.toUpperCase()] || DEPLOYMENT_TARGETS.VERCEL
    const projectType = detectProjectType(framework, buildCommand)

    return {
      id: `plan_${Date.now()}`,
      projectName: name,
      target: target,
      projectType: projectType,
      estimatedTime: calculateEstimatedTime(projectType, target),
      sections: [
        {
          id: 'preparation',
          title: 'Pre-deployment Preparation',
          icon: Settings,
          description: 'Essential setup steps before deployment',
          items: [
            {
              id: 'repo_access',
              title: 'Verify Repository Access',
              description: `Ensure you have access to ${gitRepoUrl}`,
              required: true,
              estimatedTime: '2 min'
            },
            {
              id: 'env_vars',
              title: 'Configure Environment Variables',
              description: 'Set up production environment variables',
              required: true,
              estimatedTime: '5 min'
            },
            {
              id: 'dependencies',
              title: 'Review Dependencies',
              description: 'Ensure all dependencies are production-ready',
              required: true,
              estimatedTime: '3 min'
            },
            {
              id: 'build_test',
              title: 'Test Build Locally',
              description: `Run "${buildCommand}" to verify build works`,
              required: true,
              estimatedTime: '5 min'
            }
          ]
        },
        {
          id: 'deployment',
          title: 'Deployment Configuration',
          icon: Zap,
          description: 'Configure deployment settings',
          items: [
            {
              id: 'connect_repo',
              title: 'Connect Repository',
              description: `Link ${gitRepoUrl} to ${target.name}`,
              required: true,
              estimatedTime: '3 min'
            },
            {
              id: 'build_settings',
              title: 'Configure Build Settings',
              description: `Set build command: "${buildCommand}", output: "${outputDirectory}"`,
              required: true,
              estimatedTime: '2 min'
            },
            {
              id: 'domain_setup',
              title: 'Configure Domain',
              description: 'Set up custom domain (optional)',
              required: false,
              estimatedTime: '10 min'
            },
            {
              id: 'deploy_trigger',
              title: 'Trigger Initial Deployment',
              description: 'Start the first deployment',
              required: true,
              estimatedTime: '1 min'
            }
          ]
        },
        {
          id: 'monitoring',
          title: 'Monitoring & Alerts',
          icon: Monitor,
          description: 'Set up monitoring and alerting',
          items: [
            {
              id: 'health_checks',
              title: 'Configure Health Checks',
              description: 'Set up uptime monitoring',
              required: true,
              estimatedTime: '5 min'
            },
            {
              id: 'error_tracking',
              title: 'Enable Error Tracking',
              description: 'Configure error monitoring and logging',
              required: false,
              estimatedTime: '10 min'
            },
            {
              id: 'alerts',
              title: 'Set Up Alerts',
              description: 'Configure email/Slack notifications',
              required: false,
              estimatedTime: '5 min'
            },
            {
              id: 'analytics',
              title: 'Enable Analytics',
              description: 'Set up performance and usage analytics',
              required: false,
              estimatedTime: '5 min'
            }
          ]
        },
        {
          id: 'security',
          title: 'Security & Performance',
          icon: Shield,
          description: 'Security and performance optimizations',
          items: [
            {
              id: 'ssl_cert',
              title: 'SSL Certificate',
              description: 'Ensure HTTPS is enabled',
              required: true,
              estimatedTime: '2 min'
            },
            {
              id: 'security_headers',
              title: 'Security Headers',
              description: 'Configure security headers',
              required: false,
              estimatedTime: '5 min'
            },
            {
              id: 'performance',
              title: 'Performance Optimization',
              description: 'Enable caching and compression',
              required: false,
              estimatedTime: '10 min'
            },
            {
              id: 'backup',
              title: 'Backup Strategy',
              description: 'Set up automated backups',
              required: false,
              estimatedTime: '15 min'
            }
          ]
        },
        {
          id: 'testing',
          title: 'Post-deployment Testing',
          icon: CheckCircle,
          description: 'Verify deployment success',
          items: [
            {
              id: 'smoke_test',
              title: 'Smoke Test',
              description: 'Verify basic functionality works',
              required: true,
              estimatedTime: '5 min'
            },
            {
              id: 'performance_test',
              title: 'Performance Test',
              description: 'Check page load times and responsiveness',
              required: true,
              estimatedTime: '10 min'
            },
            {
              id: 'mobile_test',
              title: 'Mobile Testing',
              description: 'Test on mobile devices',
              required: false,
              estimatedTime: '10 min'
            },
            {
              id: 'seo_check',
              title: 'SEO Verification',
              description: 'Verify meta tags and SEO elements',
              required: false,
              estimatedTime: '5 min'
            }
          ]
        }
      ]
    }
  }

  const detectProjectType = (framework, buildCommand) => {
    if (framework) {
      const type = Object.values(PROJECT_TYPES).find(
        type => type.framework.toLowerCase() === framework.toLowerCase()
      )
      if (type) return type
    }

    // Fallback to build command detection
    if (buildCommand?.includes('next')) return PROJECT_TYPES.NEXT
    if (buildCommand?.includes('nuxt')) return PROJECT_TYPES.NUXT
    if (buildCommand?.includes('ng build')) return PROJECT_TYPES.ANGULAR
    if (buildCommand?.includes('vue')) return PROJECT_TYPES.VUE
    
    return PROJECT_TYPES.REACT // Default
  }

  const calculateEstimatedTime = (projectType, target) => {
    const baseTime = 30 // Base time in minutes
    const complexityMultiplier = projectType.framework === 'Static HTML' ? 0.5 : 1
    const targetMultiplier = target.id === 'vercel' ? 1 : 1.2
    
    return Math.round(baseTime * complexityMultiplier * targetMultiplier)
  }

  const toggleItem = (itemId) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setCheckedItems(newChecked)
  }

  const getProgress = () => {
    if (!plan) return 0
    const totalItems = plan.sections.reduce((sum, section) => sum + section.items.length, 0)
    const checkedCount = checkedItems.size
    return Math.round((checkedCount / totalItems) * 100)
  }

  const exportPlan = (format = 'markdown') => {
    if (!plan) return

    let content = ''
    
    if (format === 'markdown') {
      content = generateMarkdownPlan(plan)
      downloadFile(content, `${plan.projectName}-deployment-plan.md`, 'text/markdown')
    } else if (format === 'json') {
      content = JSON.stringify(plan, null, 2)
      downloadFile(content, `${plan.projectName}-deployment-plan.json`, 'application/json')
    }
  }

  const generateMarkdownPlan = (plan) => {
    let markdown = `# Deployment Plan: ${plan.projectName}\n\n`
    markdown += `**Target Platform:** ${plan.target.name}\n`
    markdown += `**Project Type:** ${plan.projectType.framework}\n`
    markdown += `**Estimated Time:** ${plan.estimatedTime} minutes\n\n`

    plan.sections.forEach(section => {
      markdown += `## ${section.title}\n\n`
      markdown += `${section.description}\n\n`
      
      section.items.forEach(item => {
        const checkbox = checkedItems.has(item.id) ? '[x]' : '[ ]'
        const required = item.required ? '**Required**' : '*Optional*'
        markdown += `${checkbox} **${item.title}** (${item.estimatedTime}) - ${required}\n`
        markdown += `   ${item.description}\n\n`
      })
    })

    return markdown
  }

  const copyPlanToClipboard = () => {
    if (!plan) return
    const markdown = generateMarkdownPlan(plan)
    copyToClipboard(markdown)
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-card p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className={`bg-white rounded-lg shadow-card p-6 text-center ${className}`}>
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-text-secondary">No deployment plan available</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Deployment Plan: {plan.projectName}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {plan.target.name} • {plan.projectType.framework} • ~{plan.estimatedTime} minutes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={copyPlanToClipboard}
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => exportPlan('markdown')}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary">Progress</span>
            <span className="text-text-primary font-medium">{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="p-6 space-y-6">
        {plan.sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <section.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{section.title}</h4>
                <p className="text-sm text-text-secondary">{section.description}</p>
              </div>
            </div>
            
            <div className="ml-11 space-y-3">
              {section.items.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleItem(item.id)}
                >
                  <button className="mt-0.5">
                    {checkedItems.has(item.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className={`font-medium ${
                        checkedItems.has(item.id) 
                          ? 'text-green-600 line-through' 
                          : 'text-text-primary'
                      }`}>
                        {item.title}
                        {item.required && (
                          <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </h5>
                      <span className="text-xs text-text-secondary">
                        {item.estimatedTime}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeploymentPlanGenerator
