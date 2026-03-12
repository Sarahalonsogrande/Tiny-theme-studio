

/**
 * ModeSwitcherComponent – Handles Mode selection for the app.
 *
 * - Renders `app-spin-button` with `MODE_OPTIONS`.
 * - Uses centralized MODE_OPTIONS for available modes.
 * - Integrates with UiModeService for type-safe mode switching.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example
 * <app-mode-switcher></app-mode-switcher>
 */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiModeService } from '@app/core/services/ui-modes/ui-mode.service';
import { MODE_OPTIONS, SwitcherOption, ModeMode } from '@app/core/constants/ui/ui-config.constants';
import { SpinButtonComponent } from '@app/shared/components/buttons/spin-button/spin-button.component';

@Component({
  selector: 'app-mode-switcher',
  templateUrl: './mode-switcher.component.html',
  styleUrls: ['./mode-switcher.component.scss'],
  imports: [TranslateModule, SpinButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeSwitcherComponent {
  // Injected UiModeService.
  private readonly uiModeService = inject(UiModeService);

  // Available mode options (single source of truth).
  readonly modeOptions: readonly SwitcherOption[] = MODE_OPTIONS;

  // Current mode signal for the service.
  readonly currentMode = this.uiModeService.mode;

  // Computed: returns the current mode option object or null when not found.
  readonly currentModeOption = computed<SwitcherOption | null>(() =>
    this.modeOptions.find(o => o.value === this.currentMode()) ?? null
  );

  // Handles mode selection change from the switcher button.
  setMode(option: SwitcherOption) {
    const value = option?.value as ModeMode | undefined;
    const valid = MODE_OPTIONS.some(o => o.value === value);
    if (!valid) {
      if ((globalThis as any).ngDevMode) console.warn('[ModeSwitcher] Ignoring invalid mode:', value);
      return;
    }
    this.uiModeService.setMode(value as ModeMode);
  }
}
