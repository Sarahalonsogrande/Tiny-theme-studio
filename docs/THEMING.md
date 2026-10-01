# 🎨 Tiny Theme Studio — Guía de Tema (Español)

## 🚀 Introducción rápida

- Sistema de theming basado en **tokens semánticos** (no paletas crudas)
- Permite **modos** (luminosidad) y **moods** (identidad cromática) dinámicos
- Arquitectura pensada para **escalabilidad, accesibilidad y personalización**
- Todo el estado visual es **infraestructura de app**

---

## 🧱 Filosofía y Arquitectura

- **Primitives** = ingredientes visuales atómicos (hue, saturación, lightness)
- **Semantic tokens** = API pública para componentes (`--color-primary`, `--background`, ...)
- **Modes** = modificadores de primitives según luminosidad (`data-mode`)
- **Moods** = modificadores de primitives según identidad cromática (`data-mood`)
- Cambiar `data-mode` o `data-mood` actualiza toda la UI automáticamente
- Los componentes deben consumir únicamente:
  - `--background`
  - `--surface`
  - `--color-primary`
  - `--text-main`
- ❌ Nunca valores de paleta crudos.

**Beneficios:**

- Cambia el mood sin tocar componentes
- Accesibilidad y contraste centralizados
- Mantenimiento y escalabilidad reales
- Renderizado predecible y sin flashes

---

🎯 **Objetivos de Diseño**

- ✅ Cero flash visual al cargar
- ✅ Inicialización determinista
- ✅ Reactividad en runtime
- ✅ Independencia del framework en el arranque
- ✅ Infraestructura UI reutilizable
- ✅ Compatible con progressive enhancement

🧩 **Arquitectura General**
App Angular con interfaz configurable por usuario. Incluye:

- 🌗 Modo de luminosidad (light / dark)
- 🎨 Identidad cromática (“mood”)
- 🌍 Idioma persistente
- 🧠 Accesibilidad reactiva
- 🧩 Componentes reutilizables (header, botones, etc.)

---

## 📁 Estructura del Sistema de Theme

```
theme/
│
├── fonts.scss
├── primitives.scss      (valores raw)
├── modes.scss
├── moods.scss
├── semantic.scss        ✅ API pública
├── motion.scss
├── elevation.scss
├── effects.scss
├── layers.scss
├── ui-primitives.scss
└── utilities.scss
```

Ejemplo de uso: `@use './app/theme/ui-primitives' as *;`

---

## 🗂️ Capas del Sistema de Tokens

1️⃣ **Primitives — Ingredientes**
Archivo: `primitives.scss`
Contiene valores atómicos: hue, saturación, escalas de lightness, superficies base, feedback raw.
Ejemplo: `--primary-h`, `--primary-s`, `--primary-l-3`
👉 Ingredientes puros, sin intención visual

2️⃣ **Semantic Tokens — API Pública**
Archivo: `semantic.scss`
Es la única capa que deben usar los componentes.
Ejemplo: `--color-primary`, `--background`, `--text`
Se construyen desde primitives:
`color: hsl(var(--primary-h) var(--primary-s) var(--primary-l-3));`
Incluye tipografía, spacing, radios.
👉 API pública, lo único que deben usar los componentes

3️⃣ **Modes — Iluminación Ambiental**
Archivo: `modes.scss`
Importa: LIGHT MODE `@use './app/theme/ui-primitives' as *;`
Sobrescriben primitives: `:root[data-mode='dark']`
Cambiar primitives provoca recalculo automático de tokens semánticos.
👉 Sobrescriben primitives para cambiar luminosidad

4️⃣ **Moods — Identidad Cromática**
Archivo: `moods.scss`
Definen variantes emocionales o de marca: `rabbit`, `bottle`, `cake`, `catepillar`, `cat`, etc.
Sobrescriben hue, saturation, accentos.
Nunca tokens semánticos.
👉 Sobrescriben primitives para cambiar identidad cromática

⚙️ **Principio Fundamental**

- Primitives = ingredientes
- Semantic = API pública
- Modes/Moods = modificadores de ingredientes

Cambiar `data-mode` o `data-mood` actualiza toda la UI automáticamente.

🔄 **Por qué componer colores en Runtime**

- Uso: `hsl(var(--primary-h) var(--primary-s) var(--primary-l-3))`
- Ventajas: actualización inmediata del UI, sin recompilación SASS, theming dinámico real.
- ❌ Evitar calcular colores finales en build-time.

