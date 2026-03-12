import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeaderComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
