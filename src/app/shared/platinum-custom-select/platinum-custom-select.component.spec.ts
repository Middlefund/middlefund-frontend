import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumCustomSelectComponent } from './platinum-custom-select.component';

describe('PlatinumCustomSelectComponent', () => {
  let component: PlatinumCustomSelectComponent;
  let fixture: ComponentFixture<PlatinumCustomSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatinumCustomSelectComponent]
    });
    fixture = TestBed.createComponent(PlatinumCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
