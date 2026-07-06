export const fluidEase = [0.22, 1, 0.36, 1] as const

export const fluidSpring = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.85,
}

export const fluidSpringSoft = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 32,
  mass: 1,
}

export const fluidSpringSnappy = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 30,
  mass: 0.7,
}

export const fadeSlide = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.99 },
  transition: fluidSpringSoft,
}

export const sceneTransition = {
  initial: { opacity: 0, x: 24, scale: 0.96, filter: 'blur(6px)' },
  animate: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -16, scale: 0.97, filter: 'blur(4px)' },
  transition: fluidSpring,
}

export const sceneTransitionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.03 },
  },
}

export const staggerChild = {
  initial: { opacity: 0, y: 14, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: fluidSpringSoft,
  },
}

export const popIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: fluidSpringSnappy,
}

export const slideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: fluidSpringSoft,
}

export const layoutSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 35,
  mass: 0.6,
}

export const tradeRowTransition = {
  initial: { opacity: 0, y: -16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
  transition: fluidSpringSoft,
}

export const titleSwap = {
  initial: { opacity: 0, y: 8, filter: 'blur(3px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -6, filter: 'blur(3px)' },
  transition: fluidSpringSoft,
}
