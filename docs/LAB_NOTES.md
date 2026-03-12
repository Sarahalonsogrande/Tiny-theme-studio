# 🧪 Cuaderno de Laboratorio (Español)

Registro personal de experimentos, decisiones y descubrimientos mientras aprendo, rompo y reconstruyo interfaces.

---

## ⚗️ ¿Qué es este archivo?

Este no es un changelog ni documentación formal. Es un registro vivo de:

- Ideas que funcionaron
- Ideas que fallaron
- Preguntas abiertas
- Decisiones de arquitectura
- Epifanías sobre CSS, UI y sistemas de diseño

Si algo aquí parece incompleto, probablemente lo esté. El laboratorio sigue activo.

---

## 🚦 Estado actual

Estado del laboratorio: **ACTIVO**

La exploración continúa.

---

## 🧭 Principios del laboratorio

- Aprender haciendo > aprender leyendo
- Experimentar antes de optimizar
- Entender sistemas, no copiar soluciones
- Documentar el proceso, no solo el resultado

---

## 🧑‍🔬 Reglas del laboratorio

- Los signals son la única fuente de verdad
- El estado global se inicializa en bootstrap, no en componentes
- Acceso al DOM solo para sincronización
- Pre-bootstrap y runtime permanecen separados
- Los experimentos pueden fallar

---

## 🔬 Experimentos

**Plantilla:**

**YYYY-MM-DD — Nombre del experimento**

- **Pregunta:** ¿Qué intento entender o resolver?
- **Hipótesis:** Qué creo que pasará y por qué.
- **Implementación:** Técnica usada, herramientas, tokens/conceptos probados.
- **Resultado:** Qué ocurrió realmente.
- **Conclusión:** Qué aprendí.
- **Próximo paso:** Qué explorar después.

**2026-03-09 — Jerarquía de capas (z-index) en Welcome + Music Widget**

- **Pregunta:** ¿Por qué no se ven los efectos de `music-widget` y cómo controlar que títulos, `stuck-top` y widgets respeten un orden visual estable?
- **Hipótesis:** El problema no era "falta de z-index", sino mezcla de contextos de apilado (`stacking contexts`) sin una escala explícita por componente.
- **Implementación:**
  - Se definió jerarquía interna en `music-widget`: `iframe` base y pseudoelementos por encima para glow/sweep.
  - Se asignó orden en `welcome`: `h1` por encima de `stuck-top`, y `app-music-widget` por debajo de `stuck-top`.
  - Se usaron tokens de capa (`--layer-*`) para evitar números mágicos.
- **Resultado:**
  - Los efectos de gradiente del widget volvieron a ser visibles.
  - Los títulos se muestran por encima del header sticky.
  - Los widgets quedan visualmente por debajo del sticky header.
- **Conclusión:**
  - `z-index` solo es confiable si el elemento está posicionado y el contexto de apilado está claro.
  - Subir `z-index` de hijos no sirve si el contexto padre compite en otra capa.
  - Con iframes y pseudoelementos, hay que declarar un orden interno explícito.
- **Actualización 2026-03-10:**
  - Apareció un scroll horizontal en `welcome` por el `transform: scale(225%)` del `h1` animado.
  - Se probó `clip-path: inset(0)` en `header` para recortar el desbordamiento, pero eso creó un nuevo `stacking context`.
  - Al crear ese nuevo contexto, el `h1` dejó de competir en la misma jerarquía que `.stuck-top`, y visualmente pasó por debajo del sticky header aunque tuviera un `z-index` alto.
  - La solución correcta fue quitar `clip-path` del `header` y mover el recorte horizontal al contenedor `main` con `overflow-x: clip`.
  - Esa diferencia es importante: no todos los mecanismos de recorte son "visualmente neutros". Algunos también alteran la jerarquía de capas.
- **Próximo paso:** Documentar una escala de capas por feature (`base`, `raised`, `floating`, `overlay`) para prevenir regresiones visuales.

**2026-03-12 — Lazy-loading de 13 iframes Spotify con Intersection Observer**

