import { FUND_IDS, FUNDS } from '@/types/funds'

import { usePreview } from '../context/usePreview'

export function PreviewFundSwitcher() {
  const { state } = usePreview()
  const { fundId, activeNav } = state

  if (activeNav !== 'portfolio' && activeNav !== 'risk') {
    return null
  }

  return (
    <div className="preview-fund-switcher" aria-label="Fund selector">
      {FUND_IDS.map((id) => (
        <span
          key={id}
          className={[
            'preview-fund-pill',
            fundId === id ? 'preview-fund-pill--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {FUNDS[id].name}
        </span>
      ))}
    </div>
  )
}
