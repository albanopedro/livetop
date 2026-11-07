# CityStore

Loja virtual de demonstração construída com React 19 e Vite. O catálogo é
carregado da [Fake Store API](https://fakestoreapi.com/) e os preços são
convertidos para reais.

## Funcionalidades

- Catálogo com busca por nome/categoria, filtros por categoria e ordenação
  (relevância, preço e avaliação)
- Modal de detalhes com descrição, avaliação e seletor de quantidade
- Carrinho lateral com persistência em `localStorage`, controle de quantidade,
  remoção de itens e cálculo de frete grátis
- Estados de carregamento (skeleton), erro com "tentar novamente" e busca vazia
- Layout responsivo, foco acessível, fechamento por `Esc` e suporte a
  `prefers-reduced-motion`
- Tema claro/escuro com alternância no header, persistência em `localStorage` e
  preferência inicial do sistema

## Scripts

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # prévia do build
npm run lint     # ESLint
```

### Abrir com duplo clique (macOS)

Dê duplo clique em **`Abrir CityStore.command`** na raiz do projeto. O script
instala as dependências se necessário, inicia o servidor em uma porta livre e
abre o site no navegador. Feche a janela do Terminal para encerrar o servidor.

## Estrutura

```
src/
├── components/   # Header, Hero, Toolbar, ProductCard, ProductGrid,
│                 # ProductModal, CartDrawer, Toast, Footer e ícones
├── hooks/        # useProducts, useCart, useDialog e useTheme
├── css/          # estilo global
├── constants.js  # API, câmbio, rótulos e formatadores
├── App.jsx
└── main.jsx
```

> O câmbio usado na vitrine é fixo (`1 US$ = R$ 5,20`) e está em
> `src/constants.js`.
