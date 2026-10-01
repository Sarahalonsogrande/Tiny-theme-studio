/**
 * SpinButtonComponent – Reusable floating action button with a spin animation.
 *
 * - Direction-aware spin animation (next/prev with “bounce” effect)
 * - Uses signals & computed for reactive inputs/outputs
 * - Accessible: aria-label and live region for screen readers
 * - Internationalization-friendly (labels come from constants/i18n keys)
 *
 * Example usage:
 * <app-spin-button
 *   [values]="MoodOptions"
 *   [ariaLabel]="'aria.selectMood' | translate"
 *   (optionChange)="setMood($event)"
 *   [value]="currentMoodOption()">
 * </app-spin-button>
 */

import { Component, input, signal, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { SwitcherOption, RotationDirection } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-spin-button',
  imports: [],
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinButtonComponent {
  // Optional route info, can be a string or array
  route = input<string | any[]>('');

  // Disabled state passed by parent components.
  disabled = input<boolean>(false);

  // The currently selected option.
  value = input<SwitcherOption | null>(null);

  // The list of available options to cycle through.
  values = input<readonly SwitcherOption[]>([]);

  // Accessible label for the button (screen readers).
  ariaLabel = input<string>('');

  // Optional default icon (emoji / text) if option has no img/icon.
  defaultIcon = input<string | null>(null);

  // Flag: true while the spin animation is running
  isRotating = signal(false);

  // Internal timeout id used as a safety net when animationend doesn't fire:
  // reduced motion, browser limits...
  private _rotationTimeout: ReturnType<typeof setTimeout> | null = null;

  // Emits the next option when user clicks the button
  optionChange = output<SwitcherOption>();

  // Direction of spin: 'next' or 'prev'
  rotationDirection = signal<RotationDirection>('next');

  /**
 * Computes the next option to display based on the current value and direction.
  */
  readonly next = computed<SwitcherOption | null>(() => {
    const vals = this.values();
    if (!vals.length) return null; // Safety: no options available

    const current = this.value();
    // If no current, use first element as baseline
    if (current === null) return vals[0];

    let idx = vals.findIndex(v => v.value === current.value);
    if (idx === -1) idx = 0;

    const direction = this.rotationDirection();
    let nextIdx = idx;

    // Determine next index based on rotation direction
    if (direction === 'next') {
      nextIdx = idx === vals.length - 1 ? idx - 1 : idx + 1; // bounce back
    } else {
      nextIdx = idx === 0 ? idx + 1 : idx - 1; // bounce forward
    }

    // Clamp to valid range as a safety net
    nextIdx = Math.max(0, Math.min(vals.length - 1, nextIdx));
    return vals[nextIdx];
  });

  /**
   * Handles user click on the switcher button:
   * Prevents multiple clicks during animation.
   * Updates rotationDirection if end/start is reached
   * Emits the next option and triggers the spin animation.
   */
  onSwitch(): void {
    // Prevents triggering a new switch while an animation is ongoing.
    if (this.disabled() || this.isRotating()) return;
    const vals = this.values();

    // Require at least 2 options to cycle
    if (vals.length < 2) {
      console.warn('SpinButton requires at least 2 options.');
      return;
    }

    const current = this.value();
    let idx = current == null ? 0 : vals.findIndex(v => v.value === current.value);
    if (idx === -1) idx = 0;

    // Update direction if at bounds ("bounce" effect)
    let direction: RotationDirection = this.rotationDirection();
    if (direction === 'next' && idx === vals.length - 1) direction = 'prev';
    else if (direction === 'prev' && idx === 0) direction = 'next';
    this.rotationDirection.set(direction);

    // Compute next option to emit; `!` asserts it always exists
    // * (vals.length >= 2) *
    const next = this.next()!;

    // Start animation and emit the next option
    this.isRotating.set(true);
    this.optionChange.emit(next);
    this.scheduleRotationClear();
  }

  /**
   * Schedule a safety timeout to clear `isRotating` in case `animationend`
   * doesn't fire (reduced-motion, environment restrictions, etc.).
   */
  private scheduleRotationClear(): void {
    try {
      // Clear any existing timeout
      if (this._rotationTimeout) {
        clearTimeout(this._rotationTimeout);
        this._rotationTimeout = null;
      }

      // Detect if user prefers reduced motion
      const prefersReduced = typeof window !== 'undefined' && !!(window as any).matchMedia && (window as any).matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        this._rotationTimeout = setTimeout(() => {
          this.isRotating.set(false);
          this._rotationTimeout = null;
        }, 10);
      } else {
        // Safety net slightly longer than CSS animation duration
        this._rotationTimeout = setTimeout(() => {
          this.isRotating.set(false);
          this._rotationTimeout = null;
        }, 1200);
      }
    } catch (e) {
      // Defensive: ignore errors in rare environments
    }
  }

  // Called from template when the CSS animation ends. Clears safety timeout.
  onAnimationEnd(): void {
    this.isRotating.set(false);
    if (this._rotationTimeout) {
      clearTimeout(this._rotationTimeout);
      this._rotationTimeout = null;
    }
  }

  /**
   * Text to announce via an `aria-live` region when the selected option changes.
   * Falls back to `value` if no human-readable `label` exists on the option.
   */
  readonly announcerText = computed<string>(() => {
    const v = this.value();
    if (!v) return '';
    // Use label if available, otherwise fallback to text or raw value
    return (v as any).label ?? (v as any).text ?? (v as any).value ?? '';
  });
}
