import '../preview.css'

import { PreviewShell } from '../components/PreviewShell'
import { PreviewProvider } from '../context/PreviewProvider'

export function PreviewPage() {
  return (
    <PreviewProvider>
      <PreviewShell />
    </PreviewProvider>
  )
}
