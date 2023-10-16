import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalContactComponent } from './postal-contact.component';

describe('PostalContactComponent', () => {
  let component: PostalContactComponent;
  let fixture: ComponentFixture<PostalContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostalContactComponent]
    });
    fixture = TestBed.createComponent(PostalContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
