import { createContext } from 'react'

import type { PreviewAction, PreviewState } from '../types'

export interface PreviewContextValue {
  state: PreviewState
  dispatch: (action: PreviewAction) => void
  setPaused: (paused: boolean) => void
}

export const PreviewContext = createContext<PreviewContextValue | null>(null)
