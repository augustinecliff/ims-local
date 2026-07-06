import { create } from 'zustand'

import type { FundId } from '@/types'

interface WorkspaceState {
  activeFundId: FundId | null
  sidebarCollapsed: boolean
  setActiveFundId: (fundId: FundId | null) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeFundId: null,
  sidebarCollapsed: false,
  setActiveFundId: (activeFundId) => set({ activeFundId }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))
