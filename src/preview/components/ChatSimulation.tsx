import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { fluidSpringSoft } from '../animations/variants'
import type { ChatMessage } from '../types'

interface ChatSimulationProps {
  messages: ChatMessage[]
  typing: boolean
  clientName?: string | null
}

export function ChatSimulation({ messages, typing, clientName }: ChatSimulationProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div className="chat-sim">
      <div className="chat-sim__header">
        <span className="chat-sim__avatar">◎</span>
        <div>
          <motion.div
            key={clientName ?? 'inbox'}
            className="chat-sim__name"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={fluidSpringSoft}
          >
            {clientName ?? 'Client inbox'}
          </motion.div>
          <div className="chat-sim__status">
            <span className="chat-sim__online" /> Active now
          </div>
        </div>
      </div>

      <div className="chat-sim__thread">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`chat-sim__msg chat-sim__msg--${msg.from}`}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={fluidSpringSoft}
            >
              {msg.from !== 'rm' && (
                <span className="chat-sim__sender">{msg.name}</span>
              )}
              <div className="chat-sim__bubble">{msg.text}</div>
              <span className="chat-sim__time">{msg.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {typing && (
            <motion.div
              className="chat-sim__typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={fluidSpringSoft}
            >
              <span />
              <span />
              <span />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
    </div>
  )
}