---

## 🧠 Servicios Angular Relacionados

### UiModeService

`src/app/core/services/ui-modes/ui-mode.service.ts`

- Resolver modo inicial: localStorage → system preference → default
- Aplicar data-mode
- Persistir elección
- Exponer señales reactivas: `mode`, `isDarkMode`
- Uso: `init()`, `setMode(mode)`, `toggleMode()`

### UiMoodService

`src/app/core/services/ui-moods/ui-mood.service.ts`

- Persistir mood
- Aplicar data-mood
- Exponer señal reactiva `mood`
- Uso: `init()`, `setMood(mood)`

---

## 🧪 Ejemplos Rápidos

- Cambiar modo:
  ```js
  document.documentElement.dataset.mode = 'dark';
  // o uiModeService.toggleMode();
  ```
- Aplicar mood:
  ```js
  document.documentElement.dataset.mood = 'rabbit';
  // o uiMoodService.setMood('rabbit');
  ```

---

## 🧑‍🎨 Reglas de Diseño de Componentes

- ✅ Usar tokens semánticos
- ❌ No leer localStorage
- ❌ No manipular el DOM global
- ✅ Usar signals/services

Esto preserva separación de responsabilidades.

---

## ♿ Accesibilidad

- Soporte `aria-label`, anuncios `aria-live`
- Detección de reducción de motion
- Preferencia por HTML semántico

---

## 🧱 Elevation & Layering

- El sistema separa dominios:
  - Surface: color del plano
  - Elevation: profundidad
  - Mood: énfasis emocional
  - Mode: iluminación ambiental
- Surface → cómo se ve el plano
- Elevation → cuán separado parece
- Las sombras NO son primitives, se derivan dinámicamente desde:
  - `--surface-h`, `--surface-s`, `--surface-l`
- Proceso: reducir saturación, reducir lightness, aplicar stacking alpha
- Resultados: sombras neutras en light mode, ambientales en dark mode, adaptación automática a moods
- API Pública de Elevation:
  - `--elevation-low`, `--elevation-medium`, `--elevation-high`, `--elevation-top`, `--elevation-dreamy`
  - ❌ Nunca usar `--shadow-*`

## 🏗️ Planos UI y Estados de interacción

### Planos UI (ejemplo)

| Elemento UI | Surface         | Elevation        | Layer          |
| ----------- | --------------- | ---------------- | -------------- |
| page        | background      | none             | auto           |
| card        | surface         | elevation-low    | layer-base     |
| panel       | surface-raised  | elevation-medium | layer-base     |
| header      | surface-raised  | elevation-low    | layer-sticky   |
| sidebar     | surface-raised  | elevation-low    | layer-sticky   |
| FAB         | surface-raised  | elevation-medium | layer-sticky   |
| dropdown    | surface-raised  | elevation-medium | layer-floating |
| tooltip     | surface-overlay | elevation-high   | layer-overlay  |
| modal       | surface-overlay | elevation-high   | layer-modal    |
| toast       | mood surface    | elevation-dreamy | layer-toast    |

### Estados de interacción (Mood Elevation)

| Estado  | Elevation   |
| ------- | ----------- |
| hover   | mood-low    |
| focus   | mood-medium |
| active  | mood-high   |
| dragged | mood-top    |

---

## 🎛️ Mood Elevation

- Sombras derivadas del color primario (`--primary-h`, `--primary-s`, `--primary-l`)
- Permiten énfasis emocional, highlights interactivos, profundidad cromática
- Tokens: `--elevation-mood-low`, `--elevation-mood-medium`, `--elevation-mood-high`, `--elevation-mood-top`, `--elevation-mood-dreamy`

---

## 🏛️ Reglas arquitectónicas

- **Elevation** define profundidad
- **Surface** define color
- **Modes** redefinen primitives
- **Componentes** usan solo semantic tokens
- **Shadow stacks** = detalle interno, nunca en componentes

---

## 🎞️ Motion System

- Tokens base: `--motion-factor`, `--transition-fast`, `--transition-smooth`, `--transition-bounce`
- Por componente:
  - Hover botón: `--motion-hover`
  - Press botón: `--motion-press`
  - Focus input: `--motion-focus`
  - Modal: `--motion-overlay-enter`
  - Toast: `--motion-toast-in`
  - Tooltip: `--motion-tooltip-in`
  - Drag: `--motion-drag`, `--motion-drag-release`
- Regla: mayor elevación ⇒ mayor duración + easing más suave

