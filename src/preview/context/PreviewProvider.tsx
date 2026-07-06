import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'

import {
  createInitialPreviewState,
  LOOP_DURATION_MS,
  MAX_FLYOUTS,
  MAX_NOTIFICATIONS,
  PREVIEW_TIMELINE,
  PROGRESS_TICK_MS,
  TIMELINE_PACE,
} from '../timeline'
import type { PreviewAction, PreviewState } from '../types'
import { PreviewContext } from './PreviewContext'

function previewReducer(state: PreviewState, action: PreviewAction): PreviewState {
  switch (action.type) {
    case 'PATCH':
      return { ...state, ...action.patch }
    case 'PATCH_PORTFOLIO':
      return { ...state, portfolio: { ...state.portfolio, ...action.patch } }
    case 'PATCH_RESEARCH':
      return { ...state, research: { ...state.research, ...action.patch } }
    case 'PATCH_INVESTMENT':
      return { ...state, investment: { ...state.investment, ...action.patch } }
    case 'PATCH_RISK':
      return { ...state, risk: { ...state.risk, ...action.patch } }
    case 'PATCH_ENGAGEMENT':
      return { ...state, engagement: { ...state.engagement, ...action.patch } }
    case 'SPAWN_FLYOUT': {
      const id = state.flyoutSeq + 1
      const flyout = {
        id,
        text: action.text,
        tone: action.tone,
        x: 8 + Math.random() * 72,
        y: 10 + Math.random() * 58,
      }
      const flyouts = [...state.flyouts, flyout].slice(-MAX_FLYOUTS)
      return { ...state, flyoutSeq: id, flyouts }
    }
    case 'SPAWN_NOTIFICATION': {
      const id = state.notifSeq + 1
      const item = {
        id,
        title: action.title,
        body: action.body,
        tone: action.tone,
      }
      const notifications = [...state.notifications, item].slice(-MAX_NOTIFICATIONS)
      return { ...state, notifSeq: id, notifications }
    }
    case 'RESET':
      return action.initial
    default:
      return state
  }
}

function getSpeedMultiplier(): number {
  const raw = import.meta.env.VITE_PREVIEW_SPEED
  if (!raw) return 1
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(previewReducer, undefined, createInitialPreviewState)
  const loopStartRef = useRef(0)
  const isPausedRef = useRef(false)
  const speed = getSpeedMultiplier()

  useEffect(() => {
    isPausedRef.current = state.isPaused
  }, [state.isPaused])

  useEffect(() => {
    let cancelled = false
    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    const clearTimeouts = () => {
      for (const id of timeoutIds) {
        clearTimeout(id)
      }
      timeoutIds.length = 0
    }

    const runLoop = () => {
      if (cancelled) return
      clearTimeouts()

      const initial = createInitialPreviewState()
      dispatch({ type: 'RESET', initial })
      loopStartRef.current = performance.now()

      for (const event of PREVIEW_TIMELINE) {
        const delay = (event.at * TIMELINE_PACE) / speed
        const id = setTimeout(() => {
          if (!cancelled && !isPausedRef.current) {
            dispatch(event.action)
          }
        }, delay)
        timeoutIds.push(id)
      }

      const loopId = setTimeout(() => {
        runLoop()
      }, LOOP_DURATION_MS / speed)
      timeoutIds.push(loopId)
    }

    runLoop()

    return () => {
      cancelled = true
      clearTimeouts()
    }
  }, [speed])

  useEffect(() => {
    if (state.isPaused) return

    const id = setInterval(() => {
      const elapsed = performance.now() - loopStartRef.current
      const progress = Math.min(1, elapsed / (LOOP_DURATION_MS / speed))
      dispatch({ type: 'PATCH', patch: { loopProgress: progress } })
    }, PROGRESS_TICK_MS)

    return () => clearInterval(id)
  }, [speed, state.isPaused])

  const setPaused = useCallback((paused: boolean) => {
    isPausedRef.current = paused
    dispatch({ type: 'PATCH', patch: { isPaused: paused } })
  }, [])

  const value = useMemo(
    () => ({ state, dispatch, setPaused }),
    [state, setPaused],
  )

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
}
