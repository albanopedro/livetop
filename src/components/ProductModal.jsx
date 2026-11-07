import { useRef, useState } from 'react'
import { categoryLabel, formatBRL } from '../constants'
import { useDialog } from '../hooks/useDialog'
import { CloseIcon, MinusIcon, PlusIcon, StarIcon } from './Icons'

const ProductModal = ({ product, onClose, onAdd }) => {
  const panelRef = useRef(null)
  const [qty, setQty] = useState(1)

  useDialog(panelRef, true, onClose)

  const rating = product.rating?.rate ?? 0
  const reviews = product.rating?.count ?? 0

  const handleAdd = () => {
    onAdd(product, qty)
    onClose()
  }

  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        ref={panelRef}
        tabIndex={-1}
      >
        <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Fechar detalhes">
          <CloseIcon />
        </button>

        <div className="modal-media">
          <img src={product.image} alt={product.title} width="400" height="400" />
        </div>

        <div className="modal-body">
          <span className="badge">{categoryLabel(product.category)}</span>

          <h2 id="modal-title">{product.title}</h2>

          <p className="produto-rating">
            <StarIcon className="star" />
            <strong>{rating.toFixed(1)}</strong>
            <span>({reviews} avaliações)</span>
          </p>

          <p id="modal-desc" className="modal-desc">
            {product.description}
          </p>

          <div className="modal-buy">
            <div className="produto-preco">
              <span className="preco">{formatBRL(product.price)}</span>
              <span className="preco-parcelas">ou 3x de {formatBRL(product.price / 3)}</span>
            </div>

            <div className="qty">
              <button
                type="button"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="Diminuir quantidade"
              >
                <MinusIcon />
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((value) => value + 1)}
                aria-label="Aumentar quantidade"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <button type="button" className="btn btn-primary btn-block" onClick={handleAdd}>
            Adicionar ao carrinho · {formatBRL((product.price * qty))}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
