import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeManagerComponent } from './theme-manager.component';

describe('ThemeManagerComponent', () => {
  let component: ThemeManagerComponent;
  let fixture: ComponentFixture<ThemeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
