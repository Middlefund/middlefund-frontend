import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedComponent } from './interested.component';

describe('InterestedComponent', () => {
  let component: InterestedComponent;
  let fixture: ComponentFixture<InterestedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestedComponent]
    });
    fixture = TestBed.createComponent(InterestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
