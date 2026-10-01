import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPrologueComponent } from './story-prologue.component';

describe('StoryPrologueComponent', () => {
  let component: StoryPrologueComponent;
  let fixture: ComponentFixture<StoryPrologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryPrologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryPrologueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
