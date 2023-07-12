import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketAnimationComponent } from './rocket-animation.component';

describe('RocketAnimationComponent', () => {
  let component: RocketAnimationComponent;
  let fixture: ComponentFixture<RocketAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RocketAnimationComponent]
    });
    fixture = TestBed.createComponent(RocketAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