- **Pregunta:** 13 iframes de Spotify se cargan todos al inicio. ¿Está esto siendo demasiado agresivo? ¿Cómo optimizar sin sacrificar la experiencia?
- **Hipótesis:** Si solo cargamos iframes cuando entran en el viewport, reducimos el payload inicial en un 80%+ e igual el usuario ve música en contexto mientras explora.
- **Implementación:**
  - Se agregó `Intersection Observer` al `MusicWidgetComponent`.
  - Signal `isInViewport = signal(false)` controla si mostrar iframe o placeholder.
  - Placeholder: un `div` con gradiente suave, emoji 🎵 animado, nombre de canción y álbum.
  - Observer se dispara 100px antes de que el widget entre en pantalla para que cargue suavemente.
  - Una vez cargado, se detiene la observación (`unobserve`) para no regatillar.
  - El `ngOnDestroy` desconecta el observer si el componente se destruye.
- **Resultado:**
  - Al cargar: solo 1-2 iframes visibles en el viewport inicial.
  - Al hacer scroll: los iframes se cargan bajo demanda mientras scrolleas.
  - Network tab (DevTools): requests a Spotify solo cuando el widget entra en viewport.
  - Visual: transición suave de placeholder 🎵 → iframe (el usuario no nota lag).
- **Conclusión:**
  - Intersection Observer es perfecto para este patrón de "lazy load en contexto".
  - Placeholders visuales mantienen la estructura del layout (no hay shift/reflow).
  - 13 iframes cargándose a la vez es overkill; bajo demanda es mucho más limpio.
- **Performance ganado:**
  - Peso inicial: ~500KB menos (13 iframes ≈ ~40KB c/u, antes todo al inicio).
  - Time to interactive: más rápido porque no hay 13 requests bloqueantes simultáneamente.
  - Mobile: experiencia mucho mejor (menos datos, menos CPU).
- **Próximo paso:** Considerar SSR compatibility si en el futuro se migra a una arquitectura híbrida. Intersection Observer está soportado por todos los navegadores modernos, pero SSR necesitaría renderizar placeholders en server.

---

## ❌ Experimentos fallidos

_(Importante: mantenerlos)_

**Plantilla:**

**Failed — Nombre del intento**

- **Qué intenté:** Descripción breve.
- **Por qué parecía buena idea:** Lógica inicial.
- **Qué salió mal:** Problema real encontrado.
- **Aprendizaje:** Qué NO volvería a hacer.

**Failed — Recortar overflow con `clip-path` en `header`**

- **Qué intenté:** Usar `clip-path: inset(0)` en el `header` de `welcome` para ocultar el desbordamiento horizontal del `h1` escalado.
- **Por qué parecía buena idea:** Quería evitar `overflow: hidden`, que cortaba la sensación del efecto, y `clip-path` parecía una forma más fina de recortar sin tocar la animación.
- **Qué salió mal:** `clip-path` no solo recortó; también creó un nuevo contexto de apilado. Eso cambió la relación entre el `h1` sticky y `.stuck-top`, y el título terminó viéndose por debajo del sticky header.
- **Aprendizaje:** Si el problema es de desbordamiento, primero hay que revisar si la técnica elegida también cambia el stacking context. En layouts con sticky, transforms e iframes, eso puede romper la jerarquía visual aunque el `z-index` siga "pareciendo" correcto.

**Regla rápida**

- Si hay `position: sticky`, `transform` e `iframe` en la misma escena, no toques primero el `z-index`.
- Primero revisa qué elemento está creando un nuevo `stacking context` (`transform`, `clip-path`, `filter`, `opacity`, etc.).
- Si cambias el recorte o la composición visual, vuelve a comprobar la jerarquía completa, no solo el elemento que falla.

---

## 🧱 Decisiones de arquitectura

**Plantilla:**

**Decision — Nombre corto**

- **Contexto:** Qué problema existía.
- **Opciones consideradas:**
  - Opción A
  - Opción B
- **Decisión:** Qué elegí.
- **Motivo:** Por qué esta solución es mejor a largo plazo.
- **Consecuencias:** Ventajas y tradeoffs aceptados.

