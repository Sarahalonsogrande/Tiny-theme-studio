/**
 * LanguageSwitcherComponent — Handles Language selection for the app.
 *
 * - Renders `app-spin-button` with `LANG_OPTIONS`.
 * - Uses centralized LANGUAGE_OPTIONS.
 * - Integrates with LanguageService for type-safe language switching.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example
 * <app-language-switcher></app-language-switcher>
 */

import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@app/core/services/language/language.service';
import { LANG_OPTIONS, SwitcherOption, LangCode } from '@app/core/constants/ui/ui-config.constants';
import { TranslateModule } from '@ngx-translate/core';
import { SpinButtonComponent } from '@app/shared/components/buttons/spin-button/spin-button.component';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  imports: [CommonModule, TranslateModule, SpinButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  // Injected LanguageService.
  private readonly langService = inject(LanguageService);

  // Available language options (single source of truth).
  readonly langOptions: readonly SwitcherOption[] = LANG_OPTIONS;

  // Current language signal from the service.
  readonly currentLang = this.langService.lang;

  // Current selected option or null when no match exists.
  readonly currentLangOption = computed<SwitcherOption | null>(() =>
    this.langOptions.find(o => o.value === this.currentLang()) ?? null
  );

  // Apply the chosen language via the service.
  setLang(option: SwitcherOption) {
    this.langService.changeLang(option.value as LangCode);
  }
}
