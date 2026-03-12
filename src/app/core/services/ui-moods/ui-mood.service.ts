/**
 * UiMoodService — Manages application color identity (mood).
 *
 * For full architecture and flow details, see docs/THEMING.md and LAB_NOTES.md
 *
 * Responsibilities:
 * - Load and apply persisted or default mood
 * - Sync mood to DOM (data-mood + class) and persist user choice
 * - Expose current mood as a signal and computed helpers
 * - Keep constructor SSR-safe; call `init()` only in the browser.
 *
 * Example usage:
 *   uiMoodService.setMood('ocean');
 *   const moodSignal = uiMoodService.mood;
 *   const isDefault = uiMoodService.isDefaultMood();
 */

import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { MOOD_OPTIONS, MoodMode, DEFAULT_MOOD } from '@app/core/constants/ui/ui-config.constants';

@Injectable({
    providedIn: 'root'
})
export class UiMoodService {
    // Key used to store the user's mood preference in localStorage.
    private readonly moodKey = 'ui-mood';

    // List of supported mood values, derived from MOOD_OPTIONS.
    private readonly supportedMoods: readonly MoodMode[] = MOOD_OPTIONS.map(option => option.value);

    // Internal mutable signal holding the current mood.
    // Initialized to the default, type is enforced by MoodMode.
    private readonly _mood = signal<MoodMode>(DEFAULT_MOOD);

    // Read-only view exposed to consumers for reactive updates.
    readonly mood = this._mood.asReadonly();

    // Computed signal that returns true when the current mood is default.
    // Recomputes automatically when mood() changes.
    readonly isDefaultMood = computed(() => this._mood() === DEFAULT_MOOD);

    // Platform id used to detect browser vs server (SSR safety).
    private readonly platformId = inject(PLATFORM_ID);

    // Injected document reference for testability and SSR safety.
    private readonly document = inject(DOCUMENT);

    /**
     * Initializes mood settings and loads the initial mood.
     * Must be called at app startup to apply stored preferences.
     */
    constructor() { }

    /**
     * Runtime initialization that must run only in the browser.
     * Loads stored mood from localStorage or applies default.
     * Keeps constructor SSR-safe by deferring browser APIs.
     */
    init(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        // 1) Default mood ('birthday') is applied when no stored preference exists.
        let stored: string | null = null;
        try { stored = localStorage.getItem(this.moodKey); } catch (e) { stored = null; }

        if (this.isValidMood(stored)) {
            this.setMood(stored as MoodMode);
            return;
        }

        // 2) No stored mood: apply default to ensure pre-bootstrap state and CSS are consistent.
        this.setMood(DEFAULT_MOOD);
    }

    /* Type guard ensuring a value is a valid UI mode. Centralizes validation logic */
    private isValidMood(value: unknown): value is MoodMode {
        return this.supportedMoods.some(option => option === value);
    }

    /**
     * Applies and persists a mood; syncs DOM attributes/classes.
     * Validates input, updates internal signal, saves to localStorage, and applies to DOM.
     * See docs/THEMING.md for full design and examples.
     * @param mood The mood to apply (must be a valid MoodMode).
     */
    setMood(mood: MoodMode) {
        if (!this.isValidMood(mood)) return;

        try {
            const root = this.document.documentElement;
            const body = this.document.body;
            // remove previous mood classes and apply the new one for class-based selectors
            try {
                if (root && root.classList) {
                    root.classList.remove(...this.supportedMoods);
                    root.classList.add(mood);
                    root.setAttribute('data-mood', mood);
                }
                if (body && body.classList) {
                    body.classList.remove(...this.supportedMoods);
                    body.classList.add(mood);
                    body.setAttribute('data-mood', mood);
                }
            } catch (e) { }
        } catch { }

        try {
            localStorage.setItem(this.moodKey, mood);
        } catch { }

        this._mood.set(mood);
    }
}
