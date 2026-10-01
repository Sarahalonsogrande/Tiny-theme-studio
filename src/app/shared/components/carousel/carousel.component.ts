import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ViewChild, input, signal } from '@angular/core';
import { TokenComponent } from "@app/shared/components/token/token.component";
import { TokensComponent } from "../tokens/tokens.component";
import { ColorsComponent } from "../style-guide/colors/colors.component";
import { InfoCardComponent } from "../info-card/info-card.component";
import { Movie, MOVIES_DATA } from '@app/core/constants/filmography';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  imports: [ColorsComponent, InfoCardComponent]
})
export class CarouselComponent {
  movie = signal<Movie[]>([... MOVIES_DATA]);
// export class CarouselComponent implements AfterViewInit {
  // @Input() items!: any[];                  // Array de items dinámicos
  // @Input() itemTemplate!: TemplateRef<any>; // Template para renderizar cada item
  // @Input() ariaLabel: string = 'Carousel';

  // @ViewChild('carousel') carousel!: ElementRef<HTMLUListElement>;

  // activeIndex = signal(0);
  // autoplayInterval!: number;

  // ngAfterViewInit() {
  //   if (!this.carousel || !this.carousel.nativeElement) return;
  //   const slides = Array.from(this.carousel.nativeElement.children) as HTMLElement[];

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         const index = slides.indexOf(entry.target as HTMLElement);
  //         this.activeIndex.set(index);
  //         slides.forEach(slide => slide.classList.remove('active'));
  //         slides[index].classList.add('active');
  //       }
  //     });
  //   }, { root: this.carousel.nativeElement, threshold: 0.6 });

  //   slides.forEach(slide => observer.observe(slide));

  //   // Autoplay cada 4s
  //   this.autoplayInterval = window.setInterval(() => this.nextSlide(), 4000);
  // }

  // goToSlide(index: number) {
  //   const slide = this.carousel.nativeElement.children[index] as HTMLElement;
  //   slide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  // }

  // nextSlide() {
  //   const slides = this.carousel.nativeElement.children.length;
  //   this.goToSlide((this.activeIndex() + 1) % slides);
  // }

  // prevSlide() {
  //   const slides = this.carousel.nativeElement.children.length;
  //   this.goToSlide((this.activeIndex() - 1 + slides) % slides);
  // }

  // ngOnDestroy() {
  //   clearInterval(this.autoplayInterval);
  // }
}
