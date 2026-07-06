import Big from 'big.js'

export type CurrencyCode = 'KES' | 'ZAR' | 'USD'

export function parseMoney(value: string | number): Big {
  return new Big(value)
}

export function formatMoney(value: Big, currency: CurrencyCode): string {
  return `${currency} ${value.toFixed(2)}`
}