---

## 💡 Insights

Pequeñas ideas que cambiaron mi forma de entender UI o CSS:

- UI no son colores → son relaciones entre superficies.
- Las sombras comunican altura, no decoración.
- Los tokens semánticos reducen decisiones futuras.

---

## 👁 Observaciones

Cosas que empiezo a notar en productos reales:

- Muchas interfaces modernas reducen sombras y usan contraste de surface.
- Dark mode funciona mejor cuando cambia la jerarquía, no solo los colores.
- Motion rápido parece más ligero aunque haga más cosas.
- Decisión temporal de estilo: algunos textos se muestran sin acentos para mantener consistencia visual con una tipografía display limitada.
- Pendiente: validar una solución tipográfica que permita recuperar acentos y diacríticos sin romper la estética del wordmark.

---

## 🐇 Rabbit Holes

Temas que quiero investigar próximamente:

- Container queries mental model
- Motion tokens ligados a densidad visual
- Fluid typography sin breakpoints
- Relación entre spacing y percepción de velocidad
- Estrategias de fallback y cobertura de glifos (latin-ext) para evitar mezclar fuentes en caracteres acentuados

---

## 🏗️ Arquitectura y Aprendizajes

Mientras aprendía Angular, arquitectura CSS y sistemas de UI, el proyecto evolucionó hacia una exploración de:

- Cómo inicializan las interfaces
- Cómo los sistemas visuales se mantienen consistentes
- Cómo las decisiones de diseño se convierten en arquitectura

Este archivo documenta lo aprendido, no solo lo construido.

### Origen

Lo que comenzó como aprendizaje estructurado se transformó en otra cosa. Seguir la curiosidad me llevó más profundo en diseño de UI, sistemas de theming y arquitectura CSS — un pequeño momento “Alicia en el País de las Maravillas” donde la experimentación reemplazó los tutoriales.

CSS dejó de ser decoración y se volvió sistema.

Este repositorio refleja esa transición: aprendizaje → experimentación → entendimiento.

### Idea central

La aplicación implementa un sistema UI en tiempo de ejecución diseñado para:

- Prevenir flashes visuales durante la carga (FOUC)
- Soportar modos claro/oscuro
- Permitir “moods” de color
- Inicializar idioma antes de renderizar
- Mantener la UI reactiva mediante signals de Angular

El objetivo es la consistencia entre:

Browser state → DOM → Angular runtime → UI

### Resumen de arquitectura

La inicialización ocurre en tres capas:

**1️⃣ Pre-bootstrap (index.html)**

- Corre antes de que cargue Angular
- Lee preferencias guardadas en localStorage
- Detecta esquema de color del sistema
- Aplica atributos directamente a <html>
  - data-mode="light|dark"
  - data-mood="valor"
  - lang="xx"
- Previene estado visual incorrecto en el primer paint

**2️⃣ Servicios en runtime (Angular)**

- Inicializados con bootstrapApplication y provideAppInitializer
- Servicios globales:
  - UiModeService → modo claro/oscuro
  - UiMoodService → personalidad de color
  - LanguageService → traducciones
- Convierte estado del DOM en signals reactivos
- Persiste preferencias del usuario
- Sincroniza DOM y estado de la app
- Los signals son la única fuente de verdad

**3️⃣ Componentes UI**

- Consumen signals, nunca acceden a localStorage ni manipulan <html>
- Solo reaccionan a estado
- Resultado: la UI ya está sincronizada desde el primer frame

---

## 🎨 Modelo de theming

**Mode:** Controla luminancia (light | dark), aplicado como data-mode="dark"

**Mood:** Controla personalidad de color, independiente de la luminancia (ej: birthday, leafy, flowery, tiger, ocean). Afecta tokens semánticos, no layout.

**Language:** Inicializado desde preferencia guardada, idioma del navegador o fallback. Aplicado como <html lang="en">.

**Prioridad de estado:**

