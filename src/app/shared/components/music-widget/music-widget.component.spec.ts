import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicWidgetComponent } from './music-widget.component';

describe('MusicWidgetComponent', () => {
  let component: MusicWidgetComponent;
  let fixture: ComponentFixture<MusicWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
