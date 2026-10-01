# 🛠️ Sistema de Theming — Tareas Pendientes (Español)

Este proyecto implementa un sistema de diseño basado en tokens, con roles de color semánticos, capas de superficie y mapeo de elevación.

La implementación actual es suficientemente estable para producción, pero los siguientes puntos están pendientes para completar la arquitectura de theming dinámico.

---

## 🎨 Sistema de Color

- [ ] Implementar foreground automático (`on-*`) basado en la luminancia del fondo
  - Reemplazar asignaciones manuales como:
    - `--color-on-primary`
    - `--color-on-accent`
    - `--color-on-success`
  - Usar el valor de lightness en HSL para decidir foreground claro/oscuro dinámicamente
  - Asegurar consistencia de contraste en:
    - modo claro
    - modo oscuro
    - cambio de tema en runtime (servicio Angular)

- [ ] Generar tokens de foreground contextuales:
  - `--color-on-surface-raised`
  - `--color-on-surface-overlay`
  - `--color-on-background`

---

## 🪟 Superficies

- [ ] Validar la escala de lightness entre modos:
  - `--surface-l-background`
  - `--surface-l-base`
  - `--surface-l-raised`
  - `--surface-l-overlay`

- [ ] Auditar el uso de transparencias en:
  - tarjetas (cards)
  - paneles
  - contenedores interactivos

---

## 🧱 Elevación y Capas

- [ ] Alinear definitivamente:
  - `--elevation-*`
  - `--layer-*`
  - roles de superficie

  Mapeo actual propuesto:

  | Primitivo UI | Token de Superficie | Token de Elevación | Token de Capa  |
  | ------------ | ------------------- | ------------------ | -------------- |
  | Card         | surface             | elevation-rest     | layer-base     |
  | Dropdown     | surface-raised      | elevation-floating | layer-floating |
  | Tooltip      | surface-overlay     | elevation-overlay  | layer-overlay  |
  | Modal        | surface-overlay     | elevation-modal    | layer-modal    |
  | Toast        | mood surface        | elevation-dreamy   | layer-toast    |

- [ ] Validar escalas:
  - `--surface-l-background`
  - `--surface-l-base`
  - `--surface-l-raised`
  - `--surface-l-overlay`
- [ ] Auditar transparencias en: cards, panels, contenedores interactivos

---

## 🎛️ Elevación por Mood

- [x] Color de sombra derivado del mood implementado
  - Elevación basada en el hue primario para feedback de interacción
  - Usos:
    - hover
    - drag
    - focus rings
    - UI flotante activa

---

## 🖌️ Personalización de Theme (Próximamente)

- [ ] Añadir una sección/interfaz donde el usuario pueda customizar todo el theme visualmente
  - Permitir elegir valores de H (hue) y S (saturación) para los principales tokens
  - Guardar y aplicar la configuración en tiempo real

---

## 🎞️ Motion

- [ ] Documentar el uso de tokens por interacción:
  - hover
  - press
  - drag
  - abrir/cerrar modal
  - entrada/salida de toast

- [ ] Alinear duración de motion con nivel de elevación
  - mayor elevación = mayor duración + easing más suave

- [ ] Centralizar la politica de movimiento en `src/app/theme/motion.scss`
  - Mover reglas `@media (prefers-reduced-motion: reduce)` desde estilos de features/componentes
  - Mover overrides de animaciones decorativas (ej. sticky nav de welcome) a `motion.scss`
  - Dejar `src/styles.scss` como punto de import/activacion global, sin logica especifica de motion

- [ ] Añadir soporte para `prefers-reduced-motion` en los estilos SCSS
  - Usar media query para reducir duración de animaciones y transiciones si el usuario lo prefiere
  - Testear que los tokens de motion se ajustan correctamente

---

## ♿ Accesibilidad

- [ ] Soporte para `aria-label`, anuncios `aria-live`
- [ ] Validar ratios de contraste tras implementar foreground automático
- [ ] Añadir tests automáticos de contraste usando axe-core, pa11y o jest-axe
  - Recorrer todos los tokens `--color-on-*` y comprobar contraste con su fondo

---

## 🔮 Extensiones Futuras / Future Integrations

- Compatibilidad S
- Boot consciente de hydration
- Generación dinámica de tokens
- Paletas definidas por usuario
- Preferencias persistentes multi-dispositivo
- Integrar persistencia cloud (Firestore o similar)
- Añadir providers de analytics y autenticación
- Añadir servicio de inicialización de accesibilidad
- Integrar monitorización de errores global

