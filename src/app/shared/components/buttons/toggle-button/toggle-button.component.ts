/**
 * ToggleButtonComponent – Reusable two-option toggle switch.
 *
 * - Checkbox-based toggle with semantic role="switch"
 * - Uses signals & computed for reactive inputs/outputs
 * - Accessible: aria-label and aria-checked for screen readers
 * - Supports decorative images/icons for off/on states
 * - Internationalization-friendly (labels come from constants/i18n keys)
 *
 * Example usage:
 * <app-toggle-button
 *   [values]="ThemeOptions"
 *   [ariaLabel]="'aria.selectTheme' | translate"
 *   (optionChange)="setTheme($event)"
 *   [value]="currentThemeOption()">
 * </app-toggle-button>
 */
import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { SwitcherOption } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-toggle-button',
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  // The list of available options (should be exactly 2 for a toggle)
  values = input<readonly SwitcherOption[]>([]);

  // The currently selected option
  value = input<SwitcherOption | null>(null);

  // Accessible label describing the toggle
  ariaLabel = input<string>('');

  // Emits the newly selected option when toggled
  optionChange = output<SwitcherOption>();

  // Unique ID for input/label association to prevent collisions if multiple toggles exist
  readonly toggleId = `toggle-${Math.random().toString(36).substring(2, 10)}`;

  /**
   * Computed: true if the second option is selected
   * (assumes first option is “off” and second is “on”)
   */
  readonly isChecked = computed(() => {
    const vals = this.values();
    const current = this.value();
    return vals.length === 2 && current?.value === vals[0].value;
  });

  // Computed references to each option for template rendering
  readonly option1 = computed(() => this.values()[0] || null);
  readonly option2 = computed(() => this.values()[1] || null);

  /**
   * Handles the toggle action when the user clicks or changes the input
   * Emits the opposite option of the current selection
   */
  onToggle(event: Event) {
    const vals = this.values();
    if (vals.length !== 2) return;

    const current = this.value();
    const newOption = current?.value === vals[0].value ? vals[1] : vals[0];
    this.optionChange.emit(newOption);
  }
}
