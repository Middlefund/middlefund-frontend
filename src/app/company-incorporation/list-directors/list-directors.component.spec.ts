import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirectorsComponent } from './list-directors.component';

describe('ListDirectorsComponent', () => {
  let component: ListDirectorsComponent;
  let fixture: ComponentFixture<ListDirectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDirectorsComponent]
    });
    fixture = TestBed.createComponent(ListDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
