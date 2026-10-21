# Plan de Mejoras Integral - AgriWeb

## 🎯 Objetivo General
Migrar a **Next.js App Router** (ya parcialmente implementado) y aplicar mejoras transversales de código, UI/UX, accesibilidad, SEO y performance.

---

## 📋 Estado Actual

| Arquitectura | Estado | Ubicación |
|-------------|--------|-----------|
| Vite + React Router | **Activa** (deploy) | `src/App.jsx`, `src/main.jsx`, `src/components/sections/*.jsx` |
| Next.js App Router | **Inactiva** (lista para usar) | `src/app/page.tsx`, `src/components/sections/*/*.tsx` |

---

## 🚀 FASE 1: Migración y Fundación (Prioridad ALTA)

### 1.1 Activar Next.js App Router
- [ ] Cambiar `index.html` para usar Next.js (`npm run dev` con Next)
- [ ] Configurar `output: 'export'` para GitHub Pages (o mantener SSR)
- [ ] Migrar datos de `sitio.json` a `src/services/data.service.ts`
- [ ] Verificar que todas las páginas Next.js funcionen

### 1.2 TypeScript Estricto
- [ ] Renombrar `.jsx` → `.tsx` en componentes activos
- [ ] Añadir tipos a props, hooks, servicios
- [ ] Configurar `strict: true` en tsconfig.json (ya está)
- [ ] Eliminar archivos `.js` duplicados (useAuth.js, useToast.js, etc.)

### 1.3 Limpieza de CSS
- [ ] **Eliminar `global.css` (2000+ líneas)** - usar Tailwind + CSS variables mínimas
- [ ] Consolidar variables en `globals.css` (solo diseño system tokens)
- [ ] Migrar estilos inline a clases Tailwind
- [ ] Configurar `@tailwindcss/typography` para contenido rico

### 1.4 Estado Global → React Context / Zustand
- [ ] Extraer estado de `App.jsx` a stores (auth, UI, testimonios)
- [ ] Usar `@tanstack/react-query` para data fetching (ya instalado)
- [ ] Eliminar prop drilling masivo

---

## 🎨 FASE 2: UI/UX y Diseño Visual (Prioridad ALTA)

### 2.1 Design System Consistente
- [ ] Completar componentes UI en `src/components/ui/` (Button, Card, Input, Select, Badge, Dialog, Toast, Tooltip, Avatar, Tabs, Accordion, DropdownMenu, NavigationMenu)
- [ ] Tokens de diseño: colores, espaciado, tipografía, sombras, radios
- [ ] Dark mode nativo con `next-themes` o CSS variables

### 2.2 Hero Section Mejorada
- [ ] Touch/swipe support en carrusel
- [ ] Mejor contraste de texto sobre imágenes
- [ ] Lazy loading de imágenes no prioritarias
- [ ] Indicador de progreso de auto-play

### 2.3 Componentes de Sección Modernos
- [ ] **Stats**: Contadores animados con IntersectionObserver
- [ ] **Perfil/Features**: Cards con hover effects, iconos consistentes
- [ ] **Videos**: Lazy YouTube embeds (lite-youtube-embed)
- [ ] **PlanEstudios**: Acordeones por año, búsqueda en tiempo real, badges de créditos/horas
- [ ] **Testimonios**: Carrusel accesible, formulario validado con react-hook-form + zod
- [ ] **Contacto**: Formulario con validación client-side, honeypot anti-spam
- [ ] **FAQ**: Acordeón accesible con animaciones
- [ ] **Laboratorios/Proyectos/Noticias/Ingenieros**: Grid responsivo, cards consistentes

### 2.4 Navegación y Layout
- [ ] Navbar: Mega-menu en desktop, drawer en móvil
- [ ] Skip link funcional
- [ ] Breadcrumbs en páginas internas
- [ ] Footer: Newsletter signup, enlaces legales, redes sociales

### 2.5 Micro-interacciones y Animaciones
- [ ] Scroll reveal con `framer-motion` o CSS `animation-timeline`
- [ ] Page transitions suaves
- [ ] Loading skeletons para datos async
- [ ] Hover/tap feedback consistente

---

## ♿ FASE 3: Accesibilidad y SEO (Prioridad ALTA)

### 3.1 Accesibilidad (WCAG 2.1 AA)
- [ ] Semántica HTML5 correcta (section, article, aside, nav, main)
- [ ] Headings jerárquicos (h1 → h2 → h3)
- [ ] ARIA labels/roles donde falten
- [ ] Focus visible en todos los interactivos
- [ ] Contraste de colores ≥ 4.5:1
- [ ] Skip links funcionales
- [ ] Modales con focus trap
- [ ] Imágenes con `alt` descriptivos
- [ ] Formularios con labels asociados, errores anunciados

### 3.2 SEO Técnico
- [ ] Metadata dinámica por página (`generateMetadata`)
- [ ] Open Graph / Twitter Cards completos
- [ ] JSON-LD structured data:
  - `EducationalOrganization` (universidad)
  - `Course` (plan de estudios)
  - `Person` (ingenieros)
  - `Testimonial` / `Review`
  - `Event` (admisión)
  - `FAQPage`
- [ ] Sitemap.xml automático (`next-sitemap`)
- [ ] Robots.txt optimizado
- [ ] Canonical URLs
- [ ] Hreflang si hay multiidioma

### 3.3 Core Web Vitals
- [ ] LCP < 2.5s (optimizar hero image, fonts)
- [ ] INP < 200ms (reducir JS main thread)
- [ ] CLS < 0.1 (reservar espacio para imágenes/fonts)

