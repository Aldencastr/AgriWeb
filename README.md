# AgriWeb

Sitio web de Ingeniería Agrícola — UNI (Universidad Nacional de Ingeniería). Construido con Vite + React.

## Requisitos previos

- Node.js 20 o superior

## Instalación

```bash
npm install
```

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> **Importante:** no uses la extensión "Live Server" (Go Live) de VS Code para
> previsualizar este proyecto. Solo sirve archivos estáticos sin compilar, y el
> código JSX de React no funcionará (verás la página en blanco). Usa siempre
> `npm run dev`.

### Build de producción y vista previa

```bash
npm run build
npm run preview
```

## Despliegue

El despliegue a **GitHub Pages** es automático: cada push a `main` ejecuta
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que compila el
proyecto con base `/AgriWeb/` y publica el resultado en
[https://aldencastr.github.io/AgriWeb/](https://aldencastr.github.io/AgriWeb/).

## Estructura

```
index.html           Punto de entrada (Vite)
src/main.jsx         Bootstrap de React
src/app/App.jsx      Ruteo por vista (#hash)
src/components/      Secciones y layout
src/data/            Datos de la carrera (demo y plan de estudios)
src/styles/          Global CSS
src/utils/           Helpers (assetUrl: rutas base para GitHub Pages)
src/services/        Firebase (Auth y Realtime Database)
public/images/       Imágenes estáticas
```
