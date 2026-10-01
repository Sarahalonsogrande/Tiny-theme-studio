
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
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NAV_OPTIONS, NavValue, SwitcherOption } from '@app/core/constants/ui/ui-config.constants';
import { SpinButtonComponent } from '@app/shared/components/buttons/spin-button/spin-button.component';

@Component({
  selector: 'app-nav-button',
  imports: [RouterModule, SpinButtonComponent],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButtonComponent {
  /** Which nav option to show. Defaults to 'home'. */
  navValue = input<NavValue>('home');
  disabled = input<boolean>(false);

  readonly option = computed<SwitcherOption | undefined>(
    () => NAV_OPTIONS.find(opt => opt.value === this.navValue())
  );

  readonly ariaLabel = computed(() => `Go to ${this.navValue()}`);

  constructor(private router: Router) { }

  go(option: SwitcherOption | undefined) {
    if (this.disabled()) {
      return;
    }

    if (option?.route) {
      this.router.navigate([option.route]);
    }
  }
}
