import { useCallback, useEffect, useRef, useState } from 'react'
import { API_URL } from '../constants'

/**
 * Busca o catálogo e expõe os estados de carregamento, sucesso e erro.
 * A requisição é cancelada ao desmontar (e ao tentar novamente).
 */
export function useProducts() {
  const [produtos, setProdutos] = useState([])
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const controllerRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    controllerRef.current?.abort()
    controllerRef.current = controller

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Falha na requisição: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (controller.signal.aborted) return
        setProdutos(data)
        setStatus('success')
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error(error)
        setStatus('error')
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((value) => value + 1)
  }, [])

  return { produtos, status, retry }
}
