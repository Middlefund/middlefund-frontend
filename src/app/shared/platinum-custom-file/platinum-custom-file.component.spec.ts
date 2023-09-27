import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumCustomFileComponent } from './platinum-custom-file.component';

describe('PlatinumCustomFileComponent', () => {
  let component: PlatinumCustomFileComponent;
  let fixture: ComponentFixture<PlatinumCustomFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatinumCustomFileComponent]
    });
    fixture = TestBed.createComponent(PlatinumCustomFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
