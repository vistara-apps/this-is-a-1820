import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  subscriptionTier: 'free',
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  updateSubscription: (tier) => set({ subscriptionTier: tier }),
}))