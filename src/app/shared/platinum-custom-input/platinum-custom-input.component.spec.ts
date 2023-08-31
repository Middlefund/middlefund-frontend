import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumCustomInputComponent } from './platinum-custom-input.component';

describe('PlatinumCustomInputComponent', () => {
  let component: PlatinumCustomInputComponent;
  let fixture: ComponentFixture<PlatinumCustomInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatinumCustomInputComponent]
    });
    fixture = TestBed.createComponent(PlatinumCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
