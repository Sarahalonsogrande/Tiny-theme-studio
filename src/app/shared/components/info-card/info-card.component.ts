import { Component, computed, input } from '@angular/core';
import { MOVIES_DATA, Movie } from '@app/core/constants/filmography';
import { DisclosureWidgetComponent } from "@app/shared/components/disclosure-widget/disclosure-widget.component";

@Component({
  selector: 'app-info-card',
  imports: [DisclosureWidgetComponent],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  movie = input.required<Movie>();

  details = computed(() => [
    { label: 'Sinopsis', icon: '📖', content: this.movie().Plot },
    { label: 'Reparto', icon: '🎭', content: this.movie().Actors },
    { label: 'Ficha', icon: '🎬', content: `Director: ${this.movie().Director} | Género: ${this.movie().Genre}` },
    { label: 'Info', icon: 'ℹ️', content: `Año: ${this.movie().Year} | Duración: ${this.movie().Runtime}` }
  ]);

}
