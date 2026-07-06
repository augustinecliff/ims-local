import { ChatSimulation } from '../components/ChatSimulation'
import { usePreview } from '../context/usePreview'

export function EngagementScene() {
  const { state } = usePreview()
  const { engagement } = state

  return (
    <div className="trailer-stage trailer-stage--engagement">
      <div className="trailer-stage__bg" />
      <ChatSimulation
        messages={engagement.chatMessages}
        typing={engagement.typing}
        clientName={engagement.focusClient}
      />
    </div>
  )
}
