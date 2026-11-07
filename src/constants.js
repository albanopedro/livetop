// Endpoint público usado como catálogo da loja
export const API_URL = 'https://fakestoreapi.com/products'

// Câmbio fixo usado para exibir os preços em reais
export const USD_TO_BRL = 5.2

// Valor mínimo (em reais) para frete grátis
export const FREE_SHIPPING_THRESHOLD = 299

export const CATEGORY_LABELS = {
  "men's clothing": 'Moda masculina',
  "women's clothing": 'Moda feminina',
  jewelery: 'Joias',
  electronics: 'Eletrônicos',
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatBRL = (usdPrice) => brlFormatter.format(usdPrice * USD_TO_BRL)

export const categoryLabel = (category) => CATEGORY_LABELS[category] ?? category

// Remove acentos e caixa para permitir buscas mais tolerantes
export const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
