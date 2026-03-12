# Tiny Theme Studio

Laboratorio personal de UI construido con Angular y CSS moderno.

---

## Tiny Theme Studio (Espanol)

Inspirado en el espiritu de "Alicia en el Pais de las Maravillas", este proyecto es una travesia por decisiones visuales, arquitectura y exploracion. No busca ser una receta cerrada: es un laboratorio para aprender rompiendo.

> "Como Alicia tras el conejo, este proyecto es una travesia personal por un mundo de puertas, decisiones y sorpresas. No sigue convenciones rigidas ni busca ser ejemplo de nada: es un laboratorio donde perderse, experimentar y aprender sin prejuicios."

### Recorrido narrativo (`welcome`)

- `cover`: Tiny Theme Studio
- `rabbit-hole`: entrada al caos creativo
- `angular`: punto de arranque del sistema
- `html`: semantica como estructura
- `css`: variables, tokens y capas
- `journey`: aprendizaje continuo
- `conclusion`: La Declaracion de Sarah
- `guide`: guia visual del sistema

### Nota personal

Bebi la pocion del CSS y unos tristes RGB se dividieron en haces de luz con los que jugar; todo se tinio de Saturacion y Matices, y las sombras se proyectaban hermosas ahi abajo. Asi nacio este sistema de moods y modes, manipulando HSL como si fueran pigmentos en una paleta.

Como artesana y pintora, este reto me resulta tan inesperado como apasionante. El CSS dejo de ser solo "decoracion" y se convirtio en el lenguaje donde mas disfruto explorando, creando y entendiendo como se construyen las interfaces de verdad.

Uno de mis mayores retos es lograr una web realmente fluida y elegante, exprimiendo al maximo las posibilidades de `clamp()`, flex y grid, y reduciendo los media queries a lo esencial. Sigo profundizando, sin saber exactamente a donde me llevará, pero con la certeza de que cada descubrimiento es una nueva poción en mi viaje creativo.

### Instalacion y desarrollo

Este proyecto esta construido con Angular CLI.

1. Instala dependencias:

```bash
npm install
```

2. Inicia el entorno de desarrollo:

```bash
npm start
```

3. Abre `http://localhost:4200/` en el navegador.

### Comandos utiles

```bash
npm start   # desarrollo
npm test    # tests
npm run build # build de produccion
```

### Filosofia de diseno

- La UI es un sistema, no una coleccion de estilos.
- Los componentes no conocen colores concretos.
- El estado visual vive fuera de los componentes.
- El tema se resuelve en runtime, no en build-time.
- Los tokens semanticos son la API publica del diseno.
- Responsive moderno con `clamp`, flex y grid, minimizando media queries.

### Arquitectura

El sistema separa cuatro capas:

1. Pre-bootstrap (`index.html`): aplica estado visual inicial.
2. Estado runtime (Angular signals): sincroniza preferencias y estado global.
3. Tokens visuales (CSS): actualizan la UI automaticamente.
4. Componentes: consumen tokens y signals, sin acoplarse a detalles de plataforma.

Beneficios principales:

- Primer render correcto sin FOUC.
- Cambios de tema instantaneos.
- Escalabilidad visual real.

### Theming

- Primitives: ingredientes base (`--primary-h`, `--primary-s`, etc.).
- Semantic tokens: API para componentes (`--background`, `--surface`, `--color-primary`, etc.).
- Modes: iluminacion (light/dark).
- Moods: personalidad cromatica independiente del modo.

### Accesibilidad

- Soporte de `prefers-reduced-motion`.
- Contraste gestionado mediante tokens.
- HTML semantico como base.
- Idioma sincronizado con `<html lang>`.

### Estructura del proyecto

