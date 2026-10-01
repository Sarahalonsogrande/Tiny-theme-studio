# 🚦 Bootstrap & Validación — Guía Visual (Español)

## 🗂️ app.config.ts — Centralización de providers y orden de inicialización

`app.config.ts` es el único lugar donde deben registrarse los providers globales y los inicializadores de la app. Mantener `main.ts` mínimo garantiza claridad y orden en el arranque.

### Ejemplo de estructura recomendada

```ts
// src/app/app.config.ts
import { ApplicationConfig, provideHttpClient, provideRouter } from '@angular/platform-browser';
import { provideAppInitializer } from '@angular/core';
import { isPlatformBrowser, PLATFORM_ID, inject } from '@angular/common';
import { initAppServices } from './core/init/init-app-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // ...otros providers globales
    provideAppInitializer(() => {
      const platform = inject(PLATFORM_ID);
      if (isPlatformBrowser(platform)) {
        initAppServices(); // Llama a init() de servicios globales
      }
    }),
  ],
};
```

**Notas:**

- Todos los providers globales (router, http, i18n, listeners) deben ir aquí.
- Los inicializadores deben ser defensivos y sólo ejecutar lógica de navegador si es seguro (`isPlatformBrowser`).

---

## 🧭 Propósito

Esta guía explica el flujo de arranque visual, inicialización runtime y validación del sistema UI:

- Cómo se aplican `mode`, `mood` e idioma antes y después de Angular
- Cómo evitar FOUC (Flash Of Unstyled Content)
- Cómo validar manualmente el sistema
- Arquitectura basada en signals, tokens y bootstrap moderno

---

## 🎯 Objetivos del Sistema

- 🌗 Cambio dinámico light/dark
- 🎨 Variaciones cromáticas (moods)
- 🌍 Renderizado dependiente del idioma
- ⚡ Primer render sin flashes visuales
- 🔁 Actualización reactiva mediante signals
- ♿ Accesibilidad consistente
- ♻️ Reutilización entre aplicaciones

---

## 🏗️ Arquitectura General

### Flujo de inicialización

```mermaid
graph TD;
   A[index.html (pre-bootstrap)] --> B[Atributos DOM aplicados];
   B --> C[bootstrapApplication (Angular)];
   C --> D[Servicios globales inicializados];
   D --> E[Signals propagan estado];
   E --> F[Componentes consumen tokens];
   F --> G[UI renderizada correctamente];
```

El DOM es el puente entre navegador y runtime Angular.

---

## 🧩 Conceptos Fundamentales

### Mode (Luminosidad)

- Controla el esquema de iluminación: `light` / `dark`
- Aplicado como: `<html data-mode="dark">`
- Reflejado también como clase CSS

### Mood (Identidad Cromática)

- Personalidad visual independiente de la luminosidad
- Ejemplos: `rabbit`, `bottle`, `cake`, `catepillar`, `cat`
- Aplicado como: `<html data-mood="cat">`
- Afecta solo tokens semánticos

### Language (Idioma)

- Define idioma y accesibilidad: `<html lang="es">`
- Inicializado desde: `localStorage`, `navigator.language`, fallback

---

## 🗂️ Capas del Bootstrap

### 🔵 Capa 1 — Pre-Bootstrap (index.html)

**Responsabilidades:**

- Leer preferencias persistidas
- Detectar preferencias del sistema
- Validar valores permitidos
- Aplicar atributos DOM inmediatamente
- Evitar FOUC

**Flujo:**
`localStorage → validación → DOM attributes`

**Ejemplo resultado:**

```html
<html data-mode="dark" data-mood="cat" lang="es"></html>
```

**Script:**

```js
(function () {
  var allowedModes = ['light', 'dark'];
  var allowedMoods = ['rabbit', 'bottle', 'cake', 'catepillar', 'cat', 'queen', 'lobster'];
  // ...existing code...
})();
```

**Objetivo clave:**

- Garantizar estado visual correcto antes del primer paint

---

### 🟣 Capa 2 — Runtime Services (Angular)

Cuando Angular arranca (`bootstrapApplication()`), los servicios convierten el estado DOM en signals reactivos.

**Responsabilidades:**

- Sincronizar signals con DOM
- Persistir cambios
- Exponer APIs reactivas
- Mantener coherencia global

**Modelo:**
Signal State → DOM Sync → localStorage

**Bootstrap moderno (main.ts):**

```ts
bootstrapApplication(App, {
  providers: [
    // ...existing code...
  ],
});
```

**Servicios Globales:**
| Servicio | Gestiona | Signals principales |
|------------------|--------------------|-------------------------|
| UiModeService | modo light/dark | mode(), isDarkMode() |
| UiMoodService | identidad cromática| mood(), isDefaultMood() |
| LanguageService | idioma activo | lang() |

**Ventajas de signals:**

