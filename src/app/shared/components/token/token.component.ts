import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-token',
  imports: [NgClass],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss',
})
export class TokenComponent {
  readonly label = input<string>();
  readonly swatchClass = input<string>();
  readonly value = input<string>();
}
