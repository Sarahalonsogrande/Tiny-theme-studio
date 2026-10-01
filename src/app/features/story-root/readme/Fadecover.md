<main class="story-root">
	<section id="storyPrologue">
		<app-story-prologue />

    	@if (!overlayRevealed()) {
    	<div class="prologue-overlay">
    		<p>Laboratorio de ideas<br>en construcción continua</p>
    	</div>
    	}
    </section>

    <section id="storyOverview">
    	<div class="pin-wrap-sticky">
    		<div class="pin-wrap">
    			<article></article>
    			<article><img src="/images/Alice-swimming.svg" alt=""></article>

    			<article>
    				<img src="/images/Alice-swimming-with-Mouse.svg" alt="">
    			</article>

    			<article>
    				<blockquote>
    					<span># Tiny Theme Studio

    						Laboratorio personal de UI construido con Angular y CSS moderno.

    						---

    						## Tiny Theme Studio (Espanol)

    						Inspirado en el espiritu de "Alicia en el Pais de las Maravillas", este proyecto es una
    						travesia por decisiones visuales, arquitectura y exploracion. No busca ser una receta
    						cerrada: es un laboratorio para aprender rompiendo.

    						> "Como Alicia tras el conejo, este proyecto es una travesia personal por un mundo de
    						puertas, decisiones y sorpresas. No sigue convenciones rigidas ni busca ser ejemplo de nada:
    						es un laboratorio donde perderse, experimentar y aprender sin prejuicios."

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

    						Bebi la pocion del CSS y unos tristes RGB se dividieron en haces de luz con los que jugar;
    						todo se tinio de Saturacion y Matices, y las sombras se proyectaban hermosas ahi abajo. Asi
    						nacio este sistema de moods y modes, manipulando HSL como si fueran pigmentos en una paleta.

    						Como artesana y pintora, este reto me resulta tan inesperado como apasionante. El CSS dejo
    						de ser solo "decoracion" y se convirtio en el lenguaje donde mas disfruto explorando,
    						creando y entendiendo como se construyen las interfaces de verdad.

    						Uno de mis mayores retos es lograr una web realmente fluida y elegante, exprimiendo al
    						maximo las posibilidades de `clamp()`, flex y grid, y reduciendo los media queries a lo
    						esencial. Sigo profundizando, sin saber exactamente a donde me llevará, pero con la certeza
    						de que cada descubrimiento es una nueva poción en mi viaje creativo.
    					</span>
    				</blockquote>
    			</article>

    			<article><img src="/images/Alice-with-a-key.svg" alt=""></article>
    			<article></article>
    		</div>
    	</div>
    </section>
    <app-story-chapters />

</main>

import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoryChaptersComponent } from "./story-chapters/story-chapters.component";
import { SpecialChapterComponent } from "./special-chapter/special-chapter.component";
import { CHAPTER, SPECIAL_CHAPTER } from '@app/core/constants/welcome/welcome-constants';
import { StoryOverviewComponent } from "./story-overview/story-overview.component";
import { StoryPrologueComponent } from './story-prologue/story-prologue.component';

