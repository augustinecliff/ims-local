import { setupWorker } from 'msw/browser'

import { env } from '@/core/lib'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function startMockApi() {
  if (!env.mockApi) {
    return
  }

  try {
    await worker.start({ onUnhandledRequest: 'bypass' })
  } catch (error) {
    console.warn('[MSW] Mock API failed to start — app will use real network.', error)
  }
}
