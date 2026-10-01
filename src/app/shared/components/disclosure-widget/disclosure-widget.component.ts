import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-disclosure-widget',
  imports: [RouterLink],
  templateUrl: './disclosure-widget.component.html',
  styleUrl: './disclosure-widget.component.scss',
})
export class DisclosureWidgetComponent {
  name = input<string>('default-group');
  readonly summary = input<string>();
  readonly detailsContent = input<string>();
  readonly detailsLink = input<string>();
  readonly detailsName = input<string>();

  isOpen = input<boolean>(false);

  route = input<string | any[]>('');
}
