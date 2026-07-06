import { env } from '@/core/lib'

interface ErrorFallbackProps {
  error: Error
  onReset: () => void
}

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div data-testid="error-fallback" role="alert">
      <p>Something went wrong.</p>
      {env.isDev ? <pre>{error.message}</pre> : null}
      <button type="button" onClick={onReset}>
        Try again
      </button>
    </div>
  )
}
