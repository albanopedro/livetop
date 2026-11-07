import { BagIcon, MoonIcon, SunIcon } from './Icons'

const Header = ({ totalItems, onOpenCart, theme, onToggleTheme }) => {
  const isDark = theme === 'dark'

  return (
    <header className="header" id="top">
      <div className="container header-content">
        <a className="brand" href="#top" aria-label="CityStore — voltar ao início">
          <span className="brand-mark">
            <BagIcon />
          </span>
          <span className="brand-text">
            City<span>Store</span>
          </span>
        </a>

        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#sobre">Sobre</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={isDark ? 'Tema claro' : 'Tema escuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="cart-btn"
            onClick={onOpenCart}
            aria-label={`Abrir carrinho com ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}
          >
            <BagIcon />
            {totalItems > 0 && (
              <span className="cart-count" aria-hidden="true">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
