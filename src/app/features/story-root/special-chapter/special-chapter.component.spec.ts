import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialChapterComponent } from './special-chapter.component';

describe('SpecialChapterComponent', () => {
  let component: SpecialChapterComponent;
  let fixture: ComponentFixture<SpecialChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialChapterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