---

## ✅ Buenas Prácticas

- Componentes usan solo semantic.scss
- Mantener primitives mínimas
- Crear primitives específicas si un feedback lo requiere
- Testear contraste tras cambios de mood/mode
- Añadir fallbacks estáticos cuando sea necesario

---

## 🧾 Conclusión

Este sistema trata el estado visual como infraestructura de aplicación, no como estilos de componentes. La separación entre lógica de arranque, señales runtime y tokens semánticos permite renderizado predecible, escalabilidad y reutilización entre proyectos.

---

# 🎨 Tiny Theme Studio — Theming Guide (English)

## 🚀 Quick Introduction

- Theming system based on **semantic tokens** (not raw palettes)
- Supports dynamic **modes** (luminosity) and **moods** (chromatic identity)
- Architecture designed for **scalability, accessibility, and customization**
- All visual state is **app infrastructure**, not just CSS
---

## 🧱 Philosophy & Architecture

- **Primitives** = atomic visual ingredients (hue, saturation, lightness)
- **Semantic tokens** = public API for components (`--color-primary`, `--background`, ...)
- **Modes** = primitives modifiers for luminosity (`data-mode`)
- **Moods** = primitives modifiers for chromatic identity (`data-mood`)
- Changing `data-mode` or `data-mood` updates the entire UI automatically
- Components must only consume:
  - `--background`
  - `--surface`
  - `--color-primary`
  - `--text-main`
- ❌ Never raw palette values.

**Benefits:**

- Change mood without touching components
- Centralized accessibility and contrast
- Real maintainability and scalability
- Predictable rendering, no flashes

---

🎯 **Design Goals**

- ✅ Zero visual flash on load
- ✅ Deterministic initialization
- ✅ Runtime reactivity
- ✅ Framework-independent bootstrap
- ✅ Reusable UI infrastructure
- ✅ Compatible with progressive enhancement

🧩 **General Architecture**
Angular app with user-configurable interface. Includes:

- 🌗 Luminosity mode (light / dark)
- 🎨 Chromatic identity (“mood”)
- 🌍 Persistent language
- 🧠 Reactive accessibility
- 🧩 Reusable components (header, buttons, etc.)

---

## 📁 Theme System Structure

```
theme/
│
├── fonts.scss
├── primitives.scss      (raw values)
├── modes.scss
├── moods.scss
├── semantic.scss        ✅ Public API
├── motion.scss
├── elevation.scss
├── effects.scss
├── layers.scss
├── ui-primitives.scss
└── utilities.scss
```

Usage example: `@use './app/theme/ui-primitives' as *;`

---

## 🗂️ Token System Layers

1️⃣ **Primitives — Ingredients**
File: `primitives.scss`
Contains atomic values: hue, saturation, lightness scales, base surfaces, raw feedback.
Example: `--primary-h`, `--primary-s`, `--primary-l-3`
👉 Pure ingredients, no visual intent

2️⃣ **Semantic Tokens — Public API**
File: `semantic.scss`
This is the only layer components should use.
Example: `--color-primary`, `--background`, `--text`
Built from primitives:
`color: hsl(var(--primary-h) var(--primary-s) var(--primary-l-3));`
Includes typography, spacing, radii.
👉 Public API, the only thing components should use

3️⃣ **Modes — Ambient Lighting**
File: `modes.scss`
Overrides primitives: `:root[data-mode='dark']`
Changing primitives triggers automatic recalculation of semantic tokens.
👉 Overrides primitives to change luminosity

4️⃣ **Moods — Chromatic Identity**
File: `moods.scss`
Defines emotional or brand variants: `rabbit`, `bottle`, `cake`, `catepillar`, `cat`, etc.
Overrides hue, saturation, accents.
Never semantic tokens.
👉 Overrides primitives to change chromatic identity

⚙️ **Fundamental Principle**

- Primitives = ingredients
- Semantic = public API
- Modes/Moods = ingredient modifiers

Changing `data-mode` or `data-mood` updates the entire UI automatically.

🔄 **Why Compose Colors at Runtime**

- Usage: `hsl(var(--primary-h) var(--primary-s) var(--primary-l-3))`
- Advantages: immediate UI update, no SASS recompilation, real dynamic theming.
- ❌ Avoid calculating final colors at build-time.

---

## 🧠 Related Angular Services

### UiModeService

`src/app/core/services/ui-modes/ui-mode.service.ts`

