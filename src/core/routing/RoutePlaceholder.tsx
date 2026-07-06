/** Structural route marker — no page design at this stage */
export function RoutePlaceholder({ routeId }: { routeId: string }) {
  return <div data-route={routeId} hidden />
}
