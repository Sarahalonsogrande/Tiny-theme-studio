/**
 * MainHeaderComponent — compact app header.
 *
 * - Renders app title and provides `Mode` / `Mood` / `Language` switchers.
 * - Uses `APP_TITLES` for translated titles and `OnPush` for performance.
 */

import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../buttons/language-switcher/language-switcher.component';
import { APP_TITLES, NAV_OPTIONS } from '@app/core/constants/ui/ui-config.constants';
import { MoodSwitcherComponent } from "../buttons/mood-switcher/mood-switcher.component";
import { ModeSwitcherComponent } from "../buttons/mode-switcher/mode-switcher.component";

@Component({
  selector: 'app-main-header',
  imports: [LanguageSwitcherComponent, TranslateModule, MoodSwitcherComponent, ModeSwitcherComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
  // Injected router for navigation/title detection.
  private readonly router = inject(Router);

  // Constants: app title keys and navigation options.
  readonly APP_TITLES = APP_TITLES;
  readonly NAV_OPTIONS = NAV_OPTIONS;

  // Current header title translation key (signal).
  private readonly titleSignal = signal<string>('appTitles.welcomeTitle');

  // Subject used to tear down router subscription on destroy.
  private readonly destroyed = new Subject<void>();

  // Signal for the current header title.
  headerTitle = this.titleSignal;

  // Home button option (defensive access to NAV_OPTIONS)
  readonly homeButtonOption = NAV_OPTIONS && NAV_OPTIONS.length ? NAV_OPTIONS[0] : null;

  // Subscribe to router NavigationEnd to update the header title.
  constructor() {
    this.updateTitle();
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => this.updateTitle());
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  // Derive and set the title translation key from the active route.
  private updateTitle() {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const key = route.data?.['title'] ?? 'appTitles.welcomeTitle';
    this.titleSignal.set(key);
  }
}
