import { useState } from 'react'

import '../preview.css'

import { PreviewShell } from '../components/PreviewShell'
import { PreviewProvider } from '../context/PreviewProvider'

export function PreviewPage() {
  const [playing, setPlaying] = useState(false)

  return (
    <PreviewProvider playing={playing}>
      <PreviewShell onIntroComplete={() => setPlaying(true)} />
    </PreviewProvider>
  )
}
