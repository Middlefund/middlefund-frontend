import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumAsideComponent } from './platinum-aside.component';

describe('PlatinumAsideComponent', () => {
  let component: PlatinumAsideComponent;
  let fixture: ComponentFixture<PlatinumAsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatinumAsideComponent]
    });
    fixture = TestBed.createComponent(PlatinumAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
