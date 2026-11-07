import { BagIcon, SearchIcon } from './Icons'
import ProductCard from './ProductCard'

const SkeletonCard = () => (
  <div className="skeleton-card" aria-hidden="true">
    <div className="sk sk-img" />
    <div className="sk-lines">
      <div className="sk sk-line" />
      <div className="sk sk-line sk-line-short" />
      <div className="sk sk-line sk-line-price" />
    </div>
  </div>
)

const ProductGrid = ({
  status,
  produtos,
  onSelect,
  onAdd,
  onRetry,
  onClearFilters,
  hasFilters,
}) => {
  if (status === 'loading') {
    return (
      <>
        <p className="sr-only" role="status">
          Carregando produtos…
        </p>
        <div className="produtos-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </>
    )
  }

  if (status === 'error') {
    return (
      <div className="state" role="alert">
        <span className="state-icon">
          <BagIcon />
        </span>
        <h3>Não foi possível carregar o catálogo</h3>
        <p>Verifique sua conexão e tente novamente em alguns instantes.</p>
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Tentar novamente
        </button>
      </div>
    )
  }

  if (produtos.length === 0) {
    return (
      <div className="state">
        <span className="state-icon">
          <SearchIcon />
        </span>
        <h3>Nenhum produto encontrado</h3>
        <p>
          {hasFilters
            ? 'Tente outro termo de busca ou remova os filtros aplicados.'
            : 'O catálogo está vazio no momento. Volte em breve.'}
        </p>
        {hasFilters && (
          <button type="button" className="btn btn-ghost" onClick={onClearFilters}>
            Limpar filtros
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="produtos-grid">
      {produtos.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} onAdd={onAdd} />
      ))}
    </div>
  )
}

export default ProductGrid
