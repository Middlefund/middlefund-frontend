import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewingPitchComponent } from './reviewing-pitch.component';

describe('ReviewingPitchComponent', () => {
  let component: ReviewingPitchComponent;
  let fixture: ComponentFixture<ReviewingPitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewingPitchComponent]
    });
    fixture = TestBed.createComponent(ReviewingPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
