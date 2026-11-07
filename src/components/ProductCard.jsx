import { categoryLabel, formatBRL } from '../constants'
import { PlusIcon, StarIcon } from './Icons'

const ProductCard = ({ product, onSelect, onAdd }) => {
  const rating = product.rating?.rate ?? 0
  const reviews = product.rating?.count ?? 0

  return (
    <article className="produto-card">
      <button
        type="button"
        className="produto-img"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
        />
        <span className="produto-categoria">{categoryLabel(product.category)}</span>
        <span className="produto-img-hint">Ver detalhes</span>
      </button>

      <div className="produto-info">
        <h3 className="produto-title" title={product.title}>
          {product.title}
        </h3>

        <p className="produto-rating" aria-label={`Avaliação ${rating} de 5 em ${reviews} avaliações`}>
          <StarIcon className="star" />
          <strong>{rating.toFixed(1)}</strong>
          <span>({reviews})</span>
        </p>

        <div className="produto-footer">
          <div className="produto-preco">
            <span className="preco">{formatBRL(product.price)}</span>
            <span className="preco-parcelas">ou 3x de {formatBRL(product.price / 3)}</span>
          </div>

          <button
            type="button"
            className="btn-add"
            onClick={() => onAdd(product)}
            aria-label={`Adicionar ${product.title} ao carrinho`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
