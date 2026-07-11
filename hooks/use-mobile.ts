import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Only run if the window is defined
    if (typeof window !== "undefined") {
      // Set initial value in a microtask to avoid synchronous setState warning
      Promise.resolve().then(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      });
      
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches)
      }
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }
  }, [])

  return isMobile
}
