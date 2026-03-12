import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    // Prevent executing ngAfterViewInit which relies on DOM APIs not present in this test
    component.ngAfterViewInit = () => { };
    // Also stub carousel if accessed directly
    component.carousel = { nativeElement: document.createElement('ul') } as any;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
