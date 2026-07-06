import { useEffect, useState } from 'react'

export type PreviewBreakpoint = 'sm' | 'md' | 'lg'

function resolveBreakpoint(width: number): PreviewBreakpoint {
  if (width < 600) return 'sm'
  if (width < 1024) return 'md'
  return 'lg'
}

export function usePreviewBreakpoint(): PreviewBreakpoint {
  const [breakpoint, setBreakpoint] = useState<PreviewBreakpoint>(() => {
    if (typeof window === 'undefined') return 'lg'
    return resolveBreakpoint(window.innerWidth)
  })

  useEffect(() => {
    const update = () => setBreakpoint(resolveBreakpoint(window.innerWidth))
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return breakpoint
}