- Resolve initial mode: localStorage → system preference → default
- Apply data-mode
- Persist choice
- Expose reactive signals: `mode`, `isDarkMode`
- Usage: `init()`, `setMode(mode)`, `toggleMode()`

### UiMoodService

`src/app/core/services/ui-moods/ui-mood.service.ts`

- Persist mood
- Apply data-mood
- Expose reactive signal `mood`
- Usage: `init()`, `setMood(mood)`

---

## 🧪 Quick Examples

- Change mode:
  ```js
  document.documentElement.dataset.mode = 'dark';
  // or uiModeService.toggleMode();
  ```
- Apply mood:
  ```js
  document.documentElement.dataset.mood = 'rabbit';
  // or uiMoodService.setMood('rabbit');
  ```

---

## 🧑‍🎨 Component Design Rules

- ✅ Use semantic tokens
- ❌ Do not read localStorage
- ❌ Do not manipulate the global DOM
- ✅ Use signals/services

This preserves separation of responsibilities.

---

## ♿ Accessibility

- Support for `aria-label`, `aria-live` announcements
- Detects reduced motion
- Preference for semantic HTML

---

## 🧱 Elevation & Layering

- The system separates domains:
  - Surface: plane color
  - Elevation: depth
  - Mood: emotional emphasis
  - Mode: ambient lighting
- Surface → how the plane looks
- Elevation → how separated it appears
- Shadows are NOT primitives, they are derived dynamically from:
  - `--surface-h`, `--surface-s`, `--surface-l`
- Process: reduce saturation, reduce lightness, apply stacking alpha
- Results: neutral shadows in light mode, ambient in dark mode, automatic adaptation to moods
- Public Elevation API:
  - `--elevation-low`, `--elevation-medium`, `--elevation-high`, `--elevation-top`, `--elevation-dreamy`
  - ❌ Never use `--shadow-*`

## 🏗️ UI Planes & Interaction States

### UI Planes (example)

| UI Element | Surface         | Elevation        | Layer          |
| ---------- | --------------- | ---------------- | -------------- |
| page       | background      | none             | auto           |
| card       | surface         | elevation-low    | layer-base     |
| panel      | surface-raised  | elevation-medium | layer-base     |
| header     | surface-raised  | elevation-low    | layer-sticky   |
| sidebar    | surface-raised  | elevation-low    | layer-sticky   |
| FAB        | surface-raised  | elevation-medium | layer-sticky   |
| dropdown   | surface-raised  | elevation-medium | layer-floating |
| tooltip    | surface-overlay | elevation-high   | layer-overlay  |
| modal      | surface-overlay | elevation-high   | layer-modal    |
| toast      | mood surface    | elevation-dreamy | layer-toast    |

### Interaction States (Mood Elevation)

| State   | Elevation   |
| ------- | ----------- |
| hover   | mood-low    |
| focus   | mood-medium |
| active  | mood-high   |
| dragged | mood-top    |

---

## 🎛️ Mood Elevation

- Shadows derived from the primary color (`--primary-h`, `--primary-s`, `--primary-l`)
- Allow emotional emphasis, interactive highlights, chromatic depth
- Tokens: `--elevation-mood-low`, `--elevation-mood-medium`, `--elevation-mood-high`, `--elevation-mood-top`, `--elevation-mood-dreamy`

---

## 🏛️ Architectural Rules

- **Elevation** defines depth
- **Surface** defines color
- **Modes** redefine primitives
- **Components** use only semantic tokens
- **Shadow stacks** = internal detail, never in components

---

## 🎞️ Motion System

- Base tokens: `--motion-factor`, `--transition-fast`, `--transition-smooth`, `--transition-bounce`
- Per component:
  - Button hover: `--motion-hover`
  - Button press: `--motion-press`
  - Input focus: `--motion-focus`
  - Modal: `--motion-overlay-enter`
  - Toast: `--motion-toast-in`
  - Tooltip: `--motion-tooltip-in`
  - Drag: `--motion-drag`, `--motion-drag-release`
- Rule: higher elevation ⇒ longer duration + smoother easing

---

## ✅ Best Practices

- Components use only semantic.scss
- Keep primitives minimal
- Create specific primitives if a feedback requires it
- Test contrast after mood/mode changes
- Add static fallbacks when necessary

---

## 🧾 Conclusion

This system treats visual state as application infrastructure, not just component styles. The separation between bootstrap logic, runtime signals, and semantic tokens enables predictable rendering, scalability, and reuse across projects.
