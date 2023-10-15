import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinRegistrationComponent } from './tin-registration.component';

describe('TinRegistrationComponent', () => {
  let component: TinRegistrationComponent;
  let fixture: ComponentFixture<TinRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinRegistrationComponent]
    });
    fixture = TestBed.createComponent(TinRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
