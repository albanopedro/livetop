import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'citystore.cart.v1'

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) =>
        item &&
        Number.isFinite(item.id) &&
        Number.isFinite(item.price) &&
        Number.isFinite(item.qty) &&
        item.qty > 0,
    )
  } catch {
    return []
  }
}

/**
 * Carrinho com persistência em localStorage.
 * Os preços são mantidos em dólar (formato da API) e convertidos na exibição.
 */
export function useCart() {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Modo privado ou storage cheio: o carrinho continua funcionando em memória.
    }
  }, [items])

  const add = useCallback((product, qty = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }

      return [
        ...current,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty,
        },
      ]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, qty } : item)),
    )
  }, [])

  const remove = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.qty, 0),
    [items],
  )

  // Mantido em dólar (mesma unidade da API); a conversão é feita na exibição.
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.qty, 0),
    [items],
  )

  return { items, add, setQty, remove, clear, totalItems, subtotal }
}
