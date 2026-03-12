/**
 * LanguageService – Manages application language (ngx-translate) and persistence.
 *
 * For full architecture and flow details, see docs/THEMING.md and LAB_NOTES.md
 *
 * Responsibilities:
 * - Configure ngx-translate fallback/default language.
 * - Load and persist the user's language preference to localStorage (defensive for SSR).
 * - Expose the current language as a signal and primitive value.
 * - Keep constructor SSR-safe; call `init()` only in the browser.
 *
 * Example usage:
 *   languageService.changeLang('es');
 *   const langSignal = languageService.getCurrentLang();
 *   const lang = languageService.getCurrentLangValue();
 */

import { inject, Injectable, signal, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LANG_OPTIONS, LangCode } from '@app/core/constants/ui/ui-config.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly translateService: TranslateService | null = null;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly langKey = 'lang';
  private readonly supportedLangs: readonly LangCode[] = LANG_OPTIONS.map(option => option.value);
  private readonly _lang = signal<LangCode>('en');
  readonly lang = this._lang.asReadonly();
  private readonly defaultLang: LangCode = 'en';

  /**
   * Initializes language settings and sets the fallback language.
   * Loads the saved language from localStorage or uses the default.
   */
  constructor(@Optional() translateService?: TranslateService | null) {
    this.translateService = translateService ?? null;
  }

  /**
   * Runtime-only language initialization. Must be called in the browser.
   * Sets ngx-translate fallback language and loads any saved value from localStorage.
   * IMPORTANT: Call `init()` before performing runtime language changes so
   * TranslateService is configured and persisted preferences are loaded.
   */
  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.translateService) {
      this.translateService.setFallbackLang(this.defaultLang);
    }
    this.loadSavedLang();
  }

  /**
   * Loads saved language from localStorage, falls back to default if unavailable/invalid.
   */
  private loadSavedLang() {
    let stored: LangCode | null = null;
    try {
      stored = localStorage.getItem(this.langKey) as LangCode | null;
    } catch (e) {
      stored = null;
    }
    const lang = stored && this.supportedLangs.includes(stored) ? stored : this.defaultLang;
    this.setLang(lang);
  }

  /**
   * Changes the app language if supported and saves it to localStorage.
   */
  changeLang(lang: LangCode) {
    if (this.supportedLangs.includes(lang)) {
      this.setLang(lang);
    } else {
      console.warn(`[LanguageService] Unsupported language: ${lang}`);
    }
  }

  /**
   * Applies a language: instructs ngx-translate to use it, persists it, and updates the signal.
   * Note: `translateService.use(lang)` loads translation files asynchronously.
   * To react after translations are loaded, use TranslateService events/promises.
   */
  private setLang(lang: LangCode) {
    this.translateService?.use(lang);
    try {
      localStorage.setItem(this.langKey, lang);
    } catch (e) {
      // ignore storage errors
    }
    this._lang.set(lang);
  }

  /** Returns the current language as a readonly signal. */
  getCurrentLang(): typeof this.lang {
    return this.lang;
  }

  /** Returns the current language value (primitive). */
  getCurrentLangValue(): LangCode {
    return this.lang();
  }

  /** Returns the list of supported language codes. */
  getSupportedLangs(): readonly LangCode[] {
    return this.supportedLangs;
  }

  /** Returns the fallback language code. */
  getFallbackLang(): string | null {
    return this.translateService ? this.translateService.getFallbackLang() : null;
  }

  /** Returns the list of available languages loaded by ngx-translate. */
  getLangs(): readonly string[] {
    return this.translateService ? this.translateService.getLangs() : [];
  }

  /** Resets the app language to the default value. */
  resetToDefault() {
    this.changeLang(this.defaultLang);
  }
}
