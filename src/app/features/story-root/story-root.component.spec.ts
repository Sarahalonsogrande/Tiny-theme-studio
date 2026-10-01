import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorytellingComponent } from './story-root.component';

describe('StorytellingComponent', () => {
  let component: StorytellingComponent;
  let fixture: ComponentFixture<StorytellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorytellingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StorytellingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
