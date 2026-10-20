# AgriWeb

Sitio web de Ingeniería Agrícola — UNI (Universidad Nacional de Ingeniería). Sitio estático en **HTML, CSS y JavaScript puro** (ES Modules) — sin React y sin proceso de build.

## Ejecución

No hay build: con una extensión como **Live Server** de VS Code ("Go Live") o cualquier servidor estático funciona directamente.

```bash
# Alternativas
# 1) Live Server (VS Code): botón "Go Live"
# 2) Cualquier servidor estático, p. ej.:
npx serve .
```

> Abrir el `index.html` directamente con `file://` no sirve los módulos ES por
> restricciones CORS del navegador; usa un servidor estático o Live Server.

## Despliegue

El despliegue a **GitHub Pages** es automático: cada push a `main` ejecuta
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que publica el
repositorio tal cual en
[https://aldencastr.github.io/AgriWeb/](https://aldencastr.github.io/AgriWeb/).

## Estructura

```
index.html                  Punto de entrada
styles/global.css           Estilos globales
js/
  app.js                    Orquestador: estado, ruteo (#hash), render y eventos
  services/firebase.js      Firebase (Auth y Realtime Database) vía CDN
  components/
    layout/                 Navbar y Footer
    sections/               Hero, Stats, Perfil, Carousel, Videos, PerfilEgresado,
                            Laboratorios, Proyectos, Noticias, PlanEstudios,
                            Testimonios, Admision, FAQ, Contacto
    modals/                 LoginModal e InscripcionModal
  data/                     Datos de la carrera (demo y plan de estudios 2026)
  utils/                    Helpers DOM (esc, toArray)
images/                     Imágenes estáticas
```

## Ruteo

La navegación entre vistas usa el hash de la URL (`#/plan-estudios`,
`#testimonios`, …); no requiere servidor con reescritura de rutas.

## Datos en tiempo real

Los datos se leen de Firebase Realtime Database (`Carreras/IngenieriaAgricola`).
Si la conexión falla se muestra el contenido de demostración y el pie de página
lo indica.
