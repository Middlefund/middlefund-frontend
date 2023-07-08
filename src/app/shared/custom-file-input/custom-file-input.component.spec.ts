import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFileInputComponent } from './custom-file-input.component';

describe('CustomFileInputComponent', () => {
  let component: CustomFileInputComponent;
  let fixture: ComponentFixture<CustomFileInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFileInputComponent]
    });
    fixture = TestBed.createComponent(CustomFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
