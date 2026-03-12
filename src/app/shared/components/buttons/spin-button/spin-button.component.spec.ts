import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { SpinButtonComponent } from './spin-button.component';

describe('SpinButtonComponent', () => {
  let component: SpinButtonComponent;
  let fixture: ComponentFixture<SpinButtonComponent>;

  @Component({
    template: `<app-spin-button [defaultIcon]="'★'" [value]="null"></app-spin-button>`,
    standalone: true,
    imports: [SpinButtonComponent]
  })
  class TestHostComponent { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpinButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clears isRotating after the safety timeout when animationend does not fire', async () => {
    // Do not rely on matchMedia; ensure safety timeout clears the state.
    component.onSwitch();
    // Wait longer than the safety net (1.2s) to ensure it clears
    await new Promise(resolve => setTimeout(resolve, 1300));
    expect(component.isRotating()).toBeFalsy();
  });

  it('renders configured defaultIcon when provided and no value present', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    const inner = hostFixture.nativeElement.querySelector('app-spin-button .icon span[aria-hidden="true"]');
    expect(inner).toBeTruthy();
    expect((inner as HTMLElement).textContent?.trim()).toContain('★');
  });
});
