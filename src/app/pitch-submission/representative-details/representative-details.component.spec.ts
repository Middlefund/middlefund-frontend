import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeDetailsComponent } from './representative-details.component';

describe('RepresentativeDetailsComponent', () => {
  let component: RepresentativeDetailsComponent;
  let fixture: ComponentFixture<RepresentativeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentativeDetailsComponent]
    });
    fixture = TestBed.createComponent(RepresentativeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
