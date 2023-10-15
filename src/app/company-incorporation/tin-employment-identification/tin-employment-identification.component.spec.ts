import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinEmploymentIdentificationComponent } from './tin-employment-identification.component';

describe('TinEmploymentIdentificationComponent', () => {
  let component: TinEmploymentIdentificationComponent;
  let fixture: ComponentFixture<TinEmploymentIdentificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinEmploymentIdentificationComponent]
    });
    fixture = TestBed.createComponent(TinEmploymentIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
