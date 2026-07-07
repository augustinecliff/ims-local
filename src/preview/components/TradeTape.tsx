import { AnimatePresence, motion } from 'framer-motion'

import { layoutSpring, tradeRowTransition } from '../animations/variants'
import { useLiveTrades, type LiveTrade } from '../hooks/useLiveTrades'
import { usePreviewBreakpoint } from '../hooks/usePreviewBreakpoint'

function TradeRowContent({ trade }: { trade: LiveTrade }) {
  const up = trade.delta >= 0

  return (
    <>
      <span className="trade-tape__time">{trade.time}</span>
      <span className={`trade-tape__side trade-tape__side--${trade.side}`}>
        {trade.side}
      </span>
      <span className="trade-tape__instrument">{trade.instrument}</span>
      <span className="trade-tape__qty">{trade.qty.toLocaleString()}</span>
      <span className={`trade-tape__price trade-tape__price--${up ? 'up' : 'down'}`}>
        {trade.price.toFixed(2)}
        <span className="trade-tape__arrow">{up ? ' ▲' : ' ▼'}</span>
      </span>
    </>
  )
}

function TradeRowAnimated({ trade }: { trade: LiveTrade }) {
  return (
    <motion.div
      className="trade-tape__row"
      layout="position"
      initial={tradeRowTransition.initial}
      animate={tradeRowTransition.animate}
      exit={tradeRowTransition.exit}
      transition={layoutSpring}
    >
      <TradeRowContent trade={trade} />
    </motion.div>
  )
}

function TradeRowStatic({ trade }: { trade: LiveTrade }) {
  return (
    <div className="trade-tape__row trade-tape__row--static">
      <TradeRowContent trade={trade} />
    </div>
  )
}

export function TradeTape() {
  const breakpoint = usePreviewBreakpoint()
  const isMobile = breakpoint !== 'lg'
  const maxItems = breakpoint === 'sm' ? 6 : breakpoint === 'md' ? 8 : 12
  const trades = useLiveTrades(maxItems, isMobile ? 560 : 480)

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
      {isMobile ? (
        <div className="trade-tape__feed trade-tape__feed--static">
          {trades.map((t) => (
            <TradeRowStatic key={t.id} trade={t} />
          ))}
        </div>
      ) : (
        <motion.div className="trade-tape__feed" layout="position">
          <AnimatePresence initial={false}>
            {trades.map((t) => (
              <TradeRowAnimated key={t.id} trade={t} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
