import { useCallback, useMemo, useState } from 'react'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import Toast from './components/Toast'
import Toolbar from './components/Toolbar'
import { categoryLabel, normalize } from './constants'
import { useCart } from './hooks/useCart'
import { useProducts } from './hooks/useProducts'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { produtos, status, retry } = useProducts()
  const { items, add, setQty, remove, clear, totalItems, subtotal } = useCart()
  const { theme, toggle: toggleTheme } = useTheme()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('relevance')
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const categories = useMemo(() => {
    const unique = [...new Set(produtos.map((product) => product.category))]
    return unique.map((value) => ({ value, label: categoryLabel(value) }))
  }, [produtos])

  const filtered = useMemo(() => {
    const query = normalize(search)

    const list = produtos.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesQuery =
        !query ||
        normalize(product.title).includes(query) ||
        normalize(categoryLabel(product.category)).includes(query)

      return matchesCategory && matchesQuery
    })

    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') return [...list].sort((a, b) => b.rating.rate - a.rating.rate)
    return list
  }, [produtos, search, category, sort])

  const hasFilters = search.trim() !== '' || category !== 'all' || sort !== 'relevance'

  const showToast = useCallback((message) => setToast({ id: Date.now(), message }), [])
  const closeToast = useCallback(() => setToast(null), [])

  const handleAdd = useCallback(
    (product, qty = 1) => {
      add(product, qty)
      showToast(`${qty}× ${product.title} adicionado ao carrinho`)
    },
    [add, showToast],
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setCategory('all')
    setSort('relevance')
  }, [])

  const handleCheckout = useCallback(() => {
    if (items.length === 0) return

    clear()
    setCartOpen(false)
    showToast('Pedido confirmado! Obrigado pela compra.')
  }, [items.length, clear, showToast])

  return (
    <>
      <a className="skip-link" href="#catalogo">
        Pular para o catálogo
      </a>

      <Header
        totalItems={totalItems}
        onOpenCart={() => setCartOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero />

        <section id="catalogo" className="catalogo container" aria-labelledby="catalogo-title">
          <div className="catalogo-head">
            <div>
              <span className="eyebrow eyebrow-dark">Catálogo</span>
              <h2 id="catalogo-title">Destaques da loja</h2>
            </div>
            <p className="catalogo-count" aria-live="polite">
              {status === 'success'
                ? `${filtered.length} ${filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`
                : status === 'loading'
                  ? 'Carregando produtos…'
                  : 'Catálogo indisponível'}
            </p>
          </div>

          <Toolbar
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            categories={categories}
            sort={sort}
            onSort={setSort}
          />

          <ProductGrid
            status={status}
            produtos={filtered}
            onSelect={setSelected}
            onAdd={handleAdd}
            onRetry={retry}
            onClearFilters={clearFilters}
            hasFilters={hasFilters}
          />
        </section>
      </main>

      <Footer />

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={handleAdd} />
      )}

      <CartDrawer
        open={cartOpen}
        items={items}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onQty={setQty}
        onRemove={remove}
        onClear={clear}
        onCheckout={handleCheckout}
      />

      <Toast toast={toast} onClose={closeToast} />
    </>
  )
}

export default App
