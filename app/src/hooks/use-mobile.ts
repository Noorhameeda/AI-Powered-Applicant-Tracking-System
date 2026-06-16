import * as React from "react"

const MOBILE_BREAKPOINT = 768

const getSnapshot = () => window.innerWidth < MOBILE_BREAKPOINT
const getServerSnapshot = () => false

export function useIsMobile() {
  return React.useSyncExternalStore(
    (callback) => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => callback()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
    },
    getSnapshot,
    getServerSnapshot
  )
}