1. Atributos del DOM (bootstrap truth)
2. localStorage
3. Preferencia del sistema
4. Fallback por defecto

Esto garantiza continuidad entre boot y runtime.

---

## ✅ Validación rápida (Quick Checks)

Pasos manuales:

- Inspeccionar <html> antes de que cargue Angular
- Confirmar data-mode, data-mood y lang
- Cambiar valores por consola y verificar actualización de la UI
- Recargar tras cambiar localStorage para confirmar persistencia
- Ejecutar Lighthouse para validar contraste

**Problemas comunes:**

- FOUC → pre-bootstrap ausente o lento
- Tokens no actualizan → semánticos mal derivados

---

## 📚 Principios clave aprendidos

> 🔍 **Observación:** La consistencia UI depende más del orden de inicialización que del styling.
>
> 💡 **Insight:** Los tokens CSS funcionan mejor cuando los componentes nunca acceden a los primitivos directamente.
>
> ⚠️ **Hipótesis fallida:** Demasiadas variaciones de elevación aumentan el ruido visual.

---

## 🧪 Qué representa este repositorio

No es un producto terminado, sino un proceso documentado de aprendizaje.

Un pequeño laboratorio personal explorando:

- Arquitectura standalone Angular
- Estado dirigido por signals
- Design tokens
- Theming en runtime
- Estrategias de inicialización UI

Algunos archivos existen solo para capturar entendimiento, no resultados.

---

## 📓 Glosario rápido

**Surface:** Plano interactivo dentro del contexto visual

**Elevation:** Percepción de distancia entre capas, no una sombra concreta

**Semantic token:** Variable que expresa intención, no valor

---

## 📌 Notas sueltas

Ideas rápidas que aún no merecen sección propia:

- Quizá separar motion physics de motion timing
- Explorar shadows derivadas del background
- Probar UI sin borders
- **Explorar responsive avanzado con el mínimo de media queries, usando clamp, flex, y grid para layouts realmente fluidos y adaptativos**

---

_Última actualización: YYYY-MM-DD_

---

# 🧪 Lab Notes (English)

Personal lab notebook. Record of experiments, decisions, and discoveries while learning, breaking, and rebuilding interfaces.

---

## ⚗️ What is this file?

This is not a changelog or formal documentation. It’s a living record of:

- Ideas that worked
- Ideas that failed
- Open questions
- Architecture decisions
- Epiphanies about CSS, UI, and design systems

If something here seems incomplete, it probably is. The lab is still active.

---

## 🚦 Current Status

Lab state: **ACTIVE**

Exploration continues.

---

## 🧭 Lab Principles

- Learning by doing > learning by reading
- Experiment before optimizing
- Understand systems, don’t copy solutions
- Document the process, not just the result

---

## 🧑‍🔬 Lab Rules

- Signals are the single source of truth
- Global state initializes at bootstrap, not in components
- DOM access only for synchronization
- Pre-bootstrap and runtime remain separated
- Experiments are allowed to fail

---

## 🔬 Experiments

**Template:**

**YYYY-MM-DD — Experiment name**

- **Question:** What am I trying to understand or solve?
- **Hypothesis:** What I think will happen and why.
- **Implementation:** Technique used, tools, tokens/concepts tested.
- **Result:** What actually happened.
- **Conclusion:** What I learned.
- **Next step:** What to explore next.

**2026-03-09 — Layer Hierarchy (z-index) in Welcome + Music Widget**

- **Question:** Why were `music-widget` effects not visible, and how can titles, `stuck-top`, and widgets keep a stable visual order?
- **Hypothesis:** The issue was not simply "missing z-index" but mixed stacking contexts without an explicit layer scale per component.
- **Implementation:**
  - Defined internal layering in `music-widget`: `iframe` as base, pseudo-elements above for glow/sweep.
  - Set ordering in `welcome`: `h1` above `stuck-top`, and `app-music-widget` below `stuck-top`.
  - Used layer tokens (`--layer-*`) instead of magic numbers.
- **Result:**
  - Gradient effects became visible again in the widget.
  - Titles render above the sticky header.
  - Widgets render below the sticky header.
