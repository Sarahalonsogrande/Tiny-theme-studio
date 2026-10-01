import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SplashScreenComponent } from "./features/splash-screen/splash-screen.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, SplashScreenComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
