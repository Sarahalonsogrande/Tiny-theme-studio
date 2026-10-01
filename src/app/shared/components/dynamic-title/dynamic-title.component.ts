/**
 * DynamicTitleComponent — Displays a title: explicit input or active route.
 *
 * - When [title] input is provided, renders that translation key directly.
 * - Otherwise listens to Router `NavigationEnd` and reads `data.title` from
 *   the deepest active route, falling back to `appTitles.welcomeTitle`.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example — route-driven (header)
 * <app-dynamic-title />
 *
 * @example — explicit title (chapter)
 * <app-dynamic-title [title]="chapter().titleKey" />
 */

import { Component, ChangeDetectionStrategy, computed, signal, input, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { APP_TITLES } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-dynamic-title',
  imports: [TranslateModule],
  templateUrl: './dynamic-title.component.html',
  styleUrl: './dynamic-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTitleComponent {
  // Optional explicit title key — when provided, overrides the route-derived title.
  readonly title = input<string | undefined>(undefined);

  // Injected router for navigation/title detection.
  private readonly router = inject(Router);

  // Constants: app title keys and navigation options.
  readonly APP_TITLES = APP_TITLES;

  // Route-derived title key (signal).
  private readonly routeTitle = signal<string>('appTitles.welcomeTitle');

  // Subject used to tear down router subscription on destroy.
  private readonly destroyed = new Subject<void>();

  // Resolved title: explicit input takes priority over route.
  readonly headerTitle = computed(() => this.title() ?? this.routeTitle());

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
    this.routeTitle.set(key);
  }
}