---

## ⚡ FASE 4: Performance y Arquitectura (Prioridad MEDIA)

### 4.1 Optimización de Assets
- [ ] Next.js Image component para todas las imágenes
- [ ] Formatos AVIF/WebP con fallbacks
- [ ] Responsive images con `sizes`
- [ ] Preload critical hero image
- [ ] Font optimization (`next/font` con Inter variable)

### 4.2 Code Splitting y Lazy Loading
- [ ] `dynamic()` import para secciones pesadas (PlanEstudios, Testimonios, Mapas)
- [ ] Lazy load below-the-fold sections
- [ ] Bundle analyzer (`@next/bundle-analyzer`)

### 4.3 Caching y Data Fetching
- [ ] `fetch` con `next: { revalidate: 3600 }` para datos estáticos
- [ ] `unstable_cache` para computaciones costosas
- [ ] React Query para datos mutables (testimonios, contactos)
- [ ] Service Worker para offline (Workbox)

### 4.4 Build y Deploy
- [ ] `output: 'export'` + GitHub Actions para GitHub Pages
- [ ] Opcional: Vercel para SSR/ISR
- [ ] Compresión Brotli/Gzip
- [ ] Headers de cache óptimos (ya en next.config.js)

---

## 🔧 FASE 5: Código y Mantenibilidad (Prioridad MEDIA)

### 5.1 Arquitectura de Componentes
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout con providers
│   ├── page.tsx            # Home (server component)
│   ├── plan-estudios/page.tsx
│   ├── testimonios/page.tsx
│   ├── contacto/page.tsx
│   ├── admision/page.tsx
│   ├── faq/page.tsx
│   ├── ingenieros/page.tsx
│   ├── laboratorios/page.tsx
│   ├── proyectos/page.tsx
│   ├── noticias/page.tsx
│   ├── simuladores/
│   └── gracias/page.tsx
├── components/
│   ├── ui/                 # Design system (Radix + Tailwind)
│   ├── sections/           # Secciones reutilizables
│   ├── layout/             # Header, Footer, Navbar
│   ├── modals/             # Dialogs, Sheets
│   └── providers/          # Context providers
├── lib/
│   ├── utils.ts            # cn(), formatters, helpers
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # Config, enums
│   ├── validations.ts      # Zod schemas
│   └── firebase/           # Firebase config (client only)
├── hooks/                  # Custom hooks tipados
├── services/               # Data fetching, API clients
├── data/                   # Static JSON/TS data
└── styles/
    └── globals.css         # Solo design tokens + reset
```

### 5.2 Calidad de Código
- [ ] ESLint + Prettier + Husky (ya configurados)
- [ ] Import aliases (`@/*`) funcionando
- [ ] Barrel exports (`index.ts`) en cada carpeta
- [ ] Eliminar código muerto (archivos `.jsx` viejos, duplicados)
- [ ] Path mapping consistente

### 5.3 Testing
- [ ] Unit tests: Vitest + React Testing Library
- [ ] Component tests: Storybook (opcional)
- [ ] E2E: Playwright (ya instalado)
- [ ] CI: GitHub Actions (lint, type-check, test, build)

### 5.4 Documentación
- [ ] README actualizado con scripts, arquitectura
- [ ] Component library docs (Storybook o MDX)
- [ ] Contributing guide
- [ ] Changelog

---

## 📦 FASE 6: Funcionalidades Avanzadas (Prioridad BAJA)

### 6.1 Simuladores Interactivos
- [ ] Calculadora de riego (ya en `src/app/simuladores/calculadora-riego`)
- [ ] Test vocacional perfil agrícola
- [ ] Comparador de modalidades

### 6.2 Panel de Administración (opcional)
- [ ] CMS para noticias, testimonios, ingenieros
- [ ] Analytics dashboard

### 6.3 PWA
- [ ] Manifest.json (ya existe)
- [ ] Service Worker
- [ ] Install prompt
- [ ] Offline fallback

---

## 📊 Métricas de Éxito

| Métricas | Objetivo |
|----------|----------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Bundle Size (JS gzipped) | < 150 KB |
| Time to Interactive | < 3.5s |
| TypeScript Errors | 0 |
| ESLint Warnings | 0 |
| Test Coverage | ≥ 80% |

---

## 🗓️ Cronograma Sugerido

| Semana | Foco | Entregables |
|--------|------|-------------|
| 1 | Migración Next.js + TypeScript | App corriendo en Next.js, TS strict |
| 2 | Design System + CSS Cleanup | UI components, globals.css limpio |
| 3 | Secciones Core (Hero, Stats, Perfil, PlanEstudios) | Componentes modernos, accesibles |
| 4 | Secciones Restantes + Formularios | Videos, Testimonios, Contacto, FAQ, etc. |
| 5 | SEO + Accesibilidad + Performance | Metadata, structured data, CWV |
| 6 | Testing + CI + Deploy | Pipeline completo, docs |

---

## 🔄 Próximos Pasos Inmediatos

1. **Decidir**: ¿Migrar ya a Next.js App Router o mejorar Vite actual?
2. **Si Next.js**: Activar `npm run dev` con Next, verificar build
3. **Si Vite**: Aplicar mejoras incrementales (TS, CSS, componentes)

---

> **Recomendación**: La versión Next.js App Router ya está **80% implementada** y es arquitectónicamente superior. Migrar ahora ahorra meses de deuda técnica.