import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  const mockTranslate: Partial<TranslateService> = {
    setFallbackLang: (_: string) => of({} as any),
    use: (_: string) => of({} as any),
    getFallbackLang: () => 'en',
    getLangs: () => ['en', 'es', 'de'] as readonly string[],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: mockTranslate },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns supported langs', () => {
    const langs = service.getSupportedLangs();
    expect(langs.length).toBeGreaterThan(0);
  });
});
