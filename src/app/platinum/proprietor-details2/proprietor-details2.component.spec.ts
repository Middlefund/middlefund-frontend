import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorDetails2Component } from './proprietor-details2.component';

describe('ProprietorDetails2Component', () => {
  let component: ProprietorDetails2Component;
  let fixture: ComponentFixture<ProprietorDetails2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietorDetails2Component]
    });
    fixture = TestBed.createComponent(ProprietorDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
