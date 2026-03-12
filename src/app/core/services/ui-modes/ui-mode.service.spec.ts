import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { UiModeService } from './theme.service';

describe('UiModeService', () => {
  let service: UiModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(UiModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can set and read theme signal', () => {
    service.setTheme('light');
    expect(service.theme()).toBe('light');
  });
});
