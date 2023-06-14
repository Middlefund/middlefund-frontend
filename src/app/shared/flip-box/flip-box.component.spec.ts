import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipBoxComponent } from './flip-box.component';

describe('FlipBoxComponent', () => {
  let component: FlipBoxComponent;
  let fixture: ComponentFixture<FlipBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlipBoxComponent]
    });
    fixture = TestBed.createComponent(FlipBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
