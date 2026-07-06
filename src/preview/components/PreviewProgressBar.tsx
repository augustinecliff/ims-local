import { usePreview } from '../context/usePreview'

export function PreviewProgressBar() {
  const { state } = usePreview()
  const pct = Math.round(state.loopProgress * 100)

  return (
    <div className="preview-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="preview-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  )
}
