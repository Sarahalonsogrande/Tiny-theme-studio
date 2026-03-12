/**
 * MoodSwitcherComponent – Handles Mood selection for the app.
 *
 * - Renders `app-spin-button` with `MOOD_OPTIONS`.
 * - Uses centralized MOOD_OPTIONS for available moods.
 * - Integrates with MoodService for type-safe mood switching.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example
 * <app-mood-switcher></app-mood-switcher>
 */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiMoodService } from '@app/core/services/ui-moods/ui-mood.service';
import { MOOD_OPTIONS, SwitcherOption, MoodMode } from '@app/core/constants/ui/ui-config.constants';
import { SpinButtonComponent } from '@app/shared/components/buttons/spin-button/spin-button.component';

@Component({
    selector: 'app-mood-switcher',
    templateUrl: './mood-switcher.component.html',
    styleUrls: ['./mood-switcher.component.scss'],
    imports: [TranslateModule, SpinButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoodSwitcherComponent {
    // Injected UiMoodService.
    private readonly uiMoodService = inject(UiMoodService);

    // Available mood options (single source of truth).
    readonly moodOptions: readonly SwitcherOption[] = MOOD_OPTIONS;

    // Current mood signal for the service.
    readonly currentMood = this.uiMoodService.mood;

    // Computed: returns the current mood option object or null when not found.
    readonly currentMoodOption = computed<SwitcherOption | null>(() =>
        this.moodOptions.find(o => o.value === this.currentMood()) ?? null
    );

    // Handles mood selection change from the switcher button.
    setMood(option: SwitcherOption) {
        const value = option?.value as MoodMode | undefined;
        const valid = MOOD_OPTIONS.some(o => o.value === value);
        if (!valid) {
            if ((globalThis as any).ngDevMode) console.warn('[MoodSwitcher] Ignoring invalid mood:', value);
            return;
        }
        this.uiMoodService.setMood(value as MoodMode);
    }
}
