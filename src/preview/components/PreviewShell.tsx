import { useCallback, useState } from 'react'

import { MarketHud } from './MarketHud'
import { PreviewBackdrop } from './PreviewBackdrop'
import { PreviewFundSwitcher } from './PreviewFundSwitcher'
import { PreviewIntro } from './PreviewIntro'
import { PreviewProgressBar } from './PreviewProgressBar'
import { PreviewSceneHost, PreviewTopbarTitle } from './PreviewSceneHost'
import { PreviewSidebar } from './PreviewSidebar'

interface PreviewShellProps {
  onIntroComplete?: () => void
}

export function PreviewShell({ onIntroComplete }: PreviewShellProps) {
  const [introVisible, setIntroVisible] = useState(true)

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false)
    onIntroComplete?.()
  }, [onIntroComplete])

  return (
    <div className="preview-root" data-intro={introVisible ? 'true' : 'false'}>
      <PreviewBackdrop />
      <PreviewIntro visible={introVisible} onComplete={handleIntroComplete} />
      <PreviewProgressBar />
      <div className="preview-shell">
        <PreviewSidebar />
        <main className="preview-main">
          <header className="preview-topbar">
            <PreviewTopbarTitle />
            <PreviewFundSwitcher />
          </header>
          <PreviewSceneHost />
          {!introVisible && <MarketHud />}
        </main>
      </div>
      <div className="preview-trailer-tag">Arvocap IMS · Phase 1</div>
    </div>
  )
}
