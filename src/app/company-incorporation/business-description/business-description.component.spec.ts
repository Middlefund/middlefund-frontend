import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDescriptionComponent } from './business-description.component';

describe('BusinessDescriptionComponent', () => {
  let component: BusinessDescriptionComponent;
  let fixture: ComponentFixture<BusinessDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDescriptionComponent]
    });
    fixture = TestBed.createComponent(BusinessDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
