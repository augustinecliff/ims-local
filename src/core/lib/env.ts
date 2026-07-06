export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  mockAuth: import.meta.env.VITE_MOCK_AUTH === 'true',
  mockApi: import.meta.env.VITE_MOCK_API === 'true',
  isDev: import.meta.env.DEV,
} as const