- UI reactiva desde el primer render
- Componentes sin suscripciones manuales
- Sincronización automática del estado

---

### 🟢 Capa 3 — Componentes UI

**Ejemplos:** Header, Toggles, Botones

**Responsabilidades:**

- ✅ Consumir signals
- ✅ Disparar cambios
- ❌ Nunca leer localStorage
- ❌ Nunca modificar documentElement
- ❌ Nunca decidir reglas globales

**Ejemplo Standalone:**

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

**Beneficios:**

- Sin NgModules
- Render inmediato
- Arquitectura escalable

---

## 🔄 Prioridad de Resolución del Estado

Al iniciar:

1. Atributos DOM (verdad bootstrap)
2. localStorage
3. Preferencia del sistema
4. Fallback por defecto

Garantiza continuidad entre boot y runtime.

---

## ✅ Validación Rápida del Flujo de Arranque

1️⃣ **Verificar Pre-Bootstrap**

- Abrir DevTools → Elements
- Recargar página
- Inspeccionar `<html>` antes de Angular
- Debe contener: `data-mode`, `data-mood`, `lang`
- Si aparecen en el primer paint → FOUC evitado

2️⃣ **Validar Inicialización Runtime**

- En consola:
  ```js
  localStorage.setItem('ui-mode', 'dark');
  localStorage.setItem('ui-mood', 'cat');
  location.reload();
  ```
- Tras recarga: `<html data-mode="dark" data-mood="cat">`

3️⃣ **Toggle en Runtime**

- Cambiar dataset en consola y ver UI actualizarse

4️⃣ **Probar Servicios Angular (Opcional)**

- Usar `window.ng?.getInjector?.(document.querySelector('app-root'))`

5️⃣ **Validaciones de Accesibilidad**

- Ejecutar Lighthouse
- Verificar contraste

6️⃣ **Problemas Comunes**

- FOUC: revisar script pre-bootstrap y acceso a localStorage
- Tokens no actualizados: verificar uso de tokens y sobrescritura

7️⃣ **Reportar Fallos**

- Incluir navegador, pasos, capturas, localStorage y HTML

---

## ⭐ Capacidades Arquitectónicas Alcanzadas

- ✅ Servicios seguros para SSR
- ✅ Persistencia resiliente
- ✅ Estado basado en signals
- ✅ Theming tokenizado
- ✅ Sincronización pre-hydration
- ✅ Separación estricta de responsabilidades

---

## 💡 Buenas Prácticas

- Signals como única fuente de verdad
- Inicializar servicios solo en bootstrap
- DOM solo para sincronización visual
- Separar pre-bootstrap de Angular
- Mantener fallbacks seguros

---

## 🧾 Resumen Conceptual

Pre-bootstrap → prepara estado visual
Runtime services → crean estado reactivo
Componentes → consumen estado

**Resultado Final:**

- UI se renderiza ya con modo correcto, mood aplicada, idioma cargado, sin flashes ni inconsistencias

---

# 🚦 Bootstrap & Validation — Visual Guide (English)

## 🗂️ app.config.ts — Providers Centralization & Initialization Order

`app.config.ts` is the single place to register global providers and app initializers. Keeping `main.ts` minimal ensures clarity and deterministic bootstrap order.

### Recommended structure example

```ts
// src/app/app.config.ts
import { ApplicationConfig, provideHttpClient, provideRouter } from '@angular/platform-browser';
import { provideAppInitializer } from '@angular/core';
import { isPlatformBrowser, PLATFORM_ID, inject } from '@angular/common';
import { initAppServices } from './core/init/init-app-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // ...otros providers globales
    provideAppInitializer(() => {
      const platform = inject(PLATFORM_ID);
      if (isPlatformBrowser(platform)) {
        initAppServices(); // Llama a init() de servicios globales
      }
    }),
  ],
};
```

**Notes:**

- All global providers (router, http, i18n, listeners) should go here.
- Initializers must be defensive and only run browser logic if safe (`isPlatformBrowser`).


---

# 🚦 Bootstrap & Validation — Visual Guide (English)

## 🧭 Purpose

This guide explains the visual bootstrap flow, runtime initialization, and UI system validation:

- How `mode`, `mood`, and language are applied before and after Angular
- How to avoid FOUC (Flash Of Unstyled Content)
- How to manually validate the system
- Architecture based on signals, tokens, and modern bootstrap

---

## 🎯 System Goals

- 🌗 Dynamic light/dark switching
- 🎨 Chromatic variations (moods)
- 🌍 Language-dependent rendering
- ⚡ First render without visual flashes
- 🔁 Reactive updates via signals
- ♿ Consistent accessibility
- ♻️ Reusability across applications

---

## 🏗️ General Architecture

### Initialization Flow

