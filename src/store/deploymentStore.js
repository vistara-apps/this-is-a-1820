import { create } from 'zustand'

const mockDeployments = [
  {
    id: '1',
    projectId: '1',
    commitHash: 'abc123f',
    status: 'success',
    timestamp: '2024-01-15T10:30:00Z',
    deploymentUrl: 'https://portfolio-user.vercel.app',
    duration: 45,
    commitMessage: 'Update homepage design',
  },
  {
    id: '2',
    projectId: '1',
    commitHash: 'def456a',
    status: 'success',
    timestamp: '2024-01-14T14:20:00Z',
    deploymentUrl: 'https://portfolio-user-def456a.vercel.app',
    duration: 38,
    commitMessage: 'Fix responsive layout',
  },
  {
    id: '3',
    projectId: '2',
    commitHash: 'ghi789b',
    status: 'pending',
    timestamp: '2024-01-15T09:15:00Z',
    deploymentUrl: null,
    duration: null,
    commitMessage: 'Add payment integration',
  },
  {
    id: '4',
    projectId: '3',
    commitHash: 'jkl012c',
    status: 'failed',
    timestamp: '2024-01-14T16:45:00Z',
    deploymentUrl: null,
    duration: 120,
    commitMessage: 'Update dependencies',
  },
]

export const useDeploymentStore = create((set, get) => ({
  deployments: mockDeployments,
  addDeployment: (deployment) => set((state) => ({
    deployments: [{ ...deployment, id: Date.now().toString() }, ...state.deployments]
  })),
  updateDeployment: (id, updates) => set((state) => ({
    deployments: state.deployments.map(d => d.id === id ? { ...d, ...updates } : d)
  })),
  getDeploymentsByProject: (projectId) => 
    get().deployments.filter(d => d.projectId === projectId),
}))