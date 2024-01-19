import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlefundLoaderComponent } from './middlefund-loader.component';

describe('MiddlefundLoaderComponent', () => {
  let component: MiddlefundLoaderComponent;
  let fixture: ComponentFixture<MiddlefundLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddlefundLoaderComponent]
    });
    fixture = TestBed.createComponent(MiddlefundLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
