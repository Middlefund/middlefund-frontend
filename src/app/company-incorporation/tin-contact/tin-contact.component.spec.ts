import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinContactComponent } from './tin-contact.component';

describe('TinContactComponent', () => {
  let component: TinContactComponent;
  let fixture: ComponentFixture<TinContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinContactComponent]
    });
    fixture = TestBed.createComponent(TinContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
