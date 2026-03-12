/**
 * UiModeService — Manages application luminosity (light / dark).
 *
 * For full architecture and flow details, see docs/THEMING.md and LAB_NOTES.md
 *
 * Responsibilities:
 * - Resolve and apply initial mode (storage → system → default)
 * - Sync mode with DOM and persist user preference
 * - Expose current mode as a signal and computed helpers
 * - Keep constructor SSR-safe; call `init()` only in the browser.
 *
 * Example usage:
 *   uiModeService.setMode('dark');
 *   const modeSignal = uiModeService.mode;
 *   const isDark = uiModeService.isDarkMode();
 */

import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { MODE_OPTIONS, ModeMode } from '@app/core/constants/ui/ui-config.constants';

@Injectable({
  providedIn: 'root'
})
export class UiModeService {
  // Key used to store the user's mode preference in localStorage.
  private readonly modeKey = 'ui-mode';

  // List of supported mode values, derived from MODE_OPTIONS.
  private readonly uiModes: readonly ModeMode[] = MODE_OPTIONS.map(option => option.value);

  // Internal mutable signal holding the current mode.
  // Initialized to 'light', type enforced by ModeMode.
  private readonly _mode = signal<ModeMode>('light');

  // Read-only view exposed to consumers for reactive updates.
  readonly mode = this._mode.asReadonly();

  // Computed signal that returns true when the current mode is dark.
  // Recomputes automatically when mode() changes.
  readonly isDarkMode = computed(() => this.mode() === 'dark');

  // Platform id used to detect browser vs server (SSR safety).
  private readonly platformId = inject(PLATFORM_ID);

  // Injected document reference for testability and SSR safety.
  private readonly document = inject(DOCUMENT);

  /**
   * Constructor for UiModeService.
   * Browser-only logic is deferred to init() for SSR safety.
   */
  constructor() { }

  /**
   * Runtime initialization that must run only in the browser.
   * Loads stored mode from localStorage or falls back to system preference.
   * Keeps constructor SSR-safe by deferring browser APIs.
   */
  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1) Try persisted user preference
    let stored: string | null = null;
    try { stored = localStorage.getItem(this.modeKey); } catch (e) { stored = null; }

    if (this.isValidMode(stored)) {
      this.setMode(stored as ModeMode);
      return;
    }

    // 2) Fall back to system preference when no persisted value
    let prefersDark = false;
    try { prefersDark = !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { prefersDark = false; }

    this.setMode(prefersDark ? 'dark' : 'light');
  }

  /* Type guard ensuring a value is a valid UI mode. Centralizes validation logic */
  private isValidMode(value: unknown): value is ModeMode {
    return MODE_OPTIONS.some(option => option.value === value);
  }

  /**
   * Applies a UI Mode and persists the preference.
   * Validates input, updates internal signal, saves to localStorage, and applies to DOM.
   * See docs/THEMING.md for full design and examples.
   * @param mode The mode to apply (must be a valid ModeMode).
  */
  setMode(mode: ModeMode) {
    if (!this.isValidMode(mode)) {
      console.warn(`[UiModeService] Invalid mode: ${mode}`);
      return;
    }

    try {
      if (this.document) {
        const root = this.document.documentElement;
        const body = this.document.body;
        if (root && root.classList) {
          root.classList.remove(...this.uiModes);
          root.classList.add(mode);
          // Keep attribute in sync with class-based selectors and pre-bootstrap script
          try { root.setAttribute('data-mode', mode); } catch (e) { }
        }
        if (body && body.classList) {
          body.classList.remove(...this.uiModes);
          body.classList.add(mode);
          try { body.setAttribute('data-mode', mode); } catch (e) { }
        }
      }
    } catch (e) {
      // Defensive: some environments may restrict DOM access
    }

    try {
      localStorage.setItem(this.modeKey, mode);
    } catch (e) {
      // Ignore storage errors
    }

    this._mode.set(mode);
  }

  /**
   * Toggles between dark and light mode.
   * If the current mode is dark, switches to light; otherwise, switches to dark.
   */
  toggleMode() {
    const current = this.mode();
    this.setMode(current === 'dark' ? 'light' : 'dark');
  }
}