---

## ⚙️ Theming en Runtime (Angular)

- [ ] Asegurar que todos los primitives respondan a:
  - cambio de tema
  - cambio de mood
  - override de marca

- [ ] Auditar estilos de componentes para evitar uso directo de primitives

---

## ✨ Efectos e Interacciones Reutilizables

- [ ] Crear librería de efectos `.fx-*` para superficies interactivas:
  - [ ] `.fx-surface-interactive` — glow ambiental + light sweep en hover
    - Ambient glow (radial gradient blur, opacity en hover)
    - Light sweep (linear gradient sweep, transform en hover)
    - Accesibilidad: respetar `prefers-reduced-motion`
  - [ ] **Variaciones de intensidad** según contexto (data-intensity):
    - `.fx-surface-interactive[data-intensity="soft"]` → glow suave, sweep lento
    - `.fx-surface-interactive[data-intensity="strong"]` → glow pronunciado, sweep rápido
    - `.fx-surface-interactive[data-intensity="ambient"]` → solo glow, sin sweep
  - [ ] Conectar intensidad con **moods** (rabbit → soft, caterpillar → stong, etc.)
  - [ ] Extraer a archivo SCSS compartido (`src/app/theme/effects.scss`)
  - [ ] Documentar uso en componentes (botones, cards, widgets)
  - [ ] Aplicar a componentes core: botones, tarjetas, interactivos

---

## 🧹 Refactor