- **Conclusion:**
  - `z-index` is reliable only with positioned elements and clear stacking context boundaries.
  - Increasing child `z-index` does not help if parent contexts compete on different layers.
  - With iframes and pseudo-elements, explicit internal ordering is required.
- **Update 2026-03-10:**
  - A horizontal scroll appeared in `welcome` because the animated `h1` uses `transform: scale(225%)`.
  - `clip-path: inset(0)` was tested on `header` to clip the overflow, but that created a new `stacking context`.
  - Once that new context existed, `h1` no longer competed in the same layer hierarchy as `.stuck-top`, so the title rendered below the sticky header even with a higher `z-index`.
  - The correct fix was to remove `clip-path` from `header` and move horizontal clipping to `main` using `overflow-x: clip`.
  - This matters: not every clipping technique is visually neutral. Some also change layer hierarchy.
- **Next step:** Document a feature-level layer scale (`base`, `raised`, `floating`, `overlay`) to prevent visual regressions.

---

## ❌ Failed Experiments

_(Important: keep them)_

**Template:**

**Failed — Attempt name**

- **What I tried:** Brief description.
- **Why it seemed like a good idea:** Initial logic.
- **What went wrong:** Real problem found.
- **Learning:** What I would NOT do again.

**Failed — Clipping overflow with `clip-path` on `header`**

- **What I tried:** Using `clip-path: inset(0)` on the `welcome` header to hide the horizontal overflow caused by the scaled `h1`.
- **Why it seemed like a good idea:** I wanted to avoid `overflow: hidden`, which weakened the visual effect, and `clip-path` looked like a more precise way to crop without touching the animation.
- **What went wrong:** `clip-path` did not only crop. It also created a new stacking context. That changed the relationship between the sticky `h1` and `.stuck-top`, and the title ended up rendering below the sticky header.
- **Learning:** When the problem is overflow, first verify whether the chosen technique also changes stacking context. In layouts with sticky elements, transforms, and iframes, that can silently break visual hierarchy even if `z-index` still looks correct.

**Quick rule**

- If `position: sticky`, `transform`, and `iframe` coexist in the same scene, do not start by changing `z-index`.
- First check which element is creating a new `stacking context` (`transform`, `clip-path`, `filter`, `opacity`, and similar properties).
- If you change clipping or visual composition, re-check the full layer hierarchy, not only the element that looks broken.

---

## 🧱 Architecture Decisions

**Template:**

**Decision — Short name**

- **Context:** What problem existed.
- **Options considered:**
  - Option A
  - Option B
- **Decision:** What I chose.
- **Reason:** Why this solution is better long-term.
- **Consequences:** Advantages and accepted tradeoffs.

---

## 💡 Insights

Small ideas that changed how I understand UI or CSS:

- UI is not colors → it’s relationships between surfaces.
- Shadows communicate height, not decoration.
- Semantic tokens reduce future decisions.

---

## 👁 Observations

Things I’m starting to notice in real products:

- Many modern interfaces reduce shadows and use surface contrast.
- Dark mode works better when hierarchy changes, not just colors.
- Fast motion feels lighter even if it does more.
- Temporary styling decision: some texts are shown without accents to keep visual consistency with a limited display typeface.
- Pending work: validate a typography strategy that restores accents and diacritics without breaking the wordmark aesthetic.

---

## 🐇 Rabbit Holes

Topics I want to investigate soon:

- Container queries mental model
- Motion tokens tied to visual density
- Fluid typography without breakpoints
- Relationship between spacing and perceived speed
- Fallback and glyph-coverage strategies (latin-ext) to avoid mixed fonts on accented characters

---

## 🏗️ Architecture & Learnings

While learning Angular, CSS architecture, and UI systems, the project evolved into an exploration of:

- How interfaces initialize
- How visual systems stay consistent
- How design decisions become architecture

This file documents what was learned, not just what was built.

### Origin

What began as structured learning became something else. Following curiosity led deeper into UI design, theming systems, and CSS architecture—a small “Alice in Wonderland” moment where experimentation replaced tutorials.

