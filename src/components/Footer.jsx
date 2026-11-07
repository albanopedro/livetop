import { BagIcon, ShieldIcon, TruckIcon } from './Icons'

const Footer = () => {
  return (
    <footer className="footer" id="sobre">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label="CityStore — voltar ao início">
            <span className="brand-mark">
              <BagIcon />
            </span>
            <span className="brand-text">
              City<span>Store</span>
            </span>
          </a>
          <p>
            Curadoria de produtos para o dia a dia, com preços transparentes e
            atendimento de verdade.
          </p>
        </div>

        <div>
          <h3>Loja</h3>
          <a href="#catalogo">Catálogo</a>
          <a href="#catalogo">Novidades</a>
          <a href="#catalogo">Mais vendidos</a>
        </div>

        <div>
          <h3>Atendimento</h3>
          <a href="#sobre">Central de ajuda</a>
          <a href="#sobre">Trocas e devoluções</a>
          <a href="#sobre">Fale conosco</a>
        </div>

        <div>
          <h3>Garantias</h3>
          <p className="footer-trust">
            <TruckIcon /> Frete grátis acima de R$ 299
          </p>
          <p className="footer-trust">
            <ShieldIcon /> Compra 100% segura
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 CityStore. Todos os direitos reservados.</p>
        <p>Preços convertidos de US$ (1 US$ = R$ 5,20).</p>
      </div>
    </footer>
  )
}

export default Footer
