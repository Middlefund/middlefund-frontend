import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchDetailsComponent } from './pitch-details.component';

describe('PitchDetailsComponent', () => {
  let component: PitchDetailsComponent;
  let fixture: ComponentFixture<PitchDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PitchDetailsComponent]
    });
    fixture = TestBed.createComponent(PitchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
