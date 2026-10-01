import { Component } from '@angular/core';
import { SplashScreenComponent } from '../../splash-screen/splash-screen.component';
import { DisclosureWidgetComponent } from "@app/shared/components/disclosure-widget/disclosure-widget.component";

@Component({
  selector: 'app-story-prologue',
  imports: [SplashScreenComponent, DisclosureWidgetComponent],
  templateUrl: './story-prologue.component.html',
  styleUrl: './story-prologue.component.scss',
})
export class StoryPrologueComponent {
}
