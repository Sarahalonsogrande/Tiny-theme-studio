import { Component } from '@angular/core';
import { SpinButtonComponent } from "@app/shared/components/buttons/spin-button/spin-button.component";
import { MOOD_OPTIONS } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-style-guide',
  imports: [SpinButtonComponent],
  templateUrl: './style-guide.component.html',
  styleUrl: './style-guide.component.scss',
})
export class StyleGuideComponent {
  // Provide mood options to the spin button
  moodOptions = MOOD_OPTIONS;

  // Default selected mood
  currentMood = this.moodOptions[0];

  // Handle option change
  onMoodChange(newMood: any): void {
    this.currentMood = newMood;
  }
}
