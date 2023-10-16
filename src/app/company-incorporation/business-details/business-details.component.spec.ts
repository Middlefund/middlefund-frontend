import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsComponent } from './business-details.component';

describe('BusinessDetailsComponent', () => {
  let component: BusinessDetailsComponent;
  let fixture: ComponentFixture<BusinessDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDetailsComponent]
    });
    fixture = TestBed.createComponent(BusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
