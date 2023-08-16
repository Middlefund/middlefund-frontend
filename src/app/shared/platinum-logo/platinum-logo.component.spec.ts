import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumLogoComponent } from './platinum-logo.component';

describe('PlatinumLogoComponent', () => {
  let component: PlatinumLogoComponent;
  let fixture: ComponentFixture<PlatinumLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatinumLogoComponent]
    });
    fixture = TestBed.createComponent(PlatinumLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