@Component({
selector: 'app-story-root',
imports: [
TranslateModule,
StoryChaptersComponent,
StoryPrologueComponent
],
templateUrl: './story-root.component.html',
styleUrl: './story-root.component.scss',
changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryRootComponent implements OnInit, AfterViewInit, OnDestroy {
private readonly document = inject(DOCUMENT);
private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

readonly specialChapters = SPECIAL_CHAPTER;
readonly overlayRevealed = signal(false);

private readonly SCROLL_TOTAL = 600;
private accumulatedDelta = 0;
private touchStartY = 0;

private readonly wheelHandler = (event: WheelEvent): void => {
if (this.overlayRevealed()) return;
event.preventDefault();
this.accumulatedDelta = Math.max(0, Math.min(this.accumulatedDelta + event.deltaY, this.SCROLL_TOTAL));
const progress = this.accumulatedDelta / this.SCROLL_TOTAL;
this.document.documentElement.style.setProperty('--overlay-opacity', String(1 - progress));
if (progress >= 1) this.revealComplete();
};

private readonly touchStartHandler = (event: TouchEvent): void => {
this.touchStartY = event.touches[0].clientY;
};

private readonly touchMoveHandler = (event: TouchEvent): void => {
if (this.overlayRevealed()) return;
event.preventDefault();
const deltaY = this.touchStartY - event.touches[0].clientY;
this.touchStartY = event.touches[0].clientY;
this.accumulatedDelta = Math.max(0, Math.min(this.accumulatedDelta + deltaY, this.SCROLL_TOTAL));
const progress = this.accumulatedDelta / this.SCROLL_TOTAL;
this.document.documentElement.style.setProperty('--overlay-opacity', String(1 - progress));
if (progress >= 1) this.revealComplete();
};

ngOnInit(): void {
if (this.isBrowser) {
this.document.documentElement.style.overflow = 'hidden';
}
}

ngAfterViewInit(): void {
if (!this.isBrowser) return;
this.document.addEventListener('wheel', this.wheelHandler, { passive: false });
this.document.addEventListener('touchstart', this.touchStartHandler, { passive: true });
this.document.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
}

ngOnDestroy(): void {
if (!this.isBrowser) return;
this.document.documentElement.style.overflow = '';
this.document.removeEventListener('wheel', this.wheelHandler);
this.document.removeEventListener('touchstart', this.touchStartHandler);
this.document.removeEventListener('touchmove', this.touchMoveHandler);
}

private revealComplete(): void {
this.overlayRevealed.set(true);
this.document.documentElement.style.overflow = '';
this.document.documentElement.style.removeProperty('--overlay-opacity');
this.document.removeEventListener('wheel', this.wheelHandler);
this.document.removeEventListener('touchstart', this.touchStartHandler);
this.document.removeEventListener('touchmove', this.touchMoveHandler);
}
}

.story-root {
max-width: 100vw;
width: 100%;
overflow-x: clip;
view-timeline-name: --page;
view-timeline-axis: block;

section {
min-height: 100vh;
width: 100%;
max-width: 100vw;
overflow-x: hidden;
position: relative;
}

#storyPrologue {
position: relative;
min-height: 200vh;
overflow: hidden;

    view-timeline-name: --prologue;
    view-timeline-axis: block;

    app-story-prologue {
      position: sticky;
      top: 0;
      height: 100vh;
      display: block;
    }

    .prologue-overlay {
      position: absolute;
      top: 0;

      width: 100vw;
      height: 100vh;
      display: grid;
      place-content: center;
      text-align: center;
      background: var(--color-primary);
      color: black;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      z-index: 100;
      pointer-events: none;

      opacity: var(--overlay-opacity, 1);
      backdrop-filter: blur(calc(12px * var(--overlay-opacity, 1)));
      transition:
        opacity 0.12s ease-out,
        backdrop-filter 0.12s ease-out;
    }

}

#storyOverview {
/_ Stretch it out, create room for horizontal scroll animation to make position sticky work _/
height: 600vh;
overflow: visible;

    view-timeline-name: --chapter;
    view-timeline-axis: block;

    .pin-wrap-sticky {
      /* Stick to Top */
      height: 100vh;
      width: 100vw;
      position: sticky;
      top: 0;
      overflow: hidden;

      .pin-wrap {
        //border: 1px solid black;
        height: 100vh;
        width: max-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-4);

        /* Hook animation */
        will-change: transform;
        animation: move linear both;
        /* Link animation to view-timeline */
        animation-timeline: --chapter;
        animation-range: entry 0% exit 100%;

        article {
          display: grid;
          place-content: center;
          width: 100vw;
          height: 100svh;
          padding: var(--space-8);

          view-timeline-name: --panel;
          view-timeline-axis: inline;

          //  * {
          //   animation: reveal linear both;
          //   animation-timeline: --panel;
          //   animation-range: entry 80% cover 80%;
          // }

          blockquote {
            //border: 1px solid red;
            --n: 300;

            width: 60vw;
            height: 60dvh;
            padding: var(--space-8);
            overflow: auto;
            overflow-x: hidden;

            // Animaction scroll-timeline (experimental)
            scroll-timeline-name: --text;
            scroll-timeline-axis: block;

            span {
              /* highlight text */
              background:
                linear-gradient(90deg, var(--text) 0 0) 0 / 0% 100% no-repeat,
                var(--color-primary);
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;

              animation: text linear both;
              animation-timeline: --text;
            }

            // Fallback animation-timeline
            @supports not (animation-timeline: --text) {
              span {
                animation: none;
                background-size: 100% 100%;
              }
            }

            // Custom Scrollbar - WebKit (Chrome, Edge, Safari)
            &::-webkit-scrollbar {
              max-width: var(--space-3);
              max-height: var(--space-3);
            }

            &::-webkit-scrollbar-track {
              background: transparent;
            }

            &::-webkit-scrollbar-thumb {
              background: transparent;
              border: 3px solid var(--color-primary-weak);
              border-radius: var(--radius-sm);
            }

            &::-webkit-scrollbar-button {
              background: transparent;
              border: 3px solid var(--color-primary-weak);
              border-radius: var(--radius-sm);
              border-top-right-radius: var(--radius-sm);
            }

            &:hover::-webkit-scrollbar-track {
              background: var(--bg-glass);
            }

            &:hover::-webkit-scrollbar-thumb {
              background: var(--color-primary-strong);
            }

            &:hover::-webkit-scrollbar-button {
              background: var(--color-primary-strong);
            }

            // Firefox Scrollbar
            scrollbar-width: thin;
            scrollbar-color: var(--color-primary-weak) transparent;
            &:hover {
              scrollbar-color: var(--color-primary-strong) var(--bg-glass);
            }
          }

          img {
            height: 100%;
            width: 100%;
            max-width: 100%;
            object-fit: fill;
            height: min(100vh, 64rem);
          }
        }
      }
    }

}
}

@keyframes move {
to {
/_ Move horizontally so that right edge is aligned against the viewport _/
transform: translateX(calc(-100% + 100vw));
}
}

@keyframes reveal {
from {
opacity: 0;
transform: translateY(6rem);
}
to {
opacity: 1;
transform: translateY(0);
}
}

@keyframes prologueFade {
from {
opacity: 1;
backdrop-filter: blur(12px);
// transform: scale(1);
}

to {
opacity: 0;
backdrop-filter: blur(0);
// transform: scale(1.02);
pointer-events: none;
}
}

@keyframes text {
from {
background-size: 0 100%;
}
to {
background-size: 100% 100%;
}
}

@keyframes parallaxSlow {
from {
transform: translateX(-5vw);
}
to {
transform: translateX(5vw);
}
}

@keyframes parallaxFast {
from {
transform: translateX(-15vw);
}
to {
transform: translateX(15vw);
}
}

/_ Fallback: no view-timeline support -> keep a usable horizontal scroller _/
@supports not (animation-timeline: --section-pin-tl) {
#sectionPin {
height: auto;
overflow: hidden;
}

.pin-wrap-sticky {
position: relative;
height: auto;
overflow-x: auto;
overflow-y: hidden;
overscroll-behavior-x: contain;
scroll-snap-type: x proximity;
}

.pin-wrap {
height: auto;
min-height: 100vh;
animation: none;
transform: none;
}

.pin-wrap > \* {
scroll-snap-align: start;
}
}
