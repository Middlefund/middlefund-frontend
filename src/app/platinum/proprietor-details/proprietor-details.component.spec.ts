import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorDetailsComponent } from './proprietor-details.component';

describe('ProprietorDetailsComponent', () => {
  let component: ProprietorDetailsComponent;
  let fixture: ComponentFixture<ProprietorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietorDetailsComponent]
    });
    fixture = TestBed.createComponent(ProprietorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
