import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextAreaComponent } from './custom-text-area.component';

describe('CustomTextAreaComponent', () => {
  let component: CustomTextAreaComponent;
  let fixture: ComponentFixture<CustomTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTextAreaComponent]
    });
    fixture = TestBed.createComponent(CustomTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
