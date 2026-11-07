import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'citystore.theme'

function getInitialTheme() {
  const current = document.documentElement.dataset.theme
  if (current === 'dark' || current === 'light') return current

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'

      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Sem storage: o tema ainda alterna durante a sessão.
      }

      return next
    })
  }, [])

  return { theme, toggle }
}
