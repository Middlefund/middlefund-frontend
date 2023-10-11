import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddressComponent } from './business-address.component';

describe('BusinessAddressComponent', () => {
  let component: BusinessAddressComponent;
  let fixture: ComponentFixture<BusinessAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessAddressComponent]
    });
    fixture = TestBed.createComponent(BusinessAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
