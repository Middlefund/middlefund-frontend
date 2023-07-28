import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestorsComponent } from './manage-investors.component';

describe('ManageInvestorsComponent', () => {
  let component: ManageInvestorsComponent;
  let fixture: ComponentFixture<ManageInvestorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInvestorsComponent]
    });
    fixture = TestBed.createComponent(ManageInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
