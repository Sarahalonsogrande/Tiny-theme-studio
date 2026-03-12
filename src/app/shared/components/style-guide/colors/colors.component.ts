import { Component } from '@angular/core';
import { TokenComponent } from "../../token/token.component";
import { TokensComponent } from "../../tokens/tokens.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-colors',
  imports: [TokenComponent, TokensComponent],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
})
export class ColorsComponent {
  colors = [
    { label: 'Primary', value: '--color-primary', swatchClass: 'color-primary' },
    { label: 'Accent', value: '--color-accent', swatchClass: 'color-accent' },
    { label: 'Highlight', value: '--color-highlight', swatchClass: 'color-highlight' },
    { label: 'Success', value: '--color-success', swatchClass: 'color-success' },
    { label: 'Warning', value: '--color-warning', swatchClass: 'color-warning' },
    { label: 'Danger', value: '--color-danger', swatchClass: 'color-danger' },
    { label: 'Info', value: '--color-info', swatchClass: 'color-info' },
    { label: 'Neutral', value: '--color-neutral', swatchClass: 'color-neutral' },
    { label: 'Background', value: '--background', swatchClass: 'color-background' },
    { label: 'Surface', value: '--surface', swatchClass: 'color-surface' },
    { label: 'Text', value: '--text', swatchClass: 'color-text' },
    { label: 'Muted', value: '--muted', swatchClass: 'color-muted' }
  ];
}
