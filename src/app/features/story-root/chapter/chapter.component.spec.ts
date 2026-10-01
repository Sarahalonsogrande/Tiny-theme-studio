import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterComponent } from './chapter.component';

describe('ChapterComponent', () => {
  let component: ChapterComponent;
  let fixture: ComponentFixture<ChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
