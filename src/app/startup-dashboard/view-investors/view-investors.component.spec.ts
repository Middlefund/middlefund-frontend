import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestorsComponent } from './view-investors.component';

describe('ViewInvestorsComponent', () => {
  let component: ViewInvestorsComponent;
  let fixture: ComponentFixture<ViewInvestorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInvestorsComponent]
    });
    fixture = TestBed.createComponent(ViewInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
