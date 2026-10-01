# CSS Animations 2026 - Guia practica

Esta guia te explica animaciones CSS modernas con enfoque real de producto: claridad, performance, accesibilidad y compatibilidad.


## Resumen de Motion y Guía de Efectos

### Resumen de motion.scss

**Duration**

**Easing**

**Delay**

**Intensity**

**Semantics:**
  - hover, press, system, emphasis, entrance/exit

### motion-primitives.scss

- Keyframes reutilizables para efectos comunes
- Clases utilitarias para aplicar animaciones rápidamente
- Fallback para prefers-reduced-motion

### Guía rápida de motion-primitives

| Efecto / Clase             | Qué hace / Cuándo usarlo                                           |
|----------------------------|--------------------------------------------------------------------|
| motion-fade-in             | Desvanece de invisible a visible. Ideal para entradas suaves.      |
| motion-rise                | Aparece subiendo desde abajo. Útil para secciones o cards.         |
| motion-slide               | Aparece deslizando desde la izquierda. Para paneles, menús.        |
| motion-blur-reveal         | Desenfoca y revela. Para imágenes/textos que deben destacar.       |
| motion-scale-out           | Desaparece escalando hacia fuera. Para salidas dramáticas.         |
| motion-fall                | Desaparece cayendo. Para eliminar elementos con peso visual.       |
| motion-glitch              | Efecto glitch rápido. Para detalles llamativos o error.            |
| motion-quote-fade-grow     | Aparece con fade y crece. Para citas, textos destacados.           |

**Clases utilitarias:**
  - .motion-fade-in
  - .motion-rise
  - .motion-slide
  - .motion-blur-reveal
  - .motion-scale-out
  - .motion-fall
  - .motion-glitch
  - .motion-quote-fade-grow

### Uso y accesibilidad:

Añade la clase al elemento y ajusta duración/easing con los tokens si lo necesitas.
Ejemplo:
```html
<div class="motion-rise" style="animation-duration: var(--duration-md); animation-timing-function: var(--ease-emphasized);"></div>
````

Todos los efectos respetan `prefers-reduced-motion` y se desactivan si el usuario lo prefiere.

```

## 1) Mapa mental rapido

Una animacion CSS tiene 3 piezas:

1. Keyframes: que cambia.
2. Propiedades animation-\*: como cambia.
3. Timeline: quien controla el progreso (tiempo normal o scroll).

