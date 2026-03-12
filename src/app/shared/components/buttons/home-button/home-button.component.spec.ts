import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeButtonComponent } from './home-button.component';

describe('HomeButtonComponent', () => {
  let component: HomeButtonComponent;
  let fixture: ComponentFixture<HomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
