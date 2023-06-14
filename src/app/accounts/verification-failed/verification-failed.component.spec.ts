import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationFailedComponent } from './verification-failed.component';

describe('VerificationFailedComponent', () => {
  let component: VerificationFailedComponent;
  let fixture: ComponentFixture<VerificationFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationFailedComponent]
    });
    fixture = TestBed.createComponent(VerificationFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
