import { useEffect, useState } from 'react'

export function usePageLoading(delayMs = 400): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])

  return isLoading
}
