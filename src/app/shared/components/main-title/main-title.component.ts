/**
 * MainTitleComponent — Displays the current page title based on the active route.
 *
 * - Listens to Router `NavigationEnd` events.
 * - Reads `data.title` key from the deepest active route.
 * - Falls back to `appTitles.welcomeTitle` when undefined.
 * - Exposes a reactive `headerTitle` signal for template binding.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example
 * <app-main-title></app-main-title>
 */

import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router, NavigationEnd,  } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { APP_TITLES } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-main-title',
  imports: [ TranslateModule],
  templateUrl: './main-title.component.html',
  styleUrl: './main-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainTitleComponent {
  // Injected router for navigation/title detection.
  private readonly router = inject(Router);

  // Constants: app title keys and navigation options.
  readonly APP_TITLES = APP_TITLES;

  // Current header title translation key (signal).
  private readonly titleSignal = signal<string>('appTitles.welcomeTitle');

  // Subject used to tear down router subscription on destroy.
  private readonly destroyed = new Subject<void>();

  // Signal for the current header title.
  headerTitle = this.titleSignal;

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
