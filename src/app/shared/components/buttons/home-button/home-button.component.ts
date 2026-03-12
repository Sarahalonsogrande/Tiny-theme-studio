
/**
 * HomeButtonComponent – Minimal floating action button for navigating to the Home route.
 *
 * - Shows only the Home option (see NAV_OPTIONS)
 * - Accessible: provides aria-label for screen readers
 * - Designed for integration with SpinButton and router
 * - SSR-safe, defensive, and easy to maintain
 *
 * Example usage:
 * <app-home-button></app-home-button>
 *
 * For theming, accessibility, and design guidelines, see:
 *   /docs/THEMING.md
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NAV_OPTIONS, SwitcherOption } from '@app/core/constants/ui/ui-config.constants';
import { SpinButtonComponent } from '../spin-button/spin-button.component';

@Component({
  selector: 'app-home-button',
  imports: [RouterModule, SpinButtonComponent],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeButtonComponent {
  /**
   * The Home option from NAV_OPTIONS (array of one).
   * Used to render the button and pass to SpinButton if needed.
   */
  readonly navOptions: readonly SwitcherOption[] = NAV_OPTIONS.filter(opt => opt.value === 'home');

  /**
   * Accessible label for the button (screen readers, i18n-friendly).
   */
  readonly ariaLabel = 'Go to home';

  constructor(private router: Router) { }

  /**
   * Navigates to the Home route when the option is selected.
   * Defensive: checks for valid option and route.
   */
  goHome(option: SwitcherOption) {
    if (option && option.route) {
      this.router.navigate([option.route]);
    }
  }
}
