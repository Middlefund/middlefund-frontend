import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchSubmissionComponent } from './pitch-submission.component';

describe('PitchSubmissionComponent', () => {
  let component: PitchSubmissionComponent;
  let fixture: ComponentFixture<PitchSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PitchSubmissionComponent]
    });
    fixture = TestBed.createComponent(PitchSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
