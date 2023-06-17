import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStartupsComponent } from './view-startups.component';

describe('ViewStartupsComponent', () => {
  let component: ViewStartupsComponent;
  let fixture: ComponentFixture<ViewStartupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStartupsComponent]
    });
    fixture = TestBed.createComponent(ViewStartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
