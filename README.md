# ◈ Checkpoint

**Autor:** Mateo Drault — 5to E  
**Materia:** Frontend  
**Entrega:** TP N°1 — Actividad Diagnóstico

---

## Descripción del proyecto

Checkpoint es un catálogo de videojuegos construido con Astro y React. Permite explorar una colección de títulos, buscar por nombre y ver la página de detalle de cada juego con su descripción, géneros, plataformas y puntuación.

---

## Requisitos de la consigna resueltos

### Requisitos mínimos
- **1 página principal** — grilla de juegos en la ruta `/`
- **Al menos 3 secciones** — navbar, grilla de juegos y página de detalle individual por juego (`/juegos/[id]`)
- **Responsive básico** — layout adaptable con CSS Grid (`auto-fill / minmax`) y media queries para mobile
- **Comportamiento con JavaScript** — buscador en tiempo real que filtra los juegos por nombre usando estado de React (`useState`)

### Opcionales resueltos (crédito extra)
- **Componentes reutilizables** — `GameCard` y `Stars` en `GameGrid.jsx`, reutilizados para todos los juegos
- **Animaciones** — transiciones en hover de las cards, zoom animado en el hero de la página de detalle, slideDown en la navbar
- **Integración con otras librerías** — React integrado dentro de Astro con directiva `client:load`

---

## Herramientas usadas

- [Astro](https://astro.build/) — framework principal
- [React](https://react.dev/) — componente interactivo de la grilla y búsqueda
- [Google Fonts](https://fonts.google.com/) — tipografías Bebas Neue y DM Sans
- CSS Grid y custom properties (variables CSS)
- JavaScript vanilla para el comportamiento del buscador

---

## Instrucciones para ejecutarlo

**Requisitos previos:** tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/checkpoint.git
cd checkpoint

# 2. Instalar dependencias
npm install

# 3. Correr el servidor de desarrollo
npm run dev
```

Luego abrir el navegador en `http://localhost:4321`

### Build para producción

```bash
npm run build
npm run preview
```

---

## Estructura del proyecto

```
/
├── public/          # Imágenes de los juegos
├── src/
│   ├── components/
│   │   └── GameGrid.jsx     # Grilla + buscador (React)
│   ├── pages/
│   │   ├── index.astro      # Página principal
│   │   └── juegos/
│   │       └── [id].astro   # Página de detalle dinámica
└── package.json
```

---

## Deploy

> Proyecto deployado en: https://tp-1-front-ivo-el-juego.vercel.app/