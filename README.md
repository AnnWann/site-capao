
# Pousada Espaço Gaia — Site

This repository contains the Vite + React + TypeScript site used for the Pousada Espaço Gaia.

Summary
- Framework: Vite + React + TypeScript
- Styling: Tailwind-style utilities
- Dev server: Vite (`npm run dev`)
- Build output: `dist` (used for static hosting / Vercel)

Quick Start
1. Install dependencies

```bash
npm install
```

2. Run development server

# Pousada Espaço Gaia — Site

Este repositório contém o site estático da Pousada Espaço Gaia (Vale do Capão), construído com Vite + React + TypeScript.

Resumo do projeto
- Propósito: site one-page com seções (Início, Acomodações, Galeria, Reservas, Localização)
- Tech: Vite, React, TypeScript, Tailwind-style utilities
- Imagens: armazenadas em `public/fotos/`

Principais características
- Sistema de navegação por hash com montagem de uma seção por vez para evitar problemas de scroll-snap
- `Carousel` genérico com suporte a arraste por pointer, autoplay, setas e pontos de paginação
- `Card` que adapta `object-fit` para imagens retrato/paisagem e fornece fallback SVG para imagens ausentes
 - `Lightbox` modal: clique rápido em imagens abre uma sobreposição maior que escurece o resto da página

Comportamento de interação (tap vs drag)
- Para melhorar a usabilidade dentro de carrosséis: o carrossel exige uma breve pressão (≈180ms) antes de iniciar o arraste. Assim, um toque rápido em uma imagem abre o `Lightbox`, enquanto pressionar e arrastar manipula o carrossel.

Rápido (developer) — comandos úteis
```bash
npm install        # instalar dependências
npm run dev        # rodar servidor de desenvolvimento (Vite)
npm run build      # gerar build para produção em `dist`
npx serve dist     # visualizar `dist` localmente (opcional)
```

Executar localmente
1. Instale dependências: `npm install`
2. Inicie o servidor: `npm run dev`
3. Abra `http://localhost:5173` (ou a porta informada pelo Vite)

Deploy
- O projeto gera uma pasta `dist` que pode ser publicada em Vercel, Netlify, GitHub Pages ou qualquer host estático.
- Instruções detalhadas de deploy (Vercel + registro.br) estão em `docs/deploy-vercel.md`.

Estrutura importante
```
public/                # assets estáticos (banner.jpg, fotos/ ...)
src/
  components/          # Carousel, Card, etc.
  sections/            # Inicio, Galeria, Acomodacoes, Reservas, Localizacao
  util/                # `fotos.ts` lista as imagens em `public/fotos/`
  App.tsx              # wrapper da página e navegação por hash
  main.tsx             # ponto de entrada React
docs/                  # documentação (deploy, estrutura, componentes)
```

Notas de manutenção
- Ao adicionar/remover imagens, atualize `src/util/fotos.ts` com os nomes corretos.
- Se quiser ajustar o comportamento do carrossel (tamanho do slide, autoplay), veja `src/components/Carousel.tsx`.

Contribuição e deploy automático
- Recomendo manter o repositório em GitHub e conectar ao Vercel para deploy automático em pushes.
- Se preferir fallback automático (por exemplo durante incidentes do Vercel), posso adicionar um workflow do GitHub Actions que publica para Netlify ou GitHub Pages.

Contato e créditos
- Desenvolvido para Pousada Espaço Gaia
- Para ajustes de conteúdo (textos, imagens) edite os arquivos em `src/sections/` e `public/fotos/`.

Licença
- Código fornecido sem licença específica (adicione uma LICENSE se desejar).

---
Se quiser, eu adapto esse README para incluir instruções de deploy automáticas (GitHub Actions) ou um `vercel.json` com redirects canonical.
