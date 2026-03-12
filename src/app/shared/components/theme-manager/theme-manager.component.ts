import { Component } from '@angular/core';
import { MoodSwitcherComponent } from "@app/shared/components/buttons/mood-switcher/mood-switcher.component";
import { ModeToggleComponent } from "@app/shared/components/buttons/mode-toggle/mode-toggle.component";

@Component({
  selector: 'app-theme-manager',
  imports: [MoodSwitcherComponent, ModeToggleComponent],
  templateUrl: './theme-manager.component.html',
  styleUrl: './theme-manager.component.scss',
})
export class ThemeManagerComponent {

}
