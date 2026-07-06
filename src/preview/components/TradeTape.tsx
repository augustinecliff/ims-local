import { AnimatePresence, motion } from 'framer-motion'

import { layoutSpring, tradeRowTransition } from '../animations/variants'
import { useLiveTrades, type LiveTrade } from '../hooks/useLiveTrades'
import { usePreviewBreakpoint } from '../hooks/usePreviewBreakpoint'
import { usePreview } from '../context/usePreview'

function TradeRow({ trade }: { trade: LiveTrade }) {
  const up = trade.delta >= 0

  return (
    <motion.div
      className="trade-tape__row"
      layout
      initial={tradeRowTransition.initial}
      animate={tradeRowTransition.animate}
      exit={tradeRowTransition.exit}
      transition={layoutSpring}
    >
      <span className="trade-tape__time">{trade.time}</span>
      <span className={`trade-tape__side trade-tape__side--${trade.side}`}>
        {trade.side}
      </span>
      <span className="trade-tape__instrument">{trade.instrument}</span>
      <span className="trade-tape__qty">{trade.qty.toLocaleString()}</span>
      <motion.span
        className={`trade-tape__price trade-tape__price--${up ? 'up' : 'down'}`}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {trade.price.toFixed(2)}
        <span className="trade-tape__arrow">{up ? ' ▲' : ' ▼'}</span>
      </motion.span>
    </motion.div>
  )
}

export function TradeTape() {
  const { state } = usePreview()
  const breakpoint = usePreviewBreakpoint()
  const maxItems = breakpoint === 'sm' ? 7 : breakpoint === 'md' ? 9 : 14
  const trades = useLiveTrades(!state.isPaused, maxItems, 480)

  return (
    <div className="trade-tape">
      <div className="trade-tape__header">
        <span className="trade-tape__pulse" />
        <span className="trade-tape__title">Live trades</span>
        <span className="trade-tape__market">NSE · RT</span>
      </div>
      <div className="trade-tape__cols">
        <span>Time</span>
        <span>Side</span>
        <span>Instrument</span>
        <span>Qty</span>
        <span>Price</span>
      </div>
      <motion.div className="trade-tape__feed" layout>
        <AnimatePresence initial={false} mode="popLayout">
          {trades.map((t) => (
            <TradeRow key={t.id} trade={t} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
