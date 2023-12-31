import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorTinContactComponent } from './proprietor-tin-contact.component';

describe('ProprietorTinContactComponent', () => {
  let component: ProprietorTinContactComponent;
  let fixture: ComponentFixture<ProprietorTinContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietorTinContactComponent]
    });
    fixture = TestBed.createComponent(ProprietorTinContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
