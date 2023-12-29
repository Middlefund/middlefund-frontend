import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinBusinessDetailsComponent } from './tin-business-details.component';

describe('TinBusinessDetailsComponent', () => {
  let component: TinBusinessDetailsComponent;
  let fixture: ComponentFixture<TinBusinessDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinBusinessDetailsComponent]
    });
    fixture = TestBed.createComponent(TinBusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
