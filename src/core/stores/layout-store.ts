import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LayoutState {
  /** Persisted dashboard layouts — wired in Phase 5 */
  layouts: Record<string, unknown>
  setLayout: (key: string, layout: unknown) => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layouts: {},
      setLayout: (key, layout) =>
        set((state) => ({
          layouts: { ...state.layouts, [key]: layout },
        })),
    }),
    { name: 'ims-layout-store' },
  ),
)
