import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LanguageSwitcherComponent } from './language-switcher.component';
import { LanguageService } from '@app/core/services/language/language.service';
import { mockTranslateService } from '../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';
import { SpinButtonComponent } from '@app/shared/components/spin-button/spin-button.component';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  const mockLangService: Partial<LanguageService> = {
    lang: (() => 'en') as any,
    changeLang: (_: any) => { },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent, MockTranslatePipe, SpinButtonComponent],
      providers: [
        { provide: LanguageService, useValue: mockLangService },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent as any);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls LanguageService.changeLang when spin-button emits optionChange', () => {
    const langService = TestBed.inject(LanguageService) as any;
    // Replace the changeLang with a test hook we can assert against
    langService.__calledWith = null;
    langService.changeLang = (v: any) => { langService.__calledWith = v; };
    fixture.detectChanges();
    const child = fixture.debugElement.query(By.directive(SpinButtonComponent));
    expect(child).toBeTruthy();
    (child.componentInstance as any).optionChange.emit({ value: 'es' });
    expect(langService.__calledWith).toBe('es');
  });
});
