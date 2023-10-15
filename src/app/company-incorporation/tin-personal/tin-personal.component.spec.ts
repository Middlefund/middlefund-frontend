import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinPersonalComponent } from './tin-personal.component';

describe('TinPersonalComponent', () => {
  let component: TinPersonalComponent;
  let fixture: ComponentFixture<TinPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinPersonalComponent]
    });
    fixture = TestBed.createComponent(TinPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
