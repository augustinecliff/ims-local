import { useEffect, useRef, useState } from 'react'

const INSTRUMENTS = [
  'Safaricom',
  'Equity Bank',
  'KCB Group',
  'EABL',
  'BAT Kenya',
  'Co-op Bank',
  'NCBA',
  'Bamburi',
  'Stanbic',
  'NSE 20',
]

const BASE_PRICES: Record<string, number> = {
  Safaricom: 28.4,
  'Equity Bank': 52.75,
  'KCB Group': 44.2,
  EABL: 168.5,
  'BAT Kenya': 415.0,
  'Co-op Bank': 12.85,
  NCBA: 38.6,
  Bamburi: 58.25,
  Stanbic: 112.0,
  'NSE 20': 1842.5,
}

export interface LiveTrade {
  id: number
  instrument: string
  side: 'buy' | 'sell'
  qty: number
  price: number
  delta: number
  time: string
}

let tradeSeq = 0

function randomInstrument(): string {
  return INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)]!
}

function formatTime(): string {
  const d = new Date()
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`
}

function spawnTrade(lastPrices: Map<string, number>): LiveTrade {
  const instrument = randomInstrument()
  const base = lastPrices.get(instrument) ?? BASE_PRICES[instrument] ?? 100
  const delta = (Math.random() - 0.48) * (base * 0.008)
  const price = Math.max(0.01, base + delta)
  lastPrices.set(instrument, price)

  return {
    id: ++tradeSeq,
    instrument,
    side: Math.random() > 0.45 ? 'buy' : 'sell',
    qty: Math.floor(Math.random() * 80_000 + 500) * 100,
    price: Number(price.toFixed(2)),
    delta: Number(delta.toFixed(2)),
    time: formatTime(),
  }
}

function buildPriceMap(trades: LiveTrade[]): Map<string, number> {
  const prices = new Map<string, number>(Object.entries(BASE_PRICES))
  for (const trade of trades) {
    prices.set(trade.instrument, trade.price)
  }
  return prices
}

function seedTrades(count: number): LiveTrade[] {
  const prices = new Map<string, number>(Object.entries(BASE_PRICES))
  return Array.from({ length: count }, () => spawnTrade(prices))
}

/** Always-on trade feed — independent of preview scene pause */
export function useLiveTrades(maxItems = 12, intervalMs = 320) {
  const maxItemsRef = useRef(maxItems)

  useEffect(() => {
    maxItemsRef.current = maxItems
  }, [maxItems])

  const [trades, setTrades] = useState<LiveTrade[]>(() => seedTrades(Math.min(maxItems, 6)))

  useEffect(() => {
    const tick = () => {
      setTrades((prev) => {
        const cap = maxItemsRef.current
        const prices = buildPriceMap(prev)
        const next = [spawnTrade(prices), ...prev].slice(0, cap)
        return next.length > 0 ? next : seedTrades(Math.min(cap, 4))
      })
    }

    const id = setInterval(tick, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return trades.slice(0, maxItems)
}
