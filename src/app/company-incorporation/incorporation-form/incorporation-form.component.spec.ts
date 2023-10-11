import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporationFormComponent } from './incorporation-form.component';

describe('IncorporationFormComponent', () => {
  let component: IncorporationFormComponent;
  let fixture: ComponentFixture<IncorporationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncorporationFormComponent]
    });
    fixture = TestBed.createComponent(IncorporationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