```mermaid
graph TD;
   A[index.html (pre-bootstrap)] --> B[DOM attributes applied];
   B --> C[bootstrapApplication (Angular)];
   C --> D[Global services initialized];
   D --> E[Signals propagate state];
   E --> F[Components consume tokens];
   F --> G[UI rendered correctly];
```

The DOM acts as the bridge between the browser and Angular runtime.

---

## 🧩 Key Concepts

### Mode (Luminosity)

- Controls the lighting scheme: `light` / `dark`
- Applied as: `<html data-mode="dark">`
- Also reflected as a CSS class

### Mood (Chromatic Identity)

- Defines visual personality independent of luminosity
- Examples: `rabbit`, `bottle`, `cake`, `catepillar`, `cat`
- Applied as: `<html data-mood="cat">`
- Only affects semantic tokens (not layout)

### Language

- Defines language and accessibility: `<html lang="es">`
- Initialized from: `localStorage`, `navigator.language`, fallback

---

## 🗂️ Bootstrap Layers

### 🔵 Layer 1 — Pre-Bootstrap (index.html)

**Responsibilities:**

- Read persisted preferences
- Detect system preferences
- Validate allowed values
- Apply DOM attributes immediately
- Avoid FOUC

**Flow:**
`localStorage → validation → DOM attributes`

**Example result:**

```html
<html data-mode="dark" data-mood="cat" lang="es"></html>
```

**Script:**

```js
(function () {
  var allowedModes = ['light', 'dark'];
  var allowedMoods = ['rabbit', 'bottle', 'cake', 'catepillar', 'cat', 'queen', 'lobster'];
  // ...existing code...
})();
```

**Key objective:**

- Ensure correct visual state before first paint

---

### 🟣 Layer 2 — Runtime Services (Angular)

When Angular starts (`bootstrapApplication()`), services convert DOM state into reactive signals.

**Responsibilities:**

- Sync signals with DOM
- Persist changes
- Expose reactive APIs
- Maintain global coherence

**Model:**
Signal State → DOM Sync → localStorage

**Modern bootstrap (main.ts):**

```ts
bootstrapApplication(App, {
  providers: [
    // ...existing code...
  ],
});
```

**Global Services:**
| Service | Manages | Main signals |
|-----------------|--------------------|------------------------|
| UiModeService | light/dark mode | mode(), isDarkMode() |
| UiMoodService | chromatic identity | mood(), isDefaultMood()|
| LanguageService | active language | lang() |

**Signals advantages:**

- Reactive UI from first render
- Components without manual subscriptions
- Automatic state sync

---

### 🟢 Layer 3 — UI Components

**Examples:** Header, Toggles, Buttons

**Responsibilities:**

- ✅ Consume signals
- ✅ Trigger changes
- ❌ Never read localStorage
- ❌ Never modify documentElement
- ❌ Never decide global rules

**Standalone Example:**

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

**Benefits:**

- No NgModules
- Immediate render
- Scalable architecture

---

## 🔄 State Resolution Priority

On startup:

1. DOM attributes (bootstrap truth)
2. localStorage
3. System preference
4. Default fallback

Ensures continuity between boot and runtime.

---

## ✅ Quick Bootstrap Flow Validation

1️⃣ **Check Pre-Bootstrap**

- Open DevTools → Elements
- Reload page
- Inspect `<html>` before Angular
- Should contain: `data-mode`, `data-mood`, `lang`
- If present on first paint → FOUC avoided

2️⃣ **Validate Runtime Initialization**

- In console:
  ```js
  localStorage.setItem('ui-mode', 'dark');
  localStorage.setItem('ui-mood', 'cat');
  location.reload();
  ```
- After reload: `<html data-mode="dark" data-mood="cat">`

3️⃣ **Toggle at Runtime**

- Change dataset in console and see UI update

4️⃣ **Test Angular Services (Optional)**

- Use `window.ng?.getInjector?.(document.querySelector('app-root'))`

5️⃣ **Accessibility Validations**

- Run Lighthouse
- Check contrast

6️⃣ **Common Issues**

- FOUC: check pre-bootstrap script and localStorage access
- Tokens not updated: check token usage and overrides

7️⃣ **Report Issues**

- Include browser, steps, screenshots, localStorage, and HTML

---

## ⭐ Achieved Architectural Capabilities

- ✅ SSR-safe services
- ✅ Resilient persistence
- ✅ Signal-based state
- ✅ Tokenized theming
- ✅ Pre-hydration sync
- ✅ Strict separation of responsibilities

---

## 💡 Best Practices

- Signals as the only source of truth
- Initialize services only at bootstrap
- DOM only for visual sync
- Separate pre-bootstrap from Angular
- Keep safe fallbacks

---

## 🧾 Conceptual Summary

Pre-bootstrap → prepares visual state
Runtime services → create reactive state
Components → consume state

**Final Result:**

- UI renders with correct mode, mood applied, language loaded, no flashes or inconsistencies
