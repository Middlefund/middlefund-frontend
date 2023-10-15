import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinResidentialAddressComponent } from './tin-residential-address.component';

describe('TinResidentialAddressComponent', () => {
  let component: TinResidentialAddressComponent;
  let fixture: ComponentFixture<TinResidentialAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinResidentialAddressComponent]
    });
    fixture = TestBed.createComponent(TinResidentialAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
