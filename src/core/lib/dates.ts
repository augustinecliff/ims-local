import { format, isValid, parseISO } from 'date-fns'

const DISPLAY_DATE = 'dd MMM yyyy'
const DISPLAY_DATETIME = 'dd MMM yyyy HH:mm'

export function formatDisplayDate(iso: string): string {
  const date = parseISO(iso)
  if (!isValid(date)) {
    throw new Error(`Invalid date: ${iso}`)
  }
  return format(date, DISPLAY_DATE)
}

export function formatDisplayDateTime(iso: string): string {
  const date = parseISO(iso)
  if (!isValid(date)) {
    throw new Error(`Invalid datetime: ${iso}`)
  }
  return format(date, DISPLAY_DATETIME)
}

export function parseApiDate(iso: string): Date {
  const date = parseISO(iso)
  if (!isValid(date)) {
    throw new Error(`Invalid API date: ${iso}`)
  }
  return date
}