CSS stopped being decoration and became a system.

This repository reflects that transition: learning → experimentation → understanding.

### Core Idea

The application implements a runtime UI system designed to:

- Prevent visual flashes during load (FOUC)
- Support light/dark modes
- Allow color “moods”
- Initialize language before render
- Keep UI reactive through Angular signals

The goal is consistency between:

browser state → DOM → Angular runtime → UI

### Architecture Overview

Initialization happens in three layers:

**1️⃣ Pre-bootstrap (index.html)**

- Runs before Angular loads
- Reads saved preferences from localStorage
- Detects system color scheme
- Applies attributes directly to <html>
  - data-mode="light|dark"
  - data-mood="value"
  - lang="xx"
- Prevents incorrect visual state on first paint

**2️⃣ Runtime Services (Angular)**

- Initialized with bootstrapApplication and provideAppInitializer
- Global services:
  - UiModeService → light/dark mode
  - UiMoodService → color personality
  - LanguageService → translations
- Converts DOM state into reactive signals
- Persists user preferences
- Synchronizes DOM and app state
- Signals are the single source of truth

**3️⃣ UI Components**

- Consume signals, never access localStorage or manipulate <html>
- Only react to state
- Result: UI is already synchronized from the first frame

---

## 🎨 Theming Model

**Mode:** Controls luminance (light | dark), applied as data-mode="dark"

**Mood:** Controls color personality, independent of luminance (e.g., birthday, leafy, flowery, tiger, ocean). Affects semantic tokens, not layout.

**Language:** Initialized from stored preference, browser language, or fallback. Applied as <html lang="en">.

**State priority:**

1. DOM attributes (bootstrap truth)
2. localStorage
3. System preference
4. Default fallback

This guarantees continuity between boot and runtime.

---

## ✅ Quick Validation (Quick Checks)

Manual steps:

- Inspect <html> before Angular loads
- Confirm data-mode, data-mood, and lang
- Change values via console and verify UI updates
- Reload after changing localStorage to confirm persistence
- Run Lighthouse for contrast validation

**Common issues:**

- FOUC → pre-bootstrap missing or slow
- Tokens not updating → semantic tokens not derived correctly

---

## 📚 Key Design Principles Learned

> 🔍 **Observation:** UI consistency depends more on initialization order than styling.
>
> 💡 **Insight:** CSS tokens work best when components never access primitives directly.
>
> ⚠️ **Failed hypothesis:** Too many elevation variations increase visual noise.

---

## 🧪 What this repository represents

Not a finished product, but a documented learning process.

A small personal laboratory exploring:

- Standalone Angular architecture
- Signal-driven state
- Design tokens
- Runtime theming
- UI initialization strategies

Some files exist just to capture understanding, not outcomes.

---

## 📓 Quick Glossary

**Surface:** Interactive plane within the visual context

**Elevation:** Perception of distance between layers, not a literal shadow

**Semantic token:** Variable expressing intent, not value

---

## 📌 Quick Notes

Fast ideas that don’t yet deserve their own section:

- Maybe separate motion physics from motion timing
- Explore shadows derived from background
- Try UI without borders
- **Explore advanced responsive with minimal media queries, using clamp, flex, and grid for truly fluid, adaptive layouts**

---

_Última actualización: YYYY-MM-DD_

        “Como Alicia tras el conejo, este proyecto es una travesía personal por un mundo de puertas, decisiones y
        sorpresas. No sigue las convenciones rígidas ni busca ser ejemplo de nada: es un laboratorio donde perderse,
        experimentar y aprender sin prejuicios, abriendo cada puerta aunque no sepa qué hay detrás.”
      <p>En un mundo de variables, descubrí que cambiando unos tristes rgbs por hsls los colores se abrieron con</p>

<p>Al comienzo de este viaje me encontré luchando con el FOUC, navegando por PLATFORM_ID, bla bla bla
        Al comienzo de este viaje me encontré luchando con el FOUC, navegando por PLATFORM_ID, bla bla bla </p>
