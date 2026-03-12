import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModeToggleComponent } from './mode-toggle.component';
import { UiModeService } from '@app/core/services/ui-modes/ui-mode.service';
import { mockTranslateService } from '../../../../test-utils/mocks';
import { TranslateService } from '@ngx-translate/core';
import { SpinButtonComponent } from '@app/shared/components/spin-button/spin-button.component';

describe('ModeToggleComponent', () => {
    let component: ModeToggleComponent;
    let fixture: ComponentFixture<ModeToggleComponent>;

    const mockThemeService: Partial<UiModeService> = {
        theme: (() => 'light') as any,
        setTheme: (_: any) => { },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModeToggleComponent, SpinButtonComponent],
            providers: [
                { provide: UiModeService, useValue: mockThemeService },
                { provide: TranslateService, useValue: mockTranslateService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ModeToggleComponent as any);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('calls ThemeService.setTheme when spin-button emits optionChange', () => {
        const themeService = TestBed.inject(UiModeService) as any;
        themeService.__calledWith = null;
        themeService.setTheme = (v: any) => { themeService.__calledWith = v; };
        const child = fixture.debugElement.query(By.directive(SpinButtonComponent));
        expect(child).toBeTruthy();
        (child.componentInstance as any).optionChange.emit({ value: 'dark' });
        expect(themeService.__calledWith).toBe('dark');
    });
});
