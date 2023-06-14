import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupHomeComponent } from './startup-home.component';

describe('StartupHomeComponent', () => {
  let component: StartupHomeComponent;
  let fixture: ComponentFixture<StartupHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartupHomeComponent]
    });
    fixture = TestBed.createComponent(StartupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
