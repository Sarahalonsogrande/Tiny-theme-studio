/**
 * ApplicationConfig – Standalone Angular bootstrap configuration.
 *
 * - Centralizes all global providers (routing, HTTP, i18n, UI services, error handling, etc).
 * - Ensures runtime initialization (language, mode, mood) before first render to prevent FOUC and state mismatches.
 * - Uses provideAppInitializer for SSR/browser safety and deterministic startup.
 * - See docs/BOOTSTRAP_FLOW.md & i18n.md for initialization flow and full context.
 *
 * Example usage:
 * import { appConfig } from './app.config';
 * bootstrapApplication(AppComponent, appConfig);
 */

import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideHttpClient } from "@angular/common/http";
import { LanguageService } from './core/services/language/language.service';
import { UiModeService } from './core/services/ui-modes/ui-mode.service';
import { UiMoodService } from './core/services/ui-moods/ui-mood.service';
import { isPlatformBrowser } from '@angular/common';


/**
 * Initializes core UI services in a deterministic order before first render.
  See docs/i18n.md
 */
function initAppServices() {
  inject(LanguageService).init();
  inject(UiModeService).init();
  inject(UiMoodService).init();
}


export const appConfig: ApplicationConfig = {
  providers: [
    // Core platform error handling
    provideBrowserGlobalErrorListeners(),

    // HTTP networking
    provideHttpClient(),

    // Routing
    provideRouter(routes),

    // Internationalization (ngx-translate)
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),

    // Runtime initialization in the browser before first render (prevents FOUC and state mismatch)
    provideAppInitializer(() => {
      const platform = inject(PLATFORM_ID);
      if (isPlatformBrowser(platform)) {
        initAppServices();
      }
    })
  ]
};

