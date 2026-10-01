import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTitleComponent } from './dynamic-title.component';

describe('DynamicTitleComponent', () => {
  let component: DynamicTitleComponent;
  let fixture: ComponentFixture<DynamicTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTitleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
