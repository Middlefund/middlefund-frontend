import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporationInfoComponent } from './incorporation-info.component';

describe('IncorporationInfoComponent', () => {
  let component: IncorporationInfoComponent;
  let fixture: ComponentFixture<IncorporationInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncorporationInfoComponent]
    });
    fixture = TestBed.createComponent(IncorporationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
