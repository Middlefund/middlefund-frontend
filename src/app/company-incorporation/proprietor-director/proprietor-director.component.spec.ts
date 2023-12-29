import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorDirectorComponent } from './proprietor-director.component';

describe('ProprietorDirectorComponent', () => {
  let component: ProprietorDirectorComponent;
  let fixture: ComponentFixture<ProprietorDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietorDirectorComponent]
    });
    fixture = TestBed.createComponent(ProprietorDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
