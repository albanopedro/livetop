import { useRef } from 'react'
import { FREE_SHIPPING_THRESHOLD, USD_TO_BRL, formatBRL } from '../constants'
import { useDialog } from '../hooks/useDialog'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons'

const CartDrawer = ({ open, items, subtotal, onClose, onQty, onRemove, onClear, onCheckout }) => {
  const panelRef = useRef(null)

  useDialog(panelRef, open, onClose)

  if (!open) return null

  const subtotalBRL = subtotal * USD_TO_BRL
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalBRL)
  const progress = Math.min(100, (subtotalBRL / FREE_SHIPPING_THRESHOLD) * 100)
  const freeShipping = remaining === 0 && items.length > 0
  const totalQty = items.reduce((total, item) => total + item.qty, 0)

  return (
    <div
      className="drawer-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="drawer-head">
          <h2 id="cart-title">
            <BagIcon /> Seu carrinho
            {items.length > 0 && <span className="badge-count">{totalQty}</span>}
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar carrinho">
            <CloseIcon />
          </button>
        </div>

        {items.length > 0 && (
          <div className="shipping">
            <p>
              {freeShipping ? (
                <strong className="shipping-free">Frete grátis desbloqueado</strong>
              ) : (
                <>
                  Faltam <strong>{formatBRL(remaining / 5.2)}</strong> para o frete grátis
                </>
              )}
            </p>
            <div
              className="shipping-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Progresso para frete grátis"
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="state-icon">
              <BagIcon />
            </span>
            <h3>Seu carrinho está vazio</h3>
            <p>Explore o catálogo e adicione seus produtos favoritos.</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img src={item.image} alt="" width="64" height="64" loading="lazy" />

                  <div className="cart-item-info">
                    <p className="cart-item-title" title={item.title}>
                      {item.title}
                    </p>
                    <span className="cart-item-price">{formatBRL(item.price * item.qty)}</span>

                    <div className="qty qty-sm">
                      <button
                        type="button"
                        onClick={() => onQty(item.id, item.qty - 1)}
                        aria-label={`Diminuir quantidade de ${item.title}`}
                      >
                        <MinusIcon />
                      </button>
                      <span aria-live="polite">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => onQty(item.id, item.qty + 1)}
                        aria-label={`Aumentar quantidade de ${item.title}`}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="icon-btn cart-item-remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remover ${item.title} do carrinho`}
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-foot">
              <div className="cart-line">
                <span>Subtotal</span>
                <span>{formatBRL(subtotal)}</span>
              </div>
              <div className="cart-line">
                <span>Frete</span>
                <span>{freeShipping ? 'Grátis' : 'Calculado no checkout'}</span>
              </div>
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatBRL(subtotal)}</strong>
              </div>

              <button type="button" className="btn btn-primary btn-block" onClick={onCheckout}>
                Finalizar compra
              </button>
              <button type="button" className="link-btn" onClick={onClear}>
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
