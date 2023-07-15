import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardSkeletonComponent } from './custom-card-skeleton.component';

describe('CustomCardSkeletonComponent', () => {
  let component: CustomCardSkeletonComponent;
  let fixture: ComponentFixture<CustomCardSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardSkeletonComponent]
    });
    fixture = TestBed.createComponent(CustomCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
