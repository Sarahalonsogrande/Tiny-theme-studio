import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureWidgetComponent } from './disclosure-widget.component';

describe('DisclosureWidgetComponent', () => {
  let component: DisclosureWidgetComponent;
  let fixture: ComponentFixture<DisclosureWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisclosureWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisclosureWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
