import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStartupsComponent } from './manage-startups.component';

describe('ManageStartupsComponent', () => {
  let component: ManageStartupsComponent;
  let fixture: ComponentFixture<ManageStartupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStartupsComponent]
    });
    fixture = TestBed.createComponent(ManageStartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