- [ ] Eliminar uso de colores utilitarios legacy en componentes core
- [ ] Mover cualquier referencia a primitives fuera de los estilos de componentes
- [ ] Pasar las secciones de `welcome` a componentes reutilizables
- [ ] Crear componente dedicado de `cover` para el título/logo no traducible (`Tiny Theme Studio`) con estilos propios
- [ ] Auditoría de calidad de código:
  - [ ] Eliminar **magic numbers** (valores hardcodeados): usar siempre tokens `--radius-*`, `--space-*`, `--color-*`, etc.
  - [ ] Eliminar **dead code** (variables y funciones no usadas)
  - [ ] Respetar principio **DRY** (Don't Repeat Yourself): no duplicar estilos/lógica

---

## 🌐 Responsive moderno

- [ ] Hacer toda la web responsive usando la menor cantidad posible de media queries
  - Explorar a fondo `clamp()`, flex y grid para layouts fluidos y adaptativos
  - Documentar patrones y aprendizajes en LAB_NOTES.md

---

## 🧪 Test files

- [ ] Review and fix all \*.spec.ts test files after main features are stable
- [ ] (Español) Revisar y arreglar todos los archivos \*.spec.ts cuando las funcionalidades principales estén listas

---

Cuando todo esto esté completo, el sistema soportará:
✔ cambio de tema dinámico
✔ capas de interacción basadas en mood
✔ mapeo semántico de elevación
✔ contraste de foreground consistente
✔ personalización de marca en runtime

---

# 🛠️ Theming System — Pending Tasks (English)

This project implements a token-based design system with semantic color roles, surface layering, and elevation mapping.

## The current implementation is stable enough for production, but the following items are pending to complete the full dynamic theming architecture.

## 🎨 Color System

- [ ] Implement automatic foreground (`on-*`) based on background luminance
  - Replace manual assignments such as:
    - `--color-on-primary`
    - `--color-on-accent`
    - `--color-on-success`
  - Use HSL lightness value to decide light/dark foreground dynamically
  - Ensure contrast consistency across:
    - light mode
    - dark mode
    - runtime theme switching (Angular service)

- [ ] Generate contextual foreground tokens:
  - `--color-on-surface-raised`
  - `--color-on-surface-overlay`
  - `--color-on-background`

---

## 🪟 Surfaces

- [ ] Validate the lightness scale across modes:
  - `--surface-l-background`
  - `--surface-l-base`
  - `--surface-l-raised`
  - `--surface-l-overlay`

- [ ] Audit transparency usage for:
  - cards
  - panels
  - interactive containers

---

## 🧱 Elevation & Layering

- [ ] Final alignment between:
  - `--elevation-*`
  - `--layer-*`
  - surface roles

  Current intended mapping:

  | UI Primitive | Surface Token   | Elevation Token    | Layer Token    |
  | ------------ | --------------- | ------------------ | -------------- |
  | Card         | surface         | elevation-rest     | layer-base     |
  | Dropdown     | surface-raised  | elevation-floating | layer-floating |
  | Tooltip      | surface-overlay | elevation-overlay  | layer-overlay  |
  | Modal        | surface-overlay | elevation-modal    | layer-modal    |
  | Toast        | mood surface    | elevation-dreamy   | layer-toast    |

- [ ] Validate scales:
  - `--surface-l-background`
  - `--surface-l-base`
  - `--surface-l-raised`
  - `--surface-l-overlay`
- [ ] Audit transparencies in: cards, panels, interactive containers

---

## 🎛️ Mood Elevation

- [x] Mood-derived shadow color implemented
  - Elevation based on primary hue for interaction feedback
  - Uses:
    - hover
    - drag
    - focus rings
    - active floating UI

---

## 🖌️ Theme Customization (Coming Soon)

- [ ] Add a section/interface where the user can visually customize the entire theme
  - Allow choosing H (hue) and S (saturation) values for main tokens
  - Save and apply the configuration in real time

---

## 🎞️ Motion

- [ ] Document token usage per interaction:
  - hover
  - press
  - drag
  - modal open/close
  - toast entry/exit

- [ ] Align motion duration with elevation level
  - higher elevation = longer duration + softer easing

- [ ] Add support for `prefers-reduced-motion` in SCSS styles
  - Use media query to reduce animation and transition duration if the user prefers
  - Test that motion tokens adjust correctly

---

## ♿ Accessibility

- [ ] Support for `aria-label`, `aria-live` announcements
- [ ] Validate contrast ratios after implementing automatic foreground
- [ ] Add automated contrast tests using axe-core, pa11y, or jest-axe
  - Iterate all `--color-on-*` tokens and check contrast with their background

---

## 🔮 Future Integrations

- SSR compatibility
- Hydration-aware boot
- Dynamic token generation
- User-defined palettes
- Multi-device persistent preferences
- Integrate cloud persistence (Firestore or similar)
- Add analytics and auth providers
- Add accessibility initialization service
- Integrate global error monitoring

---

## ⚙️ Runtime Theming (Angular)

- [ ] Ensure all primitives respond to:
  - theme switch
  - mood switch
  - brand override

- [ ] Audit component styles to avoid direct use of primitives

---

## ✨ Reusable Surface & Interaction Effects

- [ ] Create library of `.fx-*` effects for interactive surfaces:
  - [ ] `.fx-surface-interactive` — ambient glow + light sweep on hover
    - Ambient glow (radial gradient blur, opacity on hover)
    - Light sweep (linear gradient sweep, transform on hover)
    - Accessibility: respect `prefers-reduced-motion`
  - [ ] **Intensity variations** based on context (data-intensity):
    - `.fx-surface-interactive[data-intensity="soft"]` → subtle glow, slow sweep
    - `.fx-surface-interactive[data-intensity="strong"]` → pronounced glow, fast sweep
    - `.fx-surface-interactive[data-intensity="ambient"]` → glow only, no sweep
  - [ ] Connect intensity to **moods** (rabbit → soft, caterpillar → strong, etc.)
  - [ ] Extract to shared SCSS file (`src/app/theme/effects.scss`)
  - [ ] Document usage in components (buttons, cards, widgets)
  - [ ] Apply to core components: buttons, cards, interactive elements

---

## 🧹 Refactor

- [ ] Remove legacy utility color usage from core UI components
- [ ] Move any remaining primitive references out of component styles
- [ ] Move `welcome` sections into reusable components
- [ ] Create a dedicated `cover` component for the non-translated logo/title (`Tiny Theme Studio`) with its own styles
- [ ] Code quality audit:
  - [ ] Eliminate **magic numbers** (hardcoded values): always use tokens `--radius-*`, `--space-*`, `--color-*`, etc.
  - [ ] Eliminate **dead code** (unused variables and functions)
  - [ ] Enforce **DRY principle** (Don't Repeat Yourself): avoid duplicating styles/logic

---

## 🌐 Responsive moderno

- [ ] Make the entire site responsive using as few media queries as possible
  - Deeply explore `clamp()`, flex, and grid for fluid, adaptive layouts
  - Document patterns and learnings in LAB_NOTES.md

---

## 🧪 Test files

- [ ] Review and fix all \*.spec.ts test files after main features are stable
- [ ] (Español) Revisar y arreglar todos los archivos \*.spec.ts cuando las funcionalidades principales estén listas

---

When all this is complete, the system will support:
✔ dynamic theme switching
✔ mood-based interaction layers
✔ semantic elevation mapping
✔ consistent foreground contrast
✔ runtime brand customization