```text
src/app/theme/
|- primitives.scss
|- modes.scss
|- moods.scss
|- semantic.scss
|- motion.scss
|- elevation.scss
|- effects.scss
|- layer.scss
`- utilities.scss
```

### Futuro

- Mejorar SSR y sincronizacion cross-device.
- Generacion dinamica de tokens.
- Tooling para creacion de moods.
- Automatizacion de contraste accesible.

### Inspiraciones

Este proyecto no existiria sin el trabajo y la generosidad de estas personas:

- [Josh W Comeau](https://www.joshwcomeau.com/) — Por hacer del CSS algo comprensible, bello y apasionante.
- [Kevin Powell](https://www.kevinpowell.co/) — El rey del CSS responsivo moderno. Aprendi a pensar en layouts de otra manera.
- [Nuria Soriano Satorres](https://www.nuriasatorres.com/) — Frontend de verdad. Su forma de entender y explicar la web me dio perspectiva y confianza.
- [Coding2GO](https://www.youtube.com/@coding2go) — Tutoriales practicos y directos. Una referencia constante para aprender haciendo.

---

## Tiny Theme Studio (English)

Inspired by the spirit of "Alice in Wonderland," this project is a journey through visual decisions, architecture, and experimentation. It is not meant to be a rigid recipe; it is a lab for learning by doing.

> "Like Alice chasing the rabbit, this project is a personal journey through a world of doors, decisions, and surprises. It does not follow rigid conventions or try to be a model; it is a lab for getting lost, experimenting, and learning without prejudice."

### Narrative map (`welcome`)

- `cover`: Tiny Theme Studio
- `rabbit-hole`: entry into creative chaos
- `angular`: system entry point
- `html`: semantics as structure
- `css`: variables, tokens, and layers
- `journey`: continuous learning
- `conclusion`: Sara's Declaration
- `guide`: visual system guide

### Personal note

As an artisan and painter, this challenge feels both unexpected and deeply exciting. CSS stopped being just "decoration" and became the language where I most enjoy exploring, creating, and understanding how real interfaces are built.

One of my main challenges is building a truly fluid and elegant website by pushing `clamp()`, flex, and grid as far as possible while keeping media queries to the minimum.

I drank the CSS potion and sad RGB values split into beams of light to play with; everything was tinted with Saturation and Hue, and shadows projected beautifully down below. That is how this moods and modes system was born, treating HSL values like pigments on a palette.

### Installation and development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

3. Open `http://localhost:4200/`.

### Useful commands

```bash
npm start     # dev server
npm test      # unit tests
npm run build # production build
```

### Design philosophy

- UI is a system, not a collection of styles.
- Components do not own concrete color values.
- Visual state lives outside components.
- Theme is resolved at runtime, not build-time.
- Semantic tokens are the public design API.
- Modern responsive design with `clamp`, flex, and grid, minimizing media queries.

### Architecture

The system is split into four layers:

1. Pre-bootstrap (`index.html`): applies initial visual state.
2. Runtime state (Angular signals): syncs preferences and global state.
3. Visual tokens (CSS): update UI automatically.
4. Components: consume tokens and signals without platform coupling.

Main benefits:

- Correct first render without FOUC.
- Instant theme switching.
- Real visual scalability.

### Theming

- Primitives: base ingredients (`--primary-h`, `--primary-s`, etc.).
- Semantic tokens: component API (`--background`, `--surface`, `--color-primary`, etc.).
- Modes: lighting control (light/dark).
- Moods: chromatic personality independent from mode.

### Accessibility

- `prefers-reduced-motion` support.
- Token-driven contrast handling.
- Semantic HTML first.
- Language synced with `<html lang>`.

### Project structure

```text
src/app/theme/
|- primitives.scss
|- modes.scss
|- moods.scss
|- semantic.scss
|- motion.scss
|- elevation.scss
|- effects.scss
|- layer.scss
`- utilities.scss
```

### Future work

- Improve SSR and cross-device sync.
- Dynamic token generation.
- Tooling for mood creation.
- Automated accessible contrast checks.

### Inspirations

This project would not exist without the work and generosity of these people:

- [Josh W Comeau](https://www.joshwcomeau.com/) — For making CSS something understandable, beautiful, and exciting.
- [Kevin Powell](https://www.kevinpowell.co/) — The king of modern responsive CSS. He changed the way I think about layouts.
- [Nuria Soriano Satorres](https://www.nuriasatorres.com/) — Real frontend craft. Her way of understanding and explaining the web gave me perspective and confidence.
- [Coding2GO](https://www.youtube.com/@coding2go) — Practical, straight-to-the-point tutorials. A constant reference for learning by doing.

---

## License

MIT
