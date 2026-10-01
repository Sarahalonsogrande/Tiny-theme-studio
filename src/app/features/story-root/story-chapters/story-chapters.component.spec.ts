import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryChaptersComponent } from '@app/features/story-root/story-root.component';

describe('StoryChaptersComponent', () => {
  let component: StoryChaptersComponent;
  let fixture: ComponentFixture<StoryChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryChaptersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StoryChaptersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