Ejemplo minimo:

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation-name: fade-up;
  animation-duration: 400ms;
  animation-timing-function: ease;
  animation-fill-mode: both;
}
```

## 2) Longhand vs shorthand (muy importante)

El shorthand `animation` es comodo, pero en 2026 hay una trampa frecuente:

- `animation-timeline` es reset-only dentro de `animation`.
- Si defines `animation: ...` despues de `animation-timeline`, puedes resetear timeline a `auto` sin querer.

Regla segura:

1. Define `animation: ...` (si lo usas).
2. Despues define `animation-timeline` y `animation-range`.

Patron recomendado:

```css
.title {
  animation: fade-up 1ms linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```

Si quieres evitar errores, usa longhands:

```css
.title {
  animation-name: fade-up;
  animation-duration: 1ms;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```

## 3) Propiedades clave que debes dominar

- `animation-name`: nombre de `@keyframes`.
- `animation-duration`: duracion por ciclo. Para scroll-driven suele ser `auto` o `1ms` segun estrategia.
- `animation-timing-function`: curva (`linear`, `ease`, `cubic-bezier()`, `linear()`).
- `animation-delay`: retraso.
- `animation-iteration-count`: cuantas veces (`1`, `infinite`).
- `animation-direction`: `normal`, `reverse`, `alternate`.
- `animation-fill-mode`: `none`, `forwards`, `backwards`, `both`.
- `animation-play-state`: `running`, `paused`.
- `animation-composition`: `replace`, `add`, `accumulate` (muy util para mezclar efectos).
- `animation-timeline`: timeline de tiempo o scroll.
- `animation-range`: tramo exacto del timeline donde corre la animacion.

## 4) Scroll-driven animations (lo moderno)

En vez de depender de tiempo, el progreso depende del scroll.

### 4.1 Timeline anonimo por scroll

```css
@keyframes grow-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.progress {
  transform-origin: left center;
  animation-name: grow-progress;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: scroll(root block);
}
```

### 4.2 Timeline anonimo por visibilidad (view)

```css
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.reveal-on-scroll {
  animation-name: reveal;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: view();
  animation-range: entry 20% cover 45%;
}
```

### 4.3 Timeline nombrado

Timeline anónimo por scroll:
el propio elemento dice “sígueme el scroll de este contexto” y no reutiliza ningún nombre.

Timeline nombrado:
primero nombras una fuente de scroll y luego otros elementos dicen “quiero animarme usando esa fuente”.

```css
.scroller {
  overflow: auto;
  scroll-timeline: --cards block;
}

.card {
  animation-name: reveal;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: --cards;
}
```

## 5) animation-range explicado simple

`animation-range` te deja decir donde empieza y termina dentro del timeline.

Ejemplos:

- `animation-range: entry;`
  - Equivale a `entry 0% entry 100%`.
- `animation-range: entry 25% cover 60%;`
  - Empieza cuando entra 25%, termina al cubrir 60%.
- `animation-range: 20% 80%;`
  - Funciona en porcentaje general del timeline.

Tip: en scroll-driven casi siempre conviene `animation-fill-mode: both` para evitar saltos visuales.

## 6) Performance real (sin jank)

### 6.1 Prioriza propiedades baratas

Anima preferentemente:

- `transform`
- `opacity`

Evita animar en loops grandes:

- `width`, `height`, `top`, `left`, `margin`
- `box-shadow` muy pesado
- `filter` en exceso

### 6.2 Usa will-change con moderacion

```css
.floating-chip {
  will-change: transform, opacity;
}
```

No lo pongas en cientos de nodos a la vez.

### 6.3 Respeta reduced motion

```css
.hero-orb {
  animation: float 6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-orb {
    animation: none;
    transform: none;
  }
}
```

## 7) Patrones de UI utiles

### 7.1 Entrada suave de seccion

````css
@keyframes section-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

````

### 7.2 Pulse de CTA sin molestar

```css
@keyframes cta-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
}

.cta {
  animation: cta-pulse 2.2s ease-in-out infinite;
}
````

### 7.3 Dos animaciones en paralelo

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rise-in {
  from {
    transform: translateY(16px);
  }
  to {
    transform: translateY(0);
  }
}

.item {
  animation-name: fade-in, rise-in;
  animation-duration: 300ms, 420ms;
  animation-timing-function: linear, cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both, both;
}
```

## 8) Errores tipicos y como evitarlos

1. No se ve nada:
   - Hay `opacity: 0` pero no hay animation efectiva.
   - Solucion: confirma `animation-name` y timeline.

2. Scroll animation no responde:
   - `animation` shorthand reseteo `animation-timeline`.
   - Solucion: define `animation-timeline` despues del shorthand, o usa longhands.

3. Todo se ve igual entre variantes:
   - Selectores de variante sin suficiente especificidad.
   - Solucion: sube especificidad o reordena reglas.

4. Saltos al entrar/salir:
   - Falta `animation-fill-mode: both`.

5. Texto se ve roto al escalar:
   - Escalas exageradas en tipografia (`scale(4+)`).
   - Solucion: usa rangos suaves (`1` a `1.15/1.25`) y prioriza opacidad.

## 9) Compatibilidad en 2026 (resumen rapido)

- `@keyframes`, `animation-*` clasico: ampliamente soportado.
- `prefers-reduced-motion`: ampliamente soportado.
- `animation-composition`: ampliamente soportado.
- `animation-timeline`, `view-timeline`, `animation-range`: soporte fuerte en Chromium y Safari moderno; Firefox sigue mas limitado segun feature/flag.

Conclusiones practicas:

1. Puedes usar scroll-driven hoy en apps modernas.
2. Mantiene fallback para navegadores sin soporte.

Fallback basico:

```css
.feature {
  animation: fade-up 450ms ease both;
}

@supports (animation-timeline: view()) {
  .feature {
    animation-name: fade-up;
    animation-duration: 1ms;
    animation-timeline: view();
    animation-range: entry 20% cover 50%;
  }
}
```

## 10) Mini receta para desarrollar sin perder tiempo

1. Empieza por un keyframe sencillo (opacity + transform).
2. Prueba primero con timeline de tiempo normal.
3. Migra a scroll timeline (`view()` o `scroll()`).
4. Ajusta `animation-range` para timing narrativo.
5. Activa `prefers-reduced-motion`.
6. Mide performance en DevTools.
7. Revisa soporte y agrega fallback con `@supports`.

## 11) Referencias recomendadas

- MDN: Using CSS animations
- MDN: animation-timeline
- MDN: view-timeline
- MDN: animation-range
- MDN: @keyframes
- MDN: prefers-reduced-motion
- MDN: @starting-style (para transiciones de entrada/salida)
- Chrome for Developers: Scroll-driven animations

## 12) Cheatsheet Angular + component scss

### 12.1 Patron base para un titulo con scroll timeline

```scss
header {
  h1 {
    opacity: 0;
    transform-origin: center;
    animation-name: title-reveal;
    animation-duration: 1ms;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-timeline: view();
    animation-range: entry 0% cover 35%;
  }
}

@keyframes title-reveal {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  35% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### 12.2 Subtitulo o chapter label

```scss
header {
  h2 {
    opacity: 0;
    letter-spacing: 0.18em;
    animation-name: chapter-reveal;
    animation-duration: 1ms;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-timeline: view();
    animation-range: entry 0% cover 25%;
  }
}

@keyframes chapter-reveal {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 12.3 Blockquote que crece y se desvanece

```scss
header {
  blockquote {
    opacity: 1;
    transform-origin: center top;
    animation-name: quote-fade-grow;
    animation-duration: 1ms;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-timeline: view();
    animation-range: cover 30% exit-crossing 95%;
  }
}

@keyframes quote-fade-grow {
  0% {
    opacity: 0.85;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}
```

### 12.4 Fallback seguro

```scss
h1 {
  animation: title-enter 450ms ease both;
}

@supports (animation-timeline: view()) {
  h1 {
    animation-name: title-reveal;
    animation-duration: 1ms;
    animation-timeline: view();
    animation-range: entry 0% cover 35%;
  }
}
```

### 12.5 Regla de oro para component scss

Si usas scroll-driven en Angular component scss:

1. Evita `animation: ...` despues de `animation-timeline`.
2. Si tienes variantes, cambia solo `animation-name` cuando puedas.
3. Deja `animation-timeline`, `animation-fill-mode` y `animation-range` en la regla base compartida.

## 13) Plantilla para variantes por seccion

Patron recomendado para algo como `section[data-variant='fall'] header h1`.

### 13.1 HTML base

```html
<section [attr.data-variant]="section().variant">
  <header>
    <h2>{{ section().chapter }}</h2>
    <h1>{{ section().titleKey | translate }}</h1>
    <blockquote [innerHTML]="section().quoteKey | translate"></blockquote>
  </header>
</section>
```

### 13.2 SCSS base compartido

```scss
section {
  header {
    h1,
    h2 {
      opacity: 0;
      animation-duration: 1ms;
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: view();
    }

    h1 {
      animation-name: title-default;
      animation-range: entry 0% cover 30%;
    }

    h2 {
      animation-name: chapter-default;
      animation-range: entry 0% cover 20%;
    }
  }
}
```

### 13.3 Variantes solo para h1

```scss
section[data-variant='fall'] header h1 {
  animation-name: variant-fall;
  transform-origin: top center;
}

section[data-variant='slide'] header h1 {
  animation-name: variant-slide;
  transform-origin: center left;
}

section[data-variant='blur'] header h1 {
  animation-name: variant-blur;
}
```

### 13.4 Keyframes de ejemplo

```scss
@keyframes variant-fall {
  0% {
    opacity: 0;
    transform: translateY(-70px) scale(1.08);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes variant-slide {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes variant-blur {
  0% {
    opacity: 0;
    filter: blur(18px);
    transform: scale(1.04);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
}
```
