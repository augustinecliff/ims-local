export const features = {
  risk: import.meta.env.VITE_FEATURE_RISK === 'true',
  engagement: import.meta.env.VITE_FEATURE_ENGAGEMENT === 'true',
} as const
