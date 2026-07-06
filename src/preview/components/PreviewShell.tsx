import { useCallback, useEffect, useState } from 'react'

import { MarketHud } from './MarketHud'
import { PreviewBackdrop } from './PreviewBackdrop'
import { PreviewFundSwitcher } from './PreviewFundSwitcher'
import { PreviewIntro } from './PreviewIntro'
import { PreviewProgressBar } from './PreviewProgressBar'
import { PreviewSceneHost, PreviewTopbarTitle } from './PreviewSceneHost'
import { PreviewSidebar } from './PreviewSidebar'
import { usePreview } from '../context/usePreview'

export function PreviewShell() {
  const { state, setPaused } = usePreview()
  const [introVisible, setIntroVisible] = useState(true)

  useEffect(() => {
    setPaused(true)
  }, [setPaused])

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false)
    setPaused(false)
  }, [setPaused])

  const setPauseUnlessIntro = useCallback(
    (paused: boolean) => {
      if (!introVisible) setPaused(paused)
    },
    [introVisible, setPaused],
  )

  return (
    <div
      className="preview-root"
      data-paused={state.isPaused ? 'true' : 'false'}
      data-intro={introVisible ? 'true' : 'false'}
      onMouseEnter={() => setPauseUnlessIntro(true)}
      onMouseLeave={() => setPauseUnlessIntro(false)}
      onPointerDown={(event) => {
        if (event.pointerType === 'touch') setPauseUnlessIntro(true)
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') setPauseUnlessIntro(false)
      }}
      onPointerCancel={(event) => {
        if (event.pointerType === 'touch') setPauseUnlessIntro(false)
      }}
    >
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
