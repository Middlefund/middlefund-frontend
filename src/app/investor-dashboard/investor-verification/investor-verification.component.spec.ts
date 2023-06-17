import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorVerificationComponent } from './investor-verification.component';

describe('InvestorVerificationComponent', () => {
  let component: InvestorVerificationComponent;
  let fixture: ComponentFixture<InvestorVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorVerificationComponent]
    });
    fixture = TestBed.createComponent(InvestorVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
