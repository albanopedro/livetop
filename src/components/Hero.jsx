import { ArrowRightIcon, BagIcon, SparkIcon, StarIcon, TruckIcon } from './Icons'

const Hero = () => {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-light">
            <SparkIcon /> Curadoria semanal
          </span>
          <h1 id="hero-title">
            Os melhores produtos do mercado, <em>em um só lugar.</em>
          </h1>
          <p>
            Moda, joias e tecnologia selecionados para você. Preços em reais,
            entrega rápida e troca fácil.
          </p>
          <div className="hero-actions">
            <a className="btn btn-light" href="#catalogo">
              Explorar catálogo <ArrowRightIcon />
            </a>
            <span className="hero-note">
              <TruckIcon /> Frete grátis acima de R$ 299
            </span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <span className="hero-blob hero-blob-1" />
          <span className="hero-blob hero-blob-2" />
          <span className="hero-bag">
            <BagIcon />
          </span>
          <span className="hero-chip hero-chip-top">
            <StarIcon /> 4,8 de 5
          </span>
          <span className="hero-chip hero-chip-bottom">
            <TruckIcon /> Entrega rápida
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
