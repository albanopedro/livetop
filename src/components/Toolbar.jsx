import { CloseIcon, SearchIcon } from './Icons'

const Toolbar = ({ search, onSearch, category, onCategory, categories, sort, onSort }) => {
  return (
    <div className="toolbar">
      <div className="search-field">
        <SearchIcon />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Buscar por produto ou categoria…"
          aria-label="Buscar produtos"
        />
        {search && (
          <button
            type="button"
            className="search-clear"
            onClick={() => onSearch('')}
            aria-label="Limpar busca"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <div className="sort-field">
        <label htmlFor="ordenar">Ordenar por</label>
        <select id="ordenar" value={sort} onChange={(event) => onSort(event.target.value)}>
          <option value="relevance">Relevância</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliados</option>
        </select>
      </div>

      <div className="chips" role="group" aria-label="Filtrar por categoria">
        <button
          type="button"
          className="chip"
          aria-pressed={category === 'all'}
          onClick={() => onCategory('all')}
        >
          Todos
        </button>
        {categories.map((item) => (
          <button
            type="button"
            key={item.value}
            className="chip"
            aria-pressed={category === item.value}
            onClick={() => onCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Toolbar
