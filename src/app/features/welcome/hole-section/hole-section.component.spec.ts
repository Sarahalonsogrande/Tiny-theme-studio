import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoleSectionComponent } from './hole-section.component';

describe('HoleSectionComponent', () => {
  let component: HoleSectionComponent;
  let fixture: ComponentFixture<HoleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoleSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoleSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
