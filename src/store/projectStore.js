import { create } from 'zustand'

const mockProjects = [
  {
    id: '1',
    name: 'My Portfolio',
    gitRepoUrl: 'https://github.com/user/portfolio',
    deploymentTarget: 'vercel',
    status: 'deployed',
    lastDeployment: '2024-01-15T10:30:00Z',
    deploymentUrl: 'https://portfolio-user.vercel.app',
    monitoringEnabled: true,
  },
  {
    id: '2',
    name: 'E-commerce App',
    gitRepoUrl: 'https://github.com/user/ecommerce',
    deploymentTarget: 'vercel',
    status: 'building',
    lastDeployment: '2024-01-15T09:15:00Z',
    deploymentUrl: null,
    monitoringEnabled: false,
  },
  {
    id: '3',
    name: 'Blog Platform',
    gitRepoUrl: 'https://github.com/user/blog',
    deploymentTarget: 'vercel',
    status: 'failed',
    lastDeployment: '2024-01-14T16:45:00Z',
    deploymentUrl: null,
    monitoringEnabled: true,
  },
]

export const useProjectStore = create((set, get) => ({
  projects: mockProjects,
  addProject: (project) => set((state) => ({
    projects: [...state.projects, { ...project, id: Date.now().toString() }]
  })),
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id)
  })),
  getProject: (id) => get().projects.find(p => p.id === id),
}))