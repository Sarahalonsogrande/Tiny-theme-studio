/**
 * ModeSwitcherComponent – Handles Mode selection for the app.
 *
 * - Renders `app-spin-button` with `MODE_OPTIONS`.
 * - Uses centralized MODE_OPTIONS for available modes.
 * - Integrates with ModeService for type-safe mode switching.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example
 * <app-mode-toggle></app-mode-toggle>
 */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiModeService } from '@app/core/services/ui-modes/ui-mode.service';
import { MODE_OPTIONS, ModeMode, SwitcherOption } from '@app/core/constants/ui/ui-config.constants';
import { ToggleButtonComponent } from '@app/shared/components/buttons/toggle-button/toggle-button.component';

@Component({
    selector: 'app-mode-toggle',
    templateUrl: './mode-toggle.component.html',
    styleUrls: ['./mode-toggle.component.scss'],
    imports: [TranslateModule, ToggleButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeToggleComponent {
    // Injected UiModeService.
    private readonly uiModeService = inject(UiModeService);

    // Available mode options (single source of truth).
    readonly modeOptions = MODE_OPTIONS;

    // Current mode signal for the service.
    readonly currentMode = this.uiModeService.mode;

    // Computed: returns the current mode option object or null when not found.
    readonly currentModeOption = computed<SwitcherOption | null>(() =>
        //this.currentMode()
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
